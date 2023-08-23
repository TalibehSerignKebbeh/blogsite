import './App.css'
import React, { useEffect, useState } from 'react';
import NavbarLanding from './components/Navigation/NavbarLanding';
import { Outlet } from 'react-router-dom';
import TopBar from './components/Navigation/TopBar';
import AdminNav from './components/Navigation/AdminNav';
import { useScoketContenxt } from './context/socketContext';
import { useAccessToken, getAuthData } from './store/store';
import { io } from 'socket.io-client';
import { ImageUrl } from './api';

export default function App() {
  const { socket } = useScoketContenxt()
  const token = useAccessToken()
  let role = getAuthData()?.role;
  let username = getAuthData()?.username;

  const customRole = (role?.length && (role !=='undefined') && (role !==undefined))? role : ''
  const [isNavOpen, setisNavOpen] = useState(true);

  useEffect(() => {
    if (token) {
      
      socket?.connect()
       socket?.on('connected', (arg, callback) => {
      console.log(arg);
      // console.log(callback);
      callback({status:'ok', message:'i am alive'})
       })
      
   }

   
    return () => {
       socket?.disconnect()
    };
  }, []);


  return (
    <div className={`App ${customRole}`}>
      {token ?
        <AdminNav isNavOpen={isNavOpen}
          setisNavOpen={setisNavOpen} />
        : <NavbarLanding />
      }
      <div className={`app-sub-wrapper`}
        style={{
          alignSelf: 'stretch',
          justifySelf: 'stretch',margin: '0px',
          width: '100%', maxWidth: '100vw',
          flexGrow: 0,
        }}>
        {token ?
          <TopBar setisNavOpen={setisNavOpen}
            isNavOpen={isNavOpen} />
          : null
        }
        
        <Outlet />
      </div>
    </div>
  );
}



