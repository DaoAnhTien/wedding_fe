import React from "react";

interface SongHyEmblemProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "green" | "cream";
}

export const SongHyEmblem: React.FC<SongHyEmblemProps> = ({
  className = "",
  size = "md",
  variant = "gold",
}) => {
  const sizeMap = {
    sm: "w-8 h-8 text-base",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
    xl: "w-24 h-24 text-5xl",

  };

  const variantStyles = {
    gold: "border-[#d4af37]/60 text-[#c59e4e] bg-[#fbf8f1]/90 shadow-[0_4px_16px_rgba(212,175,55,0.2)]",
    green: "border-[#214f42] text-[#214f42] bg-[#f4eee1]",
    cream: "border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm",
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border-2 p-1 font-serif select-none transition-transform duration-500 hover:rotate-6 ${sizeMap[size]} ${variantStyles[variant]} ${className}`}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.05em",
      }}
    >
      <div className="w-full h-full rounded-full border border-current/30 flex items-center justify-center font-bold">
        <span>囍</span>
      </div>
    </div>
  );
};

export const AsianCornerOrnaments = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
    {/* Top-left ornament */}
    <svg className="absolute top-3 left-3 w-7 h-7 text-[#c59e4e]/40" viewBox="0 0 40 40" fill="none">
      <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 38V14C8 10.6863 10.6863 8 14 8H38" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
    </svg>
    {/* Top-right ornament */}
    <svg className="absolute top-3 right-3 w-7 h-7 text-[#c59e4e]/40" viewBox="0 0 40 40" fill="none">
      <path d="M38 38V12C38 6.47715 33.5228 2 28 2H2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 38V14C32 10.6863 29.3137 8 26 8H2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="26" cy="14" r="2.5" fill="currentColor" />
    </svg>
    {/* Bottom-left ornament */}
    <svg className="absolute bottom-3 left-3 w-7 h-7 text-[#c59e4e]/40" viewBox="0 0 40 40" fill="none">
      <path d="M2 2V28C2 33.5228 6.47715 38 12 38H38" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2V26C8 29.3137 10.6863 32 14 32H38" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="14" cy="26" r="2.5" fill="currentColor" />
    </svg>
    {/* Bottom-right ornament */}
    <svg className="absolute bottom-3 right-3 w-7 h-7 text-[#c59e4e]/40" viewBox="0 0 40 40" fill="none">
      <path d="M38 2V28C38 33.5228 33.5228 38 28 38H2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 2V26C32 29.3137 29.3137 32 26 32H2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="26" cy="26" r="2.5" fill="currentColor" />
    </svg>
  </div>
);

export const GoldDivider = ({ label }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-[#c59e4e] to-[#c59e4e]/60" />
    <span className="text-xs uppercase tracking-[0.25em] font-serif text-[#c59e4e] px-2 font-medium">
      {label || "囍"}
    </span>
    <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent via-[#c59e4e] to-[#c59e4e]/60" />
  </div>
);

export default SongHyEmblem;
