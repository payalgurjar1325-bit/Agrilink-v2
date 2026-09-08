import { Language } from '../types';

export function timeAgo(isoString: string, language: Language = 'en'): string {
  const now = new Date('2026-09-06T09:00:00');
  const then = new Date(isoString);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const updated = language === 'hi' ? 'अपडेट' : language === 'mr' ? 'अपडेट' : 'Updated';
  const ago = language === 'hi' ? 'पहले' : language === 'mr' ? 'पूर्वी' : 'ago';
  if (diffMin < 60) return `${updated} ${diffMin}m ${ago}`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${updated} ${diffHr}h ${ago}`;
  const diffDay = Math.round(diffHr / 24);
  return `${updated} ${diffDay}d ${ago}`;
}

export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
