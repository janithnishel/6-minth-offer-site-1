"use client";

import { useState, type FormEvent } from "react";
import { useOffer } from "./offer-context";
import { PACKAGES, slr, type PackageSlug } from "@/lib/packages";
import {
  IconArrow,
  IconCheck,
  IconMail,
  IconPhone,
  IconSeat,
  IconShield,
} from "./icons";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  teamSize: string;
  message: string;
  consent: boolean;
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  teamSize: "Just me",
  message: "",
  consent: false,
};

const STEPS = [
  {
    t: "Pick your package",
    d: "Solo Starter (free 6 months, first 10 seats) or Growth / Scale / Ultimate at 50% off for 6 months.",
  },
  {
    t: "Register in under a minute",
    d: "We verify the offer window and — for Solo — lock your seat in the database the moment you submit.",
  },
  {
    t: "Onboarding call within 24 hours",
    d: "Your confirmation code holds the launch price. Our team sets up your workspace and demo.",
  },
];

export function RegisterSection() {
  const { status, refresh, selected, select } = useOffer();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ code: string; pkg: PackageSlug } | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const chosen = PACKAGES.find((p) => p.slug === selected) ?? PACKAGES[0];
  const soloSoldOut = status.seatsRemaining <= 0;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/register-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, packageSlug: selected }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccess({ code: data.code, pkg: data.packageSlug });
      setForm(EMPTY);
      await refresh();
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-night-700 dark:bg-night-900 dark:text-stone-100";

  return (
    <section id="register" className="scroll-mt-28 px-4 pb-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left rail */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-flow">
            Offer registration
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Lock your {status.monthLabel} launch price
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft dark:text-stone-300">
            This form is the only way to claim the launch offer. It accepts
            registrations during {status.monthLabel} only — once the countdown
            reaches zero, standard pricing returns.
          </p>

          <ol className="mt-8 space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-sm font-extrabold text-night-950">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-[15px] font-bold">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-stone-400">
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 space-y-3 rounded-2xl border border-brand-200 bg-white p-5 shadow-card dark:border-night-700 dark:bg-night-800">
            <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-soft dark:text-stone-300">
              <IconShield className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600 dark:text-flow" />
              One registration per business email. Solo seats are verified and
              locked server-side at submit time.
            </p>
            <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-soft dark:text-stone-300">
              <IconSeat className="mt-0.5 h-4.5 w-4.5 shrink-0 text-flare-500" />
              Live seat counter: <strong className="tnum">{status.seatsRemaining}</strong> of{" "}
              {status.seatsTotal} free Solo seats still open.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-100 pt-3 text-[13px] font-semibold dark:border-night-700">
              <a href="mailto:hello@clientflow.lk" className="inline-flex items-center gap-2 hover:text-brand-700 dark:hover:text-flow">
                <IconMail className="h-4 w-4" /> hello@clientflow.lk
              </a>
              <a href="tel:+94117904400" className="inline-flex items-center gap-2 hover:text-brand-700 dark:hover:text-flow">
                <IconPhone className="h-4 w-4" /> +94 11 790 4400
              </a>
            </div>
          </div>
        </div>

        {/* form card */}
        <div className="relative rounded-3xl border border-brand-200 bg-white p-6 shadow-lift sm:p-9 dark:border-night-700 dark:bg-night-800">
          {!status.active && !success && (
            <div className="rounded-xl border border-flare-400/50 bg-flare-400/10 p-4 text-sm font-semibold text-flare-600 dark:text-flare-300">
              The {status.monthLabel} registration window has closed. Join the
              next launch window by emailing hello@clientflow.lk.
            </div>
          )}

          {success ? (
            <div className="animate-rise text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-night-700 dark:text-flow">
                <IconCheck className="h-8 w-8" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold">
                You&apos;re registered for the launch offer
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft dark:text-stone-300">
                Keep this confirmation code — it locks your launch pricing and
                your seat:
              </p>
              <p className="tnum mx-auto mt-4 inline-block rounded-xl border-2 border-dashed border-brand-400 bg-brand-50 px-6 py-3 font-display text-2xl font-extrabold tracking-widest text-brand-700 dark:border-night-700 dark:bg-night-900 dark:text-flow">
                {success.code}
              </p>
              <dl className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm">
                <div className="flex justify-between gap-4 rounded-lg bg-paper px-4 py-2.5 dark:bg-night-900">
                  <dt className="font-semibold text-ink-soft dark:text-stone-400">Package</dt>
                  <dd className="font-bold">
                    {PACKAGES.find((p) => p.slug === success.pkg)?.name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 rounded-lg bg-paper px-4 py-2.5 dark:bg-night-900">
                  <dt className="font-semibold text-ink-soft dark:text-stone-400">Launch rate</dt>
                  <dd className="tnum font-bold">
                    {success.pkg === "solo"
                      ? `${slr(0)}/mo × 6 months, then ${slr(999)}/mo`
                      : `${slr(
                          PACKAGES.find((p) => p.slug === success.pkg)!.offerPrice,
                        )}/mo × 6 months`}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 rounded-lg bg-paper px-4 py-2.5 dark:bg-night-900">
                  <dt className="font-semibold text-ink-soft dark:text-stone-400">Free Solo seats left</dt>
                  <dd className="tnum font-bold">
                    {status.seatsRemaining} / {status.seatsTotal}
                  </dd>
                </div>
              </dl>
              <p className="mx-auto mt-6 max-w-md text-[13px] leading-relaxed text-ink-soft dark:text-stone-400">
                Our onboarding team will call you within 24 hours (Mon–Sat,
                9:00–18:00) to activate your workspace.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(null)}
                className="mt-6 text-sm font-bold text-brand-700 underline-offset-4 hover:underline dark:text-flow"
              >
                Register another business
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend className="font-display text-sm font-extrabold uppercase tracking-wider text-ink-soft dark:text-stone-300">
                  1 · Choose your package
                </legend>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {PACKAGES.map((p) => {
                    const disabled = p.slug === "solo" && (soloSoldOut || !status.active);
                    const active = selected === p.slug;
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        disabled={disabled && !active}
                        onClick={() => select(p.slug, false)}
                        aria-pressed={active}
                        className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                          active
                            ? "border-brand-500 bg-brand-50 dark:border-flow dark:bg-night-700"
                            : "border-stone-200 bg-white hover:border-brand-300 dark:border-night-700 dark:bg-night-900"
                        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-extrabold">{p.name}</span>
                          {p.slug === "solo" && (
                            <span className="tnum rounded-full bg-flare-500/15 px-2 py-0.5 text-[11px] font-extrabold text-flare-600 dark:text-flare-400">
                              {soloSoldOut ? "0 left" : `${status.seatsRemaining} left`}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[12px] font-semibold text-ink-soft dark:text-stone-400">
                          {p.slug === "solo" ? "Free × 6 months" : `50% off → ${slr(p.offerPrice)}/mo`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selected === "solo" && soloSoldOut && (
                  <p className="mt-2 text-[13px] font-semibold text-flare-600 dark:text-flare-400">
                    All 10 free seats are claimed — pick another package to keep 50% off for 6 months.
                  </p>
                )}
              </fieldset>

              <fieldset className="mt-7">
                <legend className="font-display text-sm font-extrabold uppercase tracking-wider text-ink-soft dark:text-stone-300">
                  2 · Your details
                </legend>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-bold">Full name *</span>
                    <input
                      className={inputCls}
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      placeholder="e.g. Kasun Jayawardena"
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-bold">Business email *</span>
                    <input
                      type="email"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@business.lk"
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-bold">Phone / WhatsApp *</span>
                    <input
                      type="tel"
                      className={inputCls}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+94 7X XXX XXXX"
                      autoComplete="tel"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-bold">Business name</span>
                    <input
                      className={inputCls}
                      value={form.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                      placeholder="Optional"
                      autoComplete="organization"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[13px] font-bold">Team size</span>
                    <select
                      className={inputCls}
                      value={form.teamSize}
                      onChange={(e) => set("teamSize", e.target.value)}
                    >
                      {["Just me", "2–5 people", "6–15 people", "16–50 people", "50+ people"].map(
                        (t) => (
                          <option key={t}>{t}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[13px] font-bold">
                      Anything we should know? (optional)
                    </span>
                    <textarea
                      className={`${inputCls} min-h-[92px] resize-y`}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Current tools, must-have features, preferred demo time…"
                    />
                  </label>
                </div>
              </fieldset>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-soft dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 accent-[#ca8a04]"
                  required
                />
                <span>
                  I agree to be contacted about my Client Flow Business Solution
                  registration and understand the launch offer is valid for
                  registrations made during {status.monthLabel} only. *
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !status.active}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-500 px-6 py-4 font-display text-base font-extrabold text-night-950 shadow-lift transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Securing your seat…"
                  : selected === "solo"
                    ? `Claim my free Solo seat (${status.seatsRemaining} left)`
                    : `Register for ${chosen.name} at 50% off`}
                {!submitting && (
                  <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                )}
              </button>
              <p className="mt-3 text-center text-[12px] font-medium text-ink-soft dark:text-stone-400">
                No payment now. Your confirmation code holds the launch price.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
