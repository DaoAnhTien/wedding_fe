import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Check, X, HelpCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { api, type Page, type RSVPEntry } from "@/lib/api";
import { SongHyEmblem, AsianCornerOrnaments, GoldDivider } from "./SongHyEmblem";

type AttendanceStatus = "attending" | "not-attending" | "maybe" | null;

export const RSVPForm = () => {
  const [rsvpList, setRsvpList] = useState<RSVPEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadRSVP = async () => {
    setIsLoading(true);
    try {
      const data = await api<Page<RSVPEntry>>("/rsvp");
      setRsvpList(data.items);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadRSVP();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !status) {
      toast.error("Vui lòng nhập họ tên và chọn trạng thái tham dự.");
      return;
    }
    setIsSubmitting(true);
    try {
      const entry = await api<RSVPEntry>("/rsvp", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          status,
        }),
      });
      setRsvpList((prev) => [entry, ...prev]);
      setLoadError(false);
      setName("");
      setMessage("");
      setStatus(null);
      toast.success("Cảm ơn bạn đã phản hồi! Hẹn gặp bạn trong ngày vui của chúng mình.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Chưa thể gửi xác nhận. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    {
      value: "attending" as const,
      label: "Chắc chắn sẽ tham dự",
      sub: "Rất vinh hạnh được đón tiếp bạn",
      icon: Check,
      badgeClass: "bg-[#16382e] text-[#e6ca85] border border-[#d4af37]/40",
      activeBg: "border-[#d4af37] bg-[#16382e]/5 shadow-sm",
    },
    {
      value: "maybe" as const,
      label: "Đang sắp xếp thời gian",
      sub: "Sẽ cố gắng có mặt chung vui",
      icon: HelpCircle,
      badgeClass: "bg-[#c59e4e] text-white",
      activeBg: "border-[#c59e4e] bg-[#c59e4e]/10 shadow-sm",
    },
    {
      value: "not-attending" as const,
      label: "Rất tiếc không thể tham dự",
      sub: "Xin gửi lời chúc mừng từ xa",
      icon: X,
      badgeClass: "bg-stone-500 text-white",
      activeBg: "border-stone-400 bg-stone-100 dark:bg-stone-800/40 shadow-sm",
    },
  ];

  const getStatusLabel = (status: AttendanceStatus) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option?.label || "";
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option?.badgeClass || "bg-muted text-foreground";
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    if (status === "attending") return Check;
    if (status === "not-attending") return X;
    return HelpCircle;
  };

  return (
    <section id="rsvp" className="relative py-20 md:py-32 bg-section-gradient overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#214f42_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex justify-center mb-4">
            <SongHyEmblem size="md" variant="gold" />
          </div>
          <span className="text-[#c59e4e] font-serif font-medium tracking-[0.3em] uppercase text-xs md:text-sm">
            Xác Nhận Tham Dự
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#16382e] mt-2 mb-3 font-normal">
            Sự Hiện Diện Của Bạn
          </h2>
          <GoldDivider label="R.S.V.P" />
          <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed mt-2">
            Để gia đình đón tiếp quý khách một cách chu đáo và trọn vẹn nhất, xin vui lòng gửi phản hồi trước ngày 05/11/2026.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          {/* RSVP Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-[#d4af37]/40 bg-card/95 backdrop-blur-sm p-7 sm:p-9 shadow-card">
              <AsianCornerOrnaments />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rsvp-name" className="font-serif text-sm text-[#16382e] tracking-wide font-medium">
                    Họ và tên của bạn <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="rsvp-name"
                    maxLength={100}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A (và người thương)"
                    className="h-12 rounded-xl bg-background border-[#d4af37]/30 focus-visible:ring-[#16382e] font-body text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="font-serif text-sm text-[#16382e] tracking-wide font-medium">
                    Bạn sẽ đến chung vui chứ? <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid gap-2.5">
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = status === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setStatus(option.value)}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                            isSelected
                              ? option.activeBg
                              : "border-border hover:border-[#d4af37]/50 bg-background/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                                isSelected
                                  ? option.badgeClass
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-serif text-sm sm:text-base font-medium text-[#16382e]">
                                {option.label}
                              </p>
                              <p className="font-body text-xs text-muted-foreground">
                                {option.sub}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-[#16382e] bg-[#16382e]"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rsvp-message" className="font-serif text-sm text-[#16382e] tracking-wide font-medium">
                    Ghi chú thêm (Số lượng người đi cùng, lời nhắn)
                  </Label>
                  <Input
                    id="rsvp-message"
                    maxLength={200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="VD: Đi cùng 1 người, chúc hai bạn trăm năm hạnh phúc!"
                    className="h-12 rounded-xl bg-background border-[#d4af37]/30 focus-visible:ring-[#16382e] font-body text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-13 py-4 rounded-xl bg-[#16382e] hover:bg-[#1f483c] text-[#fbf8f1] border border-[#d4af37]/40 font-serif text-base tracking-wider shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#e6ca85]" />
                      <span>Đang gửi xác nhận...</span>
                    </span>
                  ) : (
                    "Gửi Xác Nhận Tham Dự"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* RSVP Guest List Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-[#d4af37]/30 bg-card/80 backdrop-blur-sm p-6 sm:p-7 shadow-card">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#d4af37]/20">
                <h3 className="font-serif text-lg font-medium text-[#16382e]">
                  Danh Sách Xác Nhận
                </h3>
                <span className="font-serif text-xs px-3 py-1 rounded-full bg-secondary border border-[#d4af37]/30 text-[#c59e4e] font-semibold">
                  {rsvpList.length} khách mời
                </span>
              </div>

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#c59e4e] mx-auto mb-2" />
                    <p className="font-body text-xs text-muted-foreground">Đang tải danh sách...</p>
                  </div>
                ) : loadError ? (
                  <div className="py-8 text-center" role="alert">
                    <p className="font-body text-xs text-muted-foreground mb-3">
                      Chưa thể kết nối tới danh sách phản hồi.
                    </p>
                    <Button variant="outline" size="sm" onClick={loadRSVP} className="rounded-full text-xs">
                      Thử lại
                    </Button>
                  </div>
                ) : rsvpList.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <p className="font-serif text-sm">Chưa có phản hồi nào.</p>
                    <p className="font-body text-xs mt-1">Hãy là người đầu tiên gửi lời chúc mừng!</p>
                  </div>
                ) : (
                  rsvpList.map((rsvp, index) => {
                    const StatusIcon = getStatusIcon(rsvp.status);
                    return (
                      <motion.div
                        key={rsvp.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3.5 rounded-xl border border-border/80 bg-background/80 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif font-medium text-sm text-[#16382e] truncate">
                            {rsvp.name}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${getStatusBadge(
                              rsvp.status
                            )}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span>{getStatusLabel(rsvp.status)}</span>
                          </span>
                        </div>
                        {rsvp.message && (
                          <p className="font-body text-xs text-muted-foreground mt-1.5 italic line-clamp-2">
                            "{rsvp.message}"
                          </p>
                        )}
                        <p className="font-body text-[10px] text-muted-foreground/60 mt-2 text-right">
                          {new Date(rsvp.createdAt).toLocaleDateString("vi-VN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
