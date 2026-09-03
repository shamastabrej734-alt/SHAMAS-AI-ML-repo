import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Plus, Upload, Trash2, ExternalLink, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminGallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Events');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPhotos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Image Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("Failed to upload photo");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          const newDoc = {
            title,
            category,
            description,
            imageUrl: downloadURL,
            fileName: file.name,
            storagePath: uploadTask.snapshot.ref.fullPath,
            status: 'Published',
            createdAt: serverTimestamp(),
          };
          
          const docRef = await addDoc(collection(db, 'gallery'), newDoc);
          
          // Fast UI update
          setPhotos((prev) => [{ id: docRef.id, ...newDoc, createdAt: new Date() }, ...prev]);
          
          setIsModalOpen(false);
          setTitle('');
          setDescription('');
          setFile(null);
          setPreview(null);
          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error initiating upload:", error);
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: string, storagePath: string) => {
    if (!window.confirm("Are you sure you want to delete this photo? This action cannot be undone.")) return;

    // Optimistic UI update
    setPhotos(prev => prev.filter(p => p.id !== photoId));

    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef).catch(console.error);
      }
      await deleteDoc(doc(db, 'gallery', photoId));
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo. Refreshing list.");
      fetchPhotos();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Gallery Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] text-[#94A3B8] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Photo</th>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">Loading...</td>
                </tr>
              ) : photos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">No photos found. Add one to get started.</td>
                </tr>
              ) : (
                photos.map((photo) => (
                  <tr key={photo.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4 w-24">
                      <div className="w-16 h-16 rounded overflow-hidden bg-[#0A0A0A] border border-[#333]">
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{photo.title}</div>
                      <div className="text-xs text-[#64748B] truncate max-w-[200px]">{photo.description || photo.fileName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#94A3B8]">{photo.category}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={photo.imageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-[#94A3B8] hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-colors"
                          title="View Full Size"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => handleDelete(photo.id, photo.storagePath)}
                          className="p-2 text-[#94A3B8] hover:text-rose-400 hover:bg-rose-400/10 rounded transition-colors"
                          title="Delete Photo"
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
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center sticky top-0 bg-[#111] z-10">
              <h3 className="text-lg font-bold text-white">Upload New Photo</h3>
              <button onClick={() => !uploading && setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Photo Name / Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={uploading}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Workshop 2024"
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
                  <option>Events</option>
                  <option>Workshops</option>
                  <option>Students</option>
                  <option>Certificates</option>
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
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Photo *</label>
                <div className="border-2 border-dashed border-[#333] rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors relative overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required
                    disabled={uploading}
                    className="hidden" 
                    id="photo-upload" 
                  />
                  <label htmlFor="photo-upload" className={`flex flex-col items-center justify-center gap-2 ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${preview ? 'absolute inset-0 bg-[#0A0A0A] opacity-0 hover:opacity-90 transition-opacity z-10' : ''}`}>
                    <Upload className="w-8 h-8 text-[#64748B]" />
                    <span className="text-sm text-indigo-400 font-medium">{file ? file.name : 'Click to select photo'}</span>
                    {!file && <span className="text-xs text-[#64748B]">Supports JPG, PNG, WEBP, GIF</span>}
                  </label>
                  
                  {preview && (
                    <div className="mt-0 w-full h-40 rounded flex items-center justify-center overflow-hidden">
                      <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
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
                  {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : 'Publish Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
