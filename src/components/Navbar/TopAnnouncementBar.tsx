// components/TopAnnouncementBar.tsx
import React from 'react';

const TopAnnouncementBar = () => {
  return (
    <div className="bg-[#333] py-2 overflow-hidden relative">
      <div className="flex items-center justify-start space-x-10 animate-marquee">
        <div className="marquee-content">
          <span className="text-white text-xs lg:text-sm">
            ⚡ Summer sale: Up to 70% off selected items ⚡
          </span>
          <span className="text-white text-xs lg:text-sm">
            ⚡ Limited time offer: Free shipping on orders above $50! ⚡
          </span>
          <span className="text-white text-xs lg:text-sm">
            ⚡ Special discount for new arrivals! ⚡
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopAnnouncementBar;
