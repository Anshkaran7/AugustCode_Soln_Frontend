import React, { useState, useEffect, useRef, useMemo } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiHeart, FiX } from "react-icons/fi";
import Image from "next/image";
import TopAnnouncementBar from "./TopAnnouncementBar";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { Product } from "@/types";
import BottomTab from "./BottomTab";
import Link from "next/link";
import QuickAddModal from "../Modal/QuickAddModal";
import ProductData from "@/json/ProductData";
import SearchProductCard from "../SearchProductCard";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchOpen1, setSearchOpen1] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Memoize product data to prevent unnecessary recalculations
  const products = useMemo(() => ProductData(), []);

  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Update scroll state
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsScrolled(true);
        setScrollDirection(currentScrollY < lastScrollY ? "up" : "down");
      } else {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search query change
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  // Handle Quick Add button click
  const handleQuickAddClick = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickAddModalOpen(true);
  };

  // Close search box on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <header className="w-full fixed top-0 left-0 z-40">
      <div
        className={`transform transition-transform bg-white duration-500 ease-in-out ${
          isScrolled && scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Top Announcement Bar */}
        <TopAnnouncementBar />
        <div className="container mx-auto px-4 lg:flex lg:items-center lg:justify-between py-3 hidden">
          {/* Logo */}
          <Link href="/" className="flex flex-row gap-x-4 items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="object-cover w-16 h-16"
            />
            <h1 className="text-black">E-Com</h1>
          </Link>

          {/* Search Bar */}
          <div className="relative w-[40%] hidden lg:flex items-center" ref={searchRef}>
            <input
              type="text"
              placeholder="Search the store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen1(true)} // Open the search when input is focused
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
           {
            searchOpen ?
            <button title="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
            <FiX size={20} />
          </button>
            : (
              <button title="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
              <FiSearch size={20} />
            </button>
            )
           }
            {searchOpen1 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg border mt-2 p-4 z-40">
                <div className="mb-4">
                  <h2 className="text-sm font-bold mb-2">TRENDING NOW</h2>
                  <div className="flex gap-2 flex-wrap">
                    {["dempus", "sample", "magnus"].map((trend, index) => (
                      <button
                        key={index}
                        className="bg-gray-100 px-4 py-2 rounded-full text-xs"
                        onClick={() => setSearchQuery(trend)}
                      >
                        <FiSearch className="inline mr-2" />
                        {trend}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-bold mb-2">PRODUCTS</h2>
                  <div className="overflow-x-scroll px-2">
                    <div className="flex space-x-4" style={{ minWidth: "200%" }}>
                      {filteredProducts.map((product, index) => (
                        <div key={index} className="w-1/3">
                          <SearchProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User and Cart Icons */}
          <div className="lg:flex items-center space-x-8 text-black mr-10">
            <Link href="/wishlists" className="flex flex-col items-center">
              <FiHeart size={20} />
              <span className="text-xs">Wish Lists</span>
            </Link>
            <Link href="/sign-in" className="flex flex-col items-center">
              <FiUser size={20} />
              <span className="text-xs">Sign In</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center relative">
              <FiShoppingCart size={20} />
              <span className="text-xs">Cart</span>
              <div className="absolute -top-3 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden bg-white py-3 w-full shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu size={24} />
            </button>
            <button onClick={() => setSearchOpen(true)} className="text-black">
              <FiSearch size={24} />
            </button>
            <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-14 object-contain" />
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <FiUser size={24} />
              </Link>
              <Link href="/cart">
                <FiShoppingCart size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Search Overlay */}
      <SearchBar products={products} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

      {/* Bottom Tab (for mobile) */}
      <BottomTab setSearchOpen={setSearchOpen} />

      {/* Quick Add Modal */}
      {selectedProduct && (
        <QuickAddModal
          isOpen={isQuickAddModalOpen}
          onClose={() => setIsQuickAddModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </header>
  );
};

export default Navbar;
