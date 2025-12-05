import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { DaysEvents } from "@/components/DaysEvents";
import { SportsRules } from "@/components/SportsRules";
import { Schedule } from "@/components/Schedule";
import { Registration } from "@/components/Registration";
import { Coordinators } from "@/components/Coordinators";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background grain">
      <Navbar />
      <main>
        <Hero />
        <About />
        <DaysEvents />
        <SportsRules />
        <Schedule />
        <Gallery />
        <Coordinators />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
