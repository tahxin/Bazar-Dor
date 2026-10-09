"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CommodityCard from "@/components/CommodityCard";
import CategoryPageSkeleton from "@/components/CategoryPageSkeleton";
import { Product, Category } from "@/lib/types";
import { fetchCategoryBySlug, fetchProductsByCategory } from "@/lib/api";

type SortMode = "default" | "price-asc" | "price-desc";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sort, setSort] = useState<SortMode>("default");

  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      try {
        const [cat, prods] = await Promise.all([
          fetchCategoryBySlug(slug),
          fetchProductsByCategory(slug),
        ]);

        if (!cat) {
          setNotFound(true);
          return;
        }

        setCategory(cat);
        setProducts(prods);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return <CategoryPageSkeleton />;
  }

  if (notFound || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">পণ্যসমূহ পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-8">
          এই বিভাগটি বিদ্যমান নেই অথবা কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#047F39] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#036B30] transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{category.nameBn}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex items-center justify-between shadow-sm">
        <p className="text-sm text-gray-500">মোট {products.length} টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">সাজান:</span>
          <div className="relative inline-block">
            <select
              id="category-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="text-sm border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#047F39] cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500">এই বিভাগে কোনো পণ্য নেই।</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 bg-[#047F39] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#036B30] transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((product) => (
            <CommodityCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
