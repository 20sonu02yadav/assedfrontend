import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../services/storeApi";
import type { ProductListItem } from "../services/storeApi";

type QuickViewState = { open: boolean; product: ProductListItem | null };

export default function CategoryProducts() {
  const { slug } = useParams();
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [search, setSearch] = useState("");
  const [pricing, setPricing] = useState<"low" | "high" | undefined>(undefined);
  const [quick, setQuick] = useState<QuickViewState>({ open: false, product: null });

  useEffect(() => {
    fetchProducts({ category: slug, pricing }).then(setItems);
  }, [slug, pricing]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }, [items, search]);

  return (
    <div style={s.page}>
      <div style={s.title}>{slug?.toUpperCase().replace(/-/g, " ")}</div>

      <div style={s.topbar}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={s.search} />
        <select value={pricing ?? ""} onChange={(e) => setPricing((e.target.value as any) || undefined)} style={s.select}>
          <option value="">Pricing</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div style={s.grid}>
        {filtered.map((p) => (
          <div key={p.id} style={s.card}>
            <div style={s.cardTop}>
              {p.is_sale && <div style={s.salePill}>SALE</div>}

              {/* eye icon */}
              <button
                style={s.eyeBtn}
                onClick={() => setQuick({ open: true, product: p })}
                aria-label="Quick view"
                title="Quick view"
              >
                👁
              </button>

              <Link to={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={s.imgWrap}>
                  <img src={p.image ?? ""} alt={p.title} style={s.img} />
                </div>
              </Link>
            </div>

            <div style={s.meta}>
              <div style={s.catLabel}>{(p.short_category_label || p.category_name).toUpperCase()}</div>
              <Link to={`/product/${p.slug}`} style={s.productTitle}>
                {p.title}
              </Link>

              <div style={s.priceRow}>
                <span style={s.mrp}>₹{Number(p.mrp).toLocaleString("en-IN")}</span>
                <span style={s.sale}>₹{Number(p.sale_price).toLocaleString("en-IN")}</span>
              </div>

              <div style={s.gstRow}>
                <span style={s.gstText}>GST ({p.gst_percent}%) ₹{Number(p.gst_amount).toLocaleString("en-IN")}</span>
                {p.discount_percent ? <span style={s.discPill}>-{p.discount_percent}%</span> : null}
              </div>

              <button style={s.addBtn}>👜 &nbsp; ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>

      {quick.open && quick.product && (
        <QuickViewModal product={quick.product} onClose={() => setQuick({ open: false, product: null })} />
      )}
    </div>
  );
}

function QuickViewModal({ product, onClose }: { product: ProductListItem; onClose: () => void }) {
  const [qty, setQty] = useState(1);

  return (
    <div style={m.backdrop} onClick={onClose}>
      <div style={m.modal} onClick={(e) => e.stopPropagation()}>
        <button style={m.close} onClick={onClose} aria-label="Close">✕</button>

        <div style={m.row}>
          <div style={m.left}>
            <img src={product.image ?? ""} alt={product.title} style={m.bigImg} />
          </div>

          <div style={m.right}>
            <div style={m.priceRow}>
              <span style={m.mrp}>₹{Number(product.mrp).toLocaleString("en-IN")}</span>
              <span style={m.sale}>₹{Number(product.sale_price).toLocaleString("en-IN")}</span>
            </div>

            <div style={m.gst}>GST ({product.gst_percent}%) ₹{Number(product.gst_amount).toLocaleString("en-IN")}</div>

            <div style={m.qtyRow}>
              <button style={m.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <div style={m.qtyVal}>{qty}</div>
              <button style={m.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>

              <button style={m.add}>Add To Cart</button>
            </div>

            <div style={m.line} />

            <div style={m.small}>
              <b>SKU:</b> {product.sku || "-"} &nbsp;&nbsp; <b>Category:</b> {product.category_name}
            </div>

            <div style={m.share}>
              Share: <span style={m.sicon}>f</span> <span style={m.sicon}>𝕏</span> <span style={m.sicon}>p</span> <span style={m.sicon}>↗</span>
            </div>

            <Link to={`/product/${product.slug}`} style={m.viewMore}>View Full Details →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { padding: "30px 30px 80px", background: "#f3f6f9", minHeight: "100vh" },
  title: { fontSize: 54, fontWeight: 900, margin: "0 0 22px" },
  topbar: { display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" },
  search: { height: 44, borderRadius: 999, border: "1px solid #e5e7eb", padding: "0 18px", minWidth: 280, outline: "none" },
  select: { height: 44, borderRadius: 999, border: "1px solid #e5e7eb", padding: "0 18px", outline: "none" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 28 },
  card: { background: "#fff", borderRadius: 18, boxShadow: "0 10px 24px rgba(0,0,0,0.08)", overflow: "hidden" },
  cardTop: { position: "relative", padding: 18 },
  salePill: { position: "absolute", top: 16, left: 16, background: "#ffd7d7", padding: "6px 14px", borderRadius: 10, fontWeight: 800, fontSize: 12 },
  eyeBtn: { position: "absolute", top: 14, right: 14, width: 42, height: 42, borderRadius: 999, border: "none", background: "#f3f4f6", cursor: "pointer", fontSize: 18 },
  imgWrap: { height: 260, display: "grid", placeItems: "center" },
  img: { maxWidth: "92%", maxHeight: "92%", objectFit: "contain" },
  meta: { padding: "0 18px 18px" },
  catLabel: { fontSize: 12, fontWeight: 800, opacity: 0.55, letterSpacing: 0.6 },
  productTitle: { display: "block", marginTop: 8, fontSize: 16, fontWeight: 900, color: "#0b1636", textDecoration: "none", lineHeight: 1.3, minHeight: 46 },
  priceRow: { display: "flex", gap: 10, alignItems: "baseline", marginTop: 10 },
  mrp: { textDecoration: "line-through", opacity: 0.45, fontWeight: 700 },
  sale: { fontSize: 22, fontWeight: 900 },
  gstRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 8 },
  gstText: { fontWeight: 700, opacity: 0.75 },
  discPill: { background: "#ffe3e3", color: "#ff2d2d", fontWeight: 900, padding: "4px 10px", borderRadius: 8, fontSize: 12 },
  addBtn: { width: "100%", marginTop: 16, height: 52, borderRadius: 14, border: "none", background: "#2f6fed", color: "#fff", fontWeight: 900, cursor: "pointer", fontSize: 16 },
};

const m: Record<string, React.CSSProperties> = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "grid", placeItems: "center", padding: 18 },
  modal: { width: "min(1100px, 95vw)", background: "#fff", borderRadius: 8, position: "relative", padding: 22 },
  close: { position: "absolute", top: 14, right: 14, width: 42, height: 42, borderRadius: 999, border: "none", background: "transparent", cursor: "pointer", fontSize: 20 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" },
  left: { display: "grid", placeItems: "center" },
  bigImg: { width: "100%", maxWidth: 520, objectFit: "contain" },
  right: {},
  priceRow: { display: "flex", gap: 10, alignItems: "baseline" },
  mrp: { textDecoration: "line-through", opacity: 0.5, fontWeight: 800 },
  sale: { fontSize: 26, fontWeight: 900 },
  gst: { marginTop: 10, fontWeight: 800, opacity: 0.8 },
  qtyRow: { marginTop: 18, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  qtyBtn: { width: 44, height: 36, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" },
  qtyVal: { width: 44, height: 36, border: "1px solid #e5e7eb", display: "grid", placeItems: "center", fontWeight: 900 },
  add: { height: 44, padding: "0 26px", borderRadius: 10, border: "none", background: "#2f6fed", color: "#fff", fontWeight: 900, cursor: "pointer" },
  line: { height: 1, background: "#eef2f7", margin: "18px 0" },
  small: { fontWeight: 700, opacity: 0.85 },
  share: { marginTop: 12, fontWeight: 800, opacity: 0.85, display: "flex", alignItems: "center", gap: 8 },
  sicon: { width: 26, height: 26, borderRadius: 999, background: "#f3f4f6", display: "grid", placeItems: "center" },
  viewMore: { display: "inline-block", marginTop: 16, fontWeight: 900, textDecoration: "none" },
};