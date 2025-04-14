import React from "react";
import { NavLink } from "react-router-dom";

const TextBooksBlock: React.FC = () => {
  return (
    <>
      <h2 className="font-bold text-lg ">
        Эң чоң окуу китептеринин китепканасы
      </h2>
      <p>
        100 миллиондон ашык видео чечимдер миңдеген колледж, орто мектеп жана
        бүтүрүүчүлөр деңгээлиндеги STEM окуу китептерине түздөн-түз дал келген.
      </p>
      <NavLink
        to="/books"
        className="bg-blue-700 text-white font-medium rounded-md p-2"
      >
        Китебиңизди табыңыз
      </NavLink>
    </>
  );
};

export default TextBooksBlock;
