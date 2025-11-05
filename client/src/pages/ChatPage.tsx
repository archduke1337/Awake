import { useState, useRef, useEffect } from "react";
import { Plus, User as UserIcon, Settings } from "lucide-react";
import { Link } from "wouter";
import { useUser } from "@clerk/clerk-react";
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

export default function ChatPage() {
  const { user } = useUser();
  const [selectedModel, setSelectedModel] = useState(FREE_AI_MODELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelId: selectedModel.id,
          modelName: selectedModel.name,
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

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
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please make sure the OpenRouter API key is configured correctly.",
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
    console.log("New chat started");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-sidebar-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-sidebar-foreground">AWAKE Chat</h1>
            <ThemeToggle />
          </div>
          
          <Button
            onClick={handleNewChat}
            className="w-full mb-4"
            data-testid="button-new-chat"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sidebar-foreground">AI Model</label>
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-sidebar-foreground uppercase tracking-wide px-2">
              Model Info
            </h3>
            <div className="bg-sidebar-accent rounded-lg p-4 space-y-2">
              <div className="text-sm">
                <span className="text-sidebar-foreground font-medium">Provider:</span>
                <span className="text-sidebar-accent-foreground ml-2">{selectedModel.provider}</span>
              </div>
              <div className="text-sm">
                <span className="text-sidebar-foreground font-medium">Context:</span>
                <span className="text-sidebar-accent-foreground ml-2">{selectedModel.contextLength}</span>
              </div>
              <div className="text-sm">
                <span className="text-sidebar-foreground font-medium">Category:</span>
                <span className="text-sidebar-accent-foreground ml-2 capitalize">{selectedModel.category}</span>
              </div>
              <p className="text-xs text-sidebar-accent-foreground mt-2 leading-relaxed">
                {selectedModel.description}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto hover-elevate">
                <div className="flex items-center gap-2 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback className="text-xs">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-sidebar-accent-foreground truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/account">
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Account Overview
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <EmptyState modelName={selectedModel.name} />
          ) : (
            <ScrollArea className="h-full" ref={scrollRef}>
              <div className="max-w-3xl mx-auto p-6 space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <LoadingMessage />}
              </div>
            </ScrollArea>
          )}
        </div>
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
