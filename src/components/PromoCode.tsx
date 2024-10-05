import Link from 'next/link';

const PromoBanner = () => {
  return (
    <div className="flex items-center justify-between bg-blue-500 text-white py-4 md:mx-32 rounded-full px-6 md:py-6 md:px-10 mt-5 overflow-hidden">
      {/* Center Text */}
      <div className="flex-1 text-center">
        <h2 className="text-sm md:text-3xl text-yellow-400 font-[family-name:var(--font-montserrat-bold)]">
          30% off for new customers
        </h2>
        <p className="text-xs md:text-lg">
          Free Shipping & Free Return at no order min. Restrictions apply.
        </p>
        <Link href="/start-order" className="mt-2 text-white underline px-4 py-2 rounded-md font-[family-name:var(--font-montserrat-regular)]">
            Start your order now
        </Link>
      </div>

    
    </div>
  );
};

export default PromoBanner;
