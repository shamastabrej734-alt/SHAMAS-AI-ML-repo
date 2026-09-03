import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BookOpen, Plus, Trash2, Edit } from 'lucide-react';

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Machine Learning');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('');
  const [instructor, setInstructor] = useState('Shamas');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        title,
        description,
        category,
        level,
        duration,
        instructor,
        thumbnail: thumbnailUrl || 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600',
        status: 'Published',
        createdAt: serverTimestamp(),
      });

      setIsModalOpen(false);
      // Reset form
      setTitle(''); setDescription(''); setDuration(''); setThumbnailUrl('');
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, 'courses', id));
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Course Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1A1A1A] text-[#94A3B8] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Course Title</th>
              <th className="px-6 py-4 font-medium">Category & Level</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">Loading...</td></tr>
            ) : courses.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">No courses found.</td></tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-[#1A1A1A]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#6366F1]/10 text-[#6366F1] rounded">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{course.title}</div>
                        <div className="text-xs text-[#64748B]">{course.instructor} • {course.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{course.category}</div>
                    <div className="text-xs text-[#94A3B8]">{course.level}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-[#94A3B8] hover:text-rose-400 hover:bg-rose-400/10 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center sticky top-0 bg-[#111] z-10">
              <h3 className="text-lg font-bold text-white">Create New Course</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Course Title *</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Description *</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white">
                    <option>Machine Learning</option>
                    <option>Deep Learning</option>
                    <option>Python</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">Level</label>
                  <select value={level} onChange={e => setLevel(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">Duration</label>
                  <input type="text" placeholder="e.g. 10 Hours" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">Instructor</label>
                  <input type="text" value={instructor} onChange={e => setInstructor(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Thumbnail URL</label>
                <input type="url" placeholder="https://..." value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#1A1A1A]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-[#94A3B8]">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded">Publish Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
