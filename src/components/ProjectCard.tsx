"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
}: ProjectCardProps) {
  const { isDarkMode } = useTheme();
  const imageUrl = image.toLowerCase().endsWith(".tif")
    ? "/project-images/default-project.jpg"
    : image;

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
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      <div className="p-6">
        <h3
          className={`text-xl font-bold mb-3 transition-colors duration-300
            ${
              isDarkMode
                ? "text-white group-hover:text-blue-400"
                : "text-gray-800 group-hover:text-blue-600"
            }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm mb-4 line-clamp-3 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies?.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                isDarkMode
                  ? "bg-blue-900/50 text-blue-300"
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
