import React from "react";

interface ChatHistoryProps {
  id: string | number;
  [key: string]: any;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ ...question }) => {
  return (
    <button
      key={question.id}
      onClick={() => question.text}
      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-3"
    >
      <span className="text-xl">{question.icon}</span>
      <span className="text-gray-700">{question.text}</span>
    </button>
  );
};

export default ChatHistory;
