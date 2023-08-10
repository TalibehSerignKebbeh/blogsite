import {
  EditorContent,
  Editor, PasteRule, pasteRulesPlugin,
  resolveFocusPosition, useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Highlight, { pasteRegex } from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { } from '@tiptap/pm/menu'
// import Bold from '@tiptap/extension-bold';
import React, { useCallback } from 'react'
import styled from 'styled-components'
// import Preview from '../Preview';
import '../editor.css'
import Link from '@tiptap/extension-link';
import MenuBar from '.././Menu/MenuBar';
import { Container } from '../Container';

export default ({ comment, setcomment, setPreview, preview }) => {



  const editor = useEditor({
    extensions: [
      StarterKit,
      resolveFocusPosition,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'comment-image'
        }
      }),

      Link.configure({
        autolink: true, linkOnPaste: true,
        openOnClick: true, protocols: ['ftp', 'mailto'],
        HTMLAttributes: {
          class: 'comment-link',
          target: '_blank'
        }
      }),
      PasteRule,
      pasteRulesPlugin,

      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: 'left', alignments: ['left', 'center', 'right'],
      }),
      Highlight.configure({
        multicolor: true, HTMLAttributes: {
          class: `text-hilighted`,

        }
      }),
      // Highlight.extend({
      //   renderHTML({ HTMLAttributes}) {
      //     return ['small',{...HTMLAttributes, class:`text-hilighted`}, 0 ]
      //   },

      // })


    ],

    content: comment, injectCSS: true,
    onBlur: ({ editor }) => {
      setcomment(editor.getHTML())
    },
    onUpdate: ({ editor }) => {
      setcomment(editor.getHTML())
    }
  })



  return (
    <Container>
      <div>

        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="content-editor" />

      </div>
      <div>
      </div>
    </Container>
  )
}

