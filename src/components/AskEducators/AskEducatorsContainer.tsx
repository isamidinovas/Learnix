import React, { useState } from "react";

const AskEducatorsContainer: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const topics = [
    "Математика",
    "Физика",
    "Химия",
    "Биология",
    "Информатика",
    "Тарых",
    "Адабият",
    "Англис тили",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Мугалимдерден сураңыз
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая секция с формой */}
        <div className="lg:col-span-2">
          <p className="text-lg text-gray-600 mb-6">
            <span className="font-semibold">Чексиз</span> видео чечимдерди
            алыңыз <span className="font-semibold">30 мүнөттүн ичинде</span>,
            жооп күтүп жатканда AI жообун дароо алыңыз.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <textarea
              placeholder="Сурооңузду жазыңыз"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-8 h-8 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8"
                  />
                </svg>
                <div className="text-center">
                  <p className="mb-1">Файлды сүйрөп коюңуз же</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    файлды тандаңыз
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Теманы тандаңыз</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Мугалимден сураңыз
              </button>
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Дароо жооп
              </button>
            </div>
          </div>

          {/* Секция с преподавателями онлайн */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    alt="Educator avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="text-green-500 font-medium">197</span> мугалим
              онлайн
            </div>
          </div>
        </div>

        {/* Правая секция с подсказками */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Суроо берүү боюнча кеңештер
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Так жана кыска жазыңыз</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Негизгиге көңүл буруңуз</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Бардык керектүү маалыматты камтыңыз</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Туура теманы тандаңыз</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Кантип иштейт
              <div className="w-8 h-8">
                <svg
                  className="w-full h-full text-blue-500"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="#A7B4FF"
                    d="M24.3 33.9c-.4.4-.8.6-1.3.6s-1-.2-1.3-.6l-10-10c-.7-.7-.7-1.9 0-2.6l10-10c.7-.7 1.9-.7 2.6 0s.7 1.9 0 2.6L15.9 22l8.4 8.4c.7.6.7 1.8 0 2.5z"
                  />
                </svg>
              </div>
            </h2>
            <ol className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="font-medium">1.</span>
                <span>
                  Биз дароо AI жообун жана окшош суроолордун мыкты чечимдерин
                  беребиз.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium">2.</span>
                <span>
                  Дагы деле жардам керекпи? Биздин мугалимдердин бири сиздин
                  суроого 1-4 сааттын ичинде жооп берет.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium">3.</span>
                <span>Жооп даяр болгондо биз сизге email жөнөтөбүз.</span>
              </li>
            </ol>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
              Жабуу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskEducatorsContainer;
