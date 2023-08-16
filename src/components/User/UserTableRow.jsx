import React,{ useState } from 'react';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';
import  Stack  from '@mui/material/Stack';
import '../../assets/css/usersTableRow.css'
import ConfirmDelete from '../Modal/ConfirmDelete';
import { AxiosInstance } from '../../api';
import UseAuth from '../../hooks/useAuth';

const UserTableRow = ({ user, resetFunction }) => {
    const {token} = UseAuth()
    const [openModal, setopenModal] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [message, setmessage] = useState(`${user?.active? 'deactivate':'active'}  ${user?.username} account`);
    const [activating, setactivating] = useState(false);

    const ChangeUserStatus = async () => {
        setactivating(true)
        await AxiosInstance.patch(`/users/${user?._id}`,
        {},{headers:{Authorization:`Bearer ${token}`}})
            .then((res) => {
                setsuccessMessage(res?.data?.message)
                console.log(res);
                setactivating(false)
            }).then(async() => {
                 await resetFunction()
            })
            .catch((err) => {
                console.log(err);
                setactivating(false)
                const errorMessage = !err?.response ? 'no server response'
        : err?.response?.status === 500 ? 'internal server error'
          : err?.response?.data?.message ?
            err?.response?.data?.message
            : 'uncatch error occured'
      seterrorMessage(errorMessage);
            })
    }


    return (
        <TableRow>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.firstName}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.lastName}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.username}
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.email}
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.public_name}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >{user?.role}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >
                <span className={`active_text ${user?.active? 'active':''}`}
                >{user?.active ? 'active' : 'idle'}
                </span>  
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'.9rem'}}
            >
                <Stack direction={'row'}>
                    <button
                        onClick={()=>setopenModal(true)}
                        className={`active_btn ${user?.active? 'active':''}`}>
                       {user?.active? 'Deactivate':'Activate'}
                    </button>
                </Stack>
            </TableCell>

             <ConfirmDelete open={openModal}
        setopen={setopenModal}
        message={message}
        errorMessage={errorMessage}
                succcessMsg={successMessage}
                loadingText={'loading'}
                textContent={`${user?.active? 'deactivate':'activate'}`}
                deleteFunction={ChangeUserStatus}
        resetFunc={() => {
            setopenModal(false)
            setsuccessMessage('')
            seterrorMessage('')
         }}
        deleteLoading={activating}
/>
        </TableRow>
    );
}

export default UserTableRow;
