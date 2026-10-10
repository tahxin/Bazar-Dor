import Link from "next/link";

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="shrink-0 w-10 h-10 rounded-xl bg-[#047F39] flex items-center justify-center text-xl shadow-xs"
              aria-label="বাজার দর"
            >
              <span>🛒</span>
            </Link>
            <div>
              <span className="text-lg font-extrabold text-gray-900 leading-none">
                বাজার দর
              </span>
              <div className="h-3 w-28 bg-gray-200 rounded mt-1 animate-pulse" />
            </div>
          </div>

          <div className="w-24 h-8 bg-gray-100 rounded-xl animate-pulse" />
        </div>

        <div className="pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-100 rounded-xl shrink-0 animate-pulse"
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border-y border-gray-200 py-2.5 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-pulse px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-36 bg-gray-200 rounded shrink-0" />
          ))}
        </div>
      </div>
    </header>
  );
}
