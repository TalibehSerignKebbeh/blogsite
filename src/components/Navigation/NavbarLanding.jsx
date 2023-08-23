import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ToggleDark from '../ToggleDark';
import MenuSharp from '@mui/icons-material/MenuSharp'
import SearchBlog from './SearchBlog';
import  SearchOutlined  from '@mui/icons-material/SearchOutlined';
import SearchComponent from '../Blog/SearchComponent';


function NavbarLanding() {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const menuRef = useRef(null)

  const handleClick = () => {
    setShowMenu(prev => !prev);
  };


  return (
    <nav>
      <SearchComponent setShowSearch={setshowSearch}
        showSearch={showSearch}
      />
        <div className="logo">
          <Link to="/">TechBlogs</Link>
        </div>
        <div>

        <ul ref={menuRef} className={showMenu ? 'nav-links active' : 'nav-links'}
        >
           <button 
                onClick={()=>setshowSearch(true)}
            className='search_btn'>
            <SearchOutlined />
          </button>
          <li>
            <Link className='nav_link' 
            to="/register">register
            </Link>
          </li>
          <li>
            <Link className='nav_link' 
            to="/login">login
            </Link>
          </li>
           <ToggleDark />

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
