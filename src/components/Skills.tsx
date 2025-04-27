"use client";
import { useTheme } from "@/context/ThemeContext";

const skillsData = {
  "AI & Machine Learning": [
    "TensorFlow",
    "PyTorch",
    "Deep Learning",
    "Computer Vision",
    "CNN",
    "RNN",
    "Transfer Learning",
  ],
  "Programming & Tools": ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
  "Domain Expertise": [
    "Medical Imaging",
    "Image Segmentation",
    "Pattern Recognition",
    "3D Segmentation",
    "Edge Detection",
    "Morphological Operations",
  ],
  "Frameworks & Libraries": [
    "Scikit-learn",
    "LangChain",
    "Streamlit",
    "Google Colab",
    "MongoDB",
    "MySQL",
  ],
};

export default function Skills() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="skills"
      className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className={`rounded-lg p-6 transition-all duration-500 ease-in-out 
                shadow-lg hover:shadow-2xl
                ${
                  isDarkMode
                    ? "bg-gray-800 hover:shadow-blue-500/30 shadow-gray-900/30"
                    : "bg-white hover:shadow-blue-500/20 shadow-gray-200/50"
                }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg cursor-default
                      ${
                        isDarkMode
                          ? "bg-blue-900/30 text-blue-300 hover:bg-blue-800/40 hover:shadow-blue-500/20"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-blue-200"
                      }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
