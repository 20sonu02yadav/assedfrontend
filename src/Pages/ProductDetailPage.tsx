import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../services/cartApi";
import { createReview, fetchProductDetail, fetchReviews, type ProductDetail, type Review } from "../services/storeApi";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([fetchProductDetail(slug), fetchReviews(slug)])
      .then(([p, r]) => {
        setProduct(p);
        setReviews(r);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 40 }}>Product not found.</div>;

  const mainImg = product.images?.[0]?.image_url;

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          <img
            src={mainImg || "https://via.placeholder.com/800x600?text=No+Image"}
            alt={product.title}
            style={{ width: "100%", borderRadius: 14, objectFit: "cover" }}
          />
        </div>

        <div>
          <h1 style={{ marginTop: 0 }}>{product.title}</h1>
          <div style={{ color: "#6b7280" }}>{product.brand} • {product.sku}</div>

          <div style={{ marginTop: 10, fontSize: 18 }}>
            <b>₹{Number(product.sale_price).toFixed(2)}</b>{" "}
            <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>
              ₹{Number(product.mrp).toFixed(2)}
            </span>
          </div>

          <button
            style={{ marginTop: 14 }}
            onClick={async () => {
              try {
                await addToCart(product.id, 1);
                alert("Added to cart ✅");
              } catch {
                alert("Please login to add to cart.");
              }
            }}
          >
            Add to Cart
          </button>

          <div style={{ marginTop: 18 }}>
            <h3>Description</h3>
            <p style={{ lineHeight: 1.6 }}>{product.description || "No description"}</p>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3>Specs</h3>
            <pre style={{ background: "#f9fafb", padding: 12, borderRadius: 10, overflow: "auto" }}>
              {JSON.stringify(product.specs, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Reviews</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, marginBottom: 10 }}>
              <b>{r.name}</b> — ⭐ {r.rating}
              <div style={{ color: "#6b7280", fontSize: 13 }}>{new Date(r.created_at).toLocaleString()}</div>
              <p style={{ marginBottom: 0 }}>{r.comment}</p>
            </div>
          ))}
        </div>

        <div>
          <h3>Write a Review</h3>

          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map((x) => <option key={x} value={x}>{x}</option>)}
          </select>

          <div style={{ marginTop: 10 }}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ marginTop: 10 }}>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginTop: 10 }}>
            <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
          </div>

          <button
            style={{ marginTop: 10 }}
            onClick={async () => {
              if (!slug) return;
              await createReview(slug, { rating, name, email, comment });
              const r = await fetchReviews(slug);
              setReviews(r);
              setName(""); setEmail(""); setComment(""); setRating(5);
              alert("Review submitted ✅");
            }}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}