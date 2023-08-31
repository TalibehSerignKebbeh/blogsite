import React from 'react';
import UseAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import '../assets/css/errorpage.css'
import { useActions } from '../store/store';

const AccountBlockPage = () => {
    
    const { status } = UseAuth()
    const {clearTokens} = useActions()
    
    useEffect(() => {
        
        return () => {
            clearTokens()
        };
    }, []);
    return (
        <div id="error-page">
      <div className='error_wrapper'>

            <h1>Sorry!!!</h1>
                <p>Your account has been <strong>{status?.length? status : 'suspend or deleted'}</strong></p>
            
            </div>
            </div>
    );
}

export default AccountBlockPage;
