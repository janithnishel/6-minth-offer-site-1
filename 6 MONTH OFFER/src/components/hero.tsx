"use client";

import { useOffer } from "./offer-context";
import { CountdownInline } from "./countdown";
import { Fireworks } from "./fireworks";
import { Showcase } from "./showcase";
import { IconArrow, IconSeat, IconSpark } from "./icons";
import { SOLO_SEATS } from "@/lib/packages";

const STATS = [
  { value: "12+", label: "modules in one platform" },
  { value: "6", label: "months of launch savings" },
  { value: "50%", label: "off Growth, Scale & Ultimate" },
  { value: `${SOLO_SEATS}`, label: "free Solo seats — ever" },
];

export function Hero() {
  const { status, select } = useOffer();
  const seatsGone = status.seatsRemaining <= 0;

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-blueprint mask-fade-b pointer-events-none absolute inset-0" />
      {/* launch-celebration fireworks */}
      <Fireworks className="opacity-90 dark:opacity-100" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #fde047 0%, #f59e0b 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-800 dark:border-night-700 dark:bg-night-800 dark:text-flow">
            <IconSpark className="h-4 w-4 text-flare-500" />
            {status.monthLabel} launch offer · live now
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl xl:text-[64px]">
            Win the client.
            <br />
            Keep the <span className="text-sheen">flow</span> going.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft dark:text-stone-300">
            Client Flow Business Solution by IntuVision® pulls your contacts,
            campaigns, bookings, WhatsApp follow-ups and AI chat into one calm
            pipeline — so no deal ever dies in a DM thread or a notebook again.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => select("solo")}
              disabled={!status.active}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-500 px-6 py-3.5 font-display text-base font-bold text-night-950 shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {seatsGone ? "Solo seats claimed" : "Claim a free Solo seat"}
              <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/70 px-6 py-3.5 font-display text-base font-bold text-ink transition hover:border-brand-400 hover:text-brand-700 dark:border-night-700 dark:bg-night-800/70 dark:text-stone-100 dark:hover:border-flow"
            >
              Compare the 4 packages
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft dark:text-stone-300">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-flare-500" />
              </span>
              <IconSeat className="h-4.5 w-4.5 text-brand-600 dark:text-flow" />
              <strong className="tnum font-display text-ink dark:text-white">
                {status.seatsRemaining}/{status.seatsTotal}
              </strong>
              free Solo seats remaining
            </span>
            <CountdownInline deadlineIso={status.deadlineIso} />
          </div>
        </div>

        <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-5 border-t border-stone-200 pt-7 sm:grid-cols-4 dark:border-night-700">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-extrabold text-brand-600 dark:text-flow">
                {s.value}
              </dd>
              <dd className="mt-1 text-[13px] font-medium leading-snug text-ink-soft dark:text-stone-400">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* the ten-feature story, right inside the hero */}
        <div className="mt-14 animate-rise [animation-delay:150ms]">
          <Showcase />
        </div>
      </div>
    </section>
  );
}
