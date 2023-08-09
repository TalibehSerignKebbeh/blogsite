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
          <input autoComplete='on' type="text" name="title" onChange={handleData}
            value={blog?.title}
            placeholder="blog title here..." className="title-inp" />
        </div>
        <div>
          <input autoComplete='on' type="text" name="image" onChange={handleData}
            value={blog?.image}
            placeholder="blog banner image url..." className="title-inp" />
        </div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="content-editor"
        style={{color:`var(--text-color)`}}/>
        {/* <Editor /> */}
        <div>
          <input autoComplete='on' type="text" name="tags" onChange={handleData}
            value={blog?.tags?.join(' ')}
            placeholder="tags nature technology" className="tags" />
        </div>
        
      </div>
      <div>

      
      </div>
    </Container>
  )
}

const Container = styled.div`

  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: flex-start;
  margin: 2rem auto;
  width: 80%;
  height:auto;
  .title-inp{
      width: 100%;
      height: 1.5rem;
      margin: 1rem 0;
      padding: 0.2rem;
      border: none;
      border-bottom: 1px solid var(--text-color);
      outline: none;
      ${'' /* font-weight: 400; */}
      font-size: 1.2rem;
      transition: all 0.3s ease-in-out;
      &:focus{
          border-bottom: 1px solid #11ff09;
      }      
}
  .menu-bar{
    width: 100%;
    border: 1px solid var(--text-color);
    padding: 0.2rem;

    button {
    color: var(--text-color);
    outline: none;
    padding: 0.2rem;
    border: 1px solid var(--text-color);
    background: none;
    margin: 0.2rem 0.2rem;
    cursor: pointer;
    font-family: "JetBrainsMono", monospace;
    font-size: 1rem;
    
    &:hover {
      ${'' /* transform: translateY(-2px); */}
      background-color:#F5F5F5;
    }
    }
    button.is-active{
       background-color:#F5F5F5;
    }
  }
  .content-editor{
      width: 100%;
      border:none;
      border-right: 1px solid var(--text-color);
      border-bottom: 1px solid var(--text-color);
      border-left: 1px solid var(--text-color);
      padding: 0.2rem;
  }
  .tags{
      width: 100%;
      height: 1.5rem;
      margin: 1rem 0;
      padding: 0.2rem;
      border: none;
      border-bottom: 1px solid var(--text-color);
      outline: none;
      ${'' /* font-weight: 600; */}
      font-size: 1.2rem;
      transition: all 0.3s ease-in-out;
      &:focus{
          border-bottom: 1px solid #00fbff;
      }
  }
 

  /* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  outline: none;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }
  h1{
    font-size:30px;
  }
  h2{
    font-size:27px;
  }
  h3{
    font-size:24px;
  }
  h4{
    font-size:23px;
  }
   h5{
    font-size:21px;
  }
   h6{
    font-size:19px;
  }
  p{
    font-size:18px;
  }
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
      display: block;
      width: 85%;
      max-height:400px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid var(--text-color);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
 
@media (max-width: 760px){
  p{
    font-size:15px;
  }
  }
  h1{
    font-size:28px;
  }
  h2{
    font-size:25px;
  }
  h3{
    font-size:23px;
  }
  h4{
    font-size:21px;
  }
   h5{
    font-size:19px;
  }
   h6{
    font-size:17px;
  }
}
@media (max-width: 480px){
  p{
    font-size:14px;
  }
  }
  h1{
    font-size:26px;
  }
  h2{
    font-size:24px;
  }
  h3{
    font-size:22px;
  }
  h4{
    font-size:19px;
  }
   h5{
    font-size:17px;
  }
   h6{
    font-size:15px;
  }
}
`;