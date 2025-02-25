import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./write.css";
import TopBar from "../../components/topbar/TopBar";
import { useNavigate } from "react-router";
import EditorProvider, {  extensions, MenuBar } from "../../components/ui/Editor";
import TiptapEditor from "../../components/ui/Editor";
import { useUser } from "../../hooks/useUser";
import { Toaster, toast } from 'sonner';
const Write = () => {
  const [content, setContent] = useState(null)
  const [title, setTitle] = useState("")
  const { token: tkn, user: userDetails } = useUser()
  console.log(tkn);
  console.log(userDetails);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!tkn) {
  //     navigate('/');
  //   }
  // }, [tkn, navigate]);

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef(null)

  const handleImageUpload = () => {
    console.log('Do want to upload');
    console.log(imageRef);
    if (imageRef && imageRef.current) {
      imageRef.current.click();
    };
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    file && setImage(file);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setImageUrl(imgUrl);
  };

  const apiUrl = import.meta.env.VITE_APIURL;
  const user = JSON.parse(localStorage.getItem('user'));

  const token = localStorage.getItem('token');

  const headers = {
    authorization: 'Bearer ' + token,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('post submitted', {title, content})
    try {
      const res = await axios.post(
        `${apiUrl}/posts/create-post`,
        {
          title ,
          content
        },
        { headers }
      );
      console.log(res);
      const post_id = res.data.data.post_id;
      console.log(post_id);

      // Upload Image to the server
      const formData = new FormData();
      formData.append("image", image);
      formData.append('post_id', post_id);
      try{
        const res = await axios.post(`${apiUrl}/uploads/image`, formData);
        console.log(res);
        alert('Post Created Successfully');
      } catch (e) {
        console.log(e);
        alert('Error Uploading Image');
        return;
      }

      e.target.reset();
      getAllPosts();
    } catch (e) {
      console.log(e);
    };
  }




  return (
    <>
      <TopBar />
      {/* <TiptapEditor /> */}
      <div className="write">
      {/* <button className="writeSubmit" onClick={()=>console.log(content)}>Publish</button> */}
       <div 
       onClick={handleImageUpload}
       style={{
        backgroundColor: "white",
        marginLeft: '208px',
        width: '70vw',
        height: '250px',
        borderRadius: '10px',
        objectfit: 'cover',
        color: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
       
       >
       { imageUrl ? (
        <img 
        src={imageUrl}
        alt=""
        className="writeImg"
      />
       ) : (
        <p> Click here to upload images </p>
       )}
        <input type="file" hidden ref={imageRef} onChange={imageUpload}/>
       </div>
       <div>
       <input
              type="text"
              className="writeInput"
              placeholder="Title"
              autoFocus={true}
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            {}
       </div>
     {/* Editor */}
     <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        setContent={setContent}
      />
      <button className="writeSubmit" onClick={()=>toast(handleSubmit, navigate('/single/:post_id'))}>Publish</button>
        <form className="writeForm" style={{display:'none'}}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "" }} />
            <input
              type="text"
              className="writeInput"
              placeholder="Title"
              autoFocus={true}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Write your blog post here..."
              type="text"
            ></textarea>
          </div>
          <button className="">Publish</button>
        </form>
      </div>
    </>
  );
};

export default Write;
