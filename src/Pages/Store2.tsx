import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Brand = {
  id: string;
  name: string; // display title under tile
  imageUrl?: string; // logo image
  category?: string; // optional grouping
};

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// ⚠️ Apne Store page ka hero bg (same as WP) yaha paste kar dena
const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2018/12/slide-image-free-img.jpg";

const BRANDS: Brand[] = [
  {
    id: "aura",
    name: "AURA ELECTROFUSION FITTINGS",
    imageUrl:
      "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/2.jpg",
  },
  {
    id: "gravis",
    name: "GRAVIS",
    imageUrl:
      "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/3.jpg",
  },
  {
    id: "mrlight",
    name: "MR LIGHT",
    imageUrl:
      "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/4.jpg",
  },
  {
    id: "philips",
    name: "PHILIPS",
    imageUrl:
      "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/1.jpg",
  },
  {
    id: "totaltools",
    name: "TOTAL TOOLS",
    imageUrl:
      "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/5.jpg",
  },


  {
    id: "uncategorized",
    name: "UNCATEGORIZED",
    imageUrl:
      "/assets/images/uncagory.png",
  },

];

export default function Store() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [orderBy, setOrderBy] = useState("default");
  const [pricing, setPricing] = useState("default");
  const [showCategories, setShowCategories] = useState(false);
  const [showTotalTools, setShowTotalTools] = useState(false);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = BRANDS.filter((b) => (q ? b.name.toLowerCase().includes(q) : true));

    // demo sorting (optional)
    if (sortBy === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [search, sortBy]);

  const cartCount = 0;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div style={styles.page}>
      {/* Header + Hero */}
      <div style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        {/* dark overlay */}
        <div style={styles.heroOverlay} />

        {/* header bar */}
        <div style={styles.headerWrap}>
          <div style={styles.header}>
            <Link to="/" style={styles.logoLink} aria-label="Tunturu Home">
              <img src={LOGO_URL} alt="Tunturu" style={styles.logoImg} />
            </Link>

            <nav style={styles.nav}>
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/store">STORE</NavLink>

              
              <div
  style={styles.dropdownWrap}
  onClick={() => setShowCategories((prev) => !prev)}
