import React, { useEffect, useState } from 'react';
import ReactQuill, {QuillOptions, Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');
  const [blogs, setblogs] = useState([]);

  const handleSubmitBlog = () => {
    const newBlogs = [...blogs, value]
    setblogs(newBlogs)
    localStorage.setItem('blogs', JSON.stringify(newBlogs))
   setValue('')
  }
  const HandleFilterBlogs=(index) => {
    console.log(blogs?.at(index));
    const filteredBlogs = blogs?.filter((blog, blogIndex) => {
      if (blogIndex === index) return null;
      return blog;
    })
    setblogs(filteredBlogs)
        localStorage.setItem('blogs', JSON.stringify(filteredBlogs))

  }
  useEffect(() => {
    setblogs(JSON.parse(localStorage.getItem('blogs')) || [])
    return () => {
      
    };
  }, []);
  return (
    <div className='blog-container'>
      <ReactQuill    theme="snow" value={value}
        onChange={setValue} 
        style={{minWidth:'500px', maxWidth:'600px', minHeight:'250px'}}
      />
      <button style={{ margin: '30px auto' }}
        onClick={handleSubmitBlog}
        className='submit-btn'>Submit</button>
      
      {blogs?.map((blog, index) => (
        <div key={index}
        style={{
            margin:'30px 0',
            textAlign:'justify',
            maxWidth: '700px', padding:'20px 8px',
            backgroundColor: 'white',
          boxShadow: '0px 0px 0px 1px rgba(0,0,0, 0.08), 0px 0px 4px 0px rgba(0,0,0, 0.8)',
            
          }} >
        <div 
          dangerouslySetInnerHTML={{ __html: blog }}
        >
          </div>
          <button title='remove blog'
            onClick={e=>HandleFilterBlogs(index)}
            style={{ color: 'red', float: 'right', marginTop: '-12px', padding: '4px 6px' }}>
            X</button>
          </div>
      ))}
    </div>
  );
}


export default MyComponent