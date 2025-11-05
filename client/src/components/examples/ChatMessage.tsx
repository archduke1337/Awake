import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  const userMessage = {
    id: "1",
    role: "user" as const,
    content: "What are the key differences between DeepSeek V3.1 and Qwen3 Coder?",
    timestamp: new Date(Date.now() - 60000)
  };

  const assistantMessage = {
    id: "2",
    role: "assistant" as const,
    content: "DeepSeek V3.1 is a hybrid reasoning model with 671B parameters (37B active) optimized for thinking/non-thinking modes with a 164K context window. It excels at complex reasoning tasks.\n\nQwen3 Coder, on the other hand, has 480B total parameters (35B active) and is specifically optimized for code generation with an impressive 262K context length, making it ideal for large repository analysis.",
    timestamp: new Date(),
    modelName: "DeepSeek V3.1"
  };

  return (
    <div className="space-y-6 p-8 bg-background">
      <ChatMessage message={userMessage} />
      <ChatMessage message={assistantMessage} />
    </div>
  );
}
