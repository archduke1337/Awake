import { useState, useRef, useEffect } from "react";
import { Plus, User as UserIcon, Settings, Sparkles, LogOut, Zap } from "lucide-react";
import { Link } from "wouter";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatMessage, { type Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ModelSelector from "@/components/ModelSelector";
import EmptyState from "@/components/EmptyState";
import LoadingMessage from "@/components/LoadingMessage";
import ThemeToggle from "@/components/ThemeToggle";
import { FREE_AI_MODELS } from "@shared/models";
import { MediaAttachment } from "@/components/MediaRenderer";

export default function ChatPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [selectedModel, setSelectedModel] = useState(FREE_AI_MODELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages when conversation is selected
  const { data: loadedMessages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages", currentConversationId],
    queryFn: async () => {
      if (!currentConversationId) return [];
      const response = await fetch(`/api/conversations/${currentConversationId}/messages`);
      if (!response.ok) throw new Error("Failed to load messages");
      return response.json() as Promise<Message[]>;
    },
    enabled: !!currentConversationId,
  });

  // Update messages when loaded messages change
  useEffect(() => {
    if (loadedMessages) {
      setMessages(loadedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.createdAt)
      })));
    }
  }, [loadedMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string, attachments?: MediaAttachment[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
      attachments: attachments && attachments.length > 0 ? attachments : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setLastFailedMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentConversationId,
          modelId: selectedModel.id,
          modelName: selectedModel.name,
          message: content,
          webSearchEnabled: webSearchEnabled,
          attachments: attachments?.map(a => ({
            type: a.type,
            url: a.url,
            name: a.name
          })) || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();

      // Set conversation ID if this is the first message
      if (!currentConversationId && data.conversationId) {
        setCurrentConversationId(data.conversationId);
      }

      const aiMessage: Message = {
        id: data.aiMessage.id,
        role: "assistant",
        content: data.aiMessage.content,
        timestamp: new Date(data.aiMessage.createdAt),
        modelName: selectedModel.name
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setLastFailedMessage(content);
      
      let errorContent = `❌ Oops, something went wrong\n\nTry checking:\n• Your OpenRouter API key is configured\n• You haven't hit the rate limit\n• Your message is under 50,000 characters`;
      
      // Check for specific error types
      if (errorMsg.includes("413") || errorMsg.includes("too large") || errorMsg.includes("payload")) {
        errorContent = `❌ Message with attachments too large\n\nThe total size of your message and images exceeds our limit.\n\nTry:\n• Using smaller image files\n• Uploading fewer images at once\n• Compressing images before uploading`;
      } else if (errorMsg.includes("429")) {
        errorContent = `❌ Too many requests\n\nYou're sending messages too quickly.\n\nPlease wait a moment and try again.`;
      }
      
      errorContent += `\n\nIf it keeps happening, try refreshing or switching models.`;
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
        modelName: selectedModel.name
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      // Remove the last error message if present
      setMessages(prev => prev.filter(m => !m.content.startsWith("❌")));
      handleSend(lastFailedMessage);
    }
  };

  const handleWebSearch = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `🔍 Web Search: ${query}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLastFailedMessage(null);
    setIsSearching(true);

    try {
      // Use Google Custom Search API or similar
      // For now, we'll create a message indicating search capability
      const searchMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📊 Web Search Results for "${query}":\n\nWeb search functionality would connect to search APIs like Google, Bing, or DuckDuckGo to fetch real-time information. Here's what would happen:\n\n1. **Query Processing**: Your search query would be sent to the configured search API\n2. **Results Fetching**: Top results would be retrieved with titles, descriptions, and links\n3. **Content Integration**: Results would be formatted and provided to you with source links\n4. **AI Enhancement**: The AI model could then provide summaries or answer questions based on these results\n\n✨ This feature is ready to be connected to a search API (Google, Bing, SerpAPI, etc.)`,
        timestamp: new Date(),
        modelName: "🔍 Web Search"
      };
      setMessages(prev => [...prev, searchMessage]);
    } catch (error) {
      console.error("Error in web search:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `❌ Web search error\n\nTry:\n• Checking your internet connection\n• Using different search terms\n• Try again in a moment`,
        timestamp: new Date(),
        modelName: "🔍 Web Search"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 border-r border-border/50 dark:border-border/40 bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 dark:from-sidebar dark:via-sidebar dark:to-sidebar/90 flex flex-col backdrop-blur-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-border/50 dark:border-border/40 bg-gradient-to-r from-primary/5 dark:from-primary/10 to-blue-500/5 dark:to-blue-500/10"
        >
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <span className="font-bold text-lg">AWAKE</span>
              </a>
            </Link>
            <ThemeToggle />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleNewChat}
              className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50 text-white font-medium"
              data-testid="button-new-chat"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </motion.div>
        </motion.div>

        {/* Model Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 border-b border-border/50"
        >
          <label className="text-xs font-semibold text-sidebar-foreground uppercase tracking-widest opacity-70 mb-3 block">
            <Zap className="h-3 w-3 inline mr-1" />
            Select Your Model
          </label>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </motion.div>

        {/* Model Info */}
        <ScrollArea className="flex-1 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="text-xs font-medium text-sidebar-foreground uppercase tracking-wide opacity-70 px-2">
              📊 Model Details
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg p-4 space-y-3 border border-primary/20">
              <div className="text-sm">
                <span className="text-sidebar-foreground font-semibold">Provider:</span>
                <span className="text-sidebar-accent-foreground ml-2 font-medium">{selectedModel.provider}</span>
              </div>
              <div className="text-sm">
                <span className="text-sidebar-foreground font-semibold">Context:</span>
                <span className="text-sidebar-accent-foreground ml-2 font-medium">{selectedModel.contextLength}</span>
              </div>
              <div className="text-sm">
                <span className="text-sidebar-foreground font-semibold">Category:</span>
                <span className="text-sidebar-accent-foreground ml-2 font-medium capitalize">{selectedModel.category}</span>
              </div>
              <p className="text-xs text-sidebar-accent-foreground leading-relaxed mt-3 pt-3 border-t border-primary/20">
                💡 {selectedModel.description}
              </p>
            </div>
          </motion.div>
        </ScrollArea>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-border/50 bg-gradient-to-t from-background to-transparent"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-primary to-blue-500 text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    {user?.firstName || "User"}
                  </p>
                  <p className="text-xs text-sidebar-accent-foreground truncate opacity-70">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-semibold">Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/account">
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Account Overview</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 dark:text-red-400"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <EmptyState modelName={selectedModel.name} />
          ) : (
            <ScrollArea className="h-full" ref={scrollRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto p-8 space-y-6"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ChatMessage message={message} />
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <LoadingMessage />
                  </motion.div>
                )}
                {/* Scroll hint */}
                {messages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-center text-xs text-muted-foreground/50 py-4"
                  >
                    ✨ End of conversation
                  </motion.div>
                )}
              </motion.div>
            </ScrollArea>
          )}
        </div>

        {/* Chat Input Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border/50 dark:border-border/40 bg-gradient-to-t from-background via-background dark:via-background to-transparent dark:to-transparent backdrop-blur-sm"
        >
          {lastFailedMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pt-3 pb-1 max-w-4xl mx-auto flex items-center justify-between bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg mb-2 p-3 border border-red-500/20"
            >
              <span className="text-sm font-medium text-red-700 dark:text-red-200">
                ⚠️ Message failed to send
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRetry}
                disabled={isLoading}
                className="border-red-500/50 hover:bg-red-500/10"
              >
                🔄 Retry
              </Button>
            </motion.div>
          )}
          <ChatInput
            onSend={handleSend}
            disabled={isLoading}
            placeholder="Ask anything... or just start typing. Let's think together."
            webSearchEnabled={webSearchEnabled}
            onWebSearchToggle={setWebSearchEnabled}
          />
        </motion.div>
      </div>
    </div>
  );
}
