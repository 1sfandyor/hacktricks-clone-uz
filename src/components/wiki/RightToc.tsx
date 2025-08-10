export type TocItem = { id: string; text: string; level: number };

const RightToc = ({ items }: { items: TocItem[] }) => {
  return (
    <aside className="hidden xl:block w-64 shrink-0 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto p-4">
      <div className="text-sm font-semibold mb-2 text-muted-foreground">HackTricks</div>
      <nav className="space-y-1">
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ paddingLeft: `${(i.level - 1) * 12}px` }}>
            {i.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default RightToc;
