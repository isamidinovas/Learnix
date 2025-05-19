import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../store/thunks/authThunk";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    dispatch(registerUser({ username, email, password }));
    navigate("/");
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid md:grid-cols-2 items-center gap-16">
        {/* Сол жак - Иллюстрация жана пикир */}
        <div className="space-y-6 text-center md:text-left">
          <img
            src="/illustration.svg"
            alt="Login illustration"
            className="w-full max-w-lg mx-auto"
          />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            “Numerade – бул жөн эле карагандан ашык. Бул колдонмо ар бир суроого
            жазуу түрүндөгү чечимди жана үн менен түшүндүрмөнү берет. Мен бул
            колдонмону жакшы көрөм. Азыр менин кыла турганым – 5 жылдыз коюу
            гана.”
          </p>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <img
              src="/images/student1.avif" // колдонуучунун аватары
              alt="Колдонуучу"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-sm">Тина Хендерсон</div>
              <div className="text-xs text-gray-500">
                Орегон университетинин студенти
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Студенттердин 97%ы <br /> жакшы бааларды алышат
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Бизде STEM сабактары боюнча дүйнөдөгү эң чоң видео китепкана бар.
              Ал жогорку деңгээлдеги мектептердин жана университеттердин
              мугалимдери тарабынан окутулат.
            </p>
          </div>

          <div className="space-y-3 ">
            <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Google менен каттал
            </button>
          </div>

          <div className="relative text-center text-gray-400 text-sm">ЖЕ</div>

          <form className="space-y-4">
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Толук атыңыз"
              value={username}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Сырсөз"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Акысыз катталуу
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Аккаунтуңуз барбы?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Кирүү
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};
