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


const ViewBlog = () => {
    let blog = useLoaderData()
    const [comments, setcomments] = useState([]);
    const [comment, setcomment] = useState('');
    const [page, setpage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [postingComment, setpostingComment] = useState(false);
    // const imageLink = blog?.image ? `${ImageUrl}/${blog?.image}` : banner;
    let imageLink =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : banner;

    blog = { ...blog, image: imageLink }
    useEffect(() => {
        const FetchComments = async () => {
            const abortCont = new AbortController()
            // const canCellToken = axios.CancelToken()
            await AxiosInstance.get(`/comments/blog/${blog?._id}/?page=${page}&limit=${page*pageSize}`, 
                {}, )
                .then((res => {
                    console.log(res?.data);
                setcomments([...comments, ...res?.data?.comments])
                }))
                .catch((err) => {
                console.log(err);
            })
        }
        FetchComments()
        return () => {
            
        };
    }, []);
    const handleCommentSubmit = async () => {
        setpostingComment(true)
        await AxiosInstance.post(`/comments/blog/${blog?._id}`, { message: comment },)
            .then((res) => {
            console.log(res?.data);
            })
            .catch((err) => {
            console.log(err);
        }).finally(()=>setpostingComment(false))
    }
        return (
            <div className='view-container'>
                
                     
                <ABlog blog={blog} />
                <div className='comment-wrapper'>
                    <h2>Comment</h2>
                    <CommentEditor comment={comment} setcomment={setcomment} />
                    <button onClick={handleCommentSubmit}
                        className='blog-submit'>
                        {postingComment? 'Posting': "Submit Comment"}
                    </button>
                </div>
                <div className='comments'>
                    {comments?.map((a_comment, index) => (
                        
                        <CommentCard
                            comment={a_comment}
                            key={index} 
                        />
                
                    ))}
                    
                </div>
                <div>

                </div>
        </div>
    );
}

export default ViewBlog;
