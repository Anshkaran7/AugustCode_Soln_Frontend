import { useState } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaMinus,
} from "react-icons/fa";

export default function Footer() {
  // State to manage the open sections in the accordion
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 md:py-12 mt-12">
      <div className="container mx-auto max-w-[1200px] md:px-12 px-5">
        {/* Accordion for mobile */}
        <div className="md:hidden">
          {/* Shop Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("shop")}
              className="flex justify-between items-center text-black w-full text-left font-bold text-lg py-2 border-b border-gray-300"
            >
              <span>SHOP</span>
              {openSection === "shop" ? (
                <FaMinus size={20} />
              ) : (
                <FaPlus size={20} />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openSection === "shop" ? "max-h-96" : "max-h-0"
              }`}
            >
              <ul className="mt-2 space-y-2">
                {[
                 "Speakers",
                 "Headphones",
                 "Mic",
                 "Earbuds",
                 "Earphones"
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-black transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Further Info Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection("info")}
              className="flex justify-between items-center w-full text-left font-bold text-lg py-2 border-b border-gray-300"
            >
              <span>FURTHER INFO.</span>
              {openSection === "info" ? (
                <FaMinus size={20} />
              ) : (
                <FaPlus size={20} />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openSection === "info" ? "max-h-96" : "max-h-0"
              }`}
            >
              <ul className="mt-2 space-y-2">
                {[
                  "About Us",
                  "Contact Us",
                  "Shipping & Return",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-black transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-4 lg:mb-0 space-y-2">
            <p>
            <strong>Address:</strong> Vadodara, Gujarat, 390025

            </p>
            <p>
              <strong>Phone:</strong> +91 776600XXXX
            </p>
            <p>
              <strong>Email:</strong> team@ecom.in
            </p>
          </div>
        </div>

        {/* Regular grid layout for desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Shop Column */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">SHOP</h3>
            <ul className="space-y-2">
              {[
               "Speakers",
               "Headphones",
               "Mic",
               "Earbuds",
               "Earphones"
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-black transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Further Info Column */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">
              FURTHER INFO.
            </h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Contact Us",
                "Shipping & Return",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-black transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 lg:mb-0 space-y-2 col-span-2">
            <p>
              <strong>Address:</strong> Vadodara, Gujarat, 390025
            </p>
            <p>
              <strong>Phone:</strong> +91 776600XXXX
            </p>
            <p>
              <strong>Email:</strong> team@ecom.in
            </p>
          </div>
        </div>

        {/* Copyright and Payment Methods */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center border-t border-gray-300 pt-8">
          <p className="text-sm text-gray-600">
            &copy; 2024, E-Com. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
