import { api } from "./api";

export async function createRazorpayOrder() {
  const res = await api.post("/payment/create-order/");
  return res.data;
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  billing_address_id: number;
  delivery_address_id?: number | null;
  same_as_billing: boolean;
}) {
  const res = await api.post("/payment/verify/", payload);
  return res.data;
}