import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateString));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export const platformLabels: Record<string, string> = {
  facebook: 'Facebook', google: 'Google', tiktok: 'TikTok',
  youtube: 'YouTube', native: 'Native Ads',
};

export const toneLabels: Record<string, string> = {
  aggressive: 'Aggressive / Hard Sell', soft_sell: 'Soft Sell',
  curiosity: 'Curiosity-Driven', fear_based: 'Fear-Based',
  aspirational: 'Aspirational', conversational: 'Conversational',
};

export const hookStyleLabels: Record<string, string> = {
  shock_stat: 'Shock Statistic', story: 'Story Open',
  bold_promise: 'Bold Promise', question: 'Question Hook',
  controversy: 'Controversy / Contrarian',
};