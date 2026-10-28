import { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { href: "#couple", label: "Cặp đôi" },
  { href: "#gallery", label: "Album Hình Cưới" },
  { href: "#events", label: "Sự kiện cưới" },
  { href: "#rsvp", label: "Xác Nhận Tham Dự" },
  { href: "#wishes", label: "Sổ Lưu Bút" },
  { href: "#gift", label: "Mừng cưới" },
];

interface NavbarProps {
  onReopenEnvelope?: () => void;
}

const Navbar = ({ onReopenEnvelope }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#16382e]/95 backdrop-blur-md shadow-lg border-b border-[#d4af37]/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-12">
          {/* Logo with Song Hỷ Symbol */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 font-display text-lg md:text-xl font-medium tracking-wider text-[#fbf8f1] hover:text-[#e6ca85] transition-colors"
          >
            <span>Văn Sáng</span>
            <span className="text-[#d4af37] text-xl font-bold font-serif mx-0.5">囍</span>
            <span>Thuỳ Dung</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-sm tracking-wider transition-colors text-[#fbf8f1]/90 hover:text-[#e6ca85] hover:scale-105 transform duration-200"
              >
                {item.label}
              </button>
            ))}

            {onReopenEnvelope && (
              <button
                onClick={onReopenEnvelope}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#122b24]/60 text-xs font-serif text-[#e6ca85] hover:bg-[#d4af37]/20 transition-all"
                title="Xem lại bì thư"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Bì thư</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {onReopenEnvelope && (
              <button
                onClick={onReopenEnvelope}
                className="p-2 rounded-full text-[#e6ca85] hover:bg-white/10"
                aria-label="Xem lại bì thư"
              >
                <Mail className="w-5 h-5" />
              </button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#fbf8f1] hover:text-[#e6ca85] hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#16382e]/98 backdrop-blur-md border-b border-[#d4af37]/30 px-6 py-5 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-base text-left text-[#fbf8f1] hover:text-[#e6ca85] py-2 border-b border-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
