import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function flattenTree(nodes: CategoryNode[]): CategoryNode[] {
  const out: CategoryNode[] = [];

  const walk = (items: CategoryNode[]) => {
    items.forEach((item) => {
      out.push(item);
      if (item.children?.length) walk(item.children);
    });
  };

  walk(nodes);
  return out;
}

export default function Store() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryNode | null>(null);

  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductListItem[]>([]);
  const [subCategoryProducts, setSubCategoryProducts] = useState<ProductListItem[]>([]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [orderBy, setOrderBy] = useState("default");
  const [pricing, setPricing] = useState("default");

  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [busyId, setBusyId] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 768 && window.innerWidth <= 1100
      : false
  );

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const querySearch = queryParams.get("search")?.trim() || "";
  const queryCategory = queryParams.get("category")?.trim() || "";
  const querySubCategory = queryParams.get("subcategory")?.trim() || "";
  const queryParent = queryParams.get("parent")?.trim() || "";

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 768);
      setIsTablet(w > 768 && w <= 1100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadStoreBase() {
      setLoading(true);
      try {
        const [cats, products] = await Promise.all([
          fetchCategoryTree(),
          fetchProducts(),
        ]);

        if (!mounted) return;

        const safeCats = Array.isArray(cats) ? cats : [];
        const safeProducts = Array.isArray(products) ? products : [];

        setCategoryTree(safeCats);
        setAllProducts(safeProducts);

        const nextQty: Record<number, number> = {};
        safeProducts.forEach((p) => {
          nextQty[p.id] = 1;
        });
        setQtyMap(nextQty);
      } catch {
        if (!mounted) return;
        setCategoryTree([]);
        setAllProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadStoreBase();

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

  function resetToRoot() {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setCategoryProducts([]);
    setSubCategoryProducts([]);
    setSearch("");
    setSortBy("default");
    setOrderBy("default");
    setPricing("default");
    navigate("/store");
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

  async function handleCategoryClick(cat: CategoryNode) {
    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setProductsLoading(true);
    setSearch("");

    try {
      const directProducts = await fetchProducts({ category: cat.slug });
      const safeProducts = Array.isArray(directProducts) ? directProducts : [];

      setCategoryProducts(safeProducts);
      setSubCategoryProducts([]);
      initializeQty(safeProducts);

      navigate(`/store?category=${encodeURIComponent(cat.slug)}`);
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
    setSearch("");

    try {
      const prods = await fetchProducts({ category: sub.slug });
      const safeProducts = Array.isArray(prods) ? prods : [];

      setSubCategoryProducts(safeProducts);
      initializeQty(safeProducts);

      if (selectedCategory) {
        navigate(
          `/store?subcategory=${encodeURIComponent(sub.slug)}&parent=${encodeURIComponent(
            selectedCategory.slug
          )}`
        );
      } else {
        navigate(`/store?subcategory=${encodeURIComponent(sub.slug)}`);
      }
    } catch {
      setSubCategoryProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    if (loading) return;

    const flat = flattenTree(categoryTree);

    async function applyUrlFilters() {
      if (!querySearch && !queryCategory && !querySubCategory) {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setCategoryProducts([]);
        setSubCategoryProducts([]);
        setSearch("");
        return;
      }

      if (querySearch) {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setCategoryProducts([]);
        setSubCategoryProducts([]);
        setSearch(querySearch);
        return;
      }

      if (querySubCategory) {
        setProductsLoading(true);
        try {
          const subNode = flat.find((c) => c.slug === querySubCategory) || null;
          const parentNode = queryParent
            ? flat.find((c) => c.slug === queryParent) || null
            : subNode?.parent
            ? flat.find((c) => c.id === subNode.parent) || null
            : null;

          const prods = await fetchProducts({ category: querySubCategory });
          const safeProducts = Array.isArray(prods) ? prods : [];

          setSelectedCategory(parentNode);
          setSelectedSubCategory(subNode);
          setCategoryProducts([]);
          setSubCategoryProducts(safeProducts);
          initializeQty(safeProducts);
          setSearch("");
        } catch {
          setSelectedCategory(null);
          setSelectedSubCategory(null);
          setCategoryProducts([]);
          setSubCategoryProducts([]);
        } finally {
          setProductsLoading(false);
        }
        return;
      }

      if (queryCategory) {
        setProductsLoading(true);
        try {
          const catNode = flat.find((c) => c.slug === queryCategory) || null;
          const prods = await fetchProducts({ category: queryCategory });
          const safeProducts = Array.isArray(prods) ? prods : [];

          setSelectedCategory(catNode);
          setSelectedSubCategory(null);
          setCategoryProducts(safeProducts);
          setSubCategoryProducts([]);
          initializeQty(safeProducts);
          setSearch("");
        } catch {
          setSelectedCategory(null);
          setSelectedSubCategory(null);
          setCategoryProducts([]);
          setSubCategoryProducts([]);
        } finally {
          setProductsLoading(false);
        }
      }
    }

    applyUrlFilters();
  }, [loading, categoryTree, querySearch, queryCategory, querySubCategory, queryParent]);

  const currentSubCategories = useMemo(() => {
    if (!selectedCategory) return [];
    return selectedCategory.children || [];
  }, [selectedCategory]);

  const baseProducts = useMemo(() => {
    if (querySearch) return allProducts;
    if (selectedSubCategory) return subCategoryProducts;
    if (selectedCategory) return categoryProducts;
    return [];
  }, [
    querySearch,
    allProducts,
    selectedSubCategory,
    subCategoryProducts,
    selectedCategory,
    categoryProducts,
  ]);

  const activeProducts = useMemo(() => {
    let list = [...baseProducts];
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter((p) => {
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q) ||
          (p.category_name || "").toLowerCase().includes(q) ||
          (p.short_category_label || "").toLowerCase().includes(q) ||
          (p.slug || "").toLowerCase().includes(q) ||
          (p.sku || "").toLowerCase().includes(q)
        );
      });
    }

    if (pricing === "low") {
      list.sort((a, b) => Number(a.sale_price || 0) - Number(b.sale_price || 0));
    } else if (pricing === "high") {
      list.sort((a, b) => Number(b.sale_price || 0) - Number(a.sale_price || 0));
    }

    if (sortBy === "az") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "za") {
      list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    if (orderBy === "latest") {
      list.sort((a, b) => b.id - a.id);
    } else if (orderBy === "popular") {
      list.sort((a, b) => Number(b.discount_percent || 0) - Number(a.discount_percent || 0));
    }

    return list;
  }, [baseProducts, search, pricing, sortBy, orderBy]);

  const pageTitle = useMemo(() => {
    if (querySearch) return "Products";
    if (selectedCategory || selectedSubCategory) return "Products";
    return "Store";
  }, [querySearch, selectedCategory, selectedSubCategory]);

  const breadcrumb = useMemo(() => {
    if (querySearch) return ["Home", "Store", "Search"];
    if (!selectedCategory) return ["Home", "Store"];
    if (!selectedSubCategory) return ["Home", selectedCategory.name];
    return ["Home", selectedCategory.name, selectedSubCategory.name];
  }, [querySearch, selectedCategory, selectedSubCategory]);

  const sectionHeading = useMemo(() => {
    if (querySearch) return `Search Results for "${search}"`;
    if (selectedSubCategory) return selectedSubCategory.name;
    if (selectedCategory) return selectedCategory.name;
    return "";
  }, [querySearch, search, selectedCategory, selectedSubCategory]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading store...</div>;
  }

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.hero,
          height: isMobile ? 220 : 420,
          backgroundImage: `url(${HERO_BG})`,
        }}
      >
        <div style={styles.heroOverlay} />
        <div style={styles.heroCenter}>
          <div
            style={{
              ...styles.heroTitle,
              fontSize: isMobile ? 38 : 76,
            }}
          >
            {pageTitle}
          </div>

          <div
            style={{
              ...styles.heroCrumb,
              fontSize: isMobile ? 12 : 16,
              padding: isMobile ? "0 16px" : 0,
              lineHeight: isMobile ? 1.6 : 1.4,
            }}
          >
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
                      navigate(`/store?category=${encodeURIComponent(selectedCategory.slug)}`);
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
        <div
          style={{
            ...styles.filterCard,
            padding: isMobile ? 16 : 26,
            borderRadius: isMobile ? 14 : 18,
          }}
        >
          <div
            style={{
              ...styles.filterTopRow,
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
            }}
          >
            <div
              style={{
                ...styles.filterTitle,
                fontSize: isMobile ? 24 : 32,
              }}
            >
              Filter
            </div>

            <div
              style={{
                ...styles.searchRow,
                width: isMobile ? "100%" : "auto",
                alignItems: isMobile ? "stretch" : "center",
              }}
            >
              <div
                style={{
                  ...styles.searchPill,
                  minWidth: isMobile ? 0 : 340,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <input
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);

                    if (value.trim()) {
                      navigate(`/store?search=${encodeURIComponent(value)}`);
                    } else if (querySearch) {
                      navigate("/store");
                    }
                  }}
                  placeholder="Search Products..."
                  style={styles.searchInput}
                />
                <button style={styles.searchBtn} aria-label="Search">
                  🔍
                </button>
              </div>

              {(selectedCategory || selectedSubCategory || querySearch) && (
                <button
                  style={{
                    ...styles.clearBtn,
                    width: isMobile ? "100%" : "auto",
                  }}
                  onClick={resetToRoot}
                >
                  Back to Categories
                </button>
              )}
            </div>
          </div>

          <div style={styles.filterDivider} />

          <div
            style={{
              ...styles.filterBottomRow,
              gap: isMobile ? 10 : 18,
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "stretch" : "center",
            }}
          >
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                ...styles.selectPill,
                minWidth: isMobile ? "100%" : 170,
                width: isMobile ? "100%" : undefined,
              }}
            >
              <option value="default">Sort By</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>

            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              style={{
                ...styles.selectPill,
                minWidth: isMobile ? "100%" : 170,
                width: isMobile ? "100%" : undefined,
              }}
            >
              <option value="default">Order By</option>
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
            </select>

            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              style={{
                ...styles.selectPill,
                minWidth: isMobile ? "100%" : 170,
                width: isMobile ? "100%" : undefined,
              }}
            >
              <option value="default">Pricing</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {!selectedCategory && !querySearch && (
          <div style={styles.gridWrap}>
            <div
              style={{
                ...styles.grid,
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : isTablet
                  ? "repeat(3, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
                gap: isMobile ? 16 : 48,
              }}
            >
              {categoryTree.map((cat) => (
                <button
                  key={cat.id}
                  style={styles.tileBtn}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div style={{ ...styles.tile, gap: isMobile ? 10 : 18 }}>
                    <div
                      style={{
                        ...styles.tileInner,
                        borderRadius: isMobile ? 16 : 26,
                      }}
                    >
                      {cat.icon_url ? (
                        <img src={cat.icon_url} alt={cat.name} style={styles.tileImg} />
                      ) : (
                        <div style={styles.tileNoImg}>{cat.name}</div>
                      )}
                    </div>

                    <div
                      style={{
                        ...styles.tileLabel,
                        fontSize: isMobile ? 11 : 14,
                      }}
                    >
                      {cat.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {(selectedCategory || selectedSubCategory || querySearch) && (
          <div style={{ marginTop: isMobile ? 24 : 36 }}>
            <div
              style={{
                ...styles.sectionTitle,
                fontSize: isMobile ? 22 : 28,
                marginBottom: isMobile ? 16 : 24,
              }}
            >
              {sectionHeading}
            </div>

            {productsLoading ? (
              <div style={styles.emptyBox}>Loading products...</div>
            ) : activeProducts.length > 0 ? (
              <>
                <div
                  style={{
                    ...styles.productsSectionTitle,
                    fontSize: isMobile ? 18 : 22,
                    marginBottom: isMobile ? 14 : 18,
                  }}
                >
                  Products
                </div>

                <div
                  style={{
                    ...styles.productGrid,
                    gridTemplateColumns: isMobile
                      ? "repeat(2, minmax(0, 1fr))"
                      : isTablet
                      ? "repeat(3, minmax(0, 1fr))"
                      : "repeat(4, minmax(0, 1fr))",
                    gap: isMobile ? 12 : 18,
                  }}
                >
                  {activeProducts.map((p) => {
                    const qty = qtyMap[p.id] || 1;

                    return (
                      <div
                        key={p.id}
                        style={{
                          ...styles.productCard,
                          borderRadius: isMobile ? 14 : 16,
                          padding: isMobile ? 10 : 12,
                        }}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          <img
                            src={getProductImage(p)}
                            alt={p.title}
                            style={{
                              ...styles.productImg,
                              height: isMobile ? 150 : 250,
                            }}
                          />

                          <div
                            style={{
                              ...styles.productShortLabel,
                              fontSize: isMobile ? 10 : 12,
                            }}
                          >
                            {p.short_category_label || p.category_name}
                          </div>

                          <h3
                            style={{
                              ...styles.productTitle,
                              fontSize: isMobile ? 14 : 18,
                              minHeight: isMobile ? 38 : "auto",
                            }}
                          >
                            {p.title}
                          </h3>

                          <div style={styles.priceWrap}>
                            <b
                              style={{
                                ...styles.salePrice,
                                fontSize: isMobile ? 15 : 18,
                              }}
                            >
                              {money(p.sale_price)}
                            </b>
                            <span
                              style={{
                                ...styles.mrpPrice,
                                fontSize: isMobile ? 11 : 14,
                              }}
                            >
                              {money(p.mrp)}
                            </span>
                            {p.discount_percent ? (
                              <span
                                style={{
                                  ...styles.discountText,
                                  fontSize: isMobile ? 10 : 12,
                                }}
                              >
                                -{p.discount_percent}%
                              </span>
                            ) : null}
                          </div>

                          <div
                            style={{
                              ...styles.gstText,
                              fontSize: isMobile ? 11 : 13,
                            }}
                          >
                            GST ({p.gst_percent}%) {money(p.gst_amount)}
                          </div>
                        </div>

                        <div
                          style={{
                            ...styles.productBottom,
                            flexDirection: isMobile ? "column" : "row",
                            alignItems: isMobile ? "stretch" : "center",
                            gap: isMobile ? 10 : 12,
                          }}
                        >
                          <div
                            style={{
                              ...styles.qtyWrap,
                              width: isMobile ? "100%" : "auto",
                              justifyContent: isMobile ? "space-between" : "flex-start",
                            }}
                          >
                            <button
                              onClick={() => setQty(p.id, qty - 1)}
                              style={{
                                ...styles.qtyBtn,
                                width: isMobile ? 36 : 40,
                                height: isMobile ? 36 : 40,
                                fontSize: isMobile ? 20 : 22,
                              }}
                            >
                              −
                            </button>

                            <div
                              style={{
                                ...styles.qtyValue,
                                minWidth: isMobile ? 40 : 46,
                                fontSize: isMobile ? 14 : 16,
                              }}
                            >
                              {qty}
                            </div>

                            <button
                              onClick={() => setQty(p.id, qty + 1)}
                              style={{
                                ...styles.qtyBtn,
                                width: isMobile ? 36 : 40,
                                height: isMobile ? 36 : 40,
                                fontSize: isMobile ? 20 : 22,
                              }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            style={{
                              ...styles.addCartBtn,
                              width: isMobile ? "100%" : undefined,
                              height: isMobile ? 40 : 44,
                              fontSize: isMobile ? 12 : 14,
                            }}
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
              <div style={styles.emptyBox}>No products found.</div>
            )}

            {selectedCategory &&
              !selectedSubCategory &&
              currentSubCategories.length > 0 &&
              !querySearch && (
                <div style={{ marginTop: isMobile ? 24 : 34 }}>
                  <div
                    style={{
                      ...styles.productsSectionTitle,
                      fontSize: isMobile ? 18 : 22,
                      marginBottom: isMobile ? 14 : 18,
                    }}
                  >
                    Sub Categories
                  </div>

                  <div
                    style={{
                      ...styles.grid,
                      gridTemplateColumns: isMobile
                        ? "repeat(2, minmax(0, 1fr))"
                        : isTablet
                        ? "repeat(3, minmax(0, 1fr))"
                        : "repeat(4, minmax(0, 1fr))",
                      gap: isMobile ? 16 : 48,
                    }}
                  >
                    {currentSubCategories.map((sub) => (
                      <button
                        key={sub.id}
                        style={styles.tileBtn}
                        onClick={() => handleSubCategoryClick(sub)}
                      >
                        <div style={{ ...styles.tile, gap: isMobile ? 10 : 18 }}>
                          <div
                            style={{
                              ...styles.tileInner,
                              borderRadius: isMobile ? 16 : 26,
                            }}
                          >
                            {sub.icon_url ? (
                              <img src={sub.icon_url} alt={sub.name} style={styles.tileImg} />
                            ) : (
                              <div style={styles.tileNoImg}>{sub.name}</div>
                            )}
                          </div>

                          <div
                            style={{
                              ...styles.tileLabel,
                              fontSize: isMobile ? 11 : 14,
                            }}
                          >
                            {sub.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
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
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  heroCrumb: {
    marginTop: 12,
    color: "#fff",
    fontWeight: 600,
    opacity: 0.95,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  content: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "34px 20px 70px",
    boxSizing: "border-box",
  },
  filterCard: {
    background: "#fff",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
  },
  filterTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
  },
  filterTitle: {
    fontWeight: 500,
    color: "#111",
  },
  searchRow: {
    display: "flex",
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
    alignItems: "center",
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
  },
  tileInner: {
    width: "100%",
    maxWidth: 420,
    aspectRatio: "1 / 1",
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
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#111",
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: 900,
    textTransform: "uppercase",
  },
  productsSectionTitle: {
    fontWeight: 900,
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
    marginTop: 8,
  },
  productCard: {
    border: "1px solid #e5e7eb",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  productImg: {
    width: "100%",
    objectFit: "contain",
    borderRadius: 12,
    background: "#fff",
  },
  productShortLabel: {
    marginTop: 8,
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  productTitle: {
    margin: "6px 0 2px",
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
    fontWeight: 900,
  },
  mrpPrice: {
    textDecoration: "line-through",
    color: "#9ca3af",
  },
  discountText: {
    color: "#ef4444",
    fontWeight: 800,
  },
  gstText: {
    color: "#374151",
    fontWeight: 700,
  },
  productBottom: {
    display: "flex",
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
    border: "none",
    background: "#f9fafb",
    fontWeight: 900,
    cursor: "pointer",
  },
  qtyValue: {
    textAlign: "center",
    fontWeight: 900,
    padding: "0 10px",
  },
  addCartBtn: {
    flex: 1,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #4f86ff, #1d4ed8)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
};
