import { api } from "./api";

export type CategoryNode = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  icon_url?: string | null;
  children?: CategoryNode[];
};

export type ProductListItem = {
  id: number;
  title: string;
  slug: string;
  sku: string;
  brand: string;
  short_category_label: string;
  category_name: string;
  category_slug: string;
  mrp: string;
  sale_price: string;
  gst_percent: number;
  gst_amount: string;
  discount_percent: number;
  is_sale: boolean;
  image: string | null;
};

export type ProductImage = { id: number; image_url: string; sort_order: number };

export type ProductDetail = {
  id: number;
  title: string;
  slug: string;
  sku: string;
  brand: string;
  short_category_label: string;
  category_name: string;
  category_slug: string;
  mrp: string;
  sale_price: string;
  gst_percent: number;
  gst_amount: string;
  discount_percent: number;
  is_sale: boolean;
  description: string;
  specs: any;
  images: ProductImage[];
};

export type Review = {
  id: number;
  rating: number;
  name: string;
  email: string;
  comment: string;
  created_at: string;
};

export async function fetchCategoryTree(): Promise<CategoryNode[]> {
  const res = await api.get("/store/categories/");
  return res.data;
}

export async function fetchProducts(params?: {
  category?: string;
  parent?: string;
  pricing?: "low" | "high";
}): Promise<ProductListItem[]> {
  const res = await api.get("/store/products/", { params });
  return res.data;
}

export async function fetchProductDetail(slug: string): Promise<ProductDetail> {
  const res = await api.get(`/store/products/${slug}/`);
  return res.data;
}

export async function fetchReviews(slug: string): Promise<Review[]> {
  const res = await api.get(`/store/products/${slug}/reviews/`);
  return res.data;
}

export async function createReview(slug: string, payload: {
  rating: number;
  name: string;
  email: string;
  comment: string;
}) {
  const res = await api.post(`/store/products/${slug}/reviews/`, payload);
  return res.data;
}