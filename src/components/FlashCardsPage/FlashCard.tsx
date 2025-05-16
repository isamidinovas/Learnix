import React from "react";
import { DeckDataList } from "../../types/decks";

interface FlashCard {
  selectedCategory: string;
  decks: DeckDataList[];
}
const FlashCard: React.FC<FlashCard> = ({ selectedCategory, decks }) => {
  console.log("flash:", decks);

  const filteredDecks =
    selectedCategory === "Баары"
      ? decks
      : decks.filter((deck) => deck.subject === selectedCategory);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredDecks.map((deck, idx) => (
        <div
          key={idx}
          className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
              {deck.subject}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{deck.title}</h3>

          <div className="mt-3 text-xs text-blue-500">
            {/* Жараткан:{deck.creator}{" "} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashCard;
