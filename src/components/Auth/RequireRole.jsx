import React from 'react';
import UseAuth from '../../hooks/useAuth';
const RequireRole = ({ roles, children }) => {
    const {role} = UseAuth()
    if (!roles?.includes(role)) return null;
    return (<> {children}</> )
}

export default RequireRole;
