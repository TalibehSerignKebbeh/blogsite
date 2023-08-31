import jwtDecode from 'jwt-decode';
import {useAccessToken } from '../store/store';

const UseAuth = () => {
  let username = ``;
  let id =''
  let role = ``;
  let status = ``;
  let name = ``;
  let isAdmin = false;
  let isEditor = false;
  let isUser = false;
  const accessToken = useAccessToken()
  if (accessToken) {
    const decoded = jwtDecode(accessToken)
  username = decoded?.AuthData?.user;
    role = decoded?.AuthData?.role;
    status = decoded?.AuthData?.status;
    id = decoded?.AuthData?.id;
    name = decoded?.AuthData?.name;
    isAdmin = role == 'admin' ? true : false;
    isUser = role === 'user' ? true : false;
    isEditor = role=='editor'? true:false;
  }

  return {
    role, username,
    isAdmin,isUser,
    name,
    isEditor, id,
    token: accessToken,
    status
  }
}


export default UseAuth;
