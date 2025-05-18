import React from "react";
import { DeckDataList } from "../../types/decks";
import { NavLink, useNavigate } from "react-router-dom";

interface FlashCard {
  selectedCategory: string;
  decks: DeckDataList[];
}
const FlashCard: React.FC<FlashCard> = ({ selectedCategory, decks }) => {
  const navigate = useNavigate();
  console.log("flash:", decks);
  const handleCardClick = (title: string) => {
    navigate(`/decks/${title}`);
  };
  const filteredDecks =
    selectedCategory === "Баары"
      ? decks
      : decks.filter((deck) => deck.subject === selectedCategory);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredDecks.map((deck) => (
        <NavLink to={`/decks/${deck.id}`}>
          <div
            key={deck.id}
            onClick={() => handleCardClick(deck.title)}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
                {deck.subject}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{deck.title}</h3>

            <div className=" mt-3 text-md ">
              Жараткан:{" "}
              <span className="text-blue-500">
                {"  " + deck.creator?.username}
              </span>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default FlashCard;
