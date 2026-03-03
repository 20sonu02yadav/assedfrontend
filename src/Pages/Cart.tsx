// src/Pages/Cart.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateQty, removeFromCart, clearCart, type CartItem } from "../services/cart";

function fmtINR(n: number) {
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("en-IN");
}

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(() => getCart());

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("cart:changed", sync as EventListener);
    return () => window.removeEventListener("cart:changed", sync as EventListener);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0),
    [items]
  );

  const gstTotal = useMemo(() => {
    return items.reduce((s, it) => {
      const pct = Number(it.gstPercent) || 0;
      const line = (Number(it.price) || 0) * (Number(it.qty) || 0);
      return s + (line * pct) / 100;
    }, 0);
  }, [items]);

  const total = subtotal + gstTotal;

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Cart</h1>
        <button onClick={() => navigate("/store")} style={btnLight}>
          ← Continue Shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ marginTop: 18, padding: 18, background: "#fff", borderRadius: 14 }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
            {items.map((it) => (
              <div key={it.productId} style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={imgBox}>
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : null}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900 }}>{it.title}</div>
                    <div style={{ marginTop: 6, opacity: 0.75 }}>
                      ₹{fmtINR(Number(it.price) || 0)}{" "}
                      {it.gstPercent ? `• GST ${it.gstPercent}%` : ""}
                    </div>
                  </div>

                  <div style={qtyWrap}>
                    <button
                      style={qtyBtn}
                      onClick={() => updateQty(it.productId, (it.qty || 1) - 1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <div style={{ width: 42, textAlign: "center", fontWeight: 900 }}>
                      {it.qty}
                    </div>
                    <button
                      style={qtyBtn}
                      onClick={() => updateQty(it.productId, (it.qty || 1) + 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <div style={{ width: 160, textAlign: "right" }}>
                    <div style={{ fontWeight: 900 }}>
                      ₹{fmtINR((Number(it.price) || 0) * (Number(it.qty) || 0))}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                      GST: ₹
                      {fmtINR(
                        (((Number(it.price) || 0) * (Number(it.qty) || 0)) *
                          (Number(it.gstPercent) || 0)) /
                          100)
                      }
                    </div>
                  </div>

                  <button style={btnDanger} onClick={() => removeFromCart(it.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
            <div style={summary}>
              <div style={row}>
                <span>Subtotal</span>
                <b>₹{fmtINR(subtotal)}</b>
              </div>
              <div style={row}>
                <span>GST</span>
                <b>₹{fmtINR(gstTotal)}</b>
              </div>
              <div style={{ ...row, fontSize: 18 }}>
                <span>Total</span>
                <b>₹{fmtINR(total)}</b>
              </div>

              {/* Payment later */}
              <button style={btnPrimary} onClick={() => alert("Payment later. Cart working ✅")}>
                Checkout
              </button>

              <button style={btnLight} onClick={() => clearCart()}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
  padding: 14,
};

const imgBox: React.CSSProperties = {
  width: 86,
  height: 86,
  borderRadius: 12,
  background: "#f5f6f8",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
};

const qtyWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#f3f4f6",
  borderRadius: 999,
  padding: "8px 10px",
};

const qtyBtn: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontWeight: 900,
};

const summary: React.CSSProperties = {
  width: 360,
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
  display: "grid",
  gap: 12,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btnPrimary: React.CSSProperties = {
  height: 48,
  borderRadius: 12,
  border: "none",
  background: "#2f6fed",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer",
};

const btnLight: React.CSSProperties = {
  height: 44,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#fff",
  fontWeight: 900,
  cursor: "pointer",
  padding: "0 14px",
};

const btnDanger: React.CSSProperties = {
  height: 40,
  borderRadius: 12,
  border: "none",
  background: "#ffe3e3",
  color: "#b42318",
  fontWeight: 900,
  cursor: "pointer",
  padding: "0 12px",
};