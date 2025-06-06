// API route for fetching course details
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Note: This API route is only available in development mode
// For static export builds, data loading is handled client-side

export async function GET(request: Request) {
  try {
    // Get the module number from the query params
    const url = new URL(request.url);
    const moduleNum = url.searchParams.get("module");

    if (!moduleNum) {
      return NextResponse.json(
        { error: "Module parameter is required" },
        { status: 400 }
      );
    }

    // Find the file with the matching pattern
    const courseDir = path.join(
      process.cwd(),
      "src",
      "app",
      "ibm-ai-engineer",
      "courses"
    );

    // Verify directory exists
    if (!fs.existsSync(courseDir)) {
      console.error(`Course directory not found: ${courseDir}`);
      return NextResponse.json(
        { error: "Course directory not found" },
        { status: 500 }
      );
    }

    const files = fs.readdirSync(courseDir);

    // Handle special case for summary
    let courseFile;
    if (moduleNum === "summary") {
      courseFile = "summary.json";
    } else {
      courseFile = files.find((file) => file.startsWith(`${moduleNum}_`));
    }

    if (!courseFile) {
      console.warn(`Course file not found for module: ${moduleNum}`);
      return NextResponse.json(
        { error: `Course details not found for module ${moduleNum}` },
        { status: 404 }
      );
    }

    const courseFilePath = path.join(courseDir, courseFile);

    // Verify file exists
    if (!fs.existsSync(courseFilePath)) {
      console.error(`Course file not found: ${courseFilePath}`);
      return NextResponse.json(
        { error: "Course file not found" },
        { status: 404 }
      );
    }

    try {
      const fileContent = fs.readFileSync(courseFilePath, "utf-8");
      const courseData = JSON.parse(fileContent);

      return NextResponse.json(courseData, {
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      });
    } catch (parseError) {
      console.error(`Error parsing JSON from ${courseFilePath}:`, parseError);
      return NextResponse.json(
        { error: "Invalid JSON format in course file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
