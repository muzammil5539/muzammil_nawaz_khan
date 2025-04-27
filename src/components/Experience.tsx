"use client";
import { useTheme } from "@/context/ThemeContext";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const { isDarkMode } = useTheme();

  const experiences = [
    {
      title: "Biomedical AI Research and Development Intern",
      company: "RiseTech - Islamabad, Pakistan",
      date: "July 2024 - Sept 2024",
      description: [
        "Developed 3D medical image segmentation models using BraTS2020 dataset for brain tumor diagnosis",
        "Implemented SegFormer3D and UNet 3D architectures using TensorFlow and PyTorch",
        "Optimized deep learning models for improved accuracy in tumor segmentation",
        "Evaluated model performance using dice scores and IoU metrics",
        "Streamlined workflows by establishing models as benchmarks for future comparisons",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Medical Imaging",
        "3D Segmentation",
        "Deep Learning",
      ],
      video: "/projects/Segformer3D.mp4",
    },
  ];

  return (
    <section
      id="experience"
      className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
