// import React, { useState } from "react";
// import TextBooksBlock from "./TextBooksBlock";

// const TabSection: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const tabs = [
//     "Окуу китептеринин чечимдери",
//     "Мугалимдерибизден сурагыла",
//     "Bootcampтер",
//     "Окуу топтору",
//   ];

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Табы */}
//         <div className="flex space-x-1 mb-12 border-b border-gray-200">
//           {tabs.map((tab, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveTab(index)}
//               className={`py-4 px-8 text-lg font-medium transition-colors duration-200 relative ${
//                 activeTab === index
//                   ? "text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab}
//               {activeTab === index && (
//                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Контент для табов */}
//         <div>
//           {activeTab === 0 && <TextBooksBlock />}
//           {/* {activeTab === 1 && <AskEducatorBlock />}
//           {activeTab === 2 && <BootcampsBlock />}
//           {activeTab === 3 && <StudyGroupBlock />} */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TabSection;
import React, { useState } from "react";
import TextBooksBlock from "./TextBooksBlock";

const TabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Окуу китептеринин чечимдери",
    "Мугалимдерибизден сурагыла",
    "Bootcampтер",
    "Окуу топтору",
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Табы */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex w-max md:w-full md:justify-start space-x-1 mb-8 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap py-3 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors duration-200 relative ${
                  activeTab === index
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Контент для табов */}
        <div>
          {activeTab === 0 && <TextBooksBlock />}
          {/* {activeTab === 1 && <AskEducatorBlock />}
          {activeTab === 2 && <BootcampsBlock />}
          {activeTab === 3 && <StudyGroupBlock />} */}
        </div>
      </div>
    </section>
  );
};

export default TabSection;
