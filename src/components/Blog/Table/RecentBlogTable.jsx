import React,{useState} from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { ImageUrl } from '../../../api';
import avatar from '../../../assets/mydefaultprofile.png'
import { Link } from 'react-router-dom';

const RecentBlogTable = ({ blogs,setblogs }) => {
    const [publishToggle, setpublishToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);

    function getFullName(author) {
        return `${author?.firstName || ''} ${author?.lastName || ''}`;
    }
     const TogglePublished = async (row) => {
        console.log('toggle');
        setpublishToggle(true)
        setpublishToggleDone(false)

        await AxiosInstance.patch(`/blogs/${row?._id}`)
            .then((res) => {
                console.log(res);
                setpublishToggleDone(true)
                // message(res?.data?.message)
            }).then(async () => {
                if (publishToggleDone) {
                    await AxiosInstance.get(`/blogs/stats/recent`)
                        .then((res) => {
                            setblogs(res?.data?.recentBlogs);
                        })
                }


            })
            .finally(() => {
                setpublishToggle(false)
            })
    }
    


    return (
        <Box sx={{
            '& .title-cell': {
                textAlign: 'start',
                textOverflow: 'initial',
                // color: 'red',
                height: 'auto',
                fontSize: '1rem'
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
            }
        }}>
            <DataGrid
                columns={[
                    {
                        field: 'title', headerName: 'Title', cellClassName: 'title-cell', description: ({ row }) => <Typography sx={{ fontSize: '1.2rem' }}>{row?.title}</Typography>,
                        headerClassName: 'table-head', minWidth: 400, align: 'left'
                    },
                    {
                        field: 'Author', headerName: 'Author',cellClassName: 'author-cell', headerClassName: 'table-head', width: 180,
                        disableExport: true,
                        renderCell: ({ row: { author } }) => (
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <Typography size="small">
                                    {getFullName(author)}
                                </Typography>
                                <Box>
                                    <img src={`${avatar}`} className='avatar' />
                                    {/* {row?.author ? <img src={`${ImageUrl}/${row?.author?.profile}`} className='avatar' /> :
                        <img src={`${avatar}`} className='avatar' />} */}
                                </Box>
                            </Stack>
                        )
                    },
                    {
                        field: 'actions', headerName: 'Actions',cellClassName: 'table-cell', width: 200,
                       headerClassName: 'table-head', sortable: false, editable: false,filterable:false,
                        renderCell: ({row}) => (
                             <Stack direction={'row'} spacing={1}>
                                <Button color={`success`} disabled={publishToggle} onClick={e=>TogglePublished(row)} sx={{ color: '#333' }} size='small'>{row?.publish ? <span className="">published</span> : 'publish'}</Button>
                                            <Link to={`/dash/blogs/${row?._id}/edit`}><Button sx={{ color: '#333' }} size='small'>View</Button></Link>
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
                    // width:{ xl: '700px', lg: '700px', md: '600px', sm: '90%', xs: '99%', }
                }}
            />
        </Box>
    );
}

export default RecentBlogTable;
