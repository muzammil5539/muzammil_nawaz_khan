// Module search component for IBM AI page
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Module } from "@/types/ibm-ai-types";

interface ModuleSearchProps {
  modules: Module[];
  setSelected: (index: number) => void;
}

export default function ModuleSearch({
  modules,
  setSelected,
}: ModuleSearchProps) {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredModules =
    searchQuery.trim() === ""
      ? []
      : modules.filter((module) => {
          const query = searchQuery.toLowerCase();
          return (
            module.title.toLowerCase().includes(query) ||
            module.description.toLowerCase().includes(query) ||
            module.labs.some((lab) => lab.name.toLowerCase().includes(query))
          );
        });

  return (
    <div className="relative w-full mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search modules or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            // Delayed blur to allow clicking on results
            setTimeout(() => setIsSearchFocused(false), 200);
          }}
          className={`w-full p-2 pl-10 pr-4 rounded-lg text-sm shadow-sm focus:outline-none ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 border border-gray-700 focus:border-sky-700"
              : "bg-white text-gray-800 border border-gray-200 focus:border-sky-400"
          }`}
        />
        <span className="absolute left-3 top-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={isDarkMode ? "text-gray-500" : "text-gray-400"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className={`absolute right-3 top-2.5 rounded-full p-0.5 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={isDarkMode ? "text-gray-400" : "text-gray-500"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results */}
      {isSearchFocused && filteredModules.length > 0 && (
        <div
          className={`absolute z-20 w-full mt-1 rounded-lg shadow-lg max-h-64 overflow-y-auto ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <ul>
            {filteredModules.map((module, index) => {
              const moduleIndex = modules.findIndex(
                (m) => m.title === module.title
              );
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSelected(moduleIndex);
                      setSearchQuery("");
                    }}
                    className={`block w-full text-left px-4 py-3 hover:transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-700 border-b border-gray-700 text-gray-200"
                        : "hover:bg-gray-100 border-b border-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      Module {moduleIndex + 1}: {module.title}
                    </div>
                    <div
                      className={`text-xs mt-1 truncate ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {module.description.substring(0, 100)}
                      {module.description.length > 100 ? "..." : ""}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {isSearchFocused && searchQuery && filteredModules.length === 0 && (
        <div
          className={`absolute z-20 w-full mt-1 rounded-lg shadow-lg p-4 ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No modules match your search.
          </p>
        </div>
      )}
    </div>
  );
}
