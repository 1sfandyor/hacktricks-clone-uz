import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

export type EditorValue = any;

const WikiEditor = ({ value, onChange }: { value: EditorValue; onChange: (val: EditorValue) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit, Heading.configure({ levels: [1, 2, 3, 4] })],
    content: value,
    autofocus: "end",
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) editor.commands.setContent(value);
  }, [value, editor]);

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">Bold</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">Italic</button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">• List</button>
        <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">Code</button>
        <button onClick={() => editor?.chain().focus().setHeading({ level: 1 }).run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">H1</button>
        <button onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">H2</button>
        <button onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()} className="px-2 py-1 text-sm rounded-md bg-secondary/60 hover:bg-secondary">H3</button>
      </div>
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4 min-h-[300px]" />
    </div>
  );
};

export default WikiEditor;
