"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, unitLabel } from "@/lib/utils";

interface Props {
  products: Product[];
}

export default function PriceTicker({ products }: Props) {
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="bg-gray-50 border-y border-gray-200 overflow-hidden py-2">
      <div
        className="ticker-track flex gap-8 whitespace-nowrap"
        style={{
          animation: "ticker 60s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((p, i) => (
          <span key={`${p.id}-${i}`} className="inline-flex items-center gap-2">
            <Link
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-1.5 text-sm hover:text-[#047F39] hover:underline transition-colors"
            >
              <span>{p.image || p.categoryIcon}</span>
              <span className="font-semibold text-gray-800 hover:text-[#047F39]">{p.name}</span>
              <span className="text-gray-500">
                {formatPrice(p.price)} টাকা/{unitLabel(p.unit).replace("প্রতি ", "")}
              </span>
              {p.dir !== "flat" && (
                <span
                  className={`font-bold ${p.is_increase ? "text-emerald-600" : "text-red-500"}`}
                >
                  {p.is_increase ? "▲" : "▼"} {p.change.toFixed(1)}%
                </span>
              )}
            </Link>
            <span className="text-gray-300 ml-1">|</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
