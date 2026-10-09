import { ApiProduct, Product, ApiCategory, Category } from "./types";

const BASE = "https://api.api-store.workers.dev/api/bazardor";
const ALT  = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback(path: string): Promise<unknown> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
    if (res.ok) return res.json();
  } catch {
  }
  const res = await fetch(`${ALT}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function normaliseProduct(raw: ApiProduct): Product {
  const pct = typeof raw.change?.pct === "number" ? Math.abs(raw.change.pct) : 0;
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.nameBn,
    unit: raw.unit,
    price: raw.today,
    yesterday: raw.yesterday,
    lastWeek: raw.lastWeek,
    lastMonth: raw.lastMonth,
    image: raw.image ?? "",
    categoryIcon: raw.categoryIcon ?? "",
    category: raw.category,
    categoryNameBn: raw.categoryNameBn,
    change: pct,
    is_increase: raw.change?.dir === "up",
    dir: raw.change?.dir ?? "flat",
    markets: raw.markets ?? [],
  };
}

function extractProducts(data: unknown): Product[] {
  if (Array.isArray(data)) return (data as ApiProduct[]).map(normaliseProduct);
  if (typeof data === "object" && data !== null) {
    for (const key of ["products", "data", "results"]) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return (val as ApiProduct[]).map(normaliseProduct);
    }
  }
  return [];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetchWithFallback("/products");
  return extractProducts(data);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await fetchWithFallback(`/products/${slug}`);
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return normaliseProduct(data as ApiProduct);
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchWithFallback("/categories");
  if (Array.isArray(data)) return data as Category[];
  return [];
}

export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchWithFallback(`/products?category=${categorySlug}`);
  return extractProducts(data);
}

export async function fetchCategoryBySlug(slug: string): Promise<ApiCategory | null> {
  try {
    const data = await fetchWithFallback(`/categories/${slug}`);
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return data as ApiCategory;
    }
    return null;
  } catch {
    return null;
  }
}
