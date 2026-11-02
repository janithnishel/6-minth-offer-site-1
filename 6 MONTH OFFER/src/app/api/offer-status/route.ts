import { NextResponse } from "next/server";
import { getOfferStatus } from "@/lib/offer-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getOfferStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "no-store" },
  });
}
