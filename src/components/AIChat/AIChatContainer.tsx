import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { Folder } from "lucide-react";
// import { format } from "date-fns";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: Array<{
    type: "image" | "file";
    url: string;
    name: string;
  }>;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: ChatMessage[];
}

interface SuggestedQuestion {
  id: string;
  text: string;
  icon?: string;
}

const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "1",
    text: "Эгерде тепкичтин негизи дубалдан 6 метр алыстыкта жайгашкан болсо, дубал боюнча 8 метр бийиктикке жеткен тепкичтин узундугу канча?",
    icon: "💡",
  },
  {
    id: "2",
    text: "Пифагордун теоремасы тик бурчтуу үч бурчтукту чечүүгө кандайча жардам берет?",
    icon: "💡",
  },
  {
    id: "3",
    text: "Пифагордун теоремасы реалдуу турмушта кандай колдонулат?",
    icon: "❓",
  },
];

const AIChatContainer: React.FC = () => {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Математика боюнча жардам",
      lastMessage: "Интегралдар жөнүндө суроо",
      timestamp: new Date(),
      messages: [],
    },
    {
      id: "2",
      title: "Физика боюнча тапшырма",
      lastMessage: "Ньютондун закондору",
      timestamp: new Date(),
      messages: [],
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    // В реальном приложении здесь будет логика отправки сообщения на сервер
    console.log("Sending message:", newMessage);
    console.log("Attachments:", attachments);

    setNewMessage("");
    setAttachments([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Жасалма интеллект мугалимибиз ККнан каалаган нерсе жөнүндө сураңыз!
        </h1>
      </div>

      {/* Поле ввода */}
      <div className="relative mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Бүгүн эмнени билгиңиз келет?..."
          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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

      {/* Предлагаемые вопросы */}
      <div className="space-y-2">
        {suggestedQuestions.map((question) => (
          <ChatHistory key={question.id} {...question} />
        ))}
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-4 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>Практикалык экзамен түзүү</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <span>Лекция жаздыруу</span>
        </button>
      </div>

      {/* Область загрузки файлов */}
      <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-blue-600">
            <Folder size={48} className="text-yellow-700" />
          </div>
          <p className="text-gray-600">
            Керектүү жардам алуу үчүн{" "}
            <span className="text-blue-600">сүрөт</span> же{" "}
            <span className="text-blue-600">PDF</span>-файл жүктөңүз
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Файл жүктөө
          </label>
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
