import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <HeaderSkeleton />
      <main className="flex-1">
        <ProductDetailSkeleton />
      </main>
      <Footer />
    </div>
  );
}
