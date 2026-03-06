// src/services/addressApi.ts
import { api } from "./api";

export type Address = {
  id: number;
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  label?: string; // optional
};

export async function listAddresses(): Promise<Address[]> {
  const res = await api.get("/addresses/");
  return res.data;
}

// optional backward compatibility
export const fetchAddresses = listAddresses;

export async function createAddress(
  payload: Omit<Address, "id" | "created_at">
) {
  const res = await api.post("/addresses/", payload);
  return res.data;
}

export async function updateAddress(id: number, payload: Partial<Address>) {
  const res = await api.patch(`/addresses/${id}/`, payload);
  return res.data;
}

export async function deleteAddress(id: number) {
  const res = await api.delete(`/addresses/${id}/`);
  return res.data;
}