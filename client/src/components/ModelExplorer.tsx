import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FREE_AI_MODELS } from "@shared/models";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ModelCategory {
  id: string;
  label: string;
  emoji: string;
  count: number;
}

const categories: ModelCategory[] = [
  { id: "all", label: "All Models", emoji: "🎯", count: FREE_AI_MODELS.length },
  { id: "reasoning", label: "Reasoning & Thinking", emoji: "🧠", count: FREE_AI_MODELS.filter(m => m.category === "reasoning").length },
  { id: "coding", label: "Code Generation", emoji: "💻", count: FREE_AI_MODELS.filter(m => m.category === "coding").length },
  { id: "chat", label: "Chat & Conversation", emoji: "💬", count: FREE_AI_MODELS.filter(m => m.category === "chat").length },
  { id: "research", label: "Research & Analysis", emoji: "🔬", count: FREE_AI_MODELS.filter(m => m.category === "research").length },
  { id: "general", label: "General Purpose", emoji: "⚡", count: FREE_AI_MODELS.filter(m => m.category === "general").length },
  { id: "agent", label: "Agent & Planning", emoji: "🤖", count: FREE_AI_MODELS.filter(m => m.category === "agent").length },
];

export default function ModelExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = FREE_AI_MODELS.filter((model) => {
    const categoryMatch = selectedCategory === "all" || model.category === selectedCategory;
    const searchMatch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Explore All 45+ Models</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
          Find the perfect AI for your task. Each model is specialized for different jobs.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
      >
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 sm:pl-12 h-10 sm:h-12 border-indigo-500/30 focus:border-indigo-500/60 text-sm sm:text-base"
          />
        </div>
      </motion.div>

      {/* Category Tabs - Scrollable on Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 px-2 sm:px-0"
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 transition-all flex items-center gap-1 sm:gap-2 whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
              selectedCategory === category.id
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                : "border-border hover:border-indigo-500/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-sm sm:text-base">{category.emoji}</span>
            <span className="font-medium hidden sm:inline">{category.label}</span>
            <span className="font-medium sm:hidden text-xs">{category.label.split(' ')[0]}</span>
            <Badge variant="secondary" className="ml-0.5 sm:ml-1 text-xs px-1.5 sm:px-2 h-auto py-0.5">
              {category.id === "all" ? filteredModels.length : category.count}
            </Badge>
          </motion.button>
        ))}
      </motion.div>

      {/* Models Grid - Responsive */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredModels.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.02 }}
              layout
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 border-indigo-500/20 hover:border-indigo-500/50 group hover:shadow-depth-3 transition-all cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="relative p-3 sm:p-6">
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {model.name}
                      </CardTitle>
                      <CardDescription className="text-xs font-semibold uppercase tracking-wider mt-1">
                        {model.provider}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {model.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      📚 {model.contextLength}
                    </span>
                    {model.category && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 capitalize flex-shrink-0"
                      >
                        {model.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredModels.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12"
        >
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            No models found matching "{searchQuery}". Try a different search!
          </p>
        </motion.div>
      )}

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:mt-16 p-4 sm:p-6 rounded-lg bg-indigo-500/5 border border-indigo-500/20"
      >
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          💡 <strong>Not sure which to pick?</strong> Start with <strong>DeepSeek V3.1</strong> for reasoning,{" "}
          <strong>Qwen3 Coder</strong> for coding, or <strong>Claude</strong> for writing. You can switch anytime!
        </p>
      </motion.div>
    </section>
  );
}
