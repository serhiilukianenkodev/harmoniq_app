import { TextStyle } from '@tiptap/extension-text-style';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef } from 'react';

export default function RichTextEditor({
  id,
  value,
  onChange,
  className,
  placeholder,
  maxLength,
}) {
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      TextStyle,
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Enter a text',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      if (!maxLength || text.length <= maxLength) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  // Автовисота
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div id={id} className={`${className} rtext-wrapper`}>
      <div className="toolbar">
        <MenuBar editor={editor} />
      </div>
      <div className="editor-container">
        <EditorContent
          editor={editor}
          ref={editorRef}
          className="ProseMirror"
        />
      </div>
      {maxLength && (
        <div className="char-counter">
          {editor?.getText().length || 0}/{maxLength}
        </div>
      )}
      <style jsx>{`
        .rtext-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }
        .toolbar {
          background: #f8f8f8;
          padding: 6px 8px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .toolbar button {
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .toolbar button:hover {
          background-color: #649179
        }
        .editor-container {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 12px;
          background: #fff;
        }
        .ProseMirror {
          min-height: 393px;
          width: 100%;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #595d62;
          float: left;
          height: 0;
          pointer-events: none;
        }

       @media only screen and (min-width: 393px) {
          .editor-container {
            width: 361px;
          }
        }

        @media only screen and (min-width: 768px) {
          .editor-container {
            width: 678px;
          }
        }
        @media only screen and (min-width: 1440px) {
          .editor-container {
            width: 783px;
          }
        }
}
      `}</style>
    </div>
  );
}

function MenuBar({ editor }) {
  if (!editor) return null;

  return (
    <>
      <button type='button' onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button type='button' onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
      <button type='button' onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      <button type='button' onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button type='button' onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </>
  );
}
