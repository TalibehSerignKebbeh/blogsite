import React, {useState} from 'react';
import CustomEditor from '../Editor/CustomEditor';
import axios from 'axios';
import { apiUrl } from '../../api';
import './Upload.css'
import { useContextHook } from '../../context/AuthContext';
import CustomBtn from '../Button/CustomBtn';
import { GetError } from '../Config';


const UploadBlog = () => {
  const { authToken } = useContextHook()
  const [uploadMessage, setuploadMessage] = useState({
    error:``, success:``
  });
  const [preview, setPreview] = useState(false)
  const [uploading, setuploading] = useState(false);
  const [blog, setblog] = useState({
     title: "",
       tags: [],
       image:``,
    content: "",
  });

  const handleReset = () => {
    setblog({...blog,
      title: '', tags: [],
      image: '', content: ''
    })
    setuploadMessage({err:"", success:''})
  }

  const handleBlogSubmit = async (e) => {
    setuploadMessage({error:``, success:``})
    
    setuploading(true)
    if (!blog?.content?.length || !blog?.title?.length) {
      return;
    }
    axios.post(`${apiUrl}/blogs`,
      {
         ...blog, created_at: Date.now(),
created_timezoneOffset: new Date().getTimezoneOffset()
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          
        }
    },
      
      )
            .then((response) => {
              console.log(response);
              setuploadMessage({...uploadMessage, success:response?.data?.message})
            }).catch((err) => {
              console.log(err);
              setuploadMessage({...uploadMessage, error: GetError(err)})
        }).finally(()=>{setuploading(false)})
        // const confirm = window.confirm("Are you sure to submit this blog")
        // console.log(confirm);
    }
    return (
        <div className='upload-container'>
        <CustomEditor blog={blog} setblog={setblog}
          setPreview={setPreview} preview={preview} 
        />
        {uploadMessage?.success?.length ? 
        <p className='message success'>{ uploadMessage?.success}</p> 
        : 
        null}
        {uploadMessage?.error?.length ? 
        <p className='message error'>{uploadMessage?.error}</p> 
        : 
        null}
        
        <div className='btns_wrapper'>

        <CustomBtn handleClick={handleBlogSubmit} 
          buttonclas={'blog-submit'} text={uploading? `uploading`: `Submit Blog`}
        />

        <CustomBtn 
          handleClick={handleReset}
          buttonclas={'reset-btn'}

          text={'Reset'}
          />
        </div>
          
        </div>
    );
}

export default UploadBlog;
