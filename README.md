# Student Evaluation Dashboard

A production-grade, highly interactive internal analytics dashboard for monitoring student session performance. Built as a take-home assessment for the Bodhrik Frontend Engineer role.

## Project Description

This dashboard allows mentors and administrators to evaluate the performance of students across various learning sessions. It aggregates detailed metrics—such as **Engagement**, **Clarity**, and **Pacing**—and presents them in a visually stunning, highly responsive interface. 

The application was designed with a "Premium Glassmorphism" UI, featuring frosted glass panels, vibrant mesh gradient backgrounds, smooth micro-animations, and custom Area charts. It goes beyond the basic requirements by offering a truly premium user experience.

## Tech Stack Used

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom Glassmorphism configurations)
- **Data Visualization**: Recharts (Customized Area and Radar charts)
- **Icons**: Custom SVGs (Heroicons inspired)
- **State Management**: React Hooks (`useState`, `useMemo`, `useContext`)
- **Authentication**: Custom Mock Auth Context using `sessionStorage`

## Key Features Built

1. **Mock JSON API & State**: Robust mock API (`src/lib/api.ts`) simulating network latency with typed JSON data.
2. **List & Filtering**: Client-side filtering by Student Name and Date Ranges.
3. **Session Detail View**: Dynamic routing (`/session/[id]`) with custom time-series Area Chart.
4. **Resilience**: Loading spinners, empty states, and error boundaries. 
5. **Mock Authentication**: Mock login screen using `sessionStorage`.

## 🚀 Additional Bonus Features Implemented

To ensure a premium user experience, the following features were added beyond the basic requirements:
- **Data Exporting**: One-click exports for CSV, JSON, and PDF Reports.
- **Premium Glassmorphism UI**: High-end styling using frosted glass panels, mesh gradient backgrounds, and micro-animations (similar to Apple Health / macOS).
- **Custom Area & Radar Charts**: Upgraded standard Recharts lines to custom SVG Area fills with natural smoothing and beautiful tooltips.

## Setup & Execution Instructions

Follow these steps to run the application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bankarom/student-evaluation-dashboard.git
   cd student-evaluation-dashboard
   npm install
   npm run dev
   ```

2. **Mock Credentials:**
   Navigate to `http://localhost:3000` and use:
   - **Email:** `admin@student.com`
   - **Password:** `evaluation2026`

## Live Deployment
This application is deployed on Vercel: **[https://student-evaluation-dashboard.vercel.app](https://student-evaluation-dashboard.vercel.app)** 
