// Type definitions for IBM AI certification pages
export interface Lab {
  name: string;
  file: string;
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
