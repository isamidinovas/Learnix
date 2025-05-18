import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

type ToastOptions = {
  text: string;
  duration?: number;
  backgroundColor?: string;
};

export const showSuccessToast = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#16a34a", // Более тёмный green (Tailwind green-600)
    style: {
      fontSize: "1.1rem", // чуть больше шрифт
      padding: "16px 24px", // увеличенный padding для размера окна
      borderRadius: "12px", // закруглённые углы
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // тень для эффекта
    },
  }).showToast();
};

export const showErrorToast = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#ef4444", // Tailwind red-500
  }).showToast();
};

export const showInfoToast = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#3b82f6", // Tailwind blue-500
  }).showToast();
};
