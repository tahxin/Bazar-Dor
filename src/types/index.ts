export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ApiProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
}

export interface ApiCategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  unit: string;
  price: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  image: string;
  categoryIcon: string;
  category: string;
  categoryNameBn: string;
  change: number;
  is_increase: boolean;
  dir: "up" | "down" | "flat";
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export type SortMode = "default" | "price-asc" | "price-desc";

export const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
