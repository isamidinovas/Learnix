import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 md:py-32 min-h-[600px] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className=" text-3xl md:text-7xl font-bold mb-6">
            <span className="text-blue-700 ">STEM</span> билимине жол ачкан
            Жасалма Интеллект
          </h1>

          <p className="text-md md:text-2xl text-gray-700 mb-12">
            Жасалма интеллект жардамы менен окуңуз.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
