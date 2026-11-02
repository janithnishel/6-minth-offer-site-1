import { getOfferStatus } from "@/lib/offer-server";
import { OfferProvider } from "@/components/offer-context";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { OfferSection } from "@/components/offer-section";
import { Features } from "@/components/features";
import { Industries } from "@/components/industries";
import { Pricing } from "@/components/pricing";
import { RegisterSection } from "@/components/register-section";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const status = await getOfferStatus();

  return (
    <OfferProvider initial={status}>
      <Header />
      <main>
        <Hero />
        <OfferSection />
        <Features />
        <Industries />
        <Pricing />
        <RegisterSection />
        <Faq />
      </main>
      <Footer />
    </OfferProvider>
  );
}
