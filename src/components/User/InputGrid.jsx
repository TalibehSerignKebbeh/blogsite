import React, { useState } from 'react';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';


const InputGrid = (
    user, handleBlur, handleChange,
    errors, handleProfileChange,
    touch,
) => {
    const [profileUrl, setprofileUrl] = useState(null);

    return (
         <div className='grid_wrapper'>
                    <div className='input-wrapper'>
                        <label htmlFor="firstName">first name</label>
                        <input autoComplete='on' type={'text'} name={'firstName'}
                            className={'textinput'} onChange={handleChange}
                            value={user?.firstName} placeholder={'firstname...'}
                            onBlur={handleBlur} />
                {touch?.firstName && errors?.firstName &&
                    <span className='error-span'>{errors?.firstName}</span>}

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
                        <label htmlFor="name">public name</label>
                        <input autoComplete='on' type={'text'} name={'public_name'}
                            className={'textinput'} onChange={handleChange}
                            value={user?.public_name} placeholder={'public name...'}
                    onBlur={handleBlur} />
                    <p>Name that will be shown on your comments</p>
                        {touch?.public_name && errors?.public_name && <span className='error-span'>{errors?.public_name}</span>}
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
    );
}

export default InputGrid;
