import styled from "styled-components";

export const Container = styled.div`

  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: flex-start;
  margin: 2rem auto;
  padding:10px 20px;
  width: 90%;
  height:auto;
  background-color:var(--elements-bg);
  .title-input, .url-input, .tags{
      width: 100%;
     
      margin: 1rem 0;
      padding: 0.4rem;
      color:#333;
      border: none;
      border-bottom: 1px solid var(--text-color);
      outline: none;
      
     font-weight: 400; 
      font-size: 1.2rem;
      transition: all 0.3s ease-in-out;
      &:focus{
          border-bottom: 2px solid #11ff09;
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
      ${"" /* transform: translateY(-2px); */}
      background-color:#F5F5F5;
    }
    }
    button.is-active{
       background-color:#F5F5F5;
       color:#333;
    }
  }
  .content-editor{
      width: 100%;
      border:none;
      border-right: 1px solid var(--text-color);
      border-bottom: 1px solid var(--text-color);
      border-left: 1px solid var(--text-color);
        border-right: 1px solid var(--text-color);
      border-bottom: 1px solid var(--text-color);
      border-left: 1px solid var(--text-color);
      background-color:var(--elements-bg);
      padding: 0.2rem;
  }
   }
 
.title{
    padding-top:4px;
    font-weight: 400;
    margin-bottom:10px;
  color:#333;

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
    margin-bottom:20px; 
    margin-top:20px; 
  }
  .tags{
     margin:10px 0px;
  color:#333;

  }
  .info {
    display: flex;
    justify-content: start;
    align-items: center;

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
  .content-editor {
    > * + * {
      margin: 0.75em 0px;
      font-weight:400;
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
      margin-top:10px;
  color:var(--text-color);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,p{
  color:var(--text-color);

    }
  }
 
@media (max-width: 760px){
  width:100%;
  padding:10px 5px;
}
`;
