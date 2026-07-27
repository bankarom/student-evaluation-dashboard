import { Session } from '@/types';
import sessionsData from '../../data/sessions.json';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSessions(): Promise<Session[]> {
  await delay(800); // Simulate network latency

  // Simulate occasional random errors for robustness (e.g. 5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch sessions data from server.');
  }

  return sessionsData as Session[];
}

export async function getSessionById(id: string): Promise<Session | null> {
  await delay(500);
  
  const session = (sessionsData as Session[]).find((s) => s.id === id);
  if (!session) {
    return null;
  }
  
  return session;
}
