import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategoryTree,
  fetchProducts,
  type CategoryNode,
  type ProductListItem,
} from "../services/storeApi";
import { addProductToHybridCart } from "../services/cartHelper";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2018/12/slide-image-free-img.jpg";

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹${n.toFixed(2)}`;
}

function getProductImage(product: ProductListItem) {
  return (
    product.image ||
    "https://dummyimage.com/400x280/f3f4f6/111827&text=No+Image"
  );
}

export default function Store() {
  const navigate = useNavigate();

  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryNode | null>(null);

  const [categoryProducts, setCategoryProducts] = useState<ProductListItem[]>([]);
  const [subCategoryProducts, setSubCategoryProducts] = useState<ProductListItem[]>([]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [orderBy, setOrderBy] = useState("default");
  const [pricing, setPricing] = useState("default");

  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStore() {
      setLoading(true);
      try {
        const cats = await fetchCategoryTree();
        if (!mounted) return;
        setCategoryTree(cats);
      } catch {
        if (mounted) setCategoryTree([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadStore();

    return () => {
      mounted = false;
    };
  }, []);

  function initializeQty(products: ProductListItem[]) {
    setQtyMap((prev) => {
      const next = { ...prev };
      products.forEach((p) => {
        if (!next[p.id]) next[p.id] = 1;
      });
      return next;
    });
  }

  async function handleCategoryClick(cat: CategoryNode) {
    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setProductsLoading(true);

    try {
      const directProducts = await fetchProducts({ category: cat.slug });
      setCategoryProducts(directProducts);
      setSubCategoryProducts([]);
      initializeQty(directProducts);
    } catch {
      setCategoryProducts([]);
      setSubCategoryProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }

  async function handleSubCategoryClick(sub: CategoryNode) {
    setSelectedSubCategory(sub);
    setProductsLoading(true);

    try {
      const prods = await fetchProducts({ category: sub.slug });
      setSubCategoryProducts(prods);
      initializeQty(prods);
    } catch {
      setSubCategoryProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }

  function resetToRoot() {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setCategoryProducts([]);
    setSubCategoryProducts([]);
    setSearch("");
    setSortBy("default");
    setOrderBy("default");
    setPricing("default");
  }

  function setQty(productId: number, qty: number) {
    setQtyMap((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  }

  async function handleAddToCart(product: ProductListItem) {
  try {
    setBusyId(product.id);

    await addProductToHybridCart(product, qtyMap[product.id] || 1);

    alert("Added to cart ✅");
  } catch {
    alert("Failed to add to cart.");
  } finally {
    setBusyId(null);
  }
}

  const activeProducts = useMemo(() => {
    const base = selectedSubCategory ? subCategoryProducts : categoryProducts;
    let list = [...base];
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
  }, [
    selectedSubCategory,
    categoryProducts,
    subCategoryProducts,
    search,
    pricing,
    sortBy,
    orderBy,
  ]);

  const currentSubCategories = useMemo(() => {
    if (!selectedCategory) return [];
    return selectedCategory.children || [];
  }, [selectedCategory]);

  const pageTitle = selectedCategory || selectedSubCategory ? "Products" : "Store";

  const breadcrumb = useMemo(() => {
    if (!selectedCategory) return ["Home", "Store"];
    if (!selectedSubCategory) return ["Home", selectedCategory.name];
    return ["Home", selectedCategory.name, selectedSubCategory.name];
  }, [selectedCategory, selectedSubCategory]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading store...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroCenter}>
          <div style={styles.heroTitle}>{pageTitle}</div>

          <div style={styles.heroCrumb}>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                {index > 0 && <span style={{ margin: "0 10px" }}>›</span>}
                <span
                  style={{
                    cursor:
                      item === "Home" || item === "Store" || item === selectedCategory?.name
                        ? "pointer"
                        : "default",
                  }}
                  onClick={() => {
                    if (item === "Home" || item === "Store") {
                      resetToRoot();
                    } else if (selectedCategory && item === selectedCategory.name) {
                      setSelectedSubCategory(null);
                    }
                  }}
                >
                  {item}
                </span>
              </React.Fragment>
            ))}
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

              {(selectedCategory || selectedSubCategory) && (
                <button style={styles.clearBtn} onClick={resetToRoot}>
                  Back to Categories
                </button>
              )}
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

        {!selectedCategory && (
          <div style={styles.gridWrap}>
            <div style={styles.grid}>
              {categoryTree.map((cat) => (
                <button
                  key={cat.id}
                  style={styles.tileBtn}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div style={styles.tile}>
                    <div style={styles.tileInner}>
                      {cat.icon_url ? (
                        <img src={cat.icon_url} alt={cat.name} style={styles.tileImg} />
                      ) : (
                        <div style={styles.tileNoImg}>{cat.name}</div>
                      )}
                    </div>

                    <div style={styles.tileLabel}>{cat.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && !selectedSubCategory && (
          <div style={{ marginTop: 36 }}>
            <div style={styles.sectionTitle}>{selectedCategory.name}</div>

            {productsLoading ? (
              <div style={styles.emptyBox}>Loading products...</div>
            ) : activeProducts.length > 0 ? (
              <>
                <div style={styles.productsSectionTitle}>Products</div>
                <div style={styles.productGrid}>
                  {activeProducts.map((p) => {
                    const qty = qtyMap[p.id] || 1;

                    return (
                      <div key={p.id} style={styles.productCard}>
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
                            <b style={styles.salePrice}>{money(p.sale_price)}</b>
                            <span style={styles.mrpPrice}>{money(p.mrp)}</span>
                            {p.discount_percent ? (
                              <span style={styles.discountText}>
                                -{p.discount_percent}%
                              </span>
                            ) : null}
                          </div>

                          <div style={styles.gstText}>
                            GST ({p.gst_percent}%) {money(p.gst_amount)}
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
                            onClick={() => handleAddToCart(p)}
                          >
                            {busyId === p.id ? "Adding..." : "ADD TO CART"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={styles.emptyBox}>No direct products in this category.</div>
            )}

            {currentSubCategories.length > 0 && (
              <div style={{ marginTop: 34 }}>
                <div style={styles.productsSectionTitle}>Sub Categories</div>

                <div style={styles.grid}>
                  {currentSubCategories.map((sub) => (
                    <button
                      key={sub.id}
                      style={styles.tileBtn}
                      onClick={() => handleSubCategoryClick(sub)}
                    >
                      <div style={styles.tile}>
                        <div style={styles.tileInner}>
                          {sub.icon_url ? (
                            <img src={sub.icon_url} alt={sub.name} style={styles.tileImg} />
                          ) : (
                            <div style={styles.tileNoImg}>{sub.name}</div>
                          )}
                        </div>

                        <div style={styles.tileLabel}>{sub.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedCategory && selectedSubCategory && (
          <div style={{ marginTop: 36 }}>
            <div style={styles.sectionTitle}>{selectedSubCategory.name}</div>

            {productsLoading ? (
              <div style={styles.emptyBox}>Loading products...</div>
            ) : activeProducts.length === 0 ? (
              <div style={styles.emptyBox}>No products found in this sub category.</div>
            ) : (
              <div style={styles.productGrid}>
                {activeProducts.map((p) => {
                  const qty = qtyMap[p.id] || 1;

                  return (
                    <div key={p.id} style={styles.productCard}>
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
                          <b style={styles.salePrice}>{money(p.sale_price)}</b>
                          <span style={styles.mrpPrice}>{money(p.mrp)}</span>
                          {p.discount_percent ? (
                            <span style={styles.discountText}>
                              -{p.discount_percent}%
                            </span>
                          ) : null}
                        </div>

                        <div style={styles.gstText}>
                          GST ({p.gst_percent}%) {money(p.gst_amount)}
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
                          onClick={() => handleAddToCart(p)}
                        >
                          {busyId === p.id ? "Adding..." : "ADD TO CART"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
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
    height: 420,
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
    paddingTop: 20,
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 76,
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  heroCrumb: {
    marginTop: 12,
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    opacity: 0.95,
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
  clearBtn: {
    height: 44,
    borderRadius: 999,
    border: "none",
    padding: "0 18px",
    background: "#0b76c5",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  gridWrap: {
    position: "relative",
    paddingTop: 36,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 48,
    alignItems: "start",
  },
  tileBtn: {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
  },
  tileInner: {
    width: "100%",
    maxWidth: 420,
    aspectRatio: "1 / 1",
    borderRadius: 26,
    background: "#fff",
    border: "1px solid #cfcfcf",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  tileImg: {
    width: "85%",
    height: "85%",
    objectFit: "contain",
  },
  tileNoImg: {
    padding: 18,
    textAlign: "center",
    fontWeight: 800,
    color: "#111",
  },
  tileLabel: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#111",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 24,
    textTransform: "uppercase",
  },
  productsSectionTitle: {
    fontSize: 22,
    fontWeight: 900,
    marginBottom: 18,
    textTransform: "uppercase",
  },
  emptyBox: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
    fontWeight: 700,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
    marginTop: 8,
  },
  productCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 12,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  productImg: {
    width: "100%",
    height: 250,
    objectFit: "contain",
    borderRadius: 12,
    background: "#fff",
  },
  productShortLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  productTitle: {
    margin: "6px 0 2px",
    fontSize: 18,
    fontWeight: 800,
    lineHeight: 1.35,
  },
  priceWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  salePrice: {
    fontSize: 18,
    fontWeight: 900,
  },
  mrpPrice: {
    textDecoration: "line-through",
    color: "#9ca3af",
    fontSize: 14,
  },
  discountText: {
    color: "#ef4444",
    fontWeight: 800,
    fontSize: 12,
  },
  gstText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: 700,
  },
  productBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: "auto",
  },
  qtyWrap: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: 999,
    overflow: "hidden",
  },
  qtyBtn: {
    width: 40,
    height: 40,
    border: "none",
    background: "#f9fafb",
    fontSize: 22,
    fontWeight: 900,
    cursor: "pointer",
  },
  qtyValue: {
    minWidth: 46,
    textAlign: "center",
    fontWeight: 900,
    padding: "0 10px",
  },
  addCartBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #4f86ff, #1d4ed8)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
};