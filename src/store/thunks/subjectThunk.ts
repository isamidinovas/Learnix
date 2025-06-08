import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSubjects, setLoading, setError } from "../reducers/subjectSlice";
import { showErrorToast } from "../../utils/toast";

export const getSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:8000/subject");

      if (!response.ok) {
        throw new Error("Предметтерди алууда ката кетти");
      }

      const data = await response.json();

      // Преобразуем данные из API в нужный формат
      const subjects = data.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        icon: getSubjectIcon(subject.name),
        color: getSubjectColor(subject.name),
      }));

      dispatch(setSubjects(subjects));
      dispatch(setLoading(false));
      return subjects;
    } catch (error) {
      dispatch(setError("Предметтерди алууда ката кетти"));
      dispatch(setLoading(false));
      showErrorToast("Предметтерди алууда ката кетти");
      throw error;
    }
  }
);

// Вспомогательные функции для определения иконок и цветов
const getSubjectIcon = (name: string): string => {
  const icons: { [key: string]: string } = {
    Химия: "⚗️",
    Физика: "🔭",
    Биология: "🧬",
    Экономика: "💰",
    Математика: "√",
    Информатика: "💻",
    Психология: "🧠",
    География: "🌍",
    Адабият: "📖",

    Баары: "📘",
  };
  return icons[name] || "📚";
};

const getSubjectColor = (name: string): string => {
  const colors: { [key: string]: string } = {
    Химия: "text-orange-500",
    Физика: "text-purple-500",
    Биология: "text-green-500",
    Экономика: "text-yellow-500",
    Математика: "text-blue-400",
    Информатика: "text-orange-400",
    Психология: "text-indigo-600",
    Баары: "text-blue-600",
  };
  return colors[name] || "text-gray-600";
};
