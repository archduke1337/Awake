import { MessageSquare, Sparkles, Zap, Brain, Code2 } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  modelName: string;
}

export default function EmptyState({ modelName }: EmptyStateProps) {
  const suggestions = [
    { icon: Brain, text: "Explain quantum computing in simple terms" },
    { icon: Code2, text: "Write a Python function to sort an array" },
    { icon: Sparkles, text: "What are the latest trends in AI?" },
    { icon: Zap, text: "Help me debug this code snippet" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background animations */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full text-center space-y-10 relative z-10"
      >
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center ring-2 ring-primary/30"
            >
              <MessageSquare className="h-12 w-12 text-primary" />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Ready to think differently?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start your conversation with <span className="font-semibold text-foreground">{modelName}</span>
            </p>
            <p className="text-sm text-muted-foreground/70">
              Type anything. Ask anything. Get smarter answers.
            </p>
          </motion.div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-primary"
          >
            <Sparkles className="h-4 w-4" />
            <span>Inspiration</span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 text-left text-sm bg-gradient-to-br from-card to-card/50 border border-primary/20 rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group"
                  onClick={() => console.log("Suggestion clicked:", suggestion.text)}
                  data-testid={`button-suggestion-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                      {suggestion.text}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs text-muted-foreground/60 pt-4"
          >
            💡 Pro tip: Use Shift + Enter for multi-line messages
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
