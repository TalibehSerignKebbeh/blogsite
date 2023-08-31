import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ToggleDark from '../ToggleDark';
import MenuSharp from '@mui/icons-material/MenuSharp'
import SearchBlog from './SearchBlog';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SearchComponent from '../Blog/SearchComponent';
import { useContextHook } from '../../context/AppContext';


function NavbarLanding() {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  // const [showSearch, setshowSearch] = useState(false);
  const [showSearchComponent, setshowSearchComponent] = useState(false);
  const {showSearch, setshowSearch} = useContextHook()
  const menuRef = useRef(null)

  const handleClick = () => {
    setTimeout(() => {
      setShowMenu(prev => !prev);
    }, 70);
  };

  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      const refRect = menuRef?.current?.getBoundingClientRect();
      if (e.clientX < refRect?.left || e.clientX > refRect?.right
        || e.clientY < refRect?.top || e.clientY > refRect?.bottom
      ) {
        if (showMenu) {
          setTimeout(() => {
            setShowMenu(prev => false);
          }, 70);
        }
      }

    })

    return () => {

    };
  }, []);

  return (
    <nav>
      <SearchComponent setShowSearch={setshowSearch}
        showSearch={showSearch}
        showSearchComponent={showSearchComponent}
        setshowSearchComponent={setshowSearchComponent}
      />
      <div className="logo">
        <Link to="/">TechBlogs</Link>
      </div>
      <div>

        <ul ref={menuRef} className={showMenu ? 'nav-links active' : 'nav-links'}
        >
          {showSearch ?
            <button
              onClick={() => {

                // setshowSearch(true)
                setshowSearchComponent(true)
              }}
            className='search_btn'>
            <SearchOutlined />
          </button> : null}
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
