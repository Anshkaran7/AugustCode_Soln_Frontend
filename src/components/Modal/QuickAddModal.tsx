import { Product } from '@/types';
import React, { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up when modal is closed or component is unmounted
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Handle image navigation in the carousel
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]">
      {/* Modal Overlay: Click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg relative w-full max-w-lg md:max-w-4xl mx-auto max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button className="absolute top-0 right-0 bg-black text-white p-2 rounded-bl-xl rounded-tr-lg z-50 " onClick={onClose}>
          <FiX size={24} />
        </button>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Product Image Carousel */}
          <div className="flex flex-col w-full md:w-1/2 items-center relative">
            {/* Main Product Image */}
            <div className="w-full">
              <img
                src={product.images[currentImageIndex]} // Display the current image based on index
                alt={product.name}
                className="rounded-lg w-full h-48 sm:h-64 md:h-72 object-cover"
              />
            </div>

            {/* Carousel Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-600 p-2 rounded-full hover:bg-gray-400"
            >
              <FiChevronLeft size={24} />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-600 p-2 rounded-full hover:bg-gray-400"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Image Indicator Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setCurrentImageIndex(index)} // Change image on dot click
                ></span>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{product.name}</h2>
            <div className="flex items-center mb-2">
              {product.onSale ? (
                <>
                  <span className="line-through text-gray-500 text-sm sm:text-base mr-2">₹{product.originalPrice}</span>
                  <span className="text-red-500 text-lg sm:text-xl font-bold">₹{product.salePrice}</span>
                </>
              ) : (
                <span className="text-gray-500 text-lg sm:text-xl font-bold">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <span className="mr-4 text-xs sm:text-sm">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-2 py-1 text-lg sm:text-xl" onClick={handleDecreaseQuantity}>
                  −
                </button>
                <span className="px-4 py-1 text-sm sm:text-base">{quantity}</span>
                <button className="px-2 py-1 text-lg sm:text-xl" onClick={handleIncreaseQuantity}>
                  +
                </button>
              </div>
            </div>

            <p className="mb-4 text-sm sm:text-base">
              Subtotal: ₹
              {(
                (Number(product.salePrice) > 0 ? Number(product.salePrice) : Number(product.originalPrice)) * quantity
              ).toFixed(2)}
            </p>

            <div className="flex md:flex-col gap-y-3 flex-row items-center gap-x-4">
              {/* Add To Cart Button */}
              <button className="bg-black text-white w-full py-2 sm:py-3 rounded-full">Add To Cart</button>

              {/* View Full Details Button */}
              <button className="bg-gray-300 text-black w-full py-2 sm:py-3 rounded-full border border-white">
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
