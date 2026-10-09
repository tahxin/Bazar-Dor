"use client";

import React, { useEffect, useState } from "react";
import CommodityCard from "./CommodityCard";

// Shape of the product we get from the API
interface ApiProduct {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

// Simpler shape we use inside the app
export interface Product {
  id: number;
  name: string;
  unit: string;
  price: number;
  image: string;
  change: number;
  is_increase: boolean;
  categoryIcon: string;
}

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

// Convert one raw API product into our simpler Product shape
function normalise(raw: ApiProduct): Product {
  const pct = typeof raw.change?.pct === "number" ? Math.abs(raw.change.pct) : 0;
  return {
    id: raw.id,
    name: raw.nameBn,
    unit: raw.unit,
    price: raw.today,
    image: raw.image ?? "",
    change: pct,
    is_increase: raw.change?.dir === "up",
    categoryIcon: raw.categoryIcon ?? "",
  };
}

// The API might return an array directly, or wrap it in { products: [...] } etc.
function getProductList(data: unknown): Product[] {
  if (Array.isArray(data)) return (data as ApiProduct[]).map(normalise);

  if (typeof data === "object" && data !== null) {
    for (const key of ["products", "data", "results"]) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return (val as ApiProduct[]).map(normalise);
    }
  }
  return [];
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: unknown = await res.json();
        const list = getProductList(data);

        if (list.length === 0) throw new Error("No products returned.");
        setProducts(list);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError("পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-base-content/60">
        পণ্যের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-error">
        <p>{error}</p>
        <p className="mt-2 text-sm text-base-content/50">
          বিস্তারিত জানতে ব্রাউজারের Console দেখুন।
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <CommodityCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

