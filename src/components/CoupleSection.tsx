import groomImage from "@/assets/avt_cr.jpg";
import brideImage from "@/assets/avt_cd.jpg";
import Reveal from "./Reveal";

/* ─── Decorative SVG: Groom illustration ─── */
const GroomIllustration = () => (
  <svg
    viewBox="0 0 120 140"
    className="w-24 h-28 md:w-28 md:h-32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Suit jacket */}
    <path
      d="M60 45 L40 55 L35 100 L50 95 L60 110 L70 95 L85 100 L80 55 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Lapels */}
    <path
      d="M55 55 L60 75 L52 60"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d="M65 55 L60 75 L68 60"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Bow tie */}
    <path
      d="M53 48 L60 52 L67 48 M53 56 L60 52 L67 56"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.7"
    />
    {/* Collar */}
    <path
      d="M50 45 L60 38 L70 45"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Hand with ring */}
    <path
      d="M82 70 Q90 65 95 72 Q98 78 92 82 L85 80"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Ring */}
    <circle
      cx="93"
      cy="75"
      r="3"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />
    {/* Flower on lapel */}
    <circle cx="52" cy="65" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <circle cx="52" cy="65" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

/* ─── Decorative SVG: Bride illustration ─── */
const BrideIllustration = () => (
  <svg
    viewBox="0 0 120 140"
    className="w-24 h-28 md:w-28 md:h-32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hair bun */}
    <ellipse
      cx="60"
      cy="35"
      rx="18"
      ry="20"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.5"
    />
    {/* Hair detail */}
    <path
      d="M48 28 Q55 20 65 22 Q72 24 75 32"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Neck */}
    <path
      d="M55 52 L55 62 M65 52 L65 62"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Shoulder / dress neckline */}
    <path
      d="M35 75 Q45 60 60 62 Q75 60 85 75"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.5"
    />
    {/* Back of dress */}
    <path
      d="M35 75 L30 110 Q60 120 90 110 L85 75"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Hair pin / flower accessory */}
    <circle cx="72" cy="28" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <circle cx="76" cy="32" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <circle cx="69" cy="24" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    {/* Earring */}
    <path
      d="M45 42 L43 50"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.5"
    />
    <circle cx="43" cy="52" r="1.5" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
  </svg>
);

/* ─── Main CoupleSection ─── */
const CoupleSection = () => {
  return (
    <section
      id="couple"
      className="py-16 md:py-28 bg-section-gradient overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* ===== GROOM BLOCK ===== */}
        <Reveal animation="fade-up">
          <div className="max-w-6xl mx-auto mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden shadow-card bg-card">
              {/* Photo */}
              <div className="md:w-1/2 aspect-[3/4] md:aspect-auto md:min-h-[500px] overflow-hidden">
                <img
                  src={groomImage}
                  alt="Chú rể - Hữu Tân"
                  className="w-full h-full object-cover object-[center_top] hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-secondary/40 via-secondary/20 to-transparent">
                <div className="text-primary/50">
                  <GroomIllustration />
                </div>

                <p className="font-body text-primary text-xs tracking-[0.25em] uppercase mt-5 mb-2">
                  Chú rể
                </p>

                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-1">
                  Hữu Tân
                </h3>

                <div className="w-16 h-0.5 bg-primary/50 my-5" />

                <p className="font-body text-muted-foreground italic leading-relaxed text-sm md:text-base max-w-sm">
                  Giữa hàng triệu người ngoài kia, chúng ta đã gặp nhau,
                  <br />
                  yêu nhau và chọn nắm tay nhau đi tiếp.
                </p>

                <div className="mt-6 space-y-1">
                  <p className="font-body text-muted-foreground text-sm">
                    Mẹ: <span className="text-foreground font-medium">Phan Thị Dụng</span>
                  </p>
                  <p className="font-body text-muted-foreground text-xs">
                    Xóm 11, Đa Bản, Hương Bình, Hà Tĩnh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== BRIDE BLOCK ===== */}
        <Reveal animation="fade-up" delay={200}>
          <div className="max-w-6xl mx-auto mb-16 md:mb-24">
            <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden shadow-card bg-card">
              {/* Content — on mobile below, on desktop LEFT */}
              <div className="md:w-1/2 flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-bl from-secondary/40 via-secondary/20 to-transparent">
                <div className="text-primary/50">
                  <BrideIllustration />
                </div>

                <p className="font-body text-wedding-rose text-xs tracking-[0.25em] uppercase mt-5 mb-2">
                  Cô dâu
                </p>

                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-1">
                  Thuỳ Trang
                </h3>

                <div className="w-16 h-0.5 bg-wedding-rose/50 my-5" />

                <p className="font-body text-muted-foreground italic leading-relaxed text-sm md:text-base max-w-sm">
                  Tình yêu không phải là tìm thấy một người hoàn hảo, mà là
                  <br />
                  tìm thấy người khiến ta muốn cùng nhau hoàn thiện.
                </p>

                <div className="mt-6 space-y-1">
                  <p className="font-body text-muted-foreground text-sm">
                    Bố: <span className="text-foreground font-medium">Đặng Đình Khoa</span> — Mẹ: <span className="text-foreground font-medium">Phan Thị Thảo</span>
                  </p>
                  <p className="font-body text-muted-foreground text-xs">
                    Thôn Long Giang, Hương Bình, Hà Tĩnh
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="md:w-1/2 aspect-[3/4] md:aspect-auto md:min-h-[500px] overflow-hidden">
                <img
                  src={brideImage}
                  alt="Cô dâu - Thuỳ Trang"
                  className="w-full h-full object-cover object-[center_top] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== LOVE MESSAGE ===== */}
        <Reveal animation="fade-up" delay={300}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Hữu Tân &amp; Thuỳ Trang
            </h2>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng tôi.
              Chúng tôi muốn gửi đến bạn những lời cảm ơn sâu sắc nhất và để bạn biết chúng tôi rất hạnh phúc
              khi thấy bạn ở đó. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp mà
              bạn đã dành cho chúng tôi!
            </p>

            <p className="font-display text-xl text-primary italic">
              Hữu Tân &amp; Thuỳ Trang
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CoupleSection;
