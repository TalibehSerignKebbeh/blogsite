import React from 'react';

const SampleCard = () => {
    return (
         <div className="dash_card">
        <div className="icon-wrapper">
          <h2>hi</h2>
        </div>
        <div className="content">
          <h2>{6}</h2>
          <hr style={{ borderTop: "1px solid magenta", width: "100%" }} />
          <h5>Total Blogs</h5>
        </div>
      </div>
    );
}

export default SampleCard;
