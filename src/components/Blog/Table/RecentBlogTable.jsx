import React, { useState } from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { AxiosInstance, ImageUrl } from '../../../api';
import { Link } from 'react-router-dom';
import UseAuth from '../../../hooks/useAuth';
import CloudDoneOutlined from '@mui/icons-material/CloudDoneOutlined';
import PendingOutlined from '@mui/icons-material/PendingOutlined';
import { formattedTitle } from '../../Config';
import { useQuery,QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useScoketContenxt } from '../../../context/socketContext';
import  EggIcon  from '@mui/icons-material/EggSharp';
import RotatingLineLoader from '../../Loader/RotatingLineLoader';
import SpinnerWings from '../../Loader/SpinnerWings';
import ComponenetSkeleton from '../../Loader/ComponenetSkeleton';


const RecentBlogTable = ({ blogs, setblogs }) => {
    const queryClient = new QueryClient()
    const {token} = UseAuth()
    const {socket } = useScoketContenxt()

    const [publishingToggle, setpublishingToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);

    function getFullName(author) {
        return `${author?.firstName || ''} ${author?.lastName || ''}`;
    }

        const { data, failureReason, error, isError,
        isLoading: dataLoading } = useQuery({
            queryKey: ['blogs', 'recent'],
            queryFn: () => AxiosInstance.get(`/blogs/stats/recent`,
                { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res?.data)
                .catch((err) => Promise.reject(err))
        })


    const TogglePublished = async (row) => {
        setpublishingToggle(true)
        setpublishToggleDone(false)

        await AxiosInstance.patch(`/blogs/${row?._id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                params:{date: new Date()}
            })
            .then((res) => {
                // console.log(res)    ;
                setpublishToggleDone(true)
                setpublishingToggle(false)
               queryClient.invalidateQueries({queryKey:'blogs'})
            })
            .catch(() => {
                setpublishToggleDone(false)
                setpublishingToggle(false)
            })
    }

    useEffect(() => {
        socket?.on(`publish_blog_result`, () => {
               queryClient.invalidateQueries({queryKey:'blogs'})
       })
        return () => {
            
        };
    }, []);

    if (dataLoading && !data?.blogs?.length) {
        return <ComponenetSkeleton />
    }

    return (
        <Box
            sx={{
                width: 'max-content',
                bgcolor: 'var(--elements-bg)',
                mx: { xl: 2, lg: 1, md: '5px', sm: '4px', xs: '3px' },
                maxWidth: '100%',
                overflowX: 'auto',
                overflowY: 'hidden', py: 3,
                pb: 5,
                px: (!dataLoading && !data?.blogs?.length)? 4 : 0,
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
                    height: 200,
                },
                "& .avatar": {
                    width: '30px',
                    height: '30px',
                    borderRadius: "50%"
                },
                "& .author-cell": {
                    // display: 'flex',
                    // flexDirection: 'row',
                    // alignItems: 'flex-end',
                    fontSize: '1.2rem'
                },
                '& .title': {
                    color: 'var(--text-color)',
                    mx: 'auto', ml: 2,
                },
                '& .new': {
                    padding: '3px',
                    color: 'white',
                    backgroundColor: 'rgb(29, 123, 29)',
                    borderRadius: '3px',
                    mb:-1.4,
                    display:'flex',width:'min-content'
                },
                '& .titie-text': {
                    color: 'var(--text-color)',
                    mt:'-9px'
                },
                "& .egg_icon": {
                   
                    fontSize: '4rem', mx: "auto", textAlign: 'center',
                    color:'green'
                }

            }}>
            <h2 className='title'>Un Publish Blogs</h2>
            {(!dataLoading && !data?.blogs?.length) ?
                <div style={{width:'100%', textAlign:'center'}}>
                    <EggIcon sx={{
                        transform: 'scale(2)',mt:4,
                     mx: "auto", textAlign: 'center',
                    color:'green'}}
                        className='egg_icon'
                   />
                </div>
                :
                < DataGrid
                loading={dataLoading}

                columns={[
                    {
                        field: 'title', headerName: 'Title',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        minWidth: 400, align: 'left',
                        renderCell: ({ row }) => (
                            <p
                            className='titie-text'>
                                {!row?.notifications?.read ?
                                   <>
                                   <small className={`${row?.notification?.read ? '' : 'new'}`}
                                        >
                                            new
                                   </small> 
                                    </>  : null}
                                {row?.title}
                            </p>
                        )

                    },
                    {
                        field: 'publish', headerName: 'Pusblish',
                        cellClassName: 'title-cell',
                        headerClassName: 'table-head',
                        type: "boolean", editable: false,
                        width: 90,
                        filterable: false,
                        renderCell: ({ value }) => {
                            if (value) {
                                return <CloudDoneOutlined
                                    sx={{ fontSize: '1.6rem' }}
                                />
                            }
                            return <PendingOutlined
                                sx={{ fontSize: '1.6rem' }}
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
                                    sx={{ color: `var(--text-color)` }}>
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
                            false, editable: false, filterable: false,
                        renderCell: ({ row }) => (
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
                rows={data?.blogs || []}
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
                    color: `var(--text-color)`,
                    overflowX: 'auto',
                    // width:{ xl: '700px', lg: '700px', md: '600px', sm: '90%', xs: '99%', }
                }}
            />}
        </Box>
    );
}

export default RecentBlogTable;
