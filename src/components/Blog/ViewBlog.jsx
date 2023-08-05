import React, { useState, useEffect } from 'react';
import { AxiosInstance, ImageUrl } from '../../api';
import './viewblog.css'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContextHook } from '../../context/AuthContext';
import banner from '../../assets/flat-mountains.png'
import ABlog from './ABlog';
import CommentEditor from '../Editor/CommentEditor/CommentEditor';
import axios from 'axios';
import CommentCard from '../Comments/CommentCard';
import UseAuth from '../../hooks/useAuth';
import CommentList from './CommentList';


const ViewBlog = () => {
    let blog = useLoaderData()
    const { token } = UseAuth()
  const { authToken } = useContextHook()

    const [comments, setcomments] = useState([]);
    const [commentsLoaded, setcommentsLoaded] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false)
    const [comment, setcomment] = useState('');
    const [page, setpage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [postingComment, setpostingComment] = useState(false);
    const [commentingStatus, setcommentingStatus] = useState(
        {status:'', msg:''}
    );
    // const imageLink = blog?.image ? `${ImageUrl}/${blog?.image}` : banner;
    let imageLink =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : banner;

    blog = { ...blog, image: imageLink }
    // useEffect(() => {
    //     const FetchComments = async () => {
    //         setCommentLoading(true)
    //         const abortCont = new AbortController()
    //         // const canCellToken = axios.CancelToken()
    //         await AxiosInstance.get(`/comments/blog/${blog?._id}/?page=${page}&limit=${page*pageSize}&offset=${comments?.length}`, 
    //             {
    //                 headers: { Authorization: `Bearer ${authToken}` },
    //             params: {id:blog?._id, page:page, limit:5 }},)
    //             .then((res => {
    //                 console.log(res?.data);
    //                setcommentsLoaded(true)
    //             setcomments(res?.data?.comments)
    //             }))
    //             .catch((err) => {
    //                setcommentsLoaded(false)
    //             console.log(err);
    //             }).finally(() => {
    //             setCommentLoading(false)
    //         })
    //     }
    //     FetchComments()
    //     return () => {
            
    //     };
    // }, []);
    const handleCommentSubmit = async () => {
        setcommentingStatus({ status: '', msg: '' })
        if (!authToken) {
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
        {headers: {Authorization: `Bearer ${authToken}`}})
            .then( async(res) => {
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
            }).finally( async() => {
                
            })
    }

    const refreshComments = async () => {
         await AxiosInstance.get(`/comments/blog/${blog?._id}/?page=${page}&limit=${page*pageSize}`, 
                {headers: {Authorization: `Bearer ${authToken}`}}, )
                .then((res => {
                    // console.log(res?.data);
                    const newcomments = res?.data?.comments;
                    console.log(newcomments);
                    setcomments(prev => {
                        return newcomments
                    })
                })).then(() => {
                    console.log(comments?.length);
                })
    }
        return (
            <div className='view-container'>
                
                     
                <ABlog blog={blog} />
                <div className='comment-wrapper'>
                    {!authToken &&
                        <p className='comment_alert'>You need to login to comment</p>}
                    <CommentEditor comment={comment} setcomment={setcomment} />
                    {commentingStatus?.msg?.length? <p
                        style={{
                            color: commentingStatus?.status === 'error' ?
                                'red' : 'lightgreen', textAlign: 'center',
                            backgroundColor: 'whitesmoke', padding: '10px 10px',
                            margin: 'auto',
                            display: 'grid', gridTemplateColumns: 'auto auto',
                            columnGap:'80px'
                        }}>
                       <span>{commentingStatus?.msg}</span> 
                        <button style={{border:'none',outline:'none',
                            padding: '5px 10px 5px 10px',
                        borderRadius:'50%'}}
                            onClick={() => {
                                setcommentingStatus({status:"", msg:""})
                        }}>x</button>
                    </p> : null}
                    <button
                        // disabled={!comment?.length || !authToken}
                        onClick={handleCommentSubmit}
                        className='blog-submit'>
                        {postingComment? 'Posting': "Submit Comment"}
                    </button>
                </div>
                {/* <div className='comments_section'>
                    {comments?.map((a_comment, index) => (
                        
                        <CommentCard
                            comment={a_comment}
                            key={a_comment?._id} 
                        />
                
                    ))}
                    
                </div> */}
                <CommentList blogId={blog?._id}/>
                <div>

                </div>
        </div>
    );
}

export default ViewBlog;
