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

## Key Features Built (Fulfilling all requirements)

1. **Mock JSON API & State**: A robust mock API layer (`src/lib/api.ts`) that simulates network latency and returns strictly typed JSON data representing student sessions.
2. **List & Filtering**: A comprehensive data table with client-side filtering by both Student Name (text search) and Date Ranges.
3. **Session Detail View**: Dynamic routing to individual session pages (`/session/[id]`) featuring a custom time-series Area Chart showing metrics across timestamps.
4. **Resilience & Edge Cases**: Gracefully handles loading spinners, empty filter states ("No sessions found"), and error boundaries. 
5. **Mock Authentication**: A fully functional mock login screen that gates the dashboard. It uses `sessionStorage` so new tabs force a login, ensuring strict session privacy.
6. **Responsive Design**: Flawlessly adapts from ultra-wide monitors down to mobile devices.
7. **Premium UI/UX**: "Apple Health" style metric blocks, frosted glass modals, and custom interactive tooltips.

## Setup & Execution Instructions

Follow these steps to run the application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bankarom/student-evaluation-dashboard.git
   cd student-evaluation-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to `http://localhost:3000`. 
   
5. **Mock Credentials:**
   You will be presented with the login screen. Use the following credentials:
   - **Email:** `admin@student.com`
   - **Password:** `evaluation2026`

## Repository & Commit History

This repository features a clean, incremental commit history detailing the evolution of the project from boilerplate setup, to structural layout, to UI overhaul. 
