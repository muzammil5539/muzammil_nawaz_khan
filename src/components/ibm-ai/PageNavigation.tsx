// Page navigation sidebar for IBM AI Engineer page
import { useTheme } from "@/context/ThemeContext";
import { NavigationSection } from "@/types/ibm-ai-types";

interface PageNavigationProps {
  sections: NavigationSection[];
}

export default function PageNavigation({ sections }: PageNavigationProps) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`hidden lg:block sticky top-24 self-start w-60 p-4 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800/70" : "bg-white/80"
      } backdrop-blur-sm`}
    >
      <h4
        className={`text-lg font-bold mb-4 pb-2 border-b ${
          isDarkMode
            ? "border-gray-700 text-gray-200"
            : "border-gray-200 text-gray-800"
        }`}
      >
        On this page
      </h4>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
