import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logoutUser } from "../../store/thunks/authThunk";
import { Menu, X, User } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Логотип */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className="text-blue-600 text-2xl font-bold hover:text-blue-700 transition-colors"
            >
              Learnix
            </NavLink>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden md:inline">
                    {currentUser.username}
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Чыгуу
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Кирүү
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Катталуу
                </NavLink>
              </div>
            )}

            {/* Мобильное меню */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Меню"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
