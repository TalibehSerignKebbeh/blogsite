import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useContextHook } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../hooks/useAuth';
import AdminNav from './AdminNav';
import LogoutButton from './LogoutButton';

function NavbarLanding() {
  const { role, username } = UseAuth()
  const navigate = useNavigate()
  const { authToken, clearAuthToken } = useContextHook()

  

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null)

  const handleClick = () => {
    setShowMenu(prev => !prev);
  };
  useEffect(() => {

    window.addEventListener('click', (e) => {
      if (showMenu) {
        console.log(`window click from navbarlanding page`)
        if (!menuRef?.current?.contains(e.target)) {
          setShowMenu(false)
        }
      }
      })
    
  }, [showMenu]);
 
  return (
    <nav>
      <div className="logo">
        <Link to="/">TechBlogs</Link>
        <h4>{username}</h4>
      </div>
      <div>

        <ul ref={menuRef} className={showMenu ? 'nav-links active' : 'nav-links'}>
          <li>
            <Link to="/">Home</Link>
          </li>
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
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
                <Link to="/signin">SignIn</Link>
              </li>
              {/* <li>
                <Link to="/contact">Contact</Link>
              </li> */}
            </>
            :
            <>
              <LogoutButton />
            </>
          }

          <button className='close-btn' onClick={handleClick}>X</button>
        </ul>
      </div>

      <div className="menu-icon" >
        <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
        <button className='nav-btn show-btn' onClick={handleClick}>Show</button>
      </div>
    </nav>
  );
}

export default NavbarLanding;
