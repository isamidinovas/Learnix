import React, { useState } from "react";

interface Subject {
  name: string;
}

interface Textbook {
  id: number;
  title: string;
  author: string;
  edition: string;
  subject: string;
  coverImage: string;
}

const subjects: Subject[] = [
  { name: "Бардык сабактар" },
  { name: "Бухгалтердик эсеп" },
  { name: "Алгебра" },
  { name: "Биология" },
  { name: "Математикалык анализ" },
  { name: "Химия" },
  { name: "Информатика" },
  { name: "Экономика" },
  { name: "Геометрия" },
  { name: "Сызыктуу алгебра" },
  { name: "Органикалык химия" },
  { name: "Физика" },
  { name: "Алгебранын негиздери" },
  { name: "Анализдин негиздери" },
  { name: "Психология" },
  { name: "Статистика" },
];

const textbooks: Textbook[] = [
  {
    id: 1,
    title: "Математикалык анализ: Эрте трансценденталдар",
    author: "Джеймс Стюарт",
    edition: "8-чыгарылыш",
    subject: "Математикалык анализ",
    coverImage:
      "https://static.insales-cdn.com/r/kpBH12vJOFk/rs:fit:1000:0:1/q:100/plain/images/products/1/6675/579770899/cover1__w820844e50623fe00afb.jpg@jpg",
  },
  {
    id: 2,
    title: "Университеттик физика заманбап физика менен",
    author: "Хью Д. Янг",
    edition: "14-чыгарылыш",
    subject: "Физика",
    coverImage:
      "https://static.insales-cdn.com/r/kpBH12vJOFk/rs:fit:1000:0:1/q:100/plain/images/products/1/6675/579770899/cover1__w820844e50623fe00afb.jpg@jpg",
  },
  {
    id: 3,
    title: "Химия: Түзүлүш жана касиеттери",
    author: "Нивальдо Тро",
    edition: "2-чыгарылыш",
    subject: "Химия",
    coverImage:
      "https://static.insales-cdn.com/r/kpBH12vJOFk/rs:fit:1000:0:1/q:100/plain/images/products/1/6675/579770899/cover1__w820844e50623fe00afb.jpg@jpg",
  },
  {
    id: 4,
    title: "Биология: Негизги курс",
    author: "Эрик Ж. Саймон",
    edition: "3-чыгарылыш",
    subject: "Биология",
    coverImage:
      "https://static.insales-cdn.com/r/kpBH12vJOFk/rs:fit:1000:0:1/q:100/plain/images/products/1/6675/579770899/cover1__w820844e50623fe00afb.jpg@jpg",
  },
];

const FindTextbookSolutions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Бардык сабактар");

  const filteredTextbooks = textbooks.filter((textbook) => {
    const matchesSearch =
      textbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      textbook.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "Бардык сабактар" ||
      textbook.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Поисковая строка */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Окуу китептерин жана суроолорду издөө"
            className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Предметы */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name)}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedSubject === subject.name
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="text-sm font-medium">{subject.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Учебники */}
      <div className="max-w-7xl mx-auto mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredTextbooks.map((textbook) => (
            <div
              key={textbook.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full w-full max-w-[200px]"
            >
              <div className="aspect-w-2 aspect-h-3 bg-gray-200">
                <img
                  src={textbook.coverImage}
                  alt={textbook.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1 line-clamp-2">
                    {textbook.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-1">
                    {textbook.author}
                  </p>
                  <p className="text-gray-500 text-xs">{textbook.edition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTextbookSolutions;
