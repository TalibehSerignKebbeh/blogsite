import React from 'react';
import './index.css'
import { AxiosInstance,ImageUrl } from '../../api';
import { useState } from 'react';
import axios from 'axios';
const UploadImage = () => {
    const [uploading, setuploading] = useState(false);
    const [file, setfile] = useState(null);
    const [prev, setprev] = useState(null);
    const [files, setFiles] = useState([]);
    const [previews, setpreviews] = useState([]);
    const [uploadedFiles, setuploadedFiles] = useState([]);
   const handleFileChange = (e) => {
  setpreviews([]);

  const selectedFiles = Array.from(e.target.files);
  setFiles(selectedFiles);

  const filePreviews = selectedFiles.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const previewUrl = reader.result;
        resolve(previewUrl);
      };
      reader.onerror = (error) => reject(error);
    });
  });

  Promise.all(filePreviews)
    .then((previews) => setpreviews(previews))
    .catch((error) => console.log(error));
}
    const handleFilter = (index) => {
        const newPreiews = previews?.filter((prev, id) => id !== index)
        // console.log(newPreiews?.length);
        setpreviews(newPreiews)
     }

    const handleSubmit =async (e) => {
        e.preventDefault()
        console.log(files);
        return
       let imageData = new FormData()
        imageData.append('file', file)
        setuploading(true)
            await axios.post(`${ImageUrl}/image-upload`, imageData, {
            headers: {
          'Content-Type': 'multipart/form-data'
                
            }
        })
            .then((res) => {
            console.log(res);
            }).catch((err) => {
            console.log(err);
            }).finally(() => {
            setuploading(false)
        })
    }
    return (
        <div className="container upload-btn-wrapper">
            <form onSubmit={handleSubmit}>

                <label className='image-label' htmlFor='image' >Upload Image</label>
                <input multiple={true} hidden type="file" id='image' name="image" onChange={handleFileChange} />
                <div style={{marginTop:'20px'}}>
                    <button
                        style={{ padding: `10px 14px`, backgroundColor: '#3385ff', color: 'white' }}>
                        {uploading ? 'submitting' : 'Submit'}
                    </button>
                </div>
            </form>
            <div style={{display:'flex', }}>
                {previews?.length? previews?.map((imgsrc, index) => (
                    <div key={index} style={{width:'200px', height:'200px', position:'relative'}}>
                        <img src={imgsrc} width={'100%'} height={'100%'} alt='preview for upload' />
                        <p style={{position:'absolute', top:'2px', right:'2px'}}>
                            <span onClick={e=>handleFilter(index)} style={{color:'red'}}>X</span>
                        </p>
                  </div>
              )) : null}
            </div>
        </div>
    );
}



export default UploadImage;
