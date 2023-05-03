import React,{useState} from 'react';
import { AxiosInstance } from '../../api';
import { useContextHook } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

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
                <button className='nav-btn logout-btn' onClick={handleLogout}>
                  {logingOut ? "loading..." : `Logout `}
                </button>
              </li>
    );
}

export default LogoutButton;
