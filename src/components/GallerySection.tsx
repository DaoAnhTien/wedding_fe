import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Reveal from "./Reveal";
import { SongHyEmblem, GoldDivider } from "./SongHyEmblem";

import gallery1 from "@/assets/TAM01947.jpg";
import gallery2 from "@/assets/TAM02030.jpg";
import gallery3 from "@/assets/TAM02069.jpg";
import gallery4 from "@/assets/TAM02088.jpg";
import gallery5 from "@/assets/TAM02118.jpg";
import gallery6 from "@/assets/TAM02588.jpg";
import gallery7 from "@/assets/TAM02597.jpg";
import gallery8 from "@/assets/TAM02599.jpg";
import gallery9 from "@/assets/TAM02611.jpg";
import gallery10 from "@/assets/TAM02676.jpg";
import gallery11 from "@/assets/TAM02687.jpg";
import gallery12 from "@/assets/TAM02724.jpg";

const galleryImages = [
  { src: gallery1, alt: "Ảnh cưới 1", caption: "Ngày về chung đôi" },
  { src: gallery2, alt: "Ảnh cưới 2", caption: "Ánh mắt trao nhau" },
  { src: gallery3, alt: "Ảnh cưới 3", caption: "Khoảnh khắc lịch lãm" },
  { src: gallery4, alt: "Ảnh cưới 4", caption: "Nụ cười rạng rỡ" },
  { src: gallery5, alt: "Ảnh cưới 5", caption: "Hẹn ước trăm năm" },
  { src: gallery6, alt: "Ảnh cưới 6", caption: "Mâm quả vuông tròn" },
  { src: gallery7, alt: "Ảnh cưới 7", caption: "Bên nhau ngọt ngào" },
  { src: gallery8, alt: "Ảnh cưới 8", caption: "Bình yên bên anh" },
  { src: gallery9, alt: "Ảnh cưới 9", caption: "Hoa cầm tay tinh khôi" },
  { src: gallery10, alt: "Ảnh cưới 10", caption: "Tình yêu viên mãn" },
  { src: gallery11, alt: "Ảnh cưới 11", caption: "Váy cưới lãng mạn" },
  { src: gallery12, alt: "Ảnh cưới 12", caption: "Một đời gắn bó" },
];

