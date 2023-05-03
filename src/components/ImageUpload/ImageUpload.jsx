import React from 'react';
import './index.css'

const ImageUpload = ({ handleFileChange, handleUploadClick }) => {
  
  const UploadImage = () => {
    
  }
    return (
      <div className="upload-btn-wrapper">
        <label className='image-label' htmlFor='image' >Upload Image</label>
        <input hidden type="file" id='image' name="image" onChange={handleFileChange} />
        {/* <progress value={1} max={10} ></progress> */}
      </div>

    );
}

export default ImageUpload;
