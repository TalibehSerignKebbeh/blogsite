import React from 'react';
import { BlogContainer } from '../Preview';
import parse from 'html-react-parser'
import RequireRole from '../Auth/RequireRole';
import ActionBtn from './ActionBtn';

const ABlog = ({ blog }) => {

    return (
        <BlogContainer>
            <RequireRole roles={['admin', 'admin']}
                children={<ActionBtn blog={blog}/>} />
            <h1 className='title'>{blog?.title}</h1>
            <h4>{blog?.date}</h4>
            {blog?.image && <img className='blog-banner' src={`${blog?.image}`} />}
            {/* </div> */}
            <div className='blog'>
                {parse(blog?.content || '')}
            </div>
            {blog?.tags?.length ?
                <p className='tags'>
                    {blog?.tags?.map((tag, id) =>
                        tag?.length? <small className='tag' key={id}>{tag}</small>: null)}
                </p> : null}
        </BlogContainer>
    );
}

export default ABlog;
