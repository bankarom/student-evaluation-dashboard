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

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
