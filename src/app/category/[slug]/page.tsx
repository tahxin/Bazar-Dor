import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";

export const metadata: Metadata = {
  title: "বিভাগ — বাজার দর",
};

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Header />
      <main>
        <Suspense fallback={null}>
          <CategoryClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
