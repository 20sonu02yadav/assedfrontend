import React, { useEffect } from "react";

export default function RefundReturns() {
  useEffect(() => {
    // Optional: body class set (build error avoid) — NO "|| prevBodyClass"
    const prevTitle = document.title;
    const prevBodyClass = document.body.className;

    document.title = "Refund & Returns";
    document.body.className = `${prevBodyClass} tunturu-page`.trim();

    return () => {
      document.title = prevTitle;
      document.body.className = prevBodyClass;
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="rr-page">
      <style>{css}</style>

      {/* HEADER */}
      <header className="tt-header">
        <div className="tt-header-inner">
          <a className="tt-logo" href="/">
            {/* Replace with your logo path */}
            <img
              src="/assets/tunturu-logo.png"
              alt="Tunturu"
              onError={(e) => {
                // fallback if logo not found
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="tt-logo-fallback">TUNTURU®</span>
          </a>

          <nav className="tt-nav">
            <a href="/">HOME</a>
            <a href="/store">STORE</a>

            <div className="tt-dropdown">
              <a href="/categories" className="tt-dropbtn">
                CATEGORIES <span className="tt-caret">▾</span>
              </a>
              <div className="tt-dropdown-menu">
                <a href="/categories/hand-tools">Hand Tools</a>
                <a href="/categories/power-tools">Power Tools</a>
                <a href="/categories/safety">Safety</a>
              </div>
            </div>

            <a href="/franchise">FRANCHISE</a>
            <a href="/services">SERVICES</a>
            <a href="/blog">BLOG</a>

            <div className="tt-nav-right">
              <a href="/about">ABOUT</a>
              <a href="/contact">CONTACT US</a>

              <div className="tt-price">₹0.00</div>

              <a className="tt-icon" href="/cart" aria-label="Cart">
                🛒<span className="tt-badge">0</span>
              </a>
              <a className="tt-icon" href="/account" aria-label="Account">
                👤
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="rr-hero">
        <div className="rr-hero-overlay" />
        <div className="rr-hero-content">
          <h1>Refund and Returns</h1>
        </div>
      </section>

      {/* CONTENT */}
      <main className="rr-main">
        <div className="rr-container">
          <div className="rr-grid">
            <div className="rr-block">
              <h2>Return Eligibility</h2>
              <p className="rr-sub">
                Returns are accepted within <b>7 days</b> of delivery if:
              </p>
              <ul>
                <li>Product is unused</li>
                <li>Product is in original packaging</li>
                <li>Product is defective or damaged</li>
              </ul>
            </div>

            <div className="rr-block">
              <h2>Non-Returnable Items</h2>
              <ul>
                <li>Used tools</li>
                <li>Custom or bulk orders</li>
                <li>Clearance items</li>
              </ul>
            </div>

            <div className="rr-block">
              <h2>Refund Process</h2>
              <ul>
                <li>Once approved, refunds will be processed within 5–7 business days.</li>
                <li>Refund will be credited to the original payment method.</li>
              </ul>
            </div>

            <div className="rr-block">
              <h2>Damaged Products</h2>
              <p className="rr-sub">If you receive a damaged product:</p>
              <ul>
                <li>Notify us within 48 hours</li>
                <li>Share photos/videos as proof</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING BUTTONS */}
      <button className="tt-scrolltop" onClick={scrollToTop} aria-label="Scroll to top">
        ↑
      </button>

      <a className="tt-fab-cart" href="/cart" aria-label="Cart">
        <span className="tt-fab-badge">0</span>
        🛒
      </a>

      {/* FOOTER */}
      <footer className="tt-footer">
        <div className="tt-footer-inner">
          <div className="tt-footer-col">
            <div className="tt-footer-logo">
              <span className="tt-footer-logo-text">TUNTURU®</span>
            </div>
            <div className="tt-footer-info">
              <div>Email: Support@tunturu.co.in</div>
              <div>Email: Sales@tunturu.co.in</div>
              <div>Phone: +91 89616 12353</div>
            </div>

            <div className="tt-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="tt-footer-col">
            <h4>
              Quick links <span className="tt-underline" />
            </h4>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact Us</a>
          </div>

          <div className="tt-footer-col">
            <h4>
              Our Polices <span className="tt-underline" />
            </h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/shipping">Shipping Policy</a>
            <a className="tt-active-link" href="/refund-returns">
              Refund &amp; Returns
            </a>
            <a href="/faqs">FAQs</a>
          </div>
        </div>

        <div className="tt-footer-bottom">
          <div>Copyright © 2026 Tunturu</div>
          <div>Powered by Tunturu</div>
        </div>
      </footer>
    </div>
  );
}

/** Single-file CSS (same look + spacing like screenshot) */
const css = `
/* Page reset (fix Vite default center-layout issue) */
.rr-page{
  width:100%;
  min-height:100vh;
  background:#fff;
  color:#111;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* HEADER */
.tt-header{
  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index: 50;
  height: 76px;
  display:flex;
  align-items:center;
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(2px);
}
.tt-header-inner{
  width: min(1400px, calc(100% - 60px));
  margin: 0 auto;
  display:flex;
  align-items:center;
  gap: 24px;
}
.tt-logo{
  display:flex;
  align-items:center;
  gap:10px;
  text-decoration:none;
  color:#0db2ff;
  font-weight:900;
  letter-spacing:.5px;
}
.tt-logo img{
  height: 34px;
  width:auto;
  display:block;
}
.tt-logo-fallback{
  display:none;
  font-size: 28px;
}
.tt-nav{
  display:flex;
  align-items:center;
  gap: 26px;
  flex: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tt-nav a{
  color:#fff;
  text-decoration:none;
  font-weight: 700;
  font-size: 14px;
}
.tt-nav a:hover{ opacity:.85; }
.tt-nav-right{
  margin-left:auto;
  display:flex;
  align-items:center;
  gap:18px;
}
.tt-price{
  color:#fff;
  font-weight: 800;
  font-size: 14px;
}
.tt-icon{
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255,255,255,.06);
}
.tt-badge{
  position:absolute;
  top: -7px;
  right: -7px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background:#fff;
  color:#000;
  font-size: 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 800;
}

/* Dropdown */
.tt-dropdown{ position: relative; }
.tt-caret{ opacity:.9; font-weight:900; margin-left:4px; }
.tt-dropdown-menu{
  position:absolute;
  top: 42px;
  left:0;
  min-width: 180px;
  background:#fff;
  border-radius: 10px;
  overflow:hidden;
  box-shadow: 0 18px 40px rgba(0,0,0,.25);
  display:none;
}
.tt-dropdown-menu a{
  color:#111;
  display:block;
  padding: 10px 12px;
  font-weight: 700;
}
.tt-dropdown-menu a:hover{ background:#f2f4f7; }
.tt-dropdown:hover .tt-dropdown-menu{ display:block; }

/* HERO */
.rr-hero{
  height: 520px;
  width: 100%;
  position: relative;
  background-image:
    url("https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-pavel-danilyuk-6407384.jpg");
  background-size: cover;
  background-position: center;
}
.rr-hero-overlay{
  position:absolute;
  inset:0;
  background: rgba(0,0,0,.35);
}
.rr-hero-content{
  position: absolute;
  inset: 0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 0 20px;
}
.rr-hero-content h1{
  color:#fff;
  font-size: clamp(44px, 6vw, 74px);
  font-weight: 900;
  margin:0;
}

/* MAIN */
.rr-main{
  background: #f4f6f8;
  padding: 110px 0 120px;
}
.rr-container{
  width: min(1400px, calc(100% - 100px));
  margin: 0 auto;
}
.rr-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px 120px;
}
.rr-block h2{
  font-size: 34px;
  margin: 0 0 14px;
  font-weight: 900;
}
.rr-sub{
  margin: 0 0 18px;
  font-size: 16px;
  color:#333;
}
.rr-block ul{
  margin: 0;
  padding-left: 24px;
}
.rr-block li{
  margin: 12px 0;
  font-size: 16px;
  color:#111;
}

/* Floating scroll-top button */
.tt-scrolltop{
  position: fixed;
  left: 24px;
  bottom: 24px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: none;
  background: #7b8cff;
  color:#0b0b0b;
  font-size: 26px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0,0,0,.25);
  z-index: 60;
}
.tt-scrolltop:hover{ filter: brightness(0.98); }

/* Floating cart button */
.tt-fab-cart{
  position: fixed;
  right: 26px;
  bottom: 30px;
  width: 74px;
  height: 74px;
  border-radius: 999px;
  background: #0986ff;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  font-size: 28px;
  box-shadow: 0 16px 35px rgba(0,0,0,.25);
  z-index: 60;
}
.tt-fab-badge{
  position:absolute;
  top: 10px;
  left: 10px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #2bd36f;
  color:#0b0b0b;
  font-weight: 900;
  font-size: 12px;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* FOOTER */
.tt-footer{
  background:#000;
  color:#fff;
  padding: 70px 0 0;
}
.tt-footer-inner{
  width: min(1400px, calc(100% - 100px));
  margin: 0 auto;
  display:grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 70px;
  padding-bottom: 60px;
}
.tt-footer-col a{
  color:#fff;
  text-decoration:none;
  display:block;
  margin: 12px 0;
  font-size: 16px;
}
.tt-footer-col a:hover{ opacity:.85; }
.tt-footer-col h4{
  margin: 0 0 18px;
  font-size: 22px;
  font-weight: 900;
  position: relative;
  display:inline-block;
}
.tt-underline{
  display:block;
  width: 62px;
  height: 2px;
  background: #7b8cff;
  margin-top: 10px;
}
.tt-footer-logo-text{
  font-weight: 900;
  font-size: 44px;
  letter-spacing: 1px;
  color:#0db2ff;
}
.tt-footer-info{
  margin-top: 14px;
  line-height: 1.9;
  font-size: 18px;
  color:#fff;
}
.tt-social{
  display:flex;
  gap: 10px;
  margin-top: 18px;
}
.tt-social a{
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background:#fff;
  color:#000;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 900;
  text-decoration:none;
  margin:0;
}
.tt-active-link{
  color:#7b8cff !important;
}
.tt-footer-bottom{
  border-top: 1px solid rgba(255,255,255,.1);
  padding: 22px 0;
  width: min(1400px, calc(100% - 100px));
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:#fff;
  font-size: 18px;
}

/* Responsive */
@media (max-width: 1100px){
  .tt-header-inner{ width: calc(100% - 28px); }
  .rr-container{ width: calc(100% - 28px); }
  .tt-footer-inner{ width: calc(100% - 28px); grid-template-columns: 1fr; }
  .tt-footer-bottom{ width: calc(100% - 28px); flex-direction: column; gap: 10px; }
  .rr-grid{ grid-template-columns: 1fr; gap: 44px; }
  .tt-nav{ gap: 14px; }
}
`;