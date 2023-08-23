import React from 'react';
import { Oval } from 'react-loader-spinner';

const OvalLoader = () => {
    return (
         <Oval
                strokeWidth={'5'}
                color='green'
                secondaryColor='lightblue'
                width={'100'}
                height={'100'}
            visible={true}
            
            />
    );
}

export default OvalLoader;
