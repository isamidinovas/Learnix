import React, { useEffect, useRef } from "react";
import "./ApproachSection.css";

const ApproachSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      sectionRef.current?.querySelectorAll(".animate-item");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20 transform rotate-45" />
        <div className="absolute top-1/4 -left-8 w-32 h-32 bg-purple-100 rounded-full opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-yellow-100 rounded-full opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка */}
          <div className="space-y-8">
            <h2 className="animate-item text-4xl font-bold text-gray-900">
              Numerade ыкмасы
            </h2>
            <button className="animate-item animate-delay-1 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              Биз жөнүндө көбүрөөк билүү
            </button>
          </div>

          {/* Правая колонка */}
          <div className="space-y-8">
            <div className="animate-item animate-delay-1 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl text-gray-800 mb-2">
                Баарынан мурда түшүнүүгө багытталган жер:
              </h3>
              <p className="text-gray-600">Үйрөнгөн нерсеңизди түшүнүү.</p>
            </div>

            <div className="animate-item animate-delay-2 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600">
                Эмне үчүн маанилүү экенин түшүнүү.
              </p>
            </div>

            <div className="animate-item animate-delay-3 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600">
                Жана сиз үчүн эмне үчүн маанилүү экенин түшүнүү.
              </p>
            </div>

            <div className="animate-item animate-delay-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-white text-lg font-medium">
                Стресске алдырбаңыз. Сиз муну жасай аласыз.
              </p>
            </div>

            <div className="animate-item animate-delay-5 space-y-4">
              <p className="text-2xl text-gray-400 font-light">Numerade.</p>
              <p className="text-xl text-gray-500">
                Түшүнүү мүмкүнчүлүгү. Баары үчүн.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachSection;
