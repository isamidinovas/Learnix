import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDeckById, updateDeck } from "../../store/thunks/deckThunk";
import { DeckData } from "../../types/decks";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toast";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getSubjects } from "../../store/thunks/subjectThunk";

const DeckEditContainer: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState<number | "">("");
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const { selectedDeck } = useAppSelector((state: RootState) => state.decks);
  const { id } = useParams();
  const { subjects } = useAppSelector((state: RootState) => state.subjects);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSubject = subjects.find((s) => s.id === subjectId);

    const deckData: DeckData = {
      title,
      description,
      subject: selectedSubject?.name || "",
      flashcards,
    };
    if (!id) {
      showErrorToast("ID карточка жок!");
      return;
    }

    const result = await dispatch(updateDeck({ id: id, data: deckData }));

    if (updateDeck.fulfilled.match(result)) {
      navigate("/decks");
    } else if (updateDeck.rejected.match(result)) {
      showErrorToast("Ката: " + result.payload);
    }
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

  // useEffect(() => {
  //   if (selectedDeck) {
  //     setTitle(selectedDeck.title);
  //     setDescription(selectedDeck.description || "");
  //     setSubjectId(selectedDeck.subject);
  //     setFlashcards(
  //       selectedDeck.flashcards?.map((card) => ({ ...card })) || []
  //     );
  //   }
  // }, [selectedDeck]);

  useEffect(() => {
    if (id && !selectedDeck) {
      dispatch(getDeckById(id));
    }
  }, [id, selectedDeck, dispatch]);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);
  useEffect(() => {
    if (subjects.length > 0 && subjectId === "") {
      setSubjectId(subjects[0].id);
    }
  }, [subjects, subjectId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
        Флешкарт өзгөртүү
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
              className=" w-[80%] md:w-full border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={subjectId}
              onChange={(e) => setSubjectId(Number(e.target.value))}
            >
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
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
            Өзгөртүү
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckEditContainer;
