import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, FileText, Calendar, Image as ImageIcon, File, Film } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Resources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    async function fetchResources() {
      try {
        const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedResources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResources(fetchedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => 
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType: string) => {
    if (!fileType) return <File className="w-6 h-6" />;
    if (fileType.includes('pdf')) return <FileText className="w-6 h-6" />;
    if (fileType.includes('image')) return <ImageIcon className="w-6 h-6" />;
    if (fileType.includes('video')) return <Film className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 mt-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Resource Library</h1>
            <p className="text-[#94A3B8] max-w-2xl">Download PDFs, code snippets, notes, and complete study materials.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#94A3B8]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-xl border border-[#333] bg-[#1A1A1A] text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm placeholder-[#475569]"
              placeholder="Search resources..."
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#94A3B8]">Loading resources...</div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 text-[#94A3B8]">No resources found matching your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map(resource => {
              const dateObj = resource.createdAt?.toDate();
              const dateStr = dateObj ? dateObj.toLocaleDateString() : 'Recently';
              
              return (
                <div key={resource.id} className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all group flex flex-col h-full">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {getFileIcon(resource.fileType)}
                    </div>
                    
                    <span className="px-2 py-0.5 bg-[#1A1A1A] border border-[#333] text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider rounded-sm mb-3 self-start">
                      {resource.category}
                    </span>
                    
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{resource.title}</h3>
                    <p className="text-sm text-[#64748B] mb-4 line-clamp-2 flex-1">{resource.description || "No description provided."}</p>
                    
                    <div className="flex items-center gap-1 text-[10px] text-[#475569] font-bold uppercase tracking-wider mb-4">
                      <Calendar className="w-3 h-3" /> Uploaded {dateStr}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-[#1A1A1A] bg-[#0A0A0A] grid grid-cols-2 gap-3 mt-auto">
                    <a 
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors border border-[#333]"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </a>
                    <a 
                      href={resource.fileUrl}
                      download={resource.fileName || "file"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-indigo-500/20"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
