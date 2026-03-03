import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, fetchProductDetail, fetchReviews,} from "../services/storeApi";
import type { ProductDetail } from "../services/storeApi";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [p, setP] = useState<ProductDetail | null>(null);
  const [img, setImg] = useState<string>("");
  const [zoomOpen, setZoomOpen] = useState(false);

  const [tab, setTab] = useState<"desc" | "reviews">("desc");
  const [reviews, setReviews] = useState<any[]>([]);

  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchProductDetail(slug).then((d) => {
      setP(d);
      setImg(d.images?.[0]?.image_url || "");
    });
    fetchReviews(slug).then(setReviews);
  }, [slug]);

  const mrp = useMemo(() => (p ? Number(p.mrp).toLocaleString("en-IN") : ""), [p]);
  const sale = useMemo(() => (p ? Number(p.sale_price).toLocaleString("en-IN") : ""), [p]);
  const gst = useMemo(() => (p ? Number(p.gst_amount).toLocaleString("en-IN") : ""), [p]);

  async function submitReview() {
    if (!slug) return;
    await createReview(slug, { rating, name, email, comment });
    setName(""); setEmail(""); setComment("");
    const latest = await fetchReviews(slug);
    setReviews(latest);
  }

  if (!p) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <div style={d.page}>
      <div style={d.grid}>
        {/* Left: image */}
        <div style={d.leftCard}>
          <div style={d.saleTop}>{p.is_sale ? "Sale!" : ""}</div>

          <div style={d.imgBox} onClick={() => setZoomOpen(true)} title="Click to zoom">
            <img src={img} alt={p.title} style={d.img} />
            <div style={d.zoomIcon}>🔍</div>
          </div>

          <div style={d.thumbRow}>
            {p.images.map((im) => (
              <button key={im.id} style={d.thumbBtn} onClick={() => setImg(im.image_url)}>
                <img src={im.image_url} alt="" style={d.thumbImg} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: price + add */}
        <div>
          <div style={d.title}>{p.title}</div>

          <div style={d.priceRow}>
            <span style={d.mrp}>₹{mrp}</span>
            <span style={d.sale}>₹{sale}</span>
            {p.discount_percent ? <span style={d.off}>{p.discount_percent}% OFF</span> : null}
          </div>

          <div style={d.gst}>GST ({p.gst_percent}%) ₹{gst}</div>

          <div style={d.addRow}>
            <div style={d.qtyBox}>
              <button style={d.qtyBtn}>-</button>
              <div style={d.qtyVal}>1</div>
              <button style={d.qtyBtn}>+</button>
            </div>
            <button style={d.addBtn}>Add To Cart</button>
          </div>

          <div style={d.hr} />
          <div style={d.meta}><b>SKU:</b> {p.sku || "-"} &nbsp;&nbsp; <b>Category:</b> {p.short_category_label || p.category_name} &nbsp;&nbsp; <b>Brand:</b> {p.brand || "-"}</div>

          {/* Tabs */}
          <div style={d.tabs}>
            <button onClick={() => setTab("desc")} style={{ ...d.tabBtn, ...(tab === "desc" ? d.tabActive : {}) }}>Description</button>
            <button onClick={() => setTab("reviews")} style={{ ...d.tabBtn, ...(tab === "reviews" ? d.tabActive : {}) }}>
              Reviews ({reviews.length})
            </button>
          </div>

          <div style={d.tabBody}>
            {tab === "desc" ? (
              <div>
                {!!p.specs && (
                  <ul style={d.specList}>
                    {Object.entries(p.specs).map(([k, v]) => (
                      <li key={k} style={d.specItem}><b>{k}:</b> {String(v)}</li>
                    ))}
                  </ul>
                )}
                {!!p.description && <div style={{ marginTop: 10, lineHeight: 1.6 }}>{p.description}</div>}
              </div>
            ) : (
              <div style={d.reviewWrap}>
                <div style={d.noReview}>{reviews.length ? "" : "There are no reviews yet."}</div>

                <div style={d.reviewBox}>
                  <div style={d.reviewTitle}>Be the first to review “{p.title}”</div>

                  <div style={d.formRow}>
                    <div style={d.label}>Your rating *</div>
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={d.input}>
                      {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div style={d.formRow}>
                    <div style={d.label}>Your review *</div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={d.textarea} />
                  </div>

                  <div style={d.twoCol}>
                    <div>
                      <div style={d.label}>Name *</div>
                      <input value={name} onChange={(e) => setName(e.target.value)} style={d.input} />
                    </div>
                    <div>
                      <div style={d.label}>Email *</div>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} style={d.input} />
                    </div>
                  </div>

                  <button style={d.submit} onClick={submitReview}>SUBMIT</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {zoomOpen && (
        <ZoomModal src={img} onClose={() => setZoomOpen(false)} />
      )}
    </div>
  );
}

function ZoomModal({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);

  return (
    <div style={z.backdrop} onClick={onClose}>
      <div style={z.modal} onClick={(e) => e.stopPropagation()}>
        <button style={z.close} onClick={onClose}>✕</button>

        <div
          style={{
            ...z.stage,
            backgroundImage: `url(${src})`,
            backgroundSize: `${scale * 100}%`,
          }}
          onWheel={(e) => {
            e.preventDefault();
            setScale((s) => {
              const next = e.deltaY > 0 ? s - 0.1 : s + 0.1;
              return Math.min(3, Math.max(1, Number(next.toFixed(2))));
            });
          }}
        />
        <div style={z.hint}>Mouse wheel = zoom in/out</div>
      </div>
    </div>
  );
}

const d: Record<string, React.CSSProperties> = {
  page: { background: "#f3f6f9", minHeight: "100vh", padding: 30 },
  grid: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, alignItems: "start" },
  leftCard: { background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" },
  saleTop: { fontWeight: 900, opacity: 0.7, marginBottom: 8 },
  imgBox: { position: "relative", borderRadius: 16, background: "#f7f7f7", height: 320, display: "grid", placeItems: "center", cursor: "zoom-in" },
  img: { maxWidth: "90%", maxHeight: "90%", objectFit: "contain" },
  zoomIcon: { position: "absolute", top: 10, right: 10, width: 34, height: 34, borderRadius: 999, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 10px 18px rgba(0,0,0,0.15)" },
  thumbRow: { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" },
  thumbBtn: { width: 64, height: 64, borderRadius: 12, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center" },
  thumbImg: { width: "88%", height: "88%", objectFit: "contain" },

  title: { fontSize: 34, fontWeight: 900, marginTop: 8 },
  priceRow: { display: "flex", gap: 14, alignItems: "baseline", marginTop: 10 },
  mrp: { textDecoration: "line-through", opacity: 0.45, fontWeight: 900 },
  sale: { fontSize: 28, fontWeight: 900 },
  off: { color: "red", fontWeight: 900 },
  gst: { marginTop: 10, fontWeight: 900, opacity: 0.75 },
  addRow: { marginTop: 18, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
  qtyBox: { display: "flex", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" },
  qtyBtn: { width: 42, height: 42, border: "none", background: "#fff", cursor: "pointer", fontWeight: 900 },
  qtyVal: { width: 42, height: 42, display: "grid", placeItems: "center", fontWeight: 900 },
  addBtn: { height: 46, padding: "0 26px", borderRadius: 12, border: "none", background: "#2f6fed", color: "#fff", fontWeight: 900, cursor: "pointer" },

  hr: { height: 1, background: "#eaeef4", margin: "18px 0" },
  meta: { fontWeight: 800, opacity: 0.8 },

  tabs: { marginTop: 18, display: "flex", gap: 12 },
  tabBtn: { padding: "10px 14px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 900 },
  tabActive: { background: "#0b1636", color: "#fff", borderColor: "#0b1636" },
  tabBody: { marginTop: 16 },

  specList: { margin: 0, paddingLeft: 18, lineHeight: 1.8 },
  specItem: { marginBottom: 4 },

  reviewWrap: { display: "grid", gridTemplateColumns: "1fr", gap: 12 },
  noReview: { fontWeight: 800, opacity: 0.7 },
  reviewBox: { background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: 18 },
  reviewTitle: { fontWeight: 900, fontSize: 18, marginBottom: 12 },

  formRow: { marginTop: 10 },
  label: { fontWeight: 800, opacity: 0.85, marginBottom: 6 },
  input: { width: "100%", height: 42, borderRadius: 10, border: "1px solid #e5e7eb", padding: "0 12px", outline: "none" },
  textarea: { width: "100%", minHeight: 110, borderRadius: 10, border: "1px solid #e5e7eb", padding: 12, outline: "none" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 },
  submit: { marginTop: 14, height: 44, padding: "0 18px", borderRadius: 12, border: "none", background: "#2f6fed", color: "#fff", fontWeight: 900, cursor: "pointer", width: 140 },
};

const z: Record<string, React.CSSProperties> = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "grid", placeItems: "center", padding: 18 },
  modal: { width: "min(1200px, 96vw)", background: "#fff", borderRadius: 10, position: "relative", padding: 16 },
  close: { position: "absolute", top: 10, right: 10, width: 44, height: 44, borderRadius: 999, border: "none", background: "#f3f4f6", cursor: "pointer", fontSize: 18 },
  stage: {
    height: "70vh",
    borderRadius: 8,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#f7f7f7",
  },
  hint: { marginTop: 10, fontWeight: 800, opacity: 0.7, textAlign: "center" },
};