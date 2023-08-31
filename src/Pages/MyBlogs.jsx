import React, {useEffect, useState} from 'react';
import { AxiosInstance } from '../api';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UseAuth from '../hooks/useAuth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';


const MyBlogs = () => {
    const {token, id} = UseAuth()
    const [blogs, setblogs] = useState([]);
    const [page, setpage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [total, settotal] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const [loading, setloading] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');


    useEffect(() => {
         const fetchUsersBlogs = async () => {
      setloading(true);
      await AxiosInstance.get(
          `/blogs/user?page=${Number(page) - 1}&size=${Number(pageSize)}`,
          {
              headers:{
              Authorization:`Bearer ${token}`
              },
              params:{user:id}
          }
      )
        .then((res) => {
          setblogs(res?.data?.blogs);
          setpageSize(res?.data?.size);
            setpage(res?.data?.page);
            settotal(res?.data?.total)
            setpageCount(res?.data?.pageCount)
            console.log(res?.data?.blogs);
        })
          .catch((err) => {
            if (!err?.response) {
                        seterrorMessage('No response server')
                        return;
                    }
                    if (!err?.response?.status === 500) {
                        seterrorMessage('internal server error')
                        return;
                    }
                    if (!err?.response?.status === 403) {
                        seterrorMessage('your authentication state has expired')
                        return;
                    }
                    const message = err?.response?.data?.message;
                    if (message) {
                        seterrorMessage(message)
                        return;
                    }
                    seterrorMessage('An uncaught error has occured')
                    console.log(err);
        })
        .finally(() => {
          setloading(false);
        });
        };
        fetchUsersBlogs()
        return () => {
            
        };
    }, []);


    return (
        <div>
            <h1
                style={{
                    padding: '3px 20px',
                    fontSize: '1.6rem',
                color:'var(--text-color)'}}
            >My blogs</h1>
             <DataGrid editMode="row"
                          
                            columns={[
                                {
                                    field: 'title', headerName: 'Title', 
                                    cellClassName: 'title-cell',
                                    
                                    headerClassName: 'table-head', 
                                    minWidth: 400, align: 'left'
                                },
                               
                                {
                                    field: 'created_at',headerName:"created",
                                    headerClassName: 'Created',
                                    editable: false, width: 120,
                                    valueFormatter: ({ value }) => value && format(parseISO(value), ' do MMM yyyy ')
                                    , valueGetter: ({ value }) => value && value,
                                },
                                {
                                    field: 'publish_date',headerName:"Pubiish Date",
                                    headerClassName: 'Created',
                                    editable: false, width: 120,
                                    valueFormatter: ({ value }) => value?format(parseISO(value), ' do MMM yyyy ') : ''
                                    , valueGetter: ({ value }) => value && value,
                                },
                                
                                {
                                    field: 'publish', headerName: 'Status', 
                                    width:110,
                                    // valueSetter: ({ value }) => value,
                                    cellClassName: 'title-cell',
                                    // valueGetter:({value})=> value && value?.toString()
                                    valueGetter: ({ value }) => (typeof value === 'boolean') ?
                                        value ? 'Published' : 'Not publish' : ''
                                },
                                {
                                    field: 'actions', headerName: 'Actions',
                                    cellClassName: 'table-cell', width: 200,
                                    headerClassName: 'table-head', sortable: false,
                                    editable: false, filterable: false,
                                    renderCell: ({ row }) => (
                                            <Link to={`/dash/blogs/${row?._id}/edit`}>
                                                <Button sx={{ color: '#333' }} size='small'>
                                                    View
                                                </Button></Link>

                                    )
                                }
                        ]}
                        
                        rowSelection={false}
                            rows={blogs}

                            loading={loading}
                            getRowId={row => row?._id}
                            pagination
                            hideFooterPagination
                            rowCount={pageCount}
                            columnBuffer={5}
                            rowBuffer={5}

                            pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                            // scrollbarSize={'5px'}
                            sx={{bgcolor:'var(--elements-bg)',
                                m: {
                                    xl: '20px', lg: '20px',
                                    md: '15px', sm: '5px', xs: '4px',
                                },
                                color:'var(--text-color)',
                                // boxShadow: 2,
                                // border: 2,
                                // borderColor: 'primary.light',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                                // width:{ xl: '700px', lg: '700px', md: '600px', sm: '90%', xs: '99%', }
                            }}
                        />
                        <div className="pagination-wrapper">

                            <Pagination
                                current={page}
                                pageSize={pageSize}
                                responsive={true}
                                showSizeChanger
                                show
                                onShowSizeChange={(page, size) => {
                                    setpageSize(size);
                                    setpage(0)
                                }}
                                pageSizeOptions={[2, 3, 4, 5]}
                                onChange={(page, size) => {
                                    setpage(page);
                                }}
                                showTotal={(total) => `Total blogs ${total}`}
                                total={total}
                            />
                        </div>
        </div>
    );
}

export default MyBlogs;
