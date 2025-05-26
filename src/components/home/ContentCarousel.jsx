import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import required modules
import { Pagination,Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=20")
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Swiper pagination={true} modules={[Pagination,Autoplay]} 
      className="mySwiper h-110 object-cover rounded-md mb-4"
      autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        
        {
            data?.map((item,index)=>
            <SwiperSlide>
                <img src={item.download_url}/>
            </SwiperSlide>
            )
        }
      </Swiper>

      <Swiper 
      navigation={true}
      slidesPerView={5}
      spaceBetween={10}
      pagination={true} modules={[Pagination,Autoplay,Navigation]} 
      className="mySwiper   object-cover rounded-md"
      autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        
        {
            data?.map((item,index)=>
            <SwiperSlide>
                <img src={item.download_url} className=" rounded-md"/>
            </SwiperSlide>
            )
        }
      </Swiper>



    </div>
  );
};

export default ContentCarousel;
