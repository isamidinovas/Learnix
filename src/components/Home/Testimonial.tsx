import React from "react";

const Testimonial: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Testimonial Text */}
            <div className="flex-1 relative">
              <div className="absolute -top-8 -left-8 text-blue-600 text-[120px] font-serif opacity-20">
                "
              </div>
              <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  Мен Learnix'ти жакшы көрөм! Үй тапшырмасынын суроосуна такалып
                  калганда, Learnix'ке кирип, маселени кантип чечүү керектигин
                  көрсөтөт... жана математикалык көндүмдөрүмдү жакшыртып
                  жаткандыктан баалар жакшырууда. Өзгөчө пайдалуу функция - бул
                  менин окуу китебиме байланышкан видеолор.
                </p>
                <footer>
                  <div className="font-medium text-lg text-gray-900">
                    Райган Б.
                  </div>
                  <div className="text-blue-600">
                    Математикадан баалары жакшырды
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Student Image */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="relative">
                {/* Blue background decoration */}
                <div className="absolute inset-0 bg-blue-600 rounded-lg transform translate-x-4 translate-y-4"></div>
                {/* Image container */}
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/images/student1.avif"
                    alt="Райган Б."
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x500/4F46E5/FFFFFF?text=R";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
