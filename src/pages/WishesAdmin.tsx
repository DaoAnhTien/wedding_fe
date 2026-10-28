import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Plus, Pencil, Trash2, Loader2, LogOut, RefreshCw } from 'lucide-react';
import { wishesApi, type Wish, type Page } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

const emptyForm = { name: '', message: '' };
const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.';

export default function WishesAdmin() {
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [page, setPage] = useState<Page<Wish>>({ items: [], total: 0 });
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [editor, setEditor] = useState<Wish | 'new' | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState<Wish | null>(null);

  const load = async (credential: string, nextOffset: number) => {
    setLoading(true); setError('');
    try {
      const data = await wishesApi.adminList(credential, nextOffset);
      setPage(data); setOffset(nextOffset); setToken(credential); setKey('');
    } catch (err) { setError(errorMessage(err)); }
    finally { setLoading(false); }
  };

  const openEditor = (wish: Wish | 'new') => {
    setEditor(wish); setForm(wish === 'new' ? emptyForm : { name: wish.name, message: wish.message }); setFormError('');
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving || editor === null) return;
    if (!form.name.trim() || !form.message.trim()) { setFormError('Vui lòng nhập tên và lời chúc.'); return; }
    setSaving(true); setFormError('');
    try {
      const data = { name: form.name.trim(), message: form.message.trim() };
      if (editor === 'new') await wishesApi.create(data);
      else await wishesApi.update(editor.id, data, token);
      setEditor(null); toast.success(editor === 'new' ? 'Đã thêm lời chúc.' : 'Đã cập nhật lời chúc.');
      await load(token, editor === 'new' ? 0 : offset);
    } catch (err) { setFormError(errorMessage(err)); }
    finally { setSaving(false); }
  };

  const remove = async () => {
    if (!deleting || saving) return;
    setSaving(true); setFormError('');
    try {
      await wishesApi.remove(deleting.id, token);
      setDeleting(null); toast.success('Đã xóa lời chúc.');
      await load(token, page.items.length === 1 ? Math.max(0, offset - 12) : offset);
    } catch (err) { setFormError(errorMessage(err)); }
    finally { setSaving(false); }
  };

  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-primary hover:underline">← Về trang cưới</Link>
        <header className="my-8 flex flex-wrap items-center justify-between gap-5">
          <div><p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary"><Feather className="h-4 w-4" /> Sổ lưu bút</p><h1 className="font-display text-4xl md:text-5xl">Quản lý lời chúc</h1><p className="mt-3 text-sm text-muted-foreground">Chăm chút những lời thương mến trong ngày vui.</p></div>
          {token && <div className="flex gap-2"><Button variant="outline" disabled={loading || saving} onClick={() => { setToken(''); setPage({ items: [], total: 0 }); setError(''); }}><LogOut className="mr-2 h-4 w-4" />Đăng xuất</Button><Button disabled={loading || saving} onClick={() => openEditor('new')}><Plus className="mr-2 h-4 w-4" />Thêm lời chúc</Button></div>}
        </header>
        {!token ? <form onSubmit={event => { event.preventDefault(); if (!loading) void load(key.trim(), 0); }} className="mx-auto max-w-md space-y-5 rounded-3xl border bg-background p-7 shadow-soft"><h2 className="font-display text-3xl">Truy cập quản lý</h2><p className="text-sm leading-6 text-muted-foreground">Nhập khóa quản trị đã cấu hình trên máy chủ để quản lý lời chúc.</p><div className="space-y-2"><Label htmlFor="admin-key">Khóa quản trị</Label><Input id="admin-key" type="password" autoComplete="off" required value={key} disabled={loading} onChange={event => setKey(event.target.value)} /></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={loading || !key.trim()} className="w-full">{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Mở sổ lưu bút</Button></form> : <>
          <div className="mb-5 flex items-center justify-between"><p className="text-sm text-muted-foreground">{page.total} lời chúc</p><Button variant="ghost" disabled={loading || saving} onClick={() => load(token, offset)}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Làm mới</Button></div>
          {error && <p role="alert" className="mb-5 rounded-xl border border-destructive/30 p-4 text-sm text-destructive">{error}</p>}
          <div aria-busy={loading} className={loading ? 'opacity-60' : ''}>
            {page.items.length === 0 ? <div className="rounded-2xl border border-dashed bg-background p-12 text-center text-muted-foreground">Chưa có lời chúc nào. Hãy thêm lời chúc đầu tiên.</div> : <div className="grid gap-4 md:grid-cols-2">{page.items.map(wish => <article key={wish.id} className="flex flex-col rounded-2xl border bg-background p-6 shadow-soft"><div className="flex items-start justify-between gap-3"><h2 className="break-words font-body font-semibold">{wish.name}</h2><span className="shrink-0 text-xs text-muted-foreground">#{wish.id}</span></div><time dateTime={wish.createdAt} className="mt-2 text-xs text-muted-foreground">{new Date(wish.createdAt).toLocaleString('vi-VN')}</time><p className="my-5 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground">{wish.message}</p><div className="flex justify-end gap-2 border-t pt-4"><Button variant="outline" size="sm" disabled={loading || saving} onClick={() => openEditor(wish)}><Pencil className="mr-2 h-3.5 w-3.5" />Sửa</Button><Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" disabled={loading || saving} onClick={() => { setDeleting(wish); setFormError(''); }}><Trash2 className="mr-2 h-3.5 w-3.5" />Xóa</Button></div></article>)}</div>}
          </div>
          <nav aria-label="Phân trang lời chúc" className="mt-7 flex items-center justify-center gap-4"><Button variant="outline" disabled={offset === 0 || loading || saving} onClick={() => load(token, Math.max(0, offset - 12))}>Trang trước</Button><span className="text-sm">{Math.floor(offset / 12) + 1} / {Math.max(1, Math.ceil(page.total / 12))}</span><Button variant="outline" disabled={offset + 12 >= page.total || loading || saving} onClick={() => load(token, offset + 12)}>Trang sau</Button></nav>
        </>}
        <Dialog open={editor !== null} onOpenChange={open => { if (!open && !saving) setEditor(null); }}><DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl"><DialogHeader><DialogTitle className="font-display text-3xl">{editor === 'new' ? 'Thêm lời chúc' : 'Chỉnh sửa lời chúc'}</DialogTitle><DialogDescription>Lời chúc sẽ hiển thị công khai trên trang cưới sau khi lưu.</DialogDescription></DialogHeader><form onSubmit={save} className="space-y-5"><fieldset disabled={saving} className="space-y-5"><div className="space-y-2"><Label htmlFor="edit-name">Tên người gửi</Label><Input id="edit-name" required maxLength={100} value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></div><div className="space-y-2"><Label htmlFor="edit-message">Lời chúc</Label><Textarea id="edit-message" required maxLength={2000} rows={7} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /><p className="text-right text-xs text-muted-foreground">{form.message.length} / 2.000</p></div></fieldset>{formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}<div className="flex justify-end gap-3"><Button type="button" variant="outline" disabled={saving} onClick={() => setEditor(null)}>Hủy</Button><Button disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Lưu lời chúc</Button></div></form></DialogContent></Dialog>
        <Dialog open={deleting !== null} onOpenChange={open => { if (!open && !saving) setDeleting(null); }}><DialogContent className="rounded-2xl"><DialogHeader><DialogTitle className="font-display text-3xl">Xóa lời chúc này?</DialogTitle><DialogDescription>Lời chúc của {deleting?.name} sẽ bị xóa vĩnh viễn khỏi sổ lưu bút.</DialogDescription></DialogHeader>{formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}<div className="flex justify-end gap-3"><Button variant="outline" disabled={saving} onClick={() => setDeleting(null)}>Giữ lại</Button><Button variant="destructive" disabled={saving} onClick={remove}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Xóa lời chúc</Button></div></DialogContent></Dialog>
      </div>
    </main>
  );
}
