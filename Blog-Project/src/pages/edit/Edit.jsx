import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../write/write.css";
import TopBar from "../../components/topbar/TopBar";
import { useNavigate, useParams } from "react-router";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useUser } from "../../hooks/useUser";
import { Toaster, toast } from "sonner";

const Edit = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { token: tkn, user: userDetails } = useUser();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef(null);
  const apiUrl = import.meta.env.VITE_APIURL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const headers = { authorization: "Bearer " + token };

  const getPost = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts/${post_id}`);
      setPost(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = () => {
    if (imageRef && imageRef.current) {
      imageRef.current.click();
    }
  };

  useEffect(() => {
    setTitle(post?.post_title);
    setContent(post?.post_content);
    setEditorState(EditorState.createWithContent(post?.post_content || EditorState.createEmpty()));
    setImageUrl(`${apiUrl}/${post?.image_url}`);
  }, [post]);

  useEffect(() => {
    getPost();
  }, []);

  const imageUpload = (e) => {
    const file = e.target.files[0];
    file && setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/posts/create-post`,
        { title, content },
        { headers }
      );
      const post_id = res.data.data.post_id;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("post_id", post_id);
      try {
        await axios.post(`${apiUrl}/uploads/image`, formData);
        toast.success("Post Created Successfully");
      } catch (e) {
        alert("Error Uploading Image");
        return;
      }
      navigate(`/single/${post_id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TopBar />
      <div className="write">
        <div onClick={handleImageUpload} className="image-upload-container">
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
        </div>
        <div className="editor-container">
          <Editor 
            editorState={editorState} 
            onChange={setEditorState} 
            handleKeyCommand={(command, editorState) => {
              const newState = RichUtils.handleKeyCommand(editorState, command);
              if (newState) {
                setEditorState(newState);
                return "handled";
              }
              return "not-handled";
            }}
          />
        </div>
        <button className="writeSubmit" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </>
  );
};

export default Edit;
