import { fetchAllProducts } from "@/lib/api";
import AllProductsList from "./AllProductsList";

export default async function AllProducts() {
  const products = await fetchAllProducts();

  return (
    <section id="সব-পণ্য" className="mt-12">
      <AllProductsList products={products} />
    </section>
  );
}
