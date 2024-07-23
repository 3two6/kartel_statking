import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDaysToTimestamp(timestamp: string, days: number) {
  // Create a Date object from the timestamp
  const originalDate = new Date(timestamp);

  // Add the specified number of days to the date
  const newDate = new Date(originalDate);
  newDate.setDate(originalDate.getDate() + days);

  // Format the resulting date as ISO string
  return newDate.toISOString();
}