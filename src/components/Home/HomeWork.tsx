import React from "react";
const HomeWork: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка с текстом */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 leading-tight">
                Learnix мобилдик тиркемеси
              </h1>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  24/7 Колдоо
                  <br />
                  Тиркемеде үй тапшырмасына жардам
                </h2>
                <p className="text-xl text-gray-600">
                  SnapSolve функциясы менен суроонун сүрөтүн тартып, дароо видео
                  чечимин алыңыз.
                </p>

                {/* App Store кнопкалары */}
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="inline-block">
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      alt="Google Play'ден алыңыз"
                      className="h-16"
                    />
                  </a>
                  <a href="#" className="inline-block">
                    <img
                      src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                      alt="App Store'дон жүктөп алыңыз"
                      className="h-16"
                    />
                  </a>
                </div>

                {/* QR код */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-md">
                    <img
                      src="/qr-code.png"
                      alt="QR код"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="block font-medium">
                      QR кодду скандаңыз
                    </span>
                    <span>тиркемени алуу үчүн!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка с телефоном */}
            <div className="relative">
              <div className="relative mx-auto max-w-[400px]">
                {/* Фоновые элементы */}
                <div className="absolute top-1/4 -left-8 transform -translate-y-1/2">
                  <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-200 rounded-full">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Окуу китептери</div>
                        <div className="text-sm">
                          100M+ окуу китебинин видео чечими
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -right-8">
                  <div className="bg-green-100 text-green-800 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-200 rounded-full">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Суроо берүү</div>
                        <div className="text-sm">
                          Биздин эксперт мугалимдерден жеке видео жооп алыңыз
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Основное изображение телефона */}
                <div className="relative z-10 rounded-[2.5rem] bg-gray-800 shadow-xl">
                  <div className="rounded-[2.5rem] overflow-hidden border-[8px] border-gray-800">
                    <img
                      src="/app-screenshot.png"
                      alt="Numerade тиркемеси"
                      className="w-full"
                    />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-3xl"></div>
                </div>

                {/* Плавающий элемент Snapsolve */}
                <div className="absolute bottom-8 -left-12 bg-red-50 text-red-800 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Snapsolve</div>
                      <div className="text-sm">
                        Каалаган суроонун сүрөтүн тартып, дароо чечим алыңыз
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeWork;
