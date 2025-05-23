import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className=" mx-auto px-4 py-12 max-w-[1000px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-20">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Learnix</h3>
            <p className="mb-4 text-sm">
              Студенттер жана окутуучуларга жардам берүү үчүн Жасалма интеллект
              жардамчысы бар билим берүү платформасы.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Кызматтар</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  className="hover:text-white transition-colors"
                  to="/ai-chat"
                >
                  Жасалма интеллект Жардамчы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-white transition-colors"
                  to="/decks"
                >
                  Флеш карточкалар
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors">
                <NavLink to="/about">Биз жөнүндө</NavLink>
              </li>
              {/* <li className="hover:text-white transition-colors">
                <NavLink to="/contacts">Байланыш</NavLink>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {currentYear} Learnix. Бардык укуктар корголгон.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
