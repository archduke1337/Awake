import { MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  modelName: string;
}

export default function EmptyState({ modelName }: EmptyStateProps) {
  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort an array",
    "What are the latest trends in AI?",
    "Help me debug this code snippet"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
            <p className="text-muted-foreground">
              Chat with <span className="font-medium text-foreground">{modelName}</span> - completely free!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Try asking:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 text-left text-sm bg-card border border-card-border rounded-lg hover-elevate active-elevate-2 transition-colors"
                onClick={() => console.log("Suggestion clicked:", suggestion)}
                data-testid={`button-suggestion-${index}`}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
