"use client";

import { useEffect, useMemo, useState } from "react";
import { IconClock } from "./icons";

function parts(left: number) {
  const s = Math.max(0, Math.floor(left / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Large countdown panel used in the offer section. */
export function Countdown({ deadlineIso }: { deadlineIso: string }) {
  const deadline = useMemo(() => new Date(deadlineIso).getTime(), [deadlineIso]);
  const [left, setLeft] = useState(() => deadline - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(deadline - Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const { days, hours, mins, secs } = parts(left);
  const expired = left <= 0;

  const units = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(mins) },
    { label: "Seconds", value: pad(secs) },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={expired ? "Offer closed" : "Time remaining in this month's offer"}
      className="flex items-stretch justify-center gap-2 sm:gap-3"
    >
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex w-[72px] flex-col items-center rounded-xl border border-white/12 bg-white/[0.06] px-2 py-3 backdrop-blur-sm sm:w-[86px] sm:py-4">
            <span
              key={u.value}
              className="tnum animate-tick font-display text-3xl font-extrabold text-white sm:text-4xl"
            >
              {u.value}
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200/80">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-2xl font-bold text-flare-400/70">:</span>
          )}
        </div>
      ))}
      {expired && (
        <p className="self-center pl-3 text-sm font-semibold text-flare-300">
          This month&apos;s window has closed.
        </p>
      )}
    </div>
  );
}

/** Compact inline countdown for chips / header bar. */
export function CountdownInline({ deadlineIso }: { deadlineIso: string }) {
  const deadline = useMemo(() => new Date(deadlineIso).getTime(), [deadlineIso]);
  const [left, setLeft] = useState(() => deadline - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(deadline - Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const { days, hours, mins, secs } = parts(left);
  if (left <= 0)
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-flare-500">
        <IconClock className="h-4 w-4" /> Offer window closed
      </span>
    );

  return (
    <span className="tnum inline-flex items-center gap-1.5 font-semibold">
      <IconClock className="h-4 w-4 text-flare-500" />
      Ends in{" "}
      <strong className="font-display font-extrabold">
        {days}d {pad(hours)}h {pad(mins)}m {pad(secs)}s
      </strong>
    </span>
  );
}
