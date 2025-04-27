"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import TypeWriter from "./TypeWriter";

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center pt-28 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } overflow-hidden`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <h1
              className={`text-5xl lg:text-6xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <TypeWriter />
            </h1>

            <div
              className={`prose prose-lg mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } animate-fade-in-delay`}
            >
              <p className="mb-4">
                Results-driven Computer Engineering student at NUST,
                specializing in artificial intelligence, machine learning, and
                image processing. Expert in developing complex algorithms for
                data analysis and predictive modeling.
              </p>
              <p className="mb-6">
                My expertise spans biomedical AI research, computer vision, and
                data science. With hands-on experience in industry-standard
                tools and frameworks, I transform technical concepts into
                innovative solutions that drive real-world impact.
              </p>
            </div>

            <div className="flex gap-4 animate-fade-in-delay-2">
              <Link
                href="#projects"
                className={`px-8 py-4 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className={`px-8 py-4 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? "border-2 border-blue-500 text-blue-400 hover:bg-blue-900/20"
                    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                } transform hover:scale-105`}
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 max-w-md animate-fade-in-delay">
            <div
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out 
              hover:-translate-y-2 hover:shadow-2xl group
              ${
                isDarkMode
                  ? "bg-gray-800 hover:shadow-blue-500/30 shadow-gray-900/30"
                  : "bg-white hover:shadow-blue-500/20 shadow-gray-200/50"
              }`}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/portfolio.jpg"
                  alt="Muzammil Nawaz Khan"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500
                  ${
                    isDarkMode
                      ? "bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"
                      : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                  } group-hover:opacity-70`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute bottom-0 right-0 w-1/3 h-1/3 ${
          isDarkMode
            ? "bg-gradient-to-tl from-gray-700 to-transparent"
            : "bg-gradient-to-tl from-blue-200 to-transparent"
        } opacity-20 blur-3xl`}
      />
      <div
        className={`absolute top-0 left-0 w-1/4 h-1/4 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-700 to-transparent"
            : "bg-gradient-to-br from-indigo-200 to-transparent"
        } opacity-20 blur-3xl`}
      />
    </div>
  );
}
