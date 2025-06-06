// Modules list sidebar for IBM AI Engineer page
import { useTheme } from "@/context/ThemeContext";
import { Module } from "@/types/ibm-ai-types";

interface ModulesListProps {
  modules: Module[];
  selected: number;
  setSelected: (index: number) => void;
}

export default function ModulesList({
  modules,
  selected,
  setSelected,
}: ModulesListProps) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`hidden md:block w-72 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto p-6 border-r ${
        isDarkMode
          ? "border-gray-700 bg-gray-900/40"
          : "border-gray-200 bg-white/30"
      } backdrop-blur-sm`}
    >
      <h2
        className={`text-xl font-bold mb-6 pb-3 border-b ${
          isDarkMode
            ? "border-gray-700 text-gray-200"
            : "border-gray-200 text-gray-800"
        }`}
      >
        Course Modules
      </h2>
      <ul className="space-y-2">
        {modules.map((module, index) => (
          <li key={index}>
            <button
              onClick={() => setSelected(index)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                selected === index
                  ? isDarkMode
                    ? "bg-sky-900/50 text-sky-300 font-medium shadow-md"
                    : "bg-sky-50 text-sky-800 font-medium shadow-sm"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="block text-sm opacity-75 mb-1">
                Module {index + 1}
              </span>
              <span className="block font-medium truncate">{module.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
