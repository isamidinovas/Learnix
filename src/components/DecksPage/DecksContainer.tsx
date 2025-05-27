import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getDecks, getMyDecksList } from "../../store/thunks/deckThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import FlashCard from "../FlashCardsPage/FlashCard";
import { SquarePlus } from "lucide-react";
import { getSubjects } from "../../store/thunks/subjectThunk";
import { RootState } from "../../store";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const DecksContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { subjects, loading: subjectsLoading } = useAppSelector(
    (state: RootState) => state.subjects
  );
  const { creatorDecks } = useAppSelector((state) => state.decks);
  const [search, setSearch] = useState("");
  const { decks, loading: decksLoading } = useAppSelector(
    (state: RootState) => state.decks
  );
  const [selectedCategory, setSelectedCategory] = useState("Баары");

  useEffect(() => {
    dispatch(getDecks({ title: search, subject: selectedCategory }));
    if (user) {
      dispatch(getMyDecksList({ title: search, subject: selectedCategory }));
    }
  }, [search, selectedCategory, user, dispatch]);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">
            Каалаган тема боюнча карточкаларды тап
          </h1>
          <input
            type="text"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Карточкаларды изде..."
            className="w-full p-3 rounded-full border border-purple-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {subjectsLoading ? (
            <div className="animate-pulse flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => handleCategoryChange("Баары")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === "Баары"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>Баары</span>
              </button>
              {subjects.map((subject: Subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleCategoryChange(subject.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === subject.name
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <h2 className="text-xl font-semibold mt-6 mb-6">
          Сиздин карточкаларыңыз
        </h2>
        <NavLink
          to={
            user && localStorage.getItem("access_token")
              ? "/decks/create"
              : "/signup"
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SquarePlus className="w-5 h-5" />
          <span>Жаңы</span>
        </NavLink>
      </div>

      {creatorDecks.length === 0 ? (
        <h3>Сизде азырынча карточка жок!</h3>
      ) : (
        <div className=" mb-6">
          {creatorDecks && (
            <FlashCard
              decks={creatorDecks}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-6">Баардык карточкалар</h2>
      {decksLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : !decks || decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-sm">
          <p className="text-gray-600 text-xl font-medium mb-2">
            Азырынча карточкалар табылган жок
          </p>
        </div>
      ) : (
        <FlashCard selectedCategory={selectedCategory} decks={decks} />
      )}
    </div>
  );
};

export default DecksContainer;
