import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function ProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;
  }

  // Only the website owner/admin is allowed
  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
