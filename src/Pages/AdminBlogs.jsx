import React, { useState, useEffect } from "react";
import "./adminblogs.css";
import { Link, useLoaderData } from "react-router-dom";
import { AxiosInstance, ImageUrl } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Pagination } from "antd";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useAccessToken } from "../store/store";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { GetFullName, formatDate, formattedTitle } from "../components/Config";
import ZeroBasePaginntation from "../components/Paginnation/ZeroBasePaginntation";
import UseAuth from "../hooks/useAuth";



const AdminBlogs = () => {

    const queryClient = new QueryClient()
    const {token} = UseAuth()
    const responseData = useLoaderData();

    const [pageSize, setPageSize] = useState(5);
    const [pageNum, setPageNum] = useState(0);
    const [blogsToDisplay, setblogsToDisplay] = useState([]);
    const [publishToggle, setpublishToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);
    const [keyword, setKeyword] = useState('');


    const { data, failureReason, error, isError,
        isLoading: dataLoading } = useQuery({
            queryKey: ['blogs', pageNum, pageSize, keyword],
            queryFn: () => AxiosInstance.get(`/blogs?page=${Number(pageNum)}&size=${Number(pageSize)}${keyword?.length ? `&keyword=${keyword}` : ''}`,
                { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res?.data)
                .catch((err) => Promise.reject(err))
        })

    // useEffect(() => {

    //     const fetchAgain = async () => {
    //         setloading(true);
    //         let url = `/blogs?page=${Number(pageNum)}&size=${Number(pageSize)}`;
    //         if (keyword) {
    //             url += `&keyword=${keyword}`;
    //         }
    //         await AxiosInstance.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //             .then((res) => {
    //                 console.log(res?.data);
    //                 setblogsToDisplay(res?.data?.blogs);
    //                 setPageSize(Number(res?.data?.size));
    //                 setPageNum(Number(res?.data?.page));
    //                 setpageCount(Number(res?.data?.pageCount))
    //                 settotal(Number(res?.data?.total))
    //             })
    //             .catch((error) => { 
    //                 console.log(error);
    //             })
    //             .finally(() => {
    //                 setloading(false);
    //             });
    //     };
    //         fetchAgain();
    //     return () => { };
    // }, [pageNum, pageSize, keyword]);



    const TogglePublished = async (row) => {
        console.log('toggle');
        setpublishToggle(true)
        setpublishToggleDone(false)

        await AxiosInstance.patch(`/blogs/${row?._id}`,
            { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                setpublishToggleDone(true)
                // message(res?.data?.message)
                queryClient.invalidateQueries({ queryKey: ['blogs', pageNum, pageSize, keyword] })
            })
            .finally(() => {
                setpublishToggle(false)
            })
    }




    return (
        <Box
            sx={{
                width: 'max-content',
                maxWidth: '100%',
                height: 'max-content',
                alignSelf:'stretch',
                bgcolor: 'var(--elements-bg)',
                p: 2, my: 2,
                overflowX: 'auto',
                mx: {
                    xl: '10px', lg: '6px',
                    md: '4px', sm: '2px', xs: '1px',
                },
                '& .title': {
                    color: 'var(--text-color)',
                    mx: '2px',
                    textAlign: 'start'
                }
            }}>
            <div className="flex_class">
                <h2 className='title'>Manage Blogs</h2>

                <div className="">
                    <input type="search"
                        placeholder="search blogs"
                        className="search_input"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                </div>
            </div>
            <DataGrid editMode="row"
                rows={data?.blogs || []}


                columns={[
                    {
                        field: 'title', headerName: 'Title',
                        cellClassName: 'title-cell',
                        description: ({ row }) =>
                            <Typography sx={{ fontSize: '1.2rem' }}>
                                {row?.title}
                            </Typography>,
                        headerClassName: 'table-head',
                        minWidth: 400, align: 'left'
                    },
                    {
                        field: 'Author', headerName: 'Author',
                        cellClassName: 'author-cell',
                        headerClassName: 'table-head',
                        width: 180, disableExport: true,
                        renderCell: ({ row }) => {
                            if (row?.author) {
                                return (
                                    <Stack direction={'column'} spacing={0}
                                        alignItems={'flex-start'}>
                                        <Stack direction={'row'} spacing={1}>
                                            <Typography size="small"
                                                sx={{ color: 'var(--text-color)' }}>
                                                {(row?.author?.public_name
                                                    || GetFullName(row?.author))
                                                }

                                            </Typography>
                                            {row?.author?.profile?.length ?
                                                <img src={`${ImageUrl}/${row?.author?.profile}`}
                                                    className='table_avatar'
                                                /> : null}
                                        </Stack>
                                        <Typography size="small"
                                            component={'p'}
                                            sx={{ color: 'var(--text-color)' }}
                                        >
                                             {formatDate(row?.created_at)}   
                                            </Typography>
                                    </Stack>
                                )
                            }
                        }
                    },
                    // {
                    //     field: 'created_at', headerName: "Created",
                    //     cellClassName: 'date_field',
                    //     headerClassName: 'Created',
                    //     editable: false, width: 100,type: 'Date', 
                    //     valueFormatter: ({ value }) => value && format(parseISO(value), ' do MMM yyyy ')
                    //     , valueGetter: ({ value }) => value && value,
                    // },
                    // {
                    //     field: 'publish_date', headerName: "Publish",
                    //     headerClassName: 'Publish',cellClassName: 'date_field',
                    //     editable: false, width: 110,type: 'Date', 
                    //     valueFormatter: ({ value }) => value && format(parseISO(value), ' do MMM yyyy ')
                    //     , valueGetter: ({ value }) => value && value,
                    // },
                    {
                        field: 'publish', headerName: 'Status',
                        width: 100,
                        cellClassName: 'status_cell',
                        valueGetter: ({ value }) => (typeof value === 'boolean') ?
                            value ? 'Published' : 'Not publish' : 'Un specified',

                    },
                    {
                        field: 'publisher', headerName: 'Publisher',
                        cellClassName: 'author-cell',
                        headerClassName: 'table-head',
                        width: 180, disableExport: true,
                        sortable:false,
                        renderCell: ({ row }) => {
                            if (row?.publisher) {
                                return (
                                    <Stack direction={'column'} spacing={0}
                                        alignItems={'flex-start'}>
                                        <Stack direction={'row'} spacing={1}
                                        alignItems={'flex-start'}>
                                            <Typography size="small"
                                                sx={{ color: 'var(--text-color)' }}>
                                                {(row?.publisher?.public_name
                                                    || GetFullName(row?.publisher))
                                                }

                                            </Typography>
                                            {row?.publisher?.profile?.length ?
                                                <img src={`${ImageUrl}/${row?.publisher?.profile}`}
                                                    className='table_avatar'
                                                /> : null}
                                        </Stack>
                                        <Typography size="small"
                                            component={'p'}
                                            sx={{ color: 'var(--text-color)' }}
                                        >
                                             {formatDate(row?.publish_date)}   
                                            </Typography>
                                    </Stack>
                                )
                            }
                        }
                    },
                    {
                        field: 'actions', headerName: 'Actions',
                        cellClassName: 'table-cell', width: 200,
                        headerClassName: 'table-head', sortable: false,
                        editable: false, filterable: false,
                        getActions: () => [],
                        renderCell: ({ row }) => (
                            <Stack direction={'row'} spacing={1}>
                                {/* <Button disabled={publishToggle}
                                    onClick={e => TogglePublished(row)}
                                    sx={{

                                        bgcolor: row?.publish ? '#00cc00' : '#000d1a',
                                        color: row?.publish ? '#fff' : '#3337',
                                        ':hover': {
                                            bgcolor: row?.publish ? '#00cc00' : '#000d1a',
                                            color: row?.publish ? '#fff' : '#3337',
                                        }
                                    }}
                                    size='small'>
                                    {row?.publish ? 'UnPublish' : 'publish'}
                                </Button> */}
                                <Link to={`/dash/blogs/view/${formattedTitle(row?.title)}`}>
                                    <Button sx={{ color: '#333' }} size='small'>
                                        View
                                    </Button></Link>
                            </Stack>

                        )
                    }
                ]}

                rowSelection={false}

                loading={dataLoading}
                getRowId={row => row?._id}
                pagination
                hideFooterPagination
                rowCount={data?.pageCount}
                columnBuffer={6}
                rowBuffer={6}

                pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                scrollbarSize={'5px'}
                sx={{
                    minHeight: '400px',
                    maxHeight:'700px',
                    bgcolor: 'var(--elements-bg)',
                    my: {
                        xl: '20px', lg: '15px',
                        md: '10px', sm: '4px', xs: '2px',
                    },
                    color: 'var(--text-color)',

                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .MuiDataGrid-row': {
                        minHeight:'60px !important'
                    },
                    '& .date_field':{
                        fontSize: '.7rem',
                        textAlign:'start',
                    }
                }}
            />
            <ZeroBasePaginntation 
                page={pageNum}
                pageSize={pageSize}
                setPage={setPageNum}
                setPageSize={setPageSize}
                total={data?.total}
                totalMessage={`total of ${data?.total} ${data?.total>1? 'blogs' : 'blog'}`}
                sizeOptions={[5,10,15,20,25,50,75,100]}
            />
              
        </Box>

    );
};

export default AdminBlogs;
