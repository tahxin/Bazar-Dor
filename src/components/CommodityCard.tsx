import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, unitLabel } from "@/lib/utils";

export default function CommodityCard({ product }: { product: Product }) {
  const isFlat = product.dir === "flat";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between w-full"
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#047F39] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="block text-xs text-gray-400 font-medium mb-0.5">
            আজকের দাম
          </span>
          <div className="text-xl font-extrabold text-gray-900">
            {formatPrice(product.price)}{" "}
            <span className="text-sm font-bold text-gray-600">টাকা</span>
          </div>
        </div>

        {!isFlat && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.is_increase
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-600 bg-red-50"
            }`}
          >
            <span>{product.is_increase ? "▲" : "▼"}</span>
            <span>{product.change.toFixed(1)}%</span>
          </div>
        )}

        {isFlat && (
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full text-gray-500 bg-gray-100">
            <span>—</span>
            <span>০.০%</span>
          </div>
        )}
      </div>
    </Link>
  );
}
