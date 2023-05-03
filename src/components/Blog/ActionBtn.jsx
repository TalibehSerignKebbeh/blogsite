import React from 'react';
import { AxiosInstance } from '../../api';
import { useState } from 'react';
import './ActionButtons.css'
import { Link, useNavigate } from 'react-router-dom';
import { GetError } from '../Config';


const ActionBtn = ({ blog, onDoneFunction }) => {
    const navigate = useNavigate()
    const [deleting, setdeleting] = useState(false);
    const [deleteMsg, setdeleteMsg] = useState({success:'', error:''});
    const HandleDelete = async () => {
        setdeleting(true)
        setdeleteMsg({error:'', success:''})
        await AxiosInstance.delete(`/blogs/${blog?._id}`)
            .then((res) => {
                setdeleteMsg({...deleteMsg, success: res?.response?.data?.message})
                console.log(res);
                onDoneFunction()
            }).catch((err) => {
                setdeleteMsg({...deleteMsg, error: GetError(err) })
            console.log(err);
            }).finally(() => {
            setdeleting(false)
        })
    }

    const handleNavigateToEdit = () => {
        navigate(`/dash/blogs/${blog?._id}/edit`)
    }
    return (
        <div className='actions-btns'>
            <button className='btn del'
                onClick={HandleDelete}>
                <span>{deleting ? "Deleting" : 'Delete'}</span>
                {deleteMsg?.error ? <span className='error-elem'>{deleteMsg?.error }</span> : null}
            </button>

            <button title={`/dash/blogs/${blog?._id}/edit`}
                onClick={handleNavigateToEdit}
                className='btn edit'>
                <Link to={`/dash/blogs/${blog?._id}/edit`}>Edit</Link>
            </button>
            </div>
    );
}

export default ActionBtn;
