import React, { useState } from 'react';
import CustomBtn from '../Button/CustomBtn';
import './Topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ToggleDark from '../ToggleDark';
import NotificationWrapper from '../Notification/NotificationWrapper';
import { useEffect } from 'react';
import { useScoketContenxt } from '../../context/socketContext';
import { notificationState, notificationsActions } from '../../store/notificationStore';
import { getAuthData } from '../../store/store';

const TopBar = ({ isNavOpen, setisNavOpen }) => {
      const { notifications, actions } = notificationState
    // const { SetNotifications, AddNotification } = actions
    const { SetNotifications, AddNotification } = notificationsActions
    const { socket } = useScoketContenxt()
    const [openNotification, setOpenNotification] = useState(false)
    const [notyData, setNotyData] = useState([]);
    const role = getAuthData()?.role;
    const user = getAuthData()?.id;

    useEffect(() => {
        console.log('topBar useEffect ');
        // console.log(notifications);
        socket?.emit(`get_notifications`,{role:role, user:user})
        
        socket?.on(`notifications`, (data) => {
            // console.log(data);
            // setnotifications([...data])
            setNotyData([...data])
            SetNotifications([...data])
        })
         socket?.on(`blogpostnotify`, (data) => {
            console.log(data);
             console.log('blog posted');
             AddNotification(data)
            // setnotifications(prev=>[...prev, data])
        })
        return () => {
            
        };
    }, [socket]);


    return (
        <div className='topbar-wrapper' >
            <CustomBtn handleClick={()=> setisNavOpen(prev=>!prev)} 
                buttonclas={'nav-toggle'}
                text={<FontAwesomeIcon icon={faBars} size='2x'

                />}
            />
            <div style={{ marginRight: '10px', display: 'flex', gap: '14px', position:'relative' }}>
                <button className='nofication_btn'
                onClick={()=>setOpenNotification(prev=>!prev)}>
                    <span>Notifications</span>
                    
                    {notyData?.length ?
                        <span className='notification_value'>
                            {notyData?.length}
                        </span>
                        : null
                    }
                
                </button>
                {openNotification ?
                    <NotificationWrapper 
                        data={notyData}
                        setData={setNotyData}
                    /> : null}
                <ToggleDark />

            </div>
        </div>
    );
}

export default TopBar;
