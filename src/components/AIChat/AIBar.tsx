// import { ArrowLeft } from "lucide-react";
// import React from "react";
// import { NavLink } from "react-router-dom";

// interface Query {
//   id: string;
//   text: string;
// }

// interface AIBarProps {
//   queries: Query[];
// }

// const AIBar: React.FC<AIBarProps> = ({ queries }) => {
//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col border-r border-gray-700">
//       <NavLink
//         to="/"
//         className="flex items-center space-x-2 mb-4 text-gray-300 hover:text-white"
//       >
//         <ArrowLeft />
//       </NavLink>
//       <h2 className="text-lg font-semibold mb-4">Суроо тарыхы</h2>
//       <div className="flex-1 space-y-2 overflow-auto">
//         {queries.slice(0, 7).map((query, index) => (
//           <button
//             key={index}
//             className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg truncate"
//             title={query.text}
//           >
//             {query.text}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AIBar;
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface Query {
  id: string;
  text: string;
}

interface AIBarProps {
  queries: Query[];
}

const AIBar: React.FC<AIBarProps> = ({ queries }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 absolute  text-gray-900 text-2xl rounded left-2"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col border-r border-gray-700 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft />
          </NavLink>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4">Суроо тарыхы</h2>
        <div className="flex-1 space-y-2 overflow-auto">
          {queries.slice(0, 7).map((query) => (
            <button
              key={query.id}
              className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg truncate"
              title={query.text}
            >
              {query.text}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AIBar;
