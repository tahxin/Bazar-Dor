import { fetchAllProducts } from "@/lib/api";
import CommodityCard from "./CommodityCard";

export default async function UpTickProducts() {
  const all = await fetchAllProducts();
  const risers = all
    .filter((p) => p.dir === "up")
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">▲</span>
        <h2 className="text-xl font-extrabold text-gray-900">আজ দাম বেড়েছে</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {risers.map((product) => (
          <CommodityCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
