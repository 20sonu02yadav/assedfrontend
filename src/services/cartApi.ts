// src/services/cartApi.ts
import { api } from "./api";

export type CartItem = {
  id: number;
  product: number;
  product_title: string;
  product_slug?: string;
  product_image?: string | null;
  unit_price?: string;
  quantity: number;
  line_total?: string;
};

export type Cart = {
  id: number;
  items: CartItem[];
  total_amount?: string;
};

export async function getCart(): Promise<Cart> {
  const res = await api.get("/cart/");
  return res.data;
}

export async function addToCart(product_id: number, quantity = 1) {
  const res = await api.post("/cart/add/", { product_id, quantity });
  return res.data;
}

export async function updateCartItemQty(item_id: number, quantity: number) {
  const res = await api.patch(`/cart/items/${item_id}/`, { quantity });
  return res.data;
}

export async function removeCartItem(item_id: number) {
  const res = await api.delete(`/cart/items/${item_id}/remove/`);
  return res.data;
}