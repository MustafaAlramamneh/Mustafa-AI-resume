import React from 'react';

const TOOL_LOGOS: Record<string, string> = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  sql: "https://www.svgrepo.com/show/331760/sql-database-generic.svg",
  "power bi": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  "sap erp": "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
  r: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  excel: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
  "power automate": "https://upload.wikimedia.org/wikipedia/commons/4/42/Microsoft_Power_Automate.svg",
  n8n: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/n8n/n8n-original.svg",
  illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  autocad: "https://upload.wikimedia.org/wikipedia/commons/f/f7/AutoCAD_logo_icon.svg",
  word: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
  powerpoint: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg",
  matlab: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png",
  neo4j: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg",
  "arena simulation": "https://www.rockwellautomation.com/content/dam/rockwell-automation/sites/downloads/logos/arena-simulation-software-logo.png", // Attempting a more direct source, or we could use a generic 'simulation' icon if this fails.
  tableau: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
  "apache superset": "https://raw.githubusercontent.com/apache/superset/master/superset-frontend/src/assets/images/superset-logo-horiz.png",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  "ms project": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Microsoft_Office_Project_%282019%E2%80%93present%29.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  visio: "https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Visio_2019-present.svg",
  powerquery: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg", // Power Query shares Excel branding often
  powerpivot: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" // Power Pivot shares Excel branding often
};

const FallbackIcon: React.FC<{ toolName: string }> = ({ toolName }) => (
  <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center p-1">
    <span className="font-bold text-gray-500 text-[8px] sm:text-[10px] uppercase text-center break-words leading-tight">{toolName}</span>
  </div>
);

const ToolIcon: React.FC<{ toolName: string; className?: string }> = ({ toolName, className }) => {
  const normalizedName = toolName.toLowerCase();
  const logoUrl = TOOL_LOGOS[normalizedName];

  if (logoUrl) {
    return (
      <div className={`${className} flex items-center justify-center p-1`}>
        <img
          src={logoUrl}
          alt={toolName}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <FallbackIcon toolName={toolName} />
    </div>
  );
};

export default ToolIcon;