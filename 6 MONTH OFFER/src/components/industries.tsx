"use client";

import { useOffer } from "./offer-context";
import type { PackageSlug } from "@/lib/packages";
import { IconArrow } from "./icons";

interface Industry {
  name: string;
  img: string;
  alt: string;
  usecase: string;
  features: string[];
  pkg: PackageSlug;
  pkgLabel: string;
}

const INDUSTRIES: Industry[] = [
  {
    name: "Retail & Boutiques",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    alt: "Rails of clothing inside a bright fashion boutique",
    usecase:
      "Repeat buyers are the real revenue. Every customer is tagged by purchase history, and the moment new stock lands an SMS/WhatsApp \"new drop\" alert goes out automatically — followed by a review request after each sale.",
    features: ["CRM & contact tags", "Email & SMS campaigns", "WhatsApp follow-ups", "Review automation"],
    pkg: "growth",
    pkgLabel: "Best fit: Growth",
  },
  {
    name: "Restaurants & Cafés",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Warmly lit restaurant interior with set tables",
    usecase:
      "Weekend specials, table bookings and event promos live in one calendar. Broadcast the new menu to regulars on Thursday night, then let the booking calendar absorb the Friday rush without a single phone tag.",
    features: ["Booking calendar", "Social & campaign planner", "SMS broadcasts", "Lead capture forms"],
    pkg: "growth",
    pkgLabel: "Best fit: Growth",
  },
  {
    name: "Salons & Spas",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
    alt: "Stylist chair and mirror station in a modern salon",
    usecase:
      "No-shows kill margins. A WhatsApp reminder fires 24 hours before every appointment, and a \"we miss you\" workflow re-activates any client who hasn't rebooked in six weeks — automatically.",
    features: ["Appointment booking", "WhatsApp reminders", "Automation triggers", "Review requests"],
    pkg: "solo",
    pkgLabel: "Best fit: Solo / Growth",
  },
  {
    name: "Gyms & Fitness",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    alt: "Dumbbell rack in a modern training gym",
    usecase:
      "Trial enquiries become members through a 3-step automation: instant welcome, day-3 check-in, day-7 offer expiry — without staff chasing anyone. The dashboard shows which campaign filled the class.",
    features: ["Lead capture forms", "Automation workflows", "SMS campaigns", "Reporting dashboard"],
    pkg: "scale",
    pkgLabel: "Best fit: Scale",
  },
  {
    name: "Tuition & Education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    alt: "Students writing in an exercise book during class",
    usecase:
      "Batch announcements, fee reminders and exam schedules reach parents and students on time, every time. Each batch runs as its own pipeline stage so enrolment gaps are visible weeks ahead.",
    features: ["CRM pipelines", "SMS reminders", "Booking calendar", "AI chat assistant"],
    pkg: "growth",
    pkgLabel: "Best fit: Growth",
  },
  {
    name: "Clinics & Healthcare",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    alt: "Doctor reviewing patient information on a tablet",
    usecase:
      "Channelling slots fill themselves: the AI chat widget captures requests at midnight, confirmations go out on WhatsApp, and any cancelled slot is re-offered to the waitlist automatically.",
    features: ["AI chat lead capture", "Appointment booking", "WhatsApp confirmations", "Waitlist automations"],
    pkg: "scale",
    pkgLabel: "Best fit: Scale / Ultimate",
  },
  {
    name: "Travel & Tourism",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    alt: "Traveller planning a route with map and compass",
    usecase:
      "Every enquiry gets a structured follow-up: quote on day 0, itinerary nudge on day 2, review request one day after checkout — so high-season leads never cool off in an inbox.",
    features: ["Advanced pipelines", "WhatsApp follow-ups", "Review automation", "Monthly performance report"],
    pkg: "scale",
    pkgLabel: "Best fit: Scale",
  },
  {
    name: "Real Estate & Vehicles",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    alt: "House keys resting on signed property documents",
    usecase:
      "Viewing schedules, buyer-stage pipelines and instant AI chat qualification separate serious buyers from browsers before your phone even rings — and every viewing no-show triggers a re-book flow.",
    features: ["Sales pipelines", "AI chat qualification", "Booking calendar", "Team pipeline management"],
    pkg: "ultimate",
    pkgLabel: "Best fit: Ultimate",
  },
];

export function Industries() {
  const { select } = useOffer();

  return (
    <section id="industries" className="scroll-mt-28 px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-flow">
              Industries & use cases
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Your industry, already mapped to a use case
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft dark:text-stone-300">
              Pick your field below — each card shows exactly which Client Flow
              Business Solution features do the heavy lifting for businesses
              like yours, and the package we&apos;d start you on.
            </p>
          </div>
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-400 bg-brand-100 px-5 py-3 font-display text-sm font-extrabold text-brand-800 transition hover:bg-brand-200 dark:border-night-700 dark:bg-night-800 dark:text-flow"
          >
            Claim your industry offer
            <IconArrow className="h-4.5 w-4.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift dark:border-night-700 dark:bg-night-800"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={ind.img}
                  alt={ind.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/10 to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 font-display text-lg font-extrabold text-white">
                  {ind.name}
                </h3>
                <span className="absolute right-3 top-3 rounded-full bg-night-950/70 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-brand-200 backdrop-blur-sm">
                  {ind.pkgLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[13px] leading-relaxed text-ink-soft dark:text-stone-300">
                  {ind.usecase}
                </p>
                <p className="mt-4 text-[11px] font-extrabold uppercase tracking-wider text-brand-700 dark:text-flow">
                  Features doing the work
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {ind.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 dark:border-night-700 dark:bg-night-700 dark:text-brand-100"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => select(ind.pkg)}
                  className="mt-auto pt-5 text-left font-display text-[13px] font-extrabold text-brand-700 underline-offset-4 transition hover:text-brand-800 hover:underline dark:text-flow dark:hover:text-flow-soft"
                >
                  See the {ind.pkgLabel.replace("Best fit: ", "")} package →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
