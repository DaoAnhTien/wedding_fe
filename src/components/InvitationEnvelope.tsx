import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";

interface InvitationEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
  guestName?: string;
}

/* ─── Intricate Victorian / Floral Corner Ornament ─── */
const OrnateCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    {/* Outer corner curves */}
    <path
      d="M6 94V32C6 17.6406 17.6406 6 32 6H94"
      stroke="#c5a059"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M14 94V36C14 23.8497 23.8497 14 36 14H94"
      stroke="#d4af37"
      strokeWidth="0.8"
      strokeDasharray="2 3"
    />
    {/* Classical flourish scrolls */}
    <path
      d="M18 18C28 28 36 18 36 18C36 18 28 36 18 36"
      stroke="#c5a059"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="18" cy="18" r="3" fill="#c5a059" />
    <circle cx="36" cy="18" r="2" fill="#d4af37" />
    <circle cx="18" cy="36" r="2" fill="#d4af37" />
    {/* Floral petal flourishes */}
    <path
      d="M20 20Q34 34 46 22Q34 38 20 20Z"
      fill="#c5a059"
      fillOpacity="0.4"
    />
    <path
      d="M20 20Q34 34 22 46Q38 34 20 20Z"
      fill="#c5a059"
      fillOpacity="0.4"
    />
  </svg>
);

