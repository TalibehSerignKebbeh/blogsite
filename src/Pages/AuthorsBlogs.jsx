import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../api';
import OvalLoader from '../components/Loader/OvalLoader';
import BlogCard from '../components/Blog/BlogCard';
import '../assets/css/author_blogs.css'
import { useEffect } from 'react';
import { useRef } from 'react';

const AuthorsBlogs = () => {
    const { author } = useParams()
    const [page, setpage] = useState(0);
    const [size, setsize] = useState(2);
    const [blogs, setblogs] = useState([]);
    const [total, settotal] = useState(0);
    const authorName = author?.slice(1, author?.length)

    const { data, isLoading, isSuccess,
        isError, error, failureReason } = useQuery({
        queryKey: ['author_blogs',authorName, page, size],
        queryFn:()=> AxiosInstance.get(`/blogs/user/${authorName}`,
            { params: { page: +page, size: +size } })
            .then(res => res?.data)
            .catch(err => Promise.reject(err))
        ,
         
        })
    
    const handleFetchMore = () => {
        if (total === blogs?.length) return;
        setpage(prev=>prev+1)
    }

    useEffect(() => {
        if (isSuccess) {
            settotal(data?.total)
const prevIds = blogs?.map(aBlog => aBlog?._id);
                const newBlogs = data?.blogs?.filter(aBlog => !prevIds?.includes(aBlog?._id))
            const lastBlogsArray = [...blogs, ...newBlogs]
            // console.log(lastBlogsArray);
            setblogs(prev => [...lastBlogsArray])
        }
        return () => {
            
        };
    }, [isSuccess]);
    
    return (
        <div>
             <div>
                {(isLoading && !blogs?.length) ?
                    <OvalLoader /> : blogs?.length?
                    <div className='blogs-wrapper blogs_container'>
                        <div style={{ width: '100%', marginBlock: '10px' }}>
                            <h2
                                style={{ color: 'var(--text-color)', fontSize:'2.6rem' }}
                            >{authorName}</h2>
                            <h3
                                style={{ color: 'var(--text-color)' }}
                            >
                                {data?.total>1? `${data?.total} blogs`: `${data?.total} blog`}
                            </h3>
                        </div>
                    {blogs?.map((blog, index) => (
                    <BlogCard blog={blog} key={index}/>
                    ))}
    
                        </div>
                        : isLoading ?
                            <OvalLoader />
                            :
                            <div>
                              <p>Something unexpected occurred</p>
                            </div>
                }
                {(blogs?.length) ?
                    <div className='fetch_more_wrapper'>
                        <p className='total_text'>
                            {blogs?.length + ' blogs of ' + total}
                        </p>
                        <button
                            onClick={handleFetchMore}
                        disabled={isLoading}
                        id='fetch_more_btn'
                    >
                      {isLoading? 'loading ...': 'fetch  More'}
                    </button>
                    </div>
               : null}
            </div>
        </div>
    );
}

export default AuthorsBlogs;
