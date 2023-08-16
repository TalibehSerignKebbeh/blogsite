import React, { useState, useEffect } from "react";
import "./blogs.css";
import { Link, useLoaderData } from "react-router-dom";
import { AxiosInstance, ImageUrl } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import {  Pagination } from "antd";
import UseAuth from "../hooks/useAuth";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useContextHook } from "../context/AuthContext";


const AdminBlogs = () => {
  const { authToken } = useContextHook()

    const { token } = UseAuth()
    const responseData = useLoaderData();
    // const { blogs, total, pageCount, size, page } = responseData;

    const [loading, setloading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [pageNum, setPageNum] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const [total, settotal] = useState(0);
    const [blogsToDisplay, setblogsToDisplay] = useState([]);
    const [publishToggle, setpublishToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {

        const fetchAgain = async () => {
            setloading(true);
            let url = `/blogs?page=${Number(pageNum)}&size=${Number(pageSize)}`;
            if (keyword) {
                url += `&keyword=${keyword}`;
            }
            await AxiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res?.data);
                    setblogsToDisplay(res?.data?.blogs);
                    setPageSize(Number(res?.data?.size));
                    setPageNum(Number(res?.data?.page));
                    setpageCount(Number(res?.data?.pageCount))
                    settotal(Number(res?.data?.total))
                })
                .catch((error) => { 
                    console.log(error);
                })
                .finally(() => {
                    setloading(false);
                });
        };
            fetchAgain();
        return () => { };
    }, [pageNum, pageSize, keyword]);

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
            }).then(async () => {
                if (publishToggleDone) {
                    await AxiosInstance.get(`/blogs?page=${pageNum}&size=${pageSize}`)
                        .then((res) => {
                            setblogsToDisplay(res?.data?.blogs);
                            setPageSize(res?.data?.size);
                            setPageNum(res?.data?.page);

                        })
                }


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
                                renderCell: ({ row: { author } }) => (
                                    <Stack direction={'row'} spacing={1}
                                        alignItems={'center'}>
                                        <Typography size="small"
                                            sx={{ color: 'var(--text-color)' }}>
                                            {author?.firstName + " " + author?.lastName}
                                        </Typography>
                                        {author?.profile?.length ?
                                            <img src={`${ImageUrl}/${author?.profile}`}
                                                className='avatar'
                                            /> : null}
                                    </Stack>
                                )
                            },
                            {
                                field: 'created_at', headerName: "Created",
                                headerClassName: 'Created',
                                editable: false, width: 140,
                                valueFormatter: ({ value }) => value && format(parseISO(value), ' do MMM yyyy ')
                                , valueGetter: ({ value }) => value && value,
                            },
                            {
                                field: 'publish_date', headerName: "Publish",
                                headerClassName: 'Publish',
                                editable: false, width: 140,
                                valueFormatter: ({ value }) => value && format(parseISO(value), ' do MMM yyyy ')
                                , valueGetter: ({ value }) => value && value,
                            },

                            {
                                field: 'publish', headerName: 'Status',
                                width: 110,
                                cellClassName: 'status_cell',
                                valueGetter: ({ value }) => (typeof value === 'boolean') ?
                                    value ? 'Published' : 'Not publish' : 'Un specified',
                                
                            },
                            {
                                field: 'publisher', headerName: 'Publisher',
                                cellClassName: 'author-cell',
                                headerClassName: 'table-head',
                                width: 180, disableExport: true,
                                renderCell: ({ row: { publisher } }) => {
                                    if (publisher) {
                                        return (
                                            <Stack direction={'row'} spacing={1}
                                                alignItems={'center'}>
                                                <Typography size="small"
                                                    sx={{ color: 'var(--text-color)' }}>
                                                    {publisher?.public_name
                                                    || publisher?.username}
                                                </Typography>
                                                {publisher?.profile?.length ?
                                                    <img src={`${ImageUrl}/${publisher?.profile}`}
                                                        className='avatar'
                                                    /> : null}
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
                                        <Button disabled={publishToggle}
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
                                        </Button>
                                        <Link to={`/dash/blogs/${row?._id}/edit`}>
                                            <Button sx={{ color: '#333' }} size='small'>
                                                View
                                            </Button></Link>
                                    </Stack>

                                )
                            }
                        ]}

                        rowSelection={false}
                        rows={blogsToDisplay}

                        loading={loading}
                        getRowId={row => row?._id}
                        pagination
                        hideFooterPagination
                        rowCount={pageCount}
                        columnBuffer={3}
                        rowBuffer={3}

                        pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                        scrollbarSize={'5px'}
                        sx={{
                            bgcolor: 'var(--elements-bg)',
                            my: {
                                xl: '20px', lg: '15px',
                                md: '10px', sm: '4px', xs: '2px',
                            },
                            color: 'var(--text-color)',
                            
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                    <div className="pagination-wrapper">

                        <Pagination
                            // current={pageNum-1}
                           current={pageNum+1}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger
                            show
                            onShowSizeChange={(page, size) => {
                                setPageSize(size);
                                setPageNum(0)
                            }}
                            pageSizeOptions={[2, 3, 4, 5]}
                            onChange={(page, size) => {
                                setPageNum(page-1);
                            }}
                            showTotal={(total) => `Total blogs ${total}`}
                            total={total}
                        />
                    </div>
                </Box>

    );
};

export default AdminBlogs;
