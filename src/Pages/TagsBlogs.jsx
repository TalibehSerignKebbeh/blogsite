import React from 'react';
import { useParams } from 'react-router-dom';

const TagsBlogs = () => {
    const {tag} = useParams()
    return (
        <div>
            <h3>Tag: {tag} blogs</h3>
        </div>
    );
}

export default TagsBlogs;
