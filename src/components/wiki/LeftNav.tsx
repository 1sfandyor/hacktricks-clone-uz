import { Link, useLocation } from "react-router-dom";
import { getMenu, getPages } from "@/lib/wikiStorage";

const LeftNav = () => {
  const menu = getMenu();
  const pages = getPages();
  const { pathname } = useLocation();

  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r h-[calc(100vh-56px)] sticky top-14 overflow-y-auto p-3">
      <div className="space-y-6">
        {menu.map(group => (
          <div key={group.id}>
            <div className="text-xs font-semibold text-muted-foreground mb-2">{group.label}</div>
            <div className="space-y-1">
              {group.pages.map(pid => {
                const p = pages.find(pp => pp.id === pid);
                if (!p) return null;
                const active = pathname === `/p/${p.slug}` || (pathname === "/" && p.slug === "hacktricks");
                return (
                  <Link
                    key={p.id}
                    to={`/p/${p.slug}`}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {p.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftNav;
