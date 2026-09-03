import React, { useState, useEffect } from 'react';
import { Search, Code2, ExternalLink, Calendar } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech?.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 mt-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Project Library</h1>
            <p className="text-[#94A3B8] max-w-2xl">Build industry-ready AI/ML projects to showcase on your resume.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#94A3B8]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-xl border border-[#333] bg-[#1A1A1A] text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none text-sm placeholder-[#475569]"
              placeholder="Search by tech, name..."
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#111] rounded-2xl border border-[#1A1A1A] p-4 h-80 animate-pulse flex flex-col">
                <div className="w-full h-40 bg-[#333] rounded-xl mb-4" />
                <div className="h-6 w-3/4 bg-[#333] rounded mb-2" />
                <div className="h-10 w-full bg-[#333] rounded-lg mt-auto" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-[#94A3B8]">
            <p className="text-xl mb-2">No projects found</p>
            <p className="text-sm">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all flex flex-col group">
                <div className="h-48 bg-[#1A1A1A] relative overflow-hidden border-b border-[#1A1A1A]">
                  <img src={project.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600'} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded-sm text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] shadow-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#94A3B8] mb-4 line-clamp-3 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.map((t: string) => (
                      <span key={t} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-sm border border-[#333] text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors">
                      <Code2 className="w-4 h-4" /> Source
                    </a>
                    <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-sm bg-white text-black font-bold text-[10px] uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
