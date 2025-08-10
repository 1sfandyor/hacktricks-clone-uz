import { useMemo, useState } from "react";
import { ensureSeed, getPages, savePages, upsertPage } from "@/lib/wikiStorage";
import WikiEditor, { EditorValue } from "@/components/wiki/Editor";
import { WikiPage } from "@/types/wiki";
import PageLayout from "@/components/wiki/PageLayout";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  ensureSeed();
  const [pages, setPages] = useState<WikiPage[]>(getPages());
  const [currentId, setCurrentId] = useState<string>(pages[0]?.id);
  const current = useMemo(() => pages.find(p => p.id === currentId) || pages[0], [pages, currentId]);

  const onSave = () => {
    if (!current) return;
    const updated = { ...current, updatedAt: new Date().toISOString() };
    upsertPage(updated);
    setPages(getPages());
    toast({ title: "Saqlandi", description: `${updated.title} yangilandi.` });
  };

  const onChange = (val: EditorValue) => {
    if (!current) return;
    setPages(prev => prev.map(p => p.id === current.id ? { ...p, contentJson: val } : p));
  };

  const addNew = () => {
    const title = prompt("Sahifa nomi?") || "Yangi sahifa";
    const slug = prompt("Slug? (url qismi)", title.toLowerCase().replace(/\s+/g, "-")) || "new-page";
    const page: WikiPage = {
      id: crypto.randomUUID(),
      title, slug,
      contentJson: { type: "doc", content: [{ type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: title }] }] },
      updatedAt: new Date().toISOString(),
    };
    const all = [...pages, page];
    savePages(all);
    setPages(all);
    setCurrentId(page.id);
  };

  return (
    <PageLayout toc={[]}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <div className="flex gap-2">
            <button onClick={addNew} className="px-3 py-1.5 rounded-md border bg-secondary/50 hover:bg-secondary">Yangi sahifa</button>
            <button onClick={onSave} className="px-3 py-1.5 rounded-md border bg-primary text-primary-foreground hover:brightness-110">Saqlash</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
          <div className="rounded-lg border p-2 bg-card">
            <div className="text-sm font-semibold px-2 py-2">Sahifalar</div>
            <div className="space-y-1">
              {pages.map(p => (
                <button key={p.id} onClick={() => setCurrentId(p.id)} className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${p.id===current?.id? 'bg-sidebar-accent text-foreground':'hover:bg-secondary/40 text-muted-foreground'}`}>{p.title}</button>
              ))}
            </div>
          </div>
          <div>
            {current && (
              <div className="space-y-4">
                <input
                  className="w-full rounded-md border bg-background px-3 py-2"
                  value={current.title}
                  onChange={(e) => setPages(prev => prev.map(p => p.id===current.id? { ...p, title: e.target.value }: p))}
                />
                <input
                  className="w-full rounded-md border bg-background px-3 py-2"
                  value={current.slug}
                  onChange={(e) => setPages(prev => prev.map(p => p.id===current.id? { ...p, slug: e.target.value }: p))}
                />
                <WikiEditor value={current.contentJson} onChange={onChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Admin;
