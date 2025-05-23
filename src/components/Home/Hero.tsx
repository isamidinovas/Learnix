import {
  BookA,
  Box,
  CodeXml,
  EqualNot,
  FlaskConical,
  Radical,
} from "lucide-react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 md:py-32 min-h-[390px] md:min-h-[700px] flex items-center relative overflow-hidden">
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
        <Radical className="w-52 h-14 opacity-10 rotate-1 absolute right-3 top-0" />
        <EqualNot className="w-52 h-14 opacity-10 rotate-1 absolute right-3" />
        <Box className="w-52 h-14  opacity-0 md:opacity-10 rotate-1 absolute left-28 top-3" />
        <FlaskConical className="w-52 h-14  opacity-0 md:opacity-10 rotate-1 absolute left-8 " />
      </div>
      <BookA className="w-52 h-14 opacity-0 md:opacity-10 rotate-1 absolute right-56 bottom-[-12px]  " />
    </div>
  );
};

export default Hero;
