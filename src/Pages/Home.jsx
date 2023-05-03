import { useEffect, useState } from 'react';
import CustomEditor from '../components/Editor/CustomEditor';
import Preview from '../components/Preview';
Preview
const Home = () => {

    const [data, setData] = useState({
    title: "",
    tags: [],
    date: new Date().toLocaleDateString(),
  })

  const [content , setContent] = useState({
    content: "",
  })

  const [preview, setPreview] = useState(false)
    return (
        <div>
            <CustomEditor setData={setData} data={data} setContent={setContent} setPreview={setPreview} preview={preview}/>
      {preview && <Preview data={data} content={content}/>}
 
        </div>
    );
}

export default Home;
