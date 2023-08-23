import  SearchOutlined  from '@mui/icons-material/SearchOutlined';
import React from 'react';
import './search.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBlog = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()

    const handleSearchNavigate = () => {
        navigate(`/blogs/search?query=${searchText}`, {preventScrollReset:false})
    }
    return (
        <div className='nav_search_container'
            >
            <input type='text'
                value={searchText}
                onChange={e=>setSearchText(e.target.value)}
                placeholder='search blogs'
                
                className='input_search'
            />
            <button 
                onClick={()=>{}}
            className='search_btn'><SearchOutlined 
                    
                /></button>
        </div>
    );
}

export default SearchBlog;
