export default function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="h-3 bg-gray-100 rounded w-16 mb-1.5" />
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-6 bg-gray-100 rounded-full w-14" />
      </div>
    </div>
  );
}
