import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../lib/AuthContext';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Strict Security: Only admin email allowed
      if (result.user.email !== 'hanjalaabu598@gmail.com') {
        await signOut(auth);
        setError('Access Denied: Only the system administrator is allowed to access this panel.');
      }
    } catch (err: any) {
      setError(err.message || 'Google Sign-In failed. Please ensure third-party cookies are enabled.');
    } finally {
      setLoading(false);
    }
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
        <p className="text-neutral-400 text-center text-sm mb-8 relative z-10">Secure Google authentication required.</p>
        
        {error && <p className="text-rose-400 text-sm bg-rose-500/10 p-4 rounded-lg border border-rose-500/20 mb-6 text-center">{error}</p>}
        
        <div className="relative z-10 mb-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-neutral-100 text-black font-medium rounded-xl py-3 px-4 transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Authenticating...' : 'Sign in with Google'}
          </button>
        </div>
        
        <p className="text-neutral-500 text-xs text-center mt-6">
          Only the authorized administrator (hanjalaabu598@gmail.com) is permitted to access this panel. All other login attempts will be rejected.
        </p>
      </div>
    </div>
  );
}

