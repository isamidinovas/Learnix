import React, { useState } from "react";
import { DeckDataList } from "../../types/decks";
import { NavLink, useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { getDecks, removeDeck } from "../../store/thunks/deckThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface FlashCard {
  selectedCategory: string;
  decks: DeckDataList[];
}
const FlashCard: React.FC<FlashCard> = ({ selectedCategory }) => {
  const decks = useAppSelector((state) => state.decks.decks); // <--- из Redux
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const handleMenuOpen = (e: React.MouseEvent, deck_id: string) => {
    e.stopPropagation(); // чтобы не срабатывал переход по карточке
    setActiveDeckId(deck_id);
  };
  const handleCloseModal = () => {
    setActiveDeckId(null);
  };

  const handleDelete = (deck_id: string) => {
    dispatch(removeDeck(deck_id));
    handleCloseModal();
  };

  const handleCardClick = (id: string) => {
    navigate(`/decks/${id}`);
  };
  const filteredDecks =
    selectedCategory === "Баары"
      ? decks
      : decks.filter((deck) => deck.subject === selectedCategory);
  // console.log("deck.creator?.id:", deck.creator?.id);
  console.log("currentUser?.id:", currentUser);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredDecks.map((deck) => (
        <React.Fragment key={deck.id}>
          <div
            onClick={() => handleCardClick(String(deck.id))}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition relative"
          >
            {String(currentUser?.id) === String(deck.creator?.id) && (
              <EllipsisVertical
                className="absolute right-2 top-2"
                onClick={(e) => handleMenuOpen(e, String(deck.id))}
              />
            )}

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
          {/* Modal */}
          {activeDeckId === String(deck.id) && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Бул карточканы өчүрөсүзбү?
                </h2>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleCloseModal}
                  >
                    Жок
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(String(deck.id))}
                  >
                    Ооба, өчүр
                  </button>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlashCard;
