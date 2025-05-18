import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDeck } from "../../store/thunks/deckThunk";
import { DeckData } from "../../types/decks";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../utils/toast";

const subjects = [
  "Математика",
  "Физика",
  "Химия",
  "Биология",
  "Тарых",
  "География",
  "Адабият",
  "Информатика",
  "Англис тили",
  "Башка",
];

const DeckCreateContainer: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deckData: DeckData = {
      title,
      description,
      subject,

      flashcards,
    };

    const result = await dispatch(createDeck(deckData));

    if (createDeck.fulfilled.match(result)) {
      // alert("Колода ийгиликтүү түзүлдү!");
      showSuccessToast("Колода ийгиликтүү түзүлдү!");
      setTitle("");
      setDescription("");
      setSubject(subjects[0]);
      setFlashcards([{ question: "", answer: "" }]);
    } else if (createDeck.rejected.match(result)) {
      alert("Ката: " + result.payload);
    }
    navigate("/decks");
  };

  const handleFlashcardChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...flashcards];
    updated[index][field] = value;
    setFlashcards(updated);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  const removeFlashcard = (index: number) => {
    const updated = [...flashcards];
    updated.splice(index, 1);
    setFlashcards(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
        Флешкарт түзүү
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-xl p-6 space-y-5 mb-10 border border-gray-200">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Аталышы
            </label>
            <input
              type="text"
              placeholder="Мисалы: Химия негиздери"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Түшүндүрмө
            </label>
            <textarea
              placeholder="Бул флашкарт эмнеге арналган?"
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Предмет
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Карточкалар
        </h2>

        <div className="space-y-6">
          {flashcards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition relative"
            >
              {flashcards.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFlashcard(index)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                >
                  Өчүрүү
                </button>
              )}

              <p className="text-gray-600 font-semibold mb-2">
                Карточка {index + 1}
              </p>

              <textarea
                placeholder="Суроо"
                className="w-full border border-gray-300 p-3 rounded-lg mb-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={card.question}
                onChange={(e) =>
                  handleFlashcardChange(index, "question", e.target.value)
                }
                required
              />
              <textarea
                placeholder="Жооп"
                className="w-full border border-gray-300 p-3 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-green-400"
                value={card.answer}
                onChange={(e) =>
                  handleFlashcardChange(index, "answer", e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 flex-wrap">
          <button
            type="button"
            onClick={addFlashcard}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow"
          >
            Жаңы карточка кошуу
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow"
          >
            Сактоо
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckCreateContainer;
