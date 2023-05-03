import React from 'react';
import './unathorized.css'
import image from '../../assets/login-bg.26a96a34.svg'
const UnAuthorized = () => {
    return (
        <div className='page-container unathorized'>
            <div className='wrapper'>
                <p>Opps!</p>
                <hr />
                <img className='page-image' src={image} />
                <h2>You are not authorized to access this content</h2>
            </div>
        </div>
    );
}

export default UnAuthorized;
