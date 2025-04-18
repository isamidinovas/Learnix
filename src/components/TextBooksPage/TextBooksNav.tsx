import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Zap,
} from "lucide-react";

// Тестовый студент
const testStudent = {
  id: 1,
  name: "Азамат Асанов",
  email: "azamat@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Azamat",
};

const TextBooksNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Для демонстрации, в реальном приложении это будет управляться через контекст или Redux
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser] = useState(testStudent);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsSearchOpen(false);
  };

  // Имитация выхода
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
  };

  // Имитация входа
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const profilelinks = [
    {
      label: "Профиль",
      href: "/profile",
    },
    {
      label: "Төлөм",
      href: "/billing",
    },
    {
      label: "Жардам",
      href: "/help",
    },
    {
      label: "Плейлисттер",
      href: "/playlists",
    },
  ];
  const menuLinks = [
    {
      label: "Окуу китептери",
      href: "/textbooks",
    },
    {
      label: "AI тарбиячысы",
      href: "/ai-chat",
    },
    {
      label: "Биздин тарбиячылардан сурагыла",
      href: "/ask-educators",
    },
    {
      label: "Флешкарталар",
      href: "/flashcards",
    },
    {
      label: "Менин китепканам",
      href: "/my-library",
    },
    {
      label: "Окуу куралдары",
      href: "/#",
      hasDropdown: true,
    },
  ];

  return (
    <nav className="w-full bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto">
        {/* Top navbar */}
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-blue-600">
              Learnix
            </NavLink>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:block flex-1 max-w-[700px] mx-auto px-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for answers and textbooks"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <Search size={20} className="text-gray-400" />
              </div>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 bg-blue-100 p-1 rounded-md">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Upgrade Button */}
            <button className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors">
              Upgrade
            </button>

            {/* Auth and Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-full hover:bg-gray-100"
                >
                  <User size={24} />
                </button>
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {profilelinks.map((link) => (
                      <NavLink
                        key={link.href}
                        to={link.href}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50"
                      >
                        {link.label}
                      </NavLink>
                    ))}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 w-full"
                    >
                      <LogOut size={16} />
                      <span>Чыгуу</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Кирүү
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Катталуу
                </button>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none relative z-50"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none relative z-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="hidden md:block border-t">
          <div className="flex items-center justify-center space-x-8 px-4">
            {menuLinks.map((link) => (
              <div key={link.href} className="relative group">
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `py-4 px-1 inline-flex items-center gap-1 relative ${
                      isActive
                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className="group-hover:transform group-hover:rotate-180 transition-transform"
                    />
                  )}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search Input */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Издөө..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Search size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Dark overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMenu}
            />

            {/* Menu panel */}
            <div className="fixed inset-y-0 right-0 w-[280px] bg-white z-50">
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex justify-end items-center p-4 border-b">
                  <button
                    onClick={toggleMenu}
                    className="p-2 text-gray-600 hover:text-gray-900 "
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6 ">
                    {menuLinks.map((link) => (
                      <div key={link.href}>
                        <NavLink to={link.href}>{link.label}</NavLink>
                      </div>
                    ))}

                    {isAuthenticated ? (
                      <>
                        <div className="pt-2">
                          <button
                            onClick={toggleProfile}
                            className="flex items-center gap-2 text-gray-700 w-full"
                          >
                            <User size={20} />
                            <span>{currentUser.name}</span>
                            <ChevronDown size={16} className="ml-auto" />
                          </button>
                          {isProfileOpen && (
                            <div className="flex flex-col gap-2 mt-2 pl-7">
                              {profilelinks.map((link) => (
                                <NavLink
                                  key={link.href}
                                  to={link.href}
                                  className="text-gray-700 hover:text-gray-900 opacity-70"
                                >
                                  {link.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <span>Чыгуу</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <button
                          onClick={handleLogin}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <LogIn size={20} />
                          <span>Кирүү</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <span>Катталуу</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default TextBooksNav;
