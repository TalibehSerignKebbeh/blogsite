import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const SpinnerWings = () => {
    return (
        <RotatingLines
                        strokeColor="#47d147"
                        strokeWidth="5"
                        animationDuration="0.85"
                        width="96"
                        visible={true}
                    />
    );
}

export default SpinnerWings;
