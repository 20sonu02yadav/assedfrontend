import axios from "axios";

//const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_BASE_URL = "https://attenbackend.clickconnectmedia.cloud/api";
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

export type Role = "Individual Customer" | "B2B" | "B2C";

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

export function normalizeMobile(value: string) {
  const raw = String(value || "").trim();

  if (!raw) return "";

  if (raw.startsWith("+")) {
    return `+${onlyDigits(raw)}`;
  }

  const digits = onlyDigits(raw);

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  if (digits.length > 10) {
    return `+${digits}`;
  }

  return raw;
}

export async function sendOtp(payload: {
  mobile_no: string;
  purpose: "register" | "login";
}) {
  const res = await api.post("/auth/send-otp/", {
    mobile_no: normalizeMobile(payload.mobile_no),
    purpose: payload.purpose,
  });
  return res.data;
}

export async function verifyOtp(payload: {
  mobile_no: string;
  otp_code: string;
  purpose: "register" | "login";
}) {
  const res = await api.post("/auth/verify-otp/", {
    mobile_no: normalizeMobile(payload.mobile_no),
    otp_code: String(payload.otp_code || "").trim(),
    purpose: payload.purpose,
  });
  return res.data;
}

export async function registerUser(payload: {
  email?: string;
  mobile_no: string;
  role: Role;
  password: string;
  confirm_password: string;
}) {
  const finalPayload = {
    ...payload,
    email: payload.email?.trim() || "",
    mobile_no: normalizeMobile(payload.mobile_no),
  };

  const res = await api.post("/auth/register/", finalPayload);
  return res.data;
}

export async function loginUser(payload: {
  username_or_email_or_mobile: string;
  password: string;
}) {
  const raw = payload.username_or_email_or_mobile?.trim() || "";
  const finalIdentifier =
    raw.includes("@") ? raw : normalizeMobile(raw);

  const res = await api.post("/auth/login/", {
    username_or_email_or_mobile: finalIdentifier,
    password: payload.password,
  });

  return res.data;
}

export async function loginWithOtp(payload: {
  mobile_no: string;
  otp_code: string;
}) {
  const res = await api.post("/auth/login-otp/", {
    mobile_no: normalizeMobile(payload.mobile_no),
    otp_code: String(payload.otp_code || "").trim(),
    purpose: "login",
  });

  return res.data;
}

export async function fetchMe() {
  const res = await api.get("/auth/me/");
  return res.data.user ?? res.data;
}

export async function updateProfile(payload: {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_no?: string;
}) {
  const finalPayload = {
    ...payload,
    mobile_no: payload.mobile_no ? normalizeMobile(payload.mobile_no) : payload.mobile_no,
  };
  const res = await api.patch("/auth/profile/", finalPayload);
  return res.data;
}

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

const stored = getStoredAccessToken();
if (stored) {
  setAuthToken(stored);
}

export async function getMe() {
  const res = await api.get("/auth/me/");
  return res.data.user ?? res.data;
}

export async function forgotPassword(payload: { email: string }) {
  const res = await api.post("/auth/forgot-password/", payload);
  return res.data;
}

export async function resetPassword(payload: {
  uid: string;
  token: string;
  password: string;
  confirm_password: string;
}) {
  const res = await api.post("/auth/reset-password/", payload);
  return res.data;
}