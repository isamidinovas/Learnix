// import React, { useState } from "react";
// import { DeckDataList } from "../../types/decks";
// import { NavLink, useNavigate } from "react-router-dom";
// import { EllipsisVertical, Trash2 } from "lucide-react";
// import { getDecks, removeDeck } from "../../store/thunks/deckThunk";
// import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// interface FlashCard {
//   selectedCategory: string;
//   decks: DeckDataList[];
// }
// const FlashCard: React.FC<FlashCard> = ({ selectedCategory }) => {
//   const decks = useAppSelector((state) => state.decks.decks);
//   const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const currentUser = useAppSelector((state) => state.auth.user);
//   const handleMenuOpen = (e: React.MouseEvent, deck_id: string) => {
//     e.stopPropagation();
//     setActiveDeckId(deck_id);
//   };
//   const handleCloseModal = () => {
//     setActiveDeckId(null);
//   };

//   const handleDelete = (deck_id: string) => {
//     dispatch(removeDeck(deck_id));
//     handleCloseModal();
//   };

//   const handleCardClick = (id: string) => {
//     navigate(`/decks/${id}`);
//   };
//   const filteredDecks =
//     selectedCategory === "Баары"
//       ? decks
//       : decks.filter((deck) => deck.subject === selectedCategory);
//   // console.log("deck.creator?.id:", deck.creator?.id);
//   console.log("currentUser?.id:", currentUser);
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//       {filteredDecks.map((deck) => (
//         <React.Fragment key={deck.id}>
//           <div
//             onClick={() => handleCardClick(String(deck.id))}
//             className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition relative"
//           >
//             {String(currentUser?.id) === String(deck.creator?.id) && (
//               <EllipsisVertical
//                 className="absolute right-3 top-4"
//                 onClick={(e) => handleMenuOpen(e, String(deck.id))}
//               />
//             )}

//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-sm bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
//                 {deck.subject}
//               </span>
//             </div>
//             <h3 className="text-lg font-semibold mb-2">{deck.title}</h3>

//             <div className=" mt-3 text-md ">
//               Жараткан:{" "}
//               <span className="text-blue-500">
//                 {"  " + deck.creator?.username}
//               </span>
//             </div>
//           </div>
//           {/* Modal */}
//           {activeDeckId === String(deck.id) && (
//             <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-xl shadow-lg w-80">
//                 <Trash2 />
//                 <h2 className="text-lg font-semibold mb-4">
//                   Бул карточканы өчүрөсүзбү?
//                 </h2>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     onClick={handleCloseModal}
//                   >
//                     Жок
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     onClick={() => handleDelete(String(deck.id))}
//                   >
//                     Ооба, өчүр
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default FlashCard;
import React, { useState } from "react";
import { DeckDataList } from "../../types/decks";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { removeDeck } from "../../store/thunks/deckThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface FlashCard {
  selectedCategory: string;
  decks: DeckDataList[];
}

const FlashCard: React.FC<FlashCard> = ({ selectedCategory, decks }) => {
  // const decks = useAppSelector((state) => state.decks.decks);
  const [menuDeckId, setMenuDeckId] = useState<string | null>(null); // Для меню с кнопкой удаления
  const [confirmDeckId, setConfirmDeckId] = useState<string | null>(null); // Для окна подтверждения
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleMenuOpen = (e: React.MouseEvent, deck_id: string) => {
    e.stopPropagation();
    setMenuDeckId(deck_id);
  };

  const handleMenuClose = () => {
    setMenuDeckId(null);
  };

  const handleConfirmOpen = () => {
    setConfirmDeckId(menuDeckId);
    setMenuDeckId(null);
  };

  const handleConfirmClose = () => {
    setConfirmDeckId(null);
  };

  const handleDelete = (deck_id: string) => {
    dispatch(removeDeck(deck_id));
    handleConfirmClose();
  };

  const handleCardClick = (id: string) => {
    if (menuDeckId === id || confirmDeckId === id) return;
    navigate(`/decks/${id}`);
  };
  const handleCardUpdate = (deck_id: string) => {
    navigate(`/decks/${deck_id}/edit`);
  };

  const filteredDecks =
    selectedCategory === "Баары"
      ? decks
      : decks.filter((deck) => deck.subject === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredDecks.map((deck) => (
        <React.Fragment key={deck.id}>
          <div
            onClick={() => handleCardClick(String(deck.id))}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition relative cursor-pointer"
          >
            {String(deck.creator?.id) === String(currentUser?.id) && (
              <EllipsisVertical
                className="absolute right-3 top-4 cursor-pointer"
                onClick={(e) => handleMenuOpen(e, String(deck.id))}
              />
            )}

            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
                {deck.subject}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{deck.title}</h3>

            <div className="mt-3 text-md ">
              Жараткан:{" "}
              <span className="text-blue-500">
                {"  " + deck.creator?.username}
              </span>
            </div>
          </div>

          {/* Меню с кнопкой удаления */}
          {menuDeckId === String(deck.id) && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
              onClick={handleMenuClose} // Закрыть при клике вне меню
            >
              <div
                className="bg-white p-4 rounded-lg shadow-lg w-48 flex items-center "
                onClick={(e) => e.stopPropagation()} // Не закрывать при клике внутри меню
              >
                <button
                  className=" text-red-600 hover:bg-red-100 px-4 py-2 rounded  "
                  onClick={handleConfirmOpen}
                >
                  <Trash2 size={20} />
                </button>
                <button onClick={() => handleCardUpdate(String(deck.id))}>
                  <PencilLine />
                </button>
              </div>
            </div>
          )}

          {/* Окно подтверждения удаления */}
          {confirmDeckId === String(deck.id) && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
              onClick={handleConfirmClose} // Закрыть при клике вне окна
            >
              <div
                className="bg-white p-6 rounded-xl shadow-lg w-80"
                onClick={(e) => e.stopPropagation()} // Не закрывать при клике внутри окна
              >
                <Trash2 className="mx-auto mb-4 text-red-500" size={40} />
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Бул карточканы өчүрөсүзбү?
                </h2>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleConfirmClose}
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
