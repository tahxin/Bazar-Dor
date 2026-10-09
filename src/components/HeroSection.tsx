"use client";

import React from "react";
import Image from "next/image";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-gray-50 rounded-3xl my-4 px-8 py-12 flex flex-col lg:flex-row-reverse items-center gap-10">
      <div className="shrink-0">
        <Image
          width={320}
          height={320}
          alt="Bazar Dor Hero Image"
          src="/bazar-hero.png"
          className="rounded-2xl shadow-xl object-contain"
          priority
        />
      </div>

      <div className="flex-1">
        <p
          className="text-base font-medium text-gray-500 mb-3"
          suppressHydrationWarning
        >
          {date}
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#all-products"
          className="inline-block bg-[#047F39] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#036B30] transition-colors duration-200"
        >
          সব পণ্য দেখুন
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
