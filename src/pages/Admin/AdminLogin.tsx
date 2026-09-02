import React, { useState } from 'react';
import { Shield, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@shamas.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token && data.user.role === 'ADMIN') {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized access');
      }
    } catch {
      setError('Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-800 rounded-2xl p-8 shadow-2xl border border-neutral-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-neutral-700/50 rounded-2xl flex items-center justify-center border border-neutral-600">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-2 relative z-10">Admin Access</h2>
        <p className="text-neutral-400 text-center text-sm mb-8 relative z-10">Authorized personnel only.</p>
        
        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl py-3 mt-4 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : <><LogIn className="w-4 h-4" /> Secure Login</>}
          </button>
        </form>
      </div>
    </div>
  );
}
