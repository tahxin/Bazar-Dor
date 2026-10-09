import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            width={400}
            height={400}
            alt="Bazar Dor Hero Image"
            src="/bazar-hero.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <div className="text-lg font-medium text-gray-600">
              {new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })}
            </div>
            <h1 className="text-5xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
            <p className="py-6">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <button className="btn bg-[#047F39] text-white border-[#047F39] hover:bg-[#036B30]">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
