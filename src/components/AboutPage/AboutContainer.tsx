import React from "react";

const AboutContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Биз жөнүндө</h1>
        <p className="text-lg mb-4">
          Learnix — бул STEM (илим, технология, инженерия жана математика)
          жаатындагы билим алуудагы жардамчы платформа. Биздин максат —
          студенттерге заманбап технологиялар аркылуу сапаттуу билимге жетүүгө
          жардам берүү.
        </p>
        <p className="text-lg mb-4">
          Платформанын жүрөгүндө — Жасалма Интеллектке (ЖИ) негизделген
          чат-помощник. Ал студенттерге суроолорду берип, татаал темаларды
          түшүнүүгө, тапшырмаларды аткарууга жана сабактарды пландаштырууга
          жардам берет.
        </p>
        <p className="text-lg mb-4">
          Learnix ошондой эле флэшкарталар, окуу материалдары жана окуу жайга
          байланыштуу маалыматтарды изилдөөгө ыңгайлуу мүмкүнчүлүктөрдү
          сунуштайт.
        </p>
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Эмне үчүн Learnix?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>ЖИ чат — сизге түшүнүктүү жана тез жардамчы.</li>
            <li>Флэшкарталар менен материалдарды жаттоо оңой.</li>
            <li>Сабакка байланыштуу суроолорго тез жооп алыңыз.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;
