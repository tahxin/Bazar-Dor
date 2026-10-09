import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import ProfileSkeleton from "@/components/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <HeaderSkeleton />
      <main className="flex-1">
        <ProfileSkeleton />
      </main>
      <Footer />
    </div>
  );
}
