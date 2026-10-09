import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpdateProfileClient from "./UpdateProfileClient";

export default function UpdateProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Header />
      <main className="flex-1">
        <UpdateProfileClient />
      </main>
      <Footer />
    </div>
  );
}
