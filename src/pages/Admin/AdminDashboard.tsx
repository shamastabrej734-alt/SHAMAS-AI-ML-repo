import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, Image as ImageIcon, Code, TrendingUp } from 'lucide-react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, pdfs: 0, images: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [coursesSnap, resourcesSnap, gallerySnap, projectsSnap] = await Promise.all([
          getCountFromServer(collection(db, 'courses')),
          getCountFromServer(collection(db, 'resources')),
          getCountFromServer(collection(db, 'gallery')),
          getCountFromServer(collection(db, 'projects'))
        ]);
        
        setStats({
          courses: coursesSnap.data().count,
          pdfs: resourcesSnap.data().count, // Re-mapped to resources
          images: gallerySnap.data().count, // Re-mapped to gallery
          projects: projectsSnap.data().count
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Dashboard Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#6366F1]/10 text-[#6366F1] rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Total Courses</h3>
          <p className="text-3xl font-bold text-white mt-1">{loading ? '-' : stats.courses}</p>
        </div>
        
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Total Resources</h3>
          <p className="text-3xl font-bold text-white mt-1">{loading ? '-' : stats.pdfs}</p>
        </div>
        
        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Gallery Photos</h3>
          <p className="text-3xl font-bold text-white mt-1">{loading ? '-' : stats.images}</p>
        </div>

        <div className="bg-[#111] rounded-xl p-6 border border-[#1A1A1A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#D8B4FE]/10 text-[#D8B4FE] rounded-lg">
              <Code className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Total Projects</h3>
          <p className="text-3xl font-bold text-white mt-1">{loading ? '-' : stats.projects}</p>
        </div>
      </div>
    </div>
  );
}
