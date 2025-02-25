// import './styles.scss'
// import "./editor.css"
import "./style.css"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

export const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group" style={{display:'flex', flexWrap:'wrap', rowGap:'24px', width:"100%"}}>
      <div className="button-group">
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active editor-btn' : 'editor-btn'}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active editor-btn' : 'editor-btn'}

        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active editor-btn' : ' editor-btn'}

        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active editor-btn' : ' editor-btn'}

        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active editor-btn' : ' editor-btn'}

        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active editor-btn' : ' editor-btn'}

        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active editor-btn' : ' editor-btn'}

        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active editor-btn' : ' editor-btn'}
          // className='tiptap-toolbar button'
          >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={editor.isActive('horizontalrule') ? 'is-active editor-btn' : ' editor-btn'}
          >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}
          className={editor.isActive('hardBreak') ? 'is-active editor-btn' : ' editor-btn'}
          >
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className={editor.isActive('undo') ? 'is-active editor-btn' : ' editor-btn'}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className={editor.isActive('redo') ? 'is-active editor-btn' : ' editor-btn'}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('Purple') ? 'is-active editor-btn' : ' editor-btn'}

        >
          Color
        </button>
      </div>
    </div>
  )
}

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export const content = 
  `
<h2>
  Please enter blog content here...
</h2>
`
// [
// //  <div className="textarea" style={{content: "Start writing...",
// //   color: '#aaa',
// //   fontStyle: 'italic',
// //   pointerEvents: 'none',}}>
// //   <p>Start writting</p>
// //  </div>
// ]



export default ({setContent}) => {
   return (
    <EditorProvider  editorContainerProps={{className:"container" }}  onUpdate={({ editor }) =>setContent(editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
  )
}