import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2 } from "lucide-react";

interface InvitationEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const InvitationEnvelope = ({ onOpen, isOpen }: InvitationEnvelopeProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1d18]/95 backdrop-blur-xl p-4 overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Ambient subtle warm gold particles / glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#214f42]/40 rounded-full blur-3xl" />
        </div>

        {/* The Luxury Envelope Stage */}
        <motion.div
          className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/4.8] max-h-[85vh] flex flex-col items-center justify-center"
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Envelope Body */}
          <div className="relative w-full h-full rounded-2xl bg-[#16382e] border-2 border-[#d4af37]/45 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden text-center">

            {/* Fine Hairline Inner Border */}
            <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#d4af37]/25" />
            <div className="pointer-events-none absolute inset-5 rounded-lg border border-[#d4af37]/15" />

            {/* Corner Filigree Ornaments */}
            <div className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/60" />
            <div className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/60" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/60" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/60" />

            {/* Top Text / Monogram */}
            <motion.div
              className="relative z-10 pt-2"
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/35 bg-[#102922]/80 mb-3">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#e6ca85]">
                  Thiệp Cưới Báo Hỷ
                </span>
              </div>
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#fbf8f1]/70">
                Wedding Invitation
              </p>
            </motion.div>

            {/* Center: Couple Names & Song Hy Crest */}
            <motion.div
              className="relative z-10 my-auto py-4 flex flex-col items-center"
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl text-[#fbf8f1] font-normal tracking-wide leading-tight">
                Văn Sáng
              </h1>

              <div className="flex items-center justify-center gap-3 my-3">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <span className="font-serif text-2xl text-[#d4af37] font-semibold">囍</span>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl text-[#fbf8f1] font-normal tracking-wide leading-tight">
                Thuỳ Dung
              </h1>

              <div className="mt-6 text-center">
                <p className="font-serif text-sm md:text-base text-[#e6ca85] tracking-widest font-medium">
                  14 · 11 · 2026
                </p>
                <p className="font-body text-xs text-[#fbf8f1]/70 mt-1">
                  (Nhằm ngày 06 tháng 10 năm Bính Ngọ)
                </p>
              </div>
            </motion.div>

            {/* Bottom: Wax Seal & Action Button */}
            <motion.div
              className="relative z-20 pb-2 flex flex-col items-center gap-3 w-full"
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Golden Wax Seal */}
              <motion.button
                onClick={onOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#dfbd77] via-[#c59e4e] to-[#9b7637] shadow-[0_10px_30px_rgba(212,175,55,0.45)] border-2 border-[#fff3cf] cursor-pointer"
                aria-label="Mở thiệp cưới"
              >
                {/* Wax seal outer rim texture */}
                <div className="absolute inset-1 rounded-full border border-[#78571d]/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-dashed border-[#fff3cf]/60 flex items-center justify-center bg-gradient-to-br from-[#c59e4e] to-[#8d6928]">
                    <span className="font-serif text-2xl text-[#fff7df] font-bold drop-shadow">
                      囍
                    </span>
                  </div>
                </div>

                {/* Subtle pulse ring */}
                <span className="absolute -inset-2 rounded-full border border-[#d4af37]/40 animate-ping pointer-events-none opacity-75" />
              </motion.button>

              <div className="flex items-center gap-2 text-[#e6ca85] mt-2">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="font-serif text-xs tracking-widest uppercase font-medium">
                  Chạm dấu sáp để mở thiệp
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
