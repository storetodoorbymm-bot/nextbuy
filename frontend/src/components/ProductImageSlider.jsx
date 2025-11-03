import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductImageSlider = ({ images }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="rounded-2xl w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
