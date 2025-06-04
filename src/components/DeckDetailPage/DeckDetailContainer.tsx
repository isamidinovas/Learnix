import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getDeckById, removeDeck } from "../../store/thunks/deckThunk";
import { RootState } from "../../store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CircleArrowLeft,
  EllipsisVertical,
  PencilLine,
  Trash2,
  X,
} from "lucide-react";
import { showErrorToast } from "../../utils/toast";

const DeckDetailContainer: React.FC = () => {
  const { selectedDeck } = useAppSelector((state: RootState) => state.decks);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDeckById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
  }, [selectedDeck]);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (id) {
      try {
        await dispatch(removeDeck(id));
        navigate(`/decks`);
      } catch (error) {
        showErrorToast("Карточканы өчүрүүдө ката кетти");
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    if (id) {
      setIsModalOpen(false);
      navigate(`/decks/${id}/edit`);
    }
  };

  if (
    !selectedDeck ||
    !selectedDeck.flashcards ||
    selectedDeck.flashcards.length === 0
  ) {
    return <div className="text-center mt-10">Карточка бош</div>;
  }

  const cards = selectedDeck.flashcards;
  const card = cards[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-2xl mx-auto my-[10%] p-6 bg-white rounded-lg shadow-lg relative">
      <NavLink to="/decks" className="text-gray-600 p-2">
        <CircleArrowLeft className="w-11 h-8 md:h-9 absolute top-7 left-4 md:left-10 opacity-50 hover:opacity-100 transition-opacity" />
      </NavLink>
      {selectedDeck?.user_id === currentUser?.id && (
        <div className="absolute top-7 right-4 md:right-10">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <EllipsisVertical className="w-6 h-6 text-gray-600" />
          </button>
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
        </div>
      )}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-green-700">
          {selectedDeck.title}
        </h2>
        <p className="text-lg italic text-gray-600">{selectedDeck.subject}</p>
        <p className="mt-2 text-gray-700">
          {selectedDeck.description || "Нет описания"}
        </p>
      </div>

      <div
        onClick={handleFlip}
        className="perspective cursor-pointer select-none w-full h-64 mx-auto rounded-xl shadow-xl"
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          <div className="card-front">
            <p className="text-2xl font-semibold">{card.question}</p>
          </div>
          <div className="card-back">
            <p className="text-2xl font-semibold">{card.answer}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-green-600" />
        </button>

        <div className="text-gray-600 font-medium">
          {currentIndex + 1} / {cards.length}
        </div>

        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-green-600" />
        </button>
      </div>

      <p className="text-center text-gray-500 mt-4">
        Алды менен картага басып, картаны айлантыңыз.
      </p>

      {/* Модальное окно подтверждения удаления */}
      {isDeleteModalOpen && (
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
    </div>
  );
};

export default DeckDetailContainer;
