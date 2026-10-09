"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/types";
import { formatPrice, unitLabel } from "@/lib/utils";
import { fetchProductBySlug } from "@/lib/api";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { data: session, isPending } = useSession();
  const redirectedRef = useRef(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isPending && !session && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("এই পেজটি দেখতে সাইন ইন করুন।", { id: "auth-required" });
      const returnUrl = slug ? `/product/${slug}` : "/";
      router.push(`/signin?callbackURL=${encodeURIComponent(returnUrl)}`);
    }
  }, [isPending, session, router, slug]);

  useEffect(() => {
    if (!slug) return;

    async function loadProduct() {
      try {
        const data = await fetchProductBySlug(slug);
        if (data) {
          setProduct(data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (isPending || !session || loading) {
    return <ProductDetailSkeleton />;
  }

  if (notFound || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">পণ্য পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-8">এই পণ্যটি বিদ্যমান নেই বা সরিয়ে দেওয়া হয়েছে।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#047F39] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#036B30] transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  let minPrice = product.price;
  let maxPrice = product.price;
  let avgPrice = product.price;

  if (product.markets && product.markets.length > 0) {
    let total = 0;
    let count = 0;
    minPrice = product.markets[0].min;
    maxPrice = product.markets[0].max;

    for (const m of product.markets) {
      if (m.min < minPrice) minPrice = m.min;
      if (m.max > maxPrice) maxPrice = m.max;
      total += m.min + m.max;
      count += 2;
    }
    if (count > 0) {
      avgPrice = Math.round(total / count);
    }
  }

  const marketsByDivision: { [division: string]: typeof product.markets } = {};
  for (const m of product.markets) {
    if (!marketsByDivision[m.division]) {
      marketsByDivision[m.division] = [];
    }
    marketsByDivision[m.division].push(m);
  }

  const isFlat = product.dir === "flat";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href={`/category/${product.category}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {product.categoryNameBn}
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-4xl shrink-0">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold bg-[#e0f2e9] text-[#047F39] px-2.5 py-1 rounded-full">
                {product.categoryNameBn}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-sm text-gray-500">{unitLabel(product.unit)}</p>
            <p className="text-sm text-gray-400 mt-2">
              আজকের বাজার মূল্য বিশ্লেষণ — বিভিন্ন বাজারের গড়, সর্বনিম্ন ও সর্বাধিক দাম।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-medium mb-1">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-extrabold text-emerald-600">{formatPrice(minPrice)}</p>
          <p className="text-xs text-gray-400 mt-0.5">টাকা / {unitLabel(product.unit).replace("প্রতি ", "")}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-medium mb-1">সর্বাধিক দাম</p>
          <p className="text-2xl font-extrabold text-red-500">{formatPrice(maxPrice)}</p>
          <p className="text-xs text-gray-400 mt-0.5">টাকা / {unitLabel(product.unit).replace("প্রতি ", "")}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ring-2 ring-[#047F39]/20">
          <p className="text-xs text-gray-400 font-medium mb-1">গড় দাম</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-extrabold text-gray-900">{formatPrice(avgPrice)}</p>
            {!isFlat && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full mb-1 ${
                product.is_increase ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
              }`}>
                {product.is_increase ? "▲" : "▼"} {product.change.toFixed(1)}%
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">টাকা / {unitLabel(product.unit).replace("প্রতি ", "")}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">দামের ইতিহাস</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "আজ", val: product.price },
            { label: "গতকাল", val: product.yesterday },
            { label: "গত সপ্তাহ", val: product.lastWeek },
            { label: "গত মাস", val: product.lastMonth },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
              <p className="text-lg font-extrabold text-gray-900">{formatPrice(item.val)}</p>
              <p className="text-xs text-gray-400">টাকা</p>
            </div>
          ))}
        </div>
      </div>

      {product.markets.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
            <p className="text-xs text-gray-400 mt-0.5">{product.markets.length}টি বাজারের তথ্য</p>
          </div>

          {Object.entries(marketsByDivision).map(([division, markets]) => (
            <div key={division}>
              <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{division}</p>
              </div>
              {markets.map((m, i) => (
                <div
                  key={i}
                  className="px-6 py-4 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{m.market}</p>
                    <p className="text-xs text-gray-400">{m.division}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice(m.min)} – {formatPrice(m.max)}
                      <span className="text-xs font-normal text-gray-500 ml-1">টাকা</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      গড়: {formatPrice(Math.round((m.min + m.max) / 2))} টাকা
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
