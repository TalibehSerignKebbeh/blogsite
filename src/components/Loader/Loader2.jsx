import React from 'react';
import {CirclesWithBar, Blocks,Oval} from 'react-loader-spinner'

const Loader2 = () => {
    return (
        <div>
        <CirclesWithBar 
            barColor='green'
            innerCircleColor='white'
            outerCircleColor='brown'
            visible={true}
            width={'100'}
            
            />
            <Blocks 
                color='brown'
                height={'100'}
                width={'100'}
                visible={true}
            />
            <Oval
                strokeWidth={'5'}
                color='green'
                secondaryColor='lightblue'
                width={'100'}
                height={'100'}
                visible={true}
            />
        </div>
            
    );
}

export default Loader2;
