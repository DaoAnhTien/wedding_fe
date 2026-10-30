import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const InvitationsAdmin = () => {
  const [names, setNames] = useState("");
  const guests = [...new Set(names.split(/\r?\n/).map((name) => name.trim()).filter(Boolean))];
  const tooLong = guests.some((name) => name.length > 120);
  const invitations = guests.map((name) => {
    const url = new URL(`${import.meta.env.BASE_URL}moi/${encodeURIComponent(name)}`, window.location.origin);
    return { name, url: url.href };
  });

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Đã sao chép", description: "Bạn có thể dán để gửi lời mời." });
    } catch {
      toast({ title: "Chưa sao chép được", description: "Hãy chọn và sao chép đường link trực tiếp.", variant: "destructive" });
    }
  };

  const download = () => {
    const content = invitations.map(({ name, url }) => `${name}\n${url}`).join("\n\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "danh-sach-thiep-moi.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link to="/" className="text-sm text-primary underline">← Về thiệp cưới</Link>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Tạo lời mời riêng</h1>
          <p className="mt-3 text-muted-foreground">Nhập mỗi khách trên một dòng, kèm cách xưng hô bạn muốn hiển thị. Link được tạo ngay để bạn gửi qua Zalo hoặc Messenger.</p>
        </div>
        <div className="rounded-2xl border bg-card p-5 space-y-3">
          <label htmlFor="guest-list" className="font-semibold">Danh sách khách mời</label>
          <textarea id="guest-list" rows={7} value={names} onChange={(event) => setNames(event.target.value)}
            placeholder={"Anh Tuấn và gia đình\nChị Lan\nBạn Minh"}
            className="w-full rounded-lg border bg-background p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-describedby="guest-help" />
          <p id="guest-help" className="text-sm text-muted-foreground">Tên trùng được gộp lại. Tối đa 120 ký tự mỗi tên. Danh sách không được lưu khi tải lại trang.</p>
          {tooLong && <p role="alert" className="text-destructive">Vui lòng rút gọn tên dài quá 120 ký tự để tên trên thiệp hiển thị đầy đủ.</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="mr-auto" aria-live="polite">{guests.length} khách mời</p>
          <Button variant="outline" disabled={!guests.length || tooLong} onClick={download}>Tải danh sách .txt</Button>
          <Button disabled={!guests.length || tooLong} onClick={() => copy(invitations.map(({ name, url }) => `${name}\n${url}`).join("\n\n"))}>Sao chép tất cả</Button>
        </div>
        {!guests.length && <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">Nhập tên khách phía trên để tạo link mời.</p>}
        {!tooLong && invitations.map(({ name, url }) => (
          <article key={name} className="rounded-xl border bg-card p-5 space-y-3">
            <h2 className="font-display text-xl break-words">{name}</h2>
            <input aria-label={`Link mời ${name}`} value={url} readOnly onFocus={(event) => event.target.select()} className="w-full rounded-md border bg-background p-2 text-sm" />
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => copy(url)}>Sao chép link</Button>
              <Button asChild variant="outline"><a href={url} target="_blank" rel="noreferrer">Xem thiệp</a></Button>
            </div>
          </article>
        ))}
        <p className="text-sm text-muted-foreground">Hãy tạo link tại địa chỉ website chính thức trước khi gửi. Người nhận sẽ thấy tên trong link; bạn có thể chỉnh tên rồi tạo lại link bất cứ lúc nào.</p>
      </div>
    </main>
  );
};

export default InvitationsAdmin;
