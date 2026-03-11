import React, { useEffect, useMemo, useState } from "react";
import {
  getCart as getServerCart,
  removeCartItem,
  updateCartItemQty,
  type Cart as ServerCart,
} from "../services/cartApi";
import {
  getCart as getLocalCart,
  removeFromCart as removeLocalCartItem,
  updateQty as updateLocalCartQty,
  clearCart as _clearLocalCart,
  type CartItem as LocalCartItem,
} from "../services/cart";
import { getStoredAccessToken } from "../services/api";
import { useNavigate } from "react-router-dom";

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹ ${n.toFixed(2)}`;
}

type HybridCartItem = {
  mode: "server" | "local";
  id: number | string;
  productId: number;
  product_title: string;
  product_slug?: string;
  product_image?: string | null;
  unit_price?: string | number;
  quantity: number;
  line_total?: string | number;
};

export default function CartPage() {
  const [serverCart, setServerCart] = useState<ServerCart | null>(null);
  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | string | null>(null);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const isLoggedIn = !!getStoredAccessToken();

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
      if (getStoredAccessToken()) {
        const c = await getServerCart();
        setServerCart(c);
        setLocalItems([]);
      } else {
        setServerCart(null);
        setLocalItems(getLocalCart());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const sync = () => load();

    window.addEventListener("cart:changed", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);

    return () => {
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const items: HybridCartItem[] = useMemo(() => {
    if (isLoggedIn) {
      return (
        serverCart?.items?.map((it) => ({
          mode: "server" as const,
          id: it.id,
          productId: it.product,
          product_title: it.product_title,
          product_slug: it.product_slug,
          product_image: it.product_image,
          unit_price: it.unit_price,
          quantity: it.quantity,
          line_total: it.line_total,
        })) || []
      );
    }

    return localItems.map((it) => ({
      mode: "local" as const,
      id: it.productId,
      productId: it.productId,
      product_title: it.title,
      product_slug: it.slug,
      product_image: it.image || null,
      unit_price: it.price,
      quantity: it.qty,
      line_total: Number(it.price || 0) * Number(it.qty || 0),
    }));
  }, [isLoggedIn, serverCart, localItems]);

  async function changeQty(item: HybridCartItem, qty: number) {
    if (qty < 1) return;

    setBusyId(item.id);

    try {
      if (item.mode === "server") {
        await updateCartItemQty(Number(item.id), qty);
      } else {
        updateLocalCartQty(item.productId, qty);
        window.dispatchEvent(new Event("cart:changed"));
      }

      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function remove(item: HybridCartItem) {
    setBusyId(item.id);

    try {
      if (item.mode === "server") {
        await removeCartItem(Number(item.id));
      } else {
        removeLocalCartItem(item.productId);
        window.dispatchEvent(new Event("cart:changed"));
      }

      await load();
    } finally {
      setBusyId(null);
    }
  }

  const grandTotal = useMemo(() => {
    if (!items.length) return 0;
    return items.reduce((sum, it) => {
      return sum + Number(it.line_total || Number(it.unit_price || 0) * it.quantity);
    }, 0);
  }, [items]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading cart...</div>;
  }

  if (!items.length) {
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

      {!isLoggedIn && (
        <div
          style={{
            marginBottom: 18,
            padding: 14,
            borderRadius: 12,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e3a8a",
            fontWeight: 600,
          }}
        >
          You are using guest cart. Login/register to save cart permanently.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.6fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: 14 }}>
          {items.map((it) => {
            const unitPrice = Number(it.unit_price || 0);
            const lineTotal = Number(it.line_total || unitPrice * it.quantity);

            return (
              <div
                key={`${it.mode}-${it.id}`}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 16,
                  background: "#fff",
                  display: "grid",
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
                          onClick={() => changeQty(it, it.quantity - 1)}
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
                          onClick={() => changeQty(it, it.quantity + 1)}
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
                      onClick={() => remove(it)}
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
                        width: isMobile ? "100%" : "auto",
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

        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
            position: isMobile ? "static" : "sticky",
            top: 90,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
            Price Details
          </div>

          <div style={rowStyle}>
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div style={rowStyle}>
            <span>Total Quantity</span>
            <span>{items.reduce((sum, it) => sum + it.quantity, 0)}</span>
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
  alignItems: "center",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};