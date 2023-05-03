import React from 'react';
import './rowcard.css'
const RowCard = ({icon, title, subtitle}) => {
    return (
        <div className='row-card'>
            <div className='text-wrapper'>
             <h1 className='title'>{title}</h1>
             <h1 className='subtitle'>{subtitle}</h1>
            </div>
            <div className=''>
                <div className='icon_wrapper'>

                 {icon}
                </div>
            </div>
        </div>
    );
}

export default RowCard;
