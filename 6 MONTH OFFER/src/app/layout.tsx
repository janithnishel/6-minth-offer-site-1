import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Manrope } from "next/font/google";
import "./globals.css";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Client Flow Business Solution by IntuVision® — Launch Offer: Solo free for 6 months, 50% off everything else",
  description:
    "Register this month for the Client Flow Business Solution launch offer: Solo Starter free for 6 months (first 10 businesses only) and 50% off Growth, Scale and Ultimate for 6 months. CRM, campaigns, bookings, WhatsApp follow-ups and AI in one flow.",
  openGraph: {
    title: "Client Flow Business Solution by IntuVision® — Launch Offer",
    description:
      "Solo Starter free for 6 months (10 seats only) · 50% off Growth, Scale & Ultimate for 6 months. This month only.",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("cf-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} bg-paper font-body text-ink antialiased dark:bg-night-950 dark:text-stone-100`}>
        {children}
      </body>
    </html>
  );
}
