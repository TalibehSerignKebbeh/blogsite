import { EditorContent, Editor, PasteRule, pasteRulesPlugin, resolveFocusPosition, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Highlight, { pasteRegex } from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import {Dropdown,DropdownSubmenu,} from '@tiptap/pm/menu'
// import Bold from '@tiptap/extension-bold';
import React, { useCallback } from 'react'
import styled from 'styled-components'
import ImageUpload from '../ImageUpload/ImageUpload';
import Preview from '../Preview';
import './editor.css'
import Link from '@tiptap/extension-link';
import UploadImage from '../Blog/Upload/UploadImage';
import MenuBar from './Menu/MenuBar';
import { Container } from './Container';

export default ({ blog, setblog, setPreview, preview }) => {

  const handleData = (e) => {
    if (e.target.name === "title") {
      setblog({ ...blog, [e.target.name]: e.target.value })
      // setData({ ...data, title: e.target.value })
    }
    if (e.target.name === "tags") {
      let tags = e.target.value.split(" ")
      setblog({ ...blog, tags })

      // setData({ ...data, tags })
    }
    if (e.target.name === "image") {
      setblog({ ...blog, [e.target.name]: e.target.value })
    

    }
  }

   const editor = useEditor({
    extensions: [
      StarterKit,
      // Bold.extend({
      //   renderHTML({ HTMLAttributes }) {
      //     // Original:
      //     // return ['strong', HTMLAttributes, 0]
      //     return ['b', HTMLAttributes, 0]
      //   },
      // }),
      resolveFocusPosition,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'blog-image'
        }
      }),
      //       Link.configure({
      //   validate: href => /^https?:\/\//.test(href),
      // })
      Link.configure({
        autolink: true, linkOnPaste: true,
        openOnClick: true, protocols: ['ftp', 'mailto'],
        HTMLAttributes: {
          class: 'blog-link',
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
 
    content: blog?.content, injectCSS: true,
    onBlur: ({ editor }) => {
      setblog({
        ...blog, content: editor.getHTML()
      })
     },
     onUpdate: ({ editor }) => {
      setblog({
        ...blog, content: editor.getHTML()
      })
    }
  })



  return (
    <Container>
      <div>
        <UploadImage />
        <div>
          <input autoComplete='on' type="text"
            name="title" onChange={handleData}
            value={blog?.title}
            placeholder="blog title here..."
            className="title-input"
          />
        </div>
        <div>
          <input autoComplete='on' type="text"
            name="image" onChange={handleData}
            value={blog?.image}
            placeholder="blog banner image url..."
            className="url-input"
          />
        </div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="content-editor"
        style={{color:`var(--text-color)`}}/>
        {/* <Editor /> */}
        <div>
          <input autoComplete='on' type="text" name="tags"
            onChange={handleData}
            value={blog?.tags?.join(' ')}
            placeholder="tags nature technology"
            className="tags" />
        </div>
        
      </div>
      <div>

      
      </div>
    </Container>
  )
}
