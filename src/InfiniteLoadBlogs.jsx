import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosInstance } from './api';

const InfiniteLoadBlogs = () => {
    const fetchPage = async (pageParam) => {
    // Replace this with your API call
        const response = await AxiosInstance.get(`/blogs/infinite?page=${pageParam}`)
            .then(() => {
                console.log(response);
                const data = response?.data;
                console.log(data?.page < data?.pageCount);
        return {
            data: data,
            next: data?.page > data?.pageCount ? pageParam + 1 : undefined,
            pageParam
        };
            }).catch((err) => {
                return Promise.reject(err)
            })
        
    };
    
    const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...result
    } = useInfiniteQuery({
        queryKey: ['blogs'],
        queryFn:({pageParam=1})=> fetchPage(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
    staleTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  });
    
    if (result?.isSuccess) {
        console.log(result);
    }
    //   if (result?.isSuccess) {
    //     console.log(result?.data);
    // }

    return (
        <div>
            <h2
                style={{color:'var(--text-color)'}}
            >Load blogs</h2>

            <button
                disabled={hasNextPage}
                onClick={() => {
                alert('click')
            }}>
                Load More
            </button>
        </div>
    );
}

export default InfiniteLoadBlogs;
