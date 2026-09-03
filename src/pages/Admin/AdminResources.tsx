import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { FileText, Plus, Upload, Trash2, ExternalLink, Loader2, Image as ImageIcon, File, Film } from 'lucide-react';

export default function AdminResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Science');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      // Changed to 'resources', but you can also use 'pdfs' if needed. We use 'resources' for new generic system.
      const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedResources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResources(fetchedResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      // 1. Upload to Storage with chunked/resumable upload for speed and reliability
      const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("Failed to upload file");
          setUploading(false);
        },
        async () => {
          // Success
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // 2. Save to Firestore
          const newDoc = {
            title,
            category,
            description,
            fileUrl: downloadURL,
            fileName: file.name,
            fileType: file.type,
            storagePath: uploadTask.snapshot.ref.fullPath,
            status: 'Published',
            createdAt: serverTimestamp(),
          };
          
          const docRef = await addDoc(collection(db, 'resources'), newDoc);
          
          // Fast UI update without full reload
          setResources((prev) => [{ id: docRef.id, ...newDoc, createdAt: new Date() }, ...prev]);
          
          setIsModalOpen(false);
          setTitle('');
          setDescription('');
          setFile(null);
          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error initiating upload:", error);
      setUploading(false);
    }
  };

  const handleDelete = async (resourceId: string, storagePath: string) => {
    if (!window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) return;

    // Optimistic UI update
    setResources(prev => prev.filter(r => r.id !== resourceId));

    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef).catch(console.error);
      }
      await deleteDoc(doc(db, 'resources', resourceId));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Refreshing list.");
      fetchResources();
    }
  };

  const getFileIcon = (fileType: string) => {
    if (!fileType) return <File className="w-4 h-4" />;
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4" />;
    if (fileType.includes('image')) return <ImageIcon className="w-4 h-4" />;
    if (fileType.includes('video')) return <Film className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">File / Resource Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add File
        </button>
      </div>

      <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] text-[#94A3B8] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Resource Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">Loading...</td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">No files found. Add one to get started.</td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded">
                          {getFileIcon(resource.fileType)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{resource.title}</div>
                          <div className="text-xs text-[#64748B] truncate max-w-[200px]">{resource.fileName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#94A3B8]">{resource.category}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={resource.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-[#94A3B8] hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-colors"
                          title="View / Download"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => handleDelete(resource.id, resource.storagePath)}
                          className="p-2 text-[#94A3B8] hover:text-rose-400 hover:bg-rose-400/10 rounded transition-colors"
                          title="Delete File"
                        >
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Upload New Resource</h3>
              <button onClick={() => !uploading && setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Display Name / Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={uploading}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Pandas Cheat Sheet"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Category *</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={uploading}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                >
                  <option>Data Science</option>
                  <option>Machine Learning</option>
                  <option>Python</option>
                  <option>Deep Learning</option>
                  <option>AI</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Description (Optional)</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={uploading}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none h-20" 
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">File *</label>
                <div className="border-2 border-dashed border-[#333] rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.gif,.svg,.mp4,.webm,.mov" 
                    onChange={handleFileChange}
                    required
                    disabled={uploading}
                    className="hidden" 
                    id="file-upload" 
                  />
                  <label htmlFor="file-upload" className={`flex flex-col items-center justify-center gap-2 ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                    <Upload className="w-8 h-8 text-[#64748B]" />
                    <span className="text-sm text-indigo-400 font-medium">{file ? file.name : 'Click to select file'}</span>
                    {!file && <span className="text-xs text-[#64748B]">Supports PDF, Docs, Excel, Images, Videos</span>}
                  </label>
                </div>
              </div>

              {uploading && (
                <div className="w-full bg-[#1A1A1A] rounded-full h-2 mt-4 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <div className="text-center text-xs text-[#94A3B8] mt-1">
                    Uploading... {uploadProgress}%
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => !uploading && setIsModalOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading || !file}
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : 'Publish File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
