export type PackageSlug = "solo" | "growth" | "scale" | "ultimate";

export interface PackageInfo {
  slug: PackageSlug;
  name: string;
  audience: string;
  /** Standard monthly list price in SLR */
  listPrice: number;
  /** Price per month during the 6-month launch offer (0 = free) */
  offerPrice: number;
  /** Price per month after the offer period ends */
  thenPrice: number;
  offerLabel: string;
  badge?: string;
  badgeTone?: "offer" | "popular";
  seats?: number;
  features: string[];
  cta: string;
  footnote: string;
  bonus?: string;
}

export const SOLO_SEATS = 10;
export const OFFER_MONTHS = 6;

export const PACKAGES: PackageInfo[] = [
  {
    slug: "solo",
    name: "Solo Starter",
    audience:
      "For solo entrepreneurs, freelancers and micro-businesses getting started with client management, bookings and social media planning.",
    listPrice: 4900,
    offerPrice: 0,
    thenPrice: 999,
    offerLabel: "FREE for 6 months",
    badge: "Limited — 10 seats",
    badgeTone: "offer",
    seats: SOLO_SEATS,
    features: [
      "Social media & campaign planner — manage posts and campaigns across multiple platforms from one place",
      "Built-in CRM & contact management",
      "Single user included",
      "Free web hosting included",
      "Email templates",
      "Appointment booking calendar",
      "One onboarding demo included",
    ],
    cta: "Claim my free seat",
    footnote: "SLR 0/month for 6 months, then SLR 999/month locked in for life. Only 10 seats.",
  },
  {
    slug: "growth",
    name: "Growth",
    audience:
      "For small businesses getting started with CRM, leads and follow-ups.",
    listPrice: 9900,
    offerPrice: 4950,
    thenPrice: 9900,
    offerLabel: "50% off for 6 months",
    features: [
      "Social media & campaign planner across multiple platforms",
      "Built-in CRM & contact management",
      "Up to 10 users included",
      "Lead capture forms",
      "Website & funnel templates",
      "Free web hosting included",
      "Email & SMS templates",
      "Appointment booking calendar",
      "Basic automation workflows",
      "Basic reporting dashboard",
      "Email, online & onboarding phone support",
      "Onboarding demo included",
    ],
    cta: "Claim 50% off",
    footnote: "SLR 4,950/month for 6 months, then SLR 9,900/month.",
  },
  {
    slug: "scale",
    name: "Scale",
    audience:
      "For growing businesses that need automation, campaigns and stronger team visibility.",
    listPrice: 19900,
    offerPrice: 9950,
    thenPrice: 19900,
    offerLabel: "50% off for 6 months",
    badge: "Most popular",
    badgeTone: "popular",
    features: [
      "Everything in Growth, plus…",
      "Up to 100 users included",
      "Advanced sales pipelines",
      "Workflows & triggers",
      "Email and SMS campaigns",
      "WhatsApp follow-up workflow support",
      "Social media planner",
      "Review request automation",
      "AI assistant / chat widget setup",
      "Monthly performance report",
      "Priority online support",
      "Onboarding demo included",
    ],
    cta: "Claim 50% off",
    footnote: "SLR 9,950/month for 6 months, then SLR 19,900/month.",
  },
  {
    slug: "ultimate",
    name: "Ultimate",
    audience:
      "For larger teams that want full CRM, automation, marketing and website support.",
    listPrice: 44900,
    offerPrice: 22450,
    thenPrice: 44900,
    offerLabel: "50% off for 6 months",
    features: [
      "Everything in Scale, plus…",
      "Unlimited users",
      "Full CRM setup support",
      "Advanced automation workflows",
      "Advanced AI chatbot support",
      "Website and funnel integration",
      "Advanced reporting dashboard",
      "Team pipeline management",
      "Campaign planning support",
      "Email, online & onboarding phone support",
    ],
    cta: "Claim 50% off",
    footnote: "SLR 22,450/month for 6 months, then SLR 44,900/month.",
    bonus:
      "Annual plan bonus: free professional website build valued at SLR 100K when you choose annual billing.",
  },
];

export const getPackage = (slug: string): PackageInfo | undefined =>
  PACKAGES.find((p) => p.slug === slug);

export const slr = (n: number): string =>
  "SLR " + n.toLocaleString("en-US");
