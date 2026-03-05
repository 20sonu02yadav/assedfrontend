import { useEffect, useState } from "react";
import { getCart, type Cart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const c = await getCart();
      setCart(c);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading cart...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <h1>Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {cart.items.map((it) => (
            <div
              key={it.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <b>{it.product_title}</b>

              <div style={{ marginTop: 6 }}>
                Quantity: <b>{it.quantity}</b>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <button
              style={{
                padding: "10px 20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}