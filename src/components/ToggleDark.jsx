import React, { useEffect } from 'react';
import { useContextHook } from '../context/AuthContext';
import LightMode  from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';


const ToggleDark = () => {

  const { dark,toggleDark, } = useContextHook()


     const handleToggleDark = () => {
         toggleDark()
  }
  
useEffect(() => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  return () => {
    
  };
}, [dark]);
    return (
         <button style={{
                backgroundColor:dark? '#3336': 'white', padding: '4px'
              ,borderRadius:'5px'}}
          onClick={handleToggleDark}>
          {dark? <LightMode sx={{
            color:'#fff', fontSize:'2rem'
          }}/> : <DarkMode sx={{
            color:'#3335', fontSize:'2rem'
          }}/>}
        </button>
    );
}

export default ToggleDark;
