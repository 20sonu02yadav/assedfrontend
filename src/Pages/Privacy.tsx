import  { useEffect, useState } from "react";

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
  const [_showTop, setShowTop] = useState(false);

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
        {/* <header className="pHeader">
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
        </header> */}

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
        
      </div>
    </>
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