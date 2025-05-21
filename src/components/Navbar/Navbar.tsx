import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logoutUser } from "../../store/thunks/authThunk";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) setMobileSearch("");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 relative">
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-blue-700 text-2xl font-bold">
              Learnix
            </NavLink>
          </div>

          <div className="hidden md:flex flex-1 max-w-5xl mx-4">
            <form className="w-full relative">
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
                  {/* Camera */}
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

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>Чыгуу</span>
              </button>
            ) : (
              <>
                <NavLink className="text-blue-700" to="/login">
                  Кирүү
                </NavLink>
                <NavLink
                  className="text-white bg-blue-700 p-2 rounded-lg"
                  to="/signup"
                >
                  Катталуу
                </NavLink>
              </>
            )}
          </div>

          {isSearchOpen && (
            <div className="flex items-center gap-2 absolute top-[65px] left-4 right-4 z-50 md:hidden">
              <input
                type="text"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder="Издөө..."
                className="flex-1 px-3 py-2 text-sm border rounded-md w-full"
              />
              <button
                onClick={toggleSearch}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
            </div>
          )}

          <button
            id="search-lens-btn"
            className="block md:hidden p-1 hover:text-gray-700 focus:outline-none ml-48"
            aria-label="Издөө"
            onClick={toggleSearch}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            id="menu-btn"
            className="block md:hidden p-1 hover:text-gray-700 focus:outline-none"
            aria-label="Меню"
            onClick={onMenuClick}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
