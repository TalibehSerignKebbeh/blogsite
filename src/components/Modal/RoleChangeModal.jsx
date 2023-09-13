import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { AllowedRoles } from '../../utils/globalValues';
import './modal.css'
import { AxiosInstance } from '../../api';
import UseAuth from '../../hooks/useAuth';
import { QueryClient } from '@tanstack/react-query';
import ModalSuccessComponent from './ModalSuccessComponent';
import { useScoketContenxt } from '../../context/socketContext';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const RoleChangeModal = ({ open,
    setOpen,user,resetFunction
}) =>
{
    const {socket} = useScoketContenxt()
    const queryClient = new QueryClient()
    const [role, setRole] = useState(user?.role);
     const { token, id,  } = UseAuth()
    const controller = new AbortController()
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

     const ChangeUserRole = async () => {
         if (user?.role === role) return;
         setLoading(true)
        await AxiosInstance.patch(`/users/${user?._id}/status_change`,
            { role:role },
            {
                headers: { Authorization: `Bearer ${token}` },
            signal:controller.signal})
            .then((res) => {
                setsuccessMessage(res?.data?.message)
                const notificationId = res?.data?.notificationId;
                // console.log(res);
                // queryClient.invalidateQueries({ exact: true, queryKey: ['users'] })
                resetFunction()
                socket?.emit(`account_status`, {user:id, target_user: user?._id, notificationId})
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
                    <p>Change user role</p>
                     <select className='roles_select'
                            multiple={false}
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                        >
                            {Object.values(AllowedRoles)
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
                        onClick={handleCloseModal}>
                        Close
                    </button>
                    <button
                        onClick={ChangeUserRole}
                        disabled={user?.role === role}
                        className='submit_btn'>Submit</button>
                </div>
            </div>
            
        </Dialog>
    );
}

export default RoleChangeModal;
