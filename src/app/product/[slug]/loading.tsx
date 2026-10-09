import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main>
        <ProductDetailSkeleton />
      </main>
      <Footer />
    </div>
  );
}
