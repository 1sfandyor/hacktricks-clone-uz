export type WikiPage = {
  id: string;
  title: string;
  slug: string;
  contentJson: any; // Tiptap JSON
  updatedAt: string;
};

export type WikiMenuGroup = {
  id: string;
  label: string;
  pages: string[]; // page ids
};
