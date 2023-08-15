import React from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
    CloudDoneOutlined, PendingOutlined,
    DoneSharp, DoneRounded, NotStartedSharp,
    
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const UsersBlogTable = ({ blogs, title, isMine=false }) => {
        const formattedTitle =(blogTitle)=> `${blogTitle?.toLowerCase()?.split(' ')?.join('-')}`

    return (
        <div className='blog_table'
            >
            <h2
                style={{
                    color: 'var(--text-color)',
                paddingBlock:'10px'}}
            >{title}</h2>
            <DataGrid
                
                columns={[
                    {
                        field: 'title', headerName: 'Title',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        minWidth: 400, align: 'left'
                    },
                    {
                        field: 'publisher', headerName: 'Publisher',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                         align: 'left',minWidth:60,maxWidth:120, 
                        renderCell: ({ row }) => (
                            <h3>{row?.publisher?.public_name
                                || row?.publisher?.email ||
                            row?.publisher?.username || ''}</h3>
                        )
                    },
                    {
                        field: 'publish', headerName: 'Pusblish',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        type: "boolean", editable: false,
                        width:90,
                        filterable:false,sortable:false,
                        renderCell: ({value }) => {
                            if (value) {
                                return <DoneRounded 
                                    sx={{fontSize:'2rem'}}
                                />
                            }
                                // return <NotStartedSharp
                                //     sx={{fontSize:'1.6rem'}}
                                // />
                            return "Not Published"

                        }
                    },

                    {
                        field: 'actions', headerName: 'View',
                    sortable: 
                            false, editable: false, filterable: false,
                        renderCell: ({ row }) => {
                            if (isMine) {
                                
                           return <Link to={`/dash/blogs/${row?._id}/edit`}>
                                <Button sx={{ color: `var(--primary-color)` }} size='small'>
                                    View</Button>
                            </Link>
                            }
                           return <Link to={`/blogs/${formattedTitle(row?.title)}`}>
                                <Button sx={{ color: `var(--primary-color)` }} size='small'>
                                    View</Button>
                            </Link>
                        }
}
                  
                   
                ]}
                rows={blogs || []}
                // loading={loading}
                getRowId={row => row?._id}
                hideFooterPagination
                pagination
                columnBuffer={5}
                rowBuffer={5}

                pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                // scrollbarSize={'5px'}
                paginationMode="client"
                sx={{
                    // m: { xl: '20px', lg: '20px', md: '15px', sm: '5px', xs: '4px', },
                    // boxShadow: 2,
                    // border: 2,
                    // borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    bgcolor: `var(--form-bg)`,
                    color:`var(--text-color)`,
                    overflowX:'auto',
                    // width:{ xl: '700px', lg: '700px', md: '600px', sm: '90%', xs: '99%', }
                }}
            />
        </div>
    );
}

export default UsersBlogTable;
