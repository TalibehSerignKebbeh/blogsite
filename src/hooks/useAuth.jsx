import { useContextHook } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

export let jwttoken = '';
const UseAuth = () => {

  let username = ``;
  let id =''
  let role = ``;
  let isAdmin = false
  let isEditor = false
  const { authToken } = useContextHook()
  if (authToken) {
    const decoded = jwtDecode(authToken)
    jwttoken = authToken;
  username = decoded.AuthData.user;
    role = decoded.AuthData.role;
    id = decoded?.AuthData?.id;
    isAdmin = role=='admin'? true:false;
    isEditor = role=='editor'? true:false;
  }

  return {role, username,
isAdmin,
isEditor,id,  token:authToken}
}


export default UseAuth;
