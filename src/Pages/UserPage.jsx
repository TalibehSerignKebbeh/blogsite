import { useState, useEffect } from "react";
import { AxiosInstance } from "../api"
import  Box from "@mui/material/Box";
import  Table  from '@mui/material/Table';
import  TableContainer  from '@mui/material/TableContainer';
import  TableHead  from '@mui/material/TableHead';
import  TableRow  from '@mui/material/TableRow';
import  TableCell  from '@mui/material/TableCell';
import  TableBody  from '@mui/material/TableBody';
import  Paper  from '@mui/material/Paper';
import UserTableRow from "../components/User/UserTableRow";
import RotatingLineLoader from "../components/Loader/RotatingLineLoader";
import '.././assets/css/users.css'
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetError } from "../components/Config";
import ZeroBasePaginntation from "../components/Paginnation/ZeroBasePaginntation";
import UseAuth from "../hooks/useAuth";


function UserPage() {

  const queryClient = new QueryClient()

  const {token} = UseAuth()
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");

  
   const { data, failureReason, error:fetchError, isError,
    isLoading: dataLoading, isSuccess} = useQuery({
        queryKey: ['users', page, pageSize, keyword],
      queryFn: () => AxiosInstance.get(`users?page=${Number(page)}&pageSize=${Number(pageSize)}${keyword?.length ? `&keyword=${keyword}` : ''}`,
      {headers:{Authorization: `Bearer ${token}`}})
            .then(res => res?.data)
        .catch((err) => Promise.reject(err)),
      refetchOnReconnect: true,
        refetchInterval: 10000,
    })
   

  
  
  useEffect(() => {
    if (isError || failureReason || fetchError) {
    const errorMsg = GetError(failureReason) || GetError(fetchError)
    setError(errorMsg)
    } else {
      setError('')
          }
    return () => {
      
    };
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
    
  setTotal(data?.total)
  }
  return () => {
    
  };
}, [isSuccess]);

if (dataLoading && !data?.users?.length) {
    return <RotatingLineLoader />
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
      overflowX: 'auto',height:'fit-content',
        
    }}
    >
      <div style={{position:'relative'}} className="flex_class">
        <div >

        <h3
          style={{
            padding: '15px 3px',
            color: 'var(--text-color)',
          textTransform: 'capitalize',
            textAlign:'start'
            }}>Users page</h3>
          {error?.length ?
            <p className="error"
              style={{
                position: 'absolute', top: 0,
                left: 'auto', right: 'auto', textAlign: 'center',
                margin:'auto'
               
              }}>{error}</p> : null}
        </div>
          
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
              {data?.users?.map((user, index) => (
                <UserTableRow 
                  user={user}
                  key={index}
                  resetFunction={() => {
                    queryClient.invalidateQueries({ queryKey:['users', page, pageSize, keyword]})
                  }}
                />
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      <ZeroBasePaginntation 
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        totalMessage={`Total of ${total} ${total>1? 'users':'user'}`}
      />
      </Box>
     
   
  );
}

export default UserPage;
