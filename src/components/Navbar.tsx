"use client";

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200">
      <div className="flex items-center md:hidden">
        <h2 className="text-xl font-bold text-gray-800">Student</h2>
      </div>
      <div className="hidden md:flex items-center">
        {/* Placeholder for breadcrumbs or search in navbar if needed */}
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="text-sm font-medium text-gray-600 hidden sm:block">
          {user ? user.name : 'User'}
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
