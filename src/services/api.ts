import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(accessToken: string | null) {
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export type Role = "Individual Customer" | "B2B";

export async function registerUser(payload: {
  email: string;
  role: Role;
  password: string;
  confirm_password: string;
}) {
  const res = await api.post("/auth/register/", payload);
  return res.data;
}

export async function loginUser(payload: {
  username_or_email: string;
  password: string;
}) {
  const res = await api.post("/auth/login/", payload);
  return res.data;
}

export async function fetchMe() {
  const res = await api.get("/auth/me/");
  return res.data;
}