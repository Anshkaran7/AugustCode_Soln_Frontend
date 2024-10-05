import Link from 'next/link'
import React from 'react'
import { FiGrid, FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'

interface BottomTabProps {
    setSearchOpen: (open: boolean) => void;
}

function BottomTab({
    setSearchOpen
}: BottomTabProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
    <div className="md:hidden flex justify-around items-center py-2">
      <Link href="/" className="flex flex-col items-center">
        <FiHome size={24} />
        <span className="text-xs">Home</span>
      </Link>

      <button
        onClick={() => setSearchOpen(true)}
        className="flex flex-col items-center"
      >
        <FiSearch size={24} />
        <span className="text-xs">Search</span>
      </button>

      <Link href="/collection" className="flex flex-col items-center">
        <FiGrid size={24} />
        <span className="text-xs">Collection</span>
      </Link>

      <Link href="/account" className="flex flex-col items-center">
        <FiUser size={24} />
        <span className="text-xs">Account</span>
      </Link>

      <Link href="/cart" className="flex flex-col items-center relative">
        <FiShoppingCart size={24} />
        <div className="absolute -top-2 -right-3 bg-white text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          0
        </div>
        <span className="text-xs">Cart</span>
      </Link>
    </div>
  </nav>
  )
}

export default BottomTab