export interface AIModel {
  id: string;
  name: string;
  provider: string;
  contextLength: string;
  description: string;
  category?: string;
}

export const FREE_AI_MODELS: AIModel[] = [
  // ⭐ Top Tier - Reasoning & Advanced Models
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek V3.1",
    provider: "DeepSeek",
    contextLength: "164K",
    description: "Hybrid reasoning model (671B params, 37B active) with thinking/non-thinking modes. Excellent for complex problem-solving.",
    category: "reasoning"
  },
  {
    id: "alibaba/tongyi-deepresearch-30b-a3b:free",
    name: "Tongyi DeepResearch 30B",
    provider: "Alibaba",
    contextLength: "131K",
    description: "Agentic LLM (30B total, 3B active) optimized for deep information-seeking and multi-step reasoning.",
    category: "research"
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM 4.5 Air",
    provider: "Z.AI",
    contextLength: "131K",
    description: "Lightweight MoE for agent-centric applications with hybrid thinking modes.",
    category: "agent"
  },
  {
    id: "nvidia/nemotron-nano-9b-v2:free",
    name: "Nemotron Nano 9B V2",
    provider: "NVIDIA",
    contextLength: "128K",
    description: "Unified model for both reasoning and non-reasoning tasks with configurable reasoning.",
    category: "reasoning"
  },

  // 💻 Coding & Development
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen3 Coder 480B",
    provider: "Qwen",
    contextLength: "262K",
    description: "MoE code generation model (480B total, 35B active) for multi-language coding.",
    category: "coding"
  },
  {
    id: "minimax/minimax-m2:free",
    name: "MiniMax M2",
    provider: "MiniMax",
    contextLength: "131K",
    description: "Compact model (230B total, 10B active) excelling at code generation and agentic tasks.",
    category: "coding"
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "Kimi K2",
    provider: "MoonshotAI",
    contextLength: "33K",
    description: "Large MoE model (1T params, 32B active) with strong reasoning and coding capabilities.",
    category: "coding"
  },
  {
    id: "nvidia/llama-3.1-nemotron-70b-instruct:free",
    name: "Llama 3.1 Nemotron 70B",
    provider: "NVIDIA",
    contextLength: "128K",
    description: "Fine-tuned Llama for instruction following and coding tasks.",
    category: "coding"
  },

  // 💬 General Purpose & Chat
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS-20B",
    provider: "OpenAI",
    contextLength: "131K",
    description: "Open-weight 21B MoE model (3.6B active) with agentic capabilities.",
    category: "general"
  },
  {
    id: "meituan/longcat-flash-chat:free",
    name: "LongCat Flash Chat",
    provider: "Meituan",
    contextLength: "131K",
    description: "Large MoE (560B total, ~27B active) optimized for conversational tasks.",
    category: "chat"
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct:free",
    name: "Llama 3.1 8B",
    provider: "Meta",
    contextLength: "128K",
    description: "Fast, versatile instruction-tuned model for diverse tasks.",
    category: "general"
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B",
    provider: "Meta",
    contextLength: "128K",
    description: "Compact instruction-tuned model for efficient inference.",
    category: "general"
  },
  {
    id: "meta-llama/llama-3.2-1b-instruct:free",
    name: "Llama 3.2 1B",
    provider: "Meta",
    contextLength: "128K",
    description: "Ultra-lightweight model for quick responses.",
    category: "general"
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct:free",
    name: "Llama 3.1 70B",
    provider: "Meta",
    contextLength: "128K",
    description: "Powerful 70B model for complex reasoning and analysis.",
    category: "general"
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral 7B Instruct",
    provider: "Mistral AI",
    contextLength: "32K",
    description: "Efficient 7B model optimized for instruction following.",
    category: "general"
  },

  // 🎨 Multimodal
  {
    id: "nvidia/nemotron-nano-12b-v2-vl:free",
    name: "Nemotron Nano 12B VL",
    provider: "NVIDIA",
    contextLength: "128K",
    description: "Multimodal model for video understanding and document intelligence.",
    category: "multimodal"
  },
  {
    id: "google/gemma-3n-e2b-it:free",
    name: "Gemma 3n 2B",
    provider: "Google",
    contextLength: "32K",
    description: "Multimodal instruction-tuned model for text and images.",
    category: "multimodal"
  },
  {
    id: "google/pixtral-12b:free",
    name: "Pixtral 12B",
    provider: "Google",
    contextLength: "128K",
    description: "Multimodal model with vision and text capabilities.",
    category: "multimodal"
  },

  // 🔧 Specialized
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Venice Uncensored (Dolphin-Mistral)",
    provider: "Venice",
    contextLength: "33K",
    description: "Uncensored fine-tuned Mistral for creative writing.",
    category: "general"
  },
  {
    id: "jondurbin/airoboros-l2-70b-2.2:free",
    name: "Airoboros L2 70B",
    provider: "Jon Durbin",
    contextLength: "32K",
    description: "Fine-tuned Llama for instruction following.",
    category: "general"
  },
  {
    id: "gryphe/mythalion-13b:free",
    name: "Mythalion 13B",
    provider: "Gryphe",
    contextLength: "8K",
    description: "Optimized model for roleplay and creative tasks.",
    category: "general"
  },
  {
    id: "toppy/toppy-m-7b:free",
    name: "Toppy M 7B",
    provider: "Toppy",
    contextLength: "4K",
    description: "Compact model for quick responses.",
    category: "general"
  },
  {
    id: "undi95/remm-slerp-l2-13b:free",
    name: "RemM Slerp L2 13B",
    provider: "Undi95",
    contextLength: "8K",
    description: "Fine-tuned model for creative writing.",
    category: "general"
  },
  {
    id: "open-orca/mistral-7b-openorca:free",
    name: "Mistral 7B OpenOrca",
    provider: "Open-Orca",
    contextLength: "8K",
    description: "Instruction-tuned Mistral with creative capabilities.",
    category: "general"
  },
  {
    id: "huggingfaceh4/zephyr-7b-beta:free",
    name: "Zephyr 7B",
    provider: "Hugging Face",
    contextLength: "4K",
    description: "Fast, helpful assistant model.",
    category: "general"
  },
  {
    id: "undi95/toppy-m-7b:free",
    name: "Toppy M 7B (Undi95)",
    provider: "Undi95",
    contextLength: "4K",
    description: "Optimized 7B model for various tasks.",
    category: "general"
  },
  {
    id: "teknium/openhermes-2-mistral-7b:free",
    name: "OpenHermes 2 Mistral 7B",
    provider: "Teknium",
    contextLength: "4K",
    description: "Fine-tuned Mistral for instruction following.",
    category: "general"
  },
  {
    id: "intel/neural-chat-7b-v3-3:free",
    name: "Neural Chat 7B",
    provider: "Intel",
    contextLength: "4K",
    description: "Optimized for conversational AI.",
    category: "chat"
  },
  {
    id: "openchat/openchat-3.5:free",
    name: "OpenChat 3.5",
    provider: "OpenChat",
    contextLength: "8K",
    description: "Efficient chat model.",
    category: "chat"
  },
  {
    id: "nousresearch/nous-hermes-2-mistral-7b-dpo:free",
    name: "Nous Hermes 2 Mistral",
    provider: "Nous Research",
    contextLength: "8K",
    description: "DPO-aligned Mistral for helpfulness.",
    category: "general"
  },
  {
    id: "nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free",
    name: "Nous Hermes 2 Mixtral DPO",
    provider: "Nous Research",
    contextLength: "32K",
    description: "DPO-aligned MoE model.",
    category: "general"
  },
  {
    id: "google/palm-2-chat-bison-32k:free",
    name: "PaLM 2 Chat Bison 32K",
    provider: "Google",
    contextLength: "32K",
    description: "Google's PaLM 2 for extended conversations.",
    category: "chat"
  },
  {
    id: "anthropic/claude-3-haiku:free",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    contextLength: "200K",
    description: "Fast, efficient Claude variant.",
    category: "general"
  },
  {
    id: "cohere/command-r:free",
    name: "Cohere Command R",
    provider: "Cohere",
    contextLength: "128K",
    description: "Instruction-optimized model for business tasks.",
    category: "general"
  },
  {
    id: "cohere/command-r-plus:free",
    name: "Cohere Command R+",
    provider: "Cohere",
    contextLength: "128K",
    description: "More capable variant of Command R.",
    category: "general"
  },
  {
    id: "gryphe/mythomist-7b:free",
    name: "MythoMist 7B",
    provider: "Gryphe",
    contextLength: "8K",
    description: "Creative model optimized for storytelling.",
    category: "general"
  },
  {
    id: "rwkv/rwkv-5-world-3b:free",
    name: "RWKV 5 World 3B",
    provider: "RWKV",
    contextLength: "8K",
    description: "Efficient RNN-based model.",
    category: "general"
  },
  {
    id: "microsoft/phi-2:free",
    name: "Microsoft Phi 2",
    provider: "Microsoft",
    contextLength: "8K",
    description: "Compact model with strong reasoning.",
    category: "general"
  },
  {
    id: "nousresearch/nous-hermes-2-mixtral-8x7b-sft:free",
    name: "Nous Hermes 2 Mixtral SFT",
    provider: "Nous Research",
    contextLength: "32K",
    description: "Supervised fine-tuned MoE model.",
    category: "general"
  },
  {
    id: "meta-llama/llama-2-70b-chat:free",
    name: "Llama 2 70B Chat",
    provider: "Meta",
    contextLength: "4K",
    description: "Previous generation but still capable.",
    category: "general"
  },
  {
    id: "databricks/dbrx-instruct:free",
    name: "DBRX Instruct",
    provider: "Databricks",
    contextLength: "32K",
    description: "Open MoE model from Databricks.",
    category: "general"
  },
  {
    id: "jondurbin/bagel-34b-v0.1:free",
    name: "Bagel 34B",
    provider: "Jon Durbin",
    contextLength: "8K",
    description: "Fine-tuned model for instructions.",
    category: "general"
  },
  {
    id: "upstage/solar-10.7b-instruct-v1.0:free",
    name: "SOLAR 10.7B",
    provider: "Upstage",
    contextLength: "4K",
    description: "Optimized 10B model.",
    category: "general"
  },
  {
    id: "xwin-lm/xwin-lm-70b:free",
    name: "XWin LM 70B",
    provider: "XWin-LM",
    contextLength: "4K",
    description: "Fine-tuned Llama for instruction following.",
    category: "general"
  }
];

export const MODEL_CATEGORIES = [
  { id: "all", label: "🎯 All Models" },
  { id: "reasoning", label: "🧠 Reasoning" },
  { id: "coding", label: "💻 Coding" },
  { id: "chat", label: "💬 Chat" },
  { id: "general", label: "🌟 General" },
  { id: "multimodal", label: "🎨 Multimodal" },
  { id: "agent", label: "🤖 Agent" },
  { id: "research", label: "🔬 Research" }
];
