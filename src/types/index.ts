export interface MetricTimestamp {
  timestamp: string; // ISO format or time string like "10:00 AM"
  engagementScore: number; // 0-100
  clarityScore: number;    // 0-100
  pacingScore: number;     // 0-100
}

export interface Session {
  id: string;
  studentName: string;
  mentorName: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  metrics: MetricTimestamp[];
  // Calculated averages
  averageEngagement: number;
  averageClarity: number;
  averagePacing: number;
  status: 'Needs Attention' | 'Excellent' | 'Average';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher';
}
