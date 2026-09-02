import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, FileText, Video, youtube } from 'lucide-react';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic mock check
    if (!localStorage.getItem('admin_token')) {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#080808] text-[#94A3B8] flex flex-col fixed inset-y-0 left-0 z-50 border-r border-[#1A1A1A]">
        <div className="p-6 border-b border-[#1A1A1A]">
          <h2 className="text-white font-bold text-xl uppercase tracking-wider">Admin CMS</h2>
          <p className="text-xs text-[#64748B] mt-1 font-bold tracking-widest uppercase">Shamas AI & ML</p>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-3">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm bg-[#1A1A1A] text-white">
              <LayoutDashboard className="w-5 h-5 text-[#8B5CF6]" /> Dashboard
            </Link>
            <Link to="/admin/courses" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" /> Courses
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
              <FileText className="w-5 h-5" /> Topics & PDFs
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
              <Video className="w-5 h-5" /> YouTube Resources
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
              <Users className="w-5 h-5" /> Students
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </Link>
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
      <div className="pl-64 flex-1">
        <header className="h-16 bg-[#080808] border-b border-[#1A1A1A] flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-sm font-bold uppercase tracking-wider text-white">Platform Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Admin Owner</span>
            <div className="w-8 h-8 rounded-sm bg-[#6366F1]/20 flex items-center justify-center text-[#8B5CF6] font-bold text-sm">
              S
            </div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
