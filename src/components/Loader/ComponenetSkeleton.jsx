import React from 'react';
import SpinnerWings from './SpinnerWings';

const ComponenetSkeleton = () => {
    return (
        <div
                style={{
                    margin: '20px 10px',
                paddingTop: '15px', paddingBottom: '15px',
                width: 'max-content', height: "auto", minWidth: '300px',
                minHeight: '200px', display: 'grid', gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr', border: '1px solid var(--text-color)',
                justifyItems: 'center', alignItems: 'center'
            }}
            >

        <SpinnerWings />
            </div>
    );
}

export default ComponenetSkeleton;
