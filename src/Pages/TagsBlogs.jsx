import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import BlogCard from '../components/Blog/BlogCard';
import '../assets/css/blog.tags.css'
import { AxiosInstance } from '../api';
import { useState } from 'react';
import { useEffect } from 'react';

const TagsBlogs = () => {
    const { tag } = useParams()
    const [loading, setloading] = useState(false);
  const [refetchSuccess, setrefetchSuccess] = useState(false);
    const { blogs, page, pageSize, total, } = useLoaderData()
    const [size, setSize] = useState(+pageSize);
  const [pageNum, setPageNum] = useState(page == 0 ? 1 : page);
  const [blogsToDisplay, setblogsToDisplay] = useState([...blogs]);

    useEffect(() => {
    const fetchAgain = async () => {
      setloading(true);
      await AxiosInstance.get(
        `/blogs?page=${Number(pageNum) - 1}&size=${Number(pageSize)}`
      )
        .then((res) => {
          // console.log(res?.data);
          setblogsToDisplay(res?.data?.blogs);
          setSize(res?.data?.pageSize);
            setpage(res?.data?.page);
            
        })
        .catch(() => {})
        .finally(() => {
          setloading(false);
        });
    };
    if (blogs?.length) {
      fetchAgain();
    }
    return () => {};
  }, [pageNum, size]);


    return (
        <div className='tags_blog_container'>
            <h3 className='tag_name'>{tag}</h3>
            <p className='tag_count'>{`${total} ${total>1? 'blogs': 'blog'}` } </p>
            <div className='tags_blogs_wrapper'>
                {blogs?.map((blog) => (
                    <BlogCard blog={blog}
                   key={blog._id} />
               ))}
            </div>
        </div>
    );
}

export default TagsBlogs;
