import React from 'react';

const TOOL_LOGOS: Record<string, string> = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // Using MySQL as generic SQL logo
  "power bi": "https://img.icons8.com/color/48/power-bi.png", // Devicon doesn't have Power BI, using Icons8 or similar
  "sap erp": "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
  r: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  excel: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  "power automate": "https://upload.wikimedia.org/wikipedia/commons/4/42/Microsoft_Power_Automate.svg",
  n8n: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/n8n/n8n-original.svg", // n8n might not be in older devicon, using fallback if needed
  illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  autocad: "https://upload.wikimedia.org/wikipedia/commons/f/f7/AutoCAD_logo_icon.svg",
  word: "https://img.icons8.com/color/48/microsoft-word-2019--v2.png",
  powerpoint: "https://img.icons8.com/color/48/microsoft-powerpoint-2019--v1.png",
  matlab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
  neo4j: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg",
  "arena simulation": "https://asset.brandfetch.io/idO4d_k0h8/id0w2_Nn1-.png", // Requires verification, or fallback text
  tableau: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
  "apache superset": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", // Generic Apache or Superset if avail
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  "ms project": "https://img.icons8.com/color/48/microsoft-project.png",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  visio: "https://img.icons8.com/color/48/microsoft-visio-2019.png"
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
            // Hide image and show fallback on error
            (e.target as HTMLImageElement).style.display = 'none';
            // Logic to show fallback could be complex here, but for now just hiding acts as 'empty'
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
python: (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21a5 5 0 005-5v-1H7v1a5 5 0 005 5z" fill="#3776AB" />
    <path d="M12 3a5 5 0 015 5v1H7V8a5 5 0 015-5z" fill="#FFD43B" />
    <g transform="translate(12 12)">
      <path d="M-1 3.5a.5.5 0 110-1 .5.5 0 010 1zM-1-2.5a.5.5 0 110-1 .5.5 0 010 1z" fill="#fff" />
    </g>
  </svg>
),
  sql: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6v12h16V6H4zm14 10H6V8h12v8z" fill="#00758F" />
      <path d="M4 6c0-2.21 3.582-4 8-4s8 1.79 8 4-3.582 4-8 4-8-1.79-8-4z" fill="#00758F" />
      <path d="M20 6v12c0 2.21-3.582 4-8 4s-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4z" fill="none" stroke="#fff" strokeWidth="1.5" />
      <ellipse cx="12" cy="6" rx="8" ry="4" stroke="#fff" strokeWidth="1.5" />
      <path d="M4 6v12" stroke="#fff" strokeWidth="1.5" />
      <path d="M20 6v12" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
    'power bi': (props) => (
      <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 44h8V24H4v20zm10 0h8V4h-8v40zm10 0h8V32h-8v12zm10 0h8V16h-8v28z" fill="#F2C811" />
      </svg>
    ),
      'sap erp': (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="#0072C6" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.62 14.24V9.72h5.52v1.6H13.4v1.1h3.44v1.58h-3.44v1.82h3.94v1.6H11.62v-3.18zM4.42 15.82V8.1h5.8v1.6H6.22v2.2h3.32v1.58H6.22v2.32h4.14v1.6H4.42v-1.6z" />
        </svg>
      ),
        r: (props) => (
          <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" fill="#276DC3" />
            <path d="M22 17h6c2.21 0 4 1.79 4 4s-1.79 4-4 4h-2v6h-4V17zm4 6h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2v4z" fill="white" />
            <path d="M26.5 25.5l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
          excel: (props) => (
            <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#1D6C42" />
              <path d="M14 2v6h6" fill="#107C41" />
              <path d="M12.45 14.12l-1.8 3.12h1.5l1.05-1.82 1.05 1.82h1.5l-1.8-3.12 1.8-3.12h-1.5l-1.05 1.82-1.05-1.82h-1.5l1.8 3.12z" fill="#fff" />
            </svg>
          ),
            'power automate': (props) => (
              <svg {...props} viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4h-4L2 14h4l3-5 3 5h4l-4-6.67z" />
                <path d="M19 10l-3 5h4l3-5h-4z" fill="#4B91E1" />
              </svg>
            ),
              n8n: (props) => (
                <svg {...props} viewBox="0 0 24 24" fill="#1A8275" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.83L18.17 12 12 18.17 5.83 12 12 5.83z" />
                </svg>
              ),
                illustrator: (props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="#FF7F18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#300" />
                    <path d="M9.47 16.2L11 11.24L12.53 16.2H14.1L11.75 9H10.25L7.9 16.2H9.47Z" fill="#FF7F18" />
                    <path d="M15 16.2V9H16.5V16.2H15Z" fill="#FF7F18" />
                    <path d="M15.75 7.5a.75.75 0 110-1.5.75.75 0 010 1.5z" fill="#FF7F18" />
                  </svg>
                ),
                  autocad: (props) => (
                    <svg {...props} viewBox="0 0 24 24" fill="#E62F21" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L1 12l4 7h14l4-7L12 2zm0 3.3L19.2 12 17.6 15h-11L4.8 12 12 5.3zM9.3 11.2l2.7 4.6 2.7-4.6H9.3z" />
                    </svg>
                  ),
                    word: (props) => (
                      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#2B579A" />
                        <path d="M14 2v6h6" fill="#204C89" />
                        <path d="M16.5 12h-1.5l-2 5.5-2-5.5H9.5v6h1.5v-3.5l1.5 4h1l1.5-4v3.5h1.5v-6z" fill="#fff" />
                      </svg>
                    ),
                      powerpoint: (props) => (
                        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#B7472A" />
                          <path d="M14 2v6h6" fill="#D9532A" />
                          <path d="M12 10a3 3 0 00-3 3h1a2 2 0 112 2v3h1v-3a3 3 0 00-1-5.66V10h-1z" fill="#fff" />
                        </svg>
                      ),
                        matlab: (props) => (
                          <svg {...props} viewBox="0 0 24 24" fill="#0076A8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.5 13.5L10 12l4.5-3.5v9z" />
                          </svg>
                        ),
                          neo4j: (props) => (
                            <svg {...props} viewBox="0 0 24 24" fill="#008CC1" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="4" r="3" fill="#015A82" />
                              <circle cx="5" cy="18" r="3" fill="#015A82" />
                              <circle cx="19" cy="18" r="3" fill="#015A82" />
                              <path d="M12 7v9.5M7.5 16.5l3-7.5m6 7.5l-3-7.5" stroke="#00A0D2" strokeWidth="2" />
                            </svg>
                          ),
                            'arena simulation': (props) => (
                              <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L1 21h22L12 2zm-1.5 14L8 12.25l2.5-4.5h3L16 12.25 13.5 16h-3zm0-2h3l1-2-1-2h-3l-1 2 1 2z" />
                              </svg>
                            )
};

const FallbackIcon: React.FC<{ toolName: string }> = ({ toolName }) => (
  <div className="w-full h-full rounded-lg bg-white/5 flex items-center justify-center">
    <span className="font-bold text-inherit text-[10px]">{toolName.substring(0, 2).toUpperCase()}</span>
  </div>
);

const ToolIcon: React.FC<{ toolName: string; className?: string }> = ({ toolName, className }) => {
  const normalizedName = toolName.toLowerCase();
  const IconComponent = TOOL_ICONS[normalizedName];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return (
    <div className={className}>
      <FallbackIcon toolName={toolName} />
    </div>
  );
};

export default ToolIcon;