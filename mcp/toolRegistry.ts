import { MCPToolNames, ProfileData, ProjectData } from '../types';
import profileData from '../content/profile.json';
import projectsData from '../content/projects.json';

// Data is imported directly to prevent deployment issues with fetch.
// Functions are kept async to maintain the interface, though they run synchronously.
export const mcpTools = {
  [MCPToolNames.GET_PROFILE]: async () => {
    return {
      source: 'profile.json',
      data: profileData as ProfileData
    };
  },
  [MCPToolNames.SEARCH_PROJECTS]: async (query: string) => {
    const q = query.toLowerCase();
    const filtered = (projectsData as ProjectData[]).filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.fullDescription.toLowerCase().includes(q)
    );
    return {
      source: 'projects.json',
      data: filtered
    };
  },
  [MCPToolNames.GET_RESUME_SECTION]: async (section: string) => {
    const p = profileData as ProfileData;
    const s = section.toLowerCase();
    let data: any = null;
    if (s.includes('education')) data = p.education;
    else if (s.includes('experience') || s.includes('work')) data = p.experience;
    else if (s.includes('certifications')) data = p.certifications;
    else if (s.includes('tools') || s.includes('skills')) data = p.tools;

    return {
      source: `profile.json#${section}`,
      data: data || "Section not found."
    };
  },
  [MCPToolNames.GET_CONTACT]: async () => {
    return {
      source: 'profile.json#contact',
      data: (profileData as ProfileData).contact
    };
  }
};

export const toolDefinitions = [
  {
    name: MCPToolNames.GET_PROFILE,
    description: "Returns the full profile of Mustafa including summary, stats, and background.",
    parameters: { type: "OBJECT", properties: {}, required: [] }
  },
  {
    name: MCPToolNames.SEARCH_PROJECTS,
    description: "Searches through Mustafa's projects by query string.",
    parameters: {
      type: "OBJECT",
      properties: {
        query: { type: "STRING", description: "The keyword to search for." }
      },
      required: ["query"]
    }
  },
  {
    name: MCPToolNames.GET_RESUME_SECTION,
    description: "Retrieves a specific section of the resume (education, experience, tools, certifications).",
    parameters: {
      type: "OBJECT",
      properties: {
        section: { type: "STRING", description: "Section name: 'education', 'experience', 'tools', or 'certifications'." }
      },
      required: ["section"]
    }
  },
  {
    name: MCPToolNames.GET_CONTACT,
    description: "Returns Mustafa's contact details (email, phone, social links).",
    parameters: { type: "OBJECT", properties: {}, required: [] }
  }
];