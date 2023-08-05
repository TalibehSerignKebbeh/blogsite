import React from 'react';
import parse from 'html-react-parser'
import ThumbUp from '@mui/icons-material/ThumbUp'
import ThumbDown from '@mui/icons-material/ThumbDown'
import './index.css'
import pic_url from '../../assets/mydefaultprofile.png'
import UseAuth from '../../hooks/useAuth';
import { AxiosInstance } from '../../api';
import { useState } from 'react';
import { useContextHook } from '../../context/AuthContext';
import { ImageUrl } from '../../api';


const CommentCard = ({ comment,ref }) => {
    const { token, id } = UseAuth()

    const { authToken } = useContextHook()
    const [commentData, setCommentData] = useState({ ...comment })

    const likedComment = () => {
        return commentData?.likes?.includes(id)
    }

    const ToggleLikeComment = async () => {
        await AxiosInstance.patch(`/comments/${comment?._id}`, {},
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { id: commentData?._id }
            })
            .then((res) => {
                console.log(res);
                const newcomment = res?.data?.comment
                setCommentData(newcomment)
            }).catch((err) => {
                console.log(err);
            })

    }


    return (
        <div className='comment-card'
            // ref={ref}
        >
            <div className='profile_wrapper'>
                <img src={comment?.user?.profile ?
                    `${ImageUrl}/${comment?.user?.profile}`
                : pic_url}
                    alt=''
                    style={{ width: '40px', height: '40px' }} 
                    
                    />
            </div>
            <div className='comment_body'>
                <div className='comment_sub_wrapper'>
                    <div className='commentor_section'>
                        <h4>@{commentData?.user?.name
                            ||
                            commentData?.user?.username}
                        </h4>
                    </div>
                    <section className='message-wrapper'>
                        {parse(commentData?.message || '')}
                    </section>
                </div>
                <div className='reactions_wrapper'>
                    <button disabled={!token}
                        onClick={ToggleLikeComment}>
                        <ThumbUp
                            sx={{ color: likedComment() ? 'green' : '#3336' }}
                        />
                        <small >
                            {commentData?.likes?.length}
                        </small> 
                    </button>

                    {/* <p><small>replies </small>
                        <small style={{ fontWeight: 500 }}>
                            {commentData?.replies?.length}
                            </small>
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default CommentCard;
