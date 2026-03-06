import React, { useEffect, useMemo, useState } from "react";
import { createRazorpayOrder, verifyPayment } from "../services/paymentApi";
import { useNavigate } from "react-router-dom";
import AddressManager from "./AddressManager";
import { getCart, type Cart } from "../services/cartApi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹ ${n.toFixed(2)}`;
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(true);

  const navigate = useNavigate();

  const RAZORPAY_KEY_ID =
    (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || "YOUR_KEY_ID";

  async function loadCart() {
    setCartLoading(true);
    try {
      const c = await getCart();
      setCart(c);
    } finally {
      setCartLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  const grandTotal = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((sum, it) => {
      return sum + Number(it.line_total || Number(it.unit_price || 0) * it.quantity);
    }, 0);
  }, [cart]);

  async function payNow() {
    if (!selectedAddressId) {
      alert("Please select delivery address.");
      return;
    }

    if (!cart?.items?.length) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const order = await createRazorpayOrder();

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Tunturu",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response: any) {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            address_id: selectedAddressId,
          });

          alert("Payment Success ✅ Order created!");

          const orderId = result?.order?.id;
          if (orderId) {
            navigate(`/orders/${orderId}`);
          } else {
            navigate("/orders");
          }
        },
        theme: { color: "#111" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert("Payment init failed. Ensure cart has items & you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  if (cartLoading) {
    return <div style={{ padding: 40 }}>Loading checkout...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 20 }}>Checkout</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.6fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: 16 }}>
          <AddressManager
            selectedId={selectedAddressId}
            onSelect={(id) => setSelectedAddressId(id)}
          />

          <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, background: "#fff" }}>
            <h3 style={{ marginTop: 0 }}>Your Products</h3>

            <div style={{ display: "grid", gap: 12 }}>
              {cart.items.map((it) => {
                const unitPrice = Number(it.unit_price || 0);
                const lineTotal = Number(it.line_total || unitPrice * it.quantity);

                return (
                  <div
                    key={it.id}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 12,
                      padding: 12,
                      display: "grid",
                      gridTemplateColumns: "90px 1fr auto",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={it.product_image || "https://dummyimage.com/160x160/f3f4f6/111827&text=No+Image"}
                      alt={it.product_title}
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "1px solid #eee",
                      }}
                    />

                    <div>
                      <div style={{ fontWeight: 900 }}>{it.product_title}</div>
                      <div style={{ marginTop: 6, color: "#6b7280" }}>
                        Qty: {it.quantity}
                      </div>
                      <div style={{ marginTop: 4, color: "#374151" }}>
                        Unit Price: {money(unitPrice)}
                      </div>
                    </div>

                    <div style={{ fontWeight: 900 }}>{money(lineTotal)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
            position: "sticky",
            top: 90,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
            Order Summary
          </div>

          <div style={rowStyle}>
            <span>Products</span>
            <span>{cart.items.length}</span>
          </div>

          <div style={rowStyle}>
            <span>Total Quantity</span>
            <span>{cart.items.reduce((sum, it) => sum + it.quantity, 0)}</span>
          </div>

          <div style={rowStyle}>
            <span>Total Amount</span>
            <span>{money(grandTotal)}</span>
          </div>

          <hr style={{ margin: "14px 0", borderColor: "#eee" }} />

          <div style={{ ...rowStyle, fontWeight: 900, fontSize: 18 }}>
            <span>Payable</span>
            <span>{money(grandTotal)}</span>
          </div>

          <button
            onClick={payNow}
            disabled={loading}
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
            }}
          >
            {loading ? "Please wait..." : `Pay ${money(grandTotal)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};