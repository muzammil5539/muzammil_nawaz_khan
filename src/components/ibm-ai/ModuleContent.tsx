// Module content component for IBM AI page
import { useTheme } from "@/context/ThemeContext";
import { Module } from "@/types/ibm-ai-types";

interface ModuleContentProps {
  module: Module;
}

export default function ModuleContent({ module }: ModuleContentProps) {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`flex-1 max-w-4xl p-8 rounded-xl shadow-xl backdrop-blur-sm ${
        isDarkMode ? "bg-gray-800/90" : "bg-white"
      }`}
    >
      {" "}
      <section id="overview" className="mb-10">
        <h3
          className={`text-4xl font-extrabold mb-6 pb-2 border-b-2 ${
            isDarkMode
              ? "text-sky-300 border-sky-700"
              : "text-sky-700 border-sky-200"
          }`}
        >
          {module.title}
        </h3>
        <p
          className={`text-lg leading-relaxed mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {module.description}
        </p>
      </section>
      <section id="github" className="mb-10">
        <a
          href={module.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
            ${
              isDarkMode
                ? "bg-sky-600 text-white hover:bg-sky-500"
                : "bg-sky-500 text-white hover:bg-sky-600"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.851 0 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.201 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          View Full Module on GitHub
        </a>
      </section>
      <section id="labs">
        <h4
          className={`text-2xl font-bold mb-5 pb-2 border-b ${
            isDarkMode
              ? "text-sky-400 border-sky-700"
              : "text-sky-600 border-sky-300"
          }`}
        >
          Labs & Notebooks
        </h4>
        {module.labs.length > 0 ? (
          <ul className="space-y-3 list-disc list-inside">
            {module.labs.map((lab) => {
              const labLink =
                module.github.replace("/tree/main/", "/blob/main/") +
                "/" +
                lab.file;
              return (
                <li
                  key={lab.file}
                  className={`text-base ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <a
                    href={labLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline font-medium transition-colors
                    ${
                      isDarkMode
                        ? "text-sky-400 hover:text-sky-300"
                        : "text-sky-600 hover:text-sky-700"
                    }`}
                  >
                    {lab.name}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p
            className={`text-lg italic ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            No labs available for this module yet. Check the GitHub repository
            for updates.
          </p>
        )}
      </section>
    </div>
  );
}
