import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------
   AUTH TOKEN HANDLING
--------------------------------*/

export function setAuthToken(accessToken: string | null) {
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

/* -------------------------------
   TOKEN STORAGE
--------------------------------*/

export function storeTokens({
  access,
  refresh,
  remember = true,
}: {
  access: string;
  refresh?: string;
  remember?: boolean;
}) {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem("access_token", access);

  if (refresh) {
    storage.setItem("refresh_token", refresh);
  }

  setAuthToken(access);
}

export function getStoredAccessToken(): string | null {
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");

  setAuthToken(null);
}

/* -------------------------------
   AUTO LOAD TOKEN ON PAGE REFRESH
--------------------------------*/

const stored = getStoredAccessToken();
if (stored) {
  setAuthToken(stored);
}

/* -------------------------------
   AUTH API
--------------------------------*/

export async function getMe() {
  const res = await api.get("/auth/me/");
  return res.data;
}

/* -------------------------------
   LOGIN
--------------------------------*/

export async function loginUser(payload: {
  username_or_email: string;
  password: string;
}) {
  const res = await api.post("/auth/login/", payload);
  return res.data;
}

/* -------------------------------
   REGISTER
--------------------------------*/

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