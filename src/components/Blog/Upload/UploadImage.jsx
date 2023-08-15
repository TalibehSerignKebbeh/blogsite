import { Button, Progress, Space, Typography, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AxiosInstance, ImageUrl } from '../../../api';
import ImageSrcText from './ImageSrcText';
import { GetError } from '../../Config';
import './index.css'
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import  RemoveIcon  from '@mui/icons-material/RemoveDoneRounded';

const UploadImage = () => {
    const [files, setfiles] = useState({});
    const [imgFile, setImgfile] = useState({ progress: 0, imgSrc: ``, name: `` });
    const [uploading, setUploading] = useState(false);
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const UpdatesFiles = (newFiles) => {
        setfiles(newFiles)
        localStorage.setItem('files', JSON.stringify(newFiles))
    }
    const handleUpload = async ({ file }) => {
        // setfiles(prev => {
        //     return {...prev, [file.uid]:file}
        // })
        setImgfile({ progress: 0, imgSrc: ``, name: `` })
        const fileFormData = new FormData()
        fileFormData.append('file', file)
        setUploading(true)
        await AxiosInstance.post(`${ImageUrl}/image-upload`, fileFormData, {
            onUploadProgress: (e) => {
                console.log(e);
                setImgfile({ ...imgFile, name: file?.name, progress: 100 * e.progress })
            }
        })
            .then((res) => {
                console.log(res);
                // setImgfile({ ...imgFile, name: res?.data?.filename, imgSrc: `${ImageUrl}/${res?.data?.filename}` })
                const newFile = { ...imgFile, name: res?.data?.filename, imgSrc: `${ImageUrl}/${res?.data?.filename}` }
                setfiles(prev => {
                    return { ...prev, [file.uid]: newFile }
                })
                localStorage.setItem('files', JSON.stringify({ ...files, [file.uid]: newFile }))
                // setfiles({...files, ({..imageUrl, name: file?.name, progress: 100 * e.progress})})

            })
            .catch((err) => {
                console.log(err);
                message(GetError(err))
            }).finally(() => {
                setUploading(false)
            })
    }

    const handleRemoveImage = (file) => {

        const filteredFiles = Object?.entries(files)?.filter((array) => {
            if (file?.name !== array[1]?.name) return {[array[0]]: array[1]};
        })
        // setfiles(Object?.fromEntries(filteredFiles));
        UpdatesFiles(Object?.fromEntries(filteredFiles))
    }
    useEffect(() => {
        localStorage.removeItem('files')
        if ((!localStorage.getItem('files') === null) || (!localStorage.getItem('files') === undefined) ) {

            if (Object?.values(JSON?.parse(localStorage?.getItem('files')))?.length) {
                setfiles(JSON?.parse(localStorage?.getItem('files')))
            }
        }
        return () => {

        };
    }, []);
    return (
        <Space direction='vertical' style={{ width: '100%',overflowX:'hidden', padding: '5px 10px' }}>

            <Upload showUploadList={false}
                disabled={uploading}
                customRequest={handleUpload}
                beforeUpload={beforeUpload}
                style={{
                        padding: '10px 16px 10px 16px',
                        paddingBottom:'20px'
                    }}
            >
                <Button
                    >
                    <span
                    style={{color: '#333',}}>Upload Image</span> 
                </Button>
            </Upload>
            <Space direction='vertical' style={{ width: '100%' }}>
                {uploading &&
                    <Progress trailColor='#f2f2f2'
                        type='line'
                        percent={imgFile?.progress}
                        strokeColor={{ from: '#108ee9', to: '#87d068' }}
                        strokeWidth={8}
                        format={(percent) => percent && `${parseFloat(percent.toFixed(2))}%`}

                    />}
                {imgFile?.imgSrc &&
                    <img src={imgFile?.imgSrc} width={'100px'} height={'100px'} />}
            </Space>
            <div style={{
                width: '100%', overflowX: 'scroll',
                overflowY: 'auto', maxHeight: '400px',
                display:'flex', flexDirection:'row', flexWrap:'wrap', gap:'10px'
            }}>
            {Object?.values(files)?.map((file, index) => (
                <div className='picture_card'
                    // style={{ backgroundColor: '', border: '1px solid #333', padding: '3px' }}
                    key={index}>
                        <ImageSrcText text={file?.imgSrc} />
                        <img id='uploaded-image' src={file?.imgSrc} />
                        <Button className='remove_btn' size='small' 
                           onClick={e => handleRemoveImage(file)}
                    >
                        <RemoveIcon />
                        </Button>
                    </div>
            ))}
                </div>
        </Space>

    );
}

export default UploadImage;


// import { PlusOutlined } from '@ant-design/icons';
// import { Upload, message } from 'antd';
// import { useState } from 'react';
// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };
// export const MyCustom = () => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState();
//   const handleChange = (info) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };
//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );
//   return (
//     <>
//       <Upload
//         name="avatar"
//         listType="picture-card"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt="avatar"
//             style={{
//               width: '100%',
//             }}
//           />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//       <Upload
//         name="avatar"
//         listType="picture-circle"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt="avatar"
//             style={{
//               width: '100%',
//             }}
//           />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//     </>
//   );
// };

