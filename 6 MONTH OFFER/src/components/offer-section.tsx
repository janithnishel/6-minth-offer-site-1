"use client";

import { useOffer } from "./offer-context";
import { Countdown } from "./countdown";
import { PACKAGES, slr, SOLO_SEATS } from "@/lib/packages";
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconGift,
  IconSeat,
  IconShield,
} from "./icons";

export function OfferSection() {
  const { status, select } = useOffer();
  const solo = PACKAGES[0];
  const pct = Math.round((status.seatsTaken / status.seatsTotal) * 100);
  const soldOut = status.seatsRemaining <= 0;

  return (
    <section id="offer" className="relative scroll-mt-28 px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-night-900 shadow-lift">
        <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #facc15 0%, #d97706 45%, transparent 72%)",
          }}
        />

        <div className="relative px-6 py-14 sm:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-flare-400/40 bg-flare-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-flare-300">
              <IconClock className="h-4 w-4" />
              Valid for {status.monthLabel} only
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              The {status.monthLabel} launch offer closes at midnight on the
              last day of the month
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-100/85">
              Register below before the timer hits zero. Solo Starter is free
              for 6 months for the first {SOLO_SEATS} businesses only — the
              counter updates the moment a seat is claimed. Growth, Scale and
              Ultimate carry 50% off for 6 months, with unlimited registrations.
            </p>
          </div>

          <div className="mt-10">
            <Countdown deadlineIso={status.deadlineIso} />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Solo card */}
            <div className="relative overflow-hidden rounded-2xl border border-flare-400/35 bg-gradient-to-br from-night-800 to-night-900 p-7 sm:p-8">
              <span className="absolute right-6 top-6 rounded-full bg-flare-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-night-950">
                {soldOut ? "Sold out" : `${status.seatsRemaining} left`}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-flare-300">
                Offer 01 · First {SOLO_SEATS} only
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                Solo Starter — {solo.offerLabel}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100/80">
                Full Solo Starter workspace at {slr(0)}/month for 6 months,
                then {slr(solo.thenPrice)}/month locked in for life. No card
                for the free period, onboarding demo included.
              </p>

              <div className="mt-6">
                <div className="flex items-end justify-between text-sm font-semibold text-brand-100/85">
                  <span className="inline-flex items-center gap-2">
                    <IconSeat className="h-4.5 w-4.5 text-flare-400" />
                    Seats claimed
                  </span>
                  <span className="tnum font-display text-base font-extrabold text-white">
                    {status.seatsTaken} / {status.seatsTotal}
                  </span>
                </div>
                <div
                  className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={status.seatsTotal}
                  aria-valuenow={status.seatsTaken}
                  aria-label="Free Solo seats claimed"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-flare-400 to-flare-600 transition-all duration-700"
                    style={{ width: `${Math.max(pct, status.seatsTaken > 0 ? 6 : 0)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] font-semibold text-brand-100/60">
                  <span>{status.seatsRemaining} remaining</span>
                  <span>updates live on registration</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => select("solo")}
                disabled={soldOut || !status.active}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-flare-500 px-6 py-3.5 font-display text-base font-extrabold text-night-950 transition hover:bg-flare-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {soldOut ? "All seats claimed" : "Register for a free seat"}
                {!soldOut && (
                  <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </div>

            {/* 50% card */}
            <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-flow-soft">
                Offer 02 · Unlimited registrations
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                50% off Growth, Scale & Ultimate for 6 months
              </h3>
              <ul className="mt-5 space-y-3">
                {PACKAGES.slice(1).map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-night-800/60 px-4 py-3"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-white">{p.name}</p>
                      <p className="tnum text-xs text-brand-100/70">
                        <s>{slr(p.listPrice)}</s> → {slr(p.offerPrice)}/mo for 6 months
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => select(p.slug)}
                      className="shrink-0 rounded-lg border border-flow/50 px-3.5 py-2 text-xs font-bold text-flow transition hover:bg-flow hover:text-night-950"
                    >
                      Choose {p.name}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-brand-100/70">
                <IconGift className="mt-0.5 h-4 w-4 shrink-0 text-flare-400" />
                Ultimate on annual billing adds a free professional website
                build valued at SLR 100K.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              {
                icon: <IconClock className="h-5 w-5" />,
                t: "This month only",
                d: `Registrations close 00:00 on the 1st of next month. The countdown above is the source of truth.`,
              },
              {
                icon: <IconSeat className="h-5 w-5" />,
                t: "Seats verified on submit",
                d: "Solo seats are checked and locked in the database at registration — one seat per business email.",
              },
              {
                icon: <IconShield className="h-5 w-5" />,
                t: "No surprise billing",
                d: "Your confirmation code locks the offer price. We email you before any paid month begins.",
              },
            ].map((f) => (
              <div key={f.t} className="flex gap-3.5">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flow/15 text-flow">
                  {f.icon}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-white">{f.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-brand-100/70">{f.d}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-semibold text-brand-100/60">
            <IconCheck className="h-4 w-4 text-flow" />
            {status.totalRegistrations} businesses have registered for the{" "}
            {status.monthLabel} window so far.
          </p>
        </div>
      </div>
    </section>
  );
}
