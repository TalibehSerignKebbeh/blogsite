import React from 'react';
import image from '../../assets/flat-mountains.png'
import profile from '../../assets/mydefaultprofile.png'
import { ImageUrl } from '../../api';
import { Link } from 'react-router-dom';
import './blogcard.css'
import ActionBtn from './ActionBtn';
import UseAuth from '../../hooks/useAuth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import BlogUserProfile from './BlogUserProfile';

const BlogCard = ({ blog }) => {
    const {role, username} = UseAuth()
    // const blogImageurl = blog?.image ? `${ImageUrl}/${blog?.image}` : image
    let blogImageurl =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : image;

    const formattedTitle = `${blog?.title?.toLowerCase()?.split(' ')?.join('-')}`
    const createdDate = new Date(blog?.created_at)
    const authorName = `${blog?.author?.firstName} ${blog?.author?.lastName}` 
    const profileLink = blog?.profile? `${ImageUrl}/${blog?.author?.profile}` : profile
    let blogLink = `/blogs/${formattedTitle}`;
    if (['admin', 'editor'].includes(role)) {
        blogLink=`/dash/blogs/view/${formattedTitle}`
    }
    return (
        <div className='blog-card-wrapper'>
                
            <img src={blogImageurl} alt='banner' />
            <section style={{paddingLeft:'6px'}}>

            <BlogUserProfile blog={blog}
                msg={''}
                name={'author'}
                />
            </section>
                
            <div className='content'>
            {/* <span
                className='blog_posted_date'>
                {isValid(parseISO(blog?.created_at)) ?
                    format(parseISO(blog?.created_at), 'MMM, do yyyy') :''}
            </span> */}
            {blog?.tags?.length ?
                 <p className='tags'>
                    {blog?.tags?.map((tag, id) =>
                        tag?.length ?
                            <Link
                                to={`/blogs/tags/${tag}`}
                                className='tag' key={id}>{tag}
                            </Link> : null)}
                </p> :
                null
            }
            
            <Link className='blog-link' to={blogLink}  >
                    <h3 className='blog-title'>{blog?.title}</h3>
                    <span></span>
            </Link>
            {(role === "admin" || username === blog?.author?.username) ?
                <ActionBtn blog={blog} onDoneFunction={() => { }} />
                    : null}
            </div>
        </div>
    );
}

{/* <b class="md:text-26px text-[30px] l:text-26px font-futura block lg:text-2xl w-full leading-1">Waychit</b> */ }

{/* <p class="font-futura mt-5 mb-3 py-wide l:text-14px l:py-md-1 border-t border-border border-solid prose-">A fintech app to make buying &amp; selling a tab easier. Also for online payments, bills and peer-transactions once out of the pipeline.</p> */}

export default BlogCard;
