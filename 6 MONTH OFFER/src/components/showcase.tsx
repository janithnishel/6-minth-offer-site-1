"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrow, IconChevronLeft, IconChevronRight } from "./icons";

interface Slide {
  title: string;
  desc: string;
  usecase: string;
  img: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    title: "Built-in CRM & contact management",
    desc: "Every client, lead, note and deal stage in one pipeline with full conversation history.",
    usecase: "A freelance designer sees every brief, quote and follow-up for each client in one place.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
    alt: "Team reviewing pipeline charts together on a screen",
  },
  {
    title: "Social media & campaign planner",
    desc: "Plan, schedule and run posts and campaigns across multiple platforms from one place.",
    usecase: "A café queues a month of content and blasts the weekend menu to regulars in minutes.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    alt: "Restaurant floor set for the evening service",
  },
  {
    title: "Automation workflows & triggers",
    desc: "Follow-ups, reminders and internal tasks fire the moment a lead changes stage.",
    usecase: "A gym converts trials with day-0 welcome, day-3 check-in and day-7 offer expiry — hands-free.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop",
    alt: "Dumbbell rack in a modern training gym",
  },
  {
    title: "Email & SMS campaigns",
    desc: "Branded templates, one-click broadcasts and delivery tracking built in.",
    usecase: "A tuition class sends fee reminders and batch announcements that actually arrive on time.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
    alt: "Students writing notes during a class",
  },
  {
    title: "WhatsApp follow-up workflows",
    desc: "Structured WhatsApp follow-ups that stay attached to the deal, not lost in chats.",
    usecase: "A tour studio nudges quotes on day 2 and collects reviews after checkout — every traveller, every time.",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1400&auto=format&fit=crop",
    alt: "Traveller planning a route with map and compass",
  },
  {
    title: "AI assistant & chat widget",
    desc: "A 24/7 assistant on your site and socials that captures and qualifies leads for you.",
    usecase: "A clinic captures channelling requests at midnight and hands the team a qualified booking at 9am.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
    alt: "Doctor reviewing patient information on a tablet",
  },
  {
    title: "Booking calendar & lead capture forms",
    desc: "Public booking pages and smart capture forms that feed the pipeline directly.",
    usecase: "A salon ends double-bookings and no-shows with reminders and self-serve slots.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1400&auto=format&fit=crop",
    alt: "Stylist station in a modern salon",
  },
  {
    title: "Websites, funnels & free hosting",
    desc: "Launch landing pages and funnels on included hosting — no extra bills.",
    usecase: "An agent goes live with a listing funnel and viewing bookings on day one.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
    alt: "House keys on signed property documents",
  },
  {
    title: "Reporting & monthly performance reviews",
    desc: "Dashboards for pipeline, campaigns and team activity, plus a monthly performance report.",
    usecase: "An owner sees which channel pays the bills before the Monday meeting starts.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    alt: "Laptop showing analytics dashboards and growth charts",
  },
  {
    title: "Review request automation",
    desc: "One-click review requests after every sale or visit, routed to Google and Facebook.",
    usecase: "A boutique turns happy buyers into a five-star storefront while it sleeps.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop",
    alt: "Rails of clothing inside a bright boutique",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function Showcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((next: number) => {
    setIdx(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % SLIDES.length), 5200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div id="showcase" className="scroll-mt-32">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-flow">
              The platform in motion
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Ten features, one flowing story
            </h2>
          </div>
          <p className="tnum font-display text-sm font-extrabold text-ink-soft dark:text-stone-400">
            {pad(idx + 1)} <span className="text-brand-400">/</span> {pad(SLIDES.length)}
          </p>
        </div>

        <div
          className="relative mt-8 overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-lift dark:border-night-700 dark:bg-night-800"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            if (touchX.current !== null) {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1));
            }
            touchX.current = null;
            setPaused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(idx + 1);
            if (e.key === "ArrowLeft") go(idx - 1);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client Flow Business Solution feature showcase"
        >
          <div
            className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.title}
                className="grid w-full shrink-0 md:grid-cols-[1.05fr_0.95fr]"
                aria-hidden={i !== idx}
              >
                <div className="relative h-60 overflow-hidden sm:h-80 md:h-[440px]">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`h-full w-full object-cover ${i === idx ? "animate-kenburns" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-night-950/55 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-night-950/70 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-200 backdrop-blur-sm">
                    Feature {pad(i + 1)} of {pad(SLIDES.length)}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                  <span className="font-display text-5xl font-extrabold text-brand-200 dark:text-night-700">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-[28px] sm:leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-ink-soft dark:text-stone-300">
                    {s.desc}
                  </p>
                  <p className="mt-5 border-l-2 border-brand-400 pl-4 text-[13.5px] italic leading-relaxed text-ink-soft/90 dark:text-stone-400">
                    Use case — {s.usecase}
                  </p>
                  <a
                    href="#register"
                    tabIndex={i === idx ? 0 : -1}
                    className="group mt-7 inline-flex items-center gap-2 font-display text-sm font-extrabold text-brand-700 transition hover:text-brand-800 dark:text-flow dark:hover:text-flow-soft"
                  >
                    Try it in your workspace
                    <IconArrow className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            type="button"
            onClick={() => go(idx - 1)}
            aria-label="Previous feature"
            className="absolute left-4 top-[130px] grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-night-950/55 text-white backdrop-blur-sm transition hover:bg-night-950/80 sm:top-[150px] md:top-[198px]"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            aria-label="Next feature"
            className="absolute right-4 top-[130px] grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-night-950/55 text-white backdrop-blur-sm transition hover:bg-night-950/80 sm:top-[150px] md:top-[198px]"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* dots */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to feature ${i + 1}: ${s.title}`}
              aria-current={i === idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx
                  ? "w-12 bg-brand-500"
                  : "w-5 bg-brand-200 hover:bg-brand-400 dark:bg-night-700 dark:hover:bg-brand-600"
              }`}
            />
          ))}
        </div>
    </div>
  );
}