/* ─── Lightbox Modal ─── */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (i: number) => void;
}) {
  const current = galleryImages[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
        onClick={onClose}
        aria-label="Đóng ảnh"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        className="absolute left-3 sm:left-6 text-white/80 hover:text-white transition-colors z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-3 sm:right-6 text-white/80 hover:text-white transition-colors z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-display text-xl sm:text-2xl font-normal drop-shadow">
                {current.caption}
              </p>
              <p className="text-[#e6ca85] font-serif text-xs tracking-widest mt-1">
                {index + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 max-w-[90vw] overflow-x-auto py-2 px-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelectIndex(i)}
            className={`w-10 h-10 rounded-lg overflow-hidden transition-all shrink-0 ${index === i
              ? "ring-2 ring-[#d4af37] scale-110 opacity-100"
              : "opacity-40 hover:opacity-80"
              }`}
          >
            <img
              src={img.src}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── 3D Coverflow Gallery Component ─── */
const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const total = galleryImages.length;
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, lightboxIndex, nextSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 45) {
      prevSlide();
    } else if (diff < -45) {
      nextSlide();
    }
    touchStartX.current = null;
  };

  // Helper to compute circular distance: -2, -1, 0, 1, 2
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <>
      <section
        id="gallery"
        className="relative py-16 md:py-24 bg-gradient-to-b from-background via-secondary/15 to-background overflow-hidden select-none"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#214f42_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          {/* Header */}
          <Reveal animation="fade-up">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex justify-center mb-3">
                <SongHyEmblem size="md" variant="gold" />
              </div>
              <span className="text-[#c59e4e] font-serif font-medium tracking-[0.3em] uppercase text-xs md:text-sm">
                Khoảnh Khắc Hạnh Phúc
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#16382e] mt-1 mb-2 font-normal">
                Album Hình Cưới
              </h2>
              <GoldDivider label="KHOẢNH KHẮC ĐÁNG NHỚ" />
              <p className="font-body text-muted-foreground text-xs md:text-sm max-w-md mx-auto leading-relaxed mt-1">
                Từng bức ảnh là một mảnh ghép lưu giữ trọn vẹn tình yêu và thanh xuân của chúng mình.
              </p>
            </div>
          </Reveal>

          {/* 3D Coverflow Stage */}
          <div
            className="relative w-full h-[750px] sm:h-[880px] md:h-[1000px] flex items-center justify-center overflow-visible"
            style={{ perspective: 1200 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-6 md:left-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#16382e]/80 hover:bg-[#16382e] text-[#e6ca85] border border-[#d4af37]/60 shadow-xl flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-6 md:right-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#16382e]/80 hover:bg-[#16382e] text-[#e6ca85] border border-[#d4af37]/60 shadow-xl flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {galleryImages.map((image, index) => {
                const offset = getOffset(index);
                const absOffset = Math.abs(offset);
                const isVisible = absOffset <= 2;
                const isCenter = offset === 0;

                if (!isVisible) return null;

                // 3D Coverflow transforms
                let xTranslate = "0%";
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 30;

                if (isCenter) {
                  xTranslate = "0%";
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 30;
                } else if (offset === 1) {
                  xTranslate = "60%";
                  rotateY = -18;
                  scale = 0.9;
                  opacity = 0.85;
                  zIndex = 20;
                } else if (offset === -1) {
                  xTranslate = "-60%";
                  rotateY = 18;
                  scale = 0.9;
                  opacity = 0.85;
                  zIndex = 20;
                } else if (offset === 2) {
                  xTranslate = "102%";
                  rotateY = -28;
                  scale = 0.8;
                  opacity = 0.6;
                  zIndex = 10;
                } else if (offset === -2) {
                  xTranslate = "-102%";
                  rotateY = 28;
                  scale = 0.8;
                  opacity = 0.6;
                  zIndex = 10;
                }

                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer w-[min(300px,calc(100vw-48px))] sm:w-[380px] md:w-[440px] h-[640px] sm:h-[747px] md:h-[854px]"
                    animate={{
                      x: xTranslate,
                      scale,
                      rotateY,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => {
                      if (isCenter) {
                        setLightboxIndex(index);
                      } else {
                        setCurrentIndex(index);
                      }
                    }}
                  >
                    {/* Card Body */}
                    <div
                      className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 bg-card ${isCenter
                        ? "shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                        : "shadow-lg"
                        }`}
                    >
                      {/* Photo with top alignment to preserve faces */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-[center_10%]"
                      />

                      {/* Center Card Vignette & Caption */}
                      {isCenter && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#16382e]/85 via-transparent to-transparent opacity-80" />

                          {/* Zoom Button on Center Card */}
                          <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-[#16382e]/80 backdrop-blur-sm border border-[#d4af37]/60 flex items-center gap-1.5 text-[#e6ca85] shadow-md hover:scale-105 transition-transform">
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span className="font-serif text-[11px] uppercase tracking-wider font-semibold">
                              Xem lớn
                            </span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-center">
                            <p className="font-display text-lg sm:text-xl text-[#fbf8f1] font-normal drop-shadow-md">
                              {image.caption}
                            </p>
                            <p className="font-serif text-[11px] text-[#e6ca85] tracking-widest uppercase mt-0.5">
                              {(index + 1).toString().padStart(2, "0")} / {total}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Indicator Dots at Bottom */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full ${currentIndex === i
                  ? "w-8 h-2.5 bg-[#c59e4e]"
                  : "w-2.5 h-2.5 bg-[#c59e4e]/30 hover:bg-[#c59e4e]/60"
                  }`}
                aria-label={`Chuyển đến ảnh ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="font-serif text-xs text-muted-foreground/75 tracking-widest uppercase">
              Vuốt chạm hoặc bấm mũi tên để chuyển ảnh · Nhấp ảnh giữa để phóng to
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((prev) =>
                prev === null ? 0 : (prev - 1 + total) % total
              )
            }
            onNext={() =>
              setLightboxIndex((prev) =>
                prev === null ? 0 : (prev + 1) % total
              )
            }
            onSelectIndex={(i) => setLightboxIndex(i)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
