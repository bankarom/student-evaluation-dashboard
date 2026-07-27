"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Session } from '@/types';

interface AnalyticsDashboardProps {
  sessions: Session[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function AnalyticsDashboard({ sessions }: AnalyticsDashboardProps) {
  const chartData = useMemo(() => {
    if (!sessions.length) return { barData: [], pieData: [] };

    // Group by Mentor for Bar Chart
    const mentorMap = new Map();
    sessions.forEach(session => {
      if (!mentorMap.has(session.mentorName)) {
        mentorMap.set(session.mentorName, {
          name: session.mentorName,
          engagement: 0,
          clarity: 0,
          count: 0
        });
      }
      const m = mentorMap.get(session.mentorName);
      m.engagement += session.averageEngagement;
      m.clarity += session.averageClarity;
      m.count += 1;
    });

    const barData = Array.from(mentorMap.values()).map(m => ({
      name: m.name,
      'Avg Engagement': Math.round(m.engagement / m.count),
      'Avg Clarity': Math.round(m.clarity / m.count)
    }));

    // Group by Status for Pie Chart
    const statusMap = { Excellent: 0, Good: 0, Average: 0, 'Needs Attention': 0 };
    sessions.forEach(s => {
      if (statusMap[s.status as keyof typeof statusMap] !== undefined) {
        statusMap[s.status as keyof typeof statusMap] += 1;
      }
    });

    const pieData = [
      { name: 'Excellent', value: statusMap.Excellent },
      { name: 'Good', value: statusMap.Good },
      { name: 'Average', value: statusMap.Average },
      { name: 'Needs Attention', value: statusMap['Needs Attention'] }
    ].filter(d => d.value > 0);

    return { barData, pieData };
  }, [sessions]);

  if (!sessions.length) return null;

  return (
    <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Data Analytics Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mentor Performance Bar Chart */}
        <div className="h-80">
          <h3 className="text-sm font-medium text-gray-500 mb-4 text-center">Mentor Average Scores</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="Avg Engagement" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Avg Clarity" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Session Status Pie Chart */}
        <div className="h-80">
          <h3 className="text-sm font-medium text-gray-500 mb-4 text-center">Session Status Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
