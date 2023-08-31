import React from 'react';
import { AxiosInstance } from '../../api';
import { useState } from 'react';
import './ActionButtons.css'
import { Link, useNavigate } from 'react-router-dom';
import { GetError } from '../Config';
import { useScoketContenxt } from '../../context/socketContext';
import { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import UseAuth from '../../hooks/useAuth';


const ActionBtn = ({ blog, setblog, onDoneFunction }) => {

    const queryClient = new QueryClient()
    const { socket } = useScoketContenxt()

    const { token, id:userId } = UseAuth()
    
    const navigate = useNavigate()
    const [deleting, setdeleting] = useState(false);
    const [deleteMsg, setdeleteMsg] = useState({ success: '', error: '' });
    const [publishError, setpublishError] = useState('');

    const [publishing, setpublishing] = useState(false);

    useEffect(() => {
        {
            !token ?
                socket?.on(`blog_publish_${blog?._id}`, (newBlog) => {
                    setblog({ ...blog, newBlog })
                }) : null
        }
        return () => {

        };
    }, []);

    const HandleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure to delete ${blog?.title}`)
        if (!confirmDelete) return;
        setdeleting(true)
        setdeleteMsg({ error: '', success: '' })
        await AxiosInstance.delete(`/blogs/${blog?._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setdeleteMsg({ ...deleteMsg, success: res?.response?.data?.message })
                console.log(res);
                onDoneFunction()
            }).catch((err) => {
                setdeleteMsg({ ...deleteMsg, error: GetError(err) })
                console.log(err);
            }).finally(() => {
                setdeleting(false)
            })
    }

    const handlePublishBlog = () => {
        console.log(socket?.auth);
        console.log('publishing blog');
        setpublishing(true)
        socket?.emit(`blog_publish`, { id: blog?._id, userId, date: new Date() })

    }

    const TogglePublished = async () => {
        setpublishing(true)

        await AxiosInstance.patch(`/blogs/${blog?._id}`, {},
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { date: new Date() }
            })
            .then((res) => {
                // console.log(res)    ;
                setpublishError('')
                setpublishing(false)
                console.log(res?.data);
                const newBlogData = res?.data?.blog;
                if (newBlogData) {
                    setblog({ ...blog, ...newBlogData })
                }
                socket?.emit(`blog_published`, {
                    blogId: blog?._id,
                    target_user: blog?.author?._id })

                queryClient.invalidateQueries({ queryKey: 'blogs' })
            })
            .catch((error) => {
                console.log(error);
                setpublishing(false)
                setpublishError(GetError(error))
            })
    }

    const handleNavigateToEdit = () => {
        navigate(`/dash/blogs/${blog?._id}/edit`)
    }
    return (
        <div className='actions-btns'>
            {!blog?.publish ?
                <div className='btn_parent'>
                    {publishError?.length ?
                        <span className='error-elem'>
                            {publishError}
                        </span>
                        : null
                    }
                    <button
                        onClick={TogglePublished}
                        disabled={publishing}
                        className='btn edit'>
                        {publishing ? "Publishing ...." : "Publish"}
                    </button>
                </div>
                : null
            }
            {userId === blog?.author?._id ?
                <div className='btn_parent'>

                    <button
                        onClick={handleNavigateToEdit}
                        className='btn edit'>
                        <Link to={`/dash/blogs/${blog?._id}/edit`}>Edit</Link>
                    </button>
                </div>

                : null
            }

            <div className='btn_parent'>
                {deleteMsg?.error ?
                    <span className='error-elem'>
                        {deleteMsg?.error}
                    </span>
                    : null
                }
                <button className='btn del'
                    onClick={HandleDelete}
                >
                    <span>{deleting ? "Deleting ..." : 'Delete'}</span>

                </button>

            </div>

        </div>
    );
}

export default ActionBtn;
