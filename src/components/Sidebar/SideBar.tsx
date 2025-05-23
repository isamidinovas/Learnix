import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUser, logoutUser } from "../../store/thunks/authThunk";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      setProfile({
        username: user.username,
        email: user.email,
      });
    }
  }, [dispatch, user]);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity h-full duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed  top-0 z-50 md:z-10 md:top-4 left-0 h-full bg-white border-r border-gray-200 w-72 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex md:w-80`}
      >
        <div className="flex flex-col h-full w-full">
          <div className="md:hidden flex justify-end p-4 border-b border-gray-200">
            <button
              onClick={onClose}
              className="text-gray-500 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

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
              </NavLink>
            </div>
          </div>

          <div className="mt-4">
            <nav className="flex flex-col space-y-1 px-4 gap-5 text-sm">
              <NavLink to="/decks" className="nav-item">
                Флэшкарталар
              </NavLink>
              <NavLink to="/ai-chat" className="nav-item">
                ЖИ менен маектешүү
              </NavLink>
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
