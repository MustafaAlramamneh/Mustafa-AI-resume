import React from 'react';

const TOOL_LOGOS: Record<string, string> = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // Using MySQL as generic SQL logo
  "power bi": "https://img.icons8.com/color/48/power-bi.png", // Devicon doesn't have Power BI, using Icons8 or similar
  "sap erp": "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
  r: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  excel: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  "power automate": "https://upload.wikimedia.org/wikipedia/commons/4/42/Microsoft_Power_Automate.svg",
  n8n: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/n8n/n8n-original.svg",
  illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  autocad: "https://upload.wikimedia.org/wikipedia/commons/f/f7/AutoCAD_logo_icon.svg",
  word: "https://img.icons8.com/color/48/microsoft-word-2019--v2.png",
  powerpoint: "https://img.icons8.com/color/48/microsoft-powerpoint-2019--v1.png",
  matlab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
  neo4j: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg",
  "arena simulation": "https://asset.brandfetch.io/idO4d_k0h8/id0w2_Nn1-.png",
  tableau: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
  "apache superset": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  "ms project": "https://img.icons8.com/color/48/microsoft-project.png",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  visio: "https://img.icons8.com/color/48/microsoft-visio-2019.png",
  powerquery: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  powerpivot: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"
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