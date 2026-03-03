import React, { useMemo, useState } from "react";

/**
 * FranchiseApplication.tsx
 * - Header EXACT style (transparent + dark overlay strip + menu items)
 * - Hero title: "Franchise Application"
 * - Form layout same as screenshot (grey form container, rounded inputs)
 * - Footer same like your screenshot
 * - Floating cart + scroll-to-top
 */

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const HERO_BG =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2400&q=80";

type TypeOfBusiness = "Proprietorship" | "Partnership" | "Pvt Ltd" | "Ltd Co" | "Other";
type NatureOfBusiness = "Retail" | "Wholesale" | "Distribution" | "Online" | "Other";
type YesNo = "Yes" | "No";

export default function FranchiseApplication() {
  const yearsOptions = useMemo(
    () => ["Less than 1", "1-2", "3-5", "6-10", "10+"] as const,
    []
  );

  const [typeOfBusiness, setTypeOfBusiness] = useState<TypeOfBusiness>("Proprietorship");
  const [natureOfBusiness, setNatureOfBusiness] = useState<NatureOfBusiness>("Retail");
  const [warehouse, setWarehouse] = useState<YesNo>("No");
  const [yearsInOperation, setYearsInOperation] = useState<(typeof yearsOptions)[number]>("Less than 1");
  const [confirm, setConfirm] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm) {
      alert("Please confirm that the information provided is accurate.");
      return;
    }
    alert("Application submitted (demo). Connect your API here.");
  };

  return (
    <div style={styles.page}>
      <SiteHeader />

      {/* HERO */}
      <section style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroDim} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Franchise Application</h1>
        </div>
      </section>

      {/* FORM */}
      <section style={styles.bodyWrap}>
        <form onSubmit={onSubmit} style={styles.formOuter}>
          <div style={styles.formInner}>
            {/* Registered Business Name */}
            <div style={styles.field}>
              <label style={styles.label}>
                Registered Business Name <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Trading Name */}
            <div style={styles.field}>
              <label style={styles.label}>Trading Name</label>
              <input style={styles.input} />
            </div>

            {/* Type of Business */}
            <div style={styles.field}>
              <label style={styles.label}>
                Type of Business <span style={styles.req}>*</span>
              </label>

              <div style={styles.radioCol}>
                {(["Proprietorship", "Partnership", "Pvt Ltd", "Ltd Co", "Other"] as TypeOfBusiness[]).map(
                  (v) => (
                    <label key={v} style={styles.radioRow}>
                      <input
                        type="radio"
                        name="typeOfBusiness"
                        checked={typeOfBusiness === v}
                        onChange={() => setTypeOfBusiness(v)}
                      />
                      <span style={styles.radioText}>{v}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* GSTIN */}
            <div style={styles.field}>
              <label style={styles.label}>GSTIN (Tax Identification Number)</label>
              <input style={styles.input} />
            </div>

            {/* City */}
            <div style={styles.field}>
              <label style={styles.label}>
                City <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* State */}
            <div style={styles.field}>
              <label style={styles.label}>
                State <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Postal Code */}
            <div style={styles.field}>
              <label style={styles.label}>
                Postal Code <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Primary Contact Person */}
            <div style={styles.field}>
              <label style={styles.label}>
                Primary Contact Person <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Designation */}
            <div style={styles.field}>
              <label style={styles.label}>
                Designation <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Email */}
            <div style={styles.field}>
              <label style={styles.label}>
                Email Address <span style={styles.req}>*</span>
              </label>
              <input required type="email" style={styles.input} />
            </div>

            {/* Alternate Contact */}
            <div style={styles.field}>
              <label style={styles.label}>Alternate Contact Person</label>
              <input style={styles.input} />
            </div>

            {/* Years in Operation */}
            <div style={styles.field}>
              <label style={styles.label}>
                Years in Operation <span style={styles.req}>*</span>
              </label>
              <select
                required
                value={yearsInOperation}
                onChange={(e) => setYearsInOperation(e.target.value as any)}
                style={styles.select}
              >
                {yearsOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Nature of Business */}
            <div style={styles.field}>
              <label style={styles.label}>
                Nature of Business <span style={styles.req}>*</span>
              </label>
              <div style={styles.radioCol}>
                {(["Retail", "Wholesale", "Distribution", "Online", "Other"] as NatureOfBusiness[]).map((v) => (
                  <label key={v} style={styles.radioRow}>
                    <input
                      type="radio"
                      name="natureOfBusiness"
                      checked={natureOfBusiness === v}
                      onChange={() => setNatureOfBusiness(v)}
                    />
                    <span style={styles.radioText}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Main Product Categories */}
            <div style={styles.field}>
              <label style={styles.label}>
                Main Product Categories <span style={styles.req}>*</span>
              </label>
              <textarea required rows={5} style={styles.textarea} />
            </div>

            {/* Geographical Coverage */}
            <div style={styles.field}>
              <label style={styles.label}>
                Geographical Coverage <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} />
            </div>

            {/* Number of Employees */}
            <div style={styles.field}>
              <label style={styles.label}>Number of Employees</label>
              <input style={styles.input} />
            </div>

            {/* Annual Turnover */}
            <div style={styles.field}>
              <label style={styles.label}>Annual Turnover</label>
              <input style={styles.input} />
            </div>

            {/* Storage/Warehouse */}
            <div style={styles.field}>
              <label style={styles.label}>
                Storage/Warehouse Facility <span style={styles.req}>*</span>
              </label>
              <div style={styles.radioCol}>
                {(["Yes", "No"] as YesNo[]).map((v) => (
                  <label key={v} style={styles.radioRow}>
                    <input
                      type="radio"
                      name="warehouse"
                      checked={warehouse === v}
                      onChange={() => setWarehouse(v)}
                    />
                    <span style={styles.radioText}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* If yes details */}
            <div style={styles.field}>
              <label style={styles.label}>If Yes specify size/details</label>
              <textarea rows={5} style={styles.textarea} />
            </div>

            {/* Existing Dealerships */}
            <div style={styles.field}>
              <label style={styles.label}>Existing Dealerships / Brands Represented</label>
              <textarea rows={4} style={styles.textarea} />
            </div>

            {/* Confirm + Submit */}
            <div style={styles.field}>
              <label style={styles.label}>
                I confirm that the information provided is accurate. <span style={styles.req}>*</span>
              </label>

              <label style={{ ...styles.radioRow, marginTop: 10 }}>
                <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
                <span style={styles.radioText}>I confirm that the information provided is accurate.</span>
              </label>

              <button type="submit" style={styles.submitBtn}>
                SUBMIT APPLICATION
              </button>
            </div>
          </div>
        </form>
      </section>

      <SiteFooter />
      <ScrollToTopButton />
      <FloatingCartButton />
    </div>
  );
}

/* ============================ HEADER (same like screenshot) ============================ */
function SiteHeader() {
  return (
    <header style={styles.header}>
      {/* Dark transparent strip behind nav (like your screenshot) */}
      <div style={styles.headerStrip} />

      <div style={styles.headerInner}>
        <a href="/" style={styles.logoWrap}>
          <img src={LOGO_URL} alt="Tunturu" style={styles.logoImg} />
        </a>

        <nav style={styles.nav}>
          <a style={styles.navLink} href="/">
            HOME
          </a>
          <a style={styles.navLink} href="/store">
            STORE
          </a>

          <div style={styles.navDrop}>
            <a style={styles.navLink} href="/categories">
              CATEGORIES
            </a>
            <span style={styles.navDropIcon}>⌄</span>
          </div>

          <a style={styles.navLink} href="/franchise">
            FRANCHISE
          </a>
          <a style={styles.navLink} href="/services">
            SERVICES
          </a>
          <a style={styles.navLink} href="/blog">
            BLOG
          </a>
        </nav>

        <div style={styles.headerRight}>
          <a style={styles.navLink} href="/about">
            ABOUT
          </a>
          <a style={styles.navLink} href="/contact">
            CONTACT US
          </a>
          <span style={styles.headerMeta}>₹0.00</span>
          <span style={styles.headerIcon} title="Cart">
            🛒
          </span>
          <span style={styles.headerIcon} title="Account">
            👤
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================ FOOTER (same like screenshot) ============================ */
function SiteFooter() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerTop}>
        <div style={styles.footerCol}>
          <img src={LOGO_URL} alt="Tunturu" style={{ ...styles.logoImg, height: 44, width: "auto" }} />
          <div style={{ height: 18 }} />
          <div style={styles.footerText}>Email: Support@tunturu.co.in</div>
          <div style={styles.footerText}>Email: Sales@tunturu.co.in</div>
          <div style={styles.footerText}>Phone: +91 89616 12353</div>

          <div style={styles.socialRow}>
            <span style={styles.socialIcon}>f</span>
            <span style={styles.socialIcon}>t</span>
            <span style={styles.socialIcon}>▶</span>
          </div>
        </div>

        <div style={styles.footerCol}>
          <div style={styles.footerTitle}>Quick links</div>
          <div style={styles.footerTitleLine} />
          <a style={styles.footerLink} href="/">
            Home
          </a>
          <a style={styles.footerLink} href="/about">
            About
          </a>
          <a style={styles.footerLink} href="/blog">
            Blog
          </a>
          <a style={styles.footerLink} href="/contact">
            Contact Us
          </a>
        </div>

        <div style={styles.footerCol}>
          <div style={styles.footerTitle}>Our Polices</div>
          <div style={styles.footerTitleLine} />
          <a style={styles.footerLink} href="/privacy-policy">
            Privacy Policy
          </a>
          <a style={styles.footerLink} href="/terms-conditions">
            Terms &amp; Conditions
          </a>
          <a style={styles.footerLink} href="/shipping-policy">
            Shipping Policy
          </a>
          <a style={styles.footerLink} href="/refund-returns">
            Refund &amp; Returns
          </a>
          <a style={styles.footerLink} href="/faqs">
            FAQs
          </a>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <div style={styles.footerBottomInner}>
          <div style={styles.footerBottomText}>Copyright © 2026 Tunturu</div>
          <div style={styles.footerBottomText}>Powered by Tunturu</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================ Floating Buttons ============================ */
function FloatingCartButton() {
  return (
    <button type="button" aria-label="Cart" style={styles.cartFab} onClick={() => {}}>
      <div style={styles.cartBadge}>0</div>
      <span style={{ fontSize: 22 }}>🛒</span>
    </button>
  );
}

function ScrollToTopButton() {
  const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button type="button" aria-label="Scroll to top" style={styles.topFab} onClick={onClick}>
      <span style={{ fontSize: 18 }}>↑</span>
    </button>
  );
}

/* ============================ STYLES ============================ */
const styles: Record<string, React.CSSProperties> = {
  page: { background: "#f4f6f8", minHeight: "100vh" },

  /* Header */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: 92,
  },
  headerStrip: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.28)",
  },
  headerInner: {
    position: "relative",
    height: "100%",
    padding: "0 26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  logoWrap: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoImg: { height: 34, width: "auto", objectFit: "contain" },

  nav: { display: "flex", alignItems: "center", gap: 26 },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 800,
    letterSpacing: 0.6,
    fontSize: 14,
    opacity: 0.98,
  },
  navDrop: { display: "flex", alignItems: "center", gap: 8 },
  navDropIcon: { color: "#fff", opacity: 0.95, marginTop: -2 },

  headerRight: { display: "flex", alignItems: "center", gap: 18 },
  headerMeta: { color: "#fff", fontWeight: 800, fontSize: 14, opacity: 0.98 },
  headerIcon: { color: "#fff", fontSize: 18, opacity: 0.98 },

  /* Hero */
  hero: {
    height: 520,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  heroDim: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" },
  heroContent: {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 64,
    fontWeight: 900,
    margin: 0,
    letterSpacing: 0.2,
  },

  /* Form section */
  bodyWrap: { padding: "60px 18px 90px" },
  formOuter: {
    maxWidth: 1100,
    margin: "0 auto",
    background: "#efefef",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: 0,
  },
  formInner: { padding: "34px 34px", display: "grid", gridTemplateColumns: "1fr", gap: 22 },

  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: 18, fontWeight: 700, color: "#111" },
  req: { color: "red", fontWeight: 900 },

  input: {
    marginTop: 10,
    height: 56,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "0 18px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
  },
  select: {
    marginTop: 10,
    height: 52,
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "0 14px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
  },
  textarea: {
    marginTop: 10,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "14px 16px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
    resize: "vertical",
  },
  radioCol: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 },
  radioRow: { display: "flex", alignItems: "center", gap: 10 },
  radioText: { fontSize: 16, color: "#111" },

  submitBtn: {
    marginTop: 18,
    background: "#0b82ff",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 22px",
    fontWeight: 900,
    width: "fit-content",
    cursor: "pointer",
    letterSpacing: 0.4,
  },

  /* Footer */
  footer: { background: "#000", color: "#fff", paddingTop: 60 },
  footerTop: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px 42px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: 44,
  },
  footerCol: { display: "flex", flexDirection: "column" },
  footerText: { color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 10 },
  footerTitle: { fontSize: 22, fontWeight: 800 },
  footerTitleLine: { width: 70, height: 2, background: "#77a7ff", marginTop: 10, marginBottom: 18 },
  footerLink: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: 18,
    marginBottom: 14,
    width: "fit-content",
  },
  socialRow: { display: "flex", gap: 12, marginTop: 14 },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: 999,
    background: "#fff",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.08)", padding: "26px 0" },
  footerBottomInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerBottomText: { color: "rgba(255,255,255,0.9)", fontSize: 18 },

  /* Floating buttons */
  cartFab: {
    position: "fixed",
    right: 22,
    bottom: 120,
    width: 70,
    height: 70,
    borderRadius: 999,
    border: "none",
    background: "#0b82ff",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  cartBadge: {
    position: "absolute",
    top: 10,
    left: 12,
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "#34c759",
    color: "#fff",
    fontSize: 12,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topFab: {
    position: "fixed",
    left: 22,
    bottom: 120,
    width: 60,
    height: 60,
    borderRadius: 999,
    border: "none",
    background: "#8aa2ff",
    color: "#000",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
};