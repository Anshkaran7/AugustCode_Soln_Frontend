import React, { useState } from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  handleQuickViewClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleQuickViewClick,
}) => {
  const { images, name, originalPrice, salePrice, onSale } = product;
  const [isLiked, setIsLiked] = useState(false); // State for heart button
  const [isImageHovered, setIsImageHovered] = useState(false); // Track if the image is being hovered

  const handleLikeButtonClick = () => {
    setIsLiked(!isLiked); // Toggle like state
  };

  return (
    <div className="relative border-2 rounded-lg p-4 sm:p-6 transition-transform duration-700 overflow-hidden group">
      {/* Sale Badge */}
      {onSale && (
        <span className="absolute top-2 left-2 bg-red-100 z-10 text-red-500 font-light italic px-2 py-1 rounded">
          Sale
        </span>
      )}

      {/* Image with Scale Animation and Hover Image Swap */}
      <div
        className="overflow-hidden rounded-lg relative"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <Image
          src={isImageHovered && images.length > 1 ? images[1] : images[0]} // Swap image on hover
          alt={name}
          width={1000}
          height={1000}
          className="w-full h-36 sm:h-64 object-cover transform transition-transform duration-1000 hover:scale-105"
        />

        {/* Quick View Button */}
        <button
          onClick={() => handleQuickViewClick(product)}
          className="hidden md:flex absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-sm text-gray-900 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:top-1/2 transition-all duration-500 ease-out"
        >
          Quick View
        </button>
      </div>

      {/* Product Name */}
      <h3 className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer hover:font-bold font-medium transition-colors duration-300 hover:text-black/60 text-center break-words">
        {name}
      </h3>

      {/* Pricing */}
      <div className="flex items-center justify-center mt-2 text-xs sm:text-sm md:text-base">
        {salePrice ? (
          <>
            <span className="text-gray-500 line-through mr-2">
              ₹{originalPrice}
            </span>
            <span className="text-red-500 font-bold">₹{salePrice} / Piece</span>
          </>
        ) : (
          <span className="text-gray-500">₹{originalPrice} / Piece</span>
        )}
      </div>

      {/* Quick Add Button and Heart Button */}
      <div className="flex flex-row w-full mt-4 items-center justify-between">
        {/* Link to checkout with product details in the URL query */}
        <Link
          href={{
            pathname: "/checkout",
            query: {
              name,
              originalPrice,
              salePrice,
              quantity: 1, // Default quantity as 1
            },
          }}
          className="w-[70%] bg-black text-xs items-center sm:text-sm md:text-base lg:text-lg text-white hover:border-black font-medium hover:text-black py-2 rounded-full hover:bg-white transition-colors duration-700 border-[1px] border-white text-center"
        >
          Buy now
        </Link>

        {/* Animated Like Button */}
        <button
          className={`${
            isLiked ? "bg-black/20" : "bg-white"
          } text-gray-500 border border-gray-300 rounded-full p-2 shadow transition-colors duration-300`}
          onClick={handleLikeButtonClick}
        >
          <FiHeart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
