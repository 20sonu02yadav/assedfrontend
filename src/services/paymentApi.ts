// src/services/paymentApi.ts
import { api } from "./api";

export type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt?: string;
};

export async function createRazorpayOrder() {
  const res = await api.post("/payment/create-order/");
  return res.data as RazorpayOrderResponse;
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  address_id: number; // optional (recommended)
}) {
  const res = await api.post("/payment/verify/", payload);
  return res.data;
}