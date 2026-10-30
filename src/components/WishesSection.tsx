import { useState, useEffect, useCallback, useRef } from "react";
import { Send, Heart, Quote, Loader2, ArrowDown, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import Reveal from "./Reveal";
import { wishesApi, type Wish } from "@/lib/api";
import { SongHyEmblem, AsianCornerOrnaments, GoldDivider } from "./SongHyEmblem";

const suggestions = [
  {
    label: "Trăm năm hạnh phúc",
    message:
      "Chúc hai bạn trăm năm hạnh phúc, luôn yêu thương, thấu hiểu và cùng nhau viết tiếp những chương thật đẹp!",
  },
  {
    label: "Một đời an yên",
    message:
      "Chúc hai bạn một đời bình an bên nhau, mỗi ngày đều ngập tràn tiếng cười và thật nhiều yêu thương.",
  },
  {
    label: "Hành trình mới",
    message:
      "Chúc mừng ngày vui của Hữu Tân & Thuỳ Trang! Mong tổ ấm nhỏ luôn ngập tràn hạnh phúc và những điều ngọt ngào.",
  },
];
const pageSize = 12;

const WishesSection = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [moreError, setMoreError] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);

  const loadWishes = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const data = await wishesApi.list(pageSize, 0, signal);
      setWishes(data.items);
      setTotal(data.total);
      setError("");
    } catch {
      if (!signal?.aborted) setError("Chưa thể mở sổ lưu bút. Bạn hãy thử lại nhé.");
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadWishes(controller.signal);
    return () => controller.abort();
  }, [loadWishes]);

  const loadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setMoreError("");
    try {
      const data = await wishesApi.list(pageSize, wishes.length);
      setWishes((prev) => [
        ...prev,
        ...data.items.filter((item) => !prev.some((wish) => wish.id === item.id)),
      ]);
      setTotal(data.total);
    } catch {
      setMoreError("Chưa tải được lời chúc tiếp theo. Vui lòng thử lại.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Bạn còn thiếu thông tin",
        description: "Hãy điền tên và lời chúc của bạn nhé.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await wishesApi.create({ name: name.trim(), message: message.trim() });
      setName("");
      setMessage("");
      toast({
        title: "Đã gửi lời chúc yêu thương!",
        description: "Cảm ơn bạn đã góp thêm một kỷ niệm đẹp vào ngày vui của chúng mình.",
      });
      await loadWishes();
    } catch (err) {
      toast({
        title: "Chưa gửi được lời chúc",
        description: err instanceof Error ? err.message : "Bạn hãy thử lại nhé.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="relative py-20 md:py-32 bg-section-gradient overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#214f42_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <Reveal animation="fade-up">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex justify-center mb-4">
              <SongHyEmblem size="md" variant="gold" />
            </div>
            <span className="text-[#c59e4e] font-serif font-medium tracking-[0.3em] uppercase text-xs md:text-sm">
              Lưu Giữ Kỷ Niệm
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#16382e] mt-2 mb-3 font-normal">
              Sổ Lưu Bút
            </h2>
            <GoldDivider label="LỜI CHÚC PHÚC" />
            <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed mt-2">
              Mỗi lời chúc chân thành của bạn chính là món quà vô giá đồng hành cùng chúng mình trên chặng đường mới.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Wish Input Form (5 cols) */}
          <Reveal animation="fade-right" delay={100} className="lg:col-span-5">
            <div className="relative rounded-3xl border border-[#d4af37]/40 bg-card/95 backdrop-blur-sm p-7 sm:p-9 shadow-card">
              <AsianCornerOrnaments />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="wish-name" className="block font-serif text-sm text-[#16382e] font-medium mb-1.5">
                    Họ và tên của bạn <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="wish-name"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Bạn thân thời đại học"
                    className="h-12 rounded-xl bg-background border-[#d4af37]/30 focus-visible:ring-[#16382e] font-body text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="wish-message" className="block font-serif text-sm text-[#16382e] font-medium mb-1.5">
                    Lời chúc yêu thương <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    ref={textarea}
                    id="wish-message"
                    required
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Gửi đến cô dâu & chú rể những điều tốt đẹp nhất..."
                    className="min-h-[140px] resize-y rounded-xl bg-background border-[#d4af37]/30 focus-visible:ring-[#16382e] p-3.5 leading-relaxed font-body text-sm"
                  />
                  <p className="text-right text-[11px] text-muted-foreground mt-1">
                    {message.length.toLocaleString("vi-VN")} / 2.000
                  </p>
                </div>

                {/* Suggestions */}
                <div>
                  <p className="font-serif text-xs text-[#c59e4e] mb-2 font-medium">
                    Gợi ý lời chúc:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => {
                          setMessage(suggestion.message);
                          textarea.current?.focus();
                        }}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors font-serif ${
                          message === suggestion.message
                            ? "border-[#d4af37] bg-[#16382e] text-[#fbf8f1]"
                            : "border-[#d4af37]/30 text-muted-foreground hover:border-[#d4af37] hover:text-[#16382e]"
                        }`}
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#16382e] hover:bg-[#1f483c] text-[#fbf8f1] border border-[#d4af37]/40 font-serif text-sm tracking-wider shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#e6ca85]" />
                      <span>Đang gửi lời chúc...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#e6ca85]" />
                      <span>Gửi Lời Chúc Phúc</span>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Wishes List (7 cols) */}
          <Reveal animation="fade-left" delay={200} className="lg:col-span-7">
            <div className="relative rounded-3xl border border-[#d4af37]/30 bg-card/85 backdrop-blur-sm p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#d4af37]/20">
                <h3 className="font-serif text-lg font-medium text-[#16382e]">
                  Những Lời Thương Mến
                </h3>
                <span className="font-serif text-xs px-3 py-1 rounded-full bg-secondary border border-[#d4af37]/30 text-[#c59e4e] font-semibold">
                  {total.toLocaleString("vi-VN")} lời chúc
                </span>
              </div>

              <div aria-live="polite" aria-busy={isLoading}>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-28 animate-pulse rounded-2xl border border-[#d4af37]/20 bg-background/60" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="rounded-2xl border border-border bg-background p-8 text-center" role="alert">
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => loadWishes()}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Thử lại
                    </Button>
                  </div>
                ) : wishes.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#d4af37]/30 bg-background/60 px-6 py-12 text-center">
                    <Heart className="mx-auto mb-3 h-8 w-8 text-[#c59e4e]" />
                    <h4 className="font-display text-2xl text-[#16382e]">Trang sổ đầu tiên đang chờ bạn</h4>
                    <p className="mx-auto mt-2 max-w-xs text-xs text-muted-foreground leading-relaxed">
                      Hãy gửi lời chúc đầu tiên để mở đầu cuốn sổ kỷ niệm của Hữu Tân &amp; Thuỳ Trang nhé!
                    </p>
                  </div>
                ) : (
                  <div className="max-h-[580px] space-y-3.5 overflow-y-auto pr-1">
                    {wishes.map((wish) => (
                      <article
                        key={wish.id}
                        className="relative rounded-2xl border border-[#d4af37]/25 bg-background/90 p-5 shadow-xs hover:border-[#d4af37]/50 transition-colors"
                      >
                        <Quote aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 text-[#d4af37]/20" />
                        <div className="mb-2.5 flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16382e] font-serif text-base text-[#e6ca85] shadow-xs"
                          >
                            {Array.from(wish.name.trim())[0]?.toLocaleUpperCase("vi-VN")}
                          </span>
                          <div className="min-w-0">
                            <h4 className="break-words font-serif text-sm font-semibold text-[#16382e]">
                              {wish.name}
                            </h4>
                            <time dateTime={wish.createdAt} className="block text-[11px] text-muted-foreground">
                              {new Date(wish.createdAt).toLocaleDateString("vi-VN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/80 italic font-body">
                          "{wish.message}"
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {!isLoading && !error && wishes.length < total && (
                <div className="mt-5 text-center">
                  {moreError && (
                    <p role="alert" className="mb-3 text-xs text-destructive">
                      {moreError}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    disabled={isLoadingMore}
                    onClick={loadMore}
                    className="rounded-full px-5 text-xs font-serif border-[#d4af37]/40 text-[#16382e] hover:bg-[#d4af37]/15"
                  >
                    {isLoadingMore ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#c59e4e]" />
                    ) : (
                      <ArrowDown className="mr-2 h-4 w-4 text-[#c59e4e]" />
                    )}
                    Xem thêm lời chúc
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
