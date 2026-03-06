// src/services/paymentApi.ts
import { api } from "./api";

export async function createRazorpayOrder() {
  const res = await api.post("/payment/create-order/", {});
  return res.data; // {id, amount, currency...}
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  address_id: number;
}) {
  const res = await api.post("/payment/verify/", payload);
  return res.data; // { message, order }
}