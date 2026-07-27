import React from 'react';
import { Session } from '@/types';
import Link from 'next/link';

interface SessionTableProps {
  sessions: Session[];
}

export default function SessionTable({ sessions }: SessionTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl p-12 text-center rounded-2xl border border-white/60 shadow-lg shadow-gray-200/40">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">No sessions found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <div key={session.id} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 overflow-hidden flex flex-col">
          
          <div className="p-5 border-b border-gray-100/50 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                {session.studentName}
              </h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {session.mentorName}
              </p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm
              ${session.status === 'Excellent' ? 'bg-green-100 text-green-700 border border-green-200' : 
                session.status === 'Needs Attention' ? 'bg-red-100 text-red-700 border border-red-200' : 
                session.status === 'Good' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
              {session.status}
            </span>
          </div>

          <div className="p-5 space-y-4 flex-grow">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">Engagement</span>
                <span className="text-blue-600 font-bold">{session.averageEngagement}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${session.averageEngagement}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">Clarity</span>
                <span className="text-green-600 font-bold">{session.averageClarity}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${session.averageClarity}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">Pacing</span>
                <span className="text-orange-600 font-bold">{session.averagePacing}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${session.averagePacing}%` }}></div>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-50">
               <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               {session.date} • {session.durationMinutes} mins
            </div>
          </div>

          <div className="bg-gray-50 p-4 border-t border-gray-100">
            <Link 
              href={`/session/${session.id}`} 
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 border-blue-100 transition-colors"
            >
              View Full Report
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
