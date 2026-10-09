import CardSkeleton from "./CardSkeleton";

export default function CategoryPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-28" />
            <div className="h-4 bg-gray-100 rounded w-44" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex items-center justify-between shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-36" />
        <div className="h-8 bg-gray-100 rounded-lg w-32" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
