"use client";

import { useState } from "react";
import { SOLO_SEATS } from "@/lib/packages";
import { slr } from "@/lib/packages";

const FAQS = [
  {
    q: "How does the free Solo Starter offer work?",
    a: `Register through the form on this page during the offer month and, if you are among the first ${SOLO_SEATS} businesses, your Solo Starter workspace runs at ${slr(0)}/month for 6 full months. From month 7 it continues at ${slr(999)}/month — locked in for life. No card is required for the free period.`,
  },
  {
    q: "What happens when the 6 offer months end?",
    a: "Solo Starter moves to the locked-in SLR 999/month launch rate. Growth, Scale and Ultimate return to their standard monthly prices shown on each card. We email you 14 days before any paid month begins — nothing is charged silently.",
  },
  {
    q: "How are the 10 Solo seats tracked?",
    a: "Every confirmed registration is written to our database and the seat counter on this page updates immediately (and re-checks every 30 seconds). When the 10th seat is claimed, the Solo option closes automatically and the other three packages remain open at 50% off.",
  },
  {
    q: "Is the offer really limited to this month?",
    a: "Yes. The registration window opens on the 1st of the current month and closes at midnight on its last day — the countdown on this page is the source of truth. After that, registrations reopen only at standard pricing unless a new window is announced.",
  },
  {
    q: "Can I register more than once, or change package later?",
    a: "One registration per business email — the system rejects duplicates. You can upgrade or downgrade at any time afterwards; unused offer time is credited against the new package.",
  },
  {
    q: "What do I need to get started?",
    a: "Just your name, a business email and a phone number. After registering, our onboarding team calls within 24 hours to set up your workspace, import contacts and run your included onboarding demo.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-28 px-4 pb-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-flow">
            Questions, answered
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Before you claim a seat
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-stone-300">
            Still unsure which package fits? Book a 20-minute demo call and
            we&apos;ll map your client flow together — no pressure, no card.
          </p>
          <a
            href="#register"
            className="mt-6 inline-block rounded-xl border border-brand-300 bg-brand-50 px-5 py-3 font-display text-sm font-extrabold text-brand-700 transition hover:bg-brand-100 dark:border-night-700 dark:bg-night-800 dark:text-flow"
          >
            Register & get a demo slot
          </a>
        </div>

        <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white px-6 shadow-card dark:divide-night-700 dark:border-night-700 dark:bg-night-800">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-bold">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-stone-300 text-sm font-bold transition-transform dark:border-night-700 ${
                      isOpen
                        ? "rotate-45 border-brand-600 text-brand-700 dark:border-flow dark:text-flow"
                        : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-ink-soft dark:text-stone-300">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
