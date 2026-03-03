import React, { useEffect, useMemo, useState } from "react";

/**
 * About.tsx (single file)
 * Pure React / No WordPress / No WooCommerce
 * Layout matches your screenshot:
 * - Transparent top nav over hero
 * - Who We Are (left text card + right rounded image)
 * - Strengths & Capabilities (2x2 wide cards with icons)
 * - Industries We Serve (3x2 image grid)
 * - Purpose Vision & Mission (3 cards)
 * - Core Value (4 cards)
 * - Brands row
 * - Same black footer + bottom copyright bar
 * - Floating cart + back-to-top
 */

type SimpleCard = { title: string; desc: string; icon: React.ReactNode };
type ImgCard = { title: string; img: string };

export default function About() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const strengths = useMemo<SimpleCard[]>(
    () => [
      {
        title: "Turnkey Project Execution",
        desc: "From survey and design to supply, installation, and maintenance.",
        icon: <IconGears />,
      },
      {
        title: "Experienced Engineering Team",
        desc: "Highly skilled professionals with expertise.",
        icon: <IconPeople />,
      },
      {
        title: "Use of Advanced Technology",
        desc: "HDPE piping with electro fusion fittings, automation, and smart water management solution",
        icon: <IconMonitor />,
      },
      {
        title: "Sustainable & Cost-Effective Solution",
        desc: "Ensuring long-term reliability, minimal maintenance, and environmental benefits.",
        icon: <IconLeaf />,
      },
    ],
    []
  );

  const industries = useMemo<ImgCard[]>(
    () => [
      { title: "Tea & Coffee Plantations", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-aravind-p-s-1808524778-30204867-768x1024.jpg" },
      { title: "Mining & Industrial Sectors", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-grunzibaer-4993793-1024x682.jpg" },
      { title: "Railway Infrastructure", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-sliceisop-1591446-819x1024.jpg" },
      { title: "Construction & Real Estate", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-ratnesh-tiwari-234109907-34452045-1024x768.jpg" },
      { title: "Resorts, Hotels & Commercial Complexes", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-mikhail-nilov-9400916-1024x682.jpg" },
      { title: "Agriculture & Horticulture", img: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-dmitry-kharitonov-911287485-36081124-1024x682.jpg" },
    ],
    []
  );

  const purpose = useMemo<SimpleCard[]>(
    () => [
      {
        title: "Our Purpose",
        desc: "To empower communities through sustainable engineering solutions. We aim to improve lives and contribute to a better world.",
        icon: <IconTarget />,
      },
      {
        title: "Our Vision",
        desc: "To be a global leader in providing accessible and impactful engineering aid. We aspire to transform the landscape of engineering aid.",
        icon: <IconVision />,
      },
      {
        title: "Our Mission",
        desc: "Provide expert engineering services to underserved communities. Develop innovative and sustainable solutions for global challenges",
        icon: <IconFlag />,
      },
    ],
    []
  );

  const core = useMemo<SimpleCard[]>(
    () => [
      {
        title: "Integrity",
        desc: "Unwavering commitment to honesty, transparency, & ethical practices.",
        icon: <IconHandshakeShield />,
      },
      {
        title: "Innovation",
        desc: "Driving progress through continuous improvement. Solving complex problems with novel approaches.",
        icon: <IconBulb />,
      },
      {
        title: "Collaboration",
        desc: "Fostering teamwork and partnerships. Leveraging diverse perspectives for better outcomes.",
        icon: <IconHandshake />,
      },
      {
        title: "Sustainability",
        desc: "Designing solutions that protect the environment. Promoting long-term benefits for communities.",
        icon: <IconRecycleLeaf />,
      },
    ],
    []
  );

  const brands = useMemo(
    () => [
      { alt: "TOTAL", src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/5.jpg" },
      { alt: "Mr Light", src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/4.jpg" },
      { alt: "AURA", src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/2.jpg" },
      { alt: "PHILIPS Flashlight", src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/6.png" },
      { alt: "PHILIPS Batteries", src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/7.png" },
    ],
    []
  );

  return (
    <>
      <style>{css}</style>

      <div className="aPage">
        {/* HEADER */}
        <header className="aHeader">
          <div className="aContainer aHeaderRow">
            <div className="aBrand">
              <img
                src="/assets/logo.png"
                alt="Tunturu"
                className="aLogo"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <div className="aBrandText">TUNTURU</div>
            </div>

            <nav className="aNav">
              <a className="aNavLink" href="/">HOME</a>
              <a className="aNavLink" href="/store">STORE</a>
              <a className="aNavLink" href="/store">CATEGORIES</a>
              <span className="aCaret">⌄</span>
              <a className="aNavLink" href="/franchise">FRANCHISE</a>
              <a className="aNavLink" href="/services">SERVICES</a>
              <a className="aNavLink" href="/blog">BLOG</a>
              <span className="aNavSpacer" />
              <a className="aNavLink active" href="/about">ABOUT</a>
              <a className="aNavLink" href="#contact">CONTACT US</a>

              <div className="aHeaderIcons">
                <div className="aPrice">₹0.00</div>
                <div className="aCartMini" title="Cart">
                  <span className="aCartCount">0</span>
                  <IconCartSmall />
                </div>
                <div className="aUser" title="Account">
                  <IconUserSmall />
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="aHero">
          <div className="aHeroOverlay" />
          <div className="aHeroInner">
            <h1 className="aHeroTitle">About Us</h1>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="aSection aSectionGray">
          <div className="aContainer">
            <div className="aWhoGrid">
              <div className="aWhoTextCard">
                <h2 className="aLeftTitle">Who We Are</h2>
                <div className="aLeftLine" />
                <p className="aPara">
                  Tunturu is a leading engineering solutions provider specializing in comprehensive water management
                  systems for diverse industries and applications with a strong focus on efficiency, sustainability, and
                  cutting-edge technology, we deliver turnkey solutions for irrigation,industrial water
                  management,urban and rural water supply, and environmental sustainability projects.
                </p>
              </div>

              <div className="aWhoImageCard">
                <img
                  src="https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-hoang-nc-483165236-16057288.jpg"
                  alt="Who we are"
                  className="aWhoImg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const parent = (e.currentTarget as HTMLImageElement).parentElement;
                    if (parent) parent.classList.add("aImgFallback");
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="aSection">
          <div className="aContainer">
            <div className="aTitleBlock">
              <h2 className="aH2">Our Strengths &amp; Capabilities</h2>
              <div className="aUnderline wide" />
            </div>

            <div className="aStrengthGrid">
              {strengths.map((s) => (
                <div key={s.title} className="aWideCard">
                  <div className="aWideIcon">{s.icon}</div>
                  <div className="aWideBody">
                    <div className="aWideTitle">{s.title}</div>
                    <div className="aWideDesc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="aSection">
          <div className="aContainer">
            <div className="aTitleBlock">
              <h2 className="aH2">Industries We Serve</h2>
              <div className="aUnderline" />
            </div>

            <div className="aIndustriesGrid">
              {industries.map((it) => (
                <div key={it.title} className="aIndustryCard">
                  <div className="aIndustryImageWrap">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="aIndustryImg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        const parent = (e.currentTarget as HTMLImageElement).parentElement;
                        if (parent) parent.classList.add("aImgFallback");
                      }}
                    />
                  </div>
                  <div className="aIndustryTitle">{it.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purpose / Vision / Mission */}
        <section className="aSection">
          <div className="aContainer">
            <div className="aTitleBlock">
              <h2 className="aH2">Our Purpose Vision &amp; Mission</h2>
              <div className="aUnderline wide" />
            </div>

            <div className="aGrid3">
              {purpose.map((c) => (
                <div key={c.title} className="aCard">
                  <div className="aIconBig">{c.icon}</div>
                  <div className="aCardTitle">{c.title}</div>
                  <div className="aCardDesc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Value */}
        <section className="aSection">
          <div className="aContainer">
            <div className="aTitleBlock">
              <h2 className="aH2">Our Core Value</h2>
              <div className="aUnderline" />
            </div>

            <div className="aGrid4">
              {core.map((c) => (
                <div key={c.title} className="aCard">
                  <div className="aIconBig light">{c.icon}</div>
                  <div className="aCardTitle">{c.title}</div>
                  <div className="aCardDesc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="aBrands">
          <div className="aContainer">
            <div className="aTitleBlock tight">
              <h2 className="aH2">Brands We Represent</h2>
              <div className="aUnderline" />
            </div>

            <div className="aBrandsRow">
              {brands.map((b) => (
                <div key={b.alt} className="aBrandTile" title={b.alt}>
                  <img
                    src={b.src}
                    alt={b.alt}
                    className="aBrandImg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const parent = (e.currentTarget as HTMLImageElement).parentElement;
                      if (parent) parent.classList.add("aImgFallback");
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="aBrandsNote">
              We are proud to serve as Super Stockist / Master Franchise / State Distributor for the above brands in
              Karnataka.
            </div>
          </div>
        </section>

        {/* FOOTER (same as screenshot) */}
        <footer className="aFooter" id="contact">
          <div className="aContainer aFooterGrid">
            <div className="aFooterCol">
              <div className="aFooterLogoText">TUNTURU</div>
              <div className="aFooterText">
                <div>Email: Support@tunturu.co.in</div>
                <div>Email: Sales@tunturu.co.in</div>
                <div>Phone: +91 89616 12353</div>
              </div>

              <div className="aSocialRow">
                <a className="aSocialBtn" href="#" aria-label="Facebook"><IconFb /></a>
                <a className="aSocialBtn" href="#" aria-label="Twitter"><IconTw /></a>
                <a className="aSocialBtn" href="#" aria-label="Youtube"><IconYt /></a>
              </div>
            </div>

            <div className="aFooterCol">
              <div className="aFooterHeading">Quick links</div>
              <div className="aFooterLine" />
              <a className="aFooterLink" href="/">Home</a>
              <a className="aFooterLink" href="/about">About</a>
              <a className="aFooterLink" href="/blog">Blog</a>
              <a className="aFooterLink" href="#contact">Contact Us</a>
            </div>

            <div className="aFooterCol">
              <div className="aFooterHeading">Our Polices</div>
              <div className="aFooterLine" />
              <a className="aFooterLink" href="#">Privacy Policy</a>
              <a className="aFooterLink" href="#">Terms &amp; Conditions</a>
              <a className="aFooterLink" href="#">Shipping Policy</a>
              <a className="aFooterLink" href="#">Refund &amp; Returns</a>
              <a className="aFooterLink" href="#">FAQs</a>
            </div>
          </div>

          <div className="aFooterBottom">
            <div className="aContainer aFooterBottomRow">
              <div>Copyright © 2026 Tunturu</div>
              <div>Powered by Tunturu</div>
            </div>
          </div>
        </footer>

        {/* Floating cart button */}
        <button className="aFloatCart" type="button" onClick={() => alert("Cart (future)")} aria-label="Cart">
          <span className="aFloatBadge">0</span>
          <IconCartBig />
        </button>

        {/* Back-to-top */}
        {showTop && (
          <button
            className="aBackTop"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <span className="aBackArrow">↑</span>
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
function IconUserSmall() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="#fff" strokeWidth="2" />
      <path d="M5 20c1.5-4 5-6 7-6s5.5 2 7 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
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

const blue = "#4067a6";
const lightBlue = "#7A8AD6";

function Svg96({ children }: { children: React.ReactNode }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </svg>
  );
}

/* Strength icons (filled-ish like screenshot) */
function IconGears() {
  return (
    <Svg96>
      <path d="M40 32l6-6 6 6-6 6-6-6z" fill={blue} opacity=".2" />
      <path
        d="M34 46c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14z"
        fill={blue}
        opacity=".25"
      />
      <path
        d="M30 46c0-10 8-18 18-18s18 8 18 18-8 18-18 18-18-8-18-18z"
        stroke={blue}
        strokeWidth="4"
      />
      <path d="M48 22v8M48 62v8M24 46h8M64 46h8" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 30l6 6M58 56l6 6M32 62l6-6M58 36l6-6" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="64" r="10" fill={blue} opacity=".22" />
      <circle cx="60" cy="64" r="12" stroke={blue} strokeWidth="4" />
      <path d="M60 52v6M60 70v6M48 64h6M66 64h6" stroke={blue} strokeWidth="4" strokeLinecap="round" />
    </Svg96>
  );
}

function IconPeople() {
  return (
    <Svg96>
      <circle cx="34" cy="42" r="10" fill={blue} opacity=".25" />
      <circle cx="34" cy="42" r="12" stroke={blue} strokeWidth="4" />
      <circle cx="62" cy="42" r="10" fill={blue} opacity=".25" />
      <circle cx="62" cy="42" r="12" stroke={blue} strokeWidth="4" />
      <circle cx="48" cy="36" r="12" fill={blue} opacity=".2" />
      <circle cx="48" cy="36" r="14" stroke={blue} strokeWidth="4" />
      <path d="M20 76c2-12 12-20 28-20s26 8 28 20" fill={blue} opacity=".2" />
      <path d="M20 76c2-12 12-20 28-20s26 8 28 20" stroke={blue} strokeWidth="4" strokeLinecap="round" />
    </Svg96>
  );
}

function IconMonitor() {
  return (
    <Svg96>
      <rect x="18" y="22" width="60" height="40" rx="6" fill={blue} opacity=".18" />
      <rect x="18" y="22" width="60" height="40" rx="6" stroke={blue} strokeWidth="4" />
      <path d="M40 72h16" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <path d="M48 62v10" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <rect x="30" y="66" width="36" height="10" rx="5" fill={blue} opacity=".12" />
    </Svg96>
  );
}

function IconLeaf() {
  return (
    <Svg96>
      <path
        d="M60 20c10 8 18 20 16 34-2 18-18 28-36 26-16-2-28-16-28-32 0-14 10-26 26-28 8-1 16 0 22 0z"
        fill={blue}
        opacity=".22"
      />
      <path
        d="M60 20c10 8 18 20 16 34-2 18-18 28-36 26-16-2-28-16-28-32 0-14 10-26 26-28 8-1 16 0 22 0z"
        stroke={blue}
        strokeWidth="4"
      />
      <path d="M28 64c10-10 24-18 40-22" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <path d="M44 68c-2-10 2-22 12-32" stroke={blue} strokeWidth="4" strokeLinecap="round" opacity=".7" />
    </Svg96>
  );
}

/* Purpose / values icons (outline like screenshot) */
function IconTarget() {
  return (
    <Svg96>
      <circle cx="48" cy="48" r="26" stroke={blue} strokeWidth="5" />
      <circle cx="48" cy="48" r="16" stroke={blue} strokeWidth="5" />
      <circle cx="48" cy="48" r="6" fill={blue} />
      <path d="M48 20v10M76 48H66" stroke={blue} strokeWidth="5" strokeLinecap="round" />
    </Svg96>
  );
}
function IconVision() {
  return (
    <Svg96>
      <path d="M18 50c8-14 18-22 30-22s22 8 30 22c-8 14-18 22-30 22S26 64 18 50z" stroke={blue} strokeWidth="5" />
      <circle cx="48" cy="50" r="10" stroke={blue} strokeWidth="5" />
      <circle cx="48" cy="50" r="4" fill={blue} />
    </Svg96>
  );
}
function IconFlag() {
  return (
    <Svg96>
      <path d="M30 78V18" stroke={blue} strokeWidth="5" strokeLinecap="round" />
      <path d="M30 20h34l-6 10 6 10H30" stroke={blue} strokeWidth="5" strokeLinejoin="round" />
      <path d="M30 40h26l-6 10 6 10H30" stroke={blue} strokeWidth="5" strokeLinejoin="round" opacity=".7" />
    </Svg96>
  );
}

function IconHandshakeShield() {
  return (
    <Svg96>
      <path d="M28 50l10-10c4-4 10-4 14 0l6 6" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 58l8 8c2 2 6 2 8 0l12-12" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 36l-6-6c-3-3-8-3-11 0l-7 7" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 40v10c0 10-6 16-16 20-10-4-16-10-16-20V40l16-6 16 6z" stroke={lightBlue} strokeWidth="4" />
    </Svg96>
  );
}
function IconBulb() {
  return (
    <Svg96>
      <path d="M48 18c-12 0-22 10-22 22 0 8 4 14 10 18v8h24v-8c6-4 10-10 10-18 0-12-10-22-22-22z" stroke={lightBlue} strokeWidth="4" />
      <path d="M38 76h20" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 66h16" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
      <path d="M48 26v10" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" opacity=".75" />
    </Svg96>
  );
}
function IconHandshake() {
  return (
    <Svg96>
      <path d="M24 46l12-12c4-4 10-4 14 0l4 4" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 62l6 6c2 2 6 2 8 0l18-18" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 54l10 10" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
      <path d="M54 42l10-10" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
    </Svg96>
  );
}
function IconRecycleLeaf() {
  return (
    <Svg96>
      <path d="M30 30c8-8 20-10 30-4" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
      <path d="M66 30l-2-10 10 2" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 66c-8 8-20 10-30 4" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
      <path d="M30 66l2 10-10-2" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 36c8 8 8 20 0 28-8-8-20-8-28 0" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" opacity=".75" />
      <path d="M50 60c-4-2-8-6-10-10 6 0 12-2 16-6 2 6 0 12-6 16z" stroke={lightBlue} strokeWidth="4" strokeLinejoin="round" />
    </Svg96>
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
    --gray: #f4f6f8;
    --text: #101010;
    --blue: #7A8AD6;
    --shadow: 0 10px 26px rgba(0,0,0,.18);
    --cardShadow: 0 10px 22px rgba(0,0,0,.20);
  }
  *{ box-sizing:border-box; }
  html, body{ height:100%; width:100%; }
  body{
    margin:0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
    color: var(--text);
    background:#fff;
  }
  a{ color: inherit; }

  .aContainer{
    width: min(1320px, calc(100% - 80px));
    margin: 0 auto;
  }
  @media (max-width: 900px){
    .aContainer{ width: calc(100% - 24px); }
  }

  /* Header (same as screenshot) */
  .aHeader{
    position:absolute;
    top:0; left:0; right:0;
    z-index:50;
    background: rgba(0,0,0,.22);
    backdrop-filter: blur(2px);
  }
  .aHeaderRow{
    height: 86px;
    display:flex;
    align-items:center;
    gap: 18px;
  }
  .aBrand{ display:flex; align-items:center; gap: 10px; min-width: 150px; }
  .aLogo{ height:40px; width:auto; display:block; }
  .aBrandText{ font-weight: 900; letter-spacing: 1px; color:#2ea0ff; display:none; }

  .aNav{
    display:flex; align-items:center; gap: 22px;
    width: 100%;
    color:#fff;
  }
  .aNavLink{
    color:#fff; text-decoration:none;
    font-weight: 700;
    letter-spacing: .2px;
    font-size: 14px;
    text-transform: uppercase;
    opacity: .95;
  }
  .aNavLink:hover{ opacity:.85; }
  .aNavLink.active{ color: #8fb0ff; }
  .aCaret{ color:#fff; opacity:.9; margin-left:-12px; margin-right: 2px; }
  .aNavSpacer{ flex:1; }

  .aHeaderIcons{ display:flex; align-items:center; gap:16px; white-space:nowrap; }
  .aPrice{ font-weight:800; color:#fff; }
  .aCartMini{ position:relative; display:flex; align-items:center; cursor:pointer; }
  .aCartCount{
    position:absolute; top:-10px; right:-10px;
    background:#fff; color:#111;
    width:20px; height:20px; border-radius:999px;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:900;
  }
  .aUser{ display:flex; align-items:center; justify-content:center; cursor:pointer; }

  @media (max-width: 980px){
    .aNavLink, .aCaret, .aNavSpacer{ display:none; }
    .aBrandText{ display:block; }
    .aHeader{ background: rgba(0,0,0,.35); }
  }

  /* Hero */
  .aHero{
    height: 520px;
    position: relative;
    background: url("https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-qhung999-3351909.jpg") center/cover no-repeat;
    background-color:#1b1b1b;
  }
  .aHeroOverlay{ position:absolute; inset:0; background: rgba(0,0,0,.30); }
  .aHeroInner{
    position:relative; z-index:1;
    height:100%;
    display:flex; align-items:center; justify-content:center;
    padding-top: 86px;
  }
  .aHeroTitle{
    margin:0;
    font-size: 72px;
    color:#fff;
    font-weight: 900;
    letter-spacing: .5px;
    text-shadow: 0 12px 30px rgba(0,0,0,.35);
  }
  @media (max-width: 700px){
    .aHero{ height: 420px; }
    .aHeroTitle{ font-size: 54px; }
  }

  /* Sections */
  .aSection{ padding: 84px 0; }
  .aSectionGray{ background: var(--gray); }

  .aTitleBlock{
    display:flex; flex-direction:column; align-items:center;
    gap: 12px;
    margin-bottom: 54px;
  }
  .aTitleBlock.tight{ margin-bottom: 30px; }
  .aH2{
    margin:0;
    font-size: 46px;
    font-weight: 900;
    text-align:center;
  }
  .aUnderline{ width:140px; height:3px; background: var(--blue); opacity:.85; }
  .aUnderline.wide{ width: 190px; }

  /* Who We Are grid */
  .aWhoGrid{
    display:grid;
    grid-template-columns: 1.05fr .95fr;
    gap: 28px;
    align-items: stretch;
  }
  @media (max-width: 980px){
    .aWhoGrid{ grid-template-columns: 1fr; }
  }
  .aWhoTextCard{
    background:#fff;
    border-radius: 10px;
    padding: 44px 46px;
    box-shadow: 0 10px 26px rgba(0,0,0,.06);
    min-height: 360px;
  }
  .aLeftTitle{
    margin:0;
    font-size: 34px;
    font-weight: 900;
  }
  .aLeftLine{
    width: 84px;
    height: 3px;
    background: var(--blue);
    margin-top: 10px;
    margin-bottom: 18px;
  }
  .aPara{
    margin:0;
    line-height: 2.1;
    font-size: 17px;
    color:#111;
    opacity: .92;
  }
  .aWhoImageCard{
    border-radius: 16px;
    overflow:hidden;
    box-shadow: 0 14px 28px rgba(0,0,0,.18);
    min-height: 360px;
    background:#e9eef5;
  }
  .aWhoImg{
    width:100%;
    height:100%;
    object-fit: cover;
    display:block;
  }

  /* Strengths wide cards 2x2 */
  .aStrengthGrid{
    display:grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 22px;
    justify-items: stretch;
  }
  @media (max-width: 900px){ .aStrengthGrid{ grid-template-columns: 1fr; } }

  .aWideCard{
    background:#fff;
    border-radius: 16px;
    box-shadow: var(--shadow);
    padding: 26px 26px;
    display:flex;
    gap: 18px;
    align-items:center;
    min-height: 120px;
  }
  .aWideIcon{
    width: 104px;
    height: 104px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex: 0 0 auto;
  }
  .aWideTitle{
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 6px;
  }
  .aWideDesc{
    font-size: 16px;
    line-height: 1.8;
    color:#111;
    opacity:.85;
  }

  /* Industries 3x2 */
  .aIndustriesGrid{
    display:grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 34px 34px;
    justify-items: center;
  }
  @media (max-width: 1000px){ .aIndustriesGrid{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
  @media (max-width: 700px){ .aIndustriesGrid{ grid-template-columns: 1fr; } }

  .aIndustryCard{ width: 100%; max-width: 420px; text-align:center; }
  .aIndustryImageWrap{
    width: 100%;
    height: 220px;
    border-radius: 14px;
    overflow:hidden;
    box-shadow: var(--shadow);
    background:#e9eef5;
  }
  .aIndustryImg{
    width:100%;
    height:100%;
    object-fit: cover;
    display:block;
  }
  .aIndustryTitle{
    margin-top: 16px;
    font-weight: 700;
    font-size: 18px;
    color:#222;
  }

  /* Cards */
  .aGrid3{
    display:grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 22px;
    justify-items: center;
  }
  .aGrid4{
    display:grid;
    grid-template-columns: repeat(4, minmax(0,1fr));
    gap: 22px;
    justify-items: center;
  }
  @media (max-width: 1100px){
    .aGrid4{ grid-template-columns: repeat(2, minmax(0,1fr)); }
    .aGrid3{ grid-template-columns: repeat(2, minmax(0,1fr)); }
  }
  @media (max-width: 700px){
    .aGrid4, .aGrid3{ grid-template-columns: 1fr; }
  }

  .aCard{
    width: 100%;
    max-width: 320px;
    background:#fff;
    border-radius: 18px;
    box-shadow: var(--cardShadow);
    padding: 28px 26px 26px;
    text-align:center;
    border: 1px solid rgba(0,0,0,.06);
  }
  .aIconBig{
    display:flex;
    align-items:center;
    justify-content:center;
    height: 110px;
    margin-bottom: 4px;
    filter: drop-shadow(0 10px 12px rgba(0,0,0,.10));
  }
  .aIconBig.light{
    filter: drop-shadow(0 10px 12px rgba(0,0,0,.10));
    opacity: .95;
  }
  .aCardTitle{
    margin: 6px 0 14px;
    font-size: 28px;
    font-weight: 900;
  }
  .aCardDesc{
    margin:0;
    font-size: 17px;
    line-height: 2.0;
    color:#111;
    opacity:.90;
  }

  /* Brands */
  .aBrands{ padding: 80px 0 70px; background:#fff; }
  .aBrandsRow{
    margin-top: 18px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 34px;
    flex-wrap: wrap;
  }
  .aBrandTile{
    height: 110px;
    min-width: 160px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 10px 18px;
  }
  .aBrandImg{ max-height: 96px; max-width: 220px; display:block; }

  .aBrandsNote{
    text-align:center;
    margin-top: 26px;
    color:#111;
    opacity:.80;
    font-size: 18px;
  }

  /* Footer (black) */
  .aFooter{
    background:#000;
    color:#fff;
    padding: 84px 0 0;
  }
  .aFooterGrid{
    display:grid;
    grid-template-columns: 1.25fr 1fr 1fr;
    gap: 60px;
    align-items: start;
    padding-bottom: 70px;
  }
  @media (max-width: 980px){
    .aFooterGrid{ grid-template-columns: 1fr; gap: 34px; }
  }

  .aFooterLogoText{
    font-weight: 900;
    font-size: 44px;
    letter-spacing: 1px;
    color: #2ea0ff;
    margin-bottom: 18px;
  }
  .aFooterText{ opacity: .92; line-height: 2.0; font-size: 16px; }
  .aFooterHeading{ font-weight: 900; font-size: 22px; margin-bottom: 8px; }
  .aFooterLine{ width: 86px; height: 2px; background:#fff; opacity:.75; margin-bottom: 18px; }
  .aFooterLink{
    display:block;
    color:#fff;
    text-decoration:none;
    opacity:.90;
    padding: 7px 0;
    font-size: 16px;
  }
  .aFooterLink:hover{ opacity: 1; text-decoration: underline; }

  .aSocialRow{ margin-top: 18px; display:flex; gap:12px; }
  .aSocialBtn{
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .aFooterBottom{
    border-top: 1px solid rgba(255,255,255,.08);
    padding: 22px 0;
  }
  .aFooterBottomRow{
    display:flex;
    justify-content: space-between;
    align-items:center;
    gap: 12px;
    opacity: .95;
  }

  /* Floating cart + back to top */
  .aFloatCart{
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
  .aFloatCart:hover{ transform: translateY(-1px); }
  .aFloatBadge{
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

  .aBackTop{
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
  .aBackArrow{
    font-size: 26px;
    color: #111;
    font-weight: 900;
    transform: translateY(-1px);
  }

  /* image fallback */
  .aImgFallback{
    background: linear-gradient(135deg, #dde6f2, #f5f7fb);
  }
`;