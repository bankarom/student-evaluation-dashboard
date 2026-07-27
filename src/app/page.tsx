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
            <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              {/* Backdrop */}
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

              <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  {/* Modal Panel */}
                  <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-gray-100">
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsScoringModalOpen(false)}
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.58-1.936a4.5 4.5 0 004.5-4.5 3.01 3.01 0 00-1.5-2.59A14.22 14.22 0 0012 2.75a14.22 14.22 0 00-6.83 1.942 3.01 3.01 0 00-1.5 2.59 4.5 4.5 0 004.5 4.5c.922.107 1.58.953 1.58 1.936v.192m-3.75 0h7.5" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-lg font-bold leading-6 text-gray-900" id="modal-title">
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
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsScoringModalOpen(false)}
                        className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto cursor-pointer"
                      >
                        Understood
                      </button>
                    </div>
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
