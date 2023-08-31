import React,{useState} from 'react';
import { AxiosInstance } from '../../api';
import { useContextHook } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import LogoutTwoTone from '@mui/icons-material/LogoutTwoTone';
import {useActions} from '../../store/store'
import {notificationActions} from '../../store/notificationStore'

const LogoutButton = () => {
  const { clearTokens } = useActions()
  const {ClearNotifications} = notificationActions()
  const navigate = useNavigate()
     const [logingOut, setlogingOut] = useState(false);
 const handleLogout = async () => {
    setlogingOut(true)
    await AxiosInstance.put(`/auth`)
      .then((res) => {
        console.log(res);
        clearTokens()
        ClearNotifications()
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
              transform: 'scale(2.9,1.2)',
              color:"#333"
            }} />}
                </button>
              </li>
    );
}

export default LogoutButton;
