import { Paperclip } from "lucide-react";
import React, { useRef, useEffect } from "react";

interface Message {
  role: string;
  text: string;
  file?: File;
  fileUrl?: string;
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
    <div className="flex flex-col gap-4 py-4" ref={containerRef}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[70%] p-4 rounded-xl ${
            msg.role === "user"
              ? "bg-blue-100 self-end"
              : "bg-gray-100 self-start"
          }`}
        >
          <p className="mb-2 whitespace-pre-wrap">{msg.text}</p>

          {msg.file && msg.fileUrl && (
            <div className="mt-2">
              {msg.file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(msg.file)}
                  alt={msg.file.name}
                  className="rounded-lg border max-h-40 object-contain"
                />
              ) : msg.file.type.startsWith("audio/") ? (
                <audio controls className="mt-2 max-w-full" src={msg.fileUrl}>
                  Your browser does not support the audio element.
                </audio>
              ) : msg.file.type.startsWith("video/") ? (
                <video
                  controls
                  className="mt-2 max-w-full rounded-lg border max-h-40 object-contain"
                  src={msg.fileUrl}
                >
                  Your browser does not support the video element.
                </video>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-700 bg-blue-200 rounded-full">
                  <Paperclip className="w-4 h-4" />
                  {msg.file.name}
                </div>
              )}
            </div>
          )}

          {msg.file && !msg.fileUrl && (
            <div className="mt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-700 bg-blue-200 rounded-full">
                <Paperclip className="w-4 h-4" />
                {msg.file.name}
              </div>
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="text-gray-400 text-sm italic self-start">
          Жооп даярдалып жатат...
        </div>
      )}
    </div>
  );
};

export default Messages;
