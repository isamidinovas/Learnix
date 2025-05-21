import React from "react";
import { NavLink } from "react-router-dom";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Бүгүн окууну баштаңыз
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Learnix менен окуу процессиңизди жакшыртыңыз. Видео түшүндүрмөлөр,
            Жасалма интеллект жардамчы жана көптөгөн окуу материалдары.
          </p>
          <NavLink
            to="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Акысыз катталуу
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
