import React, { useState } from 'react';
import CustomBtn from '../Button/CustomBtn';
import './Topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ToggleDark from '../ToggleDark';
import NotificationWrapper from '../Notification/NotificationWrapper';
import { useEffect } from 'react';
import { useScoketContenxt } from '../../context/socketContext';
import UseAuth from '../../hooks/useAuth';
import { notificationActions, getNotifications } from '../../store/notificationStore'

const TopBar = ({ isNavOpen, setisNavOpen }) => {
    const { socket } = useScoketContenxt()
     const [openNotification, setOpenNotification] = useState(false)
    const notifications = getNotifications()
    const { StoreNotifications, AddNotifications,ClearNotifications } = notificationActions()
    const { role, id, isAdmin, isUser } = UseAuth()

    const [unReads, setunReads] = useState(notifications?.filter((item) => (item && !item?.read))?.map(item => item?._id));

   
    const handleClickOpenNotifications = (e) => {
        setTimeout(() => {
            setOpenNotification(prev => !prev)
        }, 100);
    }

    useEffect(() => {

        // console.log(notifications);
        socket?.emit(`get_notifications`, { role: role, user: id })

       socket.on(`notification_read`, (data) => {
            if (data?.length) {
                setunReads(unReads?.filter(id => !data?.includes(id)))
                const newUnReads = unReads?.filter(id => !data?.includes(id));
                console.log(newUnReads);
                setunReads([newUnReads])
                const filteredNoti =
                    notifications?.filter(notiDatum =>
                        !data?.includes(notiDatum?._id));
                if (!filteredNoti?.length) {
                    ClearNotifications()
                    return;
                } else {

                    StoreNotifications(prev => [...filteredNoti])
                }
            }

        })

        // event for users notifications
        if (isUser) {
            socket?.on(`notifications_${role}_${id}`, (data) => {
                console.log(data);
                if (data?.length) {
                    StoreNotifications([...data])
                }
            })
            socket?.on(`account_status_${id}`, (data) => {
                if (data) {
                    AddNotifications(data)
                }
            })
        }

        // event for admin notifications
        if (isAdmin) {
            socket?.on(`notifications_${role}`, (data) => {
                if (data?.length) {
                    StoreNotifications([...data])
                }

            })
            socket?.on(`blogpostnotify`, (data) => {
                console.log(data);
                console.log('blog posted');
                if (data) {
                    AddNotifications(data)
                }
            })
        }

        return () => {

        };
    }, [socket]);


    return (
        <div className='topbar-wrapper' >
            <CustomBtn handleClick={() => setisNavOpen(prev => !prev)}
                buttonclas={'nav-toggle'}
                text={<FontAwesomeIcon icon={faBars} size='2x'

                />}
            />
            <div style={{ marginRight: '10px', display: 'flex', gap: '14px', position: 'relative' }}>
                <button className='nofication_btn'
                    onClick={handleClickOpenNotifications}>
                    <span>Notifications</span>


                    {notifications?.length ?
                        <span className='notification_value'>
                            {notifications?.length}
                        </span>
                        : null
                    }


                </button>
                {openNotification ?
                    <NotificationWrapper
                        
                        setOpen={setOpenNotification}
                        Open={openNotification}
                    />
                    : null}
                <ToggleDark />

            </div>
        </div>
    );
}

export default TopBar;
