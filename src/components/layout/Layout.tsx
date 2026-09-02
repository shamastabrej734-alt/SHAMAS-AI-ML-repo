import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen, PlaySquare, LayoutDashboard, Folder, Code, Settings } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans selection:bg-[#6366F1]/30">
      <nav className="sticky top-0 z-50 w-full bg-[#080808]/80 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#6366F1] to-[#A855F7] p-1.5 rounded-lg">
                <Code className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white uppercase">
                Shamas <span className="text-[#8B5CF6]">AI & ML</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Courses</Link>
              <Link to="/youtube" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors flex items-center gap-1">
                <PlaySquare className="w-4 h-4" /> Translate
              </Link>
              <Link to="/pdfs" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">PDFs</Link>
              <Link to="/projects" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Projects</Link>
              <Link to="/dashboard" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Dashboard</Link>
            </div>
            <div className="flex items-center gap-4">
              <select className="text-xs border-none bg-[#1A1A1A] text-white px-3 py-1 font-medium focus:ring-0 cursor-pointer rounded-full">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Urdu</option>
              </select>
              <Link to="/dashboard" className="hidden md:flex bg-[#6366F1] text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-[#8B5CF6] transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#050505] border-t border-[#1A1A1A] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[#6366F1] to-[#A855F7] p-1.5 rounded-lg">
                <Code className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white uppercase">
                Shamas AI & ML
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm max-w-sm">
              Learn AI, Machine Learning & Technology — In Your Language. Understand First. Build Projects. Become Industry Ready.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Learning</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/youtube" className="hover:text-white transition-colors">YouTube Translator</Link></li>
              <li><Link to="/pdfs" className="hover:text-white transition-colors">PDF Library</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact & About</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><a href="tel:7050652236" className="hover:text-white transition-colors">Mobile: 7050652236</a></li>
              <li><a href="https://wa.link/kq0eog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="https://www.facebook.com/share/17ivR4TwnV/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://github.com/shamastabrej734-alt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="mailto:hanjalaabu598@gmail.com" className="hover:text-white transition-colors">Email Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] text-[#475569] flex justify-between items-center">
          <p>© 2024 Shamas AI & ML Course. All rights reserved.</p>
          <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
            <Settings className="w-4 h-4" /> Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
