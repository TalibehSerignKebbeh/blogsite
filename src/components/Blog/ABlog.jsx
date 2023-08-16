import React from 'react';
import { BlogContainer } from '../Preview';
import parse from 'html-react-parser'
import RequireRole from '../Auth/RequireRole';
import ActionBtn from './ActionBtn';
import { useContextHook } from '../../context/AuthContext';
import './ablog.css'
import ThumbUpRounded from '@mui/icons-material/ThumbUpRounded';
import UseAuth from '../../hooks/useAuth';
import { AxiosInstance, ImageUrl } from '../../api';
import { useState } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import BlogUserProfile from './BlogUserProfile';

const ABlog = ({ blog, setblog }) => {
    // console.log(blog?.author);
    const { authToken } = useContextHook()
    const { id } = UseAuth()
    const [likeLoading, setlikeLoading] = useState(false);

    const userLikedBlog = blog?.likes?.find(object => object?.user?._id === id)

    const LikedBlog = async () => {
        console.log('liking');
        if (likeLoading) return;
        setlikeLoading(true)
        await AxiosInstance.patch(`/blogs/${blog?._id}/like?likeId=${userLikedBlog?._id}`,
            { user: id, date: new Date() },
            { headers: { Authorization: `Bearer ${authToken}` } },

        ).then((res) => {
            console.log('blog returned');
            const newBlog = res?.data?.blog;
            console.log(newBlog?.likes);
            setblog({ ...newBlog })
        }).finally(() => {
            setlikeLoading(false)
        })


    }

    return (
        <BlogContainer>
            <RequireRole roles={['admin', 'admin']}
                children={<ActionBtn blog={blog} />}

            />
            <BlogUserProfile 
                msg={'Written by'}
                name={'author'}
                blog={blog}
            />
             <BlogUserProfile 
                msg={'published by'}
                name={'publisher'}
                blog={blog}
            />
           
            <h1 className='title'>{blog?.title}</h1>

            {blog?.image?.length ?
                <img className='blog-banner' src={`${blog?.image}`} />
                : null
            }
            {/* </div> */}
            <div className='blog_view_wrapper'>
                {parse(blog?.content || '')}
            </div>
            {blog?.tags?.length ?
                <p className='tags'>
                    {blog?.tags?.map((tag, id) =>
                        tag?.length ?
                            <small className='tag' key={id}>{tag}</small>
                            : null)
                    }
                </p> : null
            }
            <div className='like_wrapper'
            >
                <p>Like this blog</p>
                <button
                    style={{
                        backgroundColor: userLikedBlog ? 'rgb(58, 113, 3)' : 'var(--form-bg)'
                    }}
                    onClick={LikedBlog}
                    disabled={!authToken || likeLoading}
                    className='blog_liked_btn'
                >
                    <ThumbUpRounded sx={{ mr: '2px' }} />
                    {blog?.likes?.length}
                </button>
            </div>

        </BlogContainer>
    );
}



export default ABlog;
