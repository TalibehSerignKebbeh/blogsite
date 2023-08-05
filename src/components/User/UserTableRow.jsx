import React from 'react';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';

const UserTableRow = ({user}) => {
    return (
        <TableRow>
            <TableCell>{user?.firstName }</TableCell>
            <TableCell>{user?.lastName }</TableCell>
            <TableCell>{user?.username }</TableCell>
        </TableRow>
    );
}

export default UserTableRow;
