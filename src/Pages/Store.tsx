import  { useEffect, useState } from "react";
import { fetchProducts, type ProductListItem } from "../services/storeApi";
import { addToCart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";

export default function Store() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading products...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h1>Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {items.map((p) => (
          <div key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              <img
                src={p.image || "https://via.placeholder.com/400x280?text=No+Image"}
                alt={p.title}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10 }}
              />
              <h3 style={{ margin: "10px 0 4px" }}>{p.title}</h3>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{p.brand}</div>
              <div style={{ marginTop: 6 }}>
                <b>₹{Number(p.sale_price).toFixed(2)}</b>{" "}
                <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>
                  ₹{Number(p.mrp).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              style={{ marginTop: 10, width: "100%" }}
              onClick={async () => {
                try {
                  await addToCart(p.id, 1);
                  alert("Added to cart ✅");
                } catch (e) {
                  alert("Please login to add to cart.");
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}