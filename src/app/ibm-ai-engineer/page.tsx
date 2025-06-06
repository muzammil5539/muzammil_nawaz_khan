// IBM AI Engineer Certificate Page
"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ModulesList from "@/components/ibm-ai/ModulesList";
import ModuleContent from "@/components/ibm-ai/ModuleContent";
import PageNavigation from "@/components/ibm-ai/PageNavigation";
import AppBar from "@/components/ibm-ai/AppBar";
import { NavigationSection } from "@/types/ibm-ai-types";
import { modules } from "@/data/ibm-ai-modules";

export default function IbmAiEngineerPage() {
  const { isDarkMode } = useTheme();
  const [selected, setSelected] = useState(0);

  // For right sidebar navigation
  const sections: NavigationSection[] = [
    { id: "overview", label: "Overview" },
    { id: "labs", label: "Labs & Notebooks" },
    { id: "github", label: "GitHub" },
  ];
  return (
    <>
      {/* App Bar */}
      <AppBar title="IBM AI Engineer Professional Certificate" />

      <div
        className={`min-h-screen flex pt-24 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        {" "}
        {/* Left Sidebar Component */}
        <ModulesList
          modules={modules}
          selected={selected}
          setSelected={setSelected}
        />
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 flex flex-col lg:flex-row gap-8">
          {/* Module Content Component */}
          <ModuleContent module={modules[selected]} />

          {/* Right Sidebar for in-page navigation */}
          <PageNavigation sections={sections} />
        </main>
      </div>
    </>
  );
}
