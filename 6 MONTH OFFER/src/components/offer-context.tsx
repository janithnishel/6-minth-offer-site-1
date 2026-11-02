"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { OfferStatus } from "@/lib/offer";
import type { PackageSlug } from "@/lib/packages";

interface OfferContextValue {
  status: OfferStatus;
  refresh: () => Promise<void>;
  selected: PackageSlug;
  select: (slug: PackageSlug, scrollToForm?: boolean) => void;
}

const OfferContext = createContext<OfferContextValue | null>(null);

export function OfferProvider({
  initial,
  children,
}: {
  initial: OfferStatus;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<OfferStatus>(initial);
  const [selected, setSelected] = useState<PackageSlug>("solo");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/offer-status", { cache: "no-store" });
      if (res.ok) setStatus((await res.json()) as OfferStatus);
    } catch {
      /* keep last known state */
    }
  }, []);

  // Keep seats + window live while the page is open
  useEffect(() => {
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  const select = useCallback((slug: PackageSlug, scrollToForm = true) => {
    setSelected(slug);
    if (scrollToForm) {
      requestAnimationFrame(() => {
        document
          .getElementById("register")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const value = useMemo(
    () => ({ status, refresh, selected, select }),
    [status, refresh, selected, select],
  );

  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
}

export function useOffer(): OfferContextValue {
  const ctx = useContext(OfferContext);
  if (!ctx) throw new Error("useOffer must be used inside <OfferProvider>");
  return ctx;
}
