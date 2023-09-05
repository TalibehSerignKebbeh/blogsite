import React, { useState } from 'react';
import './searchComponent.css'
import { useNavigate } from 'react-router-dom';

const SearchComponent = ({ showSearch, setShowSearch,
showSearchComponent,
setshowSearchComponent,}) => {
    const navigate = useNavigate()
    const [keyword, setkeyword] = useState('');

     if (!showSearchComponent)
        return null
    const handleNavigateSearch = (e) => {
        e.preventDefault()
        if (!keyword?.trim()?.length) return;
        navigate(`/blogs/search?query=${keyword}`)
        setShowSearch(false)
        setshowSearchComponent(false)
        setkeyword('')
    }
   

    return (
        <div className='search_modal_wrapper'>
            <button id='close_button'
                onClick={() => setshowSearchComponent(false)}>
                X
            </button>
            
            
            <form className='search_form'
            onSubmit={handleNavigateSearch}>
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
            </form>
            
        </div>
    );
}

export default SearchComponent;
