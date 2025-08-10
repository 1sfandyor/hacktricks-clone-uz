import { WikiPage, WikiMenuGroup } from "@/types/wiki";

const STORAGE_KEY = "wiki_pages_v1";
const MENU_KEY = "wiki_menu_v1";

const defaultPages: WikiPage[] = [
  {
    id: crypto.randomUUID(),
    title: "HackTricks",
    slug: "hacktricks",
    contentJson: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "HackTricks" }] },
        { type: "paragraph", content: [{ type: "text", text: "HackTricks uslubidagi demo sahifa. Quyida sarlavhalar va kod bloklari misoli keltirilgan." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Run HackTricks Locally" }] },
        {
          type: "codeBlock",
          attrs: { language: "bash" },
          content: [
            { type: "text", text: "git clone https://github.com/example/repo\ncd repo\nnpm i\nnpm run dev" }
          ]
        },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Generic Methodologies" }] },
        { type: "paragraph", content: [{ type: "text", text: "Bu bo'limda umumiy metodologiyalar jamlangan." }] }
      ]
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Pentesting Methodology",
    slug: "pentesting-methodology",
    contentJson: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "Pentesting Methodology" }] },
        { type: "paragraph", content: [{ type: "text", text: "Pentest jarayonlari: rejalashtirish, razvedka, ekspluatatsiya, reporting." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Recon" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Subdomain enumeration" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Port scanning" }] }] }
        ]}
      ]
    },
    updatedAt: new Date().toISOString(),
  }
];

const defaultMenu: WikiMenuGroup[] = [
  {
    id: "welcome",
    label: "WELCOME!",
    pages: [defaultPages[0].id]
  },
  {
    id: "generic",
    label: "GENERIC METHODOLOGIES & RESOURCES",
    pages: [defaultPages[1].id]
  }
];

export function ensureSeed() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPages));
  }
  if (!localStorage.getItem(MENU_KEY)) {
    localStorage.setItem(MENU_KEY, JSON.stringify(defaultMenu));
  }
}

export function getPages(): WikiPage[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as WikiPage[]) : [];
}

export function savePages(pages: WikiPage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function getMenu(): WikiMenuGroup[] {
  const raw = localStorage.getItem(MENU_KEY);
  return raw ? (JSON.parse(raw) as WikiMenuGroup[]) : [];
}

export function saveMenu(menu: WikiMenuGroup[]) {
  localStorage.setItem(MENU_KEY, JSON.stringify(menu));
}

export function upsertPage(page: WikiPage) {
  const pages = getPages();
  const idx = pages.findIndex(p => p.id === page.id);
  if (idx >= 0) pages[idx] = page; else pages.push(page);
  savePages(pages);
}

export function getPageBySlug(slug: string) {
  return getPages().find(p => p.slug === slug);
}

export function getFirstPageSlug() {
  const pages = getPages();
  return pages[0]?.slug || "hacktricks";
}
