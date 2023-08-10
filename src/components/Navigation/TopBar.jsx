import React from 'react';
import CustomBtn from '../Button/CustomBtn';
import './Topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ToggleDark from '../ToggleDark';

const TopBar = ({isNavOpen, setisNavOpen}) => {
    return (
        <div className='topbar-wrapper' >
            <CustomBtn handleClick={()=> setisNavOpen(prev=>!prev)} 
                buttonclas={'nav-toggle'}
                text={<FontAwesomeIcon icon={faBars} size='2x'

                />}
            />
            <div style={{marginRight:'10px'}}>
                <ToggleDark />
            </div>
        </div>
    );
}

export default TopBar;
