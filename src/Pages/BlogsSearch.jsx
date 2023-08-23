import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AxiosInstance } from '../api';
import BlogCard from '../components/Blog/BlogCard';
import OvalLoader from '../components/Loader/OvalLoader';
import './blogsearch.css'
import { useQuery } from '@tanstack/react-query';

const BlogsSearch = () => {
    const searchQuery = useSearchParams()
    console.log(searchQuery[0]?.get('query'));
    const keyword = searchQuery[0]?.get('query');
    const [loading, setloading] = useState(false);
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


    useEffect(() => {
        const fetchSearch = async () => {
    if (!keyword?.length) return;
      setloading(true);
      await AxiosInstance.get(`/blogs/infinite?page=${Number(page)}&size=${Number(pageSize)}&offset=${Number((page-1)*pageSize)}&keyword=${keyword}`)
        .then((res) => {
          console.log(res?.data);
          // setblogsToDisplay(previousBlogs=>[...previousBlogs, ...res?.data?.blogs]);
          setblogsToDisplay([...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs, ...res?.data?.blogs])
          setPageSize(prev=>Number(res?.data?.size));
        //   setPageNum(prev=>+Number(res?.data?.page));
          // setoffset(prev=>+Number(res?.data?.offset))
          setPageSize(prev=> +Number(res?.data?.size));
           setPage(Number(res?.data?.page));
          setTotalBlogs(prev=> +Number(res?.data?.total))

        }).catch((error) => {
            console.log(error);
        })
        .finally(() => {
          setloading(false);
        });
    };

        // fetchSearch()
        return () => {
            
        };
    }, []);

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
                    <div className='searched_blogs_wrapper'
                        >
                    {data?.blogs?.map((blog, index) => (
                        <BlogCard blog={blog}
                            key={index}
                        />
                    ))}
               
                    </div>
                </div>
            }
        </div>
    );
}

export default BlogsSearch;
