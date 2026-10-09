"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/lib/types";

interface Props {
  categories: Category[];
}

export default function NavLinks({ categories }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 py-1 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const href = `/category/${cat.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={cat.slug}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-[#047F39] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
