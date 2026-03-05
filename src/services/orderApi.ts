import { api } from "./api";

export type OrderHistory = {
  id: number;
  status: string;
  note: string;
  created_at: string;
};

export type OrderItem = {
  id: number;
  product_title: string;
  product_slug: string;
  price: string;
  quantity: number;
};

export type Order = {
  id: number;
  status: string;
  total_amount: string;
  courier_name: string;
  tracking_number: string;
  tracking_url: string;
  created_at: string;
  items: OrderItem[];
  history: OrderHistory[];
};

export async function fetchMyOrders(): Promise<Order[]> {
  const res = await api.get("/orders/");
  return res.data;
}

export async function fetchOrderById(id: number): Promise<Order> {
  const res = await api.get(`/orders/${id}/`);
  return res.data;
}