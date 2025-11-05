import { Bot, User, Copy, Check, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import MediaRenderer, { MediaAttachment } from "./MediaRenderer";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  modelName?: string;
  attachments?: MediaAttachment[];
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if message contains search results
  const hasSearchResults = message.content.includes("🔍 **Web Search Results");
  const [searchResultsContent, aiAnalysis] = hasSearchResults 
    ? message.content.split("---")
    : ["", message.content];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`message-${message.id}`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="h-9 w-9 flex-shrink-0 cursor-pointer"
      >
        <Avatar className={`h-9 w-9 ring-2 transition-all ${isUser ? "ring-primary/40 dark:ring-primary/50" : "ring-blue-500/40 dark:ring-blue-500/50"}`}>
          <AvatarFallback className={isUser ? "bg-gradient-to-br from-primary to-blue-500 text-white" : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"}>
            {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Message Container */}
      <div className={`flex flex-col gap-3 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap gap-2"
          >
            {message.attachments.map((attachment, idx) => (
              <MediaRenderer
                key={idx}
                media={attachment}
              />
            ))}
          </motion.div>
        )}

        {/* Message Bubble */}
        {message.content && (
          <motion.div className="flex flex-col gap-2 w-full">
            {/* Search Results Section - Premium Style */}
            {hasSearchResults && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="
                  group
                  relative
                  rounded-2xl
                  px-4
                  py-3
                  bg-gradient-to-br
                  from-indigo-50/50
                  to-transparent
                  dark:from-indigo-500/10
                  dark:to-transparent
                  border
                  border-indigo-500/30
                  dark:border-indigo-500/40
                  hover:border-indigo-500/50
                  dark:hover:border-indigo-500/60
                  shadow-depth-2
                  hover:shadow-indigo
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                {/* Shine effect on hover */}
                <div className="
                  absolute
                  inset-0
                  rounded-2xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  pointer-events-none
                " />
                
                <div className="relative z-10 flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">🔍 Web Search Results</span>
                </div>
                <p className="relative z-10 text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {searchResultsContent.trim().replace("🔍 **Web Search Results", "").trim()}
                </p>
              </motion.div>
            )}

            {/* AI Analysis Bubble - Premium Style */}
            <motion.div
              whileHover={{ 
                y: -2,
                boxShadow: isUser 
                  ? "0 12px 40px rgba(99, 102, 241, 0.35)" 
                  : "0 12px 40px rgba(0, 0, 0, 0.15)"
              }}
              className={`
                rounded-2xl
                px-4
                py-3
                transition-all
                group
                relative
                overflow-hidden
                ${
                  isUser
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 text-white shadow-depth-4 shadow-indigo rounded-br-none hover:shadow-depth-5"
                    : "bg-gradient-to-r from-card to-card/50 dark:from-slate-900 dark:to-slate-800 border border-indigo-500/20 dark:border-indigo-500/30 text-foreground shadow-depth-2 dark:shadow-depth-3 rounded-bl-none hover:border-indigo-500/40 dark:hover:border-indigo-500/50 hover:shadow-depth-3"
                }
              `}
            >
              {/* Shine effect for user messages */}
              {isUser && (
                <div className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  pointer-events-none
                " />
              )}
              
              <p className="text-base leading-relaxed whitespace-pre-wrap break-words font-medium relative z-10">
                {hasSearchResults 
                  ? aiAnalysis.replace("**AI Analysis:**", "").trim() 
                  : message.content}
              </p>

              {/* Copy Button for AI messages */}
              {!isUser && (
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={handleCopy}
                  className="absolute -top-2 -right-2 p-1 rounded-lg bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy message"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-primary dark:text-blue-400" />
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-1"
        >
          <span className="text-xs text-muted-foreground/70 dark:text-muted-foreground/60">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {!isUser && message.modelName && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Badge className="text-xs bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 text-primary dark:text-blue-400 hover:bg-primary/30 dark:hover:bg-primary/40 border border-primary/30 dark:border-primary/40 font-semibold">
                ✨ {message.modelName}
              </Badge>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
