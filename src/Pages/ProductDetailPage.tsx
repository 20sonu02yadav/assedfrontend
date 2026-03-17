import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReview,
  fetchCategoryTree,
  fetchProductDetail,
  fetchProducts,
  fetchReviews,
  type CategoryNode,
  type ProductDetail,
  type ProductListItem,
  type Review,
} from "../services/storeApi";
import { addProductToHybridCart } from "../services/cartHelper";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2018/12/slide-image-free-img.jpg";

function money(v?: string | number) {
  const n = Number(v || 0);
  return `₹${n.toFixed(2)}`;
}
function toTitleCaseLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word
    )
    .join(" ");
}

function formatSpecValue(value: unknown) {
  if (value === null || value === undefined) return "-";

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(", ");
  }

  return String(value);
}
function flattenTree(nodes: CategoryNode[]): CategoryNode[] {
  const out: CategoryNode[] = [];

  const walk = (list: CategoryNode[]) => {
    list.forEach((node) => {
      out.push(node);
      if (node.children?.length) {
        walk(node.children);
      }
    });
  };

  walk(nodes);
  return out;
}

function getRelatedImage(product: ProductListItem) {
  return (
    product.image ||
    "https://dummyimage.com/380x320/f3f4f6/111827&text=No+Image"
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug ?? "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<ProductListItem[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const [qty, setQty] = useState(1);
  const [busyCart, setBusyCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    name: "",
    email: "",
    comment: "",
  });
  const [reviewBusy, setReviewBusy] = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 768 && window.innerWidth <= 1100
      : false
  );

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
    if (!slug) return;

    let mounted = true;

    async function loadPage() {
      setLoading(true);

      try {
        const [detail, revs, tree] = await Promise.all([
          fetchProductDetail(slug),
          fetchReviews(slug),
          fetchCategoryTree(),
        ]);

        if (!mounted) return;

        setProduct(detail);
        setReviews(revs);
        setSelectedImage(detail.images?.[0]?.image_url || "");

        const flat = flattenTree(tree);
        const currentCat = flat.find((c) => c.slug === detail.category_slug);

        let related: ProductListItem[] = [];

        if (currentCat) {
          const map = new Map<number, ProductListItem>();

          const sameCategoryProducts = await fetchProducts({
            category: currentCat.slug,
          });

          sameCategoryProducts.forEach((p) => {
            if (p.slug !== detail.slug) map.set(p.id, p);
          });

          if (currentCat.parent !== null) {
            const parentCat = flat.find((c) => c.id === currentCat.parent);

            if (parentCat) {
              const [parentDirectProducts, parentChildrenProducts] = await Promise.all([
                fetchProducts({ category: parentCat.slug }),
                fetchProducts({ parent: parentCat.slug }),
              ]);

              [...parentDirectProducts, ...parentChildrenProducts].forEach((p) => {
                if (p.slug !== detail.slug) map.set(p.id, p);
              });
            }
          } else {
            const childProducts = await fetchProducts({ parent: currentCat.slug });
            childProducts.forEach((p) => {
              if (p.slug !== detail.slug) map.set(p.id, p);
            });
          }

          related = Array.from(map.values());
        } else {
          const fallback = await fetchProducts({ category: detail.category_slug });
          related = fallback.filter((p) => p.slug !== detail.slug);
        }

        setRelatedProducts(related.slice(0, 10));
      } catch {
        if (mounted) {
          setProduct(null);
          setReviews([]);
          setRelatedProducts([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPage();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const reviewAverage = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    return total / reviews.length;
  }, [reviews]);

  async function handleAddToCartNow(count: number) {
    if (!product) return;

    try {
      setBusyCart(true);
      await addProductToHybridCart(product, count);
      alert("Added to cart ✅");
    } catch {
      alert("Failed to add to cart.");
    } finally {
      setBusyCart(false);
    }
  }

  async function handleRelatedAddToCart(item: ProductListItem) {
    try {
      await addProductToHybridCart(item, 1);
      alert("Added to cart ✅");
    } catch {
      alert("Failed to add to cart.");
    }
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug) return;

    try {
      setReviewBusy(true);

      await createReview(slug, {
        rating: reviewForm.rating,
        name: reviewForm.name,
        email: reviewForm.email,
        comment: reviewForm.comment,
      });

      const latest = await fetchReviews(slug);
      setReviews(latest);

      setReviewForm({
        rating: 5,
        name: "",
        email: "",
        comment: "",
      });

      alert("Review submitted ✅");
    } catch {
      alert("Failed to submit review.");
    } finally {
      setReviewBusy(false);
    }
  }

  if (!slug) {
    return <div style={{ padding: 40 }}>Invalid product URL.</div>;
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Loading product...</div>;
  }

  if (!product) {
    return <div style={{ padding: 40 }}>Product not found.</div>;
  }

  const mainImage =
    selectedImage ||
    product.images?.[0]?.image_url ||
    "https://dummyimage.com/600x600/f3f4f6/111827&text=No+Image";

  const specsList: { label: string; value: string }[] = Array.isArray(product.specs)
  ? product.specs
      .filter((item) => {
        const raw = String(item || "").toLowerCase().replace(/\s+/g, "").replace(/-/g, "_");
        return !raw.includes("b2b_price");
      })
      .map((item) => {
        const rawText = String(item || "");
        const parts = rawText.split(":");
        if (parts.length >= 2) {
          const label = toTitleCaseLabel(parts[0]);
          const value = parts.slice(1).join(":").trim();
          return { label, value };
        }
        return { label: toTitleCaseLabel(rawText), value: "" };
      })
  : typeof product.specs === "object" && product.specs !== null
  ? Object.entries(product.specs)
      .filter(([k]) => {
        const normalized = String(k).toLowerCase().replace(/\s+/g, "").replace(/-/g, "_");
        return normalized !== "b2b_price";
      })
      .map(([k, v]) => ({
        label: toTitleCaseLabel(k),
        value: formatSpecValue(v),
      }))
  : [];
  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.hero,
          backgroundImage: `url(${HERO_BG})`,
          height: isMobile ? 220 : 320,
        }}
      >
        <div style={styles.heroOverlay} />

        <div style={styles.heroCenter}>
          <div
            style={{
              ...styles.heroTitle,
              fontSize: isMobile ? 38 : 72,
            }}
          >
            Products
          </div>

          <div
            style={{
              ...styles.heroCrumb,
              fontSize: isMobile ? 12 : 15,
              padding: isMobile ? "0 16px" : 0,
              lineHeight: isMobile ? 1.6 : 1.4,
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </span>
            <span style={{ margin: "0 10px" }}>›</span>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/store")}>
              Store
            </span>
            <span style={{ margin: "0 10px" }}>›</span>
            <span>{product.category_name}</span>
            <span style={{ margin: "0 10px" }}>›</span>
            <span>{product.title}</span>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div
          style={{
            ...styles.topGrid,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 18 : 28,
          }}
        >
          <div>
            {product.is_sale ? <div style={styles.saleBadge}>Sale!</div> : null}

            <div
              style={{
                ...styles.mainImageWrap,
                height: isMobile ? 340 : 520,
              }}
              onMouseMove={(e) => {
                if (isMobile) return;
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setZoomPos({ x, y });
              }}
              onMouseEnter={() => !isMobile && setIsZooming(true)}
              onMouseLeave={() => !isMobile && setIsZooming(false)}
            >
              <img
                src={mainImage}
                alt={product.title}
                style={{
                  ...styles.mainImage,
                  transform: !isMobile && isZooming ? "scale(1.9)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
              {!isMobile && <div style={styles.zoomIcon}>⌕</div>}
            </div>

            

            {product.images?.length > 1 ? (
              <div
                style={{
                  ...styles.thumbRow,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    style={{
                      ...styles.thumbBtn,
                      width: isMobile ? 68 : 82,
                      height: isMobile ? 68 : 82,
                      border:
                        selectedImage === img.image_url
                          ? "2px solid #0b76c5"
                          : "1px solid #e5e7eb",
                    }}
                    onClick={() => setSelectedImage(img.image_url)}
                  >
                    <img src={img.image_url} alt="thumb" style={styles.thumbImg} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            {!product.is_sale ? (
  <div
    style={{
      display: "inline-block",
      marginBottom: 10,
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "8px 14px",
      borderRadius: 999,
      fontWeight: 800,
      fontSize: isMobile ? 12 : 14,
    }}
  >
    Out Of Stock
  </div>
) : null}
            <h1
              style={{
                ...styles.title,
                fontSize: isMobile ? 22 : 28,
                margin: isMobile ? "10px 0 16px" : "40px 0 24px",
              }}
            >
              {product.title}
            </h1>

            <div
              style={{
                ...styles.priceRow,
                gap: isMobile ? 10 : 14,
              }}
            >
              <span
                style={{
                  ...styles.oldPrice,
                  fontSize: isMobile ? 16 : 20,
                }}
              >
                {money(product.mrp)}
              </span>
              <span
                style={{
                  ...styles.salePrice,
                  fontSize: isMobile ? 28 : 36,
                }}
              >
                {money(product.sale_price)}
              </span>
              {product.discount_percent ? (
                <span
                  style={{
                    ...styles.discount,
                    fontSize: isMobile ? 16 : 20,
                  }}
                >
                  {product.discount_percent}% OFF
                </span>
              ) : null}
            </div>

            <div
              style={{
                ...styles.gstText,
                marginTop: isMobile ? 12 : 16,
                fontSize: isMobile ? 16 : 22,
              }}
            >
              GST ({product.gst_percent}%) <b>{money(product.gst_amount)}</b>
            </div>

            <div
              style={{
                ...styles.cartRow,
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: isMobile ? 14 : 18,
                marginTop: isMobile ? 24 : 42,
                marginBottom: isMobile ? 24 : 42,
              }}
            >
              <div
                style={{
                  ...styles.qtyWrap,
                  justifyContent: isMobile ? "center" : "flex-start",
                  border: isMobile ? "1px solid #dbe2ea" : "none",
                  borderRadius: isMobile ? 12 : 0,
                  padding: isMobile ? "10px 14px" : "0 10px",
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  −
                </button>
                <div style={styles.qtyValue}>{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} style={styles.qtyBtn}>
                  +
                </button>
              </div>

              <button
  style={{
    ...styles.addCartBtn,
    width: isMobile ? "100%" : "auto",
    minWidth: isMobile ? "100%" : 230,
    height: isMobile ? 50 : 54,
    fontSize: isMobile ? 18 : 22,
    background: product.is_sale ? "#1d8fe1" : "#9ca3af",
    cursor: product.is_sale ? "pointer" : "not-allowed",
    opacity: product.is_sale ? 1 : 0.9,
  }}
  disabled={busyCart || !product.is_sale}
  onClick={() => {
    if (!product.is_sale) return;
    handleAddToCartNow(qty);
  }}
>
  {!product.is_sale ? "Out Of Stock" : busyCart ? "Adding..." : "Add To Cart"}
</button>
            </div>

            <div
              style={{
                ...styles.metaBlock,
                fontSize: isMobile ? 14 : 16,
                gap: isMobile ? 10 : 18,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div style={styles.metaLine}>
                <span>SKU:</span> {product.sku || "-"}
              </div>
              <div style={styles.metaLine}>
                <span>Category:</span> {product.category_name || "-"}
              </div>
              <div style={styles.metaLine}>
                <span>Brand:</span> {product.brand || "-"}
              </div>
            </div>

            <div
              style={{
                ...styles.reviewSummary,
                marginTop: isMobile ? 22 : 36,
                fontSize: isMobile ? 15 : 18,
              }}
            >
              {reviews.length === 0 ? (
                "There are no reviews yet."
              ) : (
                <>
                  {reviews.length} review(s) • Average rating: {reviewAverage.toFixed(1)} / 5
                </>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.bottomGrid,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 20 : 30,
            marginTop: isMobile ? 22 : 30,
          }}
        >
          <div>
            <div
              style={{
                ...styles.tabRow,
                gap: isMobile ? 16 : 24,
                overflowX: "auto",
              }}
            >
              <button
                onClick={() => setActiveTab("description")}
                style={{
                  ...styles.tabBtn,
                  whiteSpace: "nowrap",
                  borderBottom:
                    activeTab === "description" ? "2px solid #111" : "2px solid transparent",
                  fontWeight: activeTab === "description" ? 900 : 500,
                }}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                style={{
                  ...styles.tabBtn,
                  whiteSpace: "nowrap",
                  borderBottom:
                    activeTab === "reviews" ? "2px solid #111" : "2px solid transparent",
                  fontWeight: activeTab === "reviews" ? 900 : 500,
                }}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {activeTab === "description" ? (
              <div
                style={{
                  ...styles.descriptionBox,
                  paddingRight: isMobile ? 0 : 20,
                }}
              >
                {product.description ? (
                  <div
                    style={{
                      ...styles.descriptionText,
                      fontSize: isMobile ? 15 : 18,
                    }}
                  >
                    {product.description.split("\n").map((line, index) => (
                      <div key={index} style={{ marginBottom: 10 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ) : null}

                {specsList.length > 0 ? (
                <div style={styles.specsList}>
                  {specsList.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.specLine,
                        fontSize: isMobile ? 15 : 18,
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
                        gap: 10,
                        padding: "10px 12px",
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 10,
                      }}
                    >
                      <strong style={{ color: "#111827" }}>{item.label}</strong>
                      <span style={{ color: "#374151" }}>{item.value || "-"}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              </div>
            ) : (
              <div style={styles.reviewsList}>
                {reviews.length === 0 ? (
                  <div
                    style={{
                      ...styles.noReviewText,
                      fontSize: isMobile ? 15 : 18,
                    }}
                  >
                    There are no reviews yet.
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} style={styles.reviewCard}>
                      <div
                        style={{
                          ...styles.reviewHeader,
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                        }}
                      >
                        <b>{r.name}</b>
                        <span style={styles.reviewRating}>{"★".repeat(r.rating)}</span>
                      </div>
                      <div style={styles.reviewDate}>
                        {new Date(r.created_at).toLocaleString()}
                      </div>
                      <div
                        style={{
                          ...styles.reviewComment,
                          fontSize: isMobile ? 15 : 16,
                        }}
                      >
                        {r.comment}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div
            style={{
              ...styles.reviewFormCard,
              borderRadius: isMobile ? 16 : 0,
              padding: isMobile ? 18 : 24,
            }}
          >
            <div
              style={{
                ...styles.formTitle,
                fontSize: isMobile ? 20 : 22,
              }}
            >
              Review “{product.title}”
            </div>
            <div style={styles.formSub}>
              Your email address will not be published. Required fields are marked *
            </div>

            <form onSubmit={handleReviewSubmit}>
              <label style={styles.label}>Your rating *</label>
              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    rating: Number(e.target.value),
                  }))
                }
                style={styles.input}
              >
                <option value={5}>★★★★★</option>
                <option value={4}>★★★★</option>
                <option value={3}>★★★</option>
                <option value={2}>★★</option>
                <option value={1}>★</option>
              </select>

              <label style={styles.label}>Your review *</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                style={{ ...styles.input, minHeight: 110, resize: "vertical" }}
              />

              <div
                style={{
                  ...styles.formRow,
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <div>
                  <label style={styles.label}>Name *</label>
                  <input
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    style={styles.input}
                  />
                </div>
              </div>

              <label style={styles.checkboxRow}>
                <input type="checkbox" />
                <span>
                  Save my name, email, and website in this browser for the next time I
                  comment.
                </span>
              </label>

              <button
                type="submit"
                disabled={reviewBusy}
                style={{
                  ...styles.submitBtn,
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                }}
              >
                {reviewBusy ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div style={styles.relatedSection}>
            <h2
              style={{
                ...styles.relatedTitle,
                fontSize: isMobile ? 24 : 34,
              }}
            >
              Related products
            </h2>

            <div
              style={{
                ...styles.relatedGrid,
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : isTablet
                  ? "repeat(3, minmax(0, 1fr))"
                  : "repeat(5, minmax(0, 1fr))",
                gap: isMobile ? 14 : 24,
              }}
            >
              {relatedProducts.map((p) => (
                <div key={p.id} style={styles.relatedCard}>
                  {p.is_sale ? <div style={styles.smallSaleBadge}>Sale!</div> : null}

                  {!p.is_sale ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "#fee2e2",
                        color: "#b91c1c",
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        zIndex: 3,
                      }}
                    >
                      Out Of Stock
                    </div>
                  ) : null}

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <img
                      src={getRelatedImage(p)}
                      alt={p.title}
                      style={{
                        ...styles.relatedImg,
                        height: isMobile ? 170 : 320,
                      }}
                    />

                    <div
                      style={{
                        ...styles.relatedCategory,
                        fontSize: isMobile ? 11 : 13,
                      }}
                    >
                      {p.short_category_label || p.category_name}
                    </div>

                    <div
                      style={{
                        ...styles.relatedName,
                        fontSize: isMobile ? 14 : 18,
                        minHeight: isMobile ? 40 : 52,
                      }}
                    >
                      {p.title}
                    </div>

                    <div
                      style={{
                        ...styles.relatedPriceRow,
                        gap: isMobile ? 6 : 8,
                      }}
                    >
                      <span
                        style={{
                          ...styles.relatedOldPrice,
                          fontSize: isMobile ? 12 : 15,
                        }}
                      >
                        {money(p.mrp)}
                      </span>
                      <span
                        style={{
                          ...styles.relatedPrice,
                          fontSize: isMobile ? 15 : 20,
                        }}
                      >
                        {money(p.sale_price)}
                      </span>
                    </div>

                    {p.discount_percent ? (
                      <div
                        style={{
                          ...styles.relatedDiscount,
                          textAlign: "center",
                          marginTop: 4,
                          fontSize: isMobile ? 12 : 14,
                        }}
                      >
                        {p.discount_percent}% OFF
                      </div>
                    ) : null}

                    <div
                      style={{
                        ...styles.relatedGst,
                        fontSize: isMobile ? 12 : 15,
                      }}
                    >
                      GST ({p.gst_percent}%) {money(p.gst_amount)}
                    </div>
                  </div>

                  <button
                  style={{
                    ...styles.relatedCartBtn,
                    minWidth: isMobile ? "100%" : 150,
                    height: isMobile ? 38 : 42,
                    fontSize: isMobile ? 12 : 14,
                    background: p.is_sale ? "#0b76c5" : "#9ca3af",
                    cursor: p.is_sale ? "pointer" : "not-allowed",
                  }}
                  disabled={!p.is_sale}
                  onClick={() => {
                    if (!p.is_sale) return;
                    handleRelatedAddToCart(p);
                  }}
                >
                  {p.is_sale ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
                </div>
              ))}
            </div>
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
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  heroCrumb: {
    marginTop: 14,
    color: "#fff",
    fontWeight: 600,
    opacity: 0.95,
  },
  container: {
    maxWidth: 1880,
    margin: "0 auto",
    padding: "26px 16px 40px",
    boxSizing: "border-box",
  },
  topGrid: {
    display: "grid",
    alignItems: "start",
  },
  saleBadge: {
    display: "inline-block",
    background: "#fff",
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    marginBottom: 10,
  },
  mainImageWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
    background: "#fff",
    display: "grid",
    placeItems: "center",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.18s ease",
  },
  zoomIcon: {
    position: "absolute",
    right: 18,
    top: 18,
    fontSize: 22,
    color: "#555",
    background: "rgba(255,255,255,0.95)",
    width: 34,
    height: 34,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
  },
  thumbRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  thumbBtn: {
    borderRadius: 10,
    background: "#fff",
    padding: 6,
    cursor: "pointer",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  title: {
    fontWeight: 500,
    lineHeight: 1.35,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "#9ca3af",
  },
  salePrice: {
    fontWeight: 900,
  },
  discount: {
    color: "red",
    fontWeight: 700,
  },
  gstText: {
    color: "#374151",
  },
  cartRow: {
    display: "flex",
    flexWrap: "wrap",
  },
  qtyWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 22,
  },
  qtyBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 30,
    fontWeight: 900,
    width: 30,
    height: 30,
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: 700,
    minWidth: 30,
    textAlign: "center",
  },
  addCartBtn: {
    border: "none",
    borderRadius: 16,
    background: "#1d8fe1",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 24px",
  },
  metaBlock: {
    borderTop: "1px solid #d7d7d7",
    paddingTop: 16,
    display: "flex",
    flexWrap: "wrap",
    color: "#374151",
  },
  metaLine: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  reviewSummary: {
    color: "#374151",
  },
  bottomGrid: {
    display: "grid",
    alignItems: "start",
  },
  tabRow: {
    display: "flex",
    marginBottom: 20,
    borderBottom: "1px solid #e5e7eb",
  },
  tabBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px 0",
    fontSize: 16,
  },
  descriptionBox: {},
  descriptionText: {
    lineHeight: 1.75,
    color: "#1f2937",
  },
  specsList: {
    marginTop: 18,
    display: "grid",
    gap: 8,
  },
  specLine: {
    color: "#1f2937",
    lineHeight: 1.6,
  },
  reviewsList: {
    display: "grid",
    gap: 14,
  },
  noReviewText: {
    color: "#374151",
  },
  reviewCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 16,
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  reviewRating: {
    color: "#f59e0b",
    fontWeight: 900,
  },
  reviewDate: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 14,
  },
  reviewComment: {
    marginTop: 10,
    lineHeight: 1.7,
  },
  reviewFormCard: {
    background: "#fff",
    border: "1px solid #d1d5db",
  },
  formTitle: {
    lineHeight: 1.45,
    marginBottom: 10,
  },
  formSub: {
    color: "#374151",
    marginBottom: 22,
    lineHeight: 1.6,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 16,
    marginTop: 14,
  },
  input: {
    width: "100%",
    border: "1px solid #c7cdd6",
    borderRadius: 16,
    minHeight: 44,
    padding: "10px 14px",
    fontSize: 16,
    boxSizing: "border-box",
    background: "#fff",
  },
  formRow: {
    display: "grid",
    gap: 12,
  },
  checkboxRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginTop: 16,
    color: "#374151",
    lineHeight: 1.5,
  },
  submitBtn: {
    marginTop: 18,
    border: "none",
    background: "#0b76c5",
    color: "#fff",
    borderRadius: 999,
    padding: "12px 26px",
    fontWeight: 900,
    cursor: "pointer",
  },
  relatedSection: {
    marginTop: 44,
  },
  relatedTitle: {
    fontWeight: 900,
    marginBottom: 20,
  },
  relatedGrid: {
    display: "grid",
  },
  relatedCard: {
    position: "relative",
    background: "transparent",
  },
  smallSaleBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    background: "#fff",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 14,
    boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
    zIndex: 2,
  },
  relatedImg: {
    width: "100%",
    objectFit: "contain",
    background: "#fff",
    borderRadius: 10,
  },
  relatedCategory: {
    marginTop: 12,
    color: "#9ca3af",
    textAlign: "center",
    textTransform: "uppercase",
  },
  relatedName: {
    marginTop: 8,
    fontWeight: 800,
    textAlign: "center",
    lineHeight: 1.45,
  },
  relatedPriceRow: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  relatedOldPrice: {
    textDecoration: "line-through",
    color: "#9ca3af",
  },
  relatedPrice: {
    fontWeight: 900,
  },
  relatedDiscount: {
    color: "red",
    fontWeight: 700,
  },
  relatedGst: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: 700,
  },
  relatedCartBtn: {
    margin: "14px auto 0",
    display: "block",
    border: "none",
    borderRadius: 999,
    background: "#0b76c5",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    width: "100%",
  },
};
