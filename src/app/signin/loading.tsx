import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import AuthSkeleton from "@/components/AuthSkeleton";

export default function SignInLoading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <HeaderSkeleton />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <AuthSkeleton isSignUp={false} />
      </main>
      <Footer />
    </div>
  );
}
