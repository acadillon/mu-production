import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../assets/css/sliders.scss';

const Slider = ({ images }) => {

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={'http://localhost:1337' + image.attributes.url} alt={image.attributes.name} />
        </SwiperSlide>
      ))}
    </Swiper>

  );
  
};

export default Slider;