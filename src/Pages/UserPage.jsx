import { useState, useEffect } from "react";
import { AxiosInstance } from "../api"
import Profile from "../components/User/Profile/Profile";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Button, Stack } from "@mui/material";
import { Edit, LockResetOutlined } from "@mui/icons-material";
import ConfirmDelete from "../components/Modal/ConfirmDelete";


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
  const [pageSizeNumber, setpageSizeNumber] = useState(10);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  function getFullName(params) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  }
  const columns = [
    { field: 'firstName', headerName: 'First name', headerClassName: 'table-head', width: 130 },
    { field: 'lastName', headerName: 'Last name', headerClassName: 'table-head', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name', headerClassName: 'table-head',
      width: 160,
      valueGetter: getFullName,
    },
    {
      field: 'username', headerName: 'Username', headerClassName: 'table-head', width: 130,
      //  colSpan: 2,
    },
    { field: 'active',type:'boolean', headerName: 'Active', headerClassName: 'table-head', width: 90,  },


    {
      field: 'actions',
      headerName: 'actions', headerClassName: 'table-head',
      sortable: false, editable: false,
      width:200,
      // getActions: (params) => [
      //   <GridActionsCellItem showInMenu label='edit'
      //     icon={<Edit />}
      //   >
      //      Edit
      //   </GridActionsCellItem>,
      //   <GridActionsCellItem showInMenu label='edit'
      //       icon={<LockResetOutlined />}
      //   >
      //      Reset
      //             </GridActionsCellItem>
        
      //       ],
      renderCell: (params) => (
        <Stack direction={'row'} spacing={1}>

          <Button size="small"
          onClick={()=>handleStartReset(params)}>Reset</Button>
          <Button size="small">Active</Button>
        </Stack>
      )
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
  useEffect(() => {
    fetchUsers(page, keyword);
  }, [page, keyword]);

  const fetchUsers = async (pageNumber, keyword) => {
    try {
      setLoading(true);
      let url = `/users?=${pageNumber}&pageSizeNumber=${pageSizeNumber}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const response = await AxiosInstance.get(url);
      setUsers(response.data.users);
      setPage(response.data.page);
      setPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1, keyword);
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
      <Box sx={{ width: { xl: '70%', lg: '80%', md: '85%', sm: '100%', xs: '100%' } }}>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={users || []}
            loading={loading}
            getRowId={row => row?._id}

            pagination
            pageSizeOptions={[5, 10, 15, 20]}
            // scrollbarSize={'5px'}
            paginationMode="sever"
            sx={{
              m:{xl:'20px',lg:'20px',md:'15px',sm:'5px',xs:'4px',},
              // boxShadow: 2,
              // border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </div>
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
      {/* <div>
        <label htmlFor="keyword">Search:</label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button onClick={handleNextPage} disabled={page === pages}>
          Next
        </button>
      </div> */}
    </div>
  );
}

export default UserPage;
