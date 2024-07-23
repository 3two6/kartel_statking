import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDaysToTimestamp(timestamp: string, days: number) {
  const originalDate = new Date(timestamp);
  originalDate.setDate(originalDate.getDate() + days);
  return originalDate.toISOString();
}

export function formatTimeStamp(timestamp: string) {
  return moment(timestamp).format('DD/MM/YYYY, HH:mm');
}

export function formatTxHash(txHash: string) {
  if (txHash.length <= 10) return txHash;
  return `${txHash.slice(0, 10)}...${txHash.slice(-10)}`;
}