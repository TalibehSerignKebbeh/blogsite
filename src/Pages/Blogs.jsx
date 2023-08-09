import React, { useState, useEffect,useRef } from "react";
import BlogCard from "../components/Blog/BlogCard";
import "./blogs.css";
import { useLoaderData } from "react-router-dom";
import { AxiosInstance } from "../api";
import { Pagination } from "antd";
// import OtherSamples from "../components/Blog/Cards/OtherSamples";


const Blogs = () => {
  const fetchMoreRef = useRef(null)
  const blogWrapperRef = useRef(null)
  const responseData = useLoaderData();
  const [loading, setloading] = useState(false);
  const [refetchSuccess, setrefetchSuccess] = useState(false);
  const [fetchtingMore, setfetchtingMore] = useState(false);
  const { blogs, total, pageCount, size, page } = responseData;
  // console.log(total);
  const [pageSize, setPageSize] = useState(size);
  const [totalBlogs, setTotalBlogs ] = useState(+total)
  const [pageNum, setPageNum] = useState(+page || 1);
  const [blogsToDisplay, setblogsToDisplay] = useState([...blogs]);
  const [offset, setoffset] = useState( size);

  // useEffect(() => {
  //   const fetchAgain = async () => {
  //     setloading(true);
  //     await AxiosInstance.get(
  //       `/blogs?page=${Number(pageNum) - 1}&size=${Number(pageSize)}`
  //     )
  //       .then((res) => {
  //         // console.log(res?.data);
  //         setblogsToDisplay(res?.data?.blogs);
  //         setPageSize(res?.data?.size);
  //         setPageNum(res?.data?.page);
  //       })
  //       .catch(() => { })
  //       .finally(() => {
  //         setloading(false);
  //       });
  //   };
  //   if (blogs?.length) {
  //     fetchAgain();
  //   }
  //   return () => { };
  // }, [pageNum, pageSize]);
const fetchMoreBlogs = async () => {
      setfetchtingMore(true);
      await AxiosInstance.get(
        `/blogs/infinite?page=${Number(pageNum)}&size=${Number(pageSize)}&offset=${offset}`
      )
        .then((res) => {
          const newBlogs = res?.data?.blogs;
          setoffset(prev=>res?.data?.offset)
          console.log(res?.data?.blogs);
          setblogsToDisplay(previousBlogs=>[...previousBlogs, ...newBlogs]);
          setPageSize(prev=> +res?.data?.size);
          setPageNum(prev=> page+1);
          setTotalBlogs(prev=> res?.data?.total)
          
        })
        .catch(() => { })
        .finally(() => {
          setfetchtingMore(false);
        });
  };
  
  useEffect(() => {
     
   
    const options = {
      root: null, // null means it uses the viewport as the container
      rootMargin: '0px',
      threshold: 0, // The sentinel is considered visible when 100% visible
    };

    let intersectionObserverRef = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting
        && !fetchtingMore &&
        (blogsToDisplay?.length !== totalBlogs) && !fetchtingMore) {
        console.log('we are fetching more now');
        setPageNum(prev=>prev+1)
        // fetchComments();
        
        // console.log(blogsToDisplay?.length);
        fetchMoreBlogs()
        }
    
    }, options);

    if (fetchMoreRef.current && (blogsToDisplay?.length !== totalBlogs)) {
      intersectionObserverRef.observe(fetchMoreRef.current);
    } else {
        intersectionObserverRef.unobserve(fetchMoreRef.current);
     
    }

    return () => {
          if (fetchMoreRef.current) {
        intersectionObserverRef.unobserve(fetchMoreRef.current);
            }
    };
  }, [fetchMoreRef.current, blogsToDisplay?.length]);

  return (
    <div style={{}}>
      <div className="blogs-landing"
        id="blogs_wrapper"
      ref={blogWrapperRef}>
        {!blogsToDisplay?.length && loading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          <div>
            <div className="blogs-wrapper">
              {/* {!blogsToDisplay?.length && loading
                &&
                <div> <h3>Loading more ...</h3> </div>
              } */}
              {blogsToDisplay?.map((blog, index) => (
                <BlogCard blog={blog} key={index} />
              ))}
                <div id="fetchMoreElement" ref={fetchMoreRef}></div>
                {fetchtingMore && <span>Loading ...</span>}
            </div>
            {/* <div className="pagination-wrapper">
              <Pagination
                current={pageNum}
                pageSize={pageSize}
                responsive={true}
                showSizeChanger
                show
                onShowSizeChange={(page, size) => {
                  setPageSize(size);
                  setPageNum(0)
                }}
                pageSizeOptions={[2, 3, 4, 5]}
                onChange={(page, size) => {
                  setPageNum(page);
                }}
                showTotal={(total) => `Total blogs ${total}`}
                total={total}
              />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
