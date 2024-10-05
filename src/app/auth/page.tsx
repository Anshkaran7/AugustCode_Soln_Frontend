"use client";

import { useState } from 'react';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

export default function EmailLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading spinner state

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner when signing in

    // Simulate sign-in process
    setTimeout(() => {
      setIsLoading(false); // Stop spinner
      if (email === "nileshpatel5213@gmail.com" && password === "Gaurang$5213$") {
        toast.success("Sign In Successful!"); // Show success toast
      } else {
        toast.error("Invalid email or password!"); // Show error toast
      }
    }, 2000); // Simulate sign-in delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-white/50">
      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in">
        <Toaster position="top-right" />

        <div className="text-center mb-6">
          <h2 className="text-3xl font-[family-name:var(--font-montserrat-bold)] text-gray-700 animate-slide-in">
            Sign In
          </h2>
          <p className="text-gray-500 mt-2 font-[family-name:var(--font-montserrat-regular)] animate-slide-in">
            Enter your email and password to log in
          </p>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSignIn} className="space-y-6 animate-fade-in">
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-[family-name:var(--font-montserrat-medium)]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-[family-name:var(--font-montserrat-medium)]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center space-x-2 font-[family-name:var(--font-montserrat-bold)]"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        {/* Resend OTP Option */}
        <div className="text-center mt-4 animate-fade-in">
          <button
            onClick={() => toast("Forgot password?")} // Show toast when clicked
            className="text-sm text-blue-500 hover:underline transition duration-300 font-[family-name:var(--font-montserrat-regular)]"
          >
            Forgot password?
          </button>
        </div>
        <div className="text-center mt-4 animate-fade-in font-[family-name:var(--font-montserrat-regular)]">
        <p>Don't have an account? <a href="/auth/register">Register</a></p>
      </div>
      </div>

      {/* register thing  */}
     
    </div>
  );
}
