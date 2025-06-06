// Mobile menu button for the sidebar
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenuButton({
  isOpen,
  toggleMenu,
}: MobileMenuButtonProps) {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`md:hidden fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg transform transition-all duration-300 ${
        isHovered ? "scale-110" : "scale-100"
      } ${
        isOpen
          ? isDarkMode
            ? "bg-red-700 text-white hover:bg-red-600 shadow-red-900/30"
            : "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30"
          : isDarkMode
          ? "bg-sky-700 text-white hover:bg-sky-600 shadow-sky-900/30"
          : "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/30"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDarkMode ? "focus:ring-sky-400" : "focus:ring-sky-300"
      }`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-6 h-6 transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        )}
      </svg>
    </button>
  );
}
