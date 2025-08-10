import Header from "./Header";
import LeftNav from "./LeftNav";
import RightToc, { TocItem } from "./RightToc";
import { ReactNode } from "react";

const PageLayout = ({ children, toc }: { children: ReactNode; toc: TocItem[] }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[18rem_1fr] xl:grid-cols-[18rem_1fr_16rem] gap-0">
        <LeftNav />
        <main className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8">
          {children}
        </main>
        <RightToc items={toc} />
      </div>
    </div>
  );
};

export default PageLayout;
