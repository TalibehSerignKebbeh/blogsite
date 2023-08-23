import { useContextHook } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { getAccessToken } from '../store/store';

export let jwttoken = '';
const UseAuth = () => {

  let username = ``;
  let id =''
  let role = ``;
  let name = ``;
  let isAdmin = false;
  let isEditor = false;
  // const { authToken } = useContextHook()
  const authToken = getAccessToken()
  if (authToken) {
    const decoded = jwtDecode(authToken)
    jwttoken = authToken;
  username = decoded.AuthData.user;
    role = decoded.AuthData.role;
    id = decoded?.AuthData?.id;
    name = decoded?.AuthData?.name;
    isAdmin = role=='admin'? true:false;
    isEditor = role=='editor'? true:false;
  }

  return {
    role, username,
    isAdmin,name,
    isEditor, id,
    token: authToken
  }
}


export default UseAuth;
