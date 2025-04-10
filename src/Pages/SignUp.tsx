import React from "react";

export const SignUp: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid md:grid-cols-2 items-center gap-16">
        {/* Сол жак - Иллюстрация жана пикир */}
        <div className="space-y-6 text-center md:text-left">
          <img
            src="/illustration.svg"
            alt="Login illustration"
            className="w-full max-w-lg mx-auto"
          />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            “Numerade – бул жөн эле карагандан ашык. Бул колдонмо ар бир суроого
            жазуу түрүндөгү чечимди жана үн менен түшүндүрмөнү берет. Мен бул
            колдонмону жакшы көрөм. Азыр менин кыла турганым – 5 жылдыз коюу
            гана.”
          </p>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <img
              src="/images/student1.avif" // колдонуучунун аватары
              alt="Колдонуучу"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-sm">Тина Хендерсон</div>
              <div className="text-xs text-gray-500">
                Орегон университетинин студенти
              </div>
            </div>
          </div>
        </div>

        {/* Оң жак - Катталуу формасы */}
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Студенттердин 97%ы <br /> жакшы бааларды алышат
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Бизде STEM сабактары боюнча дүйнөдөгү эң чоң видео китепкана бар.
              Ал жогорку деңгээлдеги мектептердин жана университеттердин
              мугалимдери тарабынан окутулат.
            </p>
          </div>

          {/* Социалдык баскычтар */}
          <div className="space-y-3 ">
            <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Google менен каттал
            </button>
            <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook logo"
              />
              Facebook менен каттал
            </button>
            <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <img
                className="h-5 w-5 mr-2"
                src="/images/apple-logo.png"
                alt="Apple logo"
              />
              Apple менен каттал
            </button>
          </div>

          <div className="relative text-center text-gray-400 text-sm">ЖЕ</div>

          {/* Форманын талаалары */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Толук атыңыз"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Сырсөз"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Акысыз катталуу
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Аккаунтуңуз барбы?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Кирүү
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
