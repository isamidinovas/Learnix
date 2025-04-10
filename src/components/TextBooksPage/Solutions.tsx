import React from "react";

const Solutions: React.FC = () => {
  return (
    <div className="bg-yellow-100 py-20 relative overflow-hidden h-[500px] ">
      <div className="absolute top-10 left-2 w-32 h-40 border-2 border-blue-500 rounded-md bg-white rotate-[-10deg]">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="bg-green-300 h-1/4 rounded-t-md"></div>
          <div className="flex-grow bg-white"></div>
        </div>
      </div>

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

      <div className="absolute top-20 right-10 w-32 h-40 border-2 border-blue-500 rounded-md bg-white rotate-[15deg]">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="bg-orange-300 h-1/4 rounded-t-md"></div>
          <div className="flex-grow bg-white"></div>
        </div>
      </div>

      {/* Төмөнкү оң бурчтагы элемент (эгерде сүрөттөгүдөй болсо) */}
      <div className="absolute bottom-5 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-50">
        {/* Бул жерге сүрөттөгү элементтин кодун кошсоңуз болот */}
      </div>

      {/* Төмөнкү борборго жакын элемент (эгерде сүрөттөгүдөй болсо) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-16 border-dashed border-blue-500 rounded-full animate-pulse opacity-25"></div>
    </div>
  );
};

export default Solutions;
