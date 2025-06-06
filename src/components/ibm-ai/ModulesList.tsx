// Modules list sidebar for IBM AI Engineer page
import { useTheme } from "@/context/ThemeContext";
import { Module } from "@/types/ibm-ai-types";
import { useState, useEffect } from "react";
import ModuleSearch from "./ModuleSearch";

interface ModulesListProps {
  modules: Module[];
  selected: number;
  setSelected: (index: number) => void;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function ModulesList({
  modules,
  selected,
  setSelected,
  isOpen,
}: ModulesListProps) {
  const { isDarkMode } = useTheme();
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // Automatically expand the selected module
  useEffect(() => {
    if (!expandedModules.includes(selected)) {
      setExpandedModules((prev) => [...prev, selected]);
    }
  }, [selected, expandedModules]);
  const toggleExpand = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setExpandedModules(modules.map((_, index) => index));
  };

  const collapseAll = () => {
    setExpandedModules([selected]); // Keep only the selected module expanded
  };
  return (
    <div
      className={`fixed left-0 top-24 w-72 h-[calc(100vh-6rem)] transform transition-transform duration-300 z-30 overflow-y-auto border-r ${
        isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      } ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } md:sticky md:z-auto shadow-xl md:shadow-none`}
    >
      <div className="p-6">
        <h2
          className={`text-xl font-bold mb-4 pb-3 border-b ${
            isDarkMode
              ? "border-gray-700 text-gray-200"
              : "border-gray-200 text-gray-800"
          }`}
        >
          Course Modules
        </h2>

        {/* Module Search */}
        <ModuleSearch modules={modules} setSelected={setSelected} />
        {/* Expand/Collapse All Buttons */}
        <div className="flex justify-between mb-4 gap-2">
          <button
            onClick={expandAll}
            className={`text-xs px-2 sm:px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
              isDarkMode
                ? "bg-gray-800 text-sky-400 hover:bg-gray-700"
                : "bg-gray-100 text-sky-600 hover:bg-gray-200"
            }`}
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className={`text-xs px-2 sm:px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
              isDarkMode
                ? "bg-gray-800 text-sky-400 hover:bg-gray-700"
                : "bg-gray-100 text-sky-600 hover:bg-gray-200"
            }`}
          >
            Collapse All
          </button>
        </div>

        <ul className="space-y-2">
          {modules.map((module, index) => (
            <li key={index} className="mb-2">
              <div className="flex flex-col">
                <div
                  onClick={() => setSelected(index)}
                  onMouseEnter={() => setHoveredModule(index)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center cursor-pointer ${
                    selected === index
                      ? isDarkMode
                        ? "bg-sky-900/50 text-sky-300 font-medium shadow-md"
                        : "bg-sky-50 text-sky-800 font-medium shadow-sm"
                      : isDarkMode
                      ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelected(index);
                      e.preventDefault();
                    }
                  }}
                >
                  <div>
                    <span className="block text-sm opacity-75 mb-1">
                      Module {index + 1}
                    </span>
                    <span className="block font-medium truncate">
                      {module.title}
                    </span>{" "}
                  </div>

                  {/* Only show expand button if module has labs */}
                  {module.labs.length > 0 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className={`p-2 rounded-full transition-colors focus:outline-none cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center ${
                        hoveredModule === index ||
                        expandedModules.includes(index)
                          ? isDarkMode
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-200 hover:bg-gray-300"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          toggleExpand(index);
                          e.preventDefault();
                        }
                      }}
                      aria-label={
                        expandedModules.includes(index)
                          ? "Collapse module"
                          : "Expand module"
                      }
                      title={`${
                        expandedModules.includes(index) ? "Collapse" : "Expand"
                      } lab files (${module.labs.length} labs)`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 transition-transform duration-300 ${
                          expandedModules.includes(index) ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {module.labs.length > 0 && (
                  <div
                    className={`ml-6 pl-3 border-l overflow-hidden transition-all duration-300 ease-in-out ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    } ${
                      expandedModules.includes(index)
                        ? "max-h-96 mt-2 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      className={`text-xs mb-2 uppercase font-medium ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Lab Files
                    </p>
                    <ul className="space-y-1">
                      {module.labs.map((lab) => (
                        <li key={lab.file} className="text-sm">
                          <a
                            href={`${module.github.replace(
                              "/tree/main/",
                              "/blob/main/"
                            )}/${lab.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block py-1 px-2 rounded hover:underline transition-colors ${
                              isDarkMode
                                ? "text-sky-400 hover:bg-sky-900/20"
                                : "text-sky-600 hover:bg-sky-50"
                            }`}
                          >
                            {lab.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
