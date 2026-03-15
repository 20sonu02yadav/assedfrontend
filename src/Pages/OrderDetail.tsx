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
  const idx = all.indexOf(status);
  const currentIndex = idx >= 0 ? idx : 0;
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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 20,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: active ? "#16a34a" : "#d1d5db",
            border: active ? "2px solid #16a34a" : "2px solid #d1d5db",
            flexShrink: 0,
            marginTop: 4,
          }}
        />
        {!last && (
          <div
            style={{
              width: 2,
              height: 34,
              background: active ? "#16a34a" : "#e5e7eb",
            }}
          />
        )}
      </div>

      <div style={{ paddingBottom: last ? 0 : 22 }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 15,
            color: active ? "#111827" : "#6b7280",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function AddressCard({
  title,
  name,
  phone,
  gstin,
  line1,
  line2,
  city,
  state,
  postalCode,
  country,
}: {
  title: string;
  name?: string;
  phone?: string;
  gstin?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 20,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>
        {title}
      </div>

      <div style={{ color: "#374151", lineHeight: 1.7, fontSize: 15 }}>
        <b style={{ fontSize: 18, display: "block", marginBottom: 4 }}>
          {name || "-"}
        </b>

        {phone ? (
          <>
            {phone}
            <br />
          </>
        ) : null}

        {(line1 || line2) ? (
          <>
            {line1 || ""}
            {line2 ? `, ${line2}` : ""}
            <br />
          </>
        ) : null}

        {(city || state || postalCode) ? (
          <>
            {city || ""}
            {city || state ? ", " : ""}
            {state || ""} {postalCode ? `- ${postalCode}` : ""}
            <br />
          </>
        ) : null}

        {country || ""}

        {gstin ? (
          <>
            <br />
            <span style={{ fontWeight: 700 }}>GSTIN:</span> {gstin}
          </>
        ) : null}
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
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function loadOrder() {
    if (!orderId || Number.isNaN(orderId)) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const d = await fetchOrderDetail(orderId);
      setData(d);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      setData(null);
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
    return data?.items?.reduce((sum, it) => sum + Number(it.quantity || 0), 0) ?? 0;
  }, [data]);

  if (loading) return <div style={{ padding: "120px 20px" }}>Loading order...</div>;
  if (!data) return <div style={{ padding: "120px 20px" }}>Order not found.</div>;

  const { all, currentIndex } = getStatusSteps(data.status);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: isMobile ? "100px auto 40px" : "80px auto 40px",
        padding: "0 16px",
        display: "grid",
        gap: 18,
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <button
          onClick={() => navigate("/orders")}
          style={{
            border: "1px solid #e5e7eb",
            background: "#fff",
            borderRadius: 10,
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
            color: "#111827",
          }}
        >
          Back
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          gap: 12,
        }}
      >
        <div style={{ flex: "1 1 200px" }}>
          <h1 style={{ margin: 0, fontSize: isMobile ? 26 : 38, fontWeight: 900 }}>
            Order #{data.id}
          </h1>

          <div style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            Placed on: {new Date(data.created_at).toLocaleString()}
          </div>

          {data.expected_delivery_date ? (
            <div style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
              Expected Delivery: <b>{data.expected_delivery_date}</b>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 12,
              display: "inline-block",
              padding: "6px 14px",
              background: data.status === "cancelled" ? "#fee2e2" : "#dcfce7",
              color: data.status === "cancelled" ? "#991b1b" : "#166534",
              borderRadius: 99,
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {formatStatus(data.status)}
          </div>
        </div>

        <div style={{ textAlign: isMobile ? "left" : "right" }}>
          <div style={{ fontWeight: 900, fontSize: 28, color: "#111827" }}>
            {formatMoney(data.total_amount)}
          </div>
          <div style={{ marginTop: 4, color: "#6b7280", fontWeight: 700 }}>
            Total Quantity: {totalQty}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 20,
            background: "#fff",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 20 }}>
            Order Status
          </div>

          <div style={{ display: "grid" }}>
            {all.map((s, idx) => (
              <Step
                key={s}
                label={s.replaceAll("_", " ")}
                active={idx <= currentIndex}
                last={idx === all.length - 1}
              />
            ))}
          </div>

          {data.history?.length ? (
            <>
              <hr style={{ margin: "18px 0", borderColor: "#eee" }} />
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>
                Status Update Timeline
              </div>

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
                    <div style={{ fontWeight: 900 }}>{formatStatus(h.status)}</div>
                    <div style={{ marginTop: 4, color: "#374151" }}>
                      {h.note || "Status updated"}
                    </div>
                    <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                      {new Date(h.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <AddressCard
            title="Billing Address"
            name={data.billing_full_name}
            phone={data.billing_phone}
            gstin={data.billing_gstin}
            line1={data.billing_line1}
            line2={data.billing_line2}
            city={data.billing_city}
            state={data.billing_state}
            postalCode={data.billing_postal_code}
            country={data.billing_country}
          />

          <AddressCard
            title="Shipping Address"
            name={data.shipping_full_name}
            phone={data.shipping_phone}
            line1={data.shipping_line1}
            line2={data.shipping_line2}
            city={data.shipping_city}
            state={data.shipping_state}
            postalCode={data.shipping_postal_code}
            country={data.shipping_country}
          />

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 20,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>
              Payment Details
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <div style={detailRow}>
                <span style={{ color: "#6b7280" }}>Order ID</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>
                  {data.razorpay_order_id || "-"}
                </span>
              </div>

              <div style={detailRow}>
                <span style={{ color: "#6b7280" }}>Payment ID</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>
                  {data.razorpay_payment_id || "-"}
                </span>
              </div>

              <div style={detailRow}>
                <span style={{ color: "#6b7280" }}>Current Status</span>
                <span style={{ fontWeight: 700 }}>{formatStatus(data.status)}</span>
              </div>

              {data.expected_delivery_date ? (
                <div style={detailRow}>
                  <span style={{ color: "#6b7280" }}>Delivery By</span>
                  <span style={{ fontWeight: 700 }}>{data.expected_delivery_date}</span>
                </div>
              ) : null}

              <div
                style={{
                  ...detailRow,
                  fontWeight: 900,
                  borderTop: "1px solid #eee",
                  paddingTop: 12,
                  marginTop: 6,
                }}
              >
                <span>Total Amount Paid</span>
                <span style={{ fontSize: 18 }}>{formatMoney(data.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 20,
          background: "#fff",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 16 }}>
          Items in this Order
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {data.items?.map((it) => {
            const itemTotal =
              Number(it.line_total ?? Number(it.quantity) * Number(it.price));

            return (
              <div
                key={it.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "110px 1fr auto",
                  gap: 16,
                  alignItems: "center",
                  border: "1px solid #f3f4f6",
                  padding: 12,
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    width: isMobile ? 80 : 110,
                    height: isMobile ? 80 : 110,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "#f8fafc",
                    border: "1px solid #eee",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {it.product_image ? (
                    <img
                      src={it.product_image}
                      alt={it.product_title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#9ca3af", fontSize: 12 }}>No Image</span>
                  )}
                </div>

                <div>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{it.product_title}</div>
                  <div style={{ color: "#6b7280", marginTop: 4, fontSize: 14 }}>
                    Qty: {it.quantity} × {formatMoney(it.price)}
                  </div>

                  {isMobile && (
                    <div style={{ marginTop: 6, fontWeight: 900, fontSize: 16 }}>
                      {formatMoney(itemTotal)}
                    </div>
                  )}
                </div>

                {!isMobile && (
                  <div style={{ textAlign: "right", fontWeight: 900, fontSize: 20 }}>
                    {formatMoney(itemTotal)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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