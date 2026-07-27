import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function Home() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Placeholder for Phase 4 (Summary Cards & Table) */}
          <div className="bg-white shadow rounded-lg p-6 text-gray-500">
            Dashboard metrics and session table will go here.
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
