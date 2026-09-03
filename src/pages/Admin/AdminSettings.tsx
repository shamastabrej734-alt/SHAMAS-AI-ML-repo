import React from 'react';
import { useAuth } from '../../lib/AuthContext';
import { Shield, User, Mail, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Admin Profile & Settings</h2>
        <p className="text-[#94A3B8] text-sm">Manage your administrator identity.</p>
      </div>

      <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
        <div className="p-6 border-b border-[#1A1A1A] flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-medium">Security & Authentication</h3>
            <p className="text-[#64748B] text-xs mt-0.5">Your account is secured by Google Authentication</p>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded mb-8 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">Authentication Active. System is strictly locked to unauthorized users.</div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">Administrator Identity</label>
              <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#333] rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="text-white font-medium">{user?.displayName || 'Administrator'}</div>
                  <div className="text-[#64748B] text-sm flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">Authentication Method</label>
              <div className="bg-[#0A0A0A] border border-[#333] rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Google Sign-In (Managed)</span>
                </div>
                <p className="text-[#64748B] text-xs mt-3 leading-relaxed">
                  Password changes are managed through your Google Account. For security reasons, the system strictly relies on OAuth identity verification rather than manual passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
