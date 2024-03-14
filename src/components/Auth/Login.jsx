import React, { useEffect, useState } from 'react';
// import UseInput from '../input/UseInput'
import './Login.css'
import { AxiosInstance } from '../../api';
import { useContextHook } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom';
import { GetError } from '../Config';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth'
import {useActions} from '../../store/store'


const Login = () => {
    const { showSearch, setshowSearch } = useContextHook()
    
    const {setAccessToken} = useActions()
    const [uploading, setuploading] = useState(false);
    const [user, setuser] = useState({ username: '', password: '' });
    const [errorMessage, seterrorMessage] = useState('');
    const navigate = useNavigate()
    const { token, role } = useAuth()
    useEffect(() => {
        setshowSearch(false)

        if (token) {
            navigate('/dash')
        }
    }, [])
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        seterrorMessage('')
        if (!user.username.length || !user.password.length) {
            seterrorMessage('all fields are required')
            return
        }
        setuploading(true)
        await AxiosInstance.post(`/auth`, user,)
            .then((res) => {
                const token = res?.data?.token;
                const decoded = jwtDecode(token)
                const role = decoded?.AuthData?.role
                setAccessToken(token)
                navigate('/dash')
                
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

                 {errorMessage?.length ?
                        <span className={`error_message `}>
                        {errorMessage}
                    </span> : null}
                <div className='inputs_grids'>
                   
                    <div className='input_wrapper first'>
                        <label htmlFor='username'>username</label>
                        <input autoComplete='on' type={'text'} value={user?.username}
                            name={'username'} id={"username"} className='textinput'
                            onChange={handleChange} placeholder={"username ..."} />
                    </div>
                    <div className='input_wrapper'>
                        <label htmlFor='password'>password</label>
                        <input autoComplete='off' type={'password'} value={user?.password}
                            name={'password'} id={"password"} className='textinput'
                            onChange={handleChange} placeholder={"password ..."} />
                    </div>
                    <div className='input_wrapper'>
                        <button type='submit' >{uploading ? "uploading" : `Submit`}</button>

                    </div>
                    <p className='other_link'>
                        Need an account? 
                        <Link to={`/register`}
                            id='element_anchor'
                        >
                            register
                        </Link>
                    </p>

                </div>
            </form>

        </div>
    );
}

export default Login;
