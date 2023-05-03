import React from 'react';
import { useState } from 'react';
import './index.css'

const DropdownUl = ({ childlinks }) => {
    const [open, setopen] = useState(false);
    return (
        <div className='dropdown-wrapper'>
            
            <button onClick={()=>setopen(!open)}
                className='dropdown-btn'>Category</button>
           { <ul className={`dropdown-content ${open? 'open':''}`}>
              {childlinks}
            </ul>}
          </div>
    );
}

export default DropdownUl;
