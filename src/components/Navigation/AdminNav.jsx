import React from 'react';
import './adminnav.css'
import NavLi from './NavLi';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import UseAuth from '../../hooks/useAuth';
import { BlockedStatus } from '../../utils/globalValues';

const AdminBlogLinks = [
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs/newblog'} >New</NavLink>
    ,
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs'} >blogs</NavLink>

]

const userBloglinks = [
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs/newblog'} >New</NavLink>
    ,
        <NavLink className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
         to={'dash/blogs/myblogs'} >my blogs</NavLink>

]


const AdminNav = ({ isNavOpen, setisNavOpen }) => {
    
    const {isAdmin, token,isUser, status} = UseAuth()

    if (!token || Object.values(BlockedStatus).includes(status))
        return null
    
    return (
        <aside className={`sidebar-wrapper ${isNavOpen ? 'active' : ''}`}>
            <div className='infor-wrapper'>
                <h2 className='dashbordtitle'>
                    {isAdmin ? 'Admin\'s Dashboard'
                        :
                        isUser ? "User's Dashboard"
                        :''}
                </h2>
            </div>
           
            <div className='links-ul-wrapper'>

                <ul className='admin-links'>
                    <NavLi title={'dashboard'} path={'dash'} children={[]} />
                    {isAdmin ?
                        <NavLi title={'blog'}
                        path={''}
                            children={AdminBlogLinks?.map((blogLink, index) => (
                                <li key={index}>
                                    {blogLink}
                            </li>
                        ))} />
                        : isUser?
                        <NavLi title={'blog'}
                        path={''}
                            children={userBloglinks?.map((blogLink, index) => (
                               <li key={index}>
                                    {blogLink}
                            </li>
                            ))} />
                            :
                            null
                    }
                
                    {isAdmin ?
                        <NavLi title={'users'}
                            path={'dash/users'}
                            children={[]} 
                            />
                    : null}
                    <NavLi title={'profile'} path={'profile'} children={[]} />
                    
                </ul>

            </div>
            <div className='bottom-elem'>
                <LogoutButton />

            </div>
        </aside>
    );
}

export default AdminNav;
