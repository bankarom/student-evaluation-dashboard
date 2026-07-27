"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { MetricTimestamp } from '@/types';

interface MetricsChartProps {
  data: MetricTimestamp[];
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="timestamp" 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            tickMargin={10}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            name="Engagement"
            dataKey="engagementScore" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            name="Clarity"
            dataKey="clarityScore" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            name="Pacing"
            dataKey="pacingScore" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
