import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Reveal from "./Reveal";
import venueImageFeMal from "@/assets/TAM02611.jpg";
import venueImageMale from "@/assets/TAM02069.jpg";

const events = [
  {
    number: "01",
    title: "Lễ Ăn Hỏi",
    role: "Tư Gia Nhà Gái",
    person: "Cô dâu Thuỳ Trang",
    date: "Thứ Sáu, 13/11/2026",
    lunarDate: "Nhằm ngày 05/10 năm Bính Ngọ",
    time: "10:00",
    venue: "Tư gia nhà gái",
    address: "Thôn Long Giang, Hương Bình, Hà Tĩnh",
    mapLink: "https://www.google.com/maps?q=18.2786931,105.6240120",
    image: venueImageFeMal,
    calendarStart: "20261113T040000Z",
    calendarEnd: "20261113T070000Z",
  },
  {
    number: "02",
    title: "Lễ Thành Hôn",
    role: "Tư Gia Nhà Trai",
    person: "Chú rể Hữu Tân",
    date: "Thứ Bảy, 14/11/2026",
    lunarDate: "Nhằm ngày 06/10 năm Bính Ngọ",
    time: "10:00",
    venue: "Tư gia nhà trai",
    address: "Xóm 11, Đa Bản, Hương Bình, Hà Tĩnh",
    mapLink: "https://www.google.com/maps?q=18.2398009,105.6152761",
    image: venueImageMale,
    calendarStart: "20261114T040000Z",
    calendarEnd: "20261114T070000Z",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-32 bg-section-gradient overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Section Header - Tối Giản & Sang Trọng */}
        <Reveal animation="fade-up">
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-serif text-xs md:text-sm uppercase tracking-[0.3em] text-[#8c6b2d] font-semibold mb-2">
              Chương Trình Hôn Lễ
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-wide">
              Sự Kiện Cưới
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4 mb-3" />
            <p className="font-body text-center text-muted-foreground text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày thử thách.
            </p>
          </div>
        </Reveal>

        {/* Danh Sách Thẻ Sự Kiện - Hiện Đại, Không Viền Thô Cứng, Chuyển Gradient Mềm Mại */}
        <div className="space-y-10 sm:space-y-14 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <Reveal
              key={index}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#fffefb] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_55px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] transition-all duration-700 hover:-translate-y-1 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-row items-stretch">

                {/* ─── ẢNH CÔ DÂU / CHÚ RỂ (BÊN TRÁI - RÕ NÉT, HÒA MỀM MẠI VÀO NỀN GIẤY) ─── */}
                <div className="w-[45%] sm:w-[48%] md:w-1/2 shrink-0 relative overflow-hidden bg-[#fffefb]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-[35%_top] sm:object-[center_top] transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, black 0%, black 35%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.72) 65%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.2) 88%, rgba(0,0,0,0.04) 96%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, black 0%, black 35%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.72) 65%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.2) 88%, rgba(0,0,0,0.04) 96%, transparent 100%)",
                    }}
                  />

                  {/* Dải chuyển tiếp ánh sáng mờ mịn màng (Silky ease fade) - tan êm như màu nước, không bị khựng */}
                  <div
                    className="absolute inset-y-0 right-0 w-[55%] sm:w-[50%] md:w-[45%] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,254,251,0) 0%, rgba(255,254,251,0.05) 20%, rgba(255,254,251,0.2) 40%, rgba(255,254,251,0.5) 62%, rgba(255,254,251,0.82) 82%, rgba(255,254,251,0.97) 94%, #fffefb 100%)",
                    }}
                  />

                  {/* Tag tên nhân vật thanh nhã trên góc ảnh */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2b2118] font-serif text-[10px] sm:text-xs tracking-wider shadow-xs border border-white/70">
                      {event.person}
                    </span>
                  </div>
                </div>

                {/* ─── NỘI DUNG THÔNG TIN TƯ GIA (BÊN PHẢI - PHONG CÁCH TYPOGRAPHY CAO CẤP) ─── */}
                <div className="relative w-[55%] sm:w-[52%] md:w-1/2 p-4 sm:p-7 md:p-9 flex flex-col justify-between bg-[#fffefb] overflow-hidden">
                  {/* Số thứ tự nghệ thuật chìm ở góc nền bên phải (Vogue style watermark) */}
                  <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-6 pointer-events-none select-none z-0">
                    <span className="font-display text-7xl sm:text-8xl md:text-9xl text-stone-900/[0.035] font-light leading-none">
                      {event.number}
                    </span>
                  </div>

                  <div className="relative z-10">
                    {/* Tiêu đề & Vai trò */}
                    <div className="mb-4 sm:mb-6">
                      <span className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8c6b2d] font-semibold block mb-0.5">
                        {event.role}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#2b2118] font-normal leading-tight">
                        {event.title}
                      </h3>
                      <div className="w-10 h-0.5 bg-gradient-to-r from-[#c5a059] to-transparent mt-2 sm:mt-2.5" />
                    </div>

                    {/* Khối chi tiết thời gian & địa điểm - Thiết kế tinh tế không dùng icon hộp thô */}
                    <div className="space-y-3.5 sm:space-y-4">
                      {/* Thời gian */}
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0 ring-4 ring-[#c5a059]/15" />
                        <div className="space-y-0.5">
                          <span className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8c6b2d] font-semibold block">
                            Thời gian
                          </span>
                          <p className="font-display text-base sm:text-lg md:text-xl text-[#2b2118] font-normal leading-snug">
                            <span className="font-semibold text-[#8c6b2d] mr-1.5">{event.time}</span>
                            <span>• {event.date}</span>
                          </p>
                          <p className="font-body text-[11px] sm:text-xs text-stone-500 font-normal">
                            ({event.lunarDate})
                          </p>
                        </div>
                      </div>

                      {/* Phân tách tinh tế */}
                      <div className="h-px w-full bg-gradient-to-r from-stone-200/80 via-stone-200/30 to-transparent" />

                      {/* Địa điểm */}
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0 ring-4 ring-[#c5a059]/15" />
                        <div className="space-y-0.5">
                          <span className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8c6b2d] font-semibold block">
                            Địa điểm tổ chức
                          </span>
                          <p className="font-display text-base sm:text-lg text-[#2b2118] font-normal leading-snug">
                            {event.venue}
                          </p>
                          <p className="font-body text-[11px] sm:text-xs md:text-sm text-stone-500 leading-relaxed">
                            {event.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động thanh lịch, phong cách capsule */}
                  <div className="relative z-10 pt-3 sm:pt-6 mt-3 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      size="sm"
                      className="flex-1 font-body bg-[#16382e] hover:bg-[#1f483c] text-white rounded-full h-8 sm:h-10 text-[11px] sm:text-xs tracking-wider transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => window.open(event.mapLink, "_blank")}
                    >
                      <span>Xem bản đồ</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-80" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="font-body bg-transparent hover:bg-[#faf3e6]/60 text-[#8c6b2d] border-[#c5a059]/40 hover:border-[#8c6b2d] rounded-full h-8 sm:h-10 text-[11px] sm:text-xs tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => {
                        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                          `Lễ Cưới Hữu Tân & Thuỳ Trang - ${event.title}`
                        )}&dates=${event.calendarStart}/${event.calendarEnd}&details=${encodeURIComponent(
                          `Đám cưới Hữu Tân & Thuỳ Trang - ${event.title} tại ${event.venue}`
                        )}&location=${encodeURIComponent(event.address)}`;
                        window.open(url, "_blank");
                      }}
                      title="Thêm nhắc nhở vào Google Calendar"
                    >
                      <span>Thêm vào lịch</span>
                    </Button>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;