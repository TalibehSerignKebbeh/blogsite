import React, { useState, useEffect } from 'react';
import { AxiosInstance, ImageUrl } from '../../api';
import './viewblog.css'
import { useLoaderData, useNavigate } from 'react-router-dom';
import ABlog from './ABlog';
import CommentEditor from '../Editor/CommentEditor/CommentEditor';
import CommentList from './CommentList';
import { useScoketContenxt } from '../../context/socketContext';
import { getAuthData, useAccessToken } from '../../store/store';


const ViewBlog = () => {

    let loadedData = useLoaderData()
    const { socket } = useScoketContenxt()
    const [blog, setblog] = useState({...loadedData});
    const token = useAccessToken()
    const userId = getAuthData()?.id;
    const isAdmin = getAuthData()?.role === 'admin';
    const [comments, setcomments] = useState([]);
    const [comment, setcomment] = useState('');
    // const [page, setpage] = useState(1);
    // const [pageSize, setpageSize] = useState(10);
    const [postingComment, setpostingComment] = useState(false);
    const [commentingStatus, setcommentingStatus] = useState(
        { status: '', msg: '' }
    );


    useEffect(() => {
        let imageLink = blog?.image?.startsWith('http') ? blog?.image :
            blog?.image?.length? `${ImageUrl}/${blog?.image}` : '';
        setblog({ ...blog, image: imageLink })
        return () => {

        };
    }, []);

    useEffect(() => {
          socket?.emit('blogvisited', ({ id: blog?._id }))
            socket?.on('blogvisited_result', (newblog) => {
                // console.log(newblog);
                setblog({ ...blog, visit_count: newblog?.visit_count? newblog?.visit_count : blog?.visit_count || 0})
            })
    }, [socket]);

    const handleCommentSubmit = async () => {
        setcommentingStatus({ status: '', msg: '' })
        if (!token) {
            console.log('error');
            setcommentingStatus({ status: 'error', msg: 'You need to login to comment' })
            return;
        }
        if (!comment?.length) {
            console.log('error');
            setcommentingStatus({ status: 'error', msg: 'comment body is empty' })
            return;
        }
        setpostingComment(true)
        await AxiosInstance.post(`/comments/blog/${blog?._id}`, { message: comment },
            { headers: { Authorization: `Bearer ${token}` } })
            .then(async (res) => {
                setcommentingStatus({
                    ...commentingStatus,
                    status: 'success', msg: res?.data?.message
                })
                console.log(res?.data);
                setpostingComment(false);
                await refreshComments()
            })
            .catch((err) => {
                const msg = !err?.response ? 'no server response'
                    : err?.response?.status === 500 ?
                        'internal server error' : err?.response?.data?.message

                setcommentingStatus({
                    ...commentingStatus,
                    status: 'error', msg: msg
                })
                // console.log(err?.response?.data?.message);
            }).finally(async () => {

            })
    }

    // const refreshComments = async () => {
    //     await AxiosInstance.get(`/comments/blog/${blog?._id}/?page=${page}&limit=${page * pageSize}`,
    //         { headers: { Authorization: `Bearer ${token}` } },)
    //         .then((res => {
    //             // console.log(res?.data);
    //             const newcomments = res?.data?.comments;
    //             console.log(newcomments);
    //             setcomments(prev => {
    //                 return newcomments
    //             })
    //         })).then(() => {
    //             console.log(comments?.length);
    //         })
    // }
    return (
        <div className='view-container'>
            <ABlog blog={blog} setblog={setblog} />
            <div className='comment-wrapper'>
                {(!token && blog?.publish) ?
                    <p className='comment_alert'>
                        You need to login to comment
                    </p>
                 :
                        <>
                            <CommentEditor comment={comment}
                                setcomment={setcomment}

                            />
                            {commentingStatus?.msg?.length ? <p
                                style={{
                                    color: commentingStatus?.status === 'error' ?
                                        'red' : 'lightgreen', textAlign: 'center',
                                    backgroundColor: 'whitesmoke', padding: '10px 10px',
                                    margin: 'auto',
                                    display: 'grid', gridTemplateColumns: 'auto auto',
                                    columnGap: '80px'
                                }}>
                                <span>{commentingStatus?.msg}</span>
                                <button style={{
                                    border: 'none', outline: 'none',
                                    padding: '5px 10px 5px 10px',
                                    borderRadius: '50%'
                                }}
                                    onClick={() => {
                                        setcommentingStatus({ status: "", msg: "" })
                                    }}>x</button>
                            </p> : null
                            }
                            <button
                                // disabled={!comment?.length || !token}
                                onClick={handleCommentSubmit}
                                className='blog-submit'>
                                {postingComment ? 'Posting' : "Submit Comment"}
                            </button>
                        </>
                }
            </div>

            {blog?.publish ?
                <CommentList blogId={blog?._id} />
                : null
            }
            <div>

            </div>
        </div>
    );
}

export default ViewBlog;
