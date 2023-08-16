import './App.css'
import React,{useState} from 'react';
import NavbarLanding from './components/Navigation/NavbarLanding';
import { Outlet } from 'react-router-dom';
import UseAuth from './hooks/useAuth';
import TopBar from './components/Navigation/TopBar';
import AdminNav from './components/Navigation/AdminNav';


export default function App() {
  // console.log(new Date().getTimezoneOffset())
  const { role,token } = UseAuth()
  const isSuperUser = role === 'admin' || role === 'editor';

  const customRole = role|| ''
  const [isNavOpen, setisNavOpen] = useState(true);

// const minPasswordLength = 8;
// const maxPasswordLength = 20;

// const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,20}$/;

// const passwords = [
//   "P@ssw0rd",
//   "Strong123!",
//   "Weak",
//   "OnlyLetters",
//   "12345678",
// ];

// passwords.forEach(password => {
//   if (passwordRegExp.test(password)) {
//     console.log(`"${password}" is a valid password.`);
//   } else {
//     console.log(`"${password}" is not a valid password.`);
//   }
// });


  return (
    <div className={`App ${role}`}>
      {token?
        <AdminNav isNavOpen={isNavOpen}
        setisNavOpen={setisNavOpen} />
        : <NavbarLanding />
      }
      <div className={`app-sub-wrapper ${customRole}`}
        style={{
          alignSelf: 'stretch', margin: '0px',
          width: '100%',maxWidth:'100vw',
          flexGrow: 0,
        }}>
        {token ?
          <TopBar setisNavOpen={setisNavOpen}
          isNavOpen={isNavOpen} />
          : null
        }
        {/* <div>
          <h2
          style={{color:'var(--text-color)'}}>My second title</h2>
        </div> */}
        <Outlet />
      </div>
    </div>
  );
}



