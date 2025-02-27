import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../write/write.css";
import TopBar from "../../components/topbar/TopBar";
import { useNavigate, useParams } from "react-router";
import EditorProvider, {
  extensions,
  MenuBar,
} from "../../components/ui/Editor";
import TiptapEditor from "../../components/ui/Editor";
import { useUser } from "../../hooks/useUser";
import { Toaster, toast } from "sonner";
const EditPost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { token: tkn, user: userDetails } = useUser();
  console.log(tkn);
  console.log(userDetails);
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef(null);

  const getPost = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts/${post_id}`);
      console.log(res);
      setPost(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageUpload = () => {
    console.log("Do want to upload");
    console.log(imageRef);
    if (imageRef && imageRef.current) {
      imageRef.current.click();
    }
  };

  useEffect(() => {
    setTitle(post?.post_title);
    console.log(post?.post_content)
    setContent(post?.post_content);
    setImageUrl(`${apiUrl}/${post?.image_url}`);
  }, [post]);
  useEffect(() => {
    getPost();
  }, []);
  const imageUpload = (e) => {
    const file = e.target.files[0];
    file && setImage(file);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setImageUrl(imgUrl);
  };

  const apiUrl = import.meta.env.VITE_APIURL;
  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  const headers = {
    authorization: "Bearer " + token,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("post submitted", { title, content });
    try {
      const res = await axios.post(
        `${apiUrl}/posts/create-post`,
        {
          title,
          content,
        },
        { headers }
      );
      console.log(res);
      const post_id = res.data.data.post_id;
      console.log(post_id);

      // Upload Image to the server
      const formData = new FormData();
      formData.append("image", image);
      formData.append("post_id", post_id);
      try {
        const res = await axios.post(`${apiUrl}/uploads/image`, formData);
        console.log(res);
        // alert('Post Created Successfully');
        toast.success("Post Created Successfully");
      } catch (e) {
        console.log(e);
        alert("Error Uploading Image");
        return;
      }

      // e.target.reset();
      // getAllPosts();
      navigate(`/single/${post_id}`);
    } catch (e) {
      console.log(e);
    }
  };

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
            marginLeft: "208px",
            width: "70vw",
            height: "250px",
            borderRadius: "10px",
            objectfit: "cover",
            color: "grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" className="writeImg" />
          ) : (
            <p> Click here to upload images </p>
          )}
          <input type="file" hidden ref={imageRef} onChange={imageUpload} />
        </div>
        <div>
          <input
            type="text"
            className="writeInput"
            placeholder="Title"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <button className="writeSubmit" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </>
  );
};

export default EditPost;
