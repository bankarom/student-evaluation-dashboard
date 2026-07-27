import React from 'react';

interface SummaryCardsProps {
  totalSessions: number;
  totalStudents: number;
  avgEngagement: number;
  avgClarity: number;
  needsReview: number;
}

export default function SummaryCards({
  totalSessions,
  totalStudents,
  avgEngagement,
  avgClarity,
  needsReview,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 p-5 flex flex-col items-center justify-center transition-all hover:shadow-xl">
        <p className="text-sm font-medium text-gray-500 mb-1">Total Sessions</p>
        <h3 className="text-3xl font-bold text-gray-900">{totalSessions}</h3>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 p-5 flex flex-col items-center justify-center transition-all hover:shadow-xl">
        <p className="text-sm font-medium text-gray-500 mb-1">Students</p>
        <h3 className="text-3xl font-bold text-gray-900">{totalStudents}</h3>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 p-5 flex flex-col items-center justify-center transition-all hover:shadow-xl">
        <p className="text-sm font-medium text-gray-500 mb-1">Avg Engagement</p>
        <h3 className="text-3xl font-bold text-green-600">{avgEngagement}%</h3>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 p-5 flex flex-col items-center justify-center transition-all hover:shadow-xl">
        <p className="text-sm font-medium text-gray-500 mb-1">Avg Clarity</p>
        <h3 className="text-3xl font-bold text-blue-600">{avgClarity}%</h3>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 p-5 flex flex-col items-center justify-center transition-all hover:shadow-xl border-l-4 border-l-red-500">
        <p className="text-sm font-medium text-gray-500 mb-1">Needs Review</p>
        <h3 className="text-3xl font-bold text-red-600">{needsReview}</h3>
      </div>
    </div>
  );
}
