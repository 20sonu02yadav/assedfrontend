import React, { useEffect, useState } from "react";

/**
 * Privacy.tsx (single file)
 * Pure React / No WordPress / No WooCommerce
 * Matches screenshot:
 * - Transparent top nav on hero
 * - Big "Privacy Policy"
 * - Light gray content area
 * - Two-column sections (left/right) + bullet lists
 * - Same black footer + bottom bar
 * - Floating cart + back-to-top
 */

export default function Privacy() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="pPage">
        {/* HEADER */}
        <header className="pHeader">
          <div className="pContainer pHeaderRow">
            <div className="pBrand">
              <img
                src="/assets/logo.png"
                alt="Tunturu"
                className="pLogo"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <div className="pBrandText">TUNTURU</div>
            </div>

            <nav className="pNav">
              <a className="pNavLink" href="/">HOME</a>
              <a className="pNavLink" href="/store">STORE</a>
              <a className="pNavLink" href="/store">CATEGORIES</a>
              <span className="pCaret">⌄</span>
              <a className="pNavLink" href="/franchise">FRANCHISE</a>
              <a className="pNavLink" href="/services">SERVICES</a>
              <a className="pNavLink" href="/blog">BLOG</a>

              <span className="pNavSpacer" />

              <a className="pNavLink" href="/about">ABOUT</a>
              <a className="pNavLink" href="#contact">CONTACT US</a>

              <div className="pHeaderIcons">
                <div className="pPrice">₹0.00</div>
                <div className="pCartMini" title="Cart">
                  <span className="pCartCount">0</span>
                  <IconCartSmall />
                </div>
                <div className="pUser" title="Account">
                  <IconUserSmall />
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="pHero">
          <div className="pHeroOverlay" />
          <div className="pHeroInner">
            <h1 className="pHeroTitle">Privacy Policy</h1>
          </div>
        </section>

        {/* CONTENT */}
        <section className="pContentWrap">
          <div className="pContainer pContent">
            {/* Introduction */}
            <h2 className="pH2">Introduction</h2>
            <p className="pPara">
              At Tunturu Tools, we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website
              or make a purchase.
            </p>

            <div className="pSpacer" />

            {/* Information we collect */}
            <h2 className="pH2">Information We Collect</h2>
            <p className="pPara">We may collect the following information:</p>

            <div className="pTwoCols">
              <div className="pCol">
                <h3 className="pH3">Personal Information</h3>
                <ul className="pList">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Billing &amp; Shipping Address</li>
                  <li>Payment Information</li>
                </ul>
              </div>

              <div className="pCol">
                <h3 className="pH3">Automatically Collected Information</h3>
                <ul className="pList">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited</li>
                  <li>Cookies and usage data</li>
                </ul>
              </div>
            </div>

            <div className="pSpacer2" />

            {/* How we use + Sharing */}
            <div className="pTwoCols">
              <div className="pCol">
                <h2 className="pH2 small">How We Use Your Information</h2>
                <p className="pPara">We use your information to:</p>
                <ul className="pList">
                  <li>Process and fulfill orders</li>
                  <li>Provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send order updates and promotional emails</li>
                  <li>Prevent fraud and unauthorized activity</li>
                </ul>
              </div>

              <div className="pCol">
                <h2 className="pH2 small">Sharing of Information</h2>
                <p className="pPara">We may share data with:</p>
                <ul className="pList">
                  <li>Payment gateways</li>
                  <li>Shipping partners</li>
                  <li>Legal authorities (if required by law)</li>
                </ul>
              </div>
            </div>

            <div className="pSpacer2" />

            {/* Cookies + Rights */}
            <div className="pTwoCols">
              <div className="pCol">
                <h2 className="pH2 small">Cookies</h2>
                <p className="pPara">We use cookies to:</p>
                <ul className="pList">
                  <li>Improve user experience</li>
                  <li>Analyze website traffic</li>
                  <li>Remember cart information</li>
                </ul>
                <p className="pPara muted">You can disable cookies in your browser settings.</p>
              </div>

              <div className="pCol">
                <h2 className="pH2 small">Your Rights</h2>
                <p className="pPara">You have the right to:</p>
                <ul className="pList">
                  <li>Request access to your data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                </ul>

                <p className="pPara">
                  Contact us at: <span className="pInline">[Insert Email]</span>
                </p>
              </div>
            </div>

            <div className="pSpacer2" />

            {/* Data Security */}
            <h2 className="pH2">Data Security</h2>
            <p className="pPara">
              We implement industry-standard security measures including SSL encryption and secure servers to protect
              your data.
            </p>

            <div className="pSpacer" />

            {/* Changes */}
            <h2 className="pH2">Changes to This Policy</h2>
            <p className="pPara">We may update this policy periodically. Changes will be posted on this page.</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pFooter" id="contact">
          <div className="pContainer pFooterGrid">
            <div className="pFooterCol">
              <div className="pFooterLogoText">TUNTURU</div>
              <div className="pFooterText">
                <div>Email: Support@tunturu.co.in</div>
                <div>Email: Sales@tunturu.co.in</div>
                <div>Phone: +91 89616 12353</div>
              </div>

              <div className="pSocialRow">
                <a className="pSocialBtn" href="#" aria-label="Facebook"><IconFb /></a>
                <a className="pSocialBtn" href="#" aria-label="Twitter"><IconTw /></a>
                <a className="pSocialBtn" href="#" aria-label="Youtube"><IconYt /></a>
              </div>
            </div>

            <div className="pFooterCol">
              <div className="pFooterHeading">Quick links</div>
              <div className="pFooterLine" />
              <a className="pFooterLink" href="/">Home</a>
              <a className="pFooterLink" href="/about">About</a>
              <a className="pFooterLink" href="/blog">Blog</a>
              <a className="pFooterLink" href="#contact">Contact Us</a>
            </div>

            <div className="pFooterCol">
              <div className="pFooterHeading">Our Polices</div>
              <div className="pFooterLine" />
              <a className="pFooterLink active" href="/privacy">Privacy Policy</a>
              <a className="pFooterLink" href="/terms">Terms &amp; Conditions</a>
              <a className="pFooterLink" href="/shipping">Shipping Policy</a>
              <a className="pFooterLink" href="/refund">Refund &amp; Returns</a>
              <a className="pFooterLink" href="/faqs">FAQs</a>
            </div>
          </div>

          <div className="pFooterBottom">
            <div className="pContainer pFooterBottomRow">
              <div>Copyright © 2026 Tunturu</div>
              <div>Powered by Tunturu</div>
            </div>
          </div>
        </footer>

        {/* Floating cart */}
        <button className="pFloatCart" type="button" onClick={() => alert("Cart (future)")} aria-label="Cart">
          <span className="pFloatBadge">0</span>
          <IconCartBig />
        </button>

        {/* Back to top */}
        {showTop && (
          <button
            className="pBackTop"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <span className="pBackArrow">↑</span>
          </button>
        )}
      </div>
    </>
  );
}

