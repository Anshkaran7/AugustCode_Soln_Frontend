import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: "Headphone", image: '/products/headphone.jpg' },
  { name: "Speaker", image: '/products/speaker.jpg' },
  { name: "Earphone", image: '/products/earphone.jpg' },
  { name: "Earbuds", image: '/products/earbuds.jpg' },
  { name: "Mic", image: '/products/mic.jpg' },
];

const CategorySlider = () => {
  return (
    <div className="mx-auto mt-20 bg-white py-8 px-4 rounded-lg shadow-lg max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-3xl font-bold text-gray-800">Shop By Categories</h2>
        <Link href="/all-categories" className="text-sm md:text-md text-blue-600 hover:text-blue-800 font-medium underline">
            View all
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        className="category-slider"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-md border border-gray-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={112}
                  height={112}
                  objectFit="contain"
                  className="transition-transform transform hover:scale-110"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-800">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
