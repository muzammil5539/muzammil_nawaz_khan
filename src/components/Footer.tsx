"use client";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const { isDarkMode } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="group">
              <div className="flex items-center gap-1">
                <span className="text-4xl font-black text-blue-600 transition-all duration-300 group-hover:text-blue-700">
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
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <Link
                  href="#about"
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`hover:text-blue-600 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-6 mb-8">
            <a
              href="https://github.com/muzammil5539"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl hover:text-blue-600 transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mnk539/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl hover:text-blue-600 transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:mnk.muzammil86@gmail.com"
              className={`text-2xl hover:text-blue-600 transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Copyright */}
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © {currentYear} Muzammil Nawaz Khan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
