import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Languages, FileText, Code2, ChevronRight, BrainCircuit, BarChart3, Database } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Artificial Intelligence', icon: <BrainCircuit className="w-5 h-5" />, color: 'bg-[#6366F1]/10 text-[#6366F1]', path: '/category/ai' },
    { name: 'Machine Learning', icon: <Database className="w-5 h-5" />, color: 'bg-[#A855F7]/10 text-[#A855F7]', path: '/category/ml' },
    { name: 'Python', icon: <Code2 className="w-5 h-5" />, color: 'bg-[#8B5CF6]/10 text-[#8B5CF6]', path: '/category/python' },
    { name: 'Data Analytics', icon: <BarChart3 className="w-5 h-5" />, color: 'bg-[#D8B4FE]/10 text-[#D8B4FE]', path: '/category/data' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-[radial-gradient(circle_at_20%_30%,#1e1b4b_0%,transparent_50%)]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-widest text-[#8B5CF6] border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 rounded-sm uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"></span>
                </span>
                New: AI YouTube Learning Translator
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter text-white mb-6">
                Learn AI & ML Without <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#D8B4FE]">Language Barriers.</span>
              </h1>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed max-w-xl">
                Learn Artificial Intelligence, Machine Learning, Python, Data Analytics and Programming through courses, PDFs, projects, tests and multilingual learning resources.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/dashboard" className="px-8 py-3 bg-[#6366F1] text-white font-bold rounded-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:bg-[#8B5CF6] transition-colors">
                  Start Learning
                </Link>
                <Link to="/courses" className="px-8 py-3 bg-transparent border border-[#334155] text-white font-bold rounded-sm hover:bg-[#1A1A1A] transition-colors">
                  Explore Courses
                </Link>
                <Link to="/youtube" className="px-6 py-3 rounded-sm bg-[#1A1A1A] text-white font-bold hover:bg-[#333] border border-[#333] transition-colors flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#8B5CF6]" /> Translate YouTube
                </Link>
              </div>
            </motion.div>
            
            {/* Abstract visual graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-[2rem] bg-[#111] border border-[#1A1A1A] p-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-10 mix-blend-overlay rounded-full blur-3xl animate-pulse" />
                <div className="relative h-full w-full bg-[#080808]/80 backdrop-blur-xl rounded-2xl border border-[#333] shadow-2xl p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#6366F1] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                      <Code2 className="text-white w-6 h-6" />
                    </div>
                    <div className="px-3 py-1 bg-[#1A1A1A] rounded-full shadow-sm text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-[#333] flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Note
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-[#333] rounded-full animate-pulse" />
                    <div className="h-4 w-1/2 bg-[#333] rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-[#333] rounded-full animate-pulse" />
                  </div>
                  
                  <div className="mt-8 bg-[#111] rounded-xl p-4 shadow-sm border border-[#1A1A1A]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                        <Languages className="w-5 h-5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Auto Translate</p>
                        <p className="text-xs text-[#94A3B8]">English → Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="w-full bg-[#050505] py-24 border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Start your learning journey</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">Explore structured roadmaps and high-quality resources to master the most in-demand technical skills.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} to={cat.path} className="group bg-[#111] border border-[#1A1A1A] rounded-xl p-6 transition-all text-left hover:border-[#333]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${cat.color}`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">{cat.name}</h3>
                <p className="text-[#94A3B8] mb-4 text-sm line-clamp-2">Complete roadmap with theory, projects, and interview preparation.</p>
                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight - YouTube Translator */}
      <section className="w-full py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#080808] border border-[#1A1A1A] rounded-2xl p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6366F1]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Learn YouTube Courses In Your Preferred Language.
                </h2>
                <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                  Struggling to understand complex English explanations? Paste any educational YouTube URL, and our platform will extract and translate the transcript into Hindi, Bengali, Urdu, and more.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {['Extract official YouTube transcripts securely', 'Translate difficult technical jargon into simple terms', 'Read along while you watch the video', 'Save notes to your dashboard'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6366F1]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                      </div>
                      <span className="text-[#F0F0F0]">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/youtube" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold rounded uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                  Try YouTube Translator <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl p-2 shadow-2xl relative">
                <div className="aspect-video bg-black rounded-xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                  
                  {/* Mock subtitle overlay */}
                  <div className="mt-auto bg-black/60 backdrop-blur-md p-4 text-center">
                    <p className="text-white text-sm font-medium">"तो, मशीन लर्निंग का मुख्य उद्देश्य यह है कि..."</p>
                    <p className="text-neutral-400 text-xs mt-1">"So, the main goal of Machine Learning is to..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
