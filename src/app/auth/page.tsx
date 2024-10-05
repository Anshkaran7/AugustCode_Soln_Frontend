"use client";

import { useState } from 'react';
import { FaPhone, FaSpinner } from 'react-icons/fa';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast, Toaster } from 'sonner';

export default function PhoneLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading spinner state

  console.log(otp)
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner when sending OTP
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false); // Stop spinner
      toast.success("OTP sent successfully!"); // Show toast notification
    }, 2000); // Simulate OTP send delay
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner when verifying OTP
    setTimeout(() => {
      setIsLoading(false); // Stop spinner
      toast.success("OTP Verified Successfully!"); // Show success toast
    }, 2000); // Simulate OTP verification delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-white/50">
      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in">
        <Toaster position="top-right" />

        <div className="text-center mb-6">
          <h2 className="text-3xl font-[family-name:var(--font-montserrat-bold)] text-gray-700 animate-slide-in">
            {isOtpSent ? 'Enter OTP' : 'Vitco Impex'}
          </h2>
          <p className="text-gray-500 mt-2 font-[family-name:var(--font-montserrat-regular)] animate-slide-in">
            {isOtpSent
              ? 'We have sent an OTP to your phone number'
              : 'Enter your phone number to log in'}
          </p>
        </div>

        {/* Phone Number Input */}
        {!isOtpSent && (
          <form onSubmit={handleSendOtp} className="space-y-6 animate-fade-in">
            <div className="relative">
              <FaPhone className="absolute left-3 top-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-[family-name:var(--font-montserrat-medium)]"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-white rounded-lg hover:bg-white/80 transition duration-300 flex justify-center items-center space-x-2 font-[family-name:var(--font-montserrat-bold)]"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Send OTP'}
            </button>
          </form>
        )}

        {/* OTP Input */}
        {isOtpSent && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 flex flex-col items-center animate-fade-in">
            <InputOTP maxLength={6} onChange={(value) => setOtp(value)} >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator/>
              <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <button
              type="submit"
              className="w-full py-3 bg-white text-white rounded-lg hover:bg-white/70 transition duration-300 flex justify-center items-center space-x-2 font-[family-name:var(--font-montserrat-bold)]"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* Resend OTP Option */}
        {isOtpSent && !isLoading && (
          <div className="text-center mt-4 animate-fade-in">
            <button
              onClick={() => {
                setIsOtpSent(false);
                toast("Resending OTP..."); // Show toast when resending OTP
              }}
              className="text-sm text-white hover:underline transition duration-300 font-[family-name:var(--font-montserrat-regular)]"
            >
              Didn’t receive OTP? Resend
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
