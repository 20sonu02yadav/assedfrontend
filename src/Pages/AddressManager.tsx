import React, { useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress,
  listAddresses,
  lookupPincode,
  updateAddress,
  type Address,
  type AddressType,
} from "../services/addressApi";

type Props = {
  title: string;
  addressType: AddressType;
  onSelect?: (id: number) => void;
  selectedId?: number | null;
  allowGSTIN?: boolean;
};

type AddressForm = {
  address_type: AddressType;
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  label: string;
  gstin: string;
  is_default: boolean;
};

export default function AddressManager({
  title,
  addressType,
  onSelect,
  selectedId,
  allowGSTIN = false,
}: Props) {
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [lookupLoading, setLookupLoading] = useState(false);

  const [form, setForm] = useState<AddressForm>({
    address_type: addressType,
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    label: "",
    gstin: "",
    is_default: false,
  });

  async function load() {
    setLoading(true);
    try {
      const data: Address[] = await listAddresses(addressType);
      setItems(data);

      const def = data.find((a) => a.is_default);
      if ((selectedId === null || selectedId === undefined) && def && onSelect) {
        onSelect(def.id);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [addressType]);

  async function autoFillFromPincode() {
    const pincode = form.postal_code.trim();
    if (pincode.length !== 6) return;

    try {
      setLookupLoading(true);
      const data = await lookupPincode(pincode);

      setForm((prev) => ({
        ...prev,
        city: prev.city || data.city || "",
        state: prev.state || data.state || "",
        country: prev.country || data.country || "India",
        line2: prev.line2 || data.line1_suggestion || "",
      }));
    } catch (error) {
      console.error("Pincode lookup failed:", error);
    } finally {
      setLookupLoading(false);
    }
  }

  async function addNew(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      address_type: addressType,
      label: form.label.trim(),
      gstin: allowGSTIN ? form.gstin.trim().toUpperCase() : "",
    };

    try {
      await createAddress(payload as Omit<Address, "id" | "created_at">);

      setForm({
        address_type: addressType,
        full_name: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        label: "",
        gstin: "",
        is_default: false,
      });

      await load();
    } catch (error) {
      console.error("Failed to create address:", error);
      alert("Failed to add address");
    }
  }

  async function setDefault(id: number) {
    try {
      await updateAddress(id, { is_default: true });
      await load();
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Failed to update address");
    }
  }

  async function remove(id: number) {
    try {
      await deleteAddress(id);
      await load();
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Failed to delete address");
    }
  }

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, background: "#fff" }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{title}</h3>

      {loading ? (
        <p style={{ marginTop: 10 }}>Loading...</p>
      ) : (
        <>
          {items.length === 0 ? (
            <p style={{ marginTop: 10 }}>No {addressType} address found. Add one below.</p>
          ) : (
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              {items.map((a) => (
                <div
                  key={a.id}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: selectedId === a.id ? "2px solid #0b76c5" : "1px solid #e5e7eb",
                    background: "#fff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 900 }}>
                        {a.label ? `${a.label} • ` : ""}
                        {a.full_name} {a.is_default ? "• Default" : ""}
                      </div>

                      <div style={{ color: "#374151", marginTop: 4 }}>
                        {a.phone}
                        <br />
                        {a.line1}
                        {a.line2 ? `, ${a.line2}` : ""}
                        <br />
                        {a.city}, {a.state} - {a.postal_code}
                        {a.country ? `, ${a.country}` : ""}
                        {allowGSTIN && a.gstin ? (
                          <>
                            <br />
                            GSTIN: {a.gstin}
                          </>
                        ) : null}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {onSelect && (
                        <button
                          onClick={() => onSelect(a.id)}
                          style={{
                            height: 36,
                            padding: "0 12px",
                            borderRadius: 10,
                            border: "1px solid #e5e7eb",
                            background: selectedId === a.id ? "#0b76c5" : "#fff",
                            color: selectedId === a.id ? "#fff" : "#111",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          Select
                        </button>
                      )}

                      <button
                        onClick={() => setDefault(a.id)}
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderRadius: 10,
                          border: "1px solid #e5e7eb",
                          background: "#111827",
                          color: "#fff",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Set Default
                      </button>

                      <button
                        onClick={() => remove(a.id)}
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderRadius: 10,
                          border: "1px solid #fecaca",
                          background: "#fef2f2",
                          color: "#991b1b",
                          fontWeight: 900,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr style={{ margin: "16px 0", borderColor: "#eee" }} />

          <form onSubmit={addNew} style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Label (Home / Office)"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
            <input
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {allowGSTIN && (
              <input
                placeholder="GSTIN (optional)"
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
              />
            )}

            <input
              placeholder="Postal Code"
              value={form.postal_code}
              onChange={(e) => setForm({ ...form, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) })}
              onBlur={autoFillFromPincode}
            />

            {lookupLoading && (
              <div style={{ fontSize: 13, color: "#6b7280" }}>Fetching city/state from pincode...</div>
            )}

            <input
              placeholder="Address Line 1"
              value={form.line1}
              onChange={(e) => setForm({ ...form, line1: e.target.value })}
            />
            <input
              placeholder="Address Line 2 / Area / Landmark"
              value={form.line2}
              onChange={(e) => setForm({ ...form, line2: e.target.value })}
            />
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <input
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 800 }}>
              <input
                type="checkbox"
                checked={form.is_default}
                onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
              />
              Make this default
            </label>

            <button
              type="submit"
              style={{
                height: 44,
                borderRadius: 12,
                border: "none",
                background: "#0b76c5",
                color: "#fff",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              ADD {addressType.toUpperCase()} ADDRESS
            </button>
          </form>
        </>
      )}
    </div>
  );
}