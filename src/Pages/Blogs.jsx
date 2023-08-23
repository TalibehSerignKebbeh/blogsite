import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../components/Blog/BlogCard";
import "./blogs.css";
import { useLoaderData } from "react-router-dom";
import { AxiosInstance } from "../api";
import RotatingLineLoader from "../components/Loader/RotatingLineLoader";
import OvalLoader from "../components/Loader/OvalLoader";
import SearchBlog from "../components/Navigation/SearchBlog";


const Blogs = () => {
  const fetchMoreRef = useRef(null)
  const blogWrapperRef = useRef(null)
  const responseData = useLoaderData();
  const [loading, setloading] = useState(false);
  const [fetchtingMore, setfetchtingMore] = useState(false);
  const { blogs, total, pageCount, size, page } = responseData;
  const [pageSize, setPageSize] = useState(size);
  const [totalBlogs, setTotalBlogs] = useState(+total)
  const [pageNum, setPageNum] = useState(+page || 1);
  const [blogsToDisplay, setblogsToDisplay] = useState([...blogs]);
  const [offset, setoffset] = useState(+size);
  const [loadedBlogsIds, setloadedBlogsIds] = useState(blogs?.map(blog => blog?._id));
  const [keyword, setkeyword] = useState('');

  
  const fetchMoreBlogs = async () => {
    setfetchtingMore(true);
    await AxiosInstance.get(`/blogs/infinite?page=${Number(pageNum)}&size=${Number(pageSize)}&offset=${offset}`)
      .then((res) => {
        const newBlogs = res?.data?.blogs;
        const newBlogsConfirm = newBlogs?.filter(blog => !loadedBlogsIds?.includes(blog?._id))
        const newLoadedIds = newBlogsConfirm?.map((blog) => blog?._id)
        setloadedBlogsIds(prev => [...prev, ...newLoadedIds])
        setblogsToDisplay(previousBlogs => [...previousBlogs, ...newBlogsConfirm]);
        setPageSize(prev => +res?.data?.size);
        setPageNum(Number(res?.data?.page) + 1);
        setoffset(prev => prev + newBlogsConfirm?.length)
        setTotalBlogs(prev => Number(res?.data?.total))

      })
      .catch(() => { })
      .finally(() => {
        setfetchtingMore(false);
      });
  };

  useEffect(() => {
    const options = {
      root: blogWrapperRef.current, // null means it uses the viewport as the container
      rootMargin: '0px',
      threshold: 0, // The sentinel is considered visible when 100% visible
    };

    let intersectionObserverRef = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting
        && !fetchtingMore &&
        (blogsToDisplay?.length !== totalBlogs) && !fetchtingMore) {
        console.log('we are fetching more now');
        setPageNum(prev => prev + 1)
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
            <RotatingLineLoader />
          </div>
        ) : (
            <div>
            <div className="blogs-wrapper">
              {blogsToDisplay?.map((blog, index) => (
                <BlogCard blog={blog} key={blog?._id} />
              ))}
              <div id="fetchMoreElement" ref={fetchMoreRef}></div>
              {fetchtingMore &&
                <div
                  style={{ width: '100%', textAlign: 'center',display:'flex', justifyContent:'center' }}>
                 <OvalLoader />
                </div>}
              {/* {loading &&
                  <CircularProgress 
                  sx={{fontSize:'2rem', color:"green"}}
                />} */}
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
                showTotal={(total) => `Total blogs ${totalBlogs}`}
                total={totalBlogs}
              />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
