import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getDeckById } from "../../store/thunks/deckThunk";
import { RootState } from "../../store";
import { NavLink, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, CircleArrowLeft } from "lucide-react";

const DeckDetailContainer: React.FC = () => {
  const { selectedDeck } = useAppSelector((state: RootState) => state.decks);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDeckById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
  }, [selectedDeck]);

  if (
    !selectedDeck ||
    !selectedDeck.flashcards ||
    selectedDeck.flashcards.length === 0
  ) {
    return (
      <div className="text-center mt-10">Колода пустая или не загружена.</div>
    );
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

  return (
    <div className="max-w-2xl mx-auto my-[10%]   p-6 bg-white rounded-lg shadow-lg">
      <NavLink to="/decks" className=" border-gray-600 text-gray-600 p-2  ">
        <CircleArrowLeft className="w-11 h-8 md:h-9 absolute top-7 left-4 md:left-10" />
      </NavLink>
      <div className="text-center mb-6">
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

      <div className="flex justify-between mt-6">
        <ChevronLeft
          onClick={handlePrev}
          className="w-12 h-9 cursor-pointer text-green-600"
        />
        <div className="text-gray-600">
          {currentIndex + 1} / {cards.length}
        </div>

        <ChevronRight
          onClick={handleNext}
          className="h-9 w-12  text-green-600 cursor-pointer"
        />
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Алды менен картага басып, картаны айлантыңыз.
      </p>
    </div>
  );
};

export default DeckDetailContainer;
