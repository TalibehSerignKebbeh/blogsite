import React,{useState} from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { AxiosInstance, ImageUrl } from '../../../api';
import { Link } from 'react-router-dom';
import UseAuth from '../../../hooks/useAuth';
import CloudDoneOutlined from '@mui/icons-material/CloudDoneOutlined';
import  PendingOutlined  from '@mui/icons-material/PendingOutlined';
import { useContextHook } from '../../../context/AuthContext';

const RecentBlogTable = ({ blogs, setblogs }) => {

    const { token } = UseAuth()
    const {authToken} = useContextHook()

    const [publishingToggle, setpublishingToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);

    function getFullName(author) {
        return `${author?.firstName || ''} ${author?.lastName || ''}`;
    }

    const formattedTitle =(title)=> `${title?.toLowerCase()?.split(' ')?.join('-')}`

     const TogglePublished = async (row) => {
        console.log('toggle');
        setpublishingToggle(true)
        setpublishToggleDone(false)

        await AxiosInstance.patch(`/blogs/${row?._id}`,
            {  },
        {headers: { Authorization: `Bearer ${authToken}` }})
            .then((res) => {
                // console.log(res)    ;
                setpublishToggleDone(true)
                setpublishingToggle(false)

            }).then(async () => {
                console.log('refreshing ');
                await AxiosInstance.get(`/blogs/stats/recent`,
                    { headers: { Authorization: `Bearer ${authToken}` }, })
                    .then((res) => {
                        // console.log(res?.data);
                        setblogs(res?.data?.recentBlogs);
                    }).catch((err) => {
                        // console.log(err);
            })
            })
            .catch(() => {
                setpublishToggleDone(false)
                setpublishingToggle(false)
            })
    }
    


    return (
        <Box
            sx={{
                width: 'max-content',
                bgcolor: 'var(--elements-bg)',
                mx:{xl:2,lg:1,md:'5px', sm:'4px',xs:'3px'},
                maxWidth: '100%',
                overflowX: 'auto',
                overflowY: 'hidden', py: 3,
                pb:5,
            '& .title-cell': {
                textAlign: 'start',
                textOverflow: 'initial',
                // color: 'red',
                height: 'auto',
                fontSize: '1rem',
            },
            "& .table-head": {
                fontSize: '1.1rem',
                fontWeight: 200,
                height:200,
            },
            "& .avatar":{
                width: '30px',
                height: '30px',
                borderRadius:"50%"
            },
            "& .author-cell": {
                // display: 'flex',
                // flexDirection: 'row',
                // alignItems: 'flex-end',
                fontSize:'1.2rem'
                },
                '& .title': {
                    color: 'var(--text-color)',
                    mx:'auto',ml:2,
            }
            }}>
            <h2 className='title'>Recent Posted Blogs</h2>
            <DataGrid
                
                columns={[
                    {
                        field: 'title', headerName: 'Title',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        minWidth: 400, align: 'left'
                    },
                    {
                        field: 'publish', headerName: 'Pusblish',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        type: "boolean", editable: false,
                        width:90,
                        filterable:false,
                        renderCell: ({value }) => {
                            if (value) {
                                return <CloudDoneOutlined 
                                    sx={{fontSize:'1.6rem'}}
                                />
                            }
                                return <PendingOutlined 
                                    sx={{fontSize:'1.6rem'}}
                                />

                        }
                    },
                    {
                        field: 'Author', headerName: 'Author',
                        cellClassName: 'author-cell',
                        headerClassName: 'table-head', width: 180,
                        disableExport: true,
                        renderCell: ({ row: { author } }) => (
                            <Stack direction={'row'}
                                spacing={1} alignItems={'center'}>
                                <Typography size="small"
                                sx={{color:`var(--text-color)`}}>
                                    {getFullName(author)}
                                </Typography>
                                <Box>
                                    {author?.profile?.length ?
                                        <img src={`${ImageUrl}/${author?.profile}`}
                                        className='avatar' 
                                      /> : null}
                                   
                                </Box>
                            </Stack>
                        )
                    },
                    {
                        field: 'actions', headerName: 'Actions',
                        cellClassName: 'table-cell', width: 200,
                       headerClassName: 'table-head', sortable: 
                       false, editable: false,filterable:false,
                        renderCell: ({row}) => (
                             <Stack direction={'row'} spacing={1}>
                                <Button 
                                    disabled={publishingToggle}
                                    onClick={e => TogglePublished(row)}
                                    sx={{ 
                                         color: '#fff',
                                        bgcolor: row?.publish ? '#00cc00' : '#0040ff',
                                        ':hover': {
                                            bgcolor: row?.publish ? '#00cc00' : '#0040ff',
                                        }
                                    }} size='small'>
                                    {row?.publish ? 'published' : 'publish'}
                                </Button>
                                <Link to={`/dash/blogs/view/${formattedTitle(row?.title)}`}>
                                    <Button sx={{ color: `var(--primary-color)` }} size='small'>
                                        View
                                    </Button>
                                </Link>
                                        </Stack>

                        )
                    }
                ]}
                rows={blogs || []}
                // loading={loading}
                getRowId={row => row?._id}
                hideFooterPagination
                pagination
                columnBuffer={3}
                rowBuffer={3}

                pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                // scrollbarSize={'5px'}
                paginationMode="client"
                sx={{
                    m: { xl: '20px', lg: '20px', md: '15px', sm: '5px', xs: '4px', },
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
        </Box>
    );
}

export default RecentBlogTable;
