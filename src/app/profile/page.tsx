import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileClient from "./ProfileClient";
import ProfileSkeleton from "@/components/ProfileSkeleton";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
