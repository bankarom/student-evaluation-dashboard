import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 p-8 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
      <svg className="w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-6">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
