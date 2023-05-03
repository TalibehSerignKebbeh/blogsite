import React from 'react';
import image from '../../assets/flat-mountains.png'
import profile from '../../assets/mydefaultprofile.png'
import { ImageUrl } from '../../api';
import { Link } from 'react-router-dom';
import './blogcard.css'
import ActionBtn from './ActionBtn';
import UseAuth from '../../hooks/useAuth';
const BlogCard = ({ blog }) => {
    const {role, username} = UseAuth()
    // const blogImageurl = blog?.image ? `${ImageUrl}/${blog?.image}` : image
    let blogImageurl =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : image;

    const formattedTitle = `${blog?.title?.toLowerCase()?.split(' ')?.join('-')}`
    const createdDate = new Date(blog?.created_at)
    const authorName = `${blog?.author?.firstName} ${blog?.author?.lastName}` 
    const profileLink = blog?.profile? `${ImageUrl}/${log?.author?.profile}` : profile
    let blogLink = `blogs/${formattedTitle}`;
    if (['admin', 'editor'].includes(role)) {
        blogLink=`/dash/blogs/view/${formattedTitle}`
    }
    return (
        <div className='blog-card-wrapper'>
                {/* <small className='author-identifier'>Author</small>
            <div className='profile-wrapper'>
                <img className='profile'
                    src={profileLink} alt='profile'
                />
                <div className=''>
                    <h4>{authorName}</h4>
                    <small>{createdDate?.toLocaleDateString() }</small>
                </div>
                </div> */}
            <img src={blogImageurl} alt='banner' />
            {blog?.tags?.length ?
                 <p className='tags'>
                    {blog?.tags?.map((tag, id) =>
                        tag?.length? <small className='tag' key={id}>{tag}</small>: null)}
                </p> : null}
            <Link className='blog-link' to={blogLink}  >
                <h3 className='blog-title'>{blog?.title}</h3>
            </Link>
            {(role === "admin" || username === blog?.author?.username) ?
                <ActionBtn blog={blog} onDoneFunction={() => { }} />
                : null}
        </div>
    );
}

{/* <b class="md:text-26px text-[30px] l:text-26px font-futura block lg:text-2xl w-full leading-1">Waychit</b> */ }

{/* <p class="font-futura mt-5 mb-3 py-wide l:text-14px l:py-md-1 border-t border-border border-solid prose-">A fintech app to make buying &amp; selling a tab easier. Also for online payments, bills and peer-transactions once out of the pipeline.</p> */}

export default BlogCard;
