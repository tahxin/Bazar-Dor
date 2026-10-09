import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UpTickProducts from "@/components/UpTickProducts";
import DownTickProducts from "@/components/DownTickProducts";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

function ProductsLoadingSkeleton() {
  return (
    <div className="mt-10">
      <div className="h-7 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <HeroSection />
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <UpTickProducts />
        </Suspense>
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <DownTickProducts />
        </Suspense>
        <Suspense
          fallback={
            <section id="সব-পণ্য" className="mt-12">
              <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </section>
          }
        >
          <AllProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
