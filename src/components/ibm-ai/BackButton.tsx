// Back button component for IBM AI page
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function BackButton() {
  const { isDarkMode } = useTheme();

  return (
    <Link
      href="/"
      className={`absolute left-8 top-8 flex items-center gap-2 px-4 py-2 rounded-lg font-medium border-2 transition-all duration-300 z-50 shadow-md
        ${
          isDarkMode
            ? "border-sky-500 text-sky-400 hover:bg-sky-900/30 hover:text-sky-300"
            : "border-sky-600 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
        }`}
    >
      <span className="text-xl">←</span> Back to Portfolio
    </Link>
  );
}
