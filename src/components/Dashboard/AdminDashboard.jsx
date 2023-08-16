import React, { useState } from "react";
import "./index.css";
import ColumnCard from "./Cards/ColumnCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog,  } from "@fortawesome/free-solid-svg-icons";
import { faPeopleArrows,  faUserLock, } from "@fortawesome/free-solid-svg-icons";
import RecentBlogTable from "../Blog/Table/RecentBlogTable";
import { useEffect } from "react";
import { AxiosInstance } from "../../api";
import UseAuth from "../../hooks/useAuth";
import { useContextHook } from "../../context/AuthContext";
import RotatingLineLoader from "../Loader/RotatingLineLoader";

const AdminDashboard = () => {

  const { token } = UseAuth()
  const { authToken } = useContextHook()
  const [isLoading, setisLoading] = useState(false);
  const [isLoadSuccess, setisLoadSuccess] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');

  const [unPublishBlogs, setUnPublish] = useState([]);
  const [recentUsers, setrecentUsers] = useState([]);
  const [blogCount, setblogCount] = useState(0);
  const [editorCount, seteditorCount] = useState(0);
  const [adminCount, setadminCount] = useState(0);
  const [subscribersCount, setsubscribersCount] = useState(0);


  useEffect(() => {
    const fetchStatistics = async () => {
      setisLoadSuccess(false)
      setisLoading(true)
      await AxiosInstance.get(`/blogs/stats`,
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setisLoadSuccess(true)
          const { data: { recentUsers, blogCount, unPublishBlogs,
            editorCount, adminCount, subscribersCount } } = res;
          setsubscribersCount(subscribersCount)
          setblogCount(blogCount)
          seteditorCount(editorCount)
          setadminCount(adminCount)
          setUnPublish(unPublishBlogs)
          setrecentUsers(recentUsers)
          console.log(res);
        }).catch(err => {
          if (!err?.response) {
            seterrorMsg('No response server')
            return;
          }
          if (!err?.response?.status===500) {
            seterrorMsg('internal server error')
            return;
          }
          if (!err?.response?.status===403) {
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
      <div style={{backgroundColor: `var(--bg-color)`, width:"100vw"}}>

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
                icon={faPeopleArrows}
                size="2xl"
                color="rgb(25, 78, 8)"
              />
            }
            amount={subscribersCount || 0}
            title={"Subscribers"}
          />
          <ColumnCard
            icon={
              <FontAwesomeIcon
                className="card-icon"
                icon={faUserLock}
                size="2xl"
                color="rgb(25, 78, 8)"
              />
            }
            amount={adminCount}
            title={"Admins"}
          />
          {/* <ColumnCard
            icon={
              <FontAwesomeIcon
                className="card-icon"
                icon={faUserEdit}
                size="2xl"
                color="rgb(25, 78, 8)"
              />
            }
            amount={editorCount}
            title={"Editors"}
          /> */}
        </div>
        <div className="recent-container">

          <RecentBlogTable blogs={unPublishBlogs} setblogs={setUnPublish} />

        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>{errorMsg }</p>
      </div>
  </div>
)
};

export default AdminDashboard;
