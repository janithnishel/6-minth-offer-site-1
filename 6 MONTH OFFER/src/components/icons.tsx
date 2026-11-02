import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

/* Contact / CRM: card with orbiting relationship nodes */
export const IconCrm = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5" width="13" height="10" rx="2" />
    <circle cx="7" cy="9" r="1.6" />
    <path d="M4.6 12.6c.5-1.4 1.5-2.1 2.4-2.1s1.9.7 2.4 2.1" />
    <path d="M12 8.5h2M12 11h2" />
    <circle cx="18.5" cy="16.5" r="3" />
    <path d="M18.5 13.5v-1.2M21 18.6l.9.9M16 18.6l-.9.9" />
  </svg>
);

/* Campaign planner: calendar with broadcast waves */
export const IconPlanner = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="14" height="13" rx="2" />
    <path d="M3 9h14M7 3v4M13 3v4" />
    <path d="M6.5 12.5h3M6.5 15h5" />
    <path d="M20 8.5c1.2 1.9 1.2 5.1 0 7M17.8 10.3c.7 1 .7 2.4 0 3.4" />
  </svg>
);

/* Automation: trigger node flowing into two actions */
export const IconAutomation = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="2.6" />
    <path d="M6 8.6v3.4c0 1.1.9 2 2 2h3" />
    <circle cx="17.5" cy="14" r="2.6" />
    <path d="M6 12v4.4c0 1.1.9 2 2 2h2.5" />
    <circle cx="14" cy="18.5" r="1.8" />
    <path d="M13.2 4.2 6 6l7.2 1.8" opacity=".0" />
    <path d="M9.5 6h5.2m0 0-1.8-1.8M14.7 6l-1.8 1.8" />
  </svg>
);

/* Campaigns: megaphone with signal */
export const IconMegaphone = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l6.5 4V4.5L8 8.5H5.5A1.5 1.5 0 0 0 4 10Z" />
    <path d="M17.5 9c1.3 1.7 1.3 4.3 0 6M20 6.8c2.3 3 2.3 7.4 0 10.4" />
    <path d="M8 15.5V19a1.6 1.6 0 0 0 3.2 0v-1.6" />
  </svg>
);

/* AI assistant: chat bubble with spark core */
export const IconAi = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c4.7 0 8.5 3.2 8.5 7.2 0 4-3.8 7.2-8.5 7.2-.9 0-1.8-.1-2.6-.3L5 20l.9-3.4c-1.5-1.3-2.4-3-2.4-4.9 0-4 3.8-7.2 8.5-7.2Z" />
    <path d="M12 7.6l1.1 2.4 2.4 1.1-2.4 1.1-1.1 2.4-1.1-2.4-2.4-1.1 2.4-1.1Z" />
  </svg>
);

/* Booking: clock inside calendar */
export const IconBooking = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 2.8v3.4M16 2.8v3.4" />
    <circle cx="12" cy="14.5" r="3.4" />
    <path d="M12 12.8v1.7l1.3 1" />
  </svg>
);

/* Website & funnel */
export const IconFunnel = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2.2" />
    <path d="M3 8h18" />
    <circle cx="5.8" cy="6" r=".6" fill="currentColor" />
    <circle cx="8.2" cy="6" r=".6" fill="currentColor" />
    <path d="M7.5 11h9l-3.2 4v3.4l-2.6-1.4V15Z" />
  </svg>
);

/* Reporting: bars with trend arrow */
export const IconReport = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
    <path d="M9 6.5 13.5 4l2.6 2 4-2.4" opacity=".9" />
    <path d="M20.1 6.2V3.6h-2.6" />
  </svg>
);

/* WhatsApp-style follow-up: phone in bubble */
export const IconChatPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.8c4.6 0 8.3 3.4 8.3 7.6 0 4.2-3.7 7.6-8.3 7.6-.9 0-1.8-.1-2.6-.4l-3.9 1.6 1-3.3c-1.7-1.4-2.8-3.3-2.8-5.5 0-4.2 3.7-7.6 8.3-7.6Z" />
    <path d="M9.4 8.9c.3-.6.9-.5 1.2-.1l.7 1c.2.3.1.7-.1 1l-.5.5c.5 1.1 1.3 1.9 2.4 2.4l.5-.5c.3-.2.7-.3 1-.1l1 .7c.4.3.5.9.1 1.2-.6.5-1.4.7-2.2.4-2.2-.8-3.9-2.5-4.7-4.7-.3-.8-.1-1.6.6-2.1Z" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.2 12.3 2.5 2.5 5.1-5.4" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
    <path d="M12 1.8v1.6M22.2 12h-1.6M12 22.2v-1.6M1.8 12h1.6" opacity=".55" />
  </svg>
);

export const IconSeat = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4.5h10a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
    <path d="M5 10.5h14" />
    <path d="M6.5 15v4.5M17.5 15v4.5M4 19.5h5M15 19.5h5" />
  </svg>
);

export const IconGift = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v7.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V12" />
    <path d="M12 8v13" />
    <path d="M12 8c-1.8 0-4.6-.4-4.6-2.4C7.4 4 8.6 3 9.9 3c1.9 0 2.1 3 2.1 5Zm0 0c1.8 0 4.6-.4 4.6-2.4C16.6 4 15.4 3 14.1 3 12.2 3 12 3 12 8Z" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8 4.5 5.6v6c0 4.6 3.1 8.2 7.5 9.6 4.4-1.4 7.5-5 7.5-9.6v-6Z" />
    <path d="m8.8 11.8 2.3 2.3 4.1-4.4" />
  </svg>
);

export const IconSun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
  </svg>
);

export const IconMoon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    <path d="M17 4.5l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15" />
    <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
  </svg>
);

export const IconChevronLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);

export const IconChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
    <path d="M19 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" opacity=".7" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M7.2 3.5H5A1.8 1.8 0 0 0 3.2 5.5C3.6 13.6 10.4 20.4 18.5 20.8a1.8 1.8 0 0 0 2-1.8v-2.2l-3.6-1.4-1.7 1.9a13.6 13.6 0 0 1-6.5-6.5l1.9-1.7Z" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21.5s7-6.1 7-11.2A7 7 0 0 0 5 10.3c0 5.1 7 11.2 7 11.2Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);
