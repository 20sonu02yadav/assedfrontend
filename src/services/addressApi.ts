import { api } from "./api";

export type AddressType = "billing" | "delivery";

export type Address = {
  id: number;
  address_type: AddressType;
  label?: string;
  full_name: string;
  phone: string;
  gstin?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
};

export type PincodeLookupResult = {
  postal_code: string;
  line1_suggestion?: string;
  city: string;
  state: string;
  country: string;
};

export async function listAddresses(addressType?: AddressType): Promise<Address[]> {
  const query = addressType ? `?address_type=${addressType}` : "";
  const res = await api.get(`/addresses/${query}`);
  return res.data;
}

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

export async function lookupPincode(pincode: string): Promise<PincodeLookupResult> {
  const res = await api.get(`/utils/pincode/${pincode}/`);
  return res.data;
}