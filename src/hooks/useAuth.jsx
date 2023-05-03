import { useContextHook } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

const UseAuth = () => {

  let username = ``;
  let role = ``;
  let isAdmin = false
  let isEditor = false
  const { authToken } = useContextHook()
  if (authToken) {
    const decoded = jwtDecode(authToken)
    
  username = decoded.AuthData.user;
    role = decoded.AuthData.role;
    isAdmin = role=='admin'? true:false;
    isEditor = role=='editor'? true:false;
  }

  return {role, username,
isAdmin,
isEditor}
}

export default UseAuth;
