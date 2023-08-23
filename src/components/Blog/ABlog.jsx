import React from 'react';
import { BlogContainer } from '../Preview';
import parse from 'html-react-parser'
import RequireRole from '../Auth/RequireRole';
import ActionBtn from './ActionBtn';
import './ablog.css'
import ThumbUpRounded from '@mui/icons-material/ThumbUpRounded';
import UseAuth from '../../hooks/useAuth';
import { AxiosInstance } from '../../api';
import { useState } from 'react';
import BlogUserProfile from './BlogUserProfile';
import { useAccessToken, getAuthData } from '../../store/store';

const ABlog = ({ blog, setblog }) => {
    // const { authToken } = useContextHook()
    const token = useAccessToken()
    const id = getAuthData()?.id;
    const role = getAuthData()?.role;
    const isAdmin = getAuthData()?.role === 'admin';
    
    const [likeLoading, setlikeLoading] = useState(false);

    const userLikedBlog = blog?.likes?.find(object => object?.user?._id === id)

    const LikedBlog = async () => {
        console.log('liking');
        if (likeLoading) return;
        setlikeLoading(true)
        await AxiosInstance.patch(`/blogs/${blog?._id}/like?likeId=${userLikedBlog?._id}`,
            { user: id, date: new Date() },
            { headers: { Authorization: `Bearer ${token}` } },

        ).then((res) => {
            console.log('blog returned');
            const newBlog = res?.data?.blog;
            // console.log(newBlog?.likes);
            setblog({ ...newBlog })
        }).finally(() => {
            setlikeLoading(false)
        })


    }

    return (
        <BlogContainer>
            <BlogUserProfile 
                msg={'Written by'}
                name={'author'}
                blog={blog}
                dateFiled={'created_at'}
            />
            {blog?.publish ?
                <BlogUserProfile 
                msg={'published by'}
                name={'publisher'}
                blog={blog}
                dateFiled={'publish_date'}
                /> : null
            }
           
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
            {isAdmin ?
                <ActionBtn blog={blog}
                    setblog={setblog}
                    onDoneFunction={()=>{}}
                />
            : null}
            {token ?
                <div className='like_wrapper'
            >
                <p>Like this blog</p>
                <button
                    style={{
                        backgroundColor: userLikedBlog ? 'rgb(58, 113, 3)' : 'var(--form-bg)'
                    }}
                    onClick={LikedBlog}
                    disabled={!token || likeLoading}
                    className='blog_liked_btn'
                >
                    <ThumbUpRounded sx={{ mr: '2px' }} />
                    {blog?.likes?.length}
                </button>
                </div> :
                null}

        </BlogContainer>
    );
}



export default ABlog;
