// import axios from "axios";

// const API_BASE_URL = "https://attenbackend.clickconnectmedia.cloud/api";

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// export function setAuthToken(accessToken: string | null) {
//   if (accessToken) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// }

// export type Role = "Individual Customer" | "B2B";

// /* --------------------------------
//    HELPERS
// -------------------------------- */

// function onlyDigits(value: string) {
//   return String(value || "").replace(/\D/g, "");
// }

// function normalizeIndianMobile(value: string) {
//   const mobile = onlyDigits(value);

//   // 9876543210 -> +919876543210
//   if (mobile.length === 10) {
//     return `+91${mobile}`;
//   }

//   // 919876543210 -> +919876543210
//   if (mobile.length === 12 && mobile.startsWith("91")) {
//     return `+${mobile}`;
//   }

//   // already maybe valid-ish
//   if (value.startsWith("+")) {
//     return value.trim();
//   }

//   return value.trim();
// }

// /* --------------------------------
//    OTP
// -------------------------------- */

// export async function sendOtp(payload: {
//   mobile_no: string;
//   purpose: "register" | "login";
// }) {
//   const res = await api.post("/auth/send-otp/", {
//     mobile_no: normalizeIndianMobile(payload.mobile_no),
//     purpose: payload.purpose,
//   });
//   return res.data;
// }

// export async function verifyOtp(payload: {
//   mobile_no: string;
//   otp_code: string;
//   purpose: "register" | "login";
// }) {
//   const res = await api.post("/auth/verify-otp/", {
//     mobile_no: normalizeIndianMobile(payload.mobile_no),
//     otp_code: String(payload.otp_code || "").trim(),
//     purpose: payload.purpose,
//   });
//   return res.data;
// }

// /* --------------------------------
//    AUTH
// -------------------------------- */

// export async function registerUser(payload: {
//   email?: string;
//   mobile_no: string;
//   role: Role;
//   password: string;
//   confirm_password: string;
// }) {
//   const finalPayload = {
//     ...payload,
//     email: payload.email?.trim() || "",
//     mobile_no: normalizeIndianMobile(payload.mobile_no),
//     password: payload.password,
//     confirm_password: payload.confirm_password,
//   };

//   const res = await api.post("/auth/register/", finalPayload);
//   return res.data;
// }

// export async function loginUser(payload: {
//   username_or_email_or_mobile: string;
//   password: string;
// }) {
//   const raw = payload.username_or_email_or_mobile?.trim() || "";
//   const digits = onlyDigits(raw);

//   const finalIdentifier =
//     digits.length === 10 || (digits.length === 12 && digits.startsWith("91"))
//       ? normalizeIndianMobile(raw)
//       : raw;

//   const res = await api.post("/auth/login/", {
//     username_or_email_or_mobile: finalIdentifier,
//     password: payload.password,
//   });

//   return res.data;
// }

// export async function loginWithOtp(payload: {
//   mobile_no: string;
//   otp_code: string;
// }) {
//   const res = await api.post("/auth/login-otp/", {
//     mobile_no: normalizeIndianMobile(payload.mobile_no),
//     otp_code: String(payload.otp_code || "").trim(),
//     purpose: "login",
//   });

//   return res.data;
// }

// export async function fetchMe() {
//   const res = await api.get("/auth/me/");
//   return res.data.user;
// }

// /* --------------------------------
//    TOKEN STORAGE
// -------------------------------- */

// export function storeTokens({
//   access,
//   refresh,
//   remember = true,
// }: {
//   access: string;
//   refresh?: string;
//   remember?: boolean;
// }) {
//   const storage = remember ? localStorage : sessionStorage;

//   storage.setItem("access_token", access);

//   if (refresh) {
//     storage.setItem("refresh_token", refresh);
//   }

//   setAuthToken(access);
// }

// export function getStoredAccessToken(): string | null {
//   return (
//     localStorage.getItem("access_token") ||
//     sessionStorage.getItem("access_token")
//   );
// }

// export function clearTokens() {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");

//   sessionStorage.removeItem("access_token");
//   sessionStorage.removeItem("refresh_token");

//   setAuthToken(null);
// }

// const stored = getStoredAccessToken();
// if (stored) {
//   setAuthToken(stored);
// }

// export async function getMe() {
//   const res = await api.get("/auth/me/");
//   return res.data;
// }

// export async function forgotPassword(payload: { email: string }) {
//   const res = await api.post("/auth/forgot-password/", payload);
//   return res.data;
// }

// export async function resetPassword(payload: {
//   uid: string;
//   token: string;
//   password: string;
//   confirm_password: string;
// }) {
//   const res = await api.post("/auth/reset-password/", payload);
//   return res.data;
// }

import axios from "axios";

const API_BASE_URL = "https://attenbackend.clickconnectmedia.cloud/api";

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

/* --------------------------------
   HELPERS
-------------------------------- */

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

/**
 * Accepts:
 * 9876543210          -> +919876543210
 * 919876543210        -> +919876543210
 * +919876543210       -> +919876543210
 * +1 5551234567       -> +15551234567
 * 15551234567         -> +15551234567
 */
export function normalizeMobile(value: string) {
  const raw = String(value || "").trim();

  if (!raw) return "";

  // already with +
  if (raw.startsWith("+")) {
    return `+${onlyDigits(raw)}`;
  }

  const digits = onlyDigits(raw);

  // India local number
  if (digits.length === 10) {
    return `+91${digits}`;
  }

  // India with 91
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  // any other international number user typed without +
  if (digits.length > 10) {
    return `+${digits}`;
  }

  return raw;
}

/* --------------------------------
   OTP
-------------------------------- */

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

/* --------------------------------
   AUTH
-------------------------------- */

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
    password: payload.password,
    confirm_password: payload.confirm_password,
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

/* --------------------------------
   TOKEN STORAGE
-------------------------------- */

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



