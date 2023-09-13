import React from 'react';
import successImg from '../../assets/images/success.png'

const ModalSuccessComponent = ({ successMessage }) => {
    
    return (
        <div className='success_wrapper'>
                        <img src={successImg} 
                            loading='lazy'
                            alt=''
                        />
                        <p>{successMessage }</p>
                    </div>
    );
}

export default ModalSuccessComponent;
