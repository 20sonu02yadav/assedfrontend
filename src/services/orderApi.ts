import { api } from "./api";

export type OrderItem = {
  id: number;
  product_title: string;
  product_slug?: string;
  product_image?: string | null;
  price: string;
  quantity: number;
};

export type OrderHistory = {
  id: number;
  status: string;
  note: string;
  created_at: string;
};

export type Order = {
  id: number;
  status: string;
  total_amount: string;
  created_at: string;
  items: OrderItem[];
};

export type OrderDetail = Order & {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_line1: string;
  shipping_line2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  history: OrderHistory[];
};

export async function fetchOrders(): Promise<Order[]> {
  const res = await api.get("/orders/");
  return res.data;
}

export async function fetchOrderDetail(id: number): Promise<OrderDetail> {
  const res = await api.get(`/orders/${id}/`);
  return res.data;
}