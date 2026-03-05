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
  country?: string;
  label?: string;       // ✅ Home/Office ko optional rakho
  is_default?: boolean;
  created_at?: string;
};

export async function listAddresses(): Promise<Address[]> {
  const res = await api.get("/addresses/");
  // backend may return {results: []} if paginated
  return Array.isArray(res.data) ? res.data : res.data?.results || [];
}
export const fetchAddresses = listAddresses;
export async function createAddress(payload: Omit<Address, "id">) {
  const res = await api.post("/addresses/", payload);
  return res.data as Address;
}

export async function updateAddress(id: number, payload: Partial<Address>) {
  const res = await api.patch(`/addresses/${id}/`, payload);
  return res.data as Address;
}

export async function deleteAddress(id: number) {
  const res = await api.delete(`/addresses/${id}/`);
  return res.data;
}

export async function setDefaultAddress(id: number) {
  // if you don't have this endpoint, skip this function.
  // but best is to keep it.
  const res = await api.post(`/addresses/${id}/set-default/`);
  return res.data;
}