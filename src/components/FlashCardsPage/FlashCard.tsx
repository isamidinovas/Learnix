import React, { useState } from "react";
import { DeckDataList } from "../../types/decks";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical, PencilLine, Trash2, X } from "lucide-react";
import { removeDeck } from "../../store/thunks/deckThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface FlashCardProps {
  selectedCategory: string;
  decks: DeckDataList[];
}

const FlashCard: React.FC<FlashCardProps> = ({ decks }) => {
  const [selectedDeck, setSelectedDeck] = useState<DeckDataList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleMenuOpen = (e: React.MouseEvent, deck: DeckDataList) => {
    e.stopPropagation();
    setSelectedDeck(deck);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDeck(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedDeck) {
      try {
        await dispatch(removeDeck(selectedDeck.id.toString()));
        setIsDeleteModalOpen(false);
        setSelectedDeck(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeck(null);
  };

  const handleEdit = () => {
    if (selectedDeck) {
      navigate(`/decks/${selectedDeck.id}/edit`);
      handleModalClose();
    }
  };

  const handleCardClick = (id: string) => {
    if (isModalOpen || isDeleteModalOpen) return;
    navigate(`/decks/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => handleCardClick(deck.id.toString())}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {deck.title}
                </h3>
                {currentUser && currentUser.id === deck.user_id && (
                  <button
                    onClick={(e) => handleMenuOpen(e, deck)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <EllipsisVertical className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                {deck.description || "Түшүндүрмө жок"}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                  {deck.subject}
                </span>
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  {deck.creator?.username}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно управления */}
      {isModalOpen && selectedDeck && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <button
                onClick={handleModalClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleEdit}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <PencilLine className="w-5 h-5" />
                <span>Оңдоо</span>
              </button>

              <button
                onClick={handleDeleteClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Өчүрүү</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {isDeleteModalOpen && selectedDeck && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleDeleteCancel}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Карточканы өчүрүүнү каалайсызбы?
              </h3>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Жок
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Ооба
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlashCard;
