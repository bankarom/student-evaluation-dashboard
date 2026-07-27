"use client";

import React from 'react';

interface MonitorAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function MonitorAgentModal({ isOpen, onClose, onDownload }: MonitorAgentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 transition-opacity">
      <div className="relative w-full max-w-md p-4 max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all">
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-2 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal header */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-4 shadow-sm border border-blue-200">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">Monitor Agent (Demo)</h3>
          </div>

          {/* Modal body */}
          <div className="space-y-4 mb-8">
            <p className="text-sm text-gray-600 leading-relaxed text-center">
              The Monitor Agent securely collects session metrics (engagement, clarity, pacing) directly from the student's machine.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>Runs seamlessly in the background during active sessions.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>Data is encrypted before transmitting to our secure API.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>Privacy-first architecture respecting student bandwidth.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onDownload();
                onClose();
              }}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Demo Installer
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-600 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-3 hover:text-gray-900 focus:z-10 transition-colors"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
