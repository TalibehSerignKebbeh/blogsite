import React, {useState, useEffect} from 'react';
import parse from 'html-react-parser'
import { BlogContainer } from '../Preview';
import { ImageUrl } from '../../api';
import './singleblog.css'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContextHook } from '../../context/AppContext';
import ActionBtn from './ActionBtn';
import RequireRole from '../Auth/RequireRole';


const SingleBlog = () => {
    const navigate = useNavigate()
    let blog = useLoaderData()
  
     let blogImageUrl =
        blog?.image?.startsWith('http') ? blog?.image :
           blog?.image? `${ImageUrl}/${blog?.image}` : image;

    return (
        <BlogContainer className='boxShadow'>
                <div className='info'>
                    <h1 className='blog-title'>{blog?.title}</h1>
                    {blog?.image &&
                        <div className='blog-banner-wrapper'>
                    <img src={blogImageUrl} alt='blog banner'/>
                    </div>}
                </div>
                <div className='content'>
                    {parse(blog?.content || '')}
                </div>
                    {blog?.tags?.length ?
                    <p className='tags'>
                        {blog?.tags?.map((tag, id) =>
                            (<small className='tag' key={id}>{tag}</small>))}
                    </p> : null}
            <RequireRole children={<ActionBtn />} roles={['editor, admin']} />
        
        </BlogContainer>
    );
}

export default SingleBlog;
