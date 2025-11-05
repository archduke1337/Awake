import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function LoadingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4"
      data-testid="loading-message"
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="bg-accent text-accent-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2 max-w-[85%]">
        <div className="rounded-2xl px-4 py-3 bg-card border border-card-border">
          <div className="flex items-center gap-1">
            <motion.div
              className="h-2 w-2 rounded-full bg-muted-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-muted-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-muted-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
