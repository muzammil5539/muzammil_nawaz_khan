// Module content component for IBM AI page
import { useTheme } from "@/context/ThemeContext";
import { Module, CourseDetail } from "@/types/ibm-ai-types";
import { useState, useEffect } from "react";

interface ModuleContentProps {
  module: Module;
}

export default function ModuleContent({ module }: ModuleContentProps) {
  const { isDarkMode } = useTheme();
  const [courseDetails, setCourseDetails] = useState<CourseDetail | null>(null);
  const [activeModuleTab, setActiveModuleTab] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isContentChanging, setIsContentChanging] = useState(false); // Load course details function - using direct imports for static export compatibility
  const fetchCourseDetails = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsContentChanging(true);
    try {
      console.log("Loading course details for module:", module.title);
      // Extract module number from GitHub URL
      // Look for patterns like "/1 - " or "/1%20-" or just "/1"
      const moduleNumber = module.github.match(/\/(\d+)(?:%20-|\s*-|$)/)?.[1];
      console.log("Module GitHub URL:", module.github);
      console.log("Extracted module number:", moduleNumber);

      const isSummaryNeeded = moduleNumber === "1";

      if (moduleNumber) {
        try {
          // Create a mapping of module numbers to file names
          const moduleFileMap: Record<string, string> = {
            "1": "machine_learning_with_python",
            "2": "intro_deep_learning_keras",
            "3": "deep_learning_keras_tensorflow",
            "4": "intro_neural_networks_pytorch",
            "5": "deep_learning_pytorch",
            "6": "ai_capstone_project",
            "7": "generative_ai_llms_architecture",
            "8": "genai_foundational_models_nlp",
            "9": "genai_language_modeling_transformers",
            "10": "genai_engineering_finetuning",
            "11": "genai_advanced_finetuning_llms",
            "12": "ai_agents_rag_langchain",
            "13": "project_genai_rag_langchain",
          };

          const fileName = moduleFileMap[moduleNumber];
          if (!fileName) {
            throw new Error(`No course file found for module ${moduleNumber}`);
          }

          // Import the course data directly from the JSON file
          const courseModule = await import(
            `@/app/ibm-ai-engineer/courses/${moduleNumber}_${fileName}.json`
          );
          const data = courseModule.default;

          // If this is the first module, also load the summary
          if (isSummaryNeeded) {
            try {
              const summaryModule = await import(
                `@/app/ibm-ai-engineer/courses/summary.json`
              );
              data.summary = summaryModule.default.summary;
            } catch (summaryError) {
              console.warn(
                "Summary data not available, but continuing with module data",
                summaryError
              );
            }
          }

          setCourseDetails(data);

          // Set the first module tab as active by default if there are module details
          if (data.moduleDetails && data.moduleDetails.length > 0) {
            setActiveModuleTab(data.moduleDetails[0].moduleNumber);
          }
        } catch (importError) {
          console.error("Error loading course data:", importError);
          setErrorMessage(
            `Could not load course data for module ${moduleNumber}. File may not exist.`
          );
          setCourseDetails(null);
        }
      } else {
        setErrorMessage("Could not determine module number from URL");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(`Error loading module content: ${errorMsg}`);
      console.error("Error loading course details:", error);
      setCourseDetails(null);
    } finally {
      setIsLoading(false);
      // Add a small delay before showing content for smoother transition
      setTimeout(() => {
        setIsContentChanging(false);
      }, 300);
    }
  };
  // Call the fetchCourseDetails function when the module changes
  useEffect(() => {
    fetchCourseDetails();
  }, [module]); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to get the active module details
  const getActiveModuleDetails = () => {
    if (!courseDetails?.moduleDetails) return null;
    return courseDetails.moduleDetails.find(
      (mod) => mod.moduleNumber === activeModuleTab
    );
  };
  const activeModule = getActiveModuleDetails();
  return (
    <div
      className={`w-full max-w-none p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-xl backdrop-blur-sm ${
        isDarkMode ? "bg-gray-800/90" : "bg-white"
      } transition-all duration-300`}
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-b-2 ${
              isDarkMode ? "border-sky-400" : "border-sky-600"
            }`}
          ></div>
          <p
            className={`text-sm font-medium animate-pulse ${
              isDarkMode ? "text-sky-400" : "text-sky-600"
            }`}
          >
            Loading module content...
          </p>
        </div>
      )}

      {errorMessage && !isLoading && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            isDarkMode ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <h4 className="font-medium">Error Loading Content</h4>
          </div>
          <p className="text-sm">{errorMessage}</p>
          <button
            onClick={() => fetchCourseDetails()}
            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? "bg-red-800 hover:bg-red-700"
                : "bg-red-100 hover:bg-red-200"
            }`}
          >
            Try Again
          </button>
        </div>
      )}

      <div
        className={`transition-opacity duration-300 ${
          isContentChanging ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isLoading && !errorMessage && (
          <>
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

              {/* Course Summary - only display for specific modules */}
              {courseDetails?.summary && (
                <div
                  className={`mt-8 p-6 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-sky-50"
                  }`}
                >
                  <h4
                    className={`text-xl font-bold mb-3 ${
                      isDarkMode ? "text-sky-300" : "text-sky-600"
                    }`}
                  >
                    Certificate Overview
                  </h4>
                  <p
                    className={`text-base leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {courseDetails.summary}
                  </p>
                </div>
              )}

              {/* Topics covered */}
              {courseDetails?.topics && courseDetails.topics.length > 0 && (
                <div className="mb-8">
                  <h4
                    className={`text-xl font-bold mb-4 ${
                      isDarkMode ? "text-sky-400" : "text-sky-600"
                    }`}
                  >
                    Topics Covered
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseDetails.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className={`p-4 rounded-lg transition-all hover:shadow-md ${
                          isDarkMode
                            ? "bg-gray-700/50 hover:bg-gray-700/80"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <h5
                          className={`font-semibold mb-1 ${
                            isDarkMode ? "text-sky-300" : "text-sky-700"
                          }`}
                        >
                          {topic.name}
                        </h5>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {topic.details}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Module Tabs - show only if we have module details */}
            {courseDetails?.moduleDetails &&
              courseDetails.moduleDetails.length > 0 && (
                <div className="mb-8" id="module-details">
                  {" "}
                  <h4
                    className={`text-xl sm:text-2xl font-bold mb-5 pb-2 border-b ${
                      isDarkMode
                        ? "text-sky-400 border-sky-700"
                        : "text-sky-600 border-sky-300"
                    }`}
                  >
                    Module Details
                  </h4>
                  {/* Module navigation tabs */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 overflow-x-auto pb-2">
                    {courseDetails.moduleDetails.map((mod) => (
                      <button
                        key={mod.moduleNumber}
                        onClick={() => setActiveModuleTab(mod.moduleNumber)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                          activeModuleTab === mod.moduleNumber
                            ? isDarkMode
                              ? "bg-sky-900 text-white font-medium shadow-md"
                              : "bg-sky-100 text-sky-800 font-medium shadow-sm"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Module {mod.moduleNumber}
                      </button>
                    ))}
                  </div>
                  {/* Active module content */}
                  {activeModule && (
                    <div className="mt-4">
                      <h5
                        className={`text-xl font-semibold mb-3 ${
                          isDarkMode ? "text-sky-300" : "text-sky-700"
                        }`}
                      >
                        {activeModule.title}
                      </h5>

                      <p
                        className={`mb-4 text-base ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {activeModule.description}
                      </p>

                      {/* Module labs */}
                      {activeModule.labs && activeModule.labs.length > 0 && (
                        <div className="mt-6">
                          <h6
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? "text-sky-300" : "text-sky-700"
                            }`}
                          >
                            Module Labs
                          </h6>

                          <ul className="space-y-3 pl-4">
                            {activeModule.labs.map((lab) => {
                              const labLink =
                                module.github.replace(
                                  "/tree/main/",
                                  "/blob/main/"
                                ) +
                                "/" +
                                lab.file;
                              return (
                                <li
                                  key={lab.file}
                                  className={`${
                                    isDarkMode
                                      ? "text-gray-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <div>
                                    <a
                                      href={labLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`font-medium hover:underline ${
                                        isDarkMode
                                          ? "text-sky-400 hover:text-sky-300"
                                          : "text-sky-600 hover:text-sky-700"
                                      }`}
                                    >
                                      {lab.name}
                                    </a>
                                    {lab.description && (
                                      <p
                                        className={`text-sm mt-1 ${
                                          isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        {lab.description}
                                      </p>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Module summary */}
                      {activeModule.summary && (
                        <div
                          className="mt-8 p-4 rounded-lg bg-opacity-50 border border-opacity-20 
                  ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-sky-50 border-sky-100'}"
                        >
                          <h6
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? "text-sky-300" : "text-sky-700"
                            }`}
                          >
                            Summary & Highlights
                          </h6>
                          <p
                            className={`whitespace-pre-line text-sm leading-relaxed ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {activeModule.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

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
                  No labs available for this module yet. Check the GitHub
                  repository for updates.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
