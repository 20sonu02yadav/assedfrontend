// src/Pages/Store.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCategoryTree,
  fetchProducts,
} from "../services/storeApi";
import type {CategoryNode,ProductListItem} from "../services/storeApi"

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2018/12/slide-image-free-img.jpg";

type SortBy = "default" | "asc" | "desc";
type OrderBy =
  | "none"
  | "id"
  | "date"
  | "name"
  | "title"
  | "comment_count"
  | "random"
  | "featured"
  | "product_price"
  | "top_seller"
  | "top_rated";

type Pricing = "default" | "10_200000" | "10_20000" | "10_2000";

const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

/**
 * ✅ FIXED: generic outside-click hook
 * Accepts refs of any HTMLElement subtype (div, button, etc.) with null.
 */
function useOutsideClick<T extends HTMLElement>(
  refs: Array<React.RefObject<T | null>>,
  onOutside: () => void,
  when: boolean
) {
  useEffect(() => {
    if (!when) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inside = refs.some((r) => r.current && r.current.contains(target));
      if (!inside) onOutside();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [refs, onOutside, when]);
}

function fmtINR(v: string | number) {
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("en-IN");
}

export default function Store() {
  const navigate = useNavigate();

  // header dropdown state
  const [showCategories, setShowCategories] = useState(false);
  const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

  // ✅ refs (typed correctly)
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const orderRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);

  // data
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // filters (UI)
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [orderBy, setOrderBy] = useState<OrderBy>("none");
  const [pricing, setPricing] = useState<Pricing>("default");

  // dropdown filter popovers
  const [openSortDrop, setOpenSortDrop] = useState(false);
  const [openOrderDrop, setOpenOrderDrop] = useState(false);
  const [openPriceDrop, setOpenPriceDrop] = useState(false);

  // ✅ outside click close
  useOutsideClick(
    [dropdownRef],
    () => {
      setShowCategories(false);
      setOpenSubmenuSlug(null);
    },
    showCategories
  );

  useOutsideClick([sortRef], () => setOpenSortDrop(false), openSortDrop);
  useOutsideClick([orderRef], () => setOpenOrderDrop(false), openOrderDrop);
  useOutsideClick([priceRef], () => setOpenPriceDrop(false), openPriceDrop);

  // load category tree once
  useEffect(() => {
    fetchCategoryTree()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // load products when filters change (search is server-side supported)
  useEffect(() => {
    setLoading(true);

    const params: any = {};
    const q = search.trim();
    if (q) params.search = q;

    fetchProducts(params)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [search]);

  const totalToolsParent = useMemo(() => {
    const findInTree = (nodes: CategoryNode[]): CategoryNode | null => {
      for (const n of nodes) {
        if ((n.name || "").trim().toUpperCase() === TOTAL_TOOLS_PARENT_NAME) {
          return n;
        }
        const sub = findInTree(n.children || []);
        if (sub) return sub;
      }
      return null;
    };
    return findInTree(categories);
  }, [categories]);

  const topLevelCategories = useMemo(() => {
    const list = categories || [];
    return list.filter(
      (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
    );
  }, [categories]);

  const pricingRange = useMemo(() => {
    if (pricing === "10_200000") return { min: 10, max: 200000 };
    if (pricing === "10_20000") return { min: 10, max: 20000 };
    if (pricing === "10_2000") return { min: 10, max: 2000 };
    return null;
  }, [pricing]);

  const filtered = useMemo(() => {
    let list = [...products];

    // pricing range filter (frontend)
    if (pricingRange) {
      list = list.filter((p) => {
        const price = Number(p.sale_price);
        return (
          Number.isFinite(price) &&
          price >= pricingRange.min &&
          price <= pricingRange.max
        );
      });
    }

    // orderBy
    switch (orderBy) {
      case "id":
        list.sort((a, b) => a.id - b.id);
        break;
      case "name":
      case "title":
        list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "product_price":
        list.sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
        break;
      case "random":
        list.sort(() => Math.random() - 0.5);
        break;
      case "date":
      case "comment_count":
      case "featured":
      case "top_seller":
      case "top_rated":
      case "none":
      default:
        // backend default ordering already fine
        break;
    }

    // sortBy ASC / DESC
    if (sortBy === "desc") list.reverse();

    return list;
  }, [products, pricingRange, orderBy, sortBy]);

  const cartCount = 0;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  function goCategory(slug: string) {
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    navigate(`/category/${slug}`);
  }

  function goProduct(slug: string) {
    navigate(`/product/${slug}`);
  }

  return (
    <div style={styles.page}>
      {/* Header + Hero */}
      <div style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroOverlay} />

        <div style={styles.heroCenter}>
          <div style={styles.heroTitle}>Store</div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Filter Card */}
        <div style={styles.filterCard}>
          <div style={styles.filterTopRow}>
            <div style={styles.filterTitle}>Filter</div>

            <div style={styles.searchRow}>
              <div style={styles.searchPill}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Products..."
                  style={styles.searchInput}
                />
                <button style={styles.searchBtn} aria-label="Search">
                  🔍
                </button>
              </div>

              <button style={styles.funnelBtn} aria-label="Filter">
                ⏷
              </button>
            </div>
          </div>

          <div style={styles.filterDivider} />

          {/* Filter pills */}
          <div style={styles.filterBottomRow}>
            {/* Sort By */}
            <div ref={sortRef} style={styles.pillDropWrap}>
              <button
                style={styles.pillBtn}
                onClick={() => {
                  setOpenSortDrop((p) => !p);
                  setOpenOrderDrop(false);
                  setOpenPriceDrop(false);
                }}
              >
                Sort By <span style={styles.pillCaret}>⌄</span>
              </button>

              {openSortDrop && (
                <div style={styles.pillMenu}>
                  <RadioRow
                    label="ASC"
                    checked={sortBy === "asc"}
                    onClick={() => {
                      setSortBy("asc");
                      setOpenSortDrop(false);
                    }}
                  />
                  <RadioRow
                    label="DESC"
                    checked={sortBy === "desc"}
                    onClick={() => {
                      setSortBy("desc");
                      setOpenSortDrop(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Order By */}
            <div ref={orderRef} style={styles.pillDropWrap}>
              <button
                style={styles.pillBtn}
                onClick={() => {
                  setOpenOrderDrop((p) => !p);
                  setOpenSortDrop(false);
                  setOpenPriceDrop(false);
                }}
              >
                Order By <span style={styles.pillCaret}>⌄</span>
              </button>

              {openOrderDrop && (
                <div style={styles.pillMenuTall}>
                  {[
                    { key: "none", label: "None" },
                    { key: "id", label: "ID" },
                    { key: "date", label: "Date" },
                    { key: "name", label: "Name" },
                    { key: "title", label: "Title" },
                    { key: "comment_count", label: "Comment count" },
                    { key: "random", label: "Random" },
                    { key: "featured", label: "Featured" },
                    { key: "product_price", label: "Product Price" },
                    { key: "top_seller", label: "Top Seller" },
                    { key: "top_rated", label: "Top Rated" },
                  ].map((opt) => (
                    <RadioRow
                      key={opt.key}
                      label={opt.label}
                      checked={orderBy === (opt.key as OrderBy)}
                      onClick={() => {
                        setOrderBy(opt.key as OrderBy);
                        setOpenOrderDrop(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div ref={priceRef} style={styles.pillDropWrap}>
              <button
                style={styles.pillBtn}
                onClick={() => {
                  setOpenPriceDrop((p) => !p);
                  setOpenSortDrop(false);
                  setOpenOrderDrop(false);
                }}
              >
                Pricing <span style={styles.pillCaret}>⌄</span>
              </button>

              {openPriceDrop && (
                <div style={styles.pillMenu}>
                  <RadioRow
                    label="₹10 to ₹200000"
                    checked={pricing === "10_200000"}
                    onClick={() => {
                      setPricing("10_200000");
                      setOpenPriceDrop(false);
                    }}
                  />
                  <RadioRow
                    label="₹10 to ₹20000"
                    checked={pricing === "10_20000"}
                    onClick={() => {
                      setPricing("10_20000");
                      setOpenPriceDrop(false);
                    }}
                  />
                  <RadioRow
                    label="₹10 to ₹2000"
                    checked={pricing === "10_2000"}
                    onClick={() => {
                      setPricing("10_2000");
                      setOpenPriceDrop(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Clear */}
            <button
              style={styles.clearBtn}
              onClick={() => {
                setSortBy("default");
                setOrderBy("none");
                setPricing("default");
                setSearch("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div style={styles.gridWrap}>
          {loading ? (
            <div style={styles.loading}>Loading products...</div>
          ) : filtered.length === 0 ? (
            <div style={styles.loading}>No products found.</div>
          ) : (
            <div style={styles.gridProducts}>
              {filtered.map((p) => (
                <div key={p.id} style={styles.pCard}>
                  <div style={styles.pTop}>
                    {p.is_sale && <div style={styles.salePill}>SALE</div>}

                    {/* eye icon */}
                    <button
                      style={styles.eyeBtn}
                      onClick={() => goProduct(p.slug)}
                      aria-label="View"
                      title="View"
                    >
                      👁
                    </button>

                    <div
                      style={styles.pImgWrap}
                      onClick={() => goProduct(p.slug)}
                    >
                      <img src={p.image || ""} alt={p.title} style={styles.pImg} />
                    </div>
                  </div>

                  <div style={styles.pBody}>
                    <div style={styles.pCat}>
                      {(p.short_category_label || p.category_name).toUpperCase()}
                    </div>

                    <div style={styles.pTitle} onClick={() => goProduct(p.slug)}>
                      {p.title}
                    </div>

                    <div style={styles.pPriceRow}>
                      <span style={styles.pMrp}>₹{fmtINR(p.mrp)}</span>
                      <span style={styles.pSale}>₹{fmtINR(p.sale_price)}</span>
                    </div>

                    <div style={styles.pGstRow}>
                      <span style={styles.pGst}>
                        GST ({p.gst_percent}%) ₹{fmtINR(p.gst_amount)}
                      </span>
                      {p.discount_percent ? (
                        <span style={styles.pDisc}>-{p.discount_percent}%</span>
                      ) : null}
                    </div>

                    <button style={styles.pAdd}>👜&nbsp;&nbsp;ADD TO CART</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating buttons */}
      

      {/* Footer */}
      
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} style={styles.navA}>
      {children}
    </Link>
  );
}



function RadioRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button style={styles.radioRow} onClick={onClick} type="button">
      <span style={{ ...styles.radioDot, ...(checked ? styles.radioDotOn : {}) }} />
      <span style={styles.radioLabel}>{label}</span>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f6f9",
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#111",
  },

  hero: {
    position: "relative",
    height: 420,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "visible",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 1,
  },

  headerWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 5,
  },
  header: {
    width: "100%",
    height: 76,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
    boxSizing: "border-box",
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
    position: "relative",
    zIndex: 5,
  },
  logoLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoImg: {
    height: 40,
    width: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.35))",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 26,
    marginLeft: 18,
    marginRight: 18,
    flexWrap: "wrap",
  },
  navA: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    letterSpacing: 0.5,
    fontSize: 14,
    opacity: 0.95,
  },
  caret: { marginLeft: 6, opacity: 0.9, fontWeight: 900 },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 22,
  },
  price: {
    color: "#fff",
    fontWeight: 800,
    letterSpacing: 0.3,
    opacity: 0.95,
  },
  iconGroup: { display: "flex", alignItems: "center", gap: 16 },
  cartIconWrap: { position: "relative", color: "#fff", cursor: "pointer" },
  userIconWrap: { color: "#fff", cursor: "pointer" },
  iconText: { fontSize: 18 },
  cartBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 999,
    background: "#fff",
    color: "#111",
    display: "grid",
    placeItems: "center",
    fontSize: 12,
    fontWeight: 800,
  },

  heroCenter: {
    position: "absolute",
    zIndex: 2,
    inset: 0,
    display: "grid",
    placeItems: "center",
    paddingTop: 20,
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 76,
    fontWeight: 800,
    lineHeight: 1.0,
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  content: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "34px 20px 70px",
  },

  filterCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 26,
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
  },
  filterTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
  },
  filterTitle: {
    fontSize: 32,
    fontWeight: 500,
    color: "#111",
  },
  searchRow: { display: "flex", alignItems: "center", gap: 14 },
  searchPill: {
    display: "flex",
    alignItems: "center",
    background: "#eef3ff",
    borderRadius: 999,
    padding: "10px 12px",
    gap: 8,
    minWidth: 340,
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: 15,
  },
  searchBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
  },
  funnelBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    background: "#eef3ff",
    fontSize: 18,
  },
  filterDivider: {
    height: 1,
    background: "#e7edf5",
    marginTop: 18,
    marginBottom: 18,
  },
  filterBottomRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
  },

  pillDropWrap: { position: "relative" },
  pillBtn: {
    height: 44,
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    padding: "0 18px",
    fontSize: 15,
    background: "#fff",
    outline: "none",
    minWidth: 170,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  pillCaret: { opacity: 0.75, fontWeight: 900 },
  pillMenu: {
    position: "absolute",
    top: 52,
    left: 0,
    width: 260,
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 18px 40px rgba(0,0,0,0.20)",
    overflow: "hidden",
    zIndex: 50,
    padding: 10,
  },
  pillMenuTall: {
    position: "absolute",
    top: 52,
    left: 0,
    width: 300,
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 18px 40px rgba(0,0,0,0.20)",
    overflow: "auto",
    zIndex: 50,
    padding: 10,
    maxHeight: 320,
  },

  radioRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    background: "#eef0ff",
    cursor: "pointer",
    marginBottom: 8,
  },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    border: "2px solid #4b5563",
    background: "#fff",
  },
  radioDotOn: { borderColor: "#111", background: "#111" },
  radioLabel: { fontWeight: 900, color: "#111", fontSize: 14 },

  clearBtn: {
    height: 44,
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    padding: "0 18px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },

  gridWrap: { position: "relative", paddingTop: 36 },
  loading: { padding: 24, fontWeight: 800, opacity: 0.7, textAlign: "center" },

  gridProducts: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 28,
    alignItems: "start",
  },
  pCard: {
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  pTop: { position: "relative", padding: 18 },
  salePill: {
    position: "absolute",
    top: 16,
    left: 16,
    background: "#ffd7d7",
    padding: "6px 14px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 12,
  },
  eyeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 42,
    height: 42,
    borderRadius: 999,
    border: "none",
    background: "#f3f4f6",
    cursor: "pointer",
    fontSize: 18,
  },
  pImgWrap: {
    height: 260,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  pImg: { maxWidth: "92%", maxHeight: "92%", objectFit: "contain" },
  pBody: { padding: "0 18px 18px" },
  pCat: { fontSize: 12, fontWeight: 800, opacity: 0.55, letterSpacing: 0.6 },
  pTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 900,
    color: "#0b1636",
    lineHeight: 1.3,
    minHeight: 46,
    cursor: "pointer",
  },
  pPriceRow: { display: "flex", gap: 10, alignItems: "baseline", marginTop: 10 },
  pMrp: { textDecoration: "line-through", opacity: 0.45, fontWeight: 700 },
  pSale: { fontSize: 22, fontWeight: 900 },
  pGstRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  pGst: { fontWeight: 700, opacity: 0.75 },
  pDisc: {
    background: "#ffe3e3",
    color: "#ff2d2d",
    fontWeight: 900,
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 12,
  },
  pAdd: {
    width: "100%",
    marginTop: 16,
    height: 52,
    borderRadius: 14,
    border: "none",
    background: "#2f6fed",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 16,
  },

  dropdownWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 280,
    background: "#fff",
    borderRadius: 20,
    padding: "16px 0",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    zIndex: 9999,
  },
  dropdownItemWithArrow: {
    padding: "10px 20px",
    color: "#000",
    fontWeight: 800,
    fontSize: 15,
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  dropdownBtn: {
    padding: "10px 20px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    color: "#000",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  subMenu: {
    position: "absolute",
    top: 0,
    left: "100%",
    width: 320,
    background: "#f3f4f6",
    borderRadius: 20,
    padding: "14px 0",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    zIndex: 9999,
    maxHeight: 360,
    overflow: "auto",
  },
  subMenuAlt: {
    position: "absolute",
    top: 0,
    left: "100%",
    width: 320,
    background: "#f3f4f6",
    borderRadius: 20,
    padding: "14px 0",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    zIndex: 9999,
    maxHeight: 360,
    overflow: "auto",
  },
  subMenuBtn: {
    padding: "10px 18px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 14,
  },

  floatingCart: {
    position: "fixed",
    right: 26,
    bottom: 40,
    width: 66,
    height: 66,
    borderRadius: 999,
    border: "none",
    background: "#1877f2",
    color: "#fff",
    cursor: "pointer",
    fontSize: 22,
    boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
    zIndex: 50,
  },
  floatingBadge: {
    position: "absolute",
    top: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "#0a8f2f",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontSize: 12,
    fontWeight: 900,
  },

  scrollTopBtn: {
    position: "fixed",
    left: 26,
    bottom: 40,
    width: 56,
    height: 56,
    borderRadius: 999,
    border: "none",
    background: "#9bb6ff",
    color: "#0b1636",
    cursor: "pointer",
    fontSize: 20,
    boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
    zIndex: 50,
  },

  footer: {
    background: "#000",
    color: "#fff",
    padding: "60px 20px 0",
    marginTop: 30,
  },
  footerTop: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr 1fr",
    gap: 40,
    paddingBottom: 36,
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  },
  footerCol: { display: "flex", flexDirection: "column", gap: 12 },
  footerLogo: {
    fontSize: 44,
    fontWeight: 900,
    letterSpacing: 2,
    color: "#1da1f2",
    marginBottom: 10,
  },
  footerText: { opacity: 0.95, fontSize: 16 },
  socialRow: { display: "flex", gap: 12, marginTop: 8 },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "#fff",
    color: "#000",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },
  footerHeading: { fontSize: 22, fontWeight: 800 },
  footerUnderline: {
    width: 70,
    height: 2,
    background: "#9bb6ff",
    marginTop: -6,
    marginBottom: 8,
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
    opacity: 0.95,
    fontSize: 16,
    width: "fit-content",
  },
  footerBottom: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "26px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },
  footerBottomText: { opacity: 0.95, fontSize: 18 },
};