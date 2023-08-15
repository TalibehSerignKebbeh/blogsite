import React from 'react';
import { ImageUrl } from '../../api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import './bloguserprofile.css'

const BlogUserProfile = ({msg,blog, name}) => {
    return (
        <section className='author_profile'>
            <small id='written'>{ msg}</small>

                <img src={`${ImageUrl}/${blog[name]?.profile}`}
                    id='author_img'
                />

                <section >
                    <h3 id='author_name'>
                        @{blog[name]?.public_name
                            || blog[name]?.firstName + ' ' + blog[name]?.lastName}
                    </h3>
                    <p id='created_date'>
                        {format(parseISO(blog?.created_at), 'do MMM, yyyy')}
                    </p>
                </section>
            </section>
    );
}

export default BlogUserProfile;
