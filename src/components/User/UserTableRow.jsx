import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import '../../assets/css/usersTableRow.css'
import RoleChangeModal from '../Modal/RoleChangeModal';
import StatusChangeModal from '../Modal/StatusChangeModal';

const UserTableRow = ({ user, resetFunction }) => {
    const [userData, setuserData] = useState({ ...user });

   const [editStatus, seteditStatus] = useState(false);

    // roles change modal associated bindings
    const [openRolesChange, setopenRolesChange] = useState(false);
    

    const handleEditableChange = (e) => {
        seteditStatus(prev => !prev)
    }

    
    return (
        <>

            <TableRow>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.firstName}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.lastName}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.username}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.email}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.public_name}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >{userData?.role}
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >
                        <span> {userData?.status}</span>
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >
                    <Stack direction={'row'} spacing={'6px'}>
                        {/* {!editStatus ?
                            <button
                                onClick={handleEditableChange}
                                className='edit_btn'>Edit Status</button>
                            :
                            <>
                                <button
                                    disabled={user?.status === userData?.status}
                                    onClick={() => setopenModal(true)}
                                    className={`status_btn`}
                                >
                                    {userData?.status}
                                </button>

                                <button className='reset_btn'
                                    onClick={handleResetUser}
                                >Reset
                                </button>

                            </>
                        } */}
                         <button
                                onClick={handleEditableChange}
                                className='edit_btn'>Edit Status</button>
                        <button
                                onClick={()=>setopenRolesChange(true)}
                            className='edit_btn'>
                            Edit Role
                        </button>
                    </Stack>
                </TableCell>


            
            </TableRow>

            <RoleChangeModal 
                open={openRolesChange}
                setOpen={setopenRolesChange}
                user={user}
                resetFunction={resetFunction}
            />
 
            <StatusChangeModal open={editStatus} 
                setOpen={seteditStatus}
                user={user}
                resetFunction={resetFunction}

            />
        </>

    );
}

export default UserTableRow;
