import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function Hero() {
  return (
    <div className="relative w-full h-[30vh] pt-10 md:h-[70vh] lg:h-[90vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            {/* Main Image */}
            <Image
              src="/main.jpg"
              alt="Main Image 1"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority={true}
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Overlay Layer */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Welcome to Our Shop
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Discover the best products at unbeatable prices.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Additional slides can be added here */}

      </Swiper>
    </div>
  );
}

export default Hero;
