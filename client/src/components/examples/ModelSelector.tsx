import { useState } from "react";
import ModelSelector from "../ModelSelector";
import { FREE_AI_MODELS } from "@shared/models";

export default function ModelSelectorExample() {
  const [selectedModel, setSelectedModel] = useState(FREE_AI_MODELS[0]);

  return (
    <div className="w-full max-w-md p-6 bg-background">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select AI Model</h3>
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel}
        />
        <div className="mt-4 p-4 bg-card rounded-lg border border-card-border">
          <p className="text-sm text-muted-foreground">Selected: {selectedModel.name}</p>
        </div>
      </div>
    </div>
  );
}
