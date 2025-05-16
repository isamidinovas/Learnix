import { Paperclip } from "lucide-react";
import React, { useRef, useEffect } from "react";

interface Message {
  role: string;
  text: string;
  fileName?: string;
}

interface MessagesProps {
  messages: Message[];
  loading: boolean;
}
export const Messages: React.FC<MessagesProps> = ({ messages, loading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="flex flex-col overflow-auto p-4 space-y-4 h-full"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-xl px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.fileName && (
                <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <Paperclip className="w-4 h-4" />
                  <span className="truncate">{msg.fileName}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className=" rounded-lg px-4 py-2 flex items-center">
              <img src="/images/spinner.svg" alt="Loading..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Messages;
