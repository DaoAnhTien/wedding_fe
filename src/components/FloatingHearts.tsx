import { useEffect, useState } from "react";

interface ParticleProps {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: "heart" | "petal";
}

const FloatingHearts = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const newParticles: ParticleProps[] = [];
    for (let i = 0; i < 9; i++) {
      newParticles.push({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 7,
        size: 10 + Math.random() * 12,
        type: i % 2 === 0 ? "petal" : "heart",
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-[#d4af37]/35"
          style={{
            left: `${p.left}%`,
            bottom: "-30px",
            width: p.size,
            height: p.size,
            animation: `float-heart ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === "heart" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-45">
              <path d="M12 2C8 6 4 11 4 16a8 8 0 0 0 16 0c0-5-4-10-8-14z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
