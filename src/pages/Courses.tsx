import React, { useState, useEffect } from 'react';
import { Search, Clock, BookOpen, ChevronRight, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Explore Courses</h1>
          <p className="text-[#94A3B8] max-w-2xl">Structured learning paths designed to help you understand complex technical concepts in your preferred language.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-xl border border-[#333] bg-[#1A1A1A] text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none text-sm placeholder-[#475569]"
            placeholder="Search courses..."
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#111] rounded-2xl border border-[#1A1A1A] p-4 h-80 animate-pulse flex flex-col">
              <div className="w-full h-40 bg-[#333] rounded-xl mb-4" />
              <div className="h-5 w-3/4 bg-[#333] rounded mb-2" />
              <div className="h-4 w-1/2 bg-[#333] rounded mb-auto" />
              <div className="h-10 w-full bg-[#333] rounded-lg mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded-lg text-xs font-bold uppercase tracking-wider text-[#8B5CF6] shadow-sm">
                  {course.category}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-medium mb-3">
                  <span className="flex items-center gap-1.5"><BarChart className="w-3.5 h-3.5" /> {course.difficulty}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} Lessons</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-[#8B5CF6] transition-colors">{course.title}</h3>
                <p className="text-sm text-[#94A3B8] mb-6">Instructor: {course.instructor} • {course.language}</p>
                
                <div className="mt-auto">
                  <Link to={`/courses/${course.id}`} className="flex items-center justify-center w-full py-2.5 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                    Start Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Static placeholders for demo */}
          <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600" 
                  alt="Python Basics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded-lg text-xs font-bold uppercase tracking-wider text-[#8B5CF6] shadow-sm">
                  Python
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-medium mb-3">
                  <span className="flex items-center gap-1.5"><BarChart className="w-3.5 h-3.5" /> Beginner</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8 Hours</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 32 Lessons</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-[#8B5CF6] transition-colors">Python Programming Mastery</h3>
                <p className="text-sm text-[#94A3B8] mb-6">Instructor: Shamas • Multi-language</p>
                
                <div className="mt-auto">
                  <Link to={`/courses/2`} className="flex items-center justify-center w-full py-2.5 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                    Start Course
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden shadow-sm hover:border-[#333] transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
                  alt="Data Analytics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded-lg text-xs font-bold uppercase tracking-wider text-[#8B5CF6] shadow-sm">
                  Data Analytics
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-medium mb-3">
                  <span className="flex items-center gap-1.5"><BarChart className="w-3.5 h-3.5" /> Intermediate</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 12 Hours</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 45 Lessons</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-[#8B5CF6] transition-colors">Data Analytics Bootcamp</h3>
                <p className="text-sm text-[#94A3B8] mb-6">Instructor: Shamas • Multi-language</p>
                
                <div className="mt-auto">
                  <Link to={`/courses/3`} className="flex items-center justify-center w-full py-2.5 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                    Start Course
                  </Link>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
