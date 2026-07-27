const fs = require('fs');

const students = ['Alex Johnson', 'Maria Garcia', 'James Smith', 'Linda Chen', 'Robert Taylor', 'Patricia Davis', 'Michael Miller', 'Jennifer Wilson', 'William Moore', 'Elizabeth Taylor'];
const mentors = ['Dr. Alan Grant', 'Sarah Harding', 'Ian Malcolm'];
const statuses = ['Needs Attention', 'Excellent', 'Average'];

const sessions = [];

for (let i = 1; i <= 25; i++) {
  const studentName = students[Math.floor(Math.random() * students.length)];
  const mentorName = mentors[Math.floor(Math.random() * mentors.length)];
  
  // Generate random date within the last 30 days
  const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const durationMinutes = Math.floor(Math.random() * 30) + 30; // 30-60 mins

  const metrics = [];
  let totalEng = 0, totalClar = 0, totalPac = 0;
  
  const numTimestamps = Math.floor(durationMinutes / 5); // metric every 5 mins
  for (let j = 0; j <= numTimestamps; j++) {
    const timeStr = `${j * 5}:00`;
    const eng = Math.floor(Math.random() * 40) + 60; // 60-100
    const clar = Math.floor(Math.random() * 40) + 60;
    const pac = Math.floor(Math.random() * 40) + 60;
    
    totalEng += eng;
    totalClar += clar;
    totalPac += pac;
    
    metrics.push({
      timestamp: timeStr,
      engagementScore: eng,
      clarityScore: clar,
      pacingScore: pac
    });
  }

  const avgEng = Math.round(totalEng / (numTimestamps + 1));
  const avgClar = Math.round(totalClar / (numTimestamps + 1));
  const avgPac = Math.round(totalPac / (numTimestamps + 1));

  let status = 'Average';
  if (avgEng > 85 && avgClar > 85) status = 'Excellent';
  if (avgEng < 70 || avgClar < 70) status = 'Needs Attention';

  sessions.push({
    id: `ses-${i.toString().padStart(3, '0')}`,
    studentName,
    mentorName,
    date,
    durationMinutes,
    metrics,
    averageEngagement: avgEng,
    averageClarity: avgClar,
    averagePacing: avgPac,
    status
  });
}

fs.writeFileSync('./data/sessions.json', JSON.stringify(sessions, null, 2));
console.log('Generated sessions.json');
