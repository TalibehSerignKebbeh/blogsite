import React, { useState } from 'react';
import { AllowedRoles } from '../../utils/globalValues';
import { formatDate } from '../Config'


const NotificationItem = ({ notification }) => {
    const [viewUser, setviewUser] = useState(false);
    return (
         <section 
                        className={`notification`}
                    >
                        {(notification && !notification?.read) ? <>
                            <small className='new'>new</small><br />
                        </>
                            : null}
                        <p className=''
                            style={{ color: 'var(--text-color)' }}
                        >{notification?.message}</p>
            <p
                style={{ color: 'var(--text-color)', fontSize:'.9rem' }}
            >
                {formatDate(notification?.date)}
            </p>
            
                        {((notification?.modelname === AllowedRoles.user) && notification?.user)?
                            <section className='flex_column'>
                                <section>
                                    <span>username</span>
                                    <h3>{ notification?.user?.username}</h3>
                                </section>
                                <section>
                                    <span>firstname</span>
                                    <h3>{ notification?.user?.firstName}</h3>
                                </section>
                                 <section>
                                    <span>lastName</span>
                                    <h3>{ notification?.user?.lastName}</h3>
                                </section>
                                {notification?.user?.email ?
                                    <section>
                                    <span>email</span>
                                    <h3>{ notification?.user?.email}</h3>
                                    </section> : null}
                                 {notification?.user?.public_name ?
                                    <section>
                                    <span>public_name</span>
                                    <h3>{ notification?.user?.public_name}</h3>
                                </section> : null}
                            </section>
                        : null}
                    </section>
    );
}

export default NotificationItem;
