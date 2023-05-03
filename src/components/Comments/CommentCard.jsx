import React from 'react';
import parse from 'html-react-parser'

const CommentCard = ({ comment }) => {
    return (
        <div className='comment-card'>
            <div className='comment_sub_wrapper'>
                <div>
                    {comment?.user?.username}
                </div>
                <div className='message-wrapper'>
                    {parse(comment?.message || '')}
                </div>
            </div>
            <div className='reactions_wrapper'>
                <h2>{comment?.likes?.length }</h2>
                <h2>{comment?.replies?.length }</h2>
            </div>
        </div>
    );
}

export default CommentCard;
