import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-[#f0faf4] to-[#e8f5ed] rounded-3xl my-6 px-8 py-12 flex flex-col lg:flex-row-reverse items-center gap-10 border border-[#d0ead8] animate-pulse">
          <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-white/60" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded-full w-48" />
            <div className="h-10 bg-gray-200 rounded w-72" />
            <div className="h-4 bg-gray-200 rounded w-full max-w-lg" />
            <div className="h-12 bg-gray-300 rounded-xl w-40" />
          </div>
        </div>

        <div className="mt-10">
          <div className="h-7 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
