import React from 'react';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';
import  Stack  from '@mui/material/Stack';
import  Button  from '@mui/material/Button';


const UserTableRow = ({user}) => {
    return (
        <TableRow>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.firstName}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.lastName}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.username}
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.email}
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.public_name}
            </TableCell>
            <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >{user?.role}
            </TableCell>
             <TableCell
            sx={{color:'var(--text-color)',
            fontSize:'1.1rem'}}
            >
                <Stack direction={'row'}>
                    <Button>Activate</Button>
                    <Button>Dectivate</Button>

                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default UserTableRow;
