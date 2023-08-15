import React from 'react';
import UseAuth from '../../../hooks/useAuth';
import { AxiosInstance, ImageUrl } from '../../../api';
import { useEffect } from 'react';
import { useState } from 'react';
import './profile.css'
import UploadFile from '@mui/icons-material/UploadRounded';
import RotatingLineLoader from '../../Loader/RotatingLineLoader';


let imgExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
let allowImageTypes = ['image/jpeg', 'image/jpg',
    'image/png', 'image/.gif', 'image/webp']

const ProfilePage = () => {

    const { id, token } = UseAuth()
    const [profile, setprofile] = useState(null);
    const [getError, setgetError] = useState('');
    const [editMode, seteditMode] = useState(false);
    const [loading, setloading] = useState(false);

    const [uploading, setuploading] = useState(false);
    const [profileUrl, setprofileUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, seterrorMessage] = useState('');

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: "",
        username: '',
        email: '',
        public_name: '',
        profile: '',
        password: '',
        confirmPassword: ''
    });

    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const GetUserProfile = async () => {
            setloading(true)
            setgetError('')
            await AxiosInstance.get(`/users/${id}`,
                { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    // console.log(res?.data);
                    let imgSrc = '';
                    const profileImage = res?.data?.user?.profile;
                    if (profileImage?.length) {
                        imgSrc = ImageUrl+`/${profileImage}`
                    }
                    const userEmail = res?.data?.user?.email
                    let userObject = {
                        ...res?.data?.user,
                        profile: null,
                        imgSrc: imgSrc,
                   
                    }
                    setprofile({
                        ...res?.data?.user,
                        profile: null,
                        imgSrc: imgSrc,
                     
                    })
                    Object.keys(userObject).forEach((name) => {
                        // console.log(name, userObject[name]);
                        validate(name, userObject[name]);
                    });
                }).catch((err) => {
                    const errorMsg = !err.response ? 'no server response' :
                        err?.response?.status === 500 ?
                            'internal server occurred' :
                            err?.response.message;
                    setgetError(errorMsg)
                }).finally(() => {
                    setloading(false)

                })
        }
        GetUserProfile()
        return () => {

        };
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setprofile({ ...profile, [name]: value })
        validate(name, value)
    }


    let validate = (name, value) => {
        if ((name === 'firstName' || name === 'lastName')
            && !value?.trim()?.length) {
            setErrors({ ...errors, [name]: `${name} is required` })
            return
        }
       
        if (name === 'public_name'
            && (!value || !value?.trim()?.length)) {
            setErrors({ ...errors, [name]: `public name is required` })
            return;

        }
        if (name === 'username'
            && (!value || !value?.trim()?.length)) {
            setErrors({ ...errors, [name]: `${name} is required` })
            return;

        }

        if (name === 'profile' && value !== null) {
            setErrors({ ...errors, [name]: `${name} is required` })
            return;

        }
        if (name === 'password' && !value?.trim()?.length === 0 && value?.length < 5 && value?.length < 15) {
            setErrors({ ...errors, [name]: 'Password length must exceeds 4 characters and cannot exceeds 15 characters' })
            return;

        }
        if (name === 'confirmPassword' && value !== profile?.password) {
            setErrors({ ...errors, [name]: 'Passwords do not match' })
            return;

        }
        if ((name === 'email') && !value?.trim()?.length) {
            setErrors({ ...errors, [name]: `${name} is required` })
            return;

        }
        else {
            setErrors({ ...errors, [name]: `` })
            return;

        }

        // setIsValid(Object.values(errors).every((value) => value === ""));
    }

    const handleProfileChange = (e) => {
        let image = e.target.files[0]
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
            setprofile({
                ...profile, profile: image,
                imgSrc: URL.createObjectURL(image)
            })
            setprofileUrl(URL.createObjectURL(image))
        }
    }
    const handleSubmitProfileChange = async (e) => {
        e.preventDefault()
        Object.keys(profile).forEach((name) => {
            if (name !== '_id' && name !== 'active' && name !== '__v' && name !== 'imgSrc') {
                // console.log(name, profile[name]);
                validate(name, profile[name]);
            }
        });

        const formDataValid = Object.keys(errors).every((key) => errors[key] === "");
        setIsValid(Object.keys(errors).every((key) => errors[key] === ""));

        const formData = new FormData();
        Object.entries(profile).forEach(([name, value]) => {
            formData.append(name, value);
        });
       

        if (!formDataValid) return;
        setuploading(true)
        await AxiosInstance.put(`/users/${id}`, formData, {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setSuccessMessage(res?.data?.message)
                seterrorMessage('')
                 let imgSrc = '';
                    const profileImage = res?.data?.user?.profile;
                    if (profileImage?.length) {
                        imgSrc = ImageUrl+`/${profileImage}`
                    }
                setprofile({
                        ...res?.data?.user,
                        profile: null,
                        imgSrc: imgSrc,
                        email: res?.data?.user?.email || '',
                    })

            }).catch((err) => {
                console.log(err);
                const errorMsg = !err.response ? 'no server response' :
                    err?.response?.status === 500 ?
                        'internal server occurred' :
                        err?.response?.data.message;
                seterrorMessage(errorMsg)
                const serverErrors = err?.response?.data?.errors;
                if (serverErrors) {
                    setErrors({ ...errors, ...serverErrors })
                }
            }).finally(() => {
                setuploading(false)
            })

    }



    return (
        <div className='main_wrapper'

        >
            {loading ?
                <RotatingLineLoader />
                :
                <>


                    <div className='profile_wraper'>
                        {errorMessage?.length ?
                            <p className='main_error'>
                                <span>{errorMessage}</span>
                                <span
                                    onClick={() => seterrorMessage('')}>x</span>
                            </p>
                            : null}
                        {successMessage?.length ?
                            <p className='success_msg'>
                                <span>{successMessage}</span>
                                <span
                                    onClick={() => setSuccessMessage('')}>x</span>
                            </p> : null}
                        <form className='profile_form'
                            onSubmit={handleSubmitProfileChange}>
                            <button className='btn_toggle'
                                type='button'
                                onClick={() => seteditMode(prev => !prev)}
                            >
                               {editMode? 'view':'Edit'} 
                            </button>
                            <div className='pic_wrapper'>
                                <img
                                    alt='profile picture'
                                    className='profile_picture'
                                    src={profile?.imgSrc} 
                                    
                                    />

                                {editMode ?
                                    <div className='profile_changer_div'>
                                        <label htmlFor='profile'>
                                            <UploadFile
                                                sx={{
                                                    transform: 'scale(2.2)'
                                                }}
                                            />
                                        </label>
                                        <input autoComplete='on' type={'file'}
                                            name={'profile'} id={'profile'}
                                            // value={profile?.profile}
                                            className={'profile-input'}
                                            accept='image/*'
                                            onChange={handleProfileChange}

                                        />
                                        {errors?.profile ?
                                            <p>{errors?.profile}</p>
                                            : null
                                        }
                                    </div> : null}
                            </div>
                            <div className='other_inputs_wrapper'>
                                <div className='input_container'>
                                    <label htmlFor='firstname'>firstname</label>
                                    {!editMode ? <h3>{profile?.firstName}</h3>
                                        : <>

                                            <input type='text'
                                                id='firstname' name='firstName' value={profile?.firstName}
                                                onChange={handleChange}
                                            />
                                            {errors?.firstName ?
                                                <p>{errors?.firstName}</p>
                                                : null
                                            }
                                        </>
                                    }
                                </div>
                                <div className='input_container'>
                                    <label htmlFor='lastname'>lastname</label>
                                    {!editMode ? <h3>{profile?.lastName}</h3>
                                        :
                                        <>

                                            <input type='text'
                                                id='lastname' name='lastName'
                                                value={profile?.lastName}
                                                onChange={handleChange}
                                            />
                                            {errors?.lastName ?
                                                <p>{errors?.lastName}</p>
                                                : null
                                            }
                                        </>
                                    }
                                </div>
                                <div className='input_container'>
                                    <label htmlFor='username'>username</label>
                                    {!editMode ? <h3>{profile?.username}</h3>
                                        :
                                        <>

                                            <input type='text'
                                                id='username' name='username'
                                                value={profile?.username}
                                                onChange={handleChange}
                                            />
                                            {errors?.username ?
                                                <p>{errors?.username}</p>
                                                : null
                                            }
                                        </>
                                    }
                                </div>
                                <div className='input_container'>
                                    <label htmlFor='email'>email</label>
                                    {!editMode ? <h3>{profile?.email}</h3>
                                        :
                                        <>

                                            <input type='email'
                                                id='email' name='email'
                                                value={profile?.email || ''}
                                                onChange={handleChange}
                                            />
                                            {errors?.email ?
                                                <p>{errors?.email}</p>
                                                : null
                                            }
                                        </>
                                    }
                                </div>
                                <div className='input_container'>
                                    <label htmlFor='public_name'>public name</label>
                                    {!editMode ? <h3>{profile?.public_name}</h3>
                                        : <>
                                            <input type='text'
                                                id='public_name' name='public_name'
                                                value={profile?.public_name}
                                                onChange={handleChange}
                                            />
                                            {errors?.public_name ?
                                                <p>{errors?.public_name}</p>
                                                : null
                                            }
                                        </>
                                    }
                                </div>
                                {editMode ? <div className='input_container'>
                                    <label htmlFor='password'>password</label>
                                    <input type='password'
                                        id='password' name='password'
                                        value={profile?.password}
                                        autoComplete=''
                                        onChange={handleChange}
                                    />
                                    {errors?.password ?
                                        <p>{errors?.password}</p>
                                        : null
                                    }
                                </div> : null}
                                {editMode ?
                                    <div className='input_container'>
                                        <label htmlFor='confirm password'>confirm password</label>
                                        <input type='password'
                                            id='confirm password' name='confirmPassword'
                                            value={profile?.confirmPassword}
                                            autoComplete=''
                                            disabled={!profile?.password}
                                            onChange={handleChange}
                                        />
                                        {errors?.confirmPassword ?
                                            <p>{errors?.confirmPassword}</p>
                                            : null
                                        }
                                    </div> : null}
                                {editMode ? <div className='submit_wrapper'>
                                    <button
                                        disabled={uploading} type='submit'>
                                        {uploading ? 'loading...' : 'submit'}
                                    </button>
                                </div> : null}
                            </div>
                        </form>

                    </div>
                </>

            }

        </div>
    );
}

export default ProfilePage;
