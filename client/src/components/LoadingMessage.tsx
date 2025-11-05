import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function LoadingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="flex gap-4"
      data-testid="loading-message"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="h-8 w-8 flex-shrink-0"
      >
        <Avatar className="h-8 w-8 ring-2 ring-blue-500/30 bg-gradient-to-br from-blue-500 to-cyan-500">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="flex flex-col gap-2 max-w-[85%]">
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl px-4 py-3 bg-gradient-to-r from-card to-card/50 border border-primary/20 rounded-bl-none"
        >
          <div className="flex items-center gap-1.5">
            {[0, 0.2, 0.4].map((delay, index) => (
              <motion.div
                key={index}
                className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-blue-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground font-medium">
              Thinking
              <motion.span
                animate={{ content: [".", "..", "..."] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                .
              </motion.span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
