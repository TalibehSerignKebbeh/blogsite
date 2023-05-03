import React from 'react';
import './columncard.css'

const ColumnCard = ({icon, title, amount}) => {
    return (
        <div className='column-card'>
            <h2 className=''>{icon}</h2>
            <h4 className='title'>{title}</h4>
            <h3 className='amount'>{amount}</h3>
        </div>
    );
}

export default ColumnCard;
