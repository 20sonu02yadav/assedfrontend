import { api } from "./api";

export type CartItem = {
  id: number;
  product: number;
  product_title: string;
  quantity: number;
};

export type Cart = {
  id: number;
  items: CartItem[];
};

export async function getCart(): Promise<Cart> {
  const res = await api.get("/cart/");
  return res.data;
}

export async function addToCart(product_id: number, quantity = 1) {
  const res = await api.post("/cart/add/", { product_id, quantity });
  return res.data;
}