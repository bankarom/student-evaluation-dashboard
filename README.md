# Student Session Dashboard

Monitor and analyze student session performance through interactive dashboards.

## Overview
This is a production-quality Next.js application built as a Frontend Engineer take-home assignment. It acts as an internal analytics dashboard used by teachers to monitor student session performance. 

## Features
- **Mock Authentication**: Secure dashboard behind a simulated login (using `localStorage`).
- **Dashboard Layout**: Professional, responsive sidebar and top navigation.
- **Summary Statistics**: Quick insight cards (Total Sessions, Avg Engagement, Needs Review).
- **Session Table**: Displays timestamped evaluations with E/C/P metrics.
- **Filtering & Search**: Real-time search by student name and date range filtering.
- **Session Details**: Deep dive into individual sessions with comprehensive insights.
- **Interactive Charts**: Responsive line charts rendering Engagement, Clarity, and Pacing over time (via Recharts).
- **Export Functionality**: Download filtered sessions as JSON or CSV.
- **Monitoring Agent (Demo)**: A mock download button demonstrating where an agent could be distributed.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks (Context, useState, useEffect, useMemo)
- **Data Source**: Mock JSON API with simulated network latency

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/bankarom/student-evaluation-dashboard.git
   cd student-evaluation-dashboard
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Mock Login Credentials
Use the following credentials to access the protected dashboard:
- **Email**: \`admin@student.com\`
- **Password**: \`password\`

## Folder Structure
- \`src/app\`: Next.js App Router pages (Dashboard, Login, Session Details).
- \`src/components\`: Reusable UI components (Navbar, Sidebar, Tables, Charts).
- \`src/lib\`: Utilities (AuthContext, mock API service).
- \`src/types\`: TypeScript interfaces for robust typing.
- \`data\`: Contains \`sessions.json\` (generated realistic mock data).
- \`scripts\`: Node script used to generate the mock dataset.

## Future Improvements & Scalability
For 10,000+ sessions, this application would transition client-side filtering to Server-Side Filtering, utilize Pagination in the Session Table, and leverage a real backend database to reduce client payload size.

*Built for the Student Frontend Engineer Assignment.*
