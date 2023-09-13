import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './viewblog.css'
import { useScoketContenxt } from '../../context/socketContext';
import ABlog from './ABlog';
import UseAuth from '../../hooks/useAuth';
const ReviewBlog = () => {
    let loadedData = useLoaderData()
    console.log(loadedData?.author);
    const { socket } = useScoketContenxt()
    const [blog, setblog] = useState({...loadedData});
    const {isAdmin, id } = UseAuth()
    
    let imageLink = blog?.image?.startsWith('http') ? blog?.image :
        blog?.image?.length ? `${ImageUrl}/${blog?.image}` : '';
    

     useEffect(() => {
       
        if (blog?.notification &&  !blog?.notification?.read && isAdmin) {
            socket?.emit(`read_notification`,
                {
                    ids: [...blog?.notification?._id],
                    date: new Date(), userId: id
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
            <ABlog blog={{...blog, image: imageLink }}
            setblog={setblog} />
            
        </div>
    );
}

export default ReviewBlog;
