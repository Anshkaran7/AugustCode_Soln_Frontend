'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const originalPrice = searchParams.get('originalPrice');
  const salePrice = searchParams.get('salePrice');
  const initialQuantity = searchParams.get('quantity');

  const [quantity, setQuantity] = useState(Number(initialQuantity) || 1);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false); // Track if Razorpay is ready

  // Generate a unique order ID
  const generateOrderId = () => {
    return `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const [orderId] = useState(generateOrderId()); // Store the generated order ID

  // Handle quantity changes
  const handleQuantityChange = (type: string) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  };

  // Calculate the total price
  const totalPrice = (Number(salePrice || originalPrice) * quantity).toFixed(2);

  // Load Razorpay SDK dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      setIsRazorpayReady(true); // Set state when Razorpay is ready
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
    };
    document.body.appendChild(script);
  }, []);

  // Razorpay Payment Integration
  const handleRazorpayPayment = async () => {
    if (!isRazorpayReady) {
      alert('Razorpay SDK is still loading. Please wait...');
      return;
    }

    const options = {
      key: 'rzp_test_EkdZaedpnLu4rz', // Enter your Razorpay key here
      amount: Number(totalPrice) * 100, // Razorpay amount is in paise (multiply by 100)
      currency: 'INR',
      name: 'Your Store',
      description: `Order ID: ${orderId}`, // Add the order ID here
      image: '/your-logo.png', // Your logo URL here
      order_id: "", // Include the generated order ID in the options
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${orderId}`); // Display the order ID
      },
      prefill: {
        name: 'Your Name',
        email: 'your-email@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-medium font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Product Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Your Cart</h2>

            <div className="flex flex-col md:flex-row items-start border-b pb-6 mb-6">
              {/* Product Image */}
              <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                <Image
                  src={`/products/speaker.jpg`}
                  alt="Product"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-2/3 pl-0 md:pl-6">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">Product Description / Black</p>

                {/* Price and Quantity */}
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-800">
                    ₹{salePrice || originalPrice}
                  </span>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-t border-b py-2"
                    />
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-4 text-xl font-bold text-gray-800">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:sticky top-10">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Subtotal</span>
              <span className="text-sm font-bold text-gray-800">₹{totalPrice}</span>
            </div>

            {/* Shipping Estimate */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Get Shipping Estimate
              </label>
              <select className="w-full border p-3 rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-300">
                <option>India</option>
                <option>United States</option>
                <option>Canada</option>
              </select>
              <select className="w-full border p-3 rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-300">
                <option>California</option>
                <option>New York</option>
                <option>Mumbai</option>
              </select>
              <input
                type="text"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Postal Code"
              />
            </div>

            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md mb-6 hover:bg-blue-700 transition duration-300">
              Calculate Shipping
            </button>

            {/* Coupon Code Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Coupon Code</label>
              <input
                type="text"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter Coupon Code"
              />
            </div>

            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="text-sm font-bold text-gray-800">TOTAL:</span>
              <span className="text-sm font-bold text-gray-800">₹{totalPrice}</span>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-700">
                I agree with{" "}
                <Link href="/terms" className="text-blue-500">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={handleRazorpayPayment}
              className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md hover:bg-yellow-600 transition duration-300"
            >
              Proceed to Checkout
            </button>

            {/* Display Order ID */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">Order ID: <strong>{orderId}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
