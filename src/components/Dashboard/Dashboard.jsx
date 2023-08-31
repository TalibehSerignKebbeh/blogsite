import React, { useState } from "react";
import UseAuth from "../../hooks/useAuth";
import { useContextHook } from "../../context/AppContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { token, role } = UseAuth()
 
  
  if (role === 'admin')
  {
    return (<AdminDashboard />)
  }
  if (role === 'user')
     {return (<UserDashboard />)
     }
    return (
      <div style={{backgroundColor: `var(--bg-color)`}}>

        
      </div>
    );
  }



export default Dashboard;
