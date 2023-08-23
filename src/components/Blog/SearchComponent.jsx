import React, { useState } from 'react';
import './searchComponent.css'
import { useNavigate } from 'react-router-dom';

const SearchComponent = ({ showSearch, setShowSearch }) => {
    const navigate = useNavigate()
    const [keyword, setkeyword] = useState('');

    const handleNavigateSearch = () => {
        navigate(`/blogs/search?query=${keyword}`)
        setShowSearch(false)
        setkeyword('')
    }
    if (!showSearch)
        return null
    return (
        <div className='search_modal_wrapper'>
            <button id='close_button'
                onClick={() => setShowSearch(false)}>
                X
            </button>
            
            
            <div className='search_form'>
                <input style={{}} 
                    value={keyword}
                    placeholder='search blogs'
                    onChange={e => {
                        setkeyword(e.target.value)
                    }}
                />
                <button id='search_button'
                    disabled={!keyword?.length}
                    onClick={handleNavigateSearch}
               >
                search
            </button>
            </div>
            
        </div>
    );
}

export default SearchComponent;
