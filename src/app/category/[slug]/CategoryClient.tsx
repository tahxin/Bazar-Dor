"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CommodityCard from "@/components/CommodityCard";
import CardSkeleton from "@/components/CardSkeleton";
import { Product, Category } from "@/lib/types";

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
    setLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`).then((r) =>
        r.ok ? r.json() : []
      ),
    ])
      .then(([cat, prods]) => {
        if (!cat) {
          setNotFound(true);
          return;
        }
        setCategory(cat);
        const list = Array.isArray(prods) ? prods : [];
        setProducts(
          list.map((raw: {
            id: number;
            slug: string;
            nameBn: string;
            category: string;
            categoryNameBn: string;
            categoryIcon: string;
            unit: string;
            image: string;
            today: number;
            yesterday: number;
            lastWeek: number;
            lastMonth: number;
            change: { dir: "up" | "down" | "flat"; pct: number };
            markets: { market: string; division: string; min: number; max: number }[];
          }) => ({
            id: raw.id,
            slug: raw.slug,
            name: raw.nameBn,
            unit: raw.unit,
            price: raw.today,
            yesterday: raw.yesterday,
            lastWeek: raw.lastWeek,
            lastMonth: raw.lastMonth,
            image: raw.image ?? "",
            categoryIcon: raw.categoryIcon ?? "",
            category: raw.category,
            categoryNameBn: raw.categoryNameBn,
            change: Math.abs(raw.change?.pct ?? 0),
            is_increase: raw.change?.dir === "up",
            dir: raw.change?.dir ?? "flat",
            markets: raw.markets ?? [],
          }))
        );
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
            <div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-40" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
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
          <select
            id="category-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#047F39] cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
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
