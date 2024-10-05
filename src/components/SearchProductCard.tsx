import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use this for programmatic navigation
import { Product } from "@/types";

interface SearchProductCardProps {
  product: Product;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {
  const { images, name, originalPrice, salePrice, onSale } = product;
  const [isImageHovered, setIsImageHovered] = useState(false); // Track if the image is being hovered
  const router = useRouter(); // Router for navigation

  // Function to handle navigation to checkout page
  const handleCheckout = () => {
    router.push("/checkout"); // Push to checkout page
  };

  return (
    <div
      onClick={handleCheckout} // Call handleCheckout on click
      className="relative border-2 rounded-lg p-4 sm:p-6 transition-transform duration-700 overflow-hidden group cursor-pointer"
    >
      {/* Sale Badge */}
      {onSale && (
        <span className="absolute top-2 left-2 bg-red-100 z-10 text-red-500 font-light italic px-2 py-1 rounded">
          Sale
        </span>
      )}

      {/* Image with Scale Animation and Hover Image Swap */}
      <div
        className="overflow-hidden rounded-lg relative"
        onMouseEnter={() => setIsImageHovered(true)} // Trigger hover on the image
        onMouseLeave={() => setIsImageHovered(false)} // Reset hover state when mouse leaves the image
      >
        <Image
          src={isImageHovered && images.length > 1 ? images[1] : images[0]} // Swap image on hover
          alt={name}
          width={1000}
          height={1000}
          className="w-full h-36 sm:h-64 object-cover transform transition-transform duration-1000 hover:scale-105"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center break-words">
        {name}
      </h3>

      {/* Pricing Section */}
      <div className="mt-2 text-center">
        {salePrice ? (
          <div className="flex justify-center space-x-2">
            <span className="text-gray-500 line-through">₹{originalPrice}</span>
            <span className="text-red-500 font-bold">₹{salePrice}</span>
          </div>
        ) : (
          <span className="text-gray-500 font-medium">₹{originalPrice}</span>
        )}
      </div>
    </div>
  );
};

export default SearchProductCard;
