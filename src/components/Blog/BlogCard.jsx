import React from 'react';
import { ImageUrl } from '../../api';
import { Link } from 'react-router-dom';
import './blogcard.css'
import ActionBtn from './ActionBtn';
import UseAuth from '../../hooks/useAuth';
import BlogUserProfile from './BlogUserProfile';

const BlogCard = ({ blog }) => {
    const {role, username} = UseAuth()

    let blogImageurl =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : null;

    const formattedTitle = `${blog?.title?.toLowerCase()?.split(' ')?.join('-')}`
   
    let blogLink = `/blogs/${formattedTitle}`;
    if (['admin', 'editor'].includes(role)) {
        blogLink=`/dash/blogs/view/${formattedTitle}`
    }
    return (
        <div className='blog-card-wrapper'>
            <div className='image_wrapper'>

            <img src={blogImageurl} alt='banner' 
                className='blog_card_img'
                />
            </div>    
                
            <section style={{paddingLeft:'6px'}}>

            <BlogUserProfile blog={blog}
                msg={''}
                name={'author'}
                />
            </section>
            <div className='content'>
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
