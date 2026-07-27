"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import ErrorMessage from "@/components/ErrorMessage";
import MetricsChart from "@/components/MetricsChart";
import { getSessionById } from "@/lib/api";
import { Session } from "@/types";
import Link from "next/link";

export default function SessionDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessionDetail() {
      if (!id || typeof id !== 'string') return;
      
      try {
        const data = await getSessionById(id);
        if (!data) {
          setError("Session not found");
        } else {
          setSession(data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load session details");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSessionDetail();
  }, [id]);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-gray-700 flex items-center mr-4"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {isLoading ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 font-medium">Loading session details...</p>
            </div>
          ) : error || !session ? (
            <ErrorMessage message={error || "Unknown error"} onRetry={() => window.location.reload()} />
          ) : (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{session.studentName}</h1>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mentor: {session.mentorName}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {session.date}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {session.durationMinutes} mins
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                      ${session.status === 'Excellent' ? 'bg-green-100 text-green-800' : 
                        session.status === 'Needs Attention' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {session.status}
                    </span>
                  </div>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">Avg Engagement</p>
                    <p className="text-2xl font-bold text-blue-900">{session.averageEngagement}%</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800 mb-1">Avg Clarity</p>
                    <p className="text-2xl font-bold text-green-900">{session.averageClarity}%</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Avg Pacing</p>
                    <p className="text-2xl font-bold text-yellow-900">{session.averagePacing}%</p>
                  </div>
                </div>
              </div>

              {/* Chart Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Insights Over Time</h3>
                <MetricsChart data={session.metrics} />
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
