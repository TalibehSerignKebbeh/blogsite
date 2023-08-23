import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContextHook } from "../../context/AuthContext";
// import jwtDecode from 'j'
import UseAuth from "../../hooks/useAuth";
import { getAuthData, useAccessToken, getActions, useActions} from '../../store/store'


const RequiredAuth = ({ roles }) => {
    ;
    const token = useAccessToken()

    const role = getAuthData()?.role;
    const {setAuthData} = useActions()

    if (!token) return <Navigate to={'/login'} replace={true} />
    if (!getAuthData() && token) {
       setAuthData(token) 
    }
        
    if (!roles?.includes(role))
        return <Navigate to={'/unauthorized'} replace={false} 

        />
    return <Outlet />
}

export default RequiredAuth