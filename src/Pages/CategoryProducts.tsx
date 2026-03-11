import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToHybridCart } from "../services/cartHelper";
import { fetchProducts, type ProductListItem } from "../services/storeApi";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2018/12/slide-image-free-img.jpg";

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹${n.toFixed(2)}`;
}

function getProductImage(product: ProductListItem) {
  return (
    product.image ||
    "https://dummyimage.com/500x420/f3f4f6/111827&text=No+Image"
  );
}

type QuickViewState = {
  open: boolean;
  product: ProductListItem | null;
  qty: number;
};

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [orderBy, setOrderBy] = useState("default");
  const [pricing, setPricing] = useState("default");

  const [quickView, setQuickView] = useState<QuickViewState>({
    open: false,
    product: null,
    qty: 1,
  });

  useEffect(() => {
    if (!slug) {
      setItems([]);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts({ category: slug });
        if (!mounted) return;

        setItems(data);

        const nextQty: Record<number, number> = {};
        data.forEach((p) => {
          nextQty[p.id] = 1;
        });
        setQtyMap(nextQty);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!quickView.open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [quickView.open]);

  function setQty(productId: number, qty: number) {
    setQtyMap((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  }

  async function handleAddToCart(product: ProductListItem, qty: number) {
  try {
    setBusyId(product.id);

    await addProductToHybridCart(product, qty);

    alert("Added to cart ✅");
  } catch {
    alert("Failed to add to cart.");
  } finally {
    setBusyId(null);
  }
}

  const filteredItems = useMemo(() => {
    let list = [...items];
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q) ||
          (p.category_name || "").toLowerCase().includes(q) ||
          (p.short_category_label || "").toLowerCase().includes(q)
        );
      });
    }

    if (pricing === "low") {
      list.sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
    } else if (pricing === "high") {
      list.sort((a, b) => Number(b.sale_price) - Number(a.sale_price));
    }

    if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "za") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (orderBy === "latest") {
      list.sort((a, b) => b.id - a.id);
    } else if (orderBy === "popular") {
      list.sort((a, b) => Number(b.discount_percent || 0) - Number(a.discount_percent || 0));
    }

    return list;
  }, [items, search, sortBy, orderBy, pricing]);

  if (!slug) {
    return <div style={{ padding: 40 }}>Invalid category.</div>;
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroOverlay} />

        <div style={styles.heroCenter}>
          <div style={styles.heroTitle}>Products</div>

          <div style={styles.heroCrumb}>
            <span style={styles.crumbLink} onClick={() => navigate("/")}>
              Home
            </span>
            <span style={styles.crumbSep}>›</span>
            <span style={styles.crumbLink} onClick={() => navigate("/store")}>
              Store
            </span>
            <span style={styles.crumbSep}>›</span>
            <span>{slug.replace(/-/g, " ").toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div style={styles.content}>
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

              <button
                style={styles.backBtn}
                onClick={() => navigate("/store")}
              >
                ⏷
              </button>
            </div>
          </div>

          <div style={styles.filterDivider} />

          <div style={styles.filterBottomRow}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.selectPill}
            >
              <option value="default">Sort By</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>

            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              style={styles.selectPill}
            >
              <option value="default">Order By</option>
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
            </select>

            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              style={styles.selectPill}
            >
              <option value="default">Pricing</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        <div style={styles.sectionTitle}>
          {slug.replace(/-/g, " ").toUpperCase()}
        </div>

        {loading ? (
          <div style={styles.emptyBox}>Loading products...</div>
        ) : filteredItems.length === 0 ? (
          <div style={styles.emptyBox}>No products were found matching your selection.</div>
        ) : (
          <div style={styles.productGrid}>
            {filteredItems.map((p) => {
              const qty = qtyMap[p.id] || 1;

              return (
                <div key={p.id} style={styles.productCard}>
                  {p.is_sale ? <div style={styles.saleBadge}>SALE</div> : null}

                  <button
                    style={styles.quickViewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickView({
                        open: true,
                        product: p,
                        qty: qtyMap[p.id] || 1,
                      });
                    }}
                    aria-label="Quick view"
                    title="Quick view"
                  >
                    👁
                  </button>

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <img
                      src={getProductImage(p)}
                      alt={p.title}
                      style={styles.productImg}
                    />

                    <div style={styles.productShortLabel}>
                      {p.short_category_label || p.category_name}
                    </div>

                    <h3 style={styles.productTitle}>{p.title}</h3>

                    <div style={styles.priceWrap}>
                      <span style={styles.oldPrice}>{money(p.mrp)}</span>
                      <span style={styles.salePrice}>{money(p.sale_price)}</span>
                    </div>

                    <div style={styles.gstWrap}>
                      <span style={styles.gstText}>
                        GST ({p.gst_percent}%) {money(p.gst_amount)}
                      </span>
                      {p.discount_percent ? (
                        <span style={styles.discountPill}>-{p.discount_percent}%</span>
                      ) : null}
                    </div>
                  </div>

                  <div style={styles.productBottom}>
                    <div style={styles.qtyWrap}>
                      <button
                        onClick={() => setQty(p.id, qty - 1)}
                        style={styles.qtyBtn}
                      >
                        −
                      </button>

                      <div style={styles.qtyValue}>{qty}</div>

                      <button
                        onClick={() => setQty(p.id, qty + 1)}
                        style={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={styles.addCartBtn}
                      disabled={busyId === p.id}
                      onClick={() => handleAddToCart(p, qty)}
                    >
                      {busyId === p.id ? "ADDING..." : "ADD TO CART"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {quickView.open && quickView.product && (
        <div
          style={styles.modalOverlay}
          onClick={() => setQuickView({ open: false, product: null, qty: 1 })}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.modalClose}
              onClick={() => setQuickView({ open: false, product: null, qty: 1 })}
            >
              ✕
            </button>

            <div style={styles.modalGrid}>
              <div>
                <img
                  src={getProductImage(quickView.product)}
                  alt={quickView.product.title}
                  style={styles.modalMainImage}
                />
              </div>

              <div>
                <div style={styles.modalPriceRow}>
                  <span style={styles.modalOldPrice}>{money(quickView.product.mrp)}</span>
                  <span style={styles.modalSalePrice}>{money(quickView.product.sale_price)}</span>
                </div>

                <div style={styles.modalActionRow}>
                  <div style={styles.modalQtyWrap}>
                    <button
                      style={styles.modalQtyBtn}
                      onClick={() =>
                        setQuickView((prev) => ({
                          ...prev,
                          qty: Math.max(1, prev.qty - 1),
                        }))
                      }
                    >
                      −
                    </button>

                    <div style={styles.modalQtyValue}>{quickView.qty}</div>

                    <button
                      style={styles.modalQtyBtn}
                      onClick={() =>
                        setQuickView((prev) => ({
                          ...prev,
                          qty: prev.qty + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.modalAddCartBtn}
                    onClick={() =>
                      handleAddToCart(quickView.product!, quickView.qty)
                    }
                  >
                    Add To Cart
                  </button>
                </div>

                <div style={styles.modalDivider} />

                <div style={styles.modalMeta}>
                  <span>SKU: {quickView.product.sku || "-"}</span>
                  <span>Category: {quickView.product.category_name || "-"}</span>
                  <span>Brand: {quickView.product.brand || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f6f9",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#111",
  },
  hero: {
    position: "relative",
    height: 320,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 1,
  },
  heroCenter: {
    position: "absolute",
    zIndex: 2,
    inset: 0,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  heroCrumb: {
    marginTop: 14,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    opacity: 0.95,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  crumbLink: { cursor: "pointer" },
  crumbSep: { margin: "0 10px" },
  content: {
    maxWidth: 1460,
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
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
  },
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "none",
    background: "#eef3ff",
    cursor: "pointer",
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
  selectPill: {
    height: 44,
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    padding: "0 18px",
    fontSize: 15,
    background: "#fff",
    outline: "none",
    minWidth: 170,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 900,
    margin: "34px 0 20px",
    textTransform: "uppercase",
  },
  emptyBox: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: 600,
    border: "1px solid #e5e7eb",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
    marginTop: 12,
  },
  productCard: {
    position: "relative",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 18,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflow: "hidden",
  },
  saleBadge: {
    position: "absolute",
    top: 18,
    left: 18,
    zIndex: 2,
    background: "#f9caca",
    color: "#111",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 14,
    fontWeight: 900,
  },
  quickViewBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 2,
    width: 56,
    height: 56,
    borderRadius: 999,
    border: "none",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    cursor: "pointer",
    fontSize: 24,
  },
  productImg: {
    width: "100%",
    height: 330,
    objectFit: "contain",
    background: "#fff",
    borderRadius: 12,
  },
  productShortLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  productTitle: {
    margin: "4px 0 2px",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
    color: "#0f172a",
  },
  priceWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "#9ca3af",
    fontSize: 18,
  },
  salePrice: {
    fontSize: 22,
    fontWeight: 900,
    color: "#0f172a",
  },
  gstWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  gstText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: 700,
  },
  discountPill: {
    color: "#ef4444",
    fontWeight: 800,
    fontSize: 16,
    background: "#fee2e2",
    padding: "4px 8px",
    borderRadius: 6,
  },
  productBottom: {
    marginTop: "auto",
    display: "grid",
    gap: 12,
  },
  qtyWrap: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: 999,
    overflow: "hidden",
    width: "fit-content",
  },
  qtyBtn: {
    width: 42,
    height: 42,
    border: "none",
    background: "#f9fafb",
    fontSize: 24,
    fontWeight: 900,
    cursor: "pointer",
  },
  qtyValue: {
    minWidth: 48,
    textAlign: "center",
    fontWeight: 900,
    padding: "0 10px",
    fontSize: 16,
  },
  addCartBtn: {
    width: "100%",
    height: 56,
    borderRadius: 18,
    border: "none",
    background: "linear-gradient(90deg, #4f86ff, #1d4ed8)",
    color: "#fff",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 9999,
    display: "grid",
    placeItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 1380,
    background: "#fff",
    position: "relative",
    padding: 28,
    boxSizing: "border-box",
  },
  modalClose: {
    position: "absolute",
    top: 18,
    right: 18,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 34,
    lineHeight: 1,
  },
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: 28,
    alignItems: "start",
  },
  modalMainImage: {
    width: "100%",
    height: 560,
    objectFit: "contain",
    background: "#fff",
  },
  modalPriceRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  modalOldPrice: {
    fontSize: 22,
    color: "#9ca3af",
    textDecoration: "line-through",
  },
  modalSalePrice: {
    fontSize: 30,
    fontWeight: 900,
    color: "#1f2937",
  },
  modalActionRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 18,
    flexWrap: "wrap",
  },
  modalQtyWrap: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    height: 42,
  },
  modalQtyBtn: {
    width: 46,
    height: 40,
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontSize: 24,
  },
  modalQtyValue: {
    minWidth: 46,
    textAlign: "center",
    fontSize: 18,
  },
  modalAddCartBtn: {
    minWidth: 390,
    height: 54,
    border: "none",
    borderRadius: 999,
    background: "#0b86d7",
    color: "#fff",
    fontWeight: 900,
    fontSize: 18,
    cursor: "pointer",
    padding: "0 24px",
  },
  modalDivider: {
    height: 1,
    background: "#e5e7eb",
    marginTop: 18,
    marginBottom: 16,
  },
  modalMeta: {
    display: "flex",
    gap: 28,
    flexWrap: "wrap",
    fontSize: 16,
    color: "#1f2937",
  },
};