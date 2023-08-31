import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AxiosInstance } from '../api';
import BlogCard from '../components/Blog/BlogCard';
import OvalLoader from '../components/Loader/OvalLoader';
import './blogsearch.css'
import { useQuery } from '@tanstack/react-query';

const BlogsSearch = () => {
    const searchQuery = useSearchParams()
    const keyword = searchQuery[0]?.get('query');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [blogsToDisplay, setblogsToDisplay] = useState([]);

     const { data, failureReason, error, isError,
    isLoading: dataLoading} = useQuery({
        queryKey: ['blogs', page, pageSize, keyword],
        queryFn: () => AxiosInstance.get(`/blogs/infinite?page=${Number(page)}&size=${Number(pageSize)}${keyword?.length ? `&keyword=${keyword}` : ''}`,)
            .then(res => res?.data)
        .catch((err)=> Promise.reject(err))
    })


    if (dataLoading && !data?.blogs?.length) {
        return <OvalLoader />
    }
    return (
        <div className='container'>
            <h2 className='main_title'>Search Blogs results</h2>
            {dataLoading ? 
                <OvalLoader />
                :
                <div className='sub_container'>
                    <h3 className='search_results_title'>
                        {totalBlogs + ` ${data?.total > 1 ? "blogs" : "blog"}`}
                    </h3>
                    {data?.blogs?.length ?
                        <div className='searched_blogs_wrapper'
                        >
                    { data?.blogs?.map((blog, index) => (
                        <BlogCard blog={blog}
                            key={index}
                        />
                    ))}
               
                    </div> : null}
                </div>
            }
        </div>
    );
}

export default BlogsSearch;
