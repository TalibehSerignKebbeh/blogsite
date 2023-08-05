import React, { useState } from 'react';
// import UseInput from '../input/UseInput'
import './Login.css'
import { AxiosInstance } from '../../api';
import { useContextHook } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { GetError } from '../Config';
import jwtDecode from 'jwt-decode';
const Login = () => {

    const [uploading, setuploading] = useState(false);
    const [user, setuser] = useState({ username: '', password: '' });
    const [errorMessage, seterrorMessage] = useState('');
    const navigate = useNavigate()
    const { clearAuthToken, storeAuthToken, } = useContextHook()

    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        seterrorMessage('')
        setuploading(true)
        await AxiosInstance.post(`/auth`, user,)
            .then((res) => {
                const token = res?.data?.token;
                const decoded = jwtDecode(token)
                const role = decoded?.AuthData?.role
                storeAuthToken(token)
                navigate('/')
                // console.log(role);
                if (role === 'admin') {
                        navigate(`/dash`)
                    // setTimeout(() => {
                    // }, 10000); 
                } else {
                        navigate(`/`)
                    // setTimeout(() => {
                    // }, 10000); 
                }
            }).catch((err) => {
                seterrorMessage(GetError(err))
                console.log(err?.response?.data?.message);

            }).finally(() => {
                setuploading(false)
            })
    }
    return (
        <div className='login_wrapper'>
            <form onSubmit={submitForm} className='login_form'>
                <div className='title-wrapper'>

                <h3>Login</h3>
                </div>
                
                <span className={`error_message ${errorMessage?.length? 'content':''}`}>
                        {errorMessage}</span>
                <div className='input_wrapper first'>
                    <label htmlFor='username'>username</label>
                    <input autoComplete='on' type={'text'} value={user?.username}
                        name={'username'} id={"username"} className={'textinput'}
                        onChange={handleChange} placeholder={"username ..."} />
                </div>
                <div className='input_wrapper'>
                    <label htmlFor='password'>password</label>
                    <input autoComplete='off' type={'password'} value={user?.password}
                        name={'password'} id={"password"} className={'textinput'}
                        onChange={handleChange} placeholder={"password ..."} />
                </div>
                <div className='input_wrapper'>
                    <button type='submit' >{uploading ? "uploading" : `Submit`}</button>

                </div>
            </form>

        </div>
    );
}

export default Login;
