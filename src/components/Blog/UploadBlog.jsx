import React, {useState} from 'react';
import CustomEditor from '../Editor/CustomEditor';
import axios from 'axios';
import { apiUrl } from '../../api';
import './Upload.css'
import CustomBtn from '../Button/CustomBtn';
import { GetError } from '../Config';
import { useScoketContenxt } from '../../context/socketContext';
import DoneOutlineRounded  from '@mui/icons-material/DoneOutlineRounded';
import SuccessComponent from '../SuccessComponent';
import { useAccessToken, getAuthData } from '../../store/store';


const UploadBlog = () => {
  const {socket}= useScoketContenxt()

  const username = getAuthData()?.username;
  const name = getAuthData()?.name;
  const userId = getAuthData()?.id;
  const token = useAccessToken()
  
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
    
    if (!blog?.content?.length || !blog?.title?.length) {
      return;
    }
    setuploading(true)
    axios.post(`${apiUrl}/blogs`,
      {
         ...blog, created_at: Date.now(),
created_timezoneOffset: new Date().getTimezoneOffset()
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (e) => {
          
        }
    },
      
      )
            .then((response) => {
              console.log(response);
              const blogId = response?.data?.blogId;
              socket?.emit(`blogposted`,{blogId} )
              setuploadMessage({...uploadMessage, success:response?.data?.message})
            }).catch((err) => {
              console.log(err);
              setuploadMessage({...uploadMessage, error: GetError(err)})
        }).finally(()=>{setuploading(false)})
       
  }
  if (uploadMessage?.success?.length) {
    return <SuccessComponent 
      message={uploadMessage?.success}
      link={null}
      icon={<DoneOutlineRounded />}
    />
  }
    return (
      <div className='upload-container'>
         <section className='notice'>
          <p><strong>Note!</strong> blogs posted here
            will be review and publish by our team
          before anyone can read them</p>
        </section>
        <CustomEditor blog={blog} setblog={setblog}
          setPreview={setPreview} preview={preview} 
        />
       
        {uploadMessage?.success?.length ? 
          <p className='message success'>
            <span>
            {uploadMessage?.success}
            </span>
            <span onClick={() => {
              setuploadMessage({...uploadMessage, success:''})
            }}>
              x
            </span>

          </p> 
        : 
        null}
        {uploadMessage?.error?.length ? 
          <p className='message error'>
            <span>
              {uploadMessage?.error}
            </span>
            
            <span onClick={() => {
              setuploadMessage({...uploadMessage, error:''})
            }}>
              x
            </span>
          </p> 
        : 
        null}
        
        <div className='btns_wrapper'>

        <CustomBtn handleClick={handleBlogSubmit} 
            buttonclas={'blog-submit'}
            text={uploading ? `uploading` : `Submit Blog`}
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
