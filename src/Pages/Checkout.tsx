import React, { useEffect, useMemo, useState } from "react";
import { createRazorpayOrder, verifyPayment } from "../services/paymentApi";
import { listAddresses, createAddress, type Address } from "../services/addressApi";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addrLoading, setAddrLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  // New address form
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    label: "", // ✅ free text (Home/Office forced nahi)
    is_default: true,
  });

  const RAZORPAY_KEY_ID =
    (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || "YOUR_KEY_ID";

  async function loadAddresses() {
    setAddrLoading(true);
    try {
      const list = await listAddresses();
      setAddresses(list);

      // auto-select default if exists
      const def = list.find((a) => a.is_default) || list[0];
      setSelectedAddressId(def ? def.id : null);
    } catch {
      setAddresses([]);
      setSelectedAddressId(null);
    } finally {
      setAddrLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  async function saveNewAddress() {
    const payload = {
      ...form,
      // remove empty label if not provided
      label: form.label?.trim() ? form.label.trim() : undefined,
    };
    const created = await createAddress(payload as any);
    setShowNew(false);
    await loadAddresses();
    setSelectedAddressId(created.id);
  }

  async function payNow() {
    if (!selectedAddressId) {
      alert("Please add/select an address first.");
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
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            address_id: selectedAddressId, // ✅ FIX
          });

          alert("Payment Success ✅ Order created!");
          navigate("/orders");
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

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1>Checkout</h1>

      <div style={{ marginTop: 16, border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Delivery Address</h3>

        {addrLoading ? (
          <div>Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div>
            <p>No address found. Please add one.</p>
            <button onClick={() => setShowNew(true)}>Add New Address</button>
          </div>
        ) : (
          <>
            <select
              value={selectedAddressId ?? ""}
              onChange={(e) => setSelectedAddressId(Number(e.target.value))}
              style={{ width: "100%", height: 44, padding: "0 12px" }}
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {(a.label ? `${a.label} - ` : "")}
                  {a.full_name}, {a.line1}, {a.city} - {a.postal_code}
                  {a.is_default ? " (Default)" : ""}
                </option>
              ))}
            </select>

            {selectedAddress && (
              <div style={{ marginTop: 12, fontSize: 14, color: "#111" }}>
                <div><b>{selectedAddress.full_name}</b> ({selectedAddress.phone})</div>
                <div>{selectedAddress.line1}{selectedAddress.line2 ? `, ${selectedAddress.line2}` : ""}</div>
                <div>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postal_code}</div>
                <div>{selectedAddress.country || "India"}</div>
              </div>
            )}

            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <button onClick={() => setShowNew(true)}>Add New Address</button>
              <button onClick={loadAddresses}>Refresh</button>
            </div>
          </>
        )}

        {showNew && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e5e7eb" }}>
            <h4>Add New Address</h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input placeholder="Full Name" value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              <input placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <input placeholder="Address Line 1" value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })} />
              <input placeholder="Address Line 2 (optional)" value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })} />

              <input placeholder="City" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input placeholder="State" value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })} />

              <input placeholder="Postal Code" value={form.postal_code}
                onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
              <input placeholder="Label (optional like Home/Office)" value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
              <button onClick={saveNewAddress}>Save Address</button>
              <button onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <button onClick={payNow} disabled={loading} style={{ height: 44, padding: "0 16px" }}>
          {loading ? "Please wait..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}