import React, { useRef, useState, useEffect } from 'react';
import CommentCard from '../Comments/CommentCard';
import { AxiosInstance } from '../../api';

const CommentList = ({blogId}) => {
    const [comments, setcomments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnceLoaded, setisOnceLoaded] = useState(false)
  const sentinelRef = useRef(null);
  // const intersectionObserverRef = useRef(null);
  // let currentPageRef = useRef(1);
  const [currentPage, setcurrentPage] = useState(1);
    const pagesize = 5;

  const fetchComments = async () => {
    try {
      setIsLoading(true);
        const response = await AxiosInstance.get(`/comments/blog/${blogId}?page=${currentPage}
      &&limit=${pagesize}&offset=${comments?.length}`);
      const newComments = response?.data?.comments;
      console.log(response?.data);
      setcomments((prevComments) => [...prevComments, ...newComments]);
      setIsLoading(false);
      setcurrentPage(prev=> prev+1)
      setisOnceLoaded(true)
    } catch (error) {
      console.error('Error fetching comments:', error);
      setIsLoading(false);
      setisOnceLoaded(true)
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
    try {
      setIsLoading(true);
        const response = await AxiosInstance.get(`/comments/blog/${blogId}?page=${currentPage}
      &limit=${pagesize}&offset=${comments?.length}`);
      const newComments = response?.data?.comments;
      console.log(response?.data);
      setcomments((prevComments) => [...prevComments, ...newComments]);
      setIsLoading(false);
      setcurrentPage(prev=> prev+1)
      setisOnceLoaded(true)
    } catch (error) {
      console.error('Error fetching comments:', error);
      setIsLoading(false);
      setisOnceLoaded(true)
    }
    };
    if (!comments?.length && !isLoading && !isOnceLoaded) {
      fetchComments()
    }
    return () => {
    
    };
  }, []);
  useEffect(() => {
    const elementToObserve = document.querySelector('.comment-card:last-child') || null
    const options = {
      root: null, // null means it uses the viewport as the container
      rootMargin: '-00px',
      threshold: 0, // The sentinel is considered visible when 100% visible
    };

    let intersectionObserverRef = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        console.log('we are fetching');
        fetchComments();
        }
    
    }, options);

    if (elementToObserve) {
      intersectionObserverRef.observe(elementToObserve);
    }

    return () => {

          if (elementToObserve) {
        intersectionObserverRef.unobserve(elementToObserve);
            }
      // if (sentinelRef.current) {
      // }
    };
  }, [blogId, isLoading]);

    return (
      <div className='comments_section'>
        {/* {!comments?.length &&
          <div ref={sentinelRef}>observe
          <p>paragraph</p></div>} */}
                    {comments?.map((a_comment, index) => (
                        
                      <CommentCard
                        // ref={index === comments?.length - 1 ? sentinelRef : null}
                            comment={a_comment}
                            key={index} 
                        />
                
                    ))}
                    {isLoading && !comments?.length && <p>Loading more comments...</p>}
                </div>
    );
}

export default CommentList;
