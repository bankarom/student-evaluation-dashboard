import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  onExport?: (type: 'json' | 'csv') => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onExport
}: FilterBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-lg shadow-gray-200/40 border border-white/60 mb-8 flex flex-col md:flex-row gap-5 items-end">
      <div className="flex-1 w-full relative">
        <label htmlFor="search" className="block text-sm font-bold text-gray-800 mb-2">
          Search Student
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            name="search"
            role="searchbox"
            aria-label="Search by student name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-10 appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all"
            placeholder="Search by student name..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-40 relative">
        <label htmlFor="fromDate" className="block text-sm font-bold text-gray-800 mb-2">
          From Date
        </label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          aria-label="Filter from date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all"
        />
      </div>

      <div className="w-full md:w-40 relative">
        <label htmlFor="toDate" className="block text-sm font-bold text-gray-800 mb-2">
          To Date
        </label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          aria-label="Filter to date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all"
        />
      </div>

      <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 md:ml-auto">
        <button
          onClick={() => onExport?.('csv')}
          className="px-5 py-2.5 border border-gray-200 shadow-sm text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          CSV
        </button>
        <button
          onClick={() => onExport?.('json')}
          className="px-5 py-2.5 border border-transparent shadow-md text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          JSON
        </button>
      </div>
    </div>
  );
}
