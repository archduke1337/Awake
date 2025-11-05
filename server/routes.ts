import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { requireAuth } from "@clerk/express";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { askOpenRouter, performWebSearch } from "./lib/openrouter";
import { z } from "zod";

// Helper to get userId from Clerk auth
function getUserId(req: Request): string | null {
  const auth = (req as any).auth;
  if (typeof auth === 'function') {
    // New API - auth is a function
    const authObj = auth();
    return authObj?.userId || null;
  }
  // Fallback for old API
  return auth?.userId || null;
}

// Validation schema for chat requests
const chatRequestSchema = z.object({
  conversationId: z.string().nullable().optional(),
  modelId: z.string().min(1, "Model ID is required"),
  modelName: z.string().min(1, "Model name is required"),
  message: z.string()
    .min(1, "Message cannot be empty")
    .max(50000, "Message is too long (max 50,000 characters)"),
  webSearchEnabled: z.boolean().optional().default(false),
});

// Rate limiting map (userId -> timestamps of recent requests)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // Max 30 requests per minute

// Helper function to check rate limit
function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(userId) || [];
  
  // Remove timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(userId, recentTimestamps);
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint (no authentication required)
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get user conversations (requires authentication)
  app.get("/api/conversations", requireAuth(), async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const conversations = await storage.getUserConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get conversation messages (requires authentication)
  app.get("/api/conversations/:id/messages", requireAuth(), async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      const messages = await storage.getConversationMessages(id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // File upload endpoint (requires authentication)
  app.post("/api/upload", requireAuth(), async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check for file in body (base64)
      const { files } = req.body;
      
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }

      const uploadedFiles = [];
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

      for (const file of files) {
        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          return res.status(400).json({ 
            error: `File type ${file.type} not allowed. Allowed types: JPEG, PNG, WebP, GIF` 
          });
        }

        // Validate file size from base64
        let fileSizeBytes = 0;
        try {
          const base64Data = file.data.split(',')[1];
          fileSizeBytes = Buffer.from(base64Data, 'base64').length;
        } catch (e) {
          return res.status(400).json({ error: "Invalid file data format" });
        }
        
        if (fileSizeBytes > MAX_FILE_SIZE) {
          return res.status(413).json({ 
            error: `File size exceeds 5MB limit. Size: ${(fileSizeBytes / 1024 / 1024).toFixed(2)}MB` 
          });
        }

        // Store file reference (in production, this would be cloud storage)
        // For now, we'll generate a URL that references the base64 data
        const fileId = `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        uploadedFiles.push({
          id: fileId,
          name: file.name,
          type: file.type,
          size: fileSizeBytes,
          url: file.data, // Base64 data URL
          uploadedAt: new Date(),
        });
      }

      res.json({ 
        success: true,
        files: uploadedFiles,
        message: `Successfully uploaded ${uploadedFiles.length} file(s)` 
      });
    } catch (error) {
      console.error("Error in file upload:", error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes("PayloadTooLarge") || error.message.includes("413")) {
          return res.status(413).json({ 
            error: "Total payload too large. Please upload smaller files or fewer images." 
          });
        }
        return res.status(500).json({ error: error.message });
      }
      
      res.status(500).json({ error: "Failed to upload files" });
    }
  });

  // Send a chat message (requires authentication)
  app.post("/api/chat", requireAuth(), async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check rate limit
      if (!checkRateLimit(userId)) {
        return res.status(429).json({ 
          error: "Too many requests. Please wait a moment before sending another message." 
        });
      }

      const body = chatRequestSchema.parse(req.body);
      
      let conversationId = body.conversationId || undefined;

      // Create new conversation if needed
      if (!conversationId) {
        const conversation = await storage.createConversation({
          userId,
          modelId: body.modelId,
          modelName: body.modelName,
        });
        conversationId = conversation.id;
      } else {
        // Verify conversation exists and belongs to user
        const conversation = await storage.getConversation(conversationId);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
        }
        if (conversation.userId !== userId) {
          return res.status(403).json({ error: "Access denied" });
        }
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId,
        role: "user",
        content: body.message,
      });

      // Get conversation history for context
      const previousMessages = await storage.getConversationMessages(conversationId);
      const openRouterMessages = previousMessages.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      let aiResponse = "";
      let searchResults = "";

      // Perform web search if enabled
      if (body.webSearchEnabled) {
        searchResults = await performWebSearch(body.message);
        // Add search results to the messages context
        openRouterMessages.push({
          role: "assistant",
          content: searchResults
        });
      }

      // Get AI response
      aiResponse = await askOpenRouter(body.modelId, openRouterMessages);

      // If web search was used, prepend search results to the AI response
      let finalContent = aiResponse;
      if (searchResults) {
        finalContent = `${searchResults}\n\n---\n\n**AI Analysis:**\n\n${aiResponse}`;
      }

      // Save AI message
      const aiMessage = await storage.createMessage({
        conversationId,
        role: "assistant",
        content: finalContent,
      });

      res.json({
        conversationId,
        userMessage,
        aiMessage,
        webSearchUsed: body.webSearchEnabled,
        searchResults: searchResults || undefined,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
        return res.status(400).json({ error: `Invalid request data: ${details}` });
      }
      console.error("Error in chat:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process chat message" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
