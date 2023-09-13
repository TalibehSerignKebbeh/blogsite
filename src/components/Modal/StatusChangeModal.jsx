import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {  DefinedStatus } from '../../utils/globalValues';
import './modal.css'
import { AxiosInstance } from '../../api';
import UseAuth from '../../hooks/useAuth';
import ModalSuccessComponent from './ModalSuccessComponent';
import { QueryClient } from '@tanstack/react-query';
import { useScoketContenxt } from '../../context/socketContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StatusChangeModal = ({ open,
    setOpen,user, resetFunction
}) =>
{
        const {socket} = useScoketContenxt()
    const { token } = UseAuth()
    const controller = new AbortController()
    const queryClient = new QueryClient()
    const [status, setStatus] = useState(user?.status);
     const [successMessage, setsuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        if (loading) {
            controller.abort('request cancelled by user')
            return
        }
        setOpen(false)
    }

     const ChangeUserStatus = async () => {
         if (user?.status === status) return;
         setLoading(true)
         seterrorMessage('')
        await AxiosInstance.put(`/users/${user?._id}/status_change`,
            { status:status },
            {
                headers: { Authorization: `Bearer ${token}` },
            signal:controller.signal})
            .then((res) => {
                setsuccessMessage(res?.data?.message)
                console.log(res);
                // queryClient.invalidateQueries({ exact: true, queryKey: ['users'] })
                resetFunction()
                                // socket?.emit(`account_status`, {user:id, target_user: user?._id})
            })
            .catch((err) => {
                console.log(err);
                const errorMessage = !err?.response ? 'no server response'
                    : err?.response?.status === 500 ? 'internal server error'
                        : err?.response?.data?.message ?
                            err?.response?.data?.message
                            : 'uncatch error occured'
                seterrorMessage(errorMessage);
            }).finally(() => {
              setLoading(false)
            })
    }
    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
             fullWidth={false}
            fullScreen={false}
        
        >
            <div className='modal'>
                {successMessage?.length ?
                    <ModalSuccessComponent 
                        successMessage={successMessage}
                    />
                    :
                    <div className='select_wrapper'>
                    <p>Change user status</p>
                     <select className='roles_select'
                            multiple={false}
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            {Object.values(DefinedStatus)
                                ?.map((value, ind) => (
                                    <option key={ind}
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                ))}
                        </select>
                        {errorMessage?.length ?
                            <p id='error_msg'>{errorMessage}</p>
                            : null
                        }
                </div>}
                <div className='roles_select_buttons_wrapper'>
                    <button
                        className='reset_btn'
                        onClick={handleCloseModal}>
                        {loading? 'Cancell': "Close"}
                    </button>
                    <button
                        onClick={ChangeUserStatus}
                        disabled={user?.status === status}
                        className='submit_btn'>Submit</button>
                </div>
            </div>
            
        </Dialog>
    );
}

export default StatusChangeModal;
