// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// interface SideMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
//   const [isMoreExpanded, setIsMoreExpanded] = useState(false);

//   return (
//     <div className=" hidden md:flex flex-col h-full bg-white border-r border-gray-200 w-80 transition-all duration-300">
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//             <svg
//               className="w-6 h-6 text-blue-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </div>
//           <div>
//             <div className="font-medium text-gray-800">Конок</div>
//             <button className="text-sm text-green-600 mt-1 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
//               </svg>
//               Окуу жайыңызды кошуңуз
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//             />
//           </svg>
//           PDF менен маектешүү
//         </button>
//       </div>

//       <div className="py-2 flex-1 overflow-y-auto">
//         <NavLink
//           to="/login"
//           className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//         >
//           <svg
//             className="w-5 h-5 mr-3 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//             />
//           </svg>
//           Башкы бет
//         </NavLink>

//         <NavLink
//           to="/ask-educators"
//           className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//         >
//           <svg
//             className="w-5 h-5 mr-3 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//             />
//           </svg>
//           Мугалимдерден сураңыз
//         </NavLink>

//         <NavLink
//           to="/textbooks"
//           className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//         >
//           <svg
//             className="w-5 h-5 mr-3 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//             />
//           </svg>
//           Окуу китептери
//         </NavLink>

//         <NavLink
//           to="/flashcards"
//           className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//         >
//           <svg
//             className="w-5 h-5 mr-3 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//             />
//           </svg>
//           Флэшкарталар
//         </NavLink>

//         <a
//           href="#"
//           className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//         >
//           <svg
//             className="w-5 h-5 mr-3 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//             />
//           </svg>
//           Сабакты жаздыруу
//         </a>

//         <div className="relative">
//           <button
//             onClick={() => setIsMoreExpanded(!isMoreExpanded)}
//             className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
//           >
//             <svg
//               className="w-5 h-5 mr-3 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//             Дагы
//             <svg
//               className={`w-4 h-4 ml-auto transition-transform ${
//                 isMoreExpanded ? "transform rotate-180" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>

//           {isMoreExpanded && (
//             <div className="pl-14 py-2 bg-gray-50">
//               <a
//                 href="#"
//                 className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 Акыркы AI маектер
//               </a>
//               <a
//                 href="#"
//                 className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 Тиркемени жүктөө
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);

  return (
    <>
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity h-full duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 w-72 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex md:w-80`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Кнопка закрытия (мобилка) */}
          <div className="md:hidden flex justify-end p-4 border-b border-gray-200">
            <button onClick={onClose} className="text-gray-500 text-xl">
              &times;
            </button>
          </div>

          {/* Профиль */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-800">Конок</div>
                <button className="text-sm text-green-600 mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Окуу жайыңызды кошуңуз
                </button>
              </div>
            </div>
          </div>

          {/* PDF кнопка */}
          <div className="p-4">
            <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              PDF менен маектешүү
            </button>
          </div>

          {/* Навигация */}
          <div className=" overflow-y-auto">
            <nav className="flex flex-col space-y-1 px-4 gap-5 text-sm">
              <NavLink to="/login" className="nav-item">
                Башкы бет
              </NavLink>
              <NavLink to="/ask-educators" className="nav-item">
                Мугалимдерден сураңыз
              </NavLink>
              <NavLink to="/textbooks" className="nav-item">
                Окуу китептери
              </NavLink>
              <NavLink to="/flashcards" className="nav-item">
                Флэшкарталар
              </NavLink>
              <a href="#" className="nav-item">
                Сабакты жаздыруу
              </a>

              {/* Раскрывающийся блок */}
              <div>
                <button
                  onClick={() => setIsMoreExpanded(!isMoreExpanded)}
                  className="w-full flex items-center py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Дагы
                  <svg
                    className={`w-4 h-4 ml-auto transform transition-transform ${
                      isMoreExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isMoreExpanded && (
                  <div className="ml-6 mt-1 space-y-1 text-sm text-gray-600">
                    <NavLink to="/ai" className="block hover:text-gray-900">
                      Акыркы AI маектер
                    </NavLink>
                    <NavLink to="#" className="block hover:text-gray-900">
                      Тиркемени жүктөө
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="md:hidden border-t border-gray-200 p-4">
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition">
              <NavLink to="/login">Кирүү /</NavLink>{" "}
              <NavLink to="/signup">Катталуу</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
