
export interface ProfileData {
  name: string;
  title: string;
  location: string;
  summary: string;
  stats: {
    yearsExperience: number;
    certificatesCount: number;
    projectsCompleted: number;
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  languages: { name: string; level: string }[];
  tools: string[];
  certifications: string[];
  education: {
    school: string;
    degree: string;
    period: string;
    details?: string;
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: "Data Analysis" | "Dashboards" | "ERP" | "Automation" | "Other";
  tags: string[];
  shortOutcome: string;
  fullDescription: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: string[];
}

export enum MCPToolNames {
  GET_PROFILE = 'get_profile',
  SEARCH_PROJECTS = 'search_projects',
  GET_RESUME_SECTION = 'get_resume_section',
  GET_CONTACT = 'get_contact'
}
