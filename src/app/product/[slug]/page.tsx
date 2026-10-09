import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailClient from "./ProductDetailClient";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

export const metadata: Metadata = {
  title: "পণ্যের বিবরণ — বাজার দর",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
