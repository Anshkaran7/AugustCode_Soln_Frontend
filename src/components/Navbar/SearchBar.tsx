import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import ProductCard from '../ProductCard';
import QuickAddModal from '../Modal/QuickAddModal'; // Import Quick Add Modal
import SearchProductCard from '../SearchProductCard';

interface SearchBarProps {
  products: Product[];
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ products, searchOpen, setSearchOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State to store filtered products

  const router = useRouter();

  // Dynamic trending keywords
  const trendingKeywords = ['dempus', 'sample', 'magnus', 'lorem', 'ipsum'];

  // Use the passed products from props
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If no search, show all products
    }
  }, [searchQuery, products]);

  // Handle search input and routing
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  // Handle trending keyword click
  const handleTrendingClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  // Function to clear the search input
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      {searchOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setSearchOpen(false)} // Close menu when clicking outside
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform transform duration-500 ease-in-out ${
          searchOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '80%' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-bold">Search</span>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-2xl text-gray-600"
          >
            <FiX />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="flex items-center border rounded-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 text-white"
                title="Clear"
              >
                <FiX size={20} />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-white"
                title="Search"
              >
                <FiSearch size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Trending Section */}
        <div className="px-4 py-3">
          <h2 className="text-sm font-bold mb-2">TRENDING NOW</h2>
          <div className="flex gap-2 flex-wrap">
            {trendingKeywords.map((keyword, index) => (
              <button
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-full text-xs"
                onClick={() => handleTrendingClick(keyword)}
              >
                <FiSearch className="inline mr-2" />
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Products */}
        <div className="px-4 py-3 border-t">
          <h2 className="text-sm font-bold mb-2">PRODUCTS</h2>
          <div className="overflow-x-scroll px-2">
            <div className="flex space-x-4" style={{ minWidth: '200%' }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div key={index} className="w-1/3">
                   <SearchProductCard
                            product={product}
                           
                          />
                          </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default SearchBar;
