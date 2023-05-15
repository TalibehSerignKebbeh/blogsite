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
                // console.log(token);
                clearAuthToken()
                storeAuthToken(token)
                navigate('/')
                // console.log(role);
                // if (role === 'admin') {
                //     setTimeout(() => {
                //         navigate(`/dash`)
                //     }, 10000); // delay navigation by 3 seconds
                // } else {
                //     setTimeout(() => {
                //         navigate(`/`)
                //     }, 10000); // delay navigation by 3 seconds
                // }
            }).catch((err) => {
                seterrorMessage(GetError(err))

            }).finally(() => {
                setuploading(false)
            })
    }
    return (
        <div className='signin-wrapper'>
            <form onSubmit={submitForm} className='signin-form'>
                <h3>Login</h3>
                {errorMessage?.length ? <span className='error-message'>{errorMessage}</span> : null}
                <div className='input-wrapper'>
                    <label htmlFor='username'>username</label>
                    <input autoComplete='on' type={'text'} value={user?.username}
                        name={'username'} id={"username"} classname={'textinput'}
                        handleChange={handleChange} placeholder={"username ..."} />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>password</label>
                    <input autoComplete='off' type={'password'} value={user?.password}
                        name={'password'} id={"password"} classname={'textinput'}
                        handleChange={handleChange} placeholder={"password ..."} />
                </div>
                <div className='input-wrapper'>
                    <button type='submit' >{uploading ? "uploading" : `Submit`}</button>

                </div>
            </form>

        </div>
    );
}

export default Login;
