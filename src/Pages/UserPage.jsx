import { useState, useEffect, useCallback } from "react";
import { AxiosInstance } from "../api"
import  Box from "@mui/material/Box";
import ConfirmDelete from "../components/Modal/ConfirmDelete";
import  Table  from '@mui/material/Table';
import  TableContainer  from '@mui/material/TableContainer';
import  TableHead  from '@mui/material/TableHead';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';
import  TableBody  from '@mui/material/TableBody';
import  Paper  from '@mui/material/Paper';
import UserTableRow from "../components/User/UserTableRow";
import { useContextHook } from "../context/AuthContext";
import RotatingLineLoader from "../components/Loader/RotatingLineLoader";
import '.././assets/css/users.css'
import { useQuery } from "@tanstack/react-query";


function UserPage() {

  const {authToken, dark} = useContextHook()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState("");

  const fetchData = async (page, pageSize, keyword) => {
    let url = `/users?page=${page}&pageSize=${pageSize}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    await AxiosInstance.get(url,
    {
        headers:{Authorization:`Bearer ${authToken}`}
      }
    )
      .then((res) => {
        return res?.data
      }).catch((err) => {
        return Promise.reject(err)

        // if (!err?.response) {
        //   return {
        //     message:"no server response",
        //   }
        // }
        //  if (err?.response?.status==500) { 
        //   return {
        //     message: 'internal server error',
        //   }
        // }

        // if (err?.response?.data?.message) { 
        //   return {
        //     message: err?.response?.data?.message,
        //   }
        // }

      })
  }
  
  const fetch = useQuery({
    queryKey: ['users', page, pageSize, keyword],
    queryFn:()=> fetchData(page, pageSize, keyword),
    networkMode:"offlineFirst",
    
  })
   
  useEffect(() => {
    const fetchUsersData = async () => {
    try {
      setLoading(true);
      let url = `/users?page=${page}&pageSize=${pageSize}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const response = await AxiosInstance.get(url, {
        headers:{Authorization:`Bearer ${authToken}`}
      });
      // console.log(response);
      setUsers(response.data.users);
      setPage(response.data.page);
      setCount(response.data.count);
      // console.log(response?.data);
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
  }

    fetchUsersData()
  }, [page, pageSize, keyword]);
  const refetchUsers = async () => {
    if (refreshing) return;
    try {
      setrefreshing(true);
      let url = `/users?page=${page}&pageSize=${pageSize}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const response = await AxiosInstance.get(url, {
        headers:{Authorization:`Bearer ${authToken}`}
      });
      // console.log(response);
      setUsers(response.data.users);
      setPage(response.data.page);
      setCount(response.data.count);
      // console.log(response?.data);
      setrefreshing(false);
    } catch (error) {
      console.log(error);
      setrefreshing(false);
      const errorMessage = !error?.response ? 'no server response'
        : error?.response?.status === 500 ? 'internal server error'
          : error?.response?.data?.message ?
            error?.response?.data?.message
            : 'uncatch error occured'
      setError(errorMessage);
    }
  }
  if (fetch?.isSuccess) {
    console.log(fetch?.data);
  }
  if (fetch?.isError) {
    console.log(fetch?.error);
    console.log(fetch?.failureReason);
  }
 
  if (loading && !users?.length) {
    return <RotatingLineLoader />
  }

  if (error?.length) {
    return <div>
      <p style={{ fontSize: '1.3rem', color: 'var(--text-color)' }}>
        Error: {error}
      </p>
    </div>;
  }

  return (
    
    <Box
      sx={{
      bgcolor: 'var( --elements-bg)',
      mt: '20px',py:2,
      px:{xl:2,lg:2,md:1,sm:'4px',xs:'3px'},
      maxWidth:'100%',
      width: '100vw',
      textAlign: 'start',
      overflowX: 'auto'
        
    }}
    >
      <div className="flex_class">
        <h3
          style={{
            padding: '15px 3px',
            color: 'var(--text-color)',
          textTransform: 'capitalize',
            textAlign:'start'
          }}>Users page</h3>
        <div className="">
          <input type="search"
            placeholder="search user"
            className="search_input"
            value={keyword}
            onChange={e=>setKeyword(e.target.value)}
          />
        </div>
      </div>
        <TableContainer
          component={Paper}
          sx={{margin:'10px auto 20px auto',
            bgcolor: 'var( --elements-bg)',
            color: 'var(--text-color)',
            // boxShadow: ' 0px 10px 15px -3px rgba(0,0,0,0.1)',
            boxShadow:'inset 0px 2px 4px 8px rgba(0,0,0,0.03)',
            border: '1px solid var(--text-color)',
            overflowX: 'auto',
          
        }}>
          <Table>
            <TableHead sx={{bgcolor:'var(--elements-bg)'}}>
            <TableRow
            sx={{bgcolor:'#3331'}}>
                <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Firstname
                </TableCell>
                <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Lastname
                </TableCell>
                <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Username</TableCell>
                <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Email
              </TableCell>
              <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Public name
              </TableCell>
              <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Role
              </TableCell>
              <TableCell 
                sx={{color:'var(--text-color)',
                fontSize:'1.1rem'}}
                >Status
              </TableCell>
                <TableCell 
                  sx={{ color: 'var(--text-color)',
                  fontSize:'1.1rem' }}
                  colSpan={3}
                >Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <UserTableRow 
                  user={user}
                  key={user?._id}
                  resetFunction={refetchUsers}
                />
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      </Box>
     
   
  );
}

export default UserPage;
