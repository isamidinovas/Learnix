import React, { useState } from "react";
import { sendToGemini } from "../../services/api/chat";
import Messages from "./Messages";

const AIChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const reply = await sendToGemini(input);
    setMessages((prev) => [...prev, { role: "gemini", text: reply }]);

    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6 mt-4 md:mt-0">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <h1 className="md:text-2xl font-semibold text-gray-800 text-md ">
          Жасалма интеллект мугалимибиз ККнан каалаган нерсе жөнүндө сураңыз!
        </h1>
      </div>

      <Messages />
      <div className="w-full px-4 md:px-0 md:max-w-[55%]  mt-4">
        <div className="absolute  bottom-7 w-[85%] md:w-[55%]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Введите сообщение"
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
