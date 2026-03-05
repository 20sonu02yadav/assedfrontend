import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById, type Order } from "../services/orderApi";

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

export default function OrderDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchOrderById(id);
      setOrder(data);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Auto refresh tracking every 10s (real tracking feel)
  useEffect(() => {
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Loading order...</div>;
  if (!order) return <div style={{ padding: 40 }}>Order not found.</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Order #{order.id}</h1>
          <div style={{ marginTop: 6, color: "#6b7280" }}>
            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 900 }}>{statusLabel(order.status)}</div>
          <div style={{ marginTop: 6, fontWeight: 900 }}>₹ {order.total_amount}</div>
        </div>
      </div>

      {/* Tracking */}
      <div
        style={{
          marginTop: 18,
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          padding: 14,
          background: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Tracking</h2>

        {order.tracking_number ? (
          <div style={{ display: "grid", gap: 6, color: "#111" }}>
            <div><b>Courier:</b> {order.courier_name || "-"}</div>
            <div><b>Tracking No:</b> {order.tracking_number}</div>
            {order.tracking_url ? (
              <a href={order.tracking_url} target="_blank" rel="noreferrer">
                Open Tracking Link
              </a>
            ) : null}
          </div>
        ) : (
          <div style={{ color: "#6b7280" }}>
            Tracking details will appear after shipment.
          </div>
        )}

        {/* Timeline */}
        <div style={{ marginTop: 14 }}>
          <h3 style={{ margin: "10px 0" }}>Order Timeline</h3>

          <div style={{ display: "grid", gap: 10 }}>
            {(order.history || []).map((h) => (
              <div
                key={h.id}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "#fafafa",
                }}
              >
                <div style={{ fontWeight: 900 }}>{statusLabel(h.status)}</div>
                <div style={{ marginTop: 4, color: "#374151" }}>{h.note}</div>
                <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                  {new Date(h.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          marginTop: 18,
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          padding: 14,
          background: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Items</h2>

        <div style={{ display: "grid", gap: 10 }}>
          {order.items.map((it) => (
            <div
              key={it.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ fontWeight: 900 }}>{it.product_title}</div>
              <div style={{ marginTop: 4, color: "#374151" }}>
                Qty: {it.quantity} • Price: ₹ {it.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}