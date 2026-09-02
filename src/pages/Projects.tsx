import React, { useState, useEffect } from 'react';
import { Search, Code2, ExternalLink, BarChart } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/v1/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Library</h1>
          <p className="text-[#94A3B8] max-w-2xl">Build industry-ready projects to showcase on your resume.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-xl border border-[#333] bg-[#1A1A1A] text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none text-sm placeholder-[#475569]"
            placeholder="Search projects..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all flex flex-col group">
            <div className="h-48 bg-[#1A1A1A] relative overflow-hidden border-b border-[#1A1A1A]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 px-2 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded-sm text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] shadow-sm">
                {project.category}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">{project.title}</h3>
              
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                <BarChart className="w-4 h-4" /> {project.difficulty}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-2 py-1 bg-[#1A1A1A] border border-[#333] text-[#F0F0F0] rounded-sm text-[10px] font-bold uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto grid grid-cols-2 gap-3">
                <a href={project.github} className="flex items-center justify-center gap-2 py-2.5 rounded-sm border border-[#333] text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors">
                  <Code2 className="w-4 h-4" /> Code
                </a>
                <a href={project.demo} className="flex items-center justify-center gap-2 py-2.5 rounded-sm bg-white text-black font-bold text-[10px] uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
