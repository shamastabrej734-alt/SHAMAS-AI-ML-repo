import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ImageIcon, ZoomIn, X, Calendar } from 'lucide-react';

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
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
    }
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Image Gallery</h1>
          <p className="text-[#94A3B8] max-w-2xl">Visual moments, events, and highlights from Shamas AI & ML.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#94A3B8]">Loading gallery...</div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-[#94A3B8]">No photos available in the gallery.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(photo => {
              const dateObj = photo.createdAt?.toDate();
              const dateStr = dateObj ? dateObj.toLocaleDateString() : 'Recently';

              return (
                <div 
                  key={photo.id} 
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#111] border border-[#1A1A1A] cursor-pointer"
                >
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="px-2 py-0.5 bg-indigo-500/80 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm mb-2 self-start backdrop-blur-sm">
                      {photo.category}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{photo.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-[#94A3B8] font-medium mt-1">
                      <Calendar className="w-3 h-3" /> {dateStr}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Full-screen View */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 bg-[#1A1A1A] hover:bg-[#333] text-white rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.imageUrl} 
              alt={selectedPhoto.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center w-full max-w-2xl bg-[#111]/80 backdrop-blur-md p-4 rounded-xl border border-[#333]">
              <h3 className="text-xl font-bold text-white mb-1">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-[#94A3B8] text-sm mb-2">{selectedPhoto.description}</p>
              )}
              <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#64748B] uppercase tracking-wider">
                <span>{selectedPhoto.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#333]"></span>
                <span>{selectedPhoto.createdAt?.toDate()?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
