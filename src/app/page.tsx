import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import SummaryCards from "@/components/SummaryCards";

export default function Home() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <SummaryCards 
            totalSessions={20} 
            totalStudents={8} 
            avgEngagement={86} 
            avgClarity={88} 
            needsReview={2} 
          />
          
          {/* Placeholder for Session Table */}
          <div className="bg-white shadow rounded-lg p-6 text-gray-500">
            Session table will go here.
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
