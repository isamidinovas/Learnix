import React from "react";

const testimonials = [
  {
    id: "1",
    name: "Алексей П.",
    role: "Физика-математика факультетинин студенти",
    avatar: "/avatars/student1.jpg",
    text: "Learnix мени сессия убагында куткарды. Толук түшүндүрмөлөр математикалык анализдеги кыйын темаларды түшүнүүгө жардам берди. Азыр бардык курсташтарыма сунуштайм!",
  },
  {
    id: "2",
    name: "Елена К.",
    role: "Химия факультетинин студенти",
    avatar: "/avatars/student2.jpg",
    text: "Видео-түшүндүрмөлөр жана ЖС-жардамчынын аркасында органдык химиядан бааларымды жакшырттым. Өз темпинде окуу өтө ыңгайлуу.",
  },
  {
    id: "3",
    name: "Дмитрий С.",
    role: "Физика окутуучусу",
    avatar: "/avatars/teacher1.jpg",
    text: "Learnix'ти студенттериме кошумча ресурс катары сунуштайм. Материалдардын сапаты таасир этти, ал эми түшүндүрмөлөр кыйын темалар үчүн да жеткиликтүү.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
            Колдонуучуларыбыз эмне дейт
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Миңдеген студенттер жана окутуучулар Learnix'ти баалады
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 overflow-hidden mr-4 shadow-md">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        testimonial.name
                      )}&background=3b82f6&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6">"{testimonial.text}"</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
