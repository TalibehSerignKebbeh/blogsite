import React, { useState, useEffect } from "react";
import "./blogs.css";
import { Link, useLoaderData } from "react-router-dom";
import { AxiosInstance } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import { Pagination, message } from "antd";
// import  format  from "date-fns/format";
const AdminBlogs = () => {
    const responseData = useLoaderData();
    const [loading, setloading] = useState(false);
    const { blogs, total, pageCount, size, page } = responseData;
    console.log(responseData);
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
                    setPageNum(res?.data?.page);
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

        await AxiosInstance.patch(`/blogs/${row?._id}`)
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
            <div className="blogs-landing">
                {loading ? (
                    <div>
                        <h3>Loading...</h3>
                    </div>
                ) : (
                    <div>

                        <DataGrid editMode="row"

                            columns={[
                                {
                                    field: 'title', headerName: 'Title', cellClassName: 'title-cell', description: ({ row }) => <Typography sx={{ fontSize: '1.2rem' }}>{row?.title}</Typography>,
                                    headerClassName: 'table-head', minWidth: 400, align: 'left'
                                },
                                {
                                    field: 'Author', headerName: 'Author', cellClassName: 'author-cell', headerClassName: 'table-head', width: 180,
                                    disableExport: true,
                                    renderCell: ({ row: { author } }) => (
                                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                            <Typography size="small">
                                                {author?.firstName + " " + author?.lastName}
                                            </Typography>
                                            {/* <Box> */}
                                            {/* <img src={`${avatar}`} className='avatar' /> */}
                                            {/* {row?.author ? <img src={`${ImageUrl}/${row?.author?.profile}`} 
                                    className='avatar' /> :
                        <img src={`${avatar}`} className='avatar' />} */}
                                            {/* </Box> */}
                                        </Stack>
                                    )
                                },
                                {
                                    field: 'created_at', headerClassName: 'Created', editable: false,
                                    width: 140,
                                    valueGetter: ({ value }) => value && value?.toString()
                                },
                                {
                                    field: 'actions', headerName: 'Actions', cellClassName: 'table-cell', width: 200,
                                    headerClassName: 'table-head', sortable: false, editable: false, filterable: false,
                                    renderCell: ({ row }) => (
                                        <Stack direction={'row'} spacing={1}>
                                            <Button disabled={publishToggle} onClick={e=>TogglePublished(row)} sx={{ color: '#333' }} size='small'>{row?.publish ? <span className="">published</span> : 'publish'}</Button>
                                            <Link to={`/dash/blogs/${row?._id}/edit`}><Button sx={{ color: '#333' }} size='small'>View</Button></Link>
                                        </Stack>

                                    )
                                }
                            ]}
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogs;