export const InvitationEnvelope = ({ onOpen, isOpen, guestName }: InvitationEnvelopeProps) => {
  const displayName = guestName?.trim() || "Em Tân + nt";

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain p-3 sm:p-6 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Romantic Wedding Photo Backdrop */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Background image of the couple - bright, clear, softly blurred and romantic */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 blur-[4px] opacity-80"
              style={{ backgroundImage: "url('/envelope-bg.jpg')" }}
            />
            {/* Warm soft lighting overlay - naturally highlighting the couple */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Floating Subtle Golden Shimmers */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#d4af37]/40 blur-[1px]"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
              />
            ))}
          </div>

          {/* The Masterpiece Wedding Invitation Card */}
          <motion.div
            className="relative w-full max-w-[440px] sm:max-w-[480px] my-auto shrink-0 z-10"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Card Body - Luxury Fine-Art Ivory Paper */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#fdfbf7] text-[#2c221a] border-2 border-[#d4af37]/70 shadow-[0_20px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(212,175,55,0.2)] px-5 py-7 sm:px-8 sm:py-9 flex flex-col items-center text-center overflow-hidden">

              {/* Delicate Inner Golden Frames */}
              <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#d4af37]/35" />
              <div className="pointer-events-none absolute inset-4 sm:inset-5 rounded-lg sm:rounded-xl border border-dotted border-[#c5a059]/40" />

              {/* 4 Ornate Victorian Gold Corners */}
              <OrnateCorner className="pointer-events-none absolute top-3 left-3 w-12 h-12 sm:w-14 sm:h-14" />
              <OrnateCorner className="pointer-events-none absolute top-3 right-3 w-12 h-12 sm:w-14 sm:h-14 -scale-x-100" />
              <OrnateCorner className="pointer-events-none absolute bottom-3 left-3 w-12 h-12 sm:w-14 sm:h-14 -scale-y-100" />
              <OrnateCorner className="pointer-events-none absolute bottom-3 right-3 w-12 h-12 sm:w-14 sm:h-14 -scale-x-100 -scale-y-100" />

              {/* Subtle floral watermark in background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] bg-repeat"
                style={{
                  backgroundImage:
                    "radial-gradient(#c5a059 1px, transparent 1px), radial-gradient(#9b3a4a 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                }}
              />

              {/* Header Badge */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/50 bg-[#faf5ec] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  <span className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8c6b2d] font-semibold">
                    Thiệp Cưới Báo Hỷ
                  </span>
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                </div>
                <p className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#8c745d] mt-1.5 font-light">
                  Wedding Invitation
                </p>
              </div>

              {/* Couple Portrait - Romantic Circular Cameo Frame (Viên Mãn & Trọn Vẹn) */}
              <div className="relative z-10 mt-3.5 mb-3 flex items-center justify-center">
                <div className="relative p-1 rounded-full bg-gradient-to-br from-[#dfbd77] via-[#c5a059] to-[#9b7637] shadow-[0_6px_22px_rgba(197,160,89,0.35)]">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#fffdf7] bg-[#faf5ec]">
                    <img
                      src="/envelope-bg.jpg"
                      alt="Hữu Tân & Thuỳ Trang"
                      className="w-full h-full object-cover object-[center_15%] scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Couple Names */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <h1 className="font-display text-2xl sm:text-3xl text-[#2a1d15] font-normal tracking-wide leading-tight">
                  Hữu Tân
                </h1>

                {/* Classical Divider with Song Hỷ */}
                <div className="flex items-center justify-center gap-3 my-1 sm:my-1.5">
                  <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#c5a059]" />
                  <span className="font-serif text-lg sm:text-xl text-[#c5a059] font-semibold">
                    囍
                  </span>
                  <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#c5a059]" />
                </div>

                <h1 className="font-display text-2xl sm:text-3xl text-[#2a1d15] font-normal tracking-wide leading-tight">
                  Thuỳ Trang
                </h1>
              </div>

              {/* Guest Invitation Info Box (Exact UI from user reference) */}
              <div className="relative z-10 mt-4 w-full max-w-sm rounded-xl bg-[#faf6ed]/90 border border-[#d4af37]/45 px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs">
                {/* Heading */}
                <p className="font-display text-base sm:text-lg text-[#5a483a] font-normal tracking-wide">
                  Trân Trọng Kính Mời:
                </p>

                {/* Dotted guideline with handwritten cursive guest name */}
                <div className="relative mt-2 sm:mt-2.5 w-full flex items-center justify-center min-h-[42px] px-1 sm:px-3">
                  {/* Continuous dotted line across */}
                  <div
                    className="absolute inset-x-2 sm:inset-x-4 bottom-2 border-b-2 border-dotted border-[#8c745d]/60 pointer-events-none"
                    style={{ borderBottomStyle: "dotted" }}
                  />
                  {/* Cursive guest name */}
                  <span className="relative z-10 font-script text-2xl sm:text-3xl text-[#20150e] font-normal leading-tight whitespace-normal [overflow-wrap:anywhere] px-2">
                    {displayName}
                  </span>
                </div>

                <p className="mt-1.5 font-body text-[11px] text-[#7a6552] italic">
                  Đến chung vui cùng gia đình chúng tôi
                </p>
              </div>

              {/* Wedding Date */}
              <div className="relative z-10 mt-3.5 sm:mt-4 text-center">
                <p className="font-serif text-sm sm:text-base text-[#8c6b2d] tracking-[0.2em] font-semibold">
                  14 · 11 · 2026
                </p>
                <p className="font-body text-[11px] sm:text-xs text-[#7a6552] mt-0.5">
                  (Nhằm ngày 06 tháng 10 năm Bính Ngọ)
                </p>
              </div>

              {/* Golden Wax Seal CTA Button */}
              <div className="relative z-20 mt-4 sm:mt-5 flex flex-col items-center gap-2">
                <motion.button
                  onClick={onOpen}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="group relative flex shrink-0 items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#dfbd77] via-[#c59e4e] to-[#9b7637] shadow-[0_8px_25px_rgba(197,160,89,0.55)] border-2 border-[#fff7df] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c59e4e]"
                  aria-label="Mở thiệp cưới"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-1 rounded-full border border-[#78571d]/40 flex items-center justify-center">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-dashed border-[#fff3cf]/60 flex items-center justify-center bg-gradient-to-br from-[#c59e4e] to-[#8d6928]">
                      <span className="font-serif text-xl sm:text-2xl text-[#fffdf7] font-bold drop-shadow-sm">
                        囍
                      </span>
                    </div>
                  </div>

                  {/* Pulse ring */}
                  <span className="absolute -inset-1.5 rounded-full border border-[#d4af37]/50 animate-ping pointer-events-none opacity-60" />
                </motion.button>

                <div className="flex items-center justify-center gap-1.5 text-[#8c6b2d] mt-1">
                  <Volume2 className="w-3.5 h-3.5 shrink-0 animate-pulse text-[#c5a059]" />
                  <span className="font-serif text-[10px] sm:text-[11px] tracking-widest uppercase font-medium">
                    Chạm dấu sáp để mở thiệp
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
