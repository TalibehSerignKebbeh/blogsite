import './App.css'
import React, { useEffect, useState } from 'react';
import NavbarLanding from './components/Navigation/NavbarLanding';
import { Outlet } from 'react-router-dom';
import TopBar from './components/Navigation/TopBar';
import AdminNav from './components/Navigation/AdminNav';
import { useScoketContenxt } from './context/socketContext';
import { io } from 'socket.io-client';
import { ImageUrl } from './api';
import UseAuth from './hooks/useAuth';
import { BlockedStatus } from './utils/globalValues';

export default function App() {
  const { socket } = useScoketContenxt()
  const {token, role, status} = UseAuth()

  const customRole = (role?.length && (role !=='undefined') && (role !==undefined) && !Object.values(BlockedStatus).includes(status))? role : ''
  const [isNavOpen, setisNavOpen] = useState(true);

  useEffect(() => {
    // console.log( Date.now());
    if (token) {
      
      socket?.connect()
       socket?.on('connected', (arg, callback) => {
      console.log(arg);
      // console.log(callback);
      callback({status:'ok', message:'i am alive'})
       })
      socket?.on(`error`, (error) => {
        console.log(`Error message occured`);
        console.dir(error)
      })
      
   }

   
    return () => {
       socket?.disconnect()
    };
  }, []);


  return (
    <div className={`App ${customRole}`}>
      {(token && !Object.values(BlockedStatus).includes(status)) ?
        <AdminNav isNavOpen={isNavOpen}
          setisNavOpen={setisNavOpen} />
        : <NavbarLanding />
      }
      <div className={`app-sub-wrapper ${customRole}`}
        style={{
          alignSelf: 'stretch',
          justifySelf: 'stretch',margin: '0px',
          width: '100%', maxWidth: '100vw',
          flexGrow: 0,
        }}>
        {(token && !Object.values(BlockedStatus).includes(status)) ?
          <TopBar setisNavOpen={setisNavOpen}
            isNavOpen={isNavOpen} />
          : null
        }
        
        <Outlet />
      </div>
    </div>
  );
}



