import { Button, Space, Typography, message } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useRef } from 'react';
const ImageSrcText = ({ text }) => {
    const textRef = useRef(null)
    const handleCopyClick = () => {
    const text = textRef.current.innerText;
        navigator.clipboard.writeText(text);
        message.success("copied to clipboard")
    };
    const btn = (
 <button style={{ marginLeft: '5px', padding: '3px ' }} onClick={handleCopyClick}>
                <FontAwesomeIcon icon={faCopy} color='#3339'/>
            </button>
    )
    return (
        <Button onClick={handleCopyClick}
            style={{
            textAlign: 'center', width: 'auto',padding:'2px 4px',
        backgroundColor:'lightgray', color:'white', cursor:'pointer'}}>
            <Typography.Text ref={textRef}
                style={{ color: 'white' }}>
                {/* {text} */}
                copy
            </Typography.Text>
        </Button>
    );
}

export default ImageSrcText;
