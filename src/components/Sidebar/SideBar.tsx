import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser, logoutUser } from "../../services/api/auth";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const handleLogout = () => {
    logoutUser();
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUser();
        setProfile({
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity h-full duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 w-72 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex md:w-80`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Кнопка закрытия (мобилка) */}
          <div className="md:hidden flex justify-end p-4 border-b border-gray-200">
            <button onClick={onClose} className="text-gray-500 text-xl">
              &times;
            </button>
          </div>

          {/* Профиль */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <NavLink to="/profile">
                <div className="font-medium text-gray-800">
                  {profile.username ? profile.username : "Конок"}
                </div>
                <button className="text-sm text-green-600 mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Окуу жайыңызды кошуңуз
                </button>
              </NavLink>
            </div>
          </div>

          {/* PDF кнопка */}
          <div className="p-4">
            <NavLink
              to="/ai-chat"
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              PDF менен маектешүү
            </NavLink>
          </div>

          {/* Навигация */}
          <div className=" overflow-y-auto">
            <nav className="flex flex-col space-y-1 px-4 gap-5 text-sm">
              <NavLink to="/login" className="nav-item">
                Башкы бет
              </NavLink>
              <NavLink to="/ask-educators" className="nav-item">
                Мугалимдерден сураңыз
              </NavLink>
              <NavLink to="/textbooks" className="nav-item">
                Окуу китептери
              </NavLink>
              <NavLink to="/decks" className="nav-item">
                Флэшкарталар
              </NavLink>
              <a href="#" className="nav-item">
                Сабакты жаздыруу
              </a>

              {/* Раскрывающийся блок */}
              <div>
                <button
                  onClick={() => setIsMoreExpanded(!isMoreExpanded)}
                  className="w-full flex items-center py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Дагы
                  <svg
                    className={`w-4 h-4 ml-auto transform transition-transform ${
                      isMoreExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isMoreExpanded && (
                  <div className="ml-6 mt-1 space-y-1 text-sm text-gray-600">
                    <NavLink to="/ai" className="block hover:text-gray-900">
                      Акыркы AI маектер
                    </NavLink>
                    <NavLink to="#" className="block hover:text-gray-900">
                      Тиркемени жүктөө
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>
          </div>
          {profile.username ? (
            <div className="md:hidden border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition"
              >
                Чыгуу
              </button>
            </div>
          ) : (
            <div className="md:hidden border-t border-gray-200 p-4">
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition">
                <NavLink to="/login">Кирүү </NavLink>
                <NavLink to="/signup">Катталуу</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
