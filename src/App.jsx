import './App.css'
import React,{useState} from 'react';
import NavbarLanding from './components/Navigation/NavbarLanding';
import { Outlet } from 'react-router-dom';
import UseAuth from './hooks/useAuth';
import TopBar from './components/Navigation/TopBar';
import AdminNav from './components/Navigation/AdminNav';
import { CssBaseline, GlobalStyles } from "@mui/material";

export default function App() {
  // console.log(new Date().getTimezoneOffset())
  const { role } = UseAuth()
  const isSuperUser = role === 'admin' || role === 'editor';

  const customRole = (role === 'admin' ||role === 'editor' ? role : '')
  const [isNavOpen, setisNavOpen] = useState(true);
  return (
    <div className={`App ${customRole}`}>
      <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
         
      {/* <GlobalStyles /> */}
      {isSuperUser?
        <AdminNav isNavOpen={isNavOpen}
        setisNavOpen={setisNavOpen} />
        : <NavbarLanding />
      }
      <div className={`app-sub-wrapper ${customRole}`}
        style={{ alignSelf: 'stretch', margin: '0px',flex: '1' }}>
        {isSuperUser? <TopBar setisNavOpen={setisNavOpen}
          isNavOpen={isNavOpen} /> : null
        }
        <Outlet />
      </div>
    </div>
  );
}



