import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, FileText, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Student!</h1>
          <p className="text-[#94A3B8]">Pick up right where you left off.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8]">Continue Learning</h2>
              <Link to="/courses" className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] hover:text-[#D8B4FE]">View all</Link>
            </div>
            
            <div className="bg-[#111] rounded-xl border border-[#1A1A1A] p-6 shadow-sm hover:border-[#333] transition-all">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-24 h-24 shrink-0 rounded-xl bg-[#1A1A1A] overflow-hidden relative border border-[#333]">
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=300" alt="Course" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white opacity-90" />
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#6366F1]/10 text-[#6366F1] rounded">Machine Learning</span>
                    <span className="text-xs text-[#64748B] font-medium">Lesson 12 of 24</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Regression Models in Python</h3>
                  <p className="text-sm text-[#94A3B8] mb-4">Learn how to implement Linear and Polynomial regression using Scikit-Learn.</p>
                  
                  <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    <span>40% Completed</span>
                    <button className="text-[#8B5CF6] hover:text-[#D8B4FE]">Resume Course</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Content */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8] mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#111] rounded-xl border border-[#1A1A1A] p-4 shadow-sm hover:border-[#333] transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-[#8B5CF6] transition-colors">Python Pandas Cheat Sheet</h3>
                <p className="text-sm text-[#94A3B8] mb-3 line-clamp-1">Quick reference for data manipulation.</p>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] flex items-center">
                  View PDF <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
              
              <div className="bg-[#111] rounded-xl border border-[#1A1A1A] p-4 shadow-sm hover:border-[#333] transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-[#D8B4FE]" />
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-[#D8B4FE] transition-colors">Data Preprocessing Guide</h3>
                <p className="text-sm text-[#94A3B8] mb-3 line-clamp-1">Handling missing values and encoding.</p>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D8B4FE] flex items-center">
                  Read Topic <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#111] rounded-xl border border-[#1A1A1A] p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8] mb-4">Your Progress</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-[#F0F0F0]">Python Basics</span>
                  <span className="font-bold text-[#8B5CF6]">100%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-[#F0F0F0]">Data Analytics</span>
                  <span className="font-bold text-[#8B5CF6]">80%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-[#F0F0F0]">Machine Learning</span>
                  <span className="font-bold text-[#8B5CF6]">40%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6 text-white shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8] mb-4">Upcoming Test</h3>
            <p className="text-sm text-[#94A3B8] mb-6">Test your knowledge on Machine Learning Classification algorithms.</p>
            <button className="w-full py-2.5 bg-white text-black rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors">
              Start Quiz (20 mins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
