import React from 'react';
import { RotatingLines } from 'react-loader-spinner'
import './index.css'
const RotatingLineLoader = () => {
    return (
        <div className='loader_wrapper'>
                    <RotatingLines
                        strokeColor="#47d147"
                        strokeWidth="5"
                        animationDuration="0.85"
                        width="96"
                        visible={true}
                    />
                </div>
    );
}

export default RotatingLineLoader;
