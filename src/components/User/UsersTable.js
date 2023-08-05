import { useState } from 'react';
import { DataGrid, GridVirtualization } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: 400,
    width: '100%',
  },
});

function UserList() {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(10);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 4,
  });
  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
  ];

  return (
    <div className={classes.root}>
      <DataGrid
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50,100]}
        rowCount={data.length}
        rows={data}
        columns={columns}
        components={{ virtualization: GridVirtualization }}
        autoHeight
      />
    </div>
  );
}

export default UserList



