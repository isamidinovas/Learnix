import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logoutUser } from "../../store/thunks/authThunk";
import { Menu, User } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
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
          {/* {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleDeleteCancel}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Карточканы өчүрүүнү каалайсызбы?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Жок
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Ооба
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="hidden md:block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Чыгуу
                </button>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden md:inline">
                    {currentUser.username}
                  </span>
                </NavLink>
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
          {isLogoutModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              <div
                className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-slideIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Чыгууну каалайсызбы?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setIsLogoutModalOpen(false)}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Жок
                    </button>
                    <button
                      onClick={() => {
                        setIsLogoutModalOpen(false);
                        handleLogout();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ооба
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
