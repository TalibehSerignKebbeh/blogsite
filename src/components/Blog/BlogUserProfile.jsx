import React from 'react';
import { ImageUrl } from '../../api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import './bloguserprofile.css'
import { Link } from 'react-router-dom';

const BlogUserProfile = ({msg,blog, name, dateFiled}) => {
    return (
        <section className='author_profile'>
            <small id='written'>{ msg}</small>

                <img src={`${ImageUrl}/${blog[name]?.profile}`}
                id='author_img'
                loading='lazy'
                />

                <section className='user_infor_wrapper'>
                {(name === 'publisher'
                    || !blog[name]?.public_name)
                    ? <h3 id='author_name'>
                        {blog[name]?.public_name
                            || blog[name]?.firstName + ' ' + blog[name]?.lastName}
                </h3> :
                    <Link to={`/blogs/user/@${blog[name]?.public_name}`}
                    className='author_link'>
                        @{blog[name]?.public_name}
                    </Link>}
                {blog[dateFiled]?.length ?
                    <p id='created_date'>
                        {format(parseISO(blog[dateFiled]), 'do MMM, yyyy HH:mm aa')}
                    </p>
                    : null}
                </section>
            </section>
    );
}

export default BlogUserProfile;
