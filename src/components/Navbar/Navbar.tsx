import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <NavLink to="/" className="text-blue-700 text-2xl font-bold">
              Learnix
            </NavLink>
          </div>

          <div className="flex-1 max-w-5xl mx-4">
            <form className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="search-text"
                  className="w-full py-2 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Жооптор жана окуу китептерин издөө"
                  name="q"
                  autoComplete="off"
                />
                <input
                  type="file"
                  id="search-image"
                  name="i"
                  accept="image/*"
                  className="hidden"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button
                    id="search-camera-btn"
                    className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Камера менен издөө"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    id="search-clear-btn"
                    className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none hidden"
                    aria-label="Издөөнү тазалоо"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    id="search-lens-btn"
                    className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Издөө"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink className="text-blue-700" to="/login">
              Кирүү
            </NavLink>
            <NavLink
              className="text-white bg-blue-700 p-2 rounded-lg"
              to="/signup"
            >
              Катталуу
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
