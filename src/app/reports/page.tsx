"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportReady, setReportReady] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    setReportReady(false);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setReportReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Reports & Insights</h1>
              <p className="text-sm text-gray-500 mt-1">Automated trend analysis and anomaly detection</p>
            </div>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 disabled:bg-blue-400 transition-all flex items-center cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Data...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Run AI Analysis
                </>
              )}
            </button>
          </div>

          {isGenerating && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Processing 20 sessions...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {(!reportReady && !isGenerating) && (
             <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Active Report</h3>
                <p className="text-gray-500">Click "Run AI Analysis" to generate insights across all student sessions.</p>
             </div>
          )}

          {reportReady && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insights Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Positive Trends
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></span>
                      <p className="text-sm text-gray-600"><strong>Clarity improvements:</strong> Overall clarity scores have improved by 12% compared to last week across all cohorts.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></span>
                      <p className="text-sm text-gray-600"><strong>Peak Engagement:</strong> Sessions involving "Dr. Rajesh Khanna" show consistently higher peak engagement (avg 89%).</p>
                    </li>
                  </ul>
                </div>

                {/* Anomalies Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Anomalies Detected
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                      <p className="text-sm text-gray-600"><strong>Pacing drops:</strong> 4 sessions flagged for pacing dropping below 60% during the final 15 minutes.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                      <p className="text-sm text-gray-600"><strong>Low interaction:</strong> "Priya Sharma" had unusually low engagement (48%) in her recent session compared to her historical average.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-xl p-8 text-white flex justify-between items-center shadow-lg">
                <div>
                  <h3 className="text-xl font-bold mb-2">Download Full PDF Report</h3>
                  <p className="text-indigo-200 text-sm max-w-md">Get a comprehensive 12-page breakdown of all student metrics, mentor performance, and historical cohort comparisons.</p>
                </div>
                <button 
                  onClick={() => alert("Mock PDF downloaded!")}
                  className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
