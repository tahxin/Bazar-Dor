import { ApiProduct, Product, ApiCategory, Category } from "@/types";

const PRIMARY_API = "https://api.api-store.workers.dev/api/bazardor";
const BACKUP_API  = "https://api.abcz.workers.dev/api/bazardor";

async function fetchApiData(path: string) {
  try {
    const res = await fetch(`${PRIMARY_API}${path}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {}

  try {
    const res = await fetch(`${BACKUP_API}${path}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
  }

  return null;
}

export function normaliseProduct(raw: ApiProduct): Product {
  const changePct = raw.change?.pct ? Math.abs(raw.change.pct) : 0;
  const isUp = raw.change?.dir === "up";

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.nameBn,
    unit: raw.unit,
    price: raw.today,
    yesterday: raw.yesterday,
    lastWeek: raw.lastWeek,
    lastMonth: raw.lastMonth,
    image: raw.image || "",
    categoryIcon: raw.categoryIcon || "",
    category: raw.category,
    categoryNameBn: raw.categoryNameBn,
    change: changePct,
    is_increase: isUp,
    dir: raw.change?.dir || "flat",
    markets: raw.markets || [],
  };
}

function toProductList(data: unknown): Product[] {
  if (Array.isArray(data)) {
    return data.map(normaliseProduct);
  }

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const list = obj.products || obj.data || obj.results;
    if (Array.isArray(list)) {
      return list.map(normaliseProduct);
    }
  }

  return [];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetchApiData("/products");
  return toProductList(data);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchApiData(`/products/${slug}`);
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return normaliseProduct(data as ApiProduct);
  }

  const all = await fetchAllProducts();
  const matched = all.find((p) => p.slug === slug || String(p.id) === slug);
  return matched || null;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchApiData("/categories");
  if (Array.isArray(data)) {
    return data;
  }
  return [];
}

export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchApiData(`/products?category=${categorySlug}`);
  return toProductList(data);
}

export async function fetchCategoryBySlug(slug: string): Promise<ApiCategory | null> {
  const data = await fetchApiData(`/categories/${slug}`);
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data as ApiCategory;
  }
  return null;
}
