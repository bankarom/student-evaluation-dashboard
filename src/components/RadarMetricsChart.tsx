"use client";

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface RadarMetricsChartProps {
  engagement: number;
  clarity: number;
  pacing: number;
}

export default function RadarMetricsChart({ engagement, clarity, pacing }: RadarMetricsChartProps) {
  const data = [
    { subject: 'Engagement', A: engagement, fullMark: 100 },
    { subject: 'Clarity', A: clarity, fullMark: 100 },
    { subject: 'Pacing', A: pacing, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
      <h3 className="text-sm font-bold text-gray-700 mb-2">Overall Balance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Tooltip />
          <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
