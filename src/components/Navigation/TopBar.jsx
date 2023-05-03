import React from 'react';
import CustomBtn from '../Button/CustomBtn';
import './Topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';


const TopBar = ({isNavOpen, setisNavOpen}) => {
    return (
        <div className='topbar-wrapper' >
            <CustomBtn handleClick={()=> setisNavOpen(prev=>!prev)} 
                buttonclas={'nav-toggle'}
                text={<FontAwesomeIcon icon={faBars} size='xl'/>}
            />
        </div>
    );
}

export default TopBar;
