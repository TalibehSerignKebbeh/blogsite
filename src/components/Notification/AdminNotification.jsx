import React from 'react';

const AdminNotification = () => {
    return (
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
    );
}

export default AdminNotification;
