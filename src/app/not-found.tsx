import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
          <div className="text-7xl mb-4">🔍</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">৪০৪</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-3">পেজটি পাওয়া যায়নি</h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই অথবা সরিয়ে ফেলা হয়েছে।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-[#047F39] hover:bg-[#036B30] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
