import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./carousel.css";
import axios from "axios";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router";
import 'swiper/css/pagination'
import 'swiper/css/autoplay'


const Carousel = () => {
  const { token: tkn, user: userDetails } = useUser();
  console.log(tkn);
  console.log(userDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (!tkn) {
      navigate("/");
    }
  }, [tkn, navigate]);

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState();

  const apiUrl = import.meta.env.VITE_APIURL;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      console.log(res);
      setPosts(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(posts.length)

  return (
    <>
      
        <div > 
          <Swiper
          // centeredSliders={true}
          slidesPerView={'auto'}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true} 
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
      >
        {posts?.map((post, index) => (
        <SwiperSlide  key={index}>

        
          
          <img src={`${apiUrl}/${post?.image_url}`} alt="Slide 1" />
          <div className="overlay"></div>
           <div className="content"> 
           <h5>{post?.post_content.slice(0, 100)}...</h5>
           <h2>{post?.post_title}</h2>
           <button onClick={() => navigate(`/single/${post?.post_id}`)} className="cta">Discover Now</button>
         </div> 
        </SwiperSlide>
        ))} 
        {/* <SwiperSlide >Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide> */}
      </Swiper>
        </div>
      
    </>
  );
};

export default Carousel;
