import { useEffect, useMemo, useState } from "react";
import { fetchOrders, type Order } from "../services/orderApi";
import { useNavigate } from "react-router-dom";

function formatMoney(v?: string | number) {
  const n = Number(v || 0);
  return `₹ ${n.toFixed(2)}`;
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    pending: "Pending",
    paid: "Paid",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return map[status] || status;
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    pending: "#f59e0b",
    paid: "#2563eb",
    processing: "#7c3aed",
    shipped: "#0ea5e9",
    out_for_delivery: "#f97316",
    delivered: "#16a34a",
    cancelled: "#dc2626",
  };
  return map[status] || "#111827";
}

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalOrders = useMemo(() => items.length, [items]);

  if (loading) {
    return <div style={{ padding: "120px 20px" }}>Loading orders...</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "90px auto 40px", padding: 16 }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 900 }}>My Orders</h1>
        <p style={{ marginTop: 8, color: "#6b7280" }}>
          Total Orders: <b>{totalOrders}</b>
        </p>
      </div>

      {items.length === 0 ? (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            background: "#fff",
            padding: 24,
          }}
        >
          <p style={{ margin: 0 }}>No orders yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {items.map((o) => {
            const firstImage = o.items?.[0]?.product_image || "";
            const totalQty =
              o.items?.reduce((sum, it) => sum + Number(it.quantity || 0), 0) ?? 0;
            const firstTitle = o.items?.[0]?.product_title || "Order Item";
            const lastHistory = o.history?.length
              ? o.history[o.history.length - 1]
              : null;

            return (
              <div
                key={o.id}
                onClick={() => navigate(`/orders/${o.id}`)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  background: "#fff",
                  padding: 16,
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "110px 1fr auto",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 12,
                    border: "1px solid #eee",
                    overflow: "hidden",
                    background: "#f8fafc",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={firstTitle}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#9ca3af", fontSize: 13 }}>No Image</span>
                  )}
                </div>

                <div>
                  <div style={{ fontWeight: 900, fontSize: 20 }}>Order #{o.id}</div>

                  <div style={{ color: "#6b7280", marginTop: 6 }}>
                    Placed: {new Date(o.created_at).toLocaleString()}
                  </div>

                  {o.expected_delivery_date ? (
                    <div style={{ color: "#6b7280", marginTop: 6 }}>
                      Expected Delivery: <b>{o.expected_delivery_date}</b>
                    </div>
                  ) : null}

                  <div style={{ marginTop: 10, fontWeight: 700 }}>{firstTitle}</div>

                  <div style={{ color: "#6b7280", marginTop: 6 }}>
                    Items: <b>{o.items?.length ?? 0}</b> • Total Qty: <b>{totalQty}</b>
                  </div>

                  {lastHistory ? (
                    <div style={{ color: "#6b7280", marginTop: 8, fontSize: 14 }}>
                      Last Update:{" "}
                      <b>
                        {formatStatus(lastHistory.status)} —{" "}
                        {new Date(lastHistory.created_at).toLocaleString()}
                      </b>
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 900,
                      color: statusColor(o.status),
                      fontSize: 18,
                    }}
                  >
                    {formatStatus(o.status)}
                  </div>

                  <div style={{ marginTop: 8, fontWeight: 900, fontSize: 18 }}>
                    {formatMoney(o.total_amount)}
                  </div>

                  <div style={{ marginTop: 10, color: "#0b76c5", fontWeight: 800 }}>
                    View Details →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}