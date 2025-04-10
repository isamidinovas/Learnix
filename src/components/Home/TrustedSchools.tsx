import React from "react";

const universities = [
  {
    name: "Emory University",
    logo: "/images/guggi.png",
  },
  {
    name: "University of Rochester",
    logo: "/images/guggi.png",
  },
  {
    name: "Georgia Tech",
    logo: "/images/guggi.png",
  },
  {
    name: "Stanford University",
    logo: "/images/guggi.png",
  },
  {
    name: "University of Illinois",
    logo: "/images/guggi.png",
  },
  {
    name: "Pepperdine University",
    logo: "/images/guggi.png",
  },
];

const TrustedSchools: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden h-[400px] ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Дүйнөнүн мыкты окуу жайларынан 100M+ студент ишенет
        </h2>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            {/* First set of logos */}
            <div className="flex space-x-16 animate-scroll">
              {universities.map((uni) => (
                <div
                  key={uni.name}
                  className="flex items-center justify-center w-48 flex-shrink-0"
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/180x60/4F46E5/FFFFFF?text=${
                        uni.name.split(" ")[0]
                      }`;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless scrolling */}
            <div className="flex space-x-16 animate-scroll">
              {universities.map((uni) => (
                <div
                  key={`${uni.name}-duplicate`}
                  className="flex items-center justify-center w-48 flex-shrink-0"
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/180x60/4F46E5/FFFFFF?text=${
                        uni.name.split(" ")[0]
                      }`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSchools;