/* ========================= ICONS ========================= */
function IconCartSmall() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-2 8H7L6 6z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 6l-1-3H2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="19" r="1.6" fill="#fff" />
      <circle cx="18" cy="19" r="1.6" fill="#fff" />
    </svg>
  );
}
function IconCartBig() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-2 8H7L6 6z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 6l-1-3H2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="19" r="1.6" fill="#fff" />
      <circle cx="18" cy="19" r="1.6" fill="#fff" />
    </svg>
  );
}
function IconUserSmall() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="#fff" strokeWidth="2" />
      <path d="M5 20c1.5-4 5-6 7-6s5.5 2 7 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconFb() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z" fill="#111" />
    </svg>
  );
}
function IconTw() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 7c-.6.3-1.3.5-2 .6.7-.4 1.2-1 1.4-1.8-.7.4-1.4.7-2.2.9-.6-.7-1.5-1.1-2.5-1.1-1.9 0-3.4 1.5-3.4 3.4 0 .3 0 .5.1.8-2.8-.1-5.2-1.5-6.9-3.6-.3.5-.4 1.1-.4 1.7 0 1.2.6 2.2 1.5 2.8-.5 0-1.1-.2-1.6-.4v.1c0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.4 1.8 2.4 3.3 2.4-1.2.9-2.7 1.4-4.4 1.4H3c1.6 1 3.4 1.6 5.4 1.6 6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.2-1.1 1.6-1.8z"
        fill="#111"
      />
    </svg>
  );
}
function IconYt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12s0-3.2-.4-4.6c-.2-.8-.9-1.5-1.7-1.7C17.5 5.3 12 5.3 12 5.3s-5.5 0-6.9.4c-.8.2-1.5.9-1.7 1.7C3 8.8 3 12 3 12s0 3.2.4 4.6c.2.8.9 1.5 1.7 1.7 1.4.4 6.9.4 6.9.4s5.5 0 6.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.4.4-4.6.4-4.6z" fill="#111" />
      <path d="M10.5 9.5v5l5-2.5-5-2.5z" fill="#fff" />
    </svg>
  );
}

