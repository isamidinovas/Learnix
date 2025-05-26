import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { loginUser } from "../store/thunks/authThunk";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = "Email киргизиңиз";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Туура email киргизиңиз";
    }

    if (!password) {
      newErrors.password = "Сырсөздү киргизиңиз";
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
      const result = await dispatch(loginUser({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        setMessage("Email же сырсөз туура эмес");
      }
    } catch (error) {
      console.error("Кирүүдө ката:", error);
      setMessage("Email же сырсөз туура эмес");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex items-center gap-12">
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

        <div className="flex-1 max-w-md w-full space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learnix</h1>
            <p className="text-gray-600">Аккаунтуңузга кирүү</p>
          </div>
          {/* 
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span>Google менен кирүү</span>
            </button>
          </div> */}
          {/* 
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Же</span>
            </div>
          </div> */}

          {message && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-fadeIn">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
              Кирүү
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Аккаунтуңуз жокбу?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Катталуу
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
