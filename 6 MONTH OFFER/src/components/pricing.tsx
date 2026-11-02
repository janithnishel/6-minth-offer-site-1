"use client";

import { useOffer } from "./offer-context";
import { PACKAGES, slr, type PackageInfo } from "@/lib/packages";
import { IconCheck, IconGift, IconSeat } from "./icons";

function PriceBlock({ p }: { p: PackageInfo }) {
  if (p.slug === "solo") {
    return (
      <div className="mt-6">
        <p className="tnum text-xs font-semibold text-ink-soft line-through dark:text-stone-400">
          {slr(p.listPrice)}/mo standard
        </p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-5xl font-extrabold tracking-tight text-brand-600 dark:text-flow">
            {slr(0)}
          </span>
          <span className="text-sm font-semibold text-ink-soft dark:text-stone-400">/mo</span>
        </p>
        <p className="mt-1.5 text-[13px] font-bold uppercase tracking-wider text-flare-600 dark:text-flare-400">
          {p.offerLabel}
        </p>
        <p className="mt-1 text-[13px] text-ink-soft dark:text-stone-400">
          then {slr(p.thenPrice)}/mo — locked in for life
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6">
      <p className="tnum text-xs font-semibold text-ink-soft line-through dark:text-stone-400">
        {slr(p.listPrice)}/mo standard
      </p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-5xl font-extrabold tracking-tight">
          {slr(p.offerPrice)}
        </span>
        <span className="text-sm font-semibold text-ink-soft dark:text-stone-400">/mo</span>
      </p>
      <p className="mt-1.5 text-[13px] font-bold uppercase tracking-wider text-flare-600 dark:text-flare-400">
        {p.offerLabel}
      </p>
      <p className="mt-1 text-[13px] text-ink-soft dark:text-stone-400">
        then {slr(p.thenPrice)}/mo from month 7
      </p>
    </div>
  );
}

function Card({ p }: { p: PackageInfo }) {
  const { status, select, selected } = useOffer();
  const isSolo = p.slug === "solo";
  const dark = p.badgeTone === "popular";
  const soldOut = isSolo && status.seatsRemaining <= 0;
  const isSelected = selected === p.slug;

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-6 transition hover:-translate-y-1 ${
        dark
          ? "border-night-700 bg-night-900 text-white shadow-lift"
          : isSolo
            ? "border-flare-400/70 bg-white shadow-lift ring-1 ring-flare-400/40 dark:bg-night-800"
            : "border-stone-200 bg-white shadow-card dark:border-night-700 dark:bg-night-800"
      } ${isSelected ? "outline outline-2 outline-brand-500" : ""}`}
    >
      {p.badge && (
        <span
          className={`absolute -top-3.5 left-6 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider ${
            p.badgeTone === "offer"
              ? "bg-flare-500 text-night-950"
              : "bg-flow text-night-950"
          }`}
        >
          {isSolo && !soldOut ? `${p.badge} · ${status.seatsRemaining} left` : p.badge}
        </span>
      )}

      <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{p.name}</h3>
      <p
        className={`mt-2 min-h-[60px] text-[13px] leading-relaxed ${
          dark ? "text-brand-100/80" : "text-ink-soft dark:text-stone-400"
        }`}
      >
        {p.audience}
      </p>

      <PriceBlock p={p} />

      {isSolo && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-night-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-flare-400 to-flare-600 transition-all duration-700"
              style={{ width: `${(status.seatsTaken / status.seatsTotal) * 100}%` }}
            />
          </div>
          <p className="tnum mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft dark:text-stone-400">
            <IconSeat className="h-4 w-4 text-flare-500" />
            {status.seatsTaken}/{status.seatsTotal} seats taken · {status.seatsRemaining} remaining
          </p>
        </div>
      )}

      <ul className="mt-6 space-y-2.5 border-t border-stone-100 pt-5 dark:border-night-700">
        {p.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[13px] leading-snug">
            <IconCheck
              className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-flow" : "text-brand-600 dark:text-flow"}`}
            />
            <span className={dark ? "text-brand-100/90" : "text-ink/85 dark:text-stone-300"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {p.bonus && (
        <p className="mt-4 flex gap-2.5 rounded-xl bg-brand-50 p-3.5 text-[12.5px] leading-relaxed text-brand-800 dark:bg-night-700 dark:text-brand-100">
          <IconGift className="mt-0.5 h-4.5 w-4.5 shrink-0 text-flare-500" />
          {p.bonus}
        </p>
      )}

      <button
        type="button"
        onClick={() => select(p.slug)}
        disabled={soldOut || !status.active}
        className={`mt-6 w-full rounded-xl px-5 py-3.5 font-display text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-45 ${
          dark
            ? "bg-flow text-night-950 hover:bg-flow-soft"
            : isSolo
              ? "bg-flare-500 text-night-950 hover:bg-flare-400"
              : "bg-ink text-white hover:bg-brand-600 dark:bg-flow dark:text-night-950 dark:hover:bg-flow-soft"
        }`}
      >
        {soldOut ? "Solo seats claimed" : p.cta}
      </button>
      <p
        className={`mt-3 text-center text-[12px] leading-snug ${
          dark ? "text-brand-100/70" : "text-ink-soft dark:text-stone-400"
        }`}
      >
        {p.footnote}
      </p>
    </article>
  );
}

export function Pricing() {
  const { status } = useOffer();
  return (
    <section id="pricing" className="scroll-mt-28 px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-flow">
            Packages & launch pricing
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Four packages. One very good month to join.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft dark:text-stone-300">
            Prices below are the {status.monthLabel} launch rates for your
            first 6 months. After that, standard monthly pricing applies —
            except Solo, which locks in at {slr(999)}/mo for life.
          </p>
        </div>

        <div className="mt-14 grid gap-6 pt-2 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] font-medium text-ink-soft dark:text-stone-400">
          All prices in Sri Lankan Rupees (SLR), excluding applicable taxes.
          Onboarding demo included with every package.
        </p>
      </div>
    </section>
  );
}
