export default function AuthSkeleton({ isSignUp = false }: { isSignUp?: boolean }) {
  return (
    <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl mx-auto mb-3" />
        <div className="h-7 bg-gray-200 rounded-lg w-32 mx-auto mb-2" />
        <div className="h-4 bg-gray-100 rounded-lg w-56 mx-auto" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="w-full h-10 bg-gray-100 rounded-xl" />
        <div className="w-full h-10 bg-gray-100 rounded-xl" />
      </div>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="h-3 bg-gray-100 rounded w-24" />
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="space-y-4">
        {isSignUp && (
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-10 bg-gray-100 rounded-xl w-full" />
          </div>
        )}

        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
        </div>

        <div className="h-11 bg-gray-200 rounded-xl w-full mt-2" />
      </div>

      <div className="h-4 bg-gray-100 rounded w-40 mx-auto mt-6" />
    </div>
  );
}
