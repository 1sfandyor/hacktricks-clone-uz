import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ensureSeed, getFirstPageSlug } from "@/lib/wikiStorage";

const Index = () => {
  ensureSeed();
  const slug = getFirstPageSlug();
  return <Navigate to={`/p/${slug}`} replace />;
};

export default Index;
