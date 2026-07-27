"use client";

import { useEffect, useState, useMemo } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import SummaryCards from "@/components/SummaryCards";
import { getSessions } from "@/lib/api";
import { Session } from "@/types";
import SessionTable from "@/components/SessionTable";
import FilterBar from "@/components/FilterBar";
import ErrorMessage from "@/components/ErrorMessage";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  // UI states
  const [isScoringModalOpen, setIsScoringModalOpen] = useState(false);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (err: any) {
        setError(err.message || "Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      // Search filter
      const matchesSearch = session.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Date filter
      const sessionDate = new Date(session.date).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : 0;
      const to = toDate ? new Date(toDate).getTime() : Infinity;
      
      const matchesDate = sessionDate >= from && sessionDate <= to;
      
      return matchesSearch && matchesDate;
    });
  }, [sessions, searchQuery, fromDate, toDate]);

  const totalSessions = filteredSessions.length;
  const totalStudents = new Set(filteredSessions.map((s) => s.studentName)).size;
  const avgEngagement = totalSessions 
    ? Math.round(filteredSessions.reduce((acc, s) => acc + s.averageEngagement, 0) / totalSessions) 
    : 0;
  const avgClarity = totalSessions 
    ? Math.round(filteredSessions.reduce((acc, s) => acc + s.averageClarity, 0) / totalSessions) 
    : 0;
  const needsReview = filteredSessions.filter((s) => s.status === 'Needs Attention').length;

  const resetFilters = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
  };

  const handleExport = (type: 'json' | 'csv') => {
    if (type === 'json') {
      const dataStr = JSON.stringify(filteredSessions, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sessions_export.json';
      a.click();
    } else {
      const headers = ['ID', 'Student', 'Mentor', 'Date', 'Duration(mins)', 'Status'];
      const csvRows = filteredSessions.map(s => 
        [s.id, s.studentName, s.mentorName, s.date, s.durationMinutes, s.status].join(',')
      );
      const csvContent = [headers.join(','), ...csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sessions_export.csv';
      a.click();
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <SummaryCards 
            totalSessions={totalSessions} 
            totalStudents={totalStudents} 
            avgEngagement={avgEngagement} 
            avgClarity={avgClarity} 
            needsReview={needsReview} 
          />

          <AnalyticsDashboard sessions={filteredSessions} />
          
          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">Session Evaluations</h2>
            <button
              type="button"
              onClick={() => setIsScoringModalOpen(true)}
              className="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center transition-colors border border-blue-100 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              How are scores calculated?
            </button>
          </div>

          {/* Scoring Rubric Modal */}
          {isScoringModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsScoringModalOpen(false)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                          Evaluation Methodology & Scoring Rubric
                        </h3>
                        <div className="mt-4 space-y-4">
                          <p className="text-sm text-gray-500">
                            Our proprietary Student Monitor Agent natively analyzes 3 core dimensions of a live session.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Engagement (E)
                            </h4>
                            <p className="text-sm text-gray-600">Measures visual focus, eye-tracking attention markers, and response times to interactive polls or questions during the session.</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Clarity (C)
                            </h4>
                            <p className="text-sm text-gray-600">Evaluates voice tone confidence, question frequency, and real-time comprehension markers from the student.</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Pacing (P)
                            </h4>
                            <p className="text-sm text-gray-600">Analyzes the speed of the mentor's delivery versus the student's cognitive processing rate (measured via interaction velocity).</p>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-bold text-gray-900 text-sm mb-2">Final Status Calculation</h4>
                            <div className="flex gap-2 text-xs flex-wrap">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded font-medium">&gt; 85 avg = Excellent</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">&gt; 70 avg = Good</span>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-medium">&gt; 60 avg = Average</span>
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded font-medium">&lt; 60 avg = Needs Attention</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={() => setIsScoringModalOpen(false)}
                      className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                    >
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <FilterBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onExport={handleExport}
          />
          
          {isLoading ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 font-medium">Loading sessions data...</p>
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          ) : filteredSessions.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No sessions found</h3>
              <p className="text-gray-500 mb-4">We couldn't find any sessions matching your current filters.</p>
              <button onClick={resetFilters} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            <SessionTable sessions={filteredSessions} />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
