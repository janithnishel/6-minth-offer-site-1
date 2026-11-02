import { Logo } from "./logo";
import { IconMail, IconPhone, IconPin } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-night-700 dark:bg-night-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size="sm" />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-soft dark:text-stone-400">
            The all-in-one business platform for Sri Lankan service businesses —
            CRM, campaigns, bookings, automation and AI in one flow.
          </p>
        </div>
        <nav aria-label="Product">
          <p className="font-display text-sm font-extrabold uppercase tracking-wider">Product</p>
          <ul className="mt-4 space-y-2.5 text-[13px] font-semibold text-ink-soft dark:text-stone-400">
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#features">Features & use cases</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#industries">Industries we serve</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#pricing">Packages & pricing</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#showcase">Feature slideshow</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#faq">FAQ</a></li>
          </ul>
        </nav>
        <nav aria-label="Offer">
          <p className="font-display text-sm font-extrabold uppercase tracking-wider">Launch offer</p>
          <ul className="mt-4 space-y-2.5 text-[13px] font-semibold text-ink-soft dark:text-stone-400">
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#offer">Countdown & seats</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#register">Register now</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#pricing">Solo Starter free seat</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-flow" href="#pricing">50% off packages</a></li>
          </ul>
        </nav>
        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-wider">IntuVision®</p>
          <ul className="mt-4 space-y-2.5 text-[13px] font-semibold text-ink-soft dark:text-stone-400">
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 text-brand-600 dark:text-flow" />
              <a href="mailto:hello@clientflow.lk" className="hover:text-brand-600 dark:hover:text-flow">hello@clientflow.lk</a>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 text-brand-600 dark:text-flow" />
              <a href="tel:+94117904400" className="hover:text-brand-600 dark:hover:text-flow">+94 11 790 4400</a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 text-brand-600 dark:text-flow" />
              Level 4, Liberty Arcade, Colombo 03, Sri Lanka
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 py-5 dark:border-night-700">
        <p className="mx-auto max-w-7xl px-4 text-center text-[12px] font-medium text-ink-soft sm:px-6 dark:text-stone-500">
          © {new Date().getFullYear()} Client Flow Business Solution by
          IntuVision®. All rights reserved. Launch offer terms apply to
          registrations made within the published monthly window.
        </p>
      </div>
    </footer>
  );
}
