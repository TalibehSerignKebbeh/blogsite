import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import './index.css'
import { useContextHook } from '../../context/AppContext';
import {notificationActions} from '../../store/notificationStore'
import {getActions} from '../../store/store'

const AuthErrorPage = () => {
    const navigate = useNavigate()
    const error = useRouteError();
    const {clearTokens} = getActions()
    const {ClearNotifications} = notificationActions()
    console.log(error);
    const handleNavigateToLogin = () => {
        clearTokens()
        ClearNotifications()
        navigate(`/login`)
    }
    console.log(error);
    if (error?.response?.status === 403)
        return (
            <div id='expired-component' className='error-container'>
                <div className='expired-wrapper'>
                    <h3>Opps</h3>
                    <h2>{ error?.response?.status}</h2>
                    <hr />
                <h2>Token has expired!</h2>
                <button className='btn exp-btn' onClick={handleNavigateToLogin}>Login</button>
                </div>
            </div>)
    return (
        <div className='error-container'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message
                || error?.response?.message}</i>
                <br />
                <i>{JSON.stringify(error.data)}</i>
            </p>

        </div>
    );
}

export default AuthErrorPage;
