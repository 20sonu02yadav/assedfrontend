import React, { useEffect, useState } from "react";
import { fetchMyOrders, type Order } from "../services/orderApi";
import { Link } from "react-router-dom";

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: "Pending",
    paid: "Paid",
    packed: "Packed",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return map[s] || s;
}

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMyOrders();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading orders...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>My Orders</h1>

      {items.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((o) => (
            <Link
              key={o.id}
              to={`/orders/${o.id}`}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 14,
                textDecoration: "none",
                color: "#111",
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Order #{o.id}</div>
                  <div style={{ color: "#6b7280", marginTop: 4 }}>
                    {new Date(o.created_at).toLocaleString()}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900 }}>{statusLabel(o.status)}</div>
                  <div style={{ marginTop: 4 }}>₹ {o.total_amount}</div>
                </div>
              </div>

              <div style={{ marginTop: 10, color: "#374151" }}>
                Items: {o.items?.reduce((sum, it) => sum + (it.quantity || 0), 0)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}