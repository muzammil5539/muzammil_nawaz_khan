"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed w-full backdrop-blur-sm shadow-sm z-50 ${
        isDarkMode ? "bg-gray-900/90 text-white" : "bg-white/90 text-gray-800"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center gap-1">
              <span
                className="text-4xl font-black text-blue-600 transition-all duration-300 group-hover:text-blue-700"
                style={{ fontFamily: "Arial Black, sans-serif" }}
              >
                M
              </span>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  uzammil
                </span>
                <span className="text-sm font-medium text-blue-600">
                  AI Engineer
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={toggleTheme}
                className={`w-16 h-8 rounded-full p-[2px] transition-all duration-300 ease-in-out relative overflow-hidden
                ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}
                aria-label="Toggle theme"
              >
                {/* Sun Icon */}
                <svg
                  viewBox="0 0 24 24"
                  className={`w-5 h-5 absolute left-[4px] top-[6px] transition-all duration-500 transform z-20 ${
                    isDarkMode
                      ? "opacity-0 rotate-90 translate-y-2"
                      : "opacity-100"
                  }`}
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="5" className="text-yellow-500" />
                  <path
                    className="text-yellow-500"
                    d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.83-7.17l-1.42 1.42M6.25 6.25L4.83 4.83m12.92 12.92l1.42 1.42M6.25 17.75l-1.42 1.42"
                  />
                </svg>

                {/* Moon Icon */}
                <svg
                  viewBox="0 0 24 24"
                  className={`w-5 h-5 absolute right-[4px] top-[6px] transition-all duration-500 transform z-20 ${
                    isDarkMode
                      ? "opacity-100"
                      : "opacity-0 -rotate-90 -translate-y-2"
                  }`}
                  fill="currentColor"
                >
                  <path
                    className="text-yellow-300"
                    d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z"
                  />
                </svg>

                {/* Toggle Knob */}
                <div
                  className={`w-6 h-6 rounded-full transform duration-500 ease-spring relative z-30
                    ${
                      isDarkMode
                        ? "translate-x-8 bg-gray-800 shadow-moon"
                        : "translate-x-0 bg-white shadow-sun"
                    }`}
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-2 group ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <a
                href="/Muzammil Nawaz Khan Resume.pdf"
                download
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                  transform hover:scale-105 border-2
                  ${
                    isDarkMode
                      ? "border-blue-500 text-blue-400 hover:bg-blue-900/20"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden pt-4 pb-3 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2.5 px-4 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/Muzammil Nawaz Khan Resume.pdf"
              download
              className={`block py-2.5 px-4 rounded-lg transition-colors mt-2 border-t ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300 hover:bg-gray-800 border-gray-800"
                  : "text-blue-600 hover:text-blue-700 hover:bg-gray-50 border-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Download Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
