import { Suspense } from "react";
import BannerDate from "./BannerDate";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-br from-[#f0faf4] to-[#e8f5ed] rounded-3xl my-6 px-8 py-12 flex flex-col lg:flex-row-reverse items-center gap-10 border border-[#d0ead8]">
      <div className="shrink-0 flex items-center justify-center">
        <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-white/60 flex items-center justify-center text-9xl shadow-xl border border-[#c5e6cf]">
          🧺
        </div>
      </div>

      <div className="flex-1">
        <Suspense
          fallback={
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#047F39] bg-[#e0f2e9] px-3 py-1 rounded-full mb-4">
              <span>📅</span>
              <span>আজকের তারিখ</span>
            </span>
          }
        >
          <BannerDate />
        </Suspense>

        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          আজকের বাজারের<br />
          <span className="text-[#047F39]">দাম এক নজরে</span>
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-lg">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="inline-flex items-center gap-2 bg-[#047F39] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#036B30] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          সব পণ্য দেখুন
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7-7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