>
  <span style={styles.navA}>
    CATEGORIES <span style={styles.caret}>⌄</span>
  </span>

  {showCategories && (
    <div style={styles.dropdownMenu}>
      
      {/* TOTAL TOOLS */}
      <div
        style={styles.dropdownItemWithArrow}
        onClick={(e) => {
          e.stopPropagation();
          setShowTotalTools((prev) => !prev);
        }}
      >
        TOTAL TOOLS <span>›</span>
      </div>

      {/* SUBMENU */}
      {showTotalTools && (
        <div style={styles.subMenu}>
          {[
            "AIR COMPRESSOR",
            "AIR TOOLS",
            "AUTO MOBILES",
            "CHARGER",
            "CORDLESS POWER TOOLS",
            "GARDEN TOOLS",
            "GENERATORS",
            "HAND TOOLS",
            "HARD WARE",
            "LADDER",
            "LIGHT CONSTRUCTION TOOLS",
            "MEASURING TOOLS",
            "POWER TOOLS",
            "POWER TOOLS ACCESSORIES",
            "PUMPS",
            "SAFETY PRODUCTS",
            "WELDING MACHINE",
          ].map((item) => (
            <Link
              key={item}
              to={`/category/total-tools/${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* Other Categories */}
      <Link to="/category/aura" style={styles.dropdownItem}>AURA</Link>
      <Link to="/category/gravis" style={styles.dropdownItem}>GRAVIS</Link>
      <Link to="/category/mr-light" style={styles.dropdownItem}>MR LIGHT</Link>
      <Link to="/category/philips" style={styles.dropdownItem}>PHILIPS</Link>
    </div>
  )}
</div>


              <NavLink to="/franchise">FRANCHISE</NavLink>
              <NavLink to="/services">SERVICES</NavLink>
              <NavLink to="/blog">BLOG</NavLink>
            </nav>

            <div style={styles.headerRight}>
              <NavLink to="/about">ABOUT</NavLink>
              <NavLink to="/contact">CONTACT US</NavLink>

              <div style={styles.price}>₹0.00</div>

              <div style={styles.iconGroup}>
                <div style={styles.cartIconWrap} title="Cart">
                  <span style={styles.cartBadge}>{cartCount}</span>
                  <span style={styles.iconText}>🛒</span>
                </div>
                <div style={styles.userIconWrap} title="Account">
                  <span style={styles.iconText}>👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hero center text */}
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

          <div style={styles.filterBottomRow}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.selectPill}>
              <option value="default">Sort By</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>

            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} style={styles.selectPill}>
              <option value="default">Order By</option>
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
            </select>

            <select value={pricing} onChange={(e) => setPricing(e.target.value)} style={styles.selectPill}>
              <option value="default">Pricing</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {/* Brand Tiles */}
        <div style={styles.gridWrap}>
          {/* (screenshot me right side "UNCATEGORIZED" text dikh raha hai) */}
         

          <div style={styles.grid}>
            {filtered.map((b) => (
              <div key={b.id} style={styles.tile}>
                <div style={styles.tileInner}>
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt={b.name} style={styles.tileImg} />
                  ) : (
                    <div style={styles.tileNoImg}>{b.name}</div>
                  )}
                </div>

                <div style={styles.tileLabel}>{b.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <button onClick={scrollToTop} style={styles.scrollTopBtn} aria-label="Scroll to top">
        ⬆
      </button>

      <button style={styles.floatingCart} aria-label="Cart">
        <span style={styles.floatingBadge}>{cartCount}</span>
        🛒
      </button>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerCol}>
            <div style={styles.footerLogo}>TUNTURU</div>
            <div style={styles.footerText}>Email: Support@tunturu.co.in</div>
            <div style={styles.footerText}>Email: Sales@tunturu.co.in</div>
            <div style={styles.footerText}>Phone: +91 89616 12353</div>

            <div style={styles.socialRow}>
              <span style={styles.socialIcon}>f</span>
              <span style={styles.socialIcon}>𝕏</span>
              <span style={styles.socialIcon}>▶</span>
            </div>
          </div>

          <div style={styles.footerCol}>
            <div style={styles.footerHeading}>Quick links</div>
            <div style={styles.footerUnderline} />
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </div>

          <div style={styles.footerCol}>
            <div style={styles.footerHeading}>Our Polices</div>
            <div style={styles.footerUnderline} />
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms &amp; Conditions</FooterLink>
            <FooterLink to="/shipping">Shipping Policy</FooterLink>
            <FooterLink to="/refund">Refund &amp; Returns</FooterLink>
            <FooterLink to="/faqs">FAQs</FooterLink>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerBottomText}>Copyright © 2026 Tunturu</div>
          <div style={styles.footerBottomText}>Powered by Tunturu</div>
        </div>
      </footer>
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

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} style={styles.footerLink}>
      {children}
    </Link>
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
  padding: "0 60px",   // clean side spacing
  boxSizing: "border-box",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(4px)",
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

  gridWrap: { position: "relative", paddingTop: 36 },
  uncategorized: {
    position: "absolute",
    right: 0,
    top: 12,
    fontWeight: 800,
    letterSpacing: 0.6,
    color: "#111",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 70,
    alignItems: "start",
  },
  tile: { display: "flex", flexDirection: "column", alignItems: "center", gap: 18 },
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
  tileImg: { width: "85%", height: "85%", objectFit: "contain" },
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
  width: 260,
  background: "#fff",
  borderRadius: 20,
  padding: "20px 0",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: 14,
  zIndex: 9999,
},

dropdownItem: {
  padding: "0 24px",
  textDecoration: "none",
  color: "#000",
  fontWeight: 600,
  fontSize: 16,
},

dropdownItemWithArrow: {
  padding: "0 24px",
  color: "#000",
  fontWeight: 600,
  fontSize: 16,
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
},
subMenu: {
  position: "absolute",
  top: 0,
  left: "100%",
  width: 300,
  background: "#f1f1f1",
  borderRadius: 20,
  padding: "20px 0",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: 14,
  zIndex: 9999,          // 🔥 important
},

subMenuItem: {
  padding: "0 24px",
  textDecoration: "none",
  color: "#000",
  fontWeight: 600,
  fontSize: 15,
},

  // simple responsive (JS-less): user’s CSS can override; this is ok for most
};

// Quick responsive improvement (optional):
// If you want: 3 cols desktop, 2 cols tablet, 1 col mobile – add this CSS in your global css:
// @media (max-width: 1100px){ .storeGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
// @media (max-width: 700px){ .storeGrid { grid-template-columns: repeat(1, minmax(0, 1fr)); } }