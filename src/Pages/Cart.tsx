import React, { useEffect, useMemo, useState } from "react";
import {
  getCart,
  removeCartItem,
  updateCartItemQty,
  type Cart,
} from "../services/cartApi";
import { useNavigate } from "react-router-dom";

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹ ${n.toFixed(2)}`;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Responsive state track karne ke liye
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function load() {
    setLoading(true);
    try {
      const c = await getCart();
      setCart(c);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeQty(itemId: number, qty: number) {
    if (qty < 1) return;
    setBusyId(itemId);
    try {
      await updateCartItemQty(itemId, qty);
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function remove(itemId: number) {
    setBusyId(itemId);
    try {
      await removeCartItem(itemId);
      await load();
    } finally {
      setBusyId(null);
    }
  }

  const grandTotal = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((sum, it) => {
      return sum + Number(it.line_total || Number(it.unit_price || 0) * it.quantity);
    }, 0);
  }, [cart]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
        <h1>My Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 20 }}>My Cart</h1>

      <div
        style={{
          display: "grid",
          // Mobile par 1 column, Desktop par 2 columns
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.6fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT - CART ITEMS */}
        <div style={{ display: "grid", gap: 14 }}>
          {cart.items.map((it) => {
            const unitPrice = Number(it.unit_price || 0);
            const lineTotal = Number(it.line_total || unitPrice * it.quantity);

            return (
              <div
                key={it.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 16,
                  background: "#fff",
                  display: "grid",
                  // Mobile par image choti, Desktop par normal
                  gridTemplateColumns: isMobile ? "90px 1fr" : "120px 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <img
                    src={it.product_image || "https://via.placeholder.com/200x200?text=No+Image"}
                    alt={it.product_title}
                    style={{
                      width: "100%",
                      height: isMobile ? 90 : 110,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid #eee",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 900 }}>
                      {it.product_title}
                    </div>
                    {it.product_slug ? (
                      <div style={{ color: "#6b7280", marginTop: 4, fontSize: isMobile ? 13 : 14 }}>
                        Product: {it.product_slug}
                      </div>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>Unit Price</div>
                      <div style={{ fontWeight: 800 }}>{money(unitPrice)}</div>
                    </div>

                    <div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>Quantity</div>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid #d1d5db",
                          borderRadius: 999,
                          overflow: "hidden",
                          marginTop: 4,
                        }}
                      >
                        <button
                          onClick={() => changeQty(it.id, it.quantity - 1)}
                          disabled={busyId === it.id || it.quantity <= 1}
                          style={qtyBtnStyle}
                        >
                          −
                        </button>

                        <div
                          style={{
                            minWidth: 40,
                            textAlign: "center",
                            fontWeight: 900,
                            padding: "0 10px",
                          }}
                        >
                          {it.quantity}
                        </div>

                        <button
                          onClick={() => changeQty(it.id, it.quantity + 1)}
                          disabled={busyId === it.id}
                          style={qtyBtnStyle}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>Total</div>
                      <div style={{ fontWeight: 900 }}>{money(lineTotal)}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: isMobile ? 8 : 0 }}>
                    <button
                      onClick={() => remove(it.id)}
                      disabled={busyId === it.id}
                      style={{
                        height: isMobile ? 36 : 40,
                        padding: "0 16px",
                        borderRadius: 10,
                        border: "1px solid #fecaca",
                        background: "#fef2f2",
                        color: "#991b1b",
                        fontWeight: 900,
                        cursor: "pointer",
                        width: isMobile ? "100%" : "auto", // Mobile pe full width button
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT - PRICE SUMMARY */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
            // Mobile par static aur Desktop par sticky rahega
            position: isMobile ? "static" : "sticky",
            top: 90,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
            Price Details
          </div>

          <div style={rowStyle}>
            <span>Items</span>
            <span>{cart.items.length}</span>
          </div>

          <div style={rowStyle}>
            <span>Total Quantity</span>
            <span>{cart.items.reduce((sum, it) => sum + it.quantity, 0)}</span>
          </div>

          <div style={rowStyle}>
            <span>Subtotal</span>
            <span>{money(grandTotal)}</span>
          </div>

          <hr style={{ margin: "14px 0", borderColor: "#eee" }} />

          <div style={{ ...rowStyle, fontWeight: 900, fontSize: 18 }}>
            <span>Grand Total</span>
            <span>{money(grandTotal)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: 16,
              width: "100%",
              height: 48,
              borderRadius: 12,
              border: "none",
              background: "#0b76c5",
              color: "#fff",
              fontWeight: 900,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  border: "none",
  background: "#f9fafb",
  fontSize: 20,
  fontWeight: 900,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};