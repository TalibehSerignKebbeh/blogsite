import React from 'react';
import './createaccount.css'
import { useState } from 'react';
import { AxiosInstance } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { GetError } from '../Config';
// import UseInput from '../input/UseInput'

let allowImageTypes = ['image/jpeg', 'image/jpg',
    'image/png', 'image/.gif', 'image/webp']


const CreateAccount = () => {

    const navigate = useNavigate()
    const [uploading, setuploading] = useState(false);
    const [profileUrl, setprofileUrl] = useState(null);
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, seterrorMessage] = useState('');
    const [user, setuser] = useState({
        firstName: '', lastName: "", username: '',
        profile: null, role: '', password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        firstName: 'firstName is required',
        lastName: "lastName is required",
        username: 'username is required',
        profile: '', role: '', password: 'password is required',
        confirmPassword: 'Passwords do not match'
    });
    const [touch, setTouch] = useState({
        firstName: false, lastName: "", username: false,
        profile: false, role: false, password: false, confirmPassword: false
    });
    const [isValid, setIsValid] = useState(Object.keys(errors).every((value) => value === ''));
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        setuser({ ...user, [name]: value })
        validate(name, value)
    }
    const handleBlur = (e) => {
        // console.log(e);
        const { name } = e.target;
        setTouch({ ...touch, [name]: true });
        validate(name, user[name]);
    }

    const validate = (name, value) => {

        if (name !== 'profile' && !value?.trim()?.length) {
            setErrors({ ...errors, [name]: `${name} is required` })

            //   errors[name] = `${name} is required`;
        } else {
            if (name === 'password' && value?.length < 5) {
                setErrors({ ...errors, [name]: 'Password length must exceeds 4 character' })

            }
            else if (name === 'confirmPassword' && value !== user?.password) {
                setErrors({ ...errors, [name]: 'Passwords do not match' })

            }
            else {

                setErrors({ ...errors, [name]: `` })
            }


        }

        console.log(Object.values(errors).every((value) => value === ""));
        setIsValid(Object.values(errors).every((value) => value === ""));
        // setErrors(errors);
    }
    const handleProfileChange = (e) => {
        let image = e.target.files[0]
        console.log(image);
        setErrors({ ...errors, profile: '' })
        if (image) {
            if (!image?.type?.startsWith('image')) {
                setErrors({ ...errors, profile: `${image?.type?.split('/')[1]} is not an image!, only images are allowed` })
                // setErrors({ ...errors, profile: `invalid file type, only images are allowed` })
                return;
            }
            if (allowImageTypes?.indexOf(image?.type) === -1 &&
                image?.size > 3000000) {
                setErrors({
                    ...errors,
                    profile: `File size is larger than limit sized 3MB. And ${image?.type?.split('/')[1]} not allowed, only .png, jpeg, jpg, and .webp file extension are allowed.`
                })
                return;
            }
            if (allowImageTypes?.indexOf(image?.type) === -1) {
                setErrors({ ...errors, profile: `${image?.type?.split('/')[1]} files are not allowed, only .png, jpeg, jpg, and .webp file extension are allowed.` })
                return;
            }
            if (image?.size > 3000000) {
                setErrors({ ...errors, profile: `File size is larger than limit sized 3MB.` })
                return;
            }
            setuser({ ...user, profile: image })
            setprofileUrl(URL.createObjectURL(image))
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        // console.log(user);
        Object.keys(user).forEach((name) => {
            // console.log(name);
            setTouch({ ...touch, [name]: true });
            validate(name, user[name]);

        });
        setIsValid(Object.keys(errors).every((key) => errors[key] === ""));
        console.log(isValid);
        if (isValid) {
            const formData = new FormData();
            Object.entries(user).forEach(([name, value]) => {
                formData.append(name, value);
            });
            setuploading(true)
            await AxiosInstance.post(`/users`, formData, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((res) => {
                    setSuccessMessage(res?.data?.message)
                    document.documentElement.scroll({
                        behavior: 'smooth',
                        top:2,
                    })

                }).catch((err) => {
                    console.log(err);
                    seterrorMessage(GetError(err))
                    if (err?.response?.data?.errors) {
                        const errorsFromApi = err?.response?.data?.errors
                        setErrors({ ...errors, ...errorsFromApi })
                    }

                }).finally(() => {
                    setuploading(false)
                })
        } else {
            console.log(errors);
            setTouch(Object.fromEntries(Object.keys(user).map((name) => [name, true])));
        }
    }

    return (
        <div className='register_wrapper'>
            <div className='signup-wrapper'>
                <form className='signup-form' onSubmit={submitForm}>
                    <h3 className='signup-title'>Create Account</h3>

                    <div className='grid_wrapper'>
                        <div className='input-wrapper'>
                            <label htmlFor="firstName">first name</label>
                            <input autoComplete='on' type={'text'} name={'firstName'}
                                className={'textinput'} onChange={handleChange}
                                value={user?.firstName} placeholder={'firstname...'}
                                onBlur={handleBlur} />
                            {touch?.firstName && errors?.firstName && <span className='error-span'>{errors?.firstName}</span>}

                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="lastName">Last name</label>
                            <input autoComplete='on' type={'text'} name={'lastName'}
                                className={'textinput'} onChange={handleChange}
                                value={user?.lastName} placeholder={'lastname...'}
                                onBlur={handleBlur} />
                            {touch?.lastName && errors?.lastName && <span className='error-span'>{errors?.lastName}</span>}

                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="username">Username</label>
                            <input autoComplete='on' type={'text'} name={'username'}
                                className={'textinput'} onChange={handleChange}
                                value={user?.username} placeholder={'username...'}
                                onBlur={handleBlur} />
                            {touch?.username && errors?.username && <span className='error-span'>{errors?.username}</span>}
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="password">password</label>
                            <input autoComplete='off' type={'password'} name={'password'}
                                className={'textinput'} onChange={handleChange}
                                value={user?.password} placeholder={'password...'}
                                onBlur={handleBlur} />
                            {touch?.password && errors?.password && <span className='error-span'>{errors?.password}</span>}
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="confirmPassword">confirm password</label>
                            <input autoComplete='off' type={'password'} name={'confirmPassword'}
                                className={'textinput'} onChange={handleChange}
                                value={user?.confirmPassword} placeholder={'confirmpassword...'}
                                onBlur={handleBlur} />
                            {touch?.confirmPassword && errors?.confirmPassword && <span className='error-span'>{errors?.confirmPassword}</span>}
                        </div>
                        <div className='input-wrapper  profile'>

                            <label htmlFor="profile"
                                className='profile_label'>
                                <FileUploadOutlined
                                    sx={{
                                        fontSize: '2rem',
                                        cursor: 'pointer'
                                    }}
                                />
                                Avatar
                            </label>

                            <div
                                className='img_div'>
                                {user?.profile ?
                                    <img src={profileUrl}
                                    // style={{width:'100px', height:'100px'}}
                                    /> : <p>Preview Profile</p>}
                            </div>
                            <input autoComplete='on' type={'file'}
                                name={'profile'} id={'profile'}
                                className={'profile-input'}
                                accept='image/*'
                                onChange={handleProfileChange}
                            // onBlur={handleBlur} 

                            />
                            {errors?.profile &&
                                <span className='error-span'>
                                    {errors?.profile}
                                </span>}


                        </div>
                    </div>
                    <div className='input-wrapper submit'>
                        {successMessage?.length ?
                            <div style={{
                                backgroundColor: '#09862e',
                                marginLeft: '0px',
                                marginRight: 'auto',
                                textAlign: 'start', padding: '10px',
                                borderRadius: '10px', color: '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                minWidth: '200px',
                                gap:'50px',
                                maxWidth: '100%', alignItems: 'center',

                            }}>
                                <small>{successMessage}</small>
                                <small
                                    style={{ cursor: 'pointer', }}
                                    onClick={e => setSuccessMessage('')}>x</small>
                            </div>
                            : null}
                        <button
                            type='submit' >{uploading ? "uploading..." : `Submit`}</button>
                    </div>
                    <div className='message_wrapper'>
                        <span>Already have an account? </span>
                        <Link to={`/login`}
                            id='element_anchor'>login now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
