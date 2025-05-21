import React, { useEffect, useRef } from "react";

export const TrialSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements =
              entry.target.querySelectorAll("[data-animate]");
            animatedElements.forEach((element) => {
              element.classList.remove("opacity-0", "translate-y-5");
              element.classList.add("opacity-100", "translate-y-0");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative container mx-auto px-4 py-16">
      <div className="bg-emerald-500 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400 rounded-full opacity-50 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-400 rounded-full opacity-50 translate-x-20 translate-y-20"></div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Левая секция */}
          <div className="space-y-6">
            <h2
              data-animate
              className="text-4xl font-bold text-white opacity-0 translate-y-5 transition-all duration-700 ease-out"
            >
              7 күндүк акысыз сынак мөөнөтү
            </h2>
            <p
              data-animate
              className="text-emerald-50 text-lg opacity-0 translate-y-5 transition-all duration-700 ease-out delay-100"
            >
              Learnix менен окуу китебиндеги маселелердин видео чечимдерине жана
              эксперттердин үй тапшырмаларына жардамына жетүү мүмкүнчүлүгүнө ээ
              болуңуз.
            </p>
            <button
              data-animate
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-700 ease-out delay-200 opacity-0 translate-y-5"
            >
              Сынак мөөнөтүн баштоо
            </button>
          </div>

          {/* Правая секция */}
          <div className="relative">
            <img
              src="/mascot.png"
              alt="Learnix маскоту"
              className="w-full max-w-md mx-auto animate-[float_3s_ease-in-out_infinite]"
            />
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-75 animate-[float_3s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-75 animate-[float_3s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
