import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 md:py-32 min-h-[600px] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-800">Чындыгында </span>
            <span className="text-blue-600">Оку</span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gray-800">Окуган материалды</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            Сиздин бардык окуу жардамчыңыз.
          </p>
          <p className="text-xl md:text-2xl text-gray-700 mb-12">
            Видео чечимдер жана ЖС жардамы менен окуңуз.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-10 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Акысыз сынап көрүңүз
          </button>
        </div>
      </div>

      {/* Синий персонаж/облако */}
      <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2 w-64 h-64 md:w-96 md:h-96">
        <div className="w-full h-full bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-90 flex items-center justify-center cloud-character shadow-xl">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full absolute -top-10 left-0 shadow-md"></div>
            <div className="w-20 h-20 bg-white rounded-full absolute -top-8 right-0 shadow-md"></div>
            <div className="flex">
              <div className="w-16 h-16 bg-white rounded-full mx-1 shadow-md"></div>
              <div className="w-16 h-16 bg-white rounded-full mx-1 shadow-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-10 right-10 text-blue-600 opacity-50 transform rotate-12">
        <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/4 text-blue-600 opacity-30">
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 5v14h2V5h-2zm-4 0v14h2V5h-2zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
