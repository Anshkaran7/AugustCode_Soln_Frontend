"use client";

import { useState } from 'react';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast, Toaster } from 'sonner';
import {useRouter} from 'next/navigation';

// Function to simulate email sending
async function sendOtpToEmail(email: string, password: string): Promise<string> {
  // Simulate an API call to send OTP
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`OTP sent to email: ${email}`);
      resolve("123456"); // Simulate an OTP being sent (in a real scenario, you'd generate a random OTP)
    }, 1000);
  });
}

export default function EmailOtpPage() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading spinner state

  const router = useRouter();
  // Send OTP to email
  const handleSendOtp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner when sending OTP

    try {
      const generatedOtp = await sendOtpToEmail(email, password); // Simulate email OTP send
      setGeneratedOtp(generatedOtp); // Store OTP for verification
      setIsOtpSent(true);
      setIsLoading(false); // Stop spinner
      toast.success("OTP sent to your email!"); // Show success toast
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to send OTP!");
    }
  };

  // Verify OTP
  const handleVerifyOtp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner when verifying OTP

    setTimeout(() => {
      if (otp === generatedOtp) {
        toast.success("OTP Verified Successfully!"); // Show success toast
        router.push("/")
      } else {
        toast.error("Invalid OTP!"); // Show error toast
      }
      setIsLoading(false); // Stop spinner
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-white/50">
      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in">
        <Toaster position="top-right" />

        <div className="text-center mb-6">
          <h2 className="text-3xl font-[family-name:var(--font-montserrat-bold)] text-gray-700 animate-slide-in">
            {isOtpSent ? 'Enter OTP' : 'Sign In with Email'}
          </h2>
          <p className="text-gray-500 mt-2 font-[family-name:var(--font-montserrat-regular)] animate-slide-in">
            {isOtpSent
              ? 'We have sent an OTP to your email address'
              : 'Enter your email to receive an OTP'}
          </p>
        </div>

        {/* Email Input */}
        {!isOtpSent && (
          <form onSubmit={handleSendOtp} className="space-y-6 animate-fade-in">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-[family-name:var(--font-montserrat-medium)]"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-[family-name:var(--font-montserrat-medium)]"
                placeholder="Enter your Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center space-x-2 font-[family-name:var(--font-montserrat-bold)]"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Send OTP'}
            </button>
          </form>
        )}

        {/* OTP Input */}
        {isOtpSent && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 flex flex-col items-center animate-fade-in">
            <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
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
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center space-x-2 font-[family-name:var(--font-montserrat-bold)]"
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
                setOtp('');
                toast("Resending OTP..."); // Show toast when resending OTP
              }}
              className="text-sm text-blue-500 hover:underline transition duration-300 font-[family-name:var(--font-montserrat-regular)]"
            >
              Didn’t receive OTP? Resend
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
