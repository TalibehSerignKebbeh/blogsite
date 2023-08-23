import React from 'react';
import '.././assets/css/success.css'

const SuccessComponent = ({message, icon, link}) => {
    return (
        <div className='success_container'>
            <div className='wrapper'>
            <button>Reset</button>
            {icon}
                <p>{message}</p>
                {link}
            </div>
        </div>
    );
}

export default SuccessComponent;
