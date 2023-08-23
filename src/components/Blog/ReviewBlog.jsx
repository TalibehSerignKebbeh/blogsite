import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './viewblog.css'
import { useScoketContenxt } from '../../context/socketContext';
import { getAuthData, useAccessToken } from '../../store/store';
import ABlog from './ABlog';

const ReviewBlog = () => {
    let loadedData = useLoaderData()
    const { socket } = useScoketContenxt()
    const [blog, setblog] = useState({...loadedData});
    const token = useAccessToken()
    const userId = getAuthData()?.id;
    const isAdmin = getAuthData()?.role === 'admin';
    let imageLink = blog?.image?.startsWith('http') ? blog?.image :
        blog?.image?.length ? `${ImageUrl}/${blog?.image}` : '';
    

     useEffect(() => {
       
        if (blog?.notification &&  !blog?.notification?.read && isAdmin) {
            socket?.emit(`read_notification`,
                {
                    ids: [...blog?.notification?._id],
                    date: new Date(), userId: userId
                }
            )
         }
         
         socket?.on(`blog_publish_${blog?._id}`, (blog) => {
             if (blog) {
                 setblog({...blog})
             }
         })

        return () => {

        };
    }, [socket]);
    return (
        <div className='view-container`'>
            <ABlog blog={blog} setblog={setblog} />
            
        </div>
    );
}

export default ReviewBlog;
