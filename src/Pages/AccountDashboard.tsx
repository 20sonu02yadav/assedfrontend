import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import React, { useState, useEffect } from "react";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

export default function AccountDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogout() {
    logout();
    navigate("/my-account");
  }

  const fullName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || user?.username || "User";

  return (
    <div style={styles.page}>
      <section
        style={{
          ...styles.hero,
          backgroundImage: `url(${HERO_BG})`,
          height: isMobile ? 300 : 430,
        }}
      >
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1
            style={{
              ...styles.heroTitle,
              fontSize: isMobile ? 36 : 66,
            }}
          >
            My Account
          </h1>
          <p style={styles.heroSub}>
            Manage your profile, orders, addresses and account details.
          </p>
        </div>
      </section>

      <main style={styles.main}>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "320px 1fr",
          }}
        >
          <aside style={styles.sidebar}>
            <button style={{ ...styles.sideItem, ...styles.activeItem }}>
              Dashboard
            </button>

            <button style={styles.sideItem} onClick={() => navigate("/orders")}>
              Orders
            </button>

            <button style={styles.sideItem} onClick={() => navigate("/my-account")}>
              Account details
            </button>

            <button style={styles.sideItem} onClick={() => navigate("/checkout")}>
              Addresses
            </button>

            <button style={styles.sideItem} onClick={() => navigate("/cart")}>
              Cart
            </button>

            <button style={styles.sideItem} onClick={handleLogout}>
              Log out
            </button>
          </aside>

          <section style={styles.contentCard}>
            <p style={styles.helloText}>
              Hello <strong>{fullName}</strong>
              {user?.username ? (
                <>
                  {" "}
                  (not {user.username}?{" "}
                  <span style={styles.inlineLogout} onClick={handleLogout}>
                    Log out
                  </span>
                  )
                </>
              ) : null}
            </p>

            <p style={styles.desc}>
              From your account dashboard you can view your recent orders,
              manage your billing and delivery addresses, and edit your profile details.
            </p>

            <div style={styles.buttonRow}>
              <button style={styles.primaryBtn} onClick={() => navigate("/orders")}>
                View Orders
              </button>

              <button style={styles.secondaryBtn} onClick={() => navigate("/cart")}>
                Go to Cart
              </button>

              <button style={styles.secondaryBtn} onClick={() => navigate("/store")}>
                Continue Shopping
              </button>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoTitle}>Account Information</div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Name:</span>
                <span>{fullName}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Username:</span>
                <span>{user?.username || "-"}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email:</span>
                <span>{user?.email || "-"}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Mobile:</span>
                <span>{user?.mobile_no || "-"}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Role:</span>
                <span>{user?.role || "-"}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    color: "#111827",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  hero: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
    transition: "height 0.3s ease",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    position: "relative",
    textAlign: "center",
    color: "#fff",
    padding: "0 18px",
    width: "100%",
  },
  heroTitle: {
    fontWeight: 800,
    margin: 0,
    letterSpacing: 0.2,
    textShadow: "0 4px 18px rgba(0,0,0,0.35)",
    transition: "font-size 0.3s ease",
  },
  heroSub: {
    marginTop: 10,
    fontSize: 16,
    opacity: 0.95,
    textShadow: "0 4px 14px rgba(0,0,0,0.35)",
  },
  main: {
    maxWidth: 1220,
    margin: "0 auto",
    padding: "40px 16px 60px",
  },
  grid: {
    display: "grid",
    gap: 32,
    alignItems: "start",
  },
  sidebar: {
    border: "1px solid #e5e7eb",
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  sideItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 20px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 15,
    cursor: "pointer",
    color: "#111827",
    transition: "background 0.2s",
  },
  activeItem: {
    color: "#0b76c5",
    fontWeight: 700,
    background: "#f0f7ff",
  },
  contentCard: {
    background: "#fff",
    padding: "0",
  },
  helloText: {
    fontSize: 18,
    lineHeight: 1.7,
    margin: 0,
    color: "#111827",
  },
  inlineLogout: {
    color: "#0b76c5",
    cursor: "pointer",
    fontWeight: 700,
  },
  desc: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4b5563",
    maxWidth: 760,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  primaryBtn: {
    height: 46,
    padding: "0 24px",
    border: "none",
    borderRadius: 999,
    background: "#0b76c5",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  secondaryBtn: {
    height: 46,
    padding: "0 24px",
    border: "1px solid #d1d5db",
    borderRadius: 999,
    background: "#fff",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  },
  infoBox: {
    marginTop: 34,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 20,
    background: "#fafafa",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 16,
  },
  infoRow: {
    display: "flex",
    gap: 10,
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },
  infoLabel: {
    minWidth: 100,
    fontWeight: 700,
    color: "#374151",
  },
};