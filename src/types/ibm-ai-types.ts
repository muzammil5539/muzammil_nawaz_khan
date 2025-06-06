// Type definitions for IBM AI certification pages
export interface Lab {
  name: string;
  file: string;
  description?: string;
}

export interface ModuleDetail {
  moduleNumber: number;
  title: string;
  description: string;
  summary: string;
  labs: Lab[];
}

export interface CourseDetail {
  moduleNumber: number;
  title: string;
  about: string;
  moduleDetails?: ModuleDetail[];
  topics: {
    name: string;
    details: string;
  }[];
  labs: Lab[];
  summary?: string;
}

export interface Module {
  title: string;
  description: string;
  github: string;
  labs: Lab[];
}

export interface NavigationSection {
  id: string;
  label: string;
}
