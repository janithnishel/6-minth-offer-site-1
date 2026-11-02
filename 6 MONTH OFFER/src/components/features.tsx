import type { ReactNode } from "react";
import {
  IconAi,
  IconAutomation,
  IconBooking,
  IconChatPhone,
  IconCrm,
  IconFunnel,
  IconMegaphone,
  IconPlanner,
  IconReport,
} from "./icons";

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
  usecase: string;
}

const FEATURES: Feature[] = [
  {
    icon: <IconCrm className="h-6 w-6" />,
    title: "Built-in CRM & contact management",
    desc: "Every client, lead, note and deal stage in one pipeline with full conversation history.",
    usecase: "A freelance designer sees every brief, quote and follow-up for each client in one place.",
  },
  {
    icon: <IconPlanner className="h-6 w-6" />,
    title: "Social media & campaign planner",
    desc: "Plan, schedule and run posts and campaigns across multiple platforms from one place.",
    usecase: "A salon queues a month of Instagram and Facebook content in a single sitting.",
  },
  {
    icon: <IconAutomation className="h-6 w-6" />,
    title: "Automation workflows & triggers",
    desc: "Follow-ups, reminders and internal tasks fire the moment a lead changes stage.",
    usecase: "A gym sends a joining offer automatically one hour after a trial enquiry.",
  },
  {
    icon: <IconMegaphone className="h-6 w-6" />,
    title: "Email & SMS campaigns",
    desc: "Branded templates, one-click broadcasts and delivery tracking built in.",
    usecase: "A café announces its weekend menu to the full client list in minutes.",
  },
  {
    icon: <IconChatPhone className="h-6 w-6" />,
    title: "WhatsApp follow-up workflows",
    desc: "Structured WhatsApp follow-ups that stay attached to the deal, not lost in chats.",
    usecase: "A tour operator confirms bookings and reviews without losing the thread.",
  },
  {
    icon: <IconAi className="h-6 w-6" />,
    title: "AI assistant & chat widget",
    desc: "A 24/7 assistant on your site and socials that captures and qualifies leads for you.",
    usecase: "A clinic captures appointment requests at midnight while the team sleeps.",
  },
  {
    icon: <IconBooking className="h-6 w-6" />,
    title: "Booking calendar & lead forms",
    desc: "Public booking pages and smart capture forms that feed the pipeline directly.",
    usecase: "A consultant ends the email ping-pong with self-serve appointment slots.",
  },
  {
    icon: <IconFunnel className="h-6 w-6" />,
    title: "Websites, funnels & free hosting",
    desc: "Launch landing pages and funnels on included hosting — no extra bills.",
    usecase: "A new bakery goes live with a booking-ready site on day one.",
  },
  {
    icon: <IconReport className="h-6 w-6" />,
    title: "Reporting & performance reviews",
    desc: "Dashboards for pipeline, campaigns and team activity, plus a monthly performance report.",
    usecase: "An agency owner sees which channel actually pays the bills each month.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-28 px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-flow">
            Platform features & use cases
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Nine working surfaces. One calm flow of clients.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft dark:text-stone-300">
            Every module below ships inside the packages on this page — the
            only question is how much automation and how many seats your team
            needs today.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-300 dark:border-night-700 dark:bg-night-800 dark:hover:border-flow/50"
            >
              <span className="absolute right-5 top-5 font-display text-sm font-extrabold text-stone-200 dark:text-night-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-500 group-hover:text-night-950 dark:bg-night-700 dark:text-flow dark:group-hover:bg-flow dark:group-hover:text-night-950">
                {f.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-stone-300">
                {f.desc}
              </p>
              <p className="mt-4 border-l-2 border-brand-400 pl-3 text-[13px] italic leading-relaxed text-ink-soft/90 dark:text-stone-400">
                Use case — {f.usecase}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
