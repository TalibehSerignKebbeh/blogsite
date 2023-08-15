import React,{useState} from 'react';
import { AxiosInstance } from '../../api';
import { useContextHook } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import  LogoutTwoTone  from '@mui/icons-material/LogoutTwoTone';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { authToken, clearAuthToken } = useContextHook()
     const [logingOut, setlogingOut] = useState(false);
 const handleLogout = async () => {
    setlogingOut(true)
    await AxiosInstance.put(`/auth`)
      .then((res) => {
        console.log(res);
        clearAuthToken()
        navigate(`/`)
      }).catch((err) => {
        console.log(err);
      }).finally(() => { setlogingOut(false) })

  }
    return (
        <li>
                <button className='logout-btn' onClick={handleLogout}>
          {logingOut ? "loading..." :
            <LogoutTwoTone sx={{
              transform:'scale(3,1.3)',
            }} />}
                </button>
              </li>
    );
}

export default LogoutButton;
