import React, { useState, useEffect } from "react";
import "./blogs.css";
import { Link, useLoaderData } from "react-router-dom";
import { AxiosInstance, ImageUrl } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Avatar, Pagination, message } from "antd";
import UseAuth from "../hooks/useAuth";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";


const AdminBlogs = () => {
    const { token } = UseAuth()
    const responseData = useLoaderData();
    const [loading, setloading] = useState(false);
    const { blogs, total, pageCount, size, page } = responseData;
    // console.log(page, size);
    // console.log(responseData?.blogs);

    const [pageSize, setPageSize] = useState(size);
    const [pageNum, setPageNum] = useState(page == 0 ? 1 : page);
    const [blogsToDisplay, setblogsToDisplay] = useState([...blogs]);
    const [publishToggle, setpublishToggle] = useState(false);
    const [publishToggleDone, setpublishToggleDone] = useState(false);

    useEffect(() => {
        const fetchAgain = async () => {
            setloading(true);
            await AxiosInstance.get(
                `/blogs?page=${Number(pageNum) - 1}&size=${Number(pageSize)}`
            )
                .then((res) => {
                    setblogsToDisplay(res?.data?.blogs);
                    setPageSize(res?.data?.size);
                    setpage(res?.data?.page);
                    console.log(res?.data?.blogs[0]);
                })
                .catch(() => { })
                .finally(() => {
                    setloading(false);
                });
        };
        if (blogs?.length) {
            fetchAgain();
        }
        return () => { };
    }, [pageNum, pageSize]);

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
        <div style={{ textAlign: "center" }}>
            <div className="">

                <Box
                    sx={{
                        width: 'max-content',
                        maxWidth:'100%',
                        bgcolor: 'var(--elements-bg)',
                        py: 2, my: 2,
                        overflowX:'auto',
                        '& .title': {
                            color: 'var(--text-color)',
                            mx: 'auto', ml: 2,
                            textAlign:'start'
                        }
                    }}>
                    <h2 className='title'>Manage Blogs</h2>
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
                                    value ? 'Published' : 'Not publish' : 'Un specified'
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
                                                    {publisher?.firstName + " " + publisher?.lastName}
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
                                                color: '#fff',
                                                bgcolor: row?.publish ? '#00cc00' : '#000d1a',
                                                ':hover': {
                                                    bgcolor: row?.publish ? '#00cc00' : '#000d1a',

                                                }
                                            }}
                                            size='small'>
                                            {row?.publish ? 'published' : 'publish'}
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
                        // scrollbarSize={'5px'}
                        sx={{
                            bgcolor: 'var(--elements-bg)',
                            m: {
                                xl: '20px', lg: '20px',
                                md: '15px', sm: '5px', xs: '4px',
                            },
                            color: 'var(--text-color)',
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
                            current={pageNum}
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
                                setPageNum(page);
                            }}
                            showTotal={(total) => `Total blogs ${total}`}
                            total={total}
                        />
                    </div>
                </Box>

            </div>
        </div>
    );
};

export default AdminBlogs;
