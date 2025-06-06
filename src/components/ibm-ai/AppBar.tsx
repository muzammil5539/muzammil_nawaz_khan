// AppBar component for IBM AI Engineer page
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface AppBarProps {
  title: string;
}

export default function AppBar({ title }: AppBarProps) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 shadow-lg ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`inline-flex items-center px-3 py-1.5 rounded-lg font-medium transition-all ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Portfolio
          </Link>
        </div>

        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-sky-300" : "text-sky-700"
          }`}
        >
          {title}
        </h1>

        <div className="w-24">{/* Placeholder for symmetry */}</div>
      </div>
    </div>
  );
}
