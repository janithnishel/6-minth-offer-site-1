"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { CountdownInline } from "./countdown";
import { useOffer } from "./offer-context";
import { IconClose, IconMenu, IconMoon, IconSeat, IconSun } from "./icons";

const NAV = [
  { href: "#offer", label: "Launch Offer" },
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "Showcase" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const { status } = useOffer();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cf-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <header className="sticky top-0 z-50">
      {/* urgency bar */}
      <div className="bg-ink text-brand-100 dark:bg-night-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[13px] sm:justify-between">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-flare-400" />
            {status.monthLabel} Launch Offer — Solo Starter free for 6 months ·
            only {status.seatsTotal} seats
          </span>
          <span className="hidden text-brand-200 sm:inline">
            <CountdownInline deadlineIso={status.deadlineIso} />
          </span>
        </div>
      </div>

      <div
        className={`border-b transition-all ${
          scrolled
            ? "border-brand-200/70 bg-paper/90 backdrop-blur-xl dark:border-night-700 dark:bg-night-900/85"
            : "border-transparent bg-paper/70 backdrop-blur-sm dark:bg-night-950/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" aria-label="Client Flow Business Solution home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-semibold text-ink-soft transition-colors hover:text-brand-700 dark:text-stone-300 dark:hover:text-flow"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-9 w-9 place-items-center rounded-lg border border-brand-200 bg-white text-ink-soft transition hover:border-brand-400 hover:text-brand-700 dark:border-night-700 dark:bg-night-800 dark:text-stone-300 dark:hover:text-flow"
            >
              {dark ? <IconSun className="h-4.5 w-4.5" /> : <IconMoon className="h-4.5 w-4.5" />}
            </button>
            <a
              href="#register"
              className="hidden rounded-lg bg-brand-500 px-4 py-2.5 font-display text-sm font-bold text-night-950 shadow-lift transition hover:bg-brand-400 sm:inline-block"
            >
              Register for the offer
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border border-brand-200 bg-white text-ink dark:border-night-700 dark:bg-night-800 dark:text-stone-200 lg:hidden"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            aria-label="Mobile"
            className="border-t border-brand-200 bg-paper px-4 py-4 dark:border-night-700 dark:bg-night-900 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-brand-100 dark:text-stone-200 dark:hover:bg-night-800"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#register"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-brand-500 px-3 py-2.5 text-center font-display text-sm font-bold text-night-950"
                >
                  Register for the offer
                </a>
              </li>
            </ul>
            <p className="mt-3 px-3 text-xs text-ink-soft dark:text-stone-400">
              <IconSeat className="mr-1 inline h-4 w-4 text-flare-500" />
              {status.seatsRemaining} of {status.seatsTotal} free Solo seats left ·{" "}
              <CountdownInline deadlineIso={status.deadlineIso} />
            </p>
          </nav>
        )}
      </div>
    </header>
  );
}
