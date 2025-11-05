export interface AIModel {
  id: string;
  name: string;
  provider: string;
  contextLength: string;
  description: string;
  category?: string;
}

export const FREE_AI_MODELS: AIModel[] = [
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek V3.1",
    provider: "DeepSeek",
    contextLength: "164K",
    description: "Hybrid reasoning model (671B params, 37B active) with thinking/non-thinking modes",
    category: "reasoning"
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen3 Coder 480B",
    provider: "Qwen",
    contextLength: "262K",
    description: "MoE code generation model (480B total, 35B active) optimized for coding",
    category: "coding"
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "Kimi K2",
    provider: "MoonshotAI",
    contextLength: "33K",
    description: "Large MoE model (1T params, 32B active) excelling in coding and reasoning",
    category: "reasoning"
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM 4.5 Air",
    provider: "Z.AI",
    contextLength: "131K",
    description: "Lightweight MoE for agent-centric applications with thinking modes",
    category: "agent"
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS-20B",
    provider: "OpenAI",
    contextLength: "131K",
    description: "Open-weight 21B MoE model (3.6B active) with agentic capabilities",
    category: "general"
  },
  {
    id: "nvidia/nemotron-nano-9b-v2:free",
    name: "Nemotron Nano 9B V2",
    provider: "NVIDIA",
    contextLength: "128K",
    description: "Unified model for reasoning and non-reasoning tasks",
    category: "reasoning"
  },
  {
    id: "minimax/minimax-m2:free",
    name: "MiniMax M2",
    provider: "MiniMax",
    contextLength: "131K",
    description: "Compact model (230B total, 10B active) for coding and agentic workflows",
    category: "coding"
  },
  {
    id: "alibaba/tongyi-deepresearch-30b-a3b:free",
    name: "Tongyi DeepResearch 30B",
    provider: "Alibaba",
    contextLength: "131K",
    description: "Agentic LLM (30B total, 3B active) for deep information-seeking",
    category: "research"
  },
  {
    id: "meituan/longcat-flash-chat:free",
    name: "LongCat Flash Chat",
    provider: "Meituan",
    contextLength: "131K",
    description: "Large MoE (560B total, ~27B active) for conversational tasks",
    category: "chat"
  },
  {
    id: "nvidia/nemotron-nano-12b-v2-vl:free",
    name: "Nemotron Nano 12B VL",
    provider: "NVIDIA",
    contextLength: "128K",
    description: "Multimodal model for video understanding and document intelligence",
    category: "multimodal"
  },
  {
    id: "google/gemma-3n-e2b-it:free",
    name: "Gemma 3n 2B",
    provider: "Google",
    contextLength: "32K",
    description: "Multimodal instruction-tuned model (2B effective, 6B architecture)",
    category: "multimodal"
  },
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Venice Uncensored",
    provider: "Venice",
    contextLength: "33K",
    description: "Uncensored fine-tuned Mistral variant (24B) with user control",
    category: "uncensored"
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct:free",
    name: "Llama 3.1 8B",
    provider: "Meta",
    contextLength: "128K",
    description: "Instruction-tuned Llama model for general tasks",
    category: "general"
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B",
    provider: "Meta",
    contextLength: "128K",
    description: "Smaller instruction-tuned Llama model",
    category: "general"
  },
  {
    id: "meta-llama/llama-3.2-1b-instruct:free",
    name: "Llama 3.2 1B",
    provider: "Meta",
    contextLength: "128K",
    description: "Compact Llama model for quick responses",
    category: "general"
  }
];

export const MODEL_CATEGORIES = [
  { id: "all", label: "All Models" },
  { id: "reasoning", label: "Reasoning" },
  { id: "coding", label: "Coding" },
  { id: "chat", label: "Chat" },
  { id: "general", label: "General" },
  { id: "multimodal", label: "Multimodal" },
  { id: "agent", label: "Agent" },
  { id: "research", label: "Research" },
  { id: "uncensored", label: "Uncensored" }
];
