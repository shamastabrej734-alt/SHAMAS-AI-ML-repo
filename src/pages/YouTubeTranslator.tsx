import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, PlaySquare, Languages, Copy, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function YouTubeTranslator() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    
    setError(null);
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/v1/youtube/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, language })
      });
      
      const data = await res.json();
      if (data.success) {
        setResult(data.translatedText);
      } else {
        setError(data.error || "Failed to translate video");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const videoId = extractVideoId(url);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#8B5CF6] text-[10px] font-bold uppercase tracking-widest mb-4">
          <PlaySquare className="w-4 h-4" /> AI Translator
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Learn YouTube Courses In Your Preferred Language
        </h1>
        <p className="text-[#94A3B8]">
          Paste any educational YouTube video link below to read its explanation in your native language.
        </p>
      </div>

      <div className="bg-[#111] rounded-xl shadow-sm border border-[#1A1A1A] p-6 md:p-8 max-w-4xl mx-auto mb-12">
        <form onSubmit={handleTranslate} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#475569]" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 rounded-sm border border-[#333] bg-[#1A1A1A] text-white focus:bg-[#080808] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none placeholder-[#475569]"
              placeholder="Paste YouTube URL here (e.g. https://youtube.com/watch?v=...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div className="md:w-48 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Languages className="h-5 w-5 text-[#475569]" />
            </div>
            <select
              className="block w-full pl-11 pr-8 py-3 rounded-sm border border-[#333] bg-[#1A1A1A] text-white focus:bg-[#080808] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Urdu">Urdu</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Marathi">Marathi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading || !url}
            className="px-8 py-3 rounded-sm bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Translate"
            )}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      {(result || loading) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Video Player Side */}
          <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden shadow-sm flex flex-col">
            <div className="aspect-video bg-black relative">
              {videoId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#333]">
                  <PlaySquare className="w-12 h-12 opacity-50" />
                </div>
              )}
            </div>
            <div className="p-4 bg-[#0A0A0A] border-t border-[#1A1A1A]">
              <h3 className="font-semibold text-white line-clamp-1">
                {videoId ? "Video Player" : "Waiting for video..."}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] mt-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Embedded securely via official API
              </p>
            </div>
          </div>

          {/* Transcript Side */}
          <div className="bg-[#111] rounded-xl border border-[#1A1A1A] shadow-sm flex flex-col h-[500px]">
            <div className="p-4 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0A0A0A] rounded-t-xl">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-[#8B5CF6]" />
                <h3 className="font-semibold text-white">Translated Transcript ({language})</h3>
              </div>
              <button 
                className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-[#1A1A1A] rounded animate-pulse" />
                  <div className="h-4 w-full bg-[#1A1A1A] rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-[#1A1A1A] rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-[#1A1A1A] rounded animate-pulse" />
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base prose-invert text-[#F0F0F0]">
                  <p>{result}</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#1A1A1A] bg-[#0A0A0A] rounded-b-xl flex items-center gap-3 text-xs text-[#94A3B8]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>Translation quality depends on the availability of accurate captions on the original video.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
