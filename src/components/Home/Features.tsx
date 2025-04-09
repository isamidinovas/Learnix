import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
            Learnix менен натыйжалуу окуңуз
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Биздин платформа ийгиликтүү окуу үчүн керектүү бардык куралдарды
            камсыз кылат
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Видео чечимдер
            </h3>
            <p className="text-gray-600">
              Тажрыйбалуу окутуучулардан миңдеген кадам-кадам видео
              түшүндүрмөлөргө киришиңиз мүмкүн
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              ЖС Жардамчы
            </h3>
            <p className="text-gray-600">
              ЖС жардамчыга суроо бериңиз жана 24/7 дароо жардам алыңыз
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Окуу китептери жана материалдар
            </h3>
            <p className="text-gray-600">
              Кенен спектрдеги окуу китептери жана билим берүү материалдарына
              кириш
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
