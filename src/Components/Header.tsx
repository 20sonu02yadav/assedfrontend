import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategoryTree } from "../services/storeApi";
import type { CategoryNode } from "../services/storeApi";

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

export default function Header() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategoryTree()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

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
    return categories.filter(
      (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
    );
  }, [categories]);

  function goCategory(slug: string) {
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    setMobileOpen(false);
    navigate(`/category/${slug}`);
  }

  return (
    <>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.inner}>
          {/* LEFT */}
          <div style={styles.left}>
            {/* MOBILE HAMBURGER */}
            <div
              style={styles.hamburger}
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </div>

            <Link to="/">
              <img src={LOGO_URL} alt="Logo" style={styles.logo} />
            </Link>

            {/* DESKTOP NAV */}
            <nav style={styles.nav}>
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/store">STORE</NavLink>

              {/* CATEGORY DROPDOWN */}
              <div
                ref={dropdownRef}
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => setShowCategories((p) => !p)}
              >
                <span style={styles.navLink}>
                  CATEGORIES ⌄
                </span>

                {showCategories && (
                  <div style={styles.dropdown}>
                    {totalToolsParent && (
                      <div style={{ position: "relative" }}>
                        <div
                          style={styles.dropdownItem}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSubmenuSlug((s) =>
                              s === totalToolsParent.slug
                                ? null
                                : totalToolsParent.slug
                            );
                          }}
                        >
                          {TOTAL_TOOLS_PARENT_NAME} ›
                        </div>

                        {openSubmenuSlug === totalToolsParent.slug && (
                          <div style={styles.subMenu}>
                            {(totalToolsParent.children || []).map((child) => (
                              <button
                                key={child.slug}
                                style={styles.subItem}
                                onClick={() => goCategory(child.slug)}
                              >
                                {child.name.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {topLevelCategories.map((c) => (
                      <button
                        key={c.slug}
                        style={styles.dropdownItemBtn}
                        onClick={() => goCategory(c.slug)}
                      >
                        {c.name.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/franchise">FRANCHISE</NavLink>
              <NavLink to="/services">SERVICES</NavLink>
              <NavLink to="/blog">BLOG</NavLink>
            </nav>
          </div>

          {/* RIGHT */}
          <div style={styles.right}>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT US</NavLink>
            <span style={styles.price}>₹0.00</span>

            <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
              🛒
              <span style={styles.badge}>0</span>
            </div>

            <div onClick={() => navigate("/my-account")} style={{ cursor: "pointer" }}>
              👤
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <>
          <div
            style={styles.mobileOverlay}
            onClick={() => setMobileOpen(false)}
          />

          <div style={styles.mobileMenu}>
            <div style={styles.mobileTop}>
              <span>Menu</span>
              <button
                style={styles.closeBtn}
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
            <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>

            <div style={styles.mobileCategory}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>CATEGORIES</div>

              {categories.map((c) => (
                <div
                  key={c.slug}
                  style={styles.mobileCatItem}
                  onClick={() => goCategory(c.slug)}
                >
                  {c.name.toUpperCase()}
                </div>
              ))}
            </div>

            <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
            <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
            <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
            <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
            <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
          </div>
        </>
      )}
    </>
  );
}

/* Reusable */
function NavLink({ to, children }: any) {
  return (
    <Link to={to} style={styles.navLink}>
      {children}
    </Link>
  );
}

function MobileLink({ to, children, close }: any) {
  return (
    <Link to={to} style={styles.mobileLink} onClick={close}>
      {children}
    </Link>
  );
}

/* STYLES */
const styles: any = {
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 999,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
  },
  inner: {
    height: 76,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  left: { display: "flex", alignItems: "center", gap: 25 },
  logo: { height: 40 },
  nav: {
    display: "flex",
    gap: 24,
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
  },
  right: { display: "flex", alignItems: "center", gap: 20 },
  price: { color: "#fff", fontWeight: 800 },
  iconWrap: { position: "relative", cursor: "pointer", color: "#fff" },
  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    width: 18,
    height: 18,
    borderRadius: 999,
    background: "#fff",
    color: "#000",
    display: "grid",
    placeItems: "center",
    fontSize: 11,
    fontWeight: 800,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 260,
    background: "#fff",
    borderRadius: 16,
    padding: 10,
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
  },
  dropdownItem: {
    padding: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  dropdownItemBtn: {
    padding: 10,
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer",
  },
  subMenu: {
    position: "absolute",
    left: "100%",
    top: 0,
    background: "#f3f3f3",
    padding: 10,
    borderRadius: 12,
  },
  subItem: {
    padding: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700,
  },

  /* MOBILE */
  hamburger: {
    display: "none",
    fontSize: 24,
    color: "#fff",
    cursor: "pointer",
  },
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 998,
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 280,
    height: "100%",
    background: "#111",
    color: "#fff",
    padding: 20,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  mobileTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
  },
  mobileLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
  },
  mobileCategory: { marginTop: 10 },
  mobileCatItem: {
    padding: "6px 0",
    cursor: "pointer",
  },
};