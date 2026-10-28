import { Volume2, VolumeX, Disc } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  onReopenEnvelope?: () => void;
}

const MusicPlayer = ({
  isPlaying,
  toggleMusic,
}: MusicPlayerProps) => {
  return (
    <>
      {/* Luxury Golden Spinning Disc Button */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#d4af37] shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isPlaying
            ? "bg-[#16382e] text-[#e6ca85]"
            : "bg-[#fbf8f1] text-[#16382e]"
        }`}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Spinning disc icon */}
            <Disc className="w-6 h-6 animate-spin text-[#d4af37]" style={{ animationDuration: "4s" }} />
            {/* Ping pulse ring */}
            <span className="absolute -inset-2 rounded-full border border-[#d4af37]/50 animate-ping pointer-events-none" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#16382e]" />
        )}
      </button>

      {/* Floating soundwave bars */}
      {isPlaying && (
        <div className="fixed bottom-7 right-[78px] md:right-[88px] z-40 flex items-end gap-1 h-7 pointer-events-none bg-[#16382e]/85 px-2.5 py-1 rounded-full border border-[#d4af37]/30 backdrop-blur-sm shadow-md">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-[#d4af37] rounded-full animate-pulse"
              style={{
                height: `${8 + (i % 3) * 6}px`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
