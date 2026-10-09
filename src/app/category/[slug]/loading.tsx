import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryPageSkeleton from "@/components/CategoryPageSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main>
        <CategoryPageSkeleton />
      </main>
      <Footer />
    </div>
  );
}
