import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import '../../assets/css/usersTableRow.css'
import ConfirmDelete from '../Modal/ConfirmDelete';
import { AxiosInstance } from '../../api';
import { DefinedStatus } from '../../utils/globalValues';
import UseAuth from '../../hooks/useAuth';

const UserTableRow = ({ user, resetFunction }) => {
    const { token } = UseAuth()
    const [userData, setuserData] = useState({ ...user });

    const [openModal, setopenModal] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [message, setmessage] = useState(`${userData?.status}  ${userData?.username} account`);
    const [activating, setactivating] = useState(false);
    const [isStatusChange, setisStatusChange] = useState(userData?.status !== user?.status);
    const [editStatus, seteditStatus] = useState(false);

    const handleUserDataStatusChange = (e) => {
        setuserData({ ...userData, status: e.target.value })
    }

    const handleEditableChange = (e) => {
        seteditStatus(prev => !prev)
        // setuserData({...user})
    }
    const handleResetUser = () => {
        setuserData({ ...user })
        seteditStatus(false)
    }


    const ChangeUserStatus = async () => {
        if (user?.status === userData?.status) return;
        setactivating(true)
        await AxiosInstance.put(`/users/${userData?._id}/status_change`,
            { status:userData?.status },
            { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setsuccessMessage(res?.data?.message)
                console.log(res);
                setactivating(false)
            }).then(() => {
                resetFunction()
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
                    {/* <span className={`active_text ${userData?.active? 'active':''}`}
                >{userData?.active ? 'active' : 'idle'}
                </span>   */}

                    {editStatus ?
                        <select className='status_select'
                            multiple={false}
                            value={userData?.status}
                            onChange={handleUserDataStatusChange}
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
                        :
                        <span> {userData?.status}</span>
                    }
                </TableCell>
                <TableCell
                    sx={{
                        color: 'var(--text-color)',
                        fontSize: '.9rem'
                    }}
                >
                    <Stack direction={'row'} spacing={'6px'}>
                        {!editStatus ?
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
                        }
                    </Stack>
                </TableCell>


            </TableRow>
            <ConfirmDelete open={openModal}
                setopen={setopenModal}
                message={`${userData?.status}  ${userData?.username} account`}
                errorMessage={errorMessage}
                succcessMsg={successMessage}
                loadingText={'loading'}
                textContent={`${userData?.status}`}
                deleteFunction={ChangeUserStatus}
                resetFunc={() => {
                    setopenModal(false)
                    setsuccessMessage('')
                    seterrorMessage('')
                }}
                deleteLoading={activating}
            />
        </>

    );
}

export default UserTableRow;
