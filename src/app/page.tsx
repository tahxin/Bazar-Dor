import HeroSection from "@/components/HeroSection";
import Header from "../components/Header";
import UpTickProducts from "@/components/UpTickProducts";
import DownTickProducts from "@/components/DownTickProducts";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />
      <main>
        <HeroSection />
        <UpTickProducts />
        <DownTickProducts />
        <section id="all-products">
          <AllProducts />
        </section>
      </main>
    </div>
  );
}
