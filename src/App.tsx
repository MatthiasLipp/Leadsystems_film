import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ScrollStage } from "@/components/ScrollStage";
import { Features } from "@/components/Features";
import { SocialProof } from "@/components/SocialProof";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-pulse focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#04130e]"
      >
        Zum Inhalt springen
      </a>
      <Nav />
      <main>
        <Hero />
        <ScrollStage />
        <Features />
        <SocialProof />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
