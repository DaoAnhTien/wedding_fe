import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import WishesSection from "@/components/WishesSection";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import { InvitationEnvelope } from "@/components/InvitationEnvelope";
import { RSVPForm } from "@/components/RSVPForm";

import { useEffect, useState, useRef } from "react";
import musicUrl from "@/assets/audio.mp3";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const guestName = (searchParams.get("guest") || "").trim().slice(0, 120);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    } catch (err) {
      console.error("Lỗi khởi tạo audio:", err);
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playMusicWithFadeIn = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        let vol = 0;
        const fade = setInterval(() => {
          vol += 0.05;
          if (audioRef.current) {
            audioRef.current.volume = Math.min(vol, 0.45);
          }
          if (vol >= 0.45) clearInterval(fade);
        }, 150);
      })
      .catch((err) => {
        console.log("Audio play blocked by browser policy:", err);
      });
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    playMusicWithFadeIn();
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Không thể bật nhạc:", err));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#c5a059]/30 selection:text-[#16382e]">
      {/* Interactive Envelope Opening Experience */}
      <InvitationEnvelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} guestName={guestName} />

      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

      <FloatingHearts />
      <Navbar onReopenEnvelope={() => setIsEnvelopeOpen(false)} />

      <main>
        <HeroSection />
        {guestName && (
          <section className="px-6 py-12 text-center bg-secondary/40">
            <p className="font-body text-sm uppercase tracking-widest text-muted-foreground">Trân trọng kính mời</p>
            <h2 className="mt-3 font-display text-3xl text-primary break-words [overflow-wrap:anywhere]">{guestName}</h2>
            <p className="mt-3 font-body text-muted-foreground">Sự hiện diện của bạn là niềm hạnh phúc của chúng tôi.</p>
          </section>
        )}
        <CoupleSection />
        <CountdownSection />
        <GallerySection />
        <EventsSection />
        <RSVPForm />
        <WishesSection />
        <GiftSection />
      </main>

      <Footer onReopenEnvelope={() => setIsEnvelopeOpen(false)} />
    </div>
  );
};

export default Index;
