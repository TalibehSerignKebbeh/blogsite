import React, { useState, useEffect } from "react";
import BlogCard from "../components/Blog/BlogCard";
import "./blogs.css";
import { useLoaderData } from "react-router-dom";
import { AxiosInstance } from "../api";
import { Pagination } from "antd";
import OtherSamples from "../components/Blog/Cards/OtherSamples";
const Blogs = () => {
  const responseData = useLoaderData();
  const [loading, setloading] = useState(false);
    const { blogs, total, pageCount, size, page } = responseData;
    console.log(responseData);
  const [pageSize, setPageSize] = useState(size);
  const [pageNum, setPageNum] = useState(page == 0 ? 1 : page);
  const [blogsToDisplay, setblogsToDisplay] = useState([...blogs]);

  useEffect(() => {
    const fetchAgain = async () => {
      setloading(true);
      await AxiosInstance.get(
        `/blogs?page=${Number(pageNum) - 1}&size=${Number(pageSize)}`
      )
        .then((res) => {
          setblogsToDisplay(res?.data?.blogs);
          setPageSize(res?.data?.size);
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
  }, [pageNum, pageSize]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="blogs-landing">
        {!blogsToDisplay?.length && loading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          <div>
              <div className="blogs-wrapper">
                {!blogsToDisplay?.length && loading
                && <div> <h3>Loading more ...</h3> </div>}
              {blogsToDisplay?.map((blog, id) => (
                <BlogCard blog={blog} key={id} />
              ))}
                                  
                          </div>
            <div className="pagination-wrapper">
                          
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
              </div>
              {/* <OtherSamples /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
