import React, { useState } from 'react';
import CustomEditor from '../../Editor/CustomEditor';
import { useLoaderData } from 'react-router-dom';
import CustomBtn from '../../Button/CustomBtn';
import { AxiosInstance } from '../../../api';
import { GetError } from '../../Config';
import './index.css'

const blogInit = {
    _id:'',
    title: "",
    tags: [],
    image: ``,
    //  image:{file:null, preview:null},
    content: "",
}
const EditBlog = () => {
    const responseData = useLoaderData()
    const [blog, setblog] = useState(responseData?.blog || blogInit);
    const [preview, setpreview] = useState(false);
    const [updating, setupdating] = useState(false);
    const [updateRespMessages, setupdateRespMessages] = useState({
        error: '', success: ''
    });
    // console.log(blog);
    const handleBlogUpdate = async () => {
        setupdating(true)
        setupdateRespMessages({success:``,error:``})
        await AxiosInstance.put(`/blogs/${blog?._id}`,
            {
                ...blog,updated_at: Date.now(),
updated_timezoneOffset:new Date().getTimezoneOffset(),
            })
            .then((res) => {
                setupdateRespMessages({
                    ...updateRespMessages,
                    success: res?.data?.message
                })
                
            }).catch((err) => {
                setupdateRespMessages({
                    ...updateRespMessages,
                error: GetError(err)})
            }).finally(() => {
                window.scrollTo({top:0, behavior:'smooth'})
            setupdating(false)
            
        })
    }
    return (
        <div className='upload-container'>
            {updateRespMessages?.success?.length ?
                <p className='message success'>
                    <span>{updateRespMessages?.success}</span>
                    <button className='close'>X</button>
                    
                </p> : null}
            {updateRespMessages?.error?.length ?
                <p className='message error'>
                    <span>{updateRespMessages?.error}</span>
                    <button className='close'>X</button>
                  
                </p> : null}

            <CustomEditor preview={preview}
                setPreview={setpreview} blog={blog}
                setblog={setblog}
            />
            
            <CustomBtn handleClick={handleBlogUpdate}
                buttonclas={`blog-submit`}
                text={updating? 'upading...' : `Edit Blog`}
            />
        </div>
    );
}

export default EditBlog;
