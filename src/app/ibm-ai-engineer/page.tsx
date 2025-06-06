// IBM AI Engineer Certificate Page
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import ModulesList from "@/components/ibm-ai/ModulesList";
import ModuleContent from "@/components/ibm-ai/ModuleContent";
import PageNavigation from "@/components/ibm-ai/PageNavigation";
import AppBar from "@/components/ibm-ai/AppBar";
import MobileMenuButton from "@/components/ibm-ai/MobileMenuButton";
import BackToTopButton from "@/components/ibm-ai/BackToTopButton";
import LoadingOverlay from "@/components/ibm-ai/LoadingOverlay";
import { NavigationSection } from "@/types/ibm-ai-types";
import { modules } from "@/data/ibm-ai-modules";

export default function IbmAiEngineerPage() {
  const { isDarkMode } = useTheme();
  const [selected, setSelected] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Close the mobile menu when selecting a module
  const handleModuleSelect = (index: number) => {
    setSelected(index);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  // Initial page load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000); // Simulate initial page load

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For right sidebar navigation
  const sections: NavigationSection[] = [
    { id: "overview", label: "Overview" },
    { id: "module-details", label: "Module Details" },
    { id: "labs", label: "Labs & Notebooks" },
    { id: "github", label: "GitHub" },
  ];

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isPageLoading}
        message="Loading IBM AI Engineer Certificate..."
      />

      {/* App Bar */}
      <AppBar title="IBM AI Engineer Professional Certificate" />

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

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
          setSelected={handleModuleSelect}
          isOpen={isMobileMenuOpen}
        />
        {/* Mobile Menu Toggle Button */}
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        {/* Back to Top Button */}
        <BackToTopButton /> {/* Main Content */}
        <main
          className={`flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen transition-all duration-300 ${
            isMobileMenuOpen ? "ml-0" : "ml-0 md:ml-72"
          }`}
        >
          <div
            className={`flex-1 transition-all duration-300 ${
              isMobileMenuOpen
                ? "blur-sm pointer-events-none md:blur-none md:pointer-events-auto"
                : ""
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                isMobileMenuOpen
                  ? "p-1 sm:p-2 md:p-6 lg:p-8"
                  : "p-2 sm:p-4 md:p-6 lg:p-8"
              }`}
            >
              {/* Module Content Component */}
              <ModuleContent module={modules[selected]} />
            </div>
          </div>
          {/* Right Sidebar for in-page navigation */}
          <div
            className={`hidden lg:block w-64 p-4 transition-all duration-300 ${
              isMobileMenuOpen ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <PageNavigation sections={sections} />
          </div>
        </main>
      </div>
    </>
  );
}
