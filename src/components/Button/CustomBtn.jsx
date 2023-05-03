import React from 'react';

const CustomBtn = ({text, handleClick, buttonclas}) => {
    return (
        <button onClick={handleClick} className={`${buttonclas}`}>
            {text}
        </button>
    );
}

export default CustomBtn;
