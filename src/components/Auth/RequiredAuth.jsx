import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import { BlockedStatus } from "../../utils/globalValues";


const RequiredAuth = ({ roles }) => {
   const {token, role, status} = UseAuth()

    if (!token) return <Navigate to={'/login'} replace={true} />
   
    
    if (Object.values(BlockedStatus)?.indexOf(status) !== -1) {
         return <Navigate to={'/blocked_accounts'} replace={false} 
        />
    }
    if (!roles?.includes(role))
        return <Navigate to={'/unauthorized'} replace={false} 

        />
    return <Outlet />
}

export default RequiredAuth