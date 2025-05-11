"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  technologies: string[];
  video?: string;
}

export default function ExperienceCard({
  title,
  company,
  date,
  description,
  technologies,
  video,
}: ExperienceCardProps) {
  const { isDarkMode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out 
      hover:-translate-y-2 hover:shadow-2xl group cursor-pointer
      ${
        isDarkMode
          ? "bg-gray-800 hover:shadow-blue-500/30 shadow-gray-900/30"
          : "bg-white hover:shadow-blue-500/20 shadow-gray-200/50"
      }`}
    >
      {video && isClient && (
        <div className="relative h-52 w-full overflow-hidden">
          <video
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            controls
            autoPlay
            muted
            loop
            playsInline
            onClick={(e) => {
              const videoElement = e.target as HTMLVideoElement;
              if (videoElement.paused) {
                videoElement.play();
              } else {
                videoElement.pause();
              }
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className={`absolute inset-0 transition-opacity duration-500
            ${
              isDarkMode
                ? "bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"
                : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            } group-hover:opacity-70`}
          />
          <div className="absolute bottom-2 right-2 z-10 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3
          className={`text-xl font-bold mb-1 transition-colors duration-300
          ${
            isDarkMode
              ? "text-white group-hover:text-blue-400"
              : "text-gray-800 group-hover:text-blue-600"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {company}
        </p>
        <p
          className={`text-sm mb-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {date}
        </p>

        <ul className="space-y-2 mb-4">
          {description.map((item, index) => (
            <li
              key={index}
              className={`flex items-start ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <span className="mr-2 mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-sm rounded-full
                ${
                  isDarkMode
                    ? "bg-blue-900/30 text-blue-300"
                    : "bg-blue-50 text-blue-600"
                }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
