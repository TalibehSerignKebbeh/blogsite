import React from 'react';
import './createaccount.css'
import { useState } from 'react';
import { AxiosInstance } from '../../api';
import { useNavigate } from 'react-router-dom';
import UseInput from '../input/UseInput'

const CreateAccount = () => {
    const navigate = useNavigate()
    const [uploading, setuploading] = useState(false);
    const [user, setuser] = useState({
        firstName: '', lastName: "", username: '',
        profile: '', role: '', password: '', confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        firstName: 'firstName is required', lastName: "lastName is required", username: 'username is required',
        profile: '', role: '', password: 'password is required', confirmPassword: 'Passwords do not match'
    });
    const [touch, setTouch] = useState({
        firstName: false, lastName: "", username: false,
        profile: false, role: false, password: false, confirmPassword: false
    });
    const [isValid, setIsValid] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setuser({ ...user, [name]: value })
        validate(name, value)
    }
    const handleBlur = (e) => {
        console.log(e);
        const { name } = e.target;
        setTouch({ ...touch, [name]: true });
        validate(name, user[name]);
    }

    const validate = (name, value) => {

        if (!value?.trim()?.length) {
            setErrors({ ...errors, [name]: `${name} is required` })
            return;
            //   errors[name] = `${name} is required`;
        } else {
            if (name === 'password' && value?.length < 5) {
                setErrors({ ...errors, [name]: 'Password length must exceeds 4 character' })
                return;
            }
            if (name === 'confirmPassword' && value !== user?.password) {
                setErrors({ ...errors, [name]: 'Passwords do not match' })
                return;
            }
            setErrors({ ...errors, [name]: `` })

        }

        console.log(Object.values(errors).every((value)=>value ===''));
        setIsValid(Object.keys(errors).every((value)=>value ===''));
        // setErrors(errors);
    }
    const handleProfileChange = (e) => {
        let image = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setuser({ ...user, profile: reader.result })

        };
    }
    const submitForm = async (e) => {
        e.preventDefault()
        Object.keys(user).forEach((name) => {
            setTouch({ ...touch, [name]: true });
            validate(name, user[name]);
        });
        setIsValid(Object.values(errors).every((value) => {
            return value === ''
        }));
        if (isValid) {
            const formData = new FormData();
            Object.entries(user).forEach(([name, value]) => {
                formData.append(name, value);
            });
            setuploading(true)
            await AxiosInstance.post(`/users`, user,)
                .then((res) => {
                    console.log(res);
                    navigate('/signin')
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setuploading(false)
                })
        } else {
            setTouch(Object.fromEntries(Object.keys(user).map((name) => [name, true])));
        }
    }
    return (
        <div className='signup-wrapper'>
            <form className='signup-form' onSubmit={submitForm}>
                <h3 className='signup-title'>Create Account</h3>
                <div className='input-wrapper'>
                    <label htmlFor="firstName">firstName</label>
                    <UseInput type={'text'} name={'firstName'}
                        classname={'textinput'} handleChange={handleChange}
                        value={user?.firstName} placeholder={'firstname...'}
                        handleBlur={handleBlur} />
                    {touch?.firstName && errors?.firstName && <span className='error-span'>{errors?.firstName}</span>}

                </div>
                <div className='input-wrapper'>
                    <label htmlFor="lastName">LastName</label>
                    <UseInput type={'text'} name={'lastName'}
                        classname={'textinput'} handleChange={handleChange}
                        value={user?.lastName} placeholder={'lastname...'}
                        handleBlur={handleBlur} />
                    {touch?.lastName && errors?.lastName && <span className='error-span'>{errors?.lastName}</span>}

                </div>
                <div className='input-wrapper'>
                    <label htmlFor="username">Username</label>
                    <UseInput type={'text'} name={'username'}
                        classname={'textinput'} handleChange={handleChange}
                        value={user?.username} placeholder={'username...'}
                        handleBlur={handleBlur} />
                    {touch?.username && errors?.username && <span className='error-span'>{errors?.username}</span>}
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="password">password</label>
                    <UseInput type={'password'} name={'password'}
                        classname={'textinput'} handleChange={handleChange}
                        value={user?.password} placeholder={'password...'}
                        handleBlur={handleBlur} />
                    {touch?.password && errors?.password && <span className='error-span'>{errors?.password}</span>}
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <UseInput type={'password'} name={'confirmPassword'}
                        classname={'textinput'} handleChange={handleChange}
                        value={user?.confirmPassword} placeholder={'confirmpassword...'}
                        handleBlur={handleBlur} />
                    {touch?.confirmPassword && errors?.confirmPassword && <span className='error-span'>{errors?.confirmPassword}</span>}
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="profile">Profile</label>
                    <UseInput type={'file'} name={'profile'} id={'profile'}
                        classname={'profile-input'} handleChange={handleProfileChange} handleBlur={handleBlur} />
                </div>
                <div className='input-wrapper'>
                    <button type='submit' >{uploading ? "uploading" : `Submit`}</button>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
