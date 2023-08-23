import { Pagination } from 'antd';
import React from 'react';

const ZeroBasePaginntation = (
    { page, pageSize, total,
        setPageSize, setPage,
        totalMessage,
        sizeOptions,
    }
) => {
    return (

        <div className="pagination-wrapper">
            <Pagination
                // current={page-1}
                current={page + 1}
                pageSize={pageSize}
                responsive={true}
                showSizeChanger
                show
                onShowSizeChange={(page, size) => {
                    setPageSize(size);
                    setPage(0)
                }}
                pageSizeOptions={sizeOptions?.length? [...sizeOptions] :[3,5,10,15]}
                onChange={(page, size) => {
                    setPage(page - 1);
                }}
                total={total}
                showTotal={(total) => totalMessage}
            />
        </div>
    );
}

export default ZeroBasePaginntation;
