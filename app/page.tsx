import { DressCode } from "@/components/DressCode";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { MusicPlayer } from "@/components/MusicPlayer";
import { RSVP } from "@/components/RSVP";
import { Timeline } from "@/components/Timeline";
import { Wishes } from "@/components/Wishes";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Timeline />
      <DressCode />
      <Location />
      <Wishes />
      <RSVP />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
