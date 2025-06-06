// Loading overlay component for IBM AI page
import { useTheme } from "@/context/ThemeContext";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({
  isLoading,
  message = "Loading content...",
}: LoadingOverlayProps) {
  const { isDarkMode } = useTheme();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className={`rounded-xl p-8 shadow-xl ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-sky-900/20" : "bg-sky-100"
              }`}
            ></div>
            <svg
              className={`animate-spin h-16 w-16 ${
                isDarkMode ? "text-sky-500" : "text-sky-600"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p
            className={`mt-4 text-lg font-medium ${
              isDarkMode ? "text-sky-400" : "text-sky-600"
            }`}
          >
            {message}
          </p>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This may take a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
