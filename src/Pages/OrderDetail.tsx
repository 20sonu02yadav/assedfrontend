import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrderDetail, type OrderDetail } from "../services/orderApi";

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

function getStatusSteps(status: string) {
  const all = ["paid", "processing", "shipped", "out_for_delivery", "delivered"];
  const currentIndex = Math.max(0, all.indexOf(status));
  return { all, currentIndex };
}

function Step({
  label,
  active,
  last,
}: {
  label: string;
  active: boolean;
  last?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: active ? "#16a34a" : "#d1d5db",
            border: active ? "2px solid #16a34a" : "2px solid #d1d5db",
          }}
        />
        {!last && (
          <div
            style={{
              width: 2,
              height: 34,
              marginTop: 4,
              background: active ? "#16a34a" : "#e5e7eb",
            }}
          />
        )}
      </div>

      <div style={{ paddingBottom: last ? 0 : 18 }}>
        <div style={{ fontWeight: 900, color: active ? "#111827" : "#6b7280" }}>{label}</div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = Number(id);

  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadOrder() {
    setLoading(true);
    try {
      const d = await fetchOrderDetail(orderId);
      setData(d);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
    const timer = setInterval(loadOrder, 10000);
    return () => clearInterval(timer);
  }, [orderId]);

  const totalQty = useMemo(() => {
    return data?.items?.reduce((sum, it) => sum + (it.quantity || 0), 0) ?? 0;
  }, [data]);

  if (loading) return <div style={{ padding: 40 }}>Loading order...</div>;
  if (!data) return <div style={{ padding: 40 }}>Order not found.</div>;

  const { all, currentIndex } = getStatusSteps(data.status);

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16, display: "grid", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <button
            onClick={() => navigate("/orders")}
            style={{
              marginBottom: 12,
              border: "1px solid #e5e7eb",
              background: "#fff",
              borderRadius: 10,
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            ← Back to Orders
          </button>

          <h1 style={{ margin: 0, fontSize: 38, fontWeight: 900 }}>Order #{data.id}</h1>
          <div style={{ marginTop: 8, color: "#6b7280" }}>
            {new Date(data.created_at).toLocaleString()}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>{formatStatus(data.status)}</div>
          <div style={{ marginTop: 8, fontWeight: 900, fontSize: 24 }}>
            {formatMoney(data.total_amount)}
          </div>
          <div style={{ marginTop: 6, color: "#6b7280" }}>Total Qty: {totalQty}</div>
        </div>
      </div>

      {/* Top layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* Tracking */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, background: "#fff" }}>
          <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 16 }}>Order Tracking</div>

          <div style={{ display: "grid", gap: 2 }}>
            {all.map((s, idx) => (
              <Step
                key={s}
                label={s.replaceAll("_", " ").toUpperCase()}
                active={idx <= currentIndex}
                last={idx === all.length - 1}
              />
            ))}
          </div>

          {data.history?.length ? (
            <>
              <hr style={{ margin: "18px 0", borderColor: "#eee" }} />
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Status Updates</div>

              <div style={{ display: "grid", gap: 10 }}>
                {data.history.map((h) => (
                  <div
                    key={h.id}
                    style={{
                      border: "1px solid #f1f5f9",
                      background: "#fafafa",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontWeight: 900, textTransform: "capitalize" }}>
                      {formatStatus(h.status)}
                    </div>
                    <div style={{ marginTop: 4, color: "#374151" }}>{h.note}</div>
                    <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                      {new Date(h.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Delivery + payment */}
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, background: "#fff" }}>
            <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 12 }}>Delivery Address</div>

            <div style={{ color: "#374151", lineHeight: 1.7 }}>
              <b>{data.shipping_full_name}</b> — {data.shipping_phone}
              <br />
              {data.shipping_line1}
              {data.shipping_line2 ? `, ${data.shipping_line2}` : ""}
              <br />
              {data.shipping_city}, {data.shipping_state} - {data.shipping_postal_code}
              <br />
              {data.shipping_country}
            </div>
          </div>

          <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, background: "#fff" }}>
            <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 12 }}>Payment Details</div>

            <div style={{ display: "grid", gap: 10 }}>
              <div style={detailRow}>
                <span>Order ID</span>
                <span>{data.razorpay_order_id || "-"}</span>
              </div>
              <div style={detailRow}>
                <span>Payment ID</span>
                <span>{data.razorpay_payment_id || "-"}</span>
              </div>
              <div style={detailRow}>
                <span>Status</span>
                <span>{formatStatus(data.status)}</span>
              </div>
              <div style={{ ...detailRow, fontWeight: 900 }}>
                <span>Total Paid</span>
                <span>{formatMoney(data.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, background: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 24, marginBottom: 16 }}>Ordered Items</div>

        {data.items?.length ? (
          <div style={{ display: "grid", gap: 14 }}>
            {data.items.map((it) => {
              const img = it.product_image || "https://via.placeholder.com/180x180?text=No+Image";
              const qty = Number(it.quantity || 0);
              const unit = Number(it.price || 0);
              const line = qty * unit;

              return (
                <div
                  key={it.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 14,
                    padding: 14,
                    display: "grid",
                    gridTemplateColumns: "110px 1fr auto",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={img}
                    alt={it.product_title}
                    style={{
                      width: 110,
                      height: 110,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid #eee",
                    }}
                  />

                  <div>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>{it.product_title}</div>
                    {it.product_slug ? (
                      <div style={{ color: "#6b7280", marginTop: 4 }}>{it.product_slug}</div>
                    ) : null}

                    <div style={{ marginTop: 10, color: "#374151" }}>
                      Qty: <b>{qty}</b>
                    </div>
                    <div style={{ marginTop: 4, color: "#374151" }}>
                      Unit Price: <b>{formatMoney(unit)}</b>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Item Total</div>
                    <div style={{ fontWeight: 900, fontSize: 20 }}>{formatMoney(line)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No items found in this order.</p>
        )}
      </div>
    </div>
  );
}

const detailRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
};