import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInClient from "./SignInClient";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <SignInClient />
      </main>
      <Footer />
    </div>
  );
}
