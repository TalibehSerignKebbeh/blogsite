import React, { useState,useEffect } from "react";
import "./index.css";
import ColumnCard from "./Cards/ColumnCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { AxiosInstance } from "../../api";
import UseAuth from "../../hooks/useAuth";
import { useContextHook } from "../../context/AuthContext";
import UsersBlogTable from "../Blog/Table/UsersBlogTable";
import RotatingLineLoader from "../Loader/RotatingLineLoader";

const UserDashboard = () => {
    const { token, id } = UseAuth()
    const { authToken } = useContextHook()
    const [isLoading, setisLoading] = useState(false);
    const [isLoadSuccess, setisLoadSuccess] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const [LikeBlogs, setLikeBlogs] = useState([]);
    const [usersBlogs, setusersBlogs] = useState([]);
    const [recentUsers, setrecentUsers] = useState([]);
    const [likedBlogs, setlikedBlogs] = useState([]);
    const [blogCount, setblogCount] = useState(0);
    const [likeBlogCount, setlikeBlogCount] = useState(0);
    const [publishBlogsCount, setPublishBlogsCount] = useState(0);
    const [notPublishBlogsCount, setNotPublishBlogsCount] = useState(0);


    useEffect(() => {
        const fetchStatistics = async () => {
            setisLoadSuccess(false)
            setisLoading(false)
            await AxiosInstance.get(`/blogs/stats/user`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { user: id }
                })
                .then((res) => {
                    setisLoadSuccess(true)
                    // const { data: {
                    //     blogCount,
                    //     likedBlogCount,
                    //     likeBlogs, blogs } }
                    //     = res;
                    setusersBlogs(res?.data?.blogs)
                    setlikedBlogs(res?.data?.likeBlogs)
                    setblogCount(res?.data?.blogCount)
                    setlikeBlogCount(res?.data?.likedBlogCount)
                    setPublishBlogsCount(res?.data?.publishCount)
                    setNotPublishBlogsCount(res?.data?.notPublishCount)
                    console.log(res);
                }).catch(err => {
                    if (!err?.response) {
                        seterrorMsg('No response server')
                        return;
                    }
                    if (!err?.response?.status === 500) {
                        seterrorMsg('internal server error')
                        return;
                    }
                    if (!err?.response?.status === 403) {
                        seterrorMsg('your authentication state has expired')
                        return;
                    }
                    const message = err?.response?.data?.message;
                    if (message) {
                        seterrorMsg(message)
                        return;
                    }
                    seterrorMsg('An uncaught error has occured')
                    console.log(err);
                }).finally(() => {
                    setisLoading(false)
                })

        }

        fetchStatistics()
        return () => {

        };
    }, []);
    if (isLoading)
        return <RotatingLineLoader />
    if (isLoadSuccess) {

        return (
            <div style={{ backgroundColor: `var(--bg-color)` }}>

                <div className="card-stats">

                    <ColumnCard
                        icon={
                            <FontAwesomeIcon
                                className="card-icon"
                                icon={faBlog}
                                size="2xl"
                                color="rgb(25, 78, 8)"
                            />
                        }
                        amount={blogCount}
                        title={"Total blogs"}
                    />
                    <ColumnCard
                        icon={
                            <FontAwesomeIcon
                                className="card-icon"
                                icon={faBlog}
                                size="2xl"
                                color="rgb(25, 78, 8)"
                            />
                        }
                        amount={publishBlogsCount}
                        title={"Publish blogs"}
                    />
                    <ColumnCard
                        icon={
                            <FontAwesomeIcon
                                className="card-icon"
                                icon={faBlog}
                                size="2xl"
                                color="rgb(25, 78, 8)"
                            />
                        }
                        amount={notPublishBlogsCount}
                        title={"not publish"}
                    />
                    <ColumnCard
                        icon={
                            <FontAwesomeIcon
                                className="card-icon"
                                icon={faThumbsUp}
                                size="2xl"
                                color="rgb(25, 78, 8)"
                            />
                        }
                        amount={likeBlogCount}
                        title={"Liked Blogs"}
                    />


                </div>
                <div className="user_blogs_wrapper">
                    {usersBlogs?.length ?
                        <UsersBlogTable 
                        blogs={usersBlogs}
                            title={"My Blogs"}
                            isMine={true}
                        />
                        : null}
                    
                    
                    {likedBlogs?.length ?
                        <UsersBlogTable 
                        blogs={likedBlogs}
                        title={"Like Blogs"}
                    />: null}
               </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <p>{errorMsg}</p>
            </div>
        </div>
    )
};

export default UserDashboard;
