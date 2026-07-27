"use client";

import React from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function AgentPage() {
  const handleDownloadDemo = () => {
    const readmeContent = `MONITORING AGENT (DEMO FEATURE)
===============================
This is a demonstration of the Monitoring Agent download.
In a production environment, this agent would run locally on the student's machine to securely collect session metrics (like engagement, clarity, and pacing) and upload them to the backend API.

Note: This is not part of the required assignment, but a bonus demonstration feature.`;
    
    const blob = new Blob([readmeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Monitoring_Agent_Demo.txt';
    a.click();
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-center">
              <svg className="w-16 h-16 text-white mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h1 className="text-3xl font-extrabold text-white mb-2">Student Monitor Agent</h1>
              <p className="text-blue-100 max-w-lg mx-auto">
                Securely collect engagement, clarity, and pacing metrics natively during live sessions.
              </p>
            </div>
            
            <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Lightweight</h3>
                  <p className="text-sm text-gray-500">Runs silently in the background with <br/>&lt; 5MB memory footprint.</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Privacy First</h3>
                  <p className="text-sm text-gray-500">End-to-end encrypted telemetry. No personally identifiable data collected.</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Resilient</h3>
                  <p className="text-sm text-gray-500">Automatically caches metrics if the student loses internet connection.</p>
                </div>
              </div>

              <div className="flex justify-center border-t border-gray-100 pt-8">
                <button
                  onClick={handleDownloadDemo}
                  className="px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl rounded-xl text-lg font-bold transition-all flex items-center group"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Agent Installer
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                Version 1.4.2 (Windows, macOS, Linux supported)
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
