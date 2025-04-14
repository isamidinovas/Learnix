import React from "react";
const Solutions: React.FC = () => {
  return (
    <div className="bg-yellow-100 py-20 relative overflow-hidden h-[500px] ">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 mt-7">
          Окуу китептеринин чечимдери
          <br />
          <span className="underline text-blue-500">чыныгы үйрөнүүгө</span>{" "}
          жардам берет
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Бардык STEM сабактарын, анын ичинде 5000+ окуу китептеринин нускама
          видеолорун жана жоопторун жогорку университеттердин эксперт
          мугалимдеринен үйрөнүңүз.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md">
          Жакшыраак бааларды алыңыз азыр
        </button>
      </div>

      <img src="/images/book.png" alt="book" />
    </div>
  );
};

export default Solutions;
