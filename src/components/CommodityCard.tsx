import React from "react";
import { Product } from "./AllProducts";

// Convert English digits to Bengali digits
function toBengaliNumber(num: string | number): string {
  const digits: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
  };
  return String(num).replace(/[0-9]/g, (d) => digits[d]);
}

export default function CommodityCard({ product }: { product: Product }) {
  const isFlat = product.change === 0;

  return (
    <div className="bg-base-100 border border-base-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between w-full">

      {/* Product name & icon */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white border border-base-200 flex items-center justify-center text-3xl shrink-0">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div>
          <h3 className="text-xl font-bold text-base-content tracking-tight leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-base-content/60 font-medium">{product.unit}</p>
        </div>
      </div>

      {/* Price & change badge */}
      <div className="mt-8 flex items-end justify-between">
        <div>
          <span className="block text-sm text-base-content/60 font-medium mb-1">
            আজকের দাম
          </span>
          <div className="text-2xl font-extrabold text-base-content">
            {toBengaliNumber(product.price)}{" "}
            <span className="text-lg font-bold">টাকা</span>
          </div>
        </div>

        {/* Up = green, Down = red, Flat = gray */}
        {!isFlat && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold px-2 py-0.5 rounded-md ${
              product.is_increase
                ? "text-emerald-600 bg-emerald-50"
                : "text-red-500 bg-red-50"
            }`}
          >
            <span className="text-xs">{product.is_increase ? "▲" : "▼"}</span>
            <span>{toBengaliNumber(product.change)}%</span>
          </div>
        )}

        {isFlat && (
          <div className="flex items-center gap-1 text-sm font-semibold px-2 py-0.5 rounded-md text-gray-500 bg-gray-100">
            <span className="text-xs">—</span>
            <span>অপরিবর্তিত</span>
          </div>
        )}
      </div>
    </div>
  );
}
