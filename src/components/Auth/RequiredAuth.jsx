import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContextHook } from "../../context/AuthContext";
// import jwtDecode from 'j'
import UseAuth from "../../hooks/useAuth";

const RequiredAuth = ({ roles }) => {
    const { role } = UseAuth()
    const { authToken } = useContextHook()
    if (!authToken) return <Navigate to={'/login'} replace={true}  />
    if(!roles?.includes(role)) return <Navigate to={'/unauthorized'} replace={false}  />
    return <Outlet />
}

export default RequiredAuth