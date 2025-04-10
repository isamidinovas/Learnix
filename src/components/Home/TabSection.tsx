import React, { useState } from "react";

interface TabContent {
  title: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image?: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export const TabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabContent[] = [
    {
      title: "Textbook Solutions",
      heading: "Largest Textbook Library",
      description:
        "Over 100 million video solutions matched directly to thousands of college, high school and graduate-level STEM textbooks.",
      buttonText: "Find Your Textbook",
      buttonLink: "/textbooks",
      stats: [
        { value: "1288", label: "Chemistry" },
        { value: "808", label: "Economics" },
        { value: "882", label: "Chemistry Central" },
        { value: "3114", label: "Physics" },
        { value: "1818", label: "Biology" },
      ],
    },
    {
      title: "Ask Our Educators",
      heading: "Stuck on a Problem?",
      description:
        "Ask a question and get a custom video solution from one of our expert STEM educators within hours.",
      buttonText: "Ask an Educator",
      buttonLink: "/ask",
      image: "/educator.png",
    },
    {
      title: "Bootcamps",
      heading: "Discover Our Bootcamps",
      description:
        "Master core STEM subjects with full-length Bootcamps created by top educators – each one equivalent to a semester-long course.",
      buttonText: "Sign Up for Bootcamps",
      buttonLink: "/bootcamps",
      stats: [
        { value: "879", label: "Calculus 1" },
        { value: "2115", label: "Calculus 2" },
        { value: "2815", label: "Calculus 3" },
      ],
    },
    {
      title: "Study Groups",
      heading: "Virtual Study Sessions with Your Friends and Classmates",
      description:
        "With Study Groups, you can join and create virtual study rooms to learn STEM with other students using Numerade's extensive library of video lessons.",
      buttonText: "Join a Room",
      buttonLink: "/study-groups",
      image: "/study-room.png",
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Табы */}
        <div className="flex space-x-1 mb-12 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-8 text-lg font-medium transition-colors duration-200 relative ${
                activeTab === index
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.title}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Контент */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-animate>
            <h2 className="text-4xl font-bold text-gray-900 opacity-0 translate-y-5 transition-all duration-700 ease-out">
              {currentTab?.heading}
            </h2>
            <p className="text-xl text-gray-600 opacity-0 translate-y-5 transition-all duration-700 ease-out delay-100">
              {currentTab?.description}
            </p>
            <div className="flex gap-4">
              <a
                href={currentTab?.buttonLink}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors opacity-0 translate-y-5 transition-all duration-700 ease-out delay-200"
              >
                {currentTab?.buttonText}
              </a>
              {activeTab === 3 && (
                <a
                  href="/create-room"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors opacity-0 translate-y-5 transition-all duration-700 ease-out delay-200"
                >
                  Create a Room
                </a>
              )}
            </div>
          </div>

          <div className="relative" data-animate>
            {currentTab?.stats ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {currentTab.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-xl shadow-sm opacity-0 translate-y-5 transition-all duration-700 ease-out"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-current"
                        >
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </span>
                      <span className="font-bold">{stat.value}</span>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                {currentTab?.image && (
                  <img
                    src={currentTab.image}
                    alt={currentTab.title}
                    className="w-full rounded-lg shadow-lg opacity-0 translate-y-5 transition-all duration-700 ease-out"
                  />
                )}
                {activeTab === 1 && (
                  <>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-75 animate-[float_3s_ease-in-out_infinite]" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-100 rounded-full opacity-75 animate-[float_3s_ease-in-out_infinite] delay-1000" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
