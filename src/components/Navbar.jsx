import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { ROUTES } from "../routes/Route";
import ModalAuth from "./Auth/ModalAuth";
import { useModal } from "../context/ModalProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const dropdownRef = useRef(null);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      toast.success("Logout successful!");
      navigate("/");
    } catch {
      toast.error("Logout failed!");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = user
    ? [
      { label: "My Tasks", href: ROUTES.TASKS, icon: CheckSquare },
      { label: "Calendar", href: ROUTES.CALENDER, icon: Calendar },
      { label: "Analytics", href: ROUTES.ANALYTICS, icon: BarChart3 },
    ]
    : [];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

        {/* Navigation content */}
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckSquare size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </div>
            </Link>

            {/* Center Navigation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group relative flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                >
                  {/* Desktop: Text with icon */}
                  <div className="hidden lg:flex items-center space-x-2">
                    <item.icon
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {/* Mobile/Tablet: Icon only */}
                  <div className="lg:hidden">
                    <item.icon
                      size={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Cool underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 ease-out"></div>

                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-purple-600/10 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:scale-110"
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              {/* Auth Section */}
              {!user ? (
                <button
                  onClick={() => openModal(<ModalAuth />)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  {/* Profile Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User size={16} className="text-white" />
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user.email.split("@")[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 origin-top-right">
                      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-white/10 dark:border-white/5">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Signed in as
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/5 transition-colors group"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <User
                              size={16}
                              className="mr-3 group-hover:scale-110 transition-transform duration-300"
                            />
                            Profile Settings
                          </button>

                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/10 dark:hover:bg-red-900/10 transition-colors group"
                          >
                            <LogOut
                              size={16}
                              className="mr-3 group-hover:scale-110 transition-transform duration-300"
                            />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button - Only show when user is logged in */}
              {user && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="sm:hidden p-2 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-all duration-300"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu - Only for very small screens */}
          {isMobileMenuOpen && user && (
            <div className="sm:hidden mt-4 pt-4 border-t border-white/10 dark:border-white/5">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
