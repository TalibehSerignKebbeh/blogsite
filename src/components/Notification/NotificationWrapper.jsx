import React, { useState } from 'react';
import './notification.css'
import { useScoketContenxt } from '../../context/socketContext';
import { useEffect } from 'react';
import { formatDate } from '../../components/Config'
import { useRef } from 'react';
import UseAuth from '../../hooks/useAuth';
import { notificationActions, getNotifications } from '../../store/notificationStore';
import { AllowedRoles } from '../../utils/globalValues';
import NotificationItem from './NotificationItem';

const NotificationWrapper = ({ setOpen, Open }) => {
    const { StoreNotifications, ClearNotifications } = notificationActions()
    const notifications = getNotifications()
    const [unReads, setunReads] = useState(notifications?.filter((item) => (item && !item?.read))?.map(item => item?._id));
    const notificationWrapperRef = useRef(null)
    const { socket } = useScoketContenxt()
    const { id } = UseAuth()



    useEffect(() => {

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

        return () => {

        };
    }, []);

    useEffect(() => {

        document.addEventListener('click', e => {

            if (!Open && notificationWrapperRef?.current) { return };
            // console.log(Open);
            // console.log(Open);
            // console.log(notificationWrapperRef?.current?.classList);
            // console.log(notificationWrapperRef?.current?.getBoundingClientRect());
            const refRect = notificationWrapperRef?.current?.getBoundingClientRect();
            if (e.clientX < refRect?.left || e.clientX > refRect?.right
                || e.clientY < refRect?.top || e.clientY > refRect?.bottom
            ) {
                if (Open === true) {
                    setTimeout(() => {
                        if (unReads?.length) {

                            socket?.emit(`read_notification`, {
                                ids: unReads, date: new Date(),
                                userId: id
                            })
                        }
                        setOpen(false)
                    }, 10);
                    return;
                }
            }
        })
        return () => {
            //    window.removeEventListener() 
        };
    }, []);
    return (
        <div

            className={`notification_wrapper ${Open ? 'open' : ''}`}
            ref={notificationWrapperRef}>
            <section className='notifications'>

                {notifications?.map((notification, index) => (
                    <NotificationItem 
                        notification={notification}
                        key={index}
                   />
                ))}
            </section>

        </div>
    );
}

export default NotificationWrapper;
