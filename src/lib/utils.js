import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateNumericCode(length = 6) {
  const charset = '0123456789';
  let code = '';

  // Use crypto for stronger randomness if available
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      code += charset[values[i] % charset.length];
    }
  } else {
    // Fallback to Math.random
    for (let i = 0; i < length; i++) {
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }

  return code;
}

export function formatNumberWithCommas(value) {
  if (value === null || value === undefined || isNaN(value)) return "";

  return Number(value).toLocaleString();
}

export function getAppointmentStatus({ status, date_ISO, startHour, endHour }) {
  const now = DateTime.now();

  // Build start and end times on the given date
  const bookingStartTime = DateTime.fromISO(date_ISO).set({
    hour: startHour,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const bookingEndTime = DateTime.fromISO(date_ISO).set({
    hour: endHour,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  // Helper flags
  const hasStarted = now >= bookingStartTime;
  const hasEnded = now > bookingEndTime;

  // 1) If the appointment is upcoming and is currently in progress
  if (
    (status === "upcoming" || status == "awaiting_completion") &&
    hasStarted &&
    !hasEnded
  ) {
    return "ongoing";
  }

  // 2) upcoming → either still upcoming or missed
  if (status === "upcoming") {
    return hasStarted ? "missed" : "upcoming";
  }

  // 3) Cancelled → as is
  if (status === "cancelled") {
    return "cancelled";
  }

  // 4) attended → as is
  if (status === "attended") {
    return "attended";
  }

  // 5) awaiting_completion → as is
  if (status === "awaiting_completion") {
    return "awaiting_completion";
  }

  // Fallback to the raw status
  return status;
}


export function clockTimer({ targetDate, startHour }) {
  const now = new Date();

  // Parse target date and add startHour
  const target = new Date(targetDate);
  target.setHours(startHour, 0, 0, 0);

  // Difference in milliseconds
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { str: "00days : 00hr : 00mins : 00secs", isZero: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { str: `${days}days : ${hours}hr : ${minutes}mins : ${seconds}secs`, isZero: false };
}

export function timeToAMPM_FromHour({ hour }) {
  const date = new Date();
  date.setHours(hour, 0, 0, 0); // hour:00:00
  const hours = date.getHours();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours.toString().padStart(2, '0')}:00 ${suffix}`;
}

export function timeToAMPM_FromHour_Duration({ startHour, durationInSeconds }) {
  const date = new Date();
  date.setHours(startHour, 0, 0, 0);
  const endDate = new Date(date.getTime() + durationInSeconds * 1000);
  const hours = endDate.getHours();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours.toString().padStart(2, '0')}:00 ${suffix}`;
}

export const isoToDateTime = ({ isoString }) => {
  return DateTime.fromISO(isoString)
    .toFormat("ccc LLL dd. hh:mma"); 
};

export function getUniqueByKey({ arr, key }) {
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) {
      return false;
    }
    seen.add(val);
    return true;
  });
}

export function sortByKey({ arr, key, order = "asc" }) {
  if (!Array.isArray(arr)) {
    throw new Error("First argument must be an array");
  }

  const sorted = [...arr].sort((a, b) => {
    const valA = Number(a[key]) || 0;
    const valB = Number(b[key]) || 0;

    return order === "asc" ? valA - valB : valB - valA;
  });

  return sorted;
}

export const sortByStatusPriority = (arr) => {
  const priorityOrder = [
    'ongoing',
    'new',
    'awaiting_completion',
    'attended',
    'missed',
    'cancelled'
  ];

  return [...arr].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.status);
    const bIndex = priorityOrder.indexOf(b.status);
    return aIndex - bIndex;
  });
};