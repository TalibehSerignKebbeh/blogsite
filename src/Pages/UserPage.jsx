import { useState, useEffect, useCallback } from "react";
import { AxiosInstance } from "../api"
import Profile from "../components/User/Profile/Profile";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import  Box from "@mui/material/Box";
import Button  from "@mui/material/Button";
import Stack  from "@mui/material/Stack";
import Edit from "@mui/icons-material/Edit";
import LockResetOutlined from '@mui/icons-material/LockResetOutlined'
import ConfirmDelete from "../components/Modal/ConfirmDelete";
// import { Table, TableContainer } from "@mui/material";
import  Table  from '@mui/material/Table';
import  TableContainer  from '@mui/material/TableContainer';
import  TableHead  from '@mui/material/TableHead';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';
import  TableBody  from '@mui/material/TableBody';
import  Paper  from '@mui/material/Paper';
import UserTableRow from "../components/User/UserTableRow";
// import { Paper } from "@mui/material";



function UserPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reseting, setreseting] = useState(false);
  const [open, setopen] = useState(false);
  const [resetMessage, setresetMessage] = useState('');
  const [resetSuccessMessage, setresetSuccessMessage] = useState('');
  const [resetErrorMessage, setresetErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSizeNumber, setpageSizeNumber] = useState(5);
  const [pageNumber, setpageNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState("");

  function getFullName(params) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  }
  const columns = [
    {
      field: 'firstName', headerName: 'First name',
      headerClassName: 'table-head', width: 130
    },
    {
      field: 'lastName', headerName: 'Last name',
      headerClassName: 'table-head', width: 130
    },
    {
      field: 'fullName',
      headerName: 'Full name', headerClassName: 'table-head',
      width: 160,
      valueGetter: getFullName,
    },
    {
      field: 'username', headerName: 'Username',
      headerClassName: 'table-head', width: 130,
      //  colSpan: 2,
    },
    {
      field: 'active', type: 'boolean',
      headerName: 'Active', headerClassName: 'table-head',
      width: 90,
    },


    {
      field: 'actions',
      headerName: 'actions', headerClassName: 'table-head',
      sortable: false, editable: false,
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem showInMenu label='edit'
          icon={<Edit />}
        >
           
        </GridActionsCellItem>,
        <GridActionsCellItem showInMenu label='edit'
          icon={<LockResetOutlined />}
        >
           
        </GridActionsCellItem>
        
      ],
      // renderCell: (params) => (
      //   <Stack direction={'row'} spacing={1}>

      //     <Button size="small"
      //     onClick={()=>handleStartReset(params)}>Reset</Button>
      //     <Button size="small">Active</Button>
      //   </Stack>
      // )
    }
  ];

  const handleStartReset = (params) => {
    setopen(true)
    setresetMessage(`reset ${params?.row?.username}'s account`)
  }
  const resetFunction = () => {
    setreseting(true)
    // setInterval(() => {
    //   console.log("what is up");
    // }, 3000);
    const timeout = setTimeout(() => {
      setresetSuccessMessage('done resetting')
      setreseting(false)
    }, 4000);
    clearTimeout(timeout)
  }
   const fetchUsersData = useCallback(async () => {
    try {
      setLoading(true);
      let url = `/users?page=${pageNumber}&pageSizeNumber=${pageSizeNumber}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const response = await AxiosInstance.get(url);
      console.log(response);
      setUsers(response.data.users);
      setPage(response.data.page);
      setCount(response.data.count);
      console.log(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      const errorMessage = !error?.response ? 'no server response'
        : error?.response?.status === 500 ? 'internal server error'
          : error?.response?.data?.message ?
            error?.response?.data?.message
            : 'uncatch error occured'
      setError(errorMessage);
    }
  }, [page, pageSizeNumber, keyword])

  useEffect(() => {
    fetchUsersData()
  }, []);


 
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    // fetchUsers(1, keyword);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* <Profile avatar={ `http://localhost:6002/file-1682446488934-628926040.jpg`} email={"modoumbbye97@gmail.com"} 
        name={"Modou Mbye"} type={"Admin"}
        properties={[]}
      /> */}
      <Box sx={{
        width:
          { xl: '70%', lg: '90%', md: '90%', sm: '100%', xs: '100%' }
      }}>
        <h3>Users page</h3>
        <TableContainer
        component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>firstName</TableCell>
                <TableCell>lastName</TableCell>
                <TableCell>username</TableCell>
                <TableCell colSpan={3}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <UserTableRow 
                  user={user}
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={users || []}
            loading={loading}
            getRowId={row => row?._id}
            rowCount={count}
            pagination
            pageSizeOptions={[5, 10, 15, 20,50,100]}
            // scrollbarSize={'5px'}
            paginationMode="server"  
            paginationModel={{ page: page, pageSize: pageSizeNumber }}
            onPaginationModelChange={({ page, pageSize }) => {
              setpageSizeNumber(pageSize)
              setPage(page)
              // fetchUsersData()
            }}
            sx={{
              m:{xl:'20px',lg:'20px',md:'15px',sm:'5px',xs:'4px',},
              // boxShadow: 2,
              // border: 2,
              // borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </div> */}

      </Box>
      <ConfirmDelete open={open}
        setopen={setopen}
        message={resetMessage}
        errorMessage={resetErrorMessage}
        succcessMsg={resetSuccessMessage}
        deleteFunction={resetFunction}
        resetFunc={() => {
          setresetSuccessMessage('')
          setresetErrorMessage('')
          setresetMessage('')
         }}
        deleteLoading={reseting}
/>
    </div>
  );
}

export default UserPage;
