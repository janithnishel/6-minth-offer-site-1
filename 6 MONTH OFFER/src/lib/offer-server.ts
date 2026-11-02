import { sql } from "drizzle-orm";
import { db } from "@/db";
import { offerRegistrations } from "@/db/schema";
import { SOLO_SEATS } from "./packages";
import { getOfferWindow, isOfferActive, monthLabel, type OfferStatus } from "./offer";

/** Reads live registration counts from Postgres. */
export async function getOfferStatus(): Promise<OfferStatus> {
  const { end } = getOfferWindow();
  const base: OfferStatus = {
    active: isOfferActive(),
    deadlineIso: end.toISOString(),
    monthLabel: monthLabel(),
    seatsTotal: SOLO_SEATS,
    seatsTaken: 0,
    seatsRemaining: SOLO_SEATS,
    totalRegistrations: 0,
  };
  try {
    const [row] = await db
      .select({
        total: sql<number>`count(*)::int`,
        solo: sql<number>`count(*) filter (where package_slug = 'solo')::int`,
      })
      .from(offerRegistrations);
    const taken = Number(row?.solo ?? 0);
    const total = Number(row?.total ?? 0);
    return {
      ...base,
      seatsTaken: taken,
      seatsRemaining: Math.max(0, SOLO_SEATS - taken),
      totalRegistrations: total,
    };
  } catch {
    return base;
  }
}
