import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AccountDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <h1>Dashboard</h1>
      <p>
        Logged in as <b>{user?.username}</b> ({user?.email}) — <b>{user?.role}</b>
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/orders")}>Order History</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
        <button onClick={() => navigate("/store")}>Store</button>
        <button
          onClick={() => {
            logout();
            navigate("/my-account");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}