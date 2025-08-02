// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { useEffect, useRef } from 'react';
// import css from './TiptapEditor.module.css';

// const TiptapEditor = ({ field, meta, form }) => {
//   const editorRef = useRef(null);

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: field.value || '', 
//     onUpdate: ({ editor }) => {
//       // Оновлення значення в Formik
//       form.setFieldValue(field.name, editor.getHTML());
//     },
//   });

//   // Автоскейлінг
//   useEffect(() => {
//     const updateHeight = () => {
//       if (editorRef.current) {
//         editorRef.current.style.height = 'auto';
//         editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
//       }
//     };

//     if (editor) {
//       editor.on('update', updateHeight);
//       updateHeight();
//     }

//     return () => {
//       if (editor) editor.off('update', updateHeight);
//     };
//   }, [editor]);

//   if (!editor) return null;

//   return (
//     <div className={`${css.txtareaWrapper} ${meta.touched && meta.error ? css.errorField : ''}`}>
//       <EditorContent
//         editor={editor}
//         ref={editorRef}
//         className={`${css.txtarea} ${meta.touched && meta.error ? css.errorField : ''}`}
//         placeholder="Enter a text"
//       />
//       {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
//     </div>
//   );
// };

// export default TiptapEditor;