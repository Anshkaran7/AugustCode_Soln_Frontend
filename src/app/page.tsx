"use client";

import Product from "@/components/screens/Product";
import Hero from "@/components/screens/Hero";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/screens/Video";
import PromoBanner from "@/components/PromoCode";
import CategorySlider from "@/components/Category";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen text-[#2a4494] bg-white overflow-hidden font-[family-name:var(--font-montserrat-regular)]">
      {/* Navbar Component */}
      <Navbar />

      <div className="pt-24">
        <Hero />
      </div>

      <div className="max-w-[1200px] px-3 md:px-0 mx-auto flex flex-col space-y-12">

        {/* <PromoBanner /> */}
        <div>
          <CategorySlider />
        </div>
        {/* Product Section */}
        <Product />
      </div>

      <Footer />
     
    </div>
  );
}
