import React, { useState } from 'react';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Layers, Settings, LogOut, FileText, Image, Code, Edit3, Menu, X } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Course Topics', path: '/admin/topics', icon: Layers },
    { name: 'Resources', path: '/admin/resources', icon: FileText },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Projects', path: '/admin/projects', icon: Code },
    { name: 'Website Content', path: '/admin/content', icon: Edit3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-[60]">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-[#1A1A1A] text-white rounded">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`w-64 bg-[#080808] text-[#94A3B8] flex flex-col fixed inset-y-0 left-0 z-50 border-r border-[#1A1A1A] transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-[#1A1A1A]">
          <h2 className="text-white font-bold text-xl uppercase tracking-wider">Admin CMS</h2>
          <p className="text-xs text-[#64748B] mt-1 font-bold tracking-widest uppercase">Shamas AI & ML</p>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-3">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors ${isActive ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#1A1A1A] hover:text-white'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#8B5CF6]' : ''}`} /> {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#1A1A1A]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium text-[#64748B] hover:text-white hover:bg-[#1A1A1A] rounded-sm transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex-1 flex flex-col w-full min-h-screen">
        <header className="h-16 bg-[#080808] border-b border-[#1A1A1A] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <h1 className="text-sm font-bold uppercase tracking-wider text-white">Platform Overview</h1>
          <div className="flex items-center gap-4 pr-10 md:pr-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Admin Owner</span>
            <div className="w-8 h-8 rounded-sm bg-[#6366F1]/20 flex items-center justify-center text-[#8B5CF6] font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  );
}
