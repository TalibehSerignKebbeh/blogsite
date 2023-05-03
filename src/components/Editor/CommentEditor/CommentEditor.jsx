import { EditorContent, Editor, PasteRule, pasteRulesPlugin, resolveFocusPosition, useEditor } from '@tiptap/react'
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
 
    content: comment?.content, injectCSS: true,
    onBlur: ({ editor }) => {
      setcomment(editor.getHTML())
    },
  })



  return (
    <Container>
      <div>
        
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="content-editor" />
        {/* <Editor /> */}
        
        {/* <div>
          <button className="preview-btn" onClick={() => {
            setPreview(!preview)
          }}>Preview</button>
        </div> */}
      </div>
      <div>

        {/* {preview && <Preview comment={comment} preview={preview}
        />} */}
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
      border-bottom: 1px solid #000;
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
    border: 1px solid #000;
    padding: 0.2rem;

    button {
    color: #000;
    outline: none;
    padding: 0.2rem;
    border: 1px solid #000;
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
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      border-left: 1px solid #000;
      padding: 0.2rem;
  }
  .tags{
      width: 100%;
      height: 1.5rem;
      margin: 1rem 0;
      padding: 0.2rem;
      border: none;
      border-bottom: 1px solid #000;
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
      height: 85%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid #333;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
 
@media (max-width: 760px){
  width:100%;
}
`;