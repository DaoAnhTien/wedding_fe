import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Reveal from "./Reveal";
import gallery1 from "@/assets/TAM02676.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-11-14T11:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToWishes = () => {
    const element = document.querySelector("#wishes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const timeBlocks = [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden">
      {/* Background Photo - 100% Bright, Natural, Crystal Clear */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
          style={{
            backgroundImage: `url(${gallery1})`,
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Very light, transparent touch - NO heavy dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Reveal animation="zoom-in">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal text-white">
            The Big Day!
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <div className="inline-block bg-[#16382e]/85 rounded-full px-6 py-2 mb-6 border border-[#d4af37]/70 shadow-md">
            <span className="font-serif text-xs md:text-sm tracking-[0.25em] uppercase text-[#e6ca85] font-semibold">
              Save the Date
            </span>
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={250}>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal text-white">
            Văn Sáng &amp; Thuỳ Dung
          </h3>
        </Reveal>

        <Reveal animation="fade-up" delay={350}>
          <p className="font-body text-white max-w-lg mx-auto mb-6 text-sm md:text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi có thêm một niềm hạnh phúc!
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={450}>
          <Button
            onClick={scrollToWishes}
            className="border-2 border-[#d4af37] text-[#fbf8f1] bg-[#16382e] hover:bg-[#1f483c] font-serif tracking-wider mb-8 px-8 py-5 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Gửi lời chúc
          </Button>
        </Reveal>

        <Reveal animation="fade-up" delay={500}>
          <div className="mb-8">
            <p className="font-serif text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] text-white font-medium">
              Ngày 14 Tháng 11 Dương Lịch 2026
            </p>
            <p className="font-body text-xs md:text-sm text-[#e6ca85] mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] font-medium">
              (âm lịch: ngày 06 tháng 10 năm Bính Ngọ)
            </p>
          </div>
        </Reveal>

        {/* Countdown Dials - Bright Warm Ivory with Gold Borders (NO dark black boxes!) */}
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-8 max-w-xl mx-auto">
          {timeBlocks.map((block, index) => (
            <Reveal key={index} animation="zoom-in" delay={600 + index * 100}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#fbf8f1]/95 rounded-2xl flex items-center justify-center mb-2.5 border-2 border-[#d4af37] shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-300">
                  <span className="font-display text-2xl sm:text-3xl md:text-5xl font-light text-[#16382e]">
                    {block.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#16382e]/85 border border-[#d4af37]/40 font-serif text-[11px] sm:text-xs text-[#e6ca85] uppercase tracking-wider font-semibold shadow-sm">
                  {block.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
