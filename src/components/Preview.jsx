import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

const Preview = ({ blog, preview }) => {


  return (
    <BlogContainer className={`${preview}? "show":""`}
      style={{ height: preview ? 'auto' : '0px', transition: 'height ease .5s' }}>
      <h1 className='title'>{blog?.title}</h1>
      <h4>{blog?.date}</h4>
      {blog?.image && <img className='blog-banner' src={`${blog?.image}`} />}
      {/* </div> */}
      <div className='blog'>
        {parse(blog?.content || '')}
      </div>
      {blog?.tags?.length ?
        <p className='tags'>
          {blog?.tags?.map((tag, id) =>
            (<small className='tag' key={id}>{tag}</small>))}
        </p> : null}
    </BlogContainer>
  );
}

export default Preview;


export const BlogContainer = styled.div`
  margin: 5px auto;
  align-self:baseline;
  border-radius:6px;
  padding: 0 1rem;
  magin-top:1.5rem;
  ${'' /* background: var(--blog-view-bg); */}
  color:var(--text-color);
  text-align:start;
  height:auto;
    ${'' /* background-color: #333131; */}
  ${'' /* box-shadow:2px 1px 5px 0px rgba(0,0,0,0.09), 0px 1px 5px 2px rgba(0,0,0,0.09); */}
  box-shadow: 0px 22px 56px -44px rgba(0,0,0,0.1);
  .title{
    padding-top:4px;
    font-weigth: 400;
    magin-bottom:10px;
  color:var(--text-color);

  }
   img {
     display: block;
      width: 85%;
      max-height: 400px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }
  .blog-banner{
    width:100%;
    height:400px;
    ${'' /* margin:10px 0px; */}
    margin-bottom:20px; 
  }
  .tags{
     margin:10px 0px;
  color:var(--text-color);

  }
  .info {
    display: flex;
    justify-content: start;
    align-items: center;
    ${'' /* margin: 0 1rem; */}
    text-align:start;
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
  .content {
    > * + * {
      margin: 0.75em 0px;
      font-weigth:400;
    }
    outline: none;
    ${'' /* margin: 0 1rem; */}
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
      margin-top:10px;
  color:var(--text-color);

    }
      h1,
    h2,
    h3{
      margin-top:20px;
    }
    .blog-link{
      color:#006699; 
      cursor: pointer;
    }
    p,code,pre,code{
      text-align:start;
      margin-bottom:15px;
    }
 
    p{
      font-size:15px ;
      padding:10px 0px;
  color:var(--text-color);

      ${'' /* text-align: ; */}
    }
    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.9rem;
      }
    }
   
 blockquote {
    padding-left: 1rem;
    border-left: 2px solid #333;
  }
    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
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

p,li,span, strong, h1, h2,h3,h4,h5,h6
 {
  color:var(--text-color)
}
p>code{
  color:var(--text-color);  
  ${'' /* background-color:var(--code-color); */}
}
blockquote{
 color:var(--code-color);
 background-color: var(--code-bg-color);
}
pre{
  background-color:var(--elements-bg);
  color:var(--text-color);
}
}
`;

