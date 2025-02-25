import axios from "axios";
import React from "react";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TiptapEditor from "../../components/ui/Editor";

const SinglePost = ({post_id}) => {
  const [post, setPost] = useState(null);
  const apiUrl = import.meta.env.VITE_APIURL;
  console.log(post_id)

  useEffect(() => {
    if (post_id) getPost();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [post_id]); 

  const getPost = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts/${post_id}`);
      console.log(res);
      setPost(res.data.data);
    } catch (e) {
      console.log(e);
    }
  
};
return (
  <div className="singlePost">
    <div style={{display:'', backgroundColor: ''}} className="SinglePostWrapper">
      <img
        src={`${apiUrl}/${post?.image_url}`} 
        alt=""
        className="singlePostImg"
      />
      <h1 className="singlePostTitle">{post?.post_title}</h1>
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          {" "}
          Author: <b>{post?.author}</b>
        </span>
        <span className="singlePostDate">
          1 hour ago<b></b>
        </span>
      </div>
      <p className="singlePostDesc">
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        tenetur? Eos quas, omnis adipisci voluptates eius nostrum esse,
        laborum at quibusdam iusto voluptatum! Harum quia autem adipisci?
        Itaque repellendus tempora voluptatibus voluptas iusto maiores natus
        modi? Nam, cum necessitatibus? Hic aspernatur ipsa numquam odio atque
        consectetur ex, porro ducimus sunt reprehenderit pariatur, quo
        veritatis nulla, quis dolorum accusamus id excepturi. Atque, quasi ea?
        Repellat voluptatum reprehenderit modi! Doloribus, labore velit?
        Laudantium, quas. Omnis unde rem illo minus ad veniam velit maxime
        officiis dicta alias, cupiditate voluptates saepe laboriosam magni
        consectetur, nulla error. Autem deleniti sequi commodi cum, atque
        adipisci animi minima. Repudiandae vero, ea corporis quo similique
        inventore, vel aperiam dicta maiores iusto sapiente molestias
        perspiciatis animi aspernatur optio magnam. Id minima commodi optio,
        fugit, adipisci voluptatum aut eaque at magni nostrum modi doloribus
        nulla dignissimos explicabo, nobis ratione distinctio minus velit
        placeat ipsam eum beatae? Sunt quo aliquam, provident iste repellat ab
        deleniti officiis tempore minima temporibus vel modi quasi natus
        eligendi quod molestias nam totam alias quae. Ipsam ab vero eos, eaque
        odit reiciendis nisi consequuntur veritatis ipsa voluptas quidem,
        placeat corrupti esse animi ea corporis natus, omnis quos. Aliquid
        officia et sint laudantium quas tempora rerum perspiciatis?
        Cupiditate, reiciendis ducimus voluptatibus eveniet neque repellat
        excepturi velit dignissimos rerum ratione error ea voluptatum.
        Excepturi amet ea soluta, culpa aspernatur facere, inventore quis ad
        dolorum sequi non, quos eveniet eligendi. Doloremque quas laboriosam
        a. Modi ipsam distinctio hic a illo, exercitationem excepturi quae
        nostrum. Placeat doloribus nulla eaque cum sapiente officia voluptatem
        delectus at, quae, hic distinctio. Fugit dolor reiciendis nihil
        voluptatibus, sapiente sed harum totam nisi assumenda accusantium
        consequuntur nulla aliquid facilis! Alias, expedita beatae. Vel
        ducimus corporis nihil iure dignissimos rem magnam numquam tempore!
        Eaque ipsam assumenda rerum adipisci beatae consequatur deserunt
        nesciunt quia asperiores necessitatibus porro quidem, fugit, neque
        quos praesentium, perferendis vitae illo atque aliquam distinctio.
        Labore cupiditate sint id dolores eaque quisquam tempore reiciendis
        maiores inventore facilis. Aut velit, neque dignissimos laudantium
        corrupti ipsum tempore perspiciatis ab? A necessitatibus ex corrupti
        assumenda suscipit magni commodi ea enim sunt amet. Iste, nulla? Dicta
        dolore ratione quae, perspiciatis vitae ex labore officiis repellendus
        unde dolorem fuga, eius qui aperiam provident dignissimos blanditiis
        saepe aspernatur dolorum corporis doloribus quod iure quia magnam.
        Tenetur quos exercitationem in impedit dolorem voluptas alias ratione,
        cupiditate doloremque quidem nobis saepe quibusdam, vel id nesciunt
        inventore modi. Similique odit aliquid, autem mollitia possimus ea
        unde quisquam architecto alias sed a neque eum impedit. Enim odit
        eaque incidunt maiores ipsum distinctio earum voluptas dolore facilis!
        Doloremque, laboriosam! Sequi deserunt commodi harum dignissimos in
        expedita natus illo laboriosam dolore quos, aliquam dicta mollitia
        reiciendis error, est debitis vel cum! Aperiam eaque animi, ratione
        laborum laboriosam eos neque eum. Fugiat deleniti, voluptates
        reiciendis qui numquam ex repudiandae aliquam assumenda laborum
        repellat autem odio aspernatur, sapiente maxime libero ducimus
        suscipit rerum in deserunt esse a. Voluptas velit quaerat veritatis,
        suscipit cum illum aliquid a voluptatum, deserunt reiciendis ea
        accusamus consequuntur totam? Deserunt exercitationem cupiditate
        tempora facere? */}{post?.post_content}
      </p>
    </div>
  </div>
  

);
};

export default SinglePost;
