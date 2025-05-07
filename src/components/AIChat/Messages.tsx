import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "ssssssssssss", role: "user" },
    {
      id: 2,
      role: "ai",
      content: "eeeeeeee",
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col ">
      <div ref={containerRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Messages;
