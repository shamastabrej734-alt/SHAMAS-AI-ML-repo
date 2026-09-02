import React, { useEffect, useState } from 'react';
import { Users, BookOpen, FileText, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, topics: 0, pdfs: 0 });

  useEffect(() => {
    fetch('/api/v1/admin/dashboard')
      .then(res => res.json())
      .then(data => setStats(data.stats))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Dashboard Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#6366F1]/10 text-[#6366F1] rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/20 border border-emerald-900/50 px-2 py-1 rounded-sm">
              <TrendingUp className="w-3 h-3 mr-1" /> +12%
            </span>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Total Students</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.users}</p>
        </div>
        
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Active Courses</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.courses}</p>
        </div>
        
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Topics & PDFs</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.topics + stats.pdfs}</p>
        </div>

        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#D8B4FE]/10 text-[#D8B4FE] rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Translations Today</h3>
          <p className="text-3xl font-bold text-white mt-1">42</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] rounded-xl border border-[#1A1A1A] shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-[#1A1A1A] last:border-0">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#94A3B8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F0F0F0]">New student registered</p>
                  <p className="text-xs text-[#64748B]">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] rounded-xl border border-[#1A1A1A] shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-sm border border-[#333]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-sm font-medium text-white">API Server</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-sm border border-[#333]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-sm font-medium text-white">YouTube Translation Service</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
