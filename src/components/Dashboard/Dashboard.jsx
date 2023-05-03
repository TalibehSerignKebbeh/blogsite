import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./index.css";
import RowCard from "./Cards/RowCard";
import ColumnCard from "./Cards/ColumnCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faStar } from "@fortawesome/free-solid-svg-icons";
import { faPeopleArrows,faUserEdit,faUserLock, faUserLarge } from "@fortawesome/free-solid-svg-icons";
// import faUser from '@fortawesome/free-regular-svg-icons'
import RecentBlogTable from "../Blog/Table/RecentBlogTable";

const Dashboard = () => {
  const loadedData = useLoaderData();
  const { recentUsers, blogCount, recentBlogs, editorCount, adminCount, subscribersCount } = loadedData;
  const [blogs, setblogs] = useState(recentBlogs);
  return (
    <div>
     
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
        <ColumnCard
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
        />
      </div>
      <div className="recent-container">

        <RecentBlogTable blogs={blogs} setblogs={setblogs} />
        
      </div>
    </div>
  );
};

export default Dashboard;
