import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Placeholder for Phase 4 (Summary Cards & Table) */}
        <div className="bg-white shadow rounded-lg p-6 text-gray-500">
          Dashboard metrics and session table will go here.
        </div>
      </div>
    </ProtectedRoute>
  );
}
