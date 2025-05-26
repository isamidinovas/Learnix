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
  const { decks, loading: decksLoading } = useAppSelector(
    (state: RootState) => state.decks
  );
  const [selectedCategory, setSelectedCategory] = useState("Баары");

  useEffect(() => {
    dispatch(getDecks({ subject: selectedCategory }));
    if (user) {
      dispatch(getMyDecksList({}));
    }
    dispatch(getSubjects());
  }, [dispatch, user, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  console.log("Decks:", decks); // Отладочная информация
  console.log("Decks length:", decks?.length); // Отладочная информация

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Флэшкарталар</h1>
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

      {decksLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : !subjects ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-sm">
          <p className="text-gray-600 text-xl font-medium mb-2">
            "Азырынча колодалар жок"
          </p>
        </div>
      ) : (
        <FlashCard selectedCategory={selectedCategory} decks={decks} />
      )}
    </div>
  );
};

export default DecksContainer;
