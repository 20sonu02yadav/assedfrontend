import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, type ProductListItem } from "../services/storeApi";

export default function CategoryProducts() {
  const { slug } = useParams();
  const [items, setItems] = useState<ProductListItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    fetchProducts({ category: slug })
      .then(setItems)
      .catch(() => setItems([]));
  }, [slug]);

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h1>Category: {slug}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 20 }}>
        {items.map((p) => (
          <div
            key={p.id}
            style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, cursor: "pointer" }}
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            <img
              src={p.image || "https://via.placeholder.com/400x280?text=No+Image"}
              alt={p.title}
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10 }}
            />
            <h3 style={{ margin: "10px 0 4px" }}>{p.title}</h3>
            <div><b>₹{Number(p.sale_price).toFixed(2)}</b></div>
          </div>
        ))}
      </div>
    </div>
  );
}