import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover-elevate active-elevate-2"
          data-testid="button-model-selector"
        >
          <div className="flex flex-col items-start gap-1 overflow-hidden">
            <span className="text-sm font-medium truncate">{selectedModel.name}</span>
            <span className="text-xs text-muted-foreground truncate">{selectedModel.provider}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <div className="flex items-center border-b border-popover-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput placeholder="Search models..." className="border-0 focus-visible:ring-0" />
          </div>
          <ScrollArea className="h-[400px]">
            <CommandList>
              <CommandEmpty>No model found.</CommandEmpty>
              
              <CommandGroup heading="Categories" className="px-2 py-2">
                <div className="flex flex-wrap gap-1">
                  {MODEL_CATEGORIES.map(category => (
                    <Badge
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "secondary"}
                      className="cursor-pointer hover-elevate active-elevate-2"
                      onClick={() => setSelectedCategory(category.id)}
                      data-testid={`badge-category-${category.id}`}
                    >
                      {category.label}
                    </Badge>
                  ))}
                </div>
              </CommandGroup>

              <CommandGroup heading="Models">
                {filteredModels.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={`${model.name} ${model.provider} ${model.description}`}
                    onSelect={() => {
                      onModelChange(model);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                    data-testid={`item-model-${model.id}`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{model.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {model.contextLength}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {model.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          by {model.provider}
                        </p>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
