import React, {useEffect, useState, useRef} from 'react';
import { ImageUrl } from '../../api';
import { Link } from 'react-router-dom';
import './blogcard.css'
import ActionBtn from './ActionBtn';
import UseAuth from '../../hooks/useAuth';
import BlogUserProfile from './BlogUserProfile';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import isYesterday from 'date-fns/isYesterday';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import formatDistance from 'date-fns/formatDistance';

const BlogCard = ({ blog }) => {
    const { role, username } = UseAuth()
    const [isVisible, setIsVisible] = useState(false);

    const blogCardRef = useRef(null)

    let blogImageurl =
        blog?.image?.startsWith('http') ? blog?.image :
            blog?.image ? `${ImageUrl}/${blog?.image}` : null;

    const formattedTitle = `${blog?.title?.toLowerCase()?.split(' ')?.join('-')}`
   
    let blogLink = `/blogs/${formattedTitle}`;
    if (['admin', 'editor'].includes(role)) {
        blogLink = `/dash/blogs/view/${formattedTitle}`
    }
       useEffect(() => {
        //  if (blogCardRef) {
        //      const cardRect = blogCardRef?.current?.getBoundingClientRect();
        //      console.log('-------------------------------------');
        //      console.log(blog?.title);
        //         console.log(cardRect?.top > window.screenTop);
        //         console.log(cardRect?.top, window.screenTop);
        //     }

        window.addEventListener('scroll', (e) => {
            console.log(window.innerHeight);
            if (blogCardRef?.current) {
                const cardRect = blogCardRef?.current?.getBoundingClientRect();
                console.log('----------------\nscrolling');
                console.log(blog?.title);
                // console.log(cardRect?.top > window.screenTop);
                console.log(cardRect?.top > window.screenY);
                console.log(cardRect?.top, window.screenTop);
            }
        })
        return () => {
            
        };
    }, []);

    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // When the target element intersects the viewport
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
        
                rootMargin: '0px',
                threshold: 0, // Adjust the threshold as needed (0.5 means at least 50% of the element is visible)
            }
        );

        // Start observing the target element
        if (blogCardRef.current) {
            observer.observe(blogCardRef.current);
        }

        // Cleanup the observer when the component unmounts
        return () => {
            if (blogCardRef.current) {
                observer.unobserve(blogCardRef.current);
            }
        };
    }, []);



   
    return (
        <div className={`blog-card-wrapper ${isVisible? 'visible':''}`}
        ref={blogCardRef}>
            <div className='image_wrapper'>

            <img src={blogImageurl} alt='banner' 
                className='blog_card_img'
                loading='lazy'/>
            </div>    
                
            <section style={{paddingLeft:'6px'}}>

            <BlogUserProfile blog={blog}
                    msg={''}
                    name={'author'}
                    dateFiled={'created_at'}
                
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
