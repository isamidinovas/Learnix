import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { loginUser } from "../store/thunks/authThunk";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex items-center gap-12">
        <div className="flex-1 hidden lg:block">
          <div className="relative">
            <div className="absolute -top-4 left-0 w-4 h-4 bg-yellow-300 rounded-full" />
            <div className="absolute top-1/2 right-12 w-6 h-6 bg-blue-500 rounded-full" />
            <div className="absolute bottom-12 left-1/3 text-2xl">✨</div>
            <img
              src="/illustration.svg"
              alt="Login illustration"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>

        <div className="flex-1 max-w-md w-full space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learnix</h1>
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Кирүү
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center space-y-2 text-sm">
            <div>
              Learnixте жаңысызбы?
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Катталуу
              </Link>
            </div>
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Сырсөздү унуттуңузбу?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
