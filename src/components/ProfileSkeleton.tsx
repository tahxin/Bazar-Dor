export default function ProfileSkeleton() {
  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-12 animate-pulse">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div className="space-y-2 flex-1 text-center sm:text-left">
            <div className="h-6 bg-gray-200 rounded w-40 mx-auto sm:mx-0" />
            <div className="h-4 bg-gray-100 rounded w-52 mx-auto sm:mx-0" />
            <div className="h-5 bg-gray-100 rounded-full w-28 mx-auto sm:mx-0" />
          </div>
        </div>

        <div className="py-6 space-y-4">
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-10 bg-gray-100 rounded-xl w-full" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-10 bg-gray-100 rounded-xl w-full" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex gap-3">
          <div className="h-11 bg-gray-200 rounded-xl flex-1" />
          <div className="h-11 bg-gray-100 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}
