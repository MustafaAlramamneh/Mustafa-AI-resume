import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { ProjectData } from '../types';

const ProjectCard: React.FC<{ project: ProjectData; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden glass transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.shortOutcome}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 px-2 py-0.5 rounded-md border border-gray-300 dark:border-gray-800">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center">
          <ExternalLink size={18} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;