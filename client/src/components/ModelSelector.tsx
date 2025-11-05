import { useState } from "react";
import { Check, ChevronDown, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { FREE_AI_MODELS, MODEL_CATEGORIES, type AIModel } from "@shared/models";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredModels = selectedCategory === "all" 
    ? FREE_AI_MODELS 
    : FREE_AI_MODELS.filter(m => m.category === selectedCategory);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between hover-elevate active-elevate-2 border-2 border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 transition-colors"
            data-testid="button-model-selector"
          >
            <div className="flex flex-col items-start gap-1 overflow-hidden">
              <span className="text-sm font-semibold truncate text-foreground">{selectedModel.name}</span>
              <span className="text-xs text-muted-foreground/70 truncate flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {selectedModel.provider}
              </span>
            </div>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </motion.div>
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 border-primary/20 dark:border-primary/30 shadow-xl shadow-primary/20 dark:shadow-primary/30" align="start">
        <Command>
          <div className="flex items-center border-b border-popover-border px-3 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search models..." 
              className="border-0 focus-visible:ring-0 text-base"
            />
          </div>
          <ScrollArea className="h-[400px]">
            <CommandList>
              <CommandEmpty className="text-center py-8">
                <div className="space-y-2">
                  <p className="text-muted-foreground">No model found.</p>
                  <p className="text-xs text-muted-foreground/70">Try searching with different keywords</p>
                </div>
              </CommandEmpty>
              
              <CommandGroup heading="🎯 Categories" className="px-3 py-3 border-b border-popover-border">
                <div className="flex flex-wrap gap-2">
                  {MODEL_CATEGORIES.map(category => (
                    <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant={selectedCategory === category.id ? "default" : "secondary"}
                        className={`cursor-pointer hover-elevate active-elevate-2 transition-all ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-primary to-blue-500 text-white"
                            : "hover:bg-primary/10 dark:hover:bg-primary/20"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                        data-testid={`badge-category-${category.id}`}
                      >
                        {category.label}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CommandGroup>

              <CommandGroup heading="✨ Available Models" className="px-0">
                {filteredModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <CommandItem
                      value={`${model.name} ${model.provider} ${model.description}`}
                      onSelect={() => {
                        onModelChange(model);
                        setOpen(false);
                      }}
                      className="px-3 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border-b border-popover-border/50 last:border-0"
                      data-testid={`item-model-${model.id}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.4 }}
                        className="mr-2"
                      >
                        <Check
                          className={`h-4 w-4 ${
                            selectedModel.id === model.id
                              ? "opacity-100 text-primary dark:text-blue-400"
                              : "opacity-0"
                          }`}
                        />
                      </motion.div>
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{model.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {model.contextLength}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {model.description}
                        </p>
                      </div>
                    </CommandItem>
                  </motion.div>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
