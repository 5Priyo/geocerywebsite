import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import Swiper core and required modules
import { Navigation, Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const Slider= () => {
  return (
    <div>
  <Swiper
  spaceBetween={50}
  modules={[Navigation, Pagination]}
  slidesPerView={1}
  pagination={{ clickable: true }}
>

  <SwiperSlide>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='./banner.jpg' alt='' style={{ width: '100%', height: '90vh', objectFit: 'cover' }} />
            </div>
  </SwiperSlide>
  <SwiperSlide>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='./banner.jpg' alt='' style={{ width: '100%', height: '90vh', objectFit: 'cover' }} />
            </div>
  </SwiperSlide>
  <SwiperSlide>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='./banner.jpg' alt='' style={{ width: '100%', height: '90vh', objectFit: 'cover' }} />
            </div>
  </SwiperSlide>
  <SwiperSlide>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src='./banner.jpg' alt='' style={{ width: '100%', height: '90vh', objectFit: 'cover' }} />
            </div>
  </SwiperSlide>
</Swiper>


  <br/>
   <h2  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:"white",fontFamily:"cursive"}}>Wel Come Our Shop</h2>

  <Swiper
  spaceBetween={50}
  modules={[Navigation, Autoplay]}
  slidesPerView={4}
  navigation
  loop={true}
  autoplay={{ delay: 2000 }}
>


  <SwiperSlide>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src='./p1.png' alt='' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
    </div>

  </SwiperSlide>

  <SwiperSlide>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src='./p2.png' alt='' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
    </div>

  </SwiperSlide>
  
  <SwiperSlide>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src='./p3.png' alt='' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
    </div>
  
  </SwiperSlide>
  
  <SwiperSlide>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src='./p4.png' alt='' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
    </div>
  
  </SwiperSlide>
  <SwiperSlide>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src='./p5.png' alt='' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
    </div>
  
  </SwiperSlide>

  
</Swiper>


  </div>
  );
};

export default Slider;