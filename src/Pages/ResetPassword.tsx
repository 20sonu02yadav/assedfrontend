import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/api";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

export default function ResetPasswordPage() {
  const { uid = "", token = "" } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const mismatch = useMemo(() => {
    if (!password || !confirmPassword) return false;
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    if (mismatch) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await resetPassword({
        uid,
        token,
        password,
        confirm_password: confirmPassword,
      });

      setMsg(res?.message || "Password reset successful.");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/my-account");
      }, 1800);
    } catch (err: any) {
      const d = err?.response?.data;
      setError(
        d?.password ||
          d?.confirm_password ||
          d?.token ||
          d?.uid ||
          d?.detail ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <section style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Reset Password</h1>
          <p style={styles.heroSub}>Set your new password below.</p>
        </div>
      </section>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create new password</h2>

          {msg ? <div style={styles.success}>{msg}</div> : null}
          {error ? <div style={styles.error}>{error}</div> : null}

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />

            {mismatch ? <div style={styles.error}>Passwords do not match.</div> : null}

            <button type="submit" disabled={loading || mismatch} style={styles.button}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#fff", fontFamily: "Inter, sans-serif" },
  hero: {
    height: 360,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
  },
  heroOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" },
  heroContent: { position: "relative", textAlign: "center", color: "#fff" },
  heroTitle: { fontSize: 58, fontWeight: 800, margin: 0 },
  heroSub: { marginTop: 10, fontSize: 18 },
  main: { maxWidth: 700, margin: "0 auto", padding: "60px 20px" },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 28,
    background: "#fff",
  },
  cardTitle: { margin: "0 0 20px", fontSize: 30, fontWeight: 800 },
  form: { display: "grid", gap: 14 },
  label: { fontWeight: 700, fontSize: 16 },
  input: {
    width: "100%",
    height: 52,
    border: "1px solid #d1d5db",
    borderRadius: 12,
    padding: "0 14px",
    fontSize: 16,
    boxSizing: "border-box",
  },
  button: {
    height: 48,
    border: "none",
    borderRadius: 999,
    background: "#0b76c5",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 8,
  },
  success: {
    background: "#ecfdf5",
    color: "#065f46",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontWeight: 600,
  },
  error: {
    background: "#fef2f2",
    color: "#991b1b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontWeight: 600,
  },
};