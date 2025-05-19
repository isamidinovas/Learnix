import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getDecks } from "../../store/thunks/deckThunk";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import FlashCard from "../FlashCardsPage/FlashCard";
import { PenLine, SquarePlus } from "lucide-react";

const categories = [
  { name: "Баары", color: "text-blue-600", icon: "📘" },
  { name: "Химия", color: "text-orange-500", icon: "⚗️" },
  { name: "Физика", color: "text-purple-500", icon: "🔭" },
  { name: "Биология", color: "text-green-500", icon: "🧬" },
  { name: "Экономика", color: "text-yellow-500", icon: "💰" },
  { name: "Математика", color: "text-blue-400", icon: "√" },
  { name: "Информатика", color: "text-orange-400", icon: "💻" },
  { name: "Психология", color: "text-indigo-600", icon: "🧠" },
];

export const DecksContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Баары");
  const dispatch = useAppDispatch();
  const { decks, loading, error } = useAppSelector((state) => state.decks);

  useEffect(() => {
    dispatch(getDecks());
  }, []);

  return (
    <div className="p-6">
      <div className="bg-purple-100 p-6 rounded-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">
            Каалаган тема боюнча карточкаларды тап
          </h1>
          <input
            type="text"
            placeholder="Карточкаларды изде..."
            className="w-full p-3 rounded-full border border-purple-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Сиздин карточкаларыңыз</h2>
        <div className="flex gap-2">
          <button className="bg-blue-100 text-blue-700  px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <PenLine /> Түзөтүү
          </button>
          <NavLink
            to="/decks/create"
            className="bg-blue-100 text-blue-700  px-4 py-2 rounded-md text-sm flex items-center gap-1"
          >
            <SquarePlus /> Жаңы
          </NavLink>
          <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm">
            📥 Импорт карточкалар
          </button>
        </div>
      </div>

      <div className="text-gray-500 mb-8">
        Биринчи карточкаңызды кошуңуз жана машыккыла баштаңыз.
      </div>

      <h2 className="text-xl font-semibold mb-4">Популярдуу топтомдор</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
              selectedCategory === cat.name
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            <span>{cat.icon}</span>
            <span className="font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
      {decks && <FlashCard decks={decks} selectedCategory={selectedCategory} />}
    </div>
  );
};
export default DecksContainer;
