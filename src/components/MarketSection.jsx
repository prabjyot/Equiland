import React from "react";

function MarketSection() {
  return (
    <div className="w-full py-8 sm:py-32 relative flex flex-col sm:flex-row items-center justify-between px-6 sm:px-0">
      <div className="hidden sm:block">
        <img src="/lmap.svg" alt="" className="" />
      </div>
      <div className="max-w-2xl flex flex-col gap-5 sm:gap-7">
        <h2 className="text-[28px] sm:text-[40px] leading-tight sm:leading-[46px]">
          Leave no market untapped,{" "}
          <span className="text-primary-light">seamlessly execute multi-country projects,</span>{" "}
          by tapping into our global network of partner agencies and researchers
        </h2>
        <p className="text-base sm:text-lg font-poppins leading-tight">
          We are building our network one step at a time to ensure that your
          time is dedicated to doing what you do best – making strategic
          business decisions basis data and insights
        </p>
      </div>
      <div className="hidden sm:block">
        <img src="/rmap.svg" alt="" className="" />
      </div>
      
      {/* Mobile map - centered single image */}
      <div className="block sm:hidden mt-8 w-full">
        <img src="/lmap.svg" alt="" className="w-full object-contain" />
      </div>
    </div>
  );
}

export default MarketSection;
