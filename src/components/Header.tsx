import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavUserProfile } from "./NavUserProfile";
import NavLinks from "./NavLinks";
import PriceTicker from "./PriceTicker";
import { fetchCategories, fetchAllProducts } from "@/lib/api";
import HeaderDate from "@/components/HeaderDate";

export default async function Header() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchAllProducts(),
  ]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                loading="eager"
                priority
                width={40}
                height={40}
                className="rounded-xl"
              />
            </Link>
            <div>
              <Link href="/" className="text-lg font-extrabold text-gray-900 leading-none">
                বাজার দর
              </Link>
              <HeaderDate />
            </div>
          </div>

          <Suspense fallback={<div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />}>
            <NavUserProfile />
          </Suspense>
        </div>

        <div className="pb-2">
          <Suspense fallback={<div className="h-8" />}>
            <NavLinks categories={categories} />
          </Suspense>
        </div>
      </div>

      <PriceTicker products={products} />
    </header>
  );
}
