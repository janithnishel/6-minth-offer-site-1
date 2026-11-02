import { SOLO_SEATS } from "./packages";

export interface OfferStatus {
  active: boolean;
  /** ISO timestamp of the moment the offer window closes (end of current month) */
  deadlineIso: string;
  /** e.g. "February 2026" */
  monthLabel: string;
  seatsTotal: number;
  seatsTaken: number;
  seatsRemaining: number;
  totalRegistrations: number;
}

/**
 * The launch offer is valid for the current calendar month only.
 * Window: 00:00 on the 1st of the current month → 00:00 on the 1st of next month.
 */
export function getOfferWindow(now: Date = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  return { start, end };
}

export function isOfferActive(now: Date = new Date()): boolean {
  const { start, end } = getOfferWindow(now);
  return now >= start && now < end;
}

export function monthLabel(d: Date = new Date()): string {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function emptyOfferStatus(): OfferStatus {
  const { end } = getOfferWindow();
  return {
    active: isOfferActive(),
    deadlineIso: end.toISOString(),
    monthLabel: monthLabel(),
    seatsTotal: SOLO_SEATS,
    seatsTaken: 0,
    seatsRemaining: SOLO_SEATS,
    totalRegistrations: 0,
  };
}
