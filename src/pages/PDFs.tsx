import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, FileText, BarChart } from 'lucide-react';

export default function PDFs() {
  const [pdfs, setPdfs] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/v1/pdfs')
      .then(res => res.json())
      .then(data => setPdfs(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">PDF Library</h1>
          <p className="text-[#94A3B8] max-w-2xl">Download cheat sheets, notes, and study materials.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-xl border border-[#333] bg-[#1A1A1A] text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none text-sm placeholder-[#475569]"
            placeholder="Search PDFs..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pdfs.map(pdf => (
          <div key={pdf.id} className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all group">
            <div className="h-40 bg-[#1A1A1A] relative overflow-hidden border-b border-[#1A1A1A]">
              <img src={pdf.cover} alt={pdf.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="px-2 py-0.5 bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider rounded-sm mb-1 inline-block">{pdf.category}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-base font-bold text-white mb-1 leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">{pdf.title}</h3>
              
              <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-medium mb-4 mt-2">
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {pdf.pages} Pages</span>
                <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> {pdf.difficulty}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="flex items-center justify-center gap-1.5 py-2 rounded-sm bg-transparent border border-[#333] text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 rounded-sm bg-white text-black font-bold text-[10px] uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
