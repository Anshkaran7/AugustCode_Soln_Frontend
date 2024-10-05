// components/MobileMenu.tsx
import React from 'react';
import Link from 'next/link';
import { FiHeart, FiUser, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpen, setMenuOpen }) => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/sign-in');
  };

  const handleWishlistClick = () => {
    router.push('/wishlists');
  };

  return (
    <>
      {menuOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "80%" }} // 80% width as required
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col text-base font-medium text-gray-800">
          <Link href="/theme-demo" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Theme Demo <span className="ml-2 bg-blue-100 text-blue-500 px-2 py-1 rounded text-xs">New</span>
          </Link>
          <Link href="/shop" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/product" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Product
          </Link>
          <Link href="/blog" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/pages" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Pages
          </Link>
          <Link href="/new-in" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            New In
          </Link>
          <Link href="/trend" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Trend
          </Link>
          <Link href="/collections" className="py-3 px-4 border-b" onClick={() => setMenuOpen(false)}>
            Collections
          </Link>
        
        </nav>

        {/* User Links */}
        <div className="py-4  flex flex-col">
          <button
            className="py-3 px-4 flex items-center space-x-2 border-b"
            onClick={handleSignInClick}
          >
            <FiUser className="text-lg" />
            <span>Sign In</span>
          </button>
          <button
            className="py-3 px-4 flex items-center space-x-2 border-b"
            onClick={() => router.push("/create-account")}
          >
            <FiUser className="text-lg" />
            <span>Create an Account</span>
          </button>
          <button
            className="py-3 px-4 flex items-center space-x-2 border-b"
            onClick={handleWishlistClick}
          >
            <FiHeart className="text-lg" />
            <span>My Wish List</span>
          </button>
        </div>

    
      </div>
    </>
  );
};

export default MobileMenu;
