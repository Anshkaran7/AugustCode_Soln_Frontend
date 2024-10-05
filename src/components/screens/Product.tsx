"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter to programmatically navigate
import ProductCard from "../ProductCard";
import QuickAddModal from "../Modal/QuickAddModal"; // Import Quick Add Modal
import type { Product } from "@/types";
import ProductData from "@/json/ProductData";

export default function Product() {
  const router = useRouter();
  const products = ProductData(); 


  // State to show only first 12 products initially
  const [visibleProducts, setVisibleProducts] = useState(12);

  // State to manage modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);


  // Handle Quick View button click
  const handleQuickViewClick = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickAddModalOpen(true);
  };

  // Handle see more click
  const handleSeeMoreClick = () => {
    setVisibleProducts((prev) => prev + 12); // Show 12 more products on each click
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-sm md:text-2xl font-bold mb-6">Our products</h2>

      {/* Responsive Grid Layout: 2 columns for mobile, 3 for tablets, 4 for desktops */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 w-full justify-center">
        {products.slice(0, visibleProducts).map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            handleQuickViewClick={handleQuickViewClick}
          />
        ))}
      </div>

      {/* See More Button */}
      {visibleProducts < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMoreClick}
            className="bg-white text-white px-6 py-3 rounded-lg hover:bg-white/80 text-xs font-medium transition-colors duration-300"
          >
            See More
          </button>
        </div>
      )}

    
      {/* Quick Add Modal */}
      {selectedProduct && (
        <QuickAddModal
          isOpen={isQuickAddModalOpen}
          onClose={() => setIsQuickAddModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
