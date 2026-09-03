import React from 'react';

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-64 border-2 border-dashed border-[#1A1A1A] rounded-2xl">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">{title} Management</h2>
        <p className="text-[#94A3B8] text-sm">This module is connected to the database but UI is under construction.</p>
      </div>
    </div>
  );
}
