import React, { useState } from 'react';
import './notification.css'
import { useScoketContenxt } from '../../context/socketContext';
import { useEffect } from 'react';
import { notificationState } from '../../store/notificationStore';
import { formatDate } from '../../components/Config'
import { getAuthData } from '../../store/store';
import { useRef } from 'react';

const NotificationWrapper = ({ data, setData }) => { 
    const notificationWrapperRef = useRef(null)
    const userId = getAuthData()?.id;
    const { notifications, actions } = notificationState
    const unreadIds = data?.filter((item) => !item?.read)?.map(item => item?._id);
    const { SetNotifications, AddNotification } = actions
    // console.log(notifications);
    const { socket } = useScoketContenxt()

    
    useEffect(() => {
        if (unreadIds?.length) {
            socket?.emit(`read_notification`, {
                ids: unreadIds, date: new Date(),
                userId: userId
            })
            
            socket.on(`notification_read`, (data) => {
                const filteredNoti = data?.filter(notiDatum => !data?.includes(notiDatum?._id));
                setData(filteredNoti)
            })
        }
        return () => {
            
        };
    }, []);

    return (
        <div className='notification_wrapper'
        ref={notificationWrapperRef}>
            <section className='notifications'>

                {data?.map((notification, index) => (
                    <section key={index}
                        className={`notification`}
                    >
                        {!notification?.read ? <>
                          <small className='new'>new</small><br />
                        </>
                            : null}
                        <p className=''
                            style={{color:'var(--text-color)'}}
                        >{notification?.message}</p>
                        <span>{
                           formatDate(notification?.date)}</span>
                    </section>
                ))}
            </section>
            
        </div>
    );
}

export default NotificationWrapper;
