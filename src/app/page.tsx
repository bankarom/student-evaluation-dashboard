"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import SummaryCards from "@/components/SummaryCards";
import SessionTable from "@/components/SessionTable";
import { getSessions } from "@/lib/api";
import { Session } from "@/types";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const totalSessions = sessions.length;
  const totalStudents = new Set(sessions.map((s) => s.studentName)).size;
  const avgEngagement = totalSessions 
    ? Math.round(sessions.reduce((acc, s) => acc + s.averageEngagement, 0) / totalSessions) 
    : 0;
  const avgClarity = totalSessions 
    ? Math.round(sessions.reduce((acc, s) => acc + s.averageClarity, 0) / totalSessions) 
    : 0;
  const needsReview = sessions.filter((s) => s.status === 'Needs Attention').length;

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
          
          {isLoading ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-center">
              <p className="text-gray-500">Loading sessions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-8 rounded-xl border border-red-100 text-center text-red-600">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <SessionTable sessions={sessions} />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
