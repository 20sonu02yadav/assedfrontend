import React, { useEffect, useState } from "react";
import { fetchProducts, type ProductListItem } from "../services/storeApi";
import { addToCart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";

export default function Store() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [busyId, setBusyId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setItems(data);

        const initialQty: Record<number, number> = {};
        data.forEach((p) => {
          initialQty[p.id] = 1;
        });
        setQtyMap(initialQty);
      })
      .finally(() => setLoading(false));
  }, []);

  function setQty(productId: number, qty: number) {
    setQtyMap((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  }

  async function handleAddToCart(productId: number) {
    try {
      setBusyId(productId);
      await addToCart(productId, qtyMap[productId] || 1);
      alert("Added to cart ✅");
    } catch (e) {
      alert("Please login to add to cart.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <div style={{ padding: 40 }}>Loading products...</div>;

  return (
    <div style={{ maxWidth: 1250, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 20 }}>Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 18,
          marginTop: 20,
        }}
      >
        {items.map((p) => {
          const qty = qtyMap[p.id] || 1;

          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 14,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <img
                  src={p.image || "https://via.placeholder.com/400x280?text=No+Image"}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid #eee",
                  }}
                />

                <h3 style={{ margin: "12px 0 4px", fontSize: 20 }}>{p.title}</h3>

                <div style={{ fontSize: 14, color: "#6b7280" }}>{p.brand}</div>

                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <b style={{ fontSize: 20 }}>₹{Number(p.sale_price).toFixed(2)}</b>
                  <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>
                    ₹{Number(p.mrp).toFixed(2)}
                  </span>
                  {p.discount_percent ? (
                    <span style={{ color: "#16a34a", fontWeight: 800 }}>
                      {p.discount_percent}% off
                    </span>
                  ) : null}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid #d1d5db",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setQty(p.id, qty - 1)}
                    style={qtyBtnStyle}
                  >
                    −
                  </button>

                  <div
                    style={{
                      minWidth: 46,
                      textAlign: "center",
                      fontWeight: 900,
                      padding: "0 10px",
                    }}
                  >
                    {qty}
                  </div>

                  <button
                    onClick={() => setQty(p.id, qty + 1)}
                    style={qtyBtnStyle}
                  >
                    +
                  </button>
                </div>

                <button
                  style={{
                    flex: 1,
                    height: 44,
                    borderRadius: 12,
                    border: "none",
                    background: "#0b76c5",
                    color: "#fff",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                  disabled={busyId === p.id}
                  onClick={() => handleAddToCart(p.id)}
                >
                  {busyId === p.id ? "Adding..." : `Add ${qty} to Cart`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  border: "none",
  background: "#f9fafb",
  fontSize: 22,
  fontWeight: 900,
  cursor: "pointer",
};