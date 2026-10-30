import { SongHyEmblem, AsianCornerOrnaments } from "./SongHyEmblem";
import { Mail } from "lucide-react";

interface FooterProps {
  onReopenEnvelope?: () => void;
}

const Footer = ({ onReopenEnvelope }: FooterProps) => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-[#16382e] to-[#0f241e] text-primary-foreground overflow-hidden border-t-2 border-[#d4af37]/35">
      <AsianCornerOrnaments className="text-[#d4af37]/20" />

      <div className="container relative z-10 mx-auto px-4 text-center max-w-xl">
        <div className="flex justify-center mb-5">
          <SongHyEmblem size="md" variant="gold" className="shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
        </div>

        <h3 className="font-display text-2xl md:text-3xl text-[#fbf8f1] font-normal mb-2">
          Hữu Tân &amp; Thuỳ Trang
        </h3>

        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-3" />

        <p className="font-body text-sm text-[#fbf8f1]/85 leading-relaxed">
          Rất hân hạnh được đón tiếp quý khách trong ngày hạnh phúc của chúng mình!
        </p>
        <p className="font-body text-sm text-[#e6ca85] font-serif tracking-wider mt-1">
          Xin chân thành cảm ơn!
        </p>

        <p className="font-serif text-xs text-[#fbf8f1]/60 mt-6 tracking-wide">
          14 · 11 · 2026 (Nhằm ngày 06 tháng 10 năm Bính Ngọ)
        </p>

        {onReopenEnvelope && (
          <div className="mt-8">
            <button
              onClick={onReopenEnvelope}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/40 text-xs font-serif text-[#e6ca85] hover:bg-[#d4af37]/15 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Xem lại bì thư khai tiệc</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
