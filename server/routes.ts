import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { askOpenRouter } from "./lib/openrouter";
import { z } from "zod";

const chatRequestSchema = z.object({
  conversationId: z.string().optional(),
  modelId: z.string(),
  modelName: z.string(),
  message: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // For demo purposes, we're using a mock user ID
  // In production, this would come from Clerk authentication
  const DEMO_USER_ID = "demo-user-123";

  // Get user conversations
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getUserConversations(DEMO_USER_ID);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get conversation messages
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== DEMO_USER_ID) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const messages = await storage.getConversationMessages(id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a chat message
  app.post("/api/chat", async (req, res) => {
    try {
      const body = chatRequestSchema.parse(req.body);
      
      let conversationId = body.conversationId;

      // Create new conversation if needed
      if (!conversationId) {
        const conversation = await storage.createConversation({
          userId: DEMO_USER_ID,
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
        if (conversation.userId !== DEMO_USER_ID) {
          return res.status(403).json({ error: "Unauthorized" });
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

      // Get AI response
      const aiResponse = await askOpenRouter(body.modelId, openRouterMessages);

      // Save AI message
      const aiMessage = await storage.createMessage({
        conversationId,
        role: "assistant",
        content: aiResponse,
      });

      res.json({
        conversationId,
        userMessage,
        aiMessage,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
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
