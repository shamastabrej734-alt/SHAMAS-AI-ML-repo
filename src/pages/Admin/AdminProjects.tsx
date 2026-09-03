import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Code, Plus, Trash2, Upload, ExternalLink, Loader2 } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Machine Learning');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600';
      let storagePath = '';

      if (imageFile) {
        const storageRef = ref(storage, `project_images/${Date.now()}_${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
        storagePath = uploadTask.ref.fullPath;
      }

      await addDoc(collection(db, 'projects'), {
        title,
        category,
        description,
        tech: techStack.split(',').map(t => t.trim()).filter(Boolean),
        github: githubUrl,
        demo: demoUrl,
        image: imageUrl,
        storagePath,
        createdAt: serverTimestamp(),
      });

      setIsModalOpen(false);
      setTitle(''); setCategory('Machine Learning'); setDescription(''); setTechStack(''); setGithubUrl(''); setDemoUrl(''); setImageFile(null);
      fetchProjects();
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Failed to create project");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath?: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef).catch(console.error);
      }
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Project Portfolio Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-[#94A3B8]">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-[#94A3B8] col-span-full">No projects found. Add one!</div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden flex flex-col group relative">
              <div className="h-40 relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button 
                    onClick={() => handleDelete(project.id, project.storagePath)}
                    className="p-1.5 bg-black/60 text-rose-400 hover:bg-rose-500 hover:text-white rounded backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-white mb-1">{project.title}</h3>
                <p className="text-xs text-[#94A3B8] mb-3">{project.category}</p>
                <p className="text-sm text-[#64748B] line-clamp-2 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech?.map((t: string) => (
                    <span key={t} className="px-1.5 py-0.5 bg-[#1A1A1A] text-[#94A3B8] text-[10px] rounded">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center sticky top-0 bg-[#111] z-10">
              <h3 className="text-lg font-bold text-white">Add New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Project Title *</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white">
                  <option>Machine Learning</option>
                  <option>Deep Learning</option>
                  <option>Generative AI</option>
                  <option>Computer Vision</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Description *</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white h-24" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Tech Stack (comma separated)</label>
                <input type="text" placeholder="Python, TensorFlow, React..." value={techStack} onChange={e => setTechStack(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">GitHub URL</label>
                  <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1">Live Demo URL</label>
                  <input type="url" value={demoUrl} onChange={e => setDemoUrl(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Project Cover Image (Optional)</label>
                <div className="border-2 border-dashed border-[#333] rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                    <Upload className="w-6 h-6 text-[#64748B]" />
                    <span className="text-sm text-indigo-400 font-medium">{imageFile ? imageFile.name : 'Upload Image'}</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#1A1A1A]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-[#94A3B8]">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-2 disabled:opacity-50">
                  {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