/* ========================= CSS ========================= */
const css = `
  :root{
    --gray: #f3f5f7;
    --text: #101010;
    --blue: #7A8AD6;
    --shadow: 0 10px 26px rgba(0,0,0,.18);
  }
  *{ box-sizing:border-box; }
  html, body{ height:100%; width:100%; }
  body{
    margin:0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
    color: var(--text);
    background:#fff;
  }

  .pContainer{
    width: min(1320px, calc(100% - 90px));
    margin: 0 auto;
  }
  @media (max-width: 900px){
    .pContainer{ width: calc(100% - 24px); }
  }

  /* Header */
  .pHeader{
    position:absolute;
    top:0; left:0; right:0;
    z-index:50;
    background: rgba(0,0,0,.22);
    backdrop-filter: blur(2px);
  }
  .pHeaderRow{
    height: 86px;
    display:flex;
    align-items:center;
    gap: 18px;
  }
  .pBrand{ display:flex; align-items:center; gap: 10px; min-width: 150px; }
  .pLogo{ height:40px; width:auto; display:block; }
  .pBrandText{ font-weight: 900; letter-spacing: 1px; color:#2ea0ff; display:none; }

  .pNav{
    display:flex; align-items:center; gap: 22px;
    width: 100%;
    color:#fff;
  }
  .pNavLink{
    color:#fff; text-decoration:none;
    font-weight: 700;
    letter-spacing: .2px;
    font-size: 14px;
    text-transform: uppercase;
    opacity: .95;
  }
  .pNavLink:hover{ opacity:.85; }
  .pCaret{ color:#fff; opacity:.9; margin-left:-12px; margin-right: 2px; }
  .pNavSpacer{ flex:1; }

  .pHeaderIcons{ display:flex; align-items:center; gap:16px; white-space:nowrap; }
  .pPrice{ font-weight:800; color:#fff; }
  .pCartMini{ position:relative; display:flex; align-items:center; cursor:pointer; }
  .pCartCount{
    position:absolute; top:-10px; right:-10px;
    background:#fff; color:#111;
    width:20px; height:20px; border-radius:999px;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:900;
  }
  .pUser{ display:flex; align-items:center; justify-content:center; cursor:pointer; }

  @media (max-width: 980px){
    .pNavLink, .pCaret, .pNavSpacer{ display:none; }
    .pBrandText{ display:block; }
    .pHeader{ background: rgba(0,0,0,.35); }
  }

  /* Hero */
  .pHero{
    height: 520px;
    position: relative;
    background: url("https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-mikhail-nilov-7735625.jpg") center/cover no-repeat;
    background-color:#1b1b1b;
  }
  .pHeroOverlay{ position:absolute; inset:0; background: rgba(0,0,0,.30); }
  .pHeroInner{
    position:relative; z-index:1;
    height:100%;
    display:flex; align-items:center; justify-content:center;
    padding-top: 86px;
  }
  .pHeroTitle{
    margin:0;
    font-size: 72px;
    color:#fff;
    font-weight: 900;
    letter-spacing: .5px;
    text-shadow: 0 12px 30px rgba(0,0,0,.35);
  }
  @media (max-width: 700px){
    .pHero{ height: 420px; }
    .pHeroTitle{ font-size: 54px; }
  }

  /* Content area */
  .pContentWrap{
    background: var(--gray);
    padding: 90px 0 110px;
  }
  .pContent{
    background: transparent;
  }
  .pH2{
    margin:0;
    font-size: 44px;
    font-weight: 900;
    letter-spacing: .2px;
  }
  .pH2.small{
    font-size: 34px;
  }
  .pH3{
    margin: 0 0 14px;
    font-size: 30px;
    font-weight: 900;
  }
  .pPara{
    margin: 16px 0 0;
    font-size: 17px;
    line-height: 1.9;
    color:#111;
    opacity: .9;
  }
  .pPara.muted{ opacity:.75; margin-top: 18px; }
  .pInline{ font-weight: 700; }

  .pSpacer{ height: 56px; }
  .pSpacer2{ height: 78px; }

  .pTwoCols{
    margin-top: 34px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items:start;
  }
  @media (max-width: 980px){
    .pTwoCols{ grid-template-columns: 1fr; gap: 40px; }
  }

  .pList{
    margin: 0;
    padding-left: 22px;
    margin-top: 12px;
    line-height: 2.0;
    font-size: 17px;
    color:#111;
    opacity: .9;
  }
  .pList li{ margin: 8px 0; }

  /* Footer */
  .pFooter{
    background:#000;
    color:#fff;
    padding: 84px 0 0;
  }
  .pFooterGrid{
    display:grid;
    grid-template-columns: 1.25fr 1fr 1fr;
    gap: 60px;
    align-items: start;
    padding-bottom: 70px;
  }
  @media (max-width: 980px){
    .pFooterGrid{ grid-template-columns: 1fr; gap: 34px; }
  }

  .pFooterLogoText{
    font-weight: 900;
    font-size: 44px;
    letter-spacing: 1px;
    color: #2ea0ff;
    margin-bottom: 18px;
  }
  .pFooterText{ opacity: .92; line-height: 2.0; font-size: 16px; }
  .pFooterHeading{ font-weight: 900; font-size: 22px; margin-bottom: 8px; }
  .pFooterLine{ width: 86px; height: 2px; background:#fff; opacity:.75; margin-bottom: 18px; }
  .pFooterLink{
    display:block;
    color:#fff;
    text-decoration:none;
    opacity:.90;
    padding: 7px 0;
    font-size: 16px;
  }
  .pFooterLink:hover{ opacity: 1; text-decoration: underline; }
  .pFooterLink.active{ color: #9db5ff; }

  .pSocialRow{ margin-top: 18px; display:flex; gap:12px; }
  .pSocialBtn{
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .pFooterBottom{
    border-top: 1px solid rgba(255,255,255,.08);
    padding: 22px 0;
  }
  .pFooterBottomRow{
    display:flex;
    justify-content: space-between;
    align-items:center;
    gap: 12px;
    opacity: .95;
  }

  /* Floating buttons */
  .pFloatCart{
    position: fixed;
    right: 28px;
    bottom: 40px;
    width: 74px;
    height: 74px;
    border: none;
    border-radius: 999px;
    background: #1976d2;
    box-shadow: 0 14px 28px rgba(0,0,0,.28);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    z-index: 80;
  }
  .pFloatCart:hover{ transform: translateY(-1px); }
  .pFloatBadge{
    position:absolute;
    top: 10px;
    left: 10px;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #2dd4bf;
    color: #fff;
    font-weight: 900;
    font-size: 12px;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow: 0 8px 16px rgba(0,0,0,.25);
  }

  .pBackTop{
    position: fixed;
    left: 24px;
    bottom: 34px;
    width: 62px;
    height: 62px;
    border-radius: 999px;
    border: none;
    background: #9aa7ff;
    box-shadow: 0 14px 28px rgba(0,0,0,.22);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    z-index: 80;
  }
  .pBackArrow{
    font-size: 26px;
    color: #111;
    font-weight: 900;
    transform: translateY(-1px);
  }
`;