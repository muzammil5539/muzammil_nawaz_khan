// Page navigation sidebar for IBM AI Engineer page
import { useTheme } from "@/context/ThemeContext";
import { NavigationSection } from "@/types/ibm-ai-types";
import { useState, useEffect } from "react";

interface PageNavigationProps {
  sections: NavigationSection[];
}

export default function PageNavigation({ sections }: PageNavigationProps) {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // using viewport as root
      rootMargin: "0px",
      threshold: 0.2, // at least 20% of the element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={`sticky top-24 self-start w-full p-4 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800/70" : "bg-white/80"
      } backdrop-blur-sm transition-opacity duration-300`}
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
              <button
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? isDarkMode
                      ? "bg-sky-900/60 text-sky-200 font-medium"
                      : "bg-sky-50 text-sky-700 font-medium"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-1 h-5 rounded mr-2 ${
                      activeSection === section.id
                        ? isDarkMode
                          ? "bg-sky-400"
                          : "bg-sky-500"
                        : "bg-transparent"
                    }`}
                  ></div>
                  {section.label}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
