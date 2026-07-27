"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-white/60 backdrop-blur-2xl border-r border-white/40 text-gray-800 flex flex-col h-full hidden md:flex min-h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="p-6 border-b border-gray-200/50">
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Student</h1>
        <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">Analytics Dashboard</p>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/" className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${pathname === '/' ? 'bg-white shadow-sm text-blue-600 border border-white/50' : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'}`}>
          <svg className={`w-5 h-5 mr-3 ${pathname === '/' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </Link>
        <Link
          href="/reports"
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
            pathname === '/reports'
              ? 'bg-white shadow-sm text-indigo-600 border border-white/50'
              : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
          }`}
        >
          <svg className={`w-5 h-5 ${pathname === '/reports' ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Reports</span>
        </Link>

        <Link
          href="/agent"
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
            pathname === '/agent'
              ? 'bg-white shadow-sm text-fuchsia-600 border border-white/50'
              : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
          }`}
        >
          <svg className={`w-5 h-5 ${pathname === '/agent' ? 'text-fuchsia-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span>Monitor Agent</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-gray-200/50 m-4 rounded-2xl bg-white/40 shadow-sm backdrop-blur-md">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-md flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500 font-medium">admin@student.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
