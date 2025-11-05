import { useState } from "react";
import ChatInput from "../ChatInput";

export default function ChatInputExample() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (message: string) => {
    console.log("Message sent:", message);
    setMessages([...messages, message]);
  };

  return (
    <div className="w-full bg-background">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {messages.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sent messages:</h4>
            {messages.map((msg, i) => (
              <div key={i} className="p-3 bg-card rounded-lg border border-card-border">
                <p className="text-sm">{msg}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
