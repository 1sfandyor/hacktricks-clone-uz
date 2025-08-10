import PageLayout from "@/components/wiki/PageLayout";
import ContentRenderer from "@/components/wiki/ContentRenderer";
import { ensureSeed, getPageBySlug } from "@/lib/wikiStorage";
import { useEffect, useMemo, useRef, useState } from "react";
import { TocItem } from "@/components/wiki/RightToc";
import { useParams } from "react-router-dom";

const WikiPage = () => {
  const params = useParams();
  const [toc, setToc] = useState<TocItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  ensureSeed();
  const page = useMemo(() => getPageBySlug(params.slug || "hacktricks"), [params.slug]);

  useEffect(() => {
    if (page?.title) {
      document.title = `${page.title} | HackTricks-like Wiki`;
    }
  }, [page?.title]);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      const data = containerRef.current.querySelector('[data-toc]')?.getAttribute('data-toc');
      if (data) setToc(JSON.parse(data));
    } catch {}
  }, [params.slug, page?.updatedAt]);

  if (!page) return null;

  return (
    <PageLayout toc={toc}>
      <article ref={containerRef}>
        <ContentRenderer json={page.contentJson} />
      </article>
    </PageLayout>
  );
};

export default WikiPage;
