import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { TocItem } from "./RightToc";

export function useTocFromRendered(container: HTMLElement | null) {
  const [items, setItems] = useState<TocItem[]>([]);
  useEffect(() => {
    if (!container) return;
    const heads = Array.from(container.querySelectorAll("h1, h2, h3")) as HTMLHeadingElement[];
    const list: TocItem[] = heads.map((h) => {
      const text = h.textContent || "";
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      if (!h.id) h.id = id;
      return { id, text, level: Number(h.tagName.slice(1)) };
    });
    setItems(list);
  }, [container?.innerHTML]);
  return items;
}

const ContentRenderer = ({ json }: { json: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Heading.configure({ levels: [1, 2, 3] })],
    content: json,
  });

  const toc = useTocFromRendered(ref.current);

  return (
    <div ref={ref} className="prose prose-invert max-w-none">
      {editor ? <EditorContent editor={editor} /> : null}
      {/* Expose TOC via data attribute for parent access if needed */}
      <div data-toc={JSON.stringify(toc)} className="hidden" />
    </div>
  );
};

export default ContentRenderer;
