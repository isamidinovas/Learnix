import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser, loginUser } from "../store/thunks/authThunk";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    if (!username.trim()) {
      newErrors.username = "Атыңызды киргизиңиз";
    }

    if (!email.trim()) {
      newErrors.email = "Email киргизиңиз";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Туура email киргизиңиз";
    }

    if (!password) {
      newErrors.password = "Сырсөздү киргизиңиз";
    } else if (password.length < 6) {
      newErrors.password = "Сырсөз кеминде 6 белгиден турушу керек";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    try {
      const registerResult = await dispatch(
        registerUser({ username, email, password })
      );

      if (registerResult.meta.requestStatus === "fulfilled") {
        const loginResult = await dispatch(loginUser({ email, password }));
        if (loginResult.meta.requestStatus === "fulfilled") {
          navigate("/");
        } else {
          setMessage("Кирүүдө ката кетти. Кайра аракет кылыңыз.");
        }
      } else {
        setMessage("Каттоодо ката кетти. Кайра аракет кылыңыз.");
      }
    } catch (error) {
      console.error("Каттоодо ката:", error);
      setMessage("Каттоодо ката кетти. Кайра аракет кылыңыз.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex items-center gap-12">
        {/* Левая часть - Иллюстрация и описание */}
        <div className="flex-1 hidden lg:block">
          <div className="relative">
            <div className="absolute -top-4 left-0 w-4 h-4 bg-yellow-300 rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-12 w-6 h-6 bg-blue-500 rounded-full animate-bounce" />

            <img
              src="/illustration.svg"
              alt="Login illustration"
              className="w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Правая часть - Форма регистрации */}
        <div className="flex-1 max-w-md w-full space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learnix</h1>
            <p className="text-gray-600">Жаңы аккаунт түзүү</p>
          </div>

          {message && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-fadeIn">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Толук атыңыз"
                  value={username}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Сырсөз"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Акысыз катталуу
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Аккаунтуңуз барбы?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Кирүү
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
