import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navlink.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const NavLi = ({ title, path, children }) => {
    // console.log(children);   
    let childrenHeight = 0;
    if (children?.length) {
        childrenHeight = children?.length * 26;
    }
    const [isExpanded, setisExpanded] = useState(false);
    return (<li id=''
        className={`main-list ${isExpanded ? 'active' : ''}`}>
        {children?.length ?
            <>
                <button onClick={() => setisExpanded(!isExpanded)}
                    className='nav-title-btn'>
                    <span className='expand-title'>{title}</span>
                    <span className='icon'><NavigateNextIcon fontSize='small'/></span></button>
                <ul style={{
                    height: isExpanded ? `${childrenHeight}px` : '0px',
                    
                }}
                    className={`child-links ${isExpanded ? 'active' : ''}`}>
                    {children}
                </ul>
            </> :
            <NavLink to={path}
                className={ ({isActive})=>(isActive? 'nav-link active': 'nav-link' )}
            > {title}</NavLink>
        }
    </li>);
}

export default NavLi;
