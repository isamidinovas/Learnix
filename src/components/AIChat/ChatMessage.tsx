import React from "react";

interface ChatMessageProps {
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: Array<{
    type: "image" | "file";
    url: string;
    name: string;
  }>;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  timestamp,
  attachments,
}) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] ${
          isUser ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
        } rounded-lg p-3 shadow-sm`}
      >
        {/* Прикрепленные файлы */}
        {attachments && attachments.length > 0 && (
          <div className="mb-2 space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden ${
                  attachment.type === "image"
                    ? ""
                    : "border border-gray-200 p-2"
                }`}
              >
                {attachment.type === "image" ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        isUser ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {attachment.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Текст сообщения */}
        <p className="whitespace-pre-wrap">{content}</p>

        {/* Время */}
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-blue-200" : "text-gray-400"
          }`}
        >
          {new Date(timestamp).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
