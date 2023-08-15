import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useContextHook } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../hooks/useAuth';
// import AdminNav from './AdminNav';
import LogoutButton from './LogoutButton';

import ToggleDark from '../ToggleDark';
import { ToggleButton } from '@mui/material';
import {MenuSharp} from '@mui/icons-material'

function NavbarLanding() {
  const { role, username } = UseAuth()
  const navigate = useNavigate()
  const { authToken, clearAuthToken, dark,toggleDark, } = useContextHook()
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null)

  const handleClick = () => {
    setShowMenu(prev => !prev);
  };
 
  
  return (
    <nav>
      <div className="logo">
        <Link to="/">TechBlogs</Link>
        <h4>{username}</h4>
      </div>
      <div>
        
        <ul ref={menuRef} className={showMenu ? 'nav-links active' : 'nav-links'}
          // style={{ backgroundColor: dark ? '#3334' : '#fff' }}
        >
          {/* <li>
            <Link className='nav_link' to="/">Home</Link>
          </li> */}
          {/* <DropdownUl childlinks={<>
             <li className=''>
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'category/'} >New</NavLink>
    </li>
    <li className=''>
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'category'} >blogs</NavLink>
    </li>
           </>}/> */}

          {!authToken?.length ?
            <>
              <li>
                <Link className='nav_link' to="/register">register</Link>
              </li>
              <li>
                <Link className='nav_link' to="/login">login</Link>
              </li>
             <ToggleDark />
             
            </>
            :
            <>
              <li>
                <Link className='nav_link' to="/profile">Profile</Link>
              </li>
              <LogoutButton />
             <ToggleDark />

             
            </>
          }

          <button className='close-btn' onClick={handleClick}>X</button>
        </ul>
      </div>

      <div className="menu-icon" >
        <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
        <button className='nav-btn show-btn' onClick={handleClick}>
          <MenuSharp />
        </button>
      </div>
    </nav>
  );
}

export default NavbarLanding;
