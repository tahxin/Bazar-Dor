"use client";

import { useState } from "react";
import CommodityCard from "./CommodityCard";
import { Product } from "@/lib/types";

type SortMode = "default" | "price-asc" | "price-desc";

export default function AllProductsList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">সব পণ্য</h2>
          <p className="text-sm text-gray-500 mt-1">
            মোট {products.length} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-sm text-gray-600 font-medium">সাজান:</span>
          <select
            id="all-products-sort"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((product) => (
          <CommodityCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
