import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { offerRegistrations } from "@/db/schema";
import { getPackage, PACKAGES, SOLO_SEATS, type PackageSlug } from "@/lib/packages";
import { getOfferWindow, isOfferActive, monthLabel } from "@/lib/offer";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Body {
  packageSlug?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  teamSize?: string;
  message?: string;
  consent?: boolean;
}

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail(400, "Invalid request payload.");
  }

  // ---- Offer window: registrations are accepted during the current month only
  if (!isOfferActive()) {
    return fail(
      410,
      `The ${monthLabel()} launch offer has closed. Watch this page for the next window.`,
    );
  }

  const pkg = getPackage(String(body.packageSlug ?? ""));
  if (!pkg) return fail(400, "Please choose one of the four launch packages.");

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const businessName = String(body.businessName ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (fullName.length < 2) return fail(400, "Please enter your full name.");
  if (!EMAIL_RE.test(email)) return fail(400, "Please enter a valid email address.");
  if (phone.replace(/\D/g, "").length < 9)
    return fail(400, "Please enter a reachable phone number (at least 9 digits).");
  if (body.consent !== true)
    return fail(400, "Please accept the offer terms to register.");

  // ---- Solo seat cap, enforced atomically
  if (pkg.slug === "solo") {
    try {
      const result = await db.transaction(async (tx) => {
        const [row] = await tx
          .select({ taken: sql<number>`count(*)::int` })
          .from(offerRegistrations)
          .where(eq(offerRegistrations.packageSlug, "solo"));
        const taken = Number(row?.taken ?? 0);
        if (taken >= SOLO_SEATS) {
          return { kind: "full" as const, taken };
        }
        const code = makeCode();
        const [inserted] = await tx
          .insert(offerRegistrations)
          .values({
            packageSlug: pkg.slug as PackageSlug,
            fullName,
            email,
            phone,
            businessName: businessName || null,
            teamSize: String(body.teamSize ?? "").trim() || null,
            message: message || null,
            code,
          })
          .returning({ id: offerRegistrations.id, code: offerRegistrations.code });
        return { kind: "ok" as const, taken: taken + 1, row: inserted };
      });

      if (result.kind === "full") {
        return fail(
          409,
          `All ${SOLO_SEATS} free Solo Starter seats have been claimed. The other three packages still carry 50% off for 6 months.`,
          { seatsRemaining: 0 },
        );
      }
      return NextResponse.json(
        {
          ok: true,
          code: result.row!.code,
          packageSlug: pkg.slug,
          seatsRemaining: Math.max(0, SOLO_SEATS - result.taken),
        },
        { status: 201 },
      );
    } catch (e) {
      if (isUniqueViolation(e)) {
        return fail(409, "This email is already registered for the launch offer.");
      }
      throw e;
    }
  }

  // ---- Unlimited-seat packages
  try {
    const code = makeCode();
    const [inserted] = await db
      .insert(offerRegistrations)
      .values({
        packageSlug: pkg.slug as PackageSlug,
        fullName,
        email,
        phone,
        businessName: businessName || null,
        teamSize: String(body.teamSize ?? "").trim() || null,
        message: message || null,
        code,
      })
      .returning({ code: offerRegistrations.code });
    return NextResponse.json(
      { ok: true, code: inserted.code, packageSlug: pkg.slug },
      { status: 201 },
    );
  } catch (e) {
    if (isUniqueViolation(e)) {
      return fail(409, "This email is already registered for the launch offer.");
    }
    throw e;
  }
}

function makeCode(): string {
  const t = Date.now().toString(36).toUpperCase().slice(-5);
  const r = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `CF-${t}${r}`;
}

function isUniqueViolation(e: unknown): boolean {
  if (typeof e !== "object" || e === null) return false;
  const err = e as {
    code?: string;
    message?: string;
    cause?: { code?: string; message?: string };
  };
  return (
    err.code === "23505" ||
    err.cause?.code === "23505" ||
    /duplicate key|unique constraint/i.test(err.message ?? "") ||
    /duplicate key|unique constraint/i.test(err.cause?.message ?? "")
  );
}

export async function GET() {
  const { start, end } = getOfferWindow();
  return NextResponse.json({
    packages: PACKAGES.map((p) => p.slug),
    window: { start: start.toISOString(), end: end.toISOString() },
    soloSeats: SOLO_SEATS,
  });
}
