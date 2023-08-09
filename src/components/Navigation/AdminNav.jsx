import React from 'react';
import './adminnav.css'
import NavLi from './NavLi';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import UseAuth from '../../hooks/useAuth';

const blogLinks = [<>
    <li className=''>
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs/newblog'} >New</NavLink>
    </li>
    <li className=''>
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs'} >blogs</NavLink>
    </li>

</>]
const AdminNav = ({ isNavOpen, setisNavOpen }) => {
    const { role, isAdmin, isEditor } = UseAuth()
    
    return (
        <aside className={`sidebar-wrapper ${isNavOpen ? 'active' : ''}`}>
            <div className='infor-wrapper'>

            <h2 className='dashbordtitle'>Tech Blogs</h2>
            </div>
            {/* <div></div> */}
            <div className='links-ul-wrapper'>

                <ul className='admin-links'>
                    <NavLi title={'dashboard'} path={'dash'} children={[]} />
                    <NavLi title={'blog'} path={''} children={[...blogLinks]} />

                    {isAdmin && <NavLi title={'users'} path={'dash/users'} children={[]} />}
                    
                </ul>

            </div>
            <div className='bottom-elem'>
                <LogoutButton />

            </div>
        </aside>
    );
}

export default AdminNav;
