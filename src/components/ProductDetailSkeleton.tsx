export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-20 mb-6" />

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded-full w-24" />
            <div className="h-7 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-100 rounded w-32" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-28" />
            <div className="h-3 bg-gray-100 rounded w-24" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-28" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-xl space-y-2 text-center">
              <div className="h-3 bg-gray-200 rounded w-12 mx-auto" />
              <div className="h-6 bg-gray-200 rounded w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-44" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
