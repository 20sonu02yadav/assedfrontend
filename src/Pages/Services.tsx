import React, { useEffect, useMemo, useState } from "react";

/**
 * Services.tsx (single file)
 * - Pure React / No WordPress / No WooCommerce
 * - Same layout as your screenshot: hero banner + sections + cards + CTA + footer
 * - Uses local assets:
 *    /assets/logo.png
 *    /assets/services-hero.jpg
 */

type Card = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function Services() {
  const [_showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services: Card[] = useMemo(
    () => [
      {
        title: "Installation Services",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconHammerWrench />,
      },
      {
        title: "Maintenance & Repair",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconTools />,
      },
      {
        title: "Bulk Supply Solution",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconTruckCart />,
      },
      {
        title: "Corporate Order",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconBuildingPeople />,
      },
    ],
    []
  );

  const whyChoose: Card[] = useMemo(
    () => [
      {
        title: "Heigh Quality Products",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconCalendarCheck />,
      },
      {
        title: "Expert Support Team",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconHeadset />,
      },
      {
        title: "Competitive Pricing",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconReceiptCheck />,
      },
    ],
    []
  );

  const process: Card[] = useMemo(
    () => [
      {
        title: "Heigh Quality",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconDocsShield />,
      },
      {
        title: "Customized Solution",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconMonitorGear />,
      },
      {
        title: "Implmentation",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconHandGearCheck />,
      },
      {
        title: "Ongoing Support",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        icon: <IconSupport24 />,
      },
    ],
    []
  );

  return (
    <>
      <style>{css}</style>

      <div className="tPage">
        {/* HEADER (transparent over hero) */}

{/*         
        <header className="tHeader">
          <div className="tContainer tHeaderRow">
            <div className="tBrand">
              <img
                src="/assets/logo.png"
                alt="Tunturu"
                className="tLogo"
                onError={(e) => {
                  // fallback if logo missing
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="tBrandText">TUNTURU</div>
            </div>

            <nav className="tNav">
              <a className="tNavLink" href="/">HOME</a>
              <a className="tNavLink" href="/store">STORE</a>
              <a className="tNavLink" href="/store">CATEGORIES</a>
              <span className="tCaret">⌄</span>
              <a className="tNavLink" href="/franchise">FRANCHISE</a>
              <a className="tNavLink active" href="/services">SERVICES</a>
              <a className="tNavLink" href="/blog">BLOG</a>
              <span className="tNavSpacer" />
              <a className="tNavLink" href="/about">ABOUT</a>
              <a className="tNavLink" href="#contact">CONTACT US</a>

              <div className="tHeaderIcons">
                <div className="tPrice">₹0.00</div>
                <div className="tCartMini" title="Cart">
                  <span className="tCartCount">0</span>
                  <IconCartSmall />
                </div>
                <div className="tUser" title="Account">
                  <IconUserSmall />
                </div>
              </div>
            </nav>
          </div>
        </header> */}

        {/* HERO */}
        <section className="tHero">
          <div className="tHeroOverlay" />
          <div className="tHeroInner">
            <h1 className="tHeroTitle">Services</h1>
          </div>
        </section>

        {/* Our Services */}
        <section className="tSection tSectionGray">
          <div className="tContainer">
            <div className="tTitleBlock">
              <h2 className="tH2">Our Services</h2>
              <div className="tUnderline" />
            </div>

            <div className="tGrid4">
              {services.map((c) => (
                <div key={c.title} className="tCard">
                  <div className="tIconWrap">{c.icon}</div>
                  <h3 className="tCardTitle">{c.title}</h3>
                  <p className="tCardDesc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="tSection tSectionGray">
          <div className="tContainer">
            <div className="tTitleBlock">
              <h2 className="tH2">Why Choose Tunturu Tool</h2>
              <div className="tUnderline wide" />
            </div>

            <div className="tGrid3">
              {whyChoose.map((c) => (
                <div key={c.title} className="tCard">
                  <div className="tIconWrap">{c.icon}</div>
                  <h3 className="tCardTitle">{c.title}</h3>
                  <p className="tCardDesc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="tSection tSectionGray">
          <div className="tContainer">
            <div className="tTitleBlock">
              <h2 className="tH2">Our Process</h2>
              <div className="tUnderline" />
            </div>

            <div className="tGrid4">
              {process.map((c) => (
                <div key={c.title} className="tCard">
                  <div className="tIconWrap">{c.icon}</div>
                  <h3 className="tCardTitle">{c.title}</h3>
                  <p className="tCardDesc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tCTA">
          <div className="tContainer tCTACenter">
            <h3 className="tCTATitle">Ready to get the job done?</h3>
            <p className="tCTASub">
              Contact us today to learn more about how we can assist you with your tools and hardwear.
            </p>
            <a className="tCTAButton" href="#contact">CONTACT US</a>
          </div>
        </section>

        {/* FOOTER */}
        
      </div>
    </>
  );
}

/* =========================
   ICONS (inline SVG)
========================= */

const stroke = "#7A8AD6";

function SvgWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </svg>
  );
}

function IconHammerWrench() {
  return (
    <SvgWrap>
      <path d="M36 34l10 10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 42l10 10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M48 26l10 10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M54 24l10 10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M22 66l20-20c2-2 5-2 7 0l1 1c2 2 2 5 0 7L30 74c-2 2-5 2-7 0l-1-1c-2-2-2-5 0-7z" stroke={stroke} strokeWidth="3" />
      <path d="M58 18c6 0 12 5 12 12l-7 7-17-17 7-7c1-1 3-2 5-2z" stroke={stroke} strokeWidth="3" />
    </SvgWrap>
  );
}

function IconTools() {
  return (
    <SvgWrap>
      <path d="M30 64l34-34" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M38 22c6 2 10 8 10 14l-6 6-18-18 6-6c2-2 5-2 8 0z" stroke={stroke} strokeWidth="3" />
      <path d="M58 74c-6-2-10-8-10-14l6-6 18 18-6 6c-2 2-5 2-8 0z" stroke={stroke} strokeWidth="3" />
      <circle cx="48" cy="48" r="6" stroke={stroke} strokeWidth="3" />
    </SvgWrap>
  );
}

function IconTruckCart() {
  return (
    <SvgWrap>
      <path d="M18 60h10l8-26h30l4 16h8" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 34h10l6 10v16H66" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="66" r="5" stroke={stroke} strokeWidth="3" />
      <circle cx="70" cy="66" r="5" stroke={stroke} strokeWidth="3" />
      <path d="M22 30h20" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M20 38h22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </SvgWrap>
  );
}

function IconBuildingPeople() {
  return (
    <SvgWrap>
      <rect x="22" y="20" width="52" height="40" rx="4" stroke={stroke} strokeWidth="3" />
      <path d="M34 28h8M34 36h8M34 44h8M54 28h8M54 36h8M54 44h8" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M30 76c2-8 10-12 18-12s16 4 18 12" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="64" r="5" stroke={stroke} strokeWidth="3" />
      <circle cx="56" cy="64" r="5" stroke={stroke} strokeWidth="3" />
    </SvgWrap>
  );
}

function IconCalendarCheck() {
  return (
    <SvgWrap>
      <rect x="22" y="24" width="52" height="50" rx="6" stroke={stroke} strokeWidth="3" />
      <path d="M30 20v10M66 20v10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M22 36h52" stroke={stroke} strokeWidth="3" />
      <path d="M36 54l6 6 14-16" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrap>
  );
}

function IconHeadset() {
  return (
    <SvgWrap>
      <path d="M28 54v-6c0-12 8-22 20-22s20 10 20 22v6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <rect x="22" y="52" width="10" height="18" rx="4" stroke={stroke} strokeWidth="3" />
      <rect x="64" y="52" width="10" height="18" rx="4" stroke={stroke} strokeWidth="3" />
      <path d="M66 70c0 6-6 10-14 10h-6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M46 80h-6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </SvgWrap>
  );
}

function IconReceiptCheck() {
  return (
    <SvgWrap>
      <path d="M28 18h40v62l-6-4-6 4-6-4-6 4-6-4-6 4V18z" stroke={stroke} strokeWidth="3" />
      <path d="M36 34h24" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M36 44h24" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M38 60l6 6 14-16" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrap>
  );
}

function IconDocsShield() {
  return (
    <SvgWrap>
      <path d="M28 18h30l10 10v46H28V18z" stroke={stroke} strokeWidth="3" />
      <path d="M58 18v10h10" stroke={stroke} strokeWidth="3" />
      <path d="M40 38h18M40 46h18" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M48 78c10-4 16-10 16-20V46l-16-6-16 6v12c0 10 6 16 16 20z" stroke={stroke} strokeWidth="3" />
    </SvgWrap>
  );
}

function IconMonitorGear() {
  return (
    <SvgWrap>
      <rect x="22" y="22" width="52" height="38" rx="6" stroke={stroke} strokeWidth="3" />
      <path d="M40 70h16" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M48 60v10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="58" cy="44" r="7" stroke={stroke} strokeWidth="3" />
      <path d="M58 34v4M58 50v4M48 44h4M64 44h4M52 38l3 3M61 47l3 3M52 50l3-3M61 41l3-3" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </SvgWrap>
  );
}

function IconHandGearCheck() {
  return (
    <SvgWrap>
      <path d="M18 56c10-8 18-6 24-2l10 6c3 2 4 5 2 8-2 3-6 3-9 1l-7-4" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 48l8-10c2-2 6-2 8 0l10 10" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="70" cy="34" r="8" stroke={stroke} strokeWidth="3" />
      <path d="M66 34l3 3 6-7" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrap>
  );
}

function IconSupport24() {
  return (
    <SvgWrap>
      <circle cx="48" cy="40" r="14" stroke={stroke} strokeWidth="3" />
      <path d="M28 70c3-10 12-16 20-16s17 6 20 16" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="68" r="10" stroke={stroke} strokeWidth="3" />
      <path d="M70 62v6h6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M36 38c2-6 8-10 12-10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </SvgWrap>
  );
}

/* =========================
   CSS (matches screenshot)
========================= */
const css = `
  :root{
    --bg: #f4f6f8;
    --text: #101010;
    --muted: #404040;
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
    background: #fff;
  }

  .tPage{ width:100%; min-height:100vh; }

  .tContainer{
    width: min(1320px, calc(100% - 80px));
    margin: 0 auto;
  }
  @media (max-width: 900px){
    .tContainer{ width: calc(100% - 24px); }
  }

  /* HEADER */
  .tHeader{
    position: absolute;
    top:0; left:0; right:0;
    z-index: 50;
    background: rgba(0,0,0,.22);
    backdrop-filter: blur(2px);
  }
  .tHeaderRow{
    height: 86px;
    display:flex;
    align-items:center;
    gap: 18px;
  }
  .tBrand{
    display:flex;
    align-items:center;
    gap: 10px;
    min-width: 150px;
  }
  .tLogo{
    height: 40px;
    width: auto;
    display:block;
  }
  .tBrandText{
    font-weight: 900;
    letter-spacing: 1px;
    color: #2ea0ff;
    display:none;
  }

  .tNav{
    display:flex;
    align-items:center;
    gap: 22px;
    width: 100%;
    color:#fff;
  }
  .tNavLink{
    color:#fff;
    text-decoration:none;
    font-weight: 700;
    letter-spacing: .2px;
    font-size: 14px;
    text-transform: uppercase;
    opacity: .95;
  }
  .tNavLink:hover{ opacity: .85; }
  .tNavLink.active{ color: #8fb0ff; }

  .tCaret{ color:#fff; opacity:.9; margin-left:-12px; margin-right: 2px; }

  .tNavSpacer{ flex: 1; }

  .tHeaderIcons{
    display:flex;
    align-items:center;
    gap: 16px;
    margin-left: 10px;
    white-space: nowrap;
  }
  .tPrice{ font-weight: 800; color:#fff; }
  .tCartMini{ position:relative; display:flex; align-items:center; gap: 6px; cursor:pointer; }
  .tCartCount{
    position:absolute;
    top:-10px; right: -10px;
    background: #fff;
    color:#111;
    width: 20px; height: 20px;
    border-radius: 999px;
    display:flex; align-items:center; justify-content:center;
    font-size: 12px;
    font-weight: 900;
  }
  .tUser{ display:flex; align-items:center; justify-content:center; cursor:pointer; }

  @media (max-width: 1100px){
    .tNav{ gap: 14px; }
    .tNavLink{ font-size: 13px; }
  }
  @media (max-width: 980px){
    .tNavLink, .tCaret, .tNavSpacer{ display:none; }
    .tHeader{ background: rgba(0,0,0,.35); }
    .tBrandText{ display:block; }
  }

  /* HERO */
  .tHero{
    height: 520px;
    position: relative;
    background: url("/assets/images/services-hero.jpg") center/cover no-repeat;
    background-color: #1b1b1b; /* fallback if image missing */
  }
  .tHeroOverlay{
    position:absolute;
    inset:0;
    background: rgba(0,0,0,.35);
  }
  .tHeroInner{
    position: relative;
    z-index: 1;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top: 86px; /* header height */
  }
  .tHeroTitle{
    margin:0;
    font-size: 72px;
    color:#fff;
    font-weight: 900;
    letter-spacing: .5px;
    text-shadow: 0 12px 30px rgba(0,0,0,.35);
  }
  @media (max-width: 700px){
    .tHero{ height: 420px; }
    .tHeroTitle{ font-size: 54px; }
  }

  /* SECTION */
  .tSection{
    padding: 84px 0;
  }
  .tSectionGray{
    background: var(--bg);
  }

  .tTitleBlock{
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 54px;
  }
  .tH2{
    margin:0;
    font-size: 54px;
    font-weight: 900;
    letter-spacing: .2px;
    text-align:center;
  }
  .tUnderline{
    width: 140px;
    height: 3px;
    background: var(--blue);
    opacity: .85;
  }
  .tUnderline.wide{ width: 300px; }

  /* CARD GRIDS */
  .tGrid4{
    display:grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 28px;
    justify-items: center;
  }
  .tGrid3{
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    justify-items: center;
  }
  @media (max-width: 1100px){
    .tGrid4{ grid-template-columns: repeat(2, minmax(0,1fr)); }
    .tGrid3{ grid-template-columns: repeat(2, minmax(0,1fr)); }
  }
  @media (max-width: 700px){
    .tGrid4, .tGrid3{ grid-template-columns: 1fr; }
  }

  .tCard{
    width: 100%;
    max-width: 320px;
    background: #fff;
    border-radius: 18px;
    box-shadow: var(--cardShadow);
    padding: 28px 26px 26px;
    text-align: center;
    border: 1px solid rgba(0,0,0,.06);
  }
  .tIconWrap{
    display:flex;
    align-items:center;
    justify-content:center;
    height: 110px;
    margin-bottom: 6px;
    filter: drop-shadow(0 10px 12px rgba(0,0,0,.10));
  }
  .tCardTitle{
    margin: 6px 0 14px;
    font-size: 22px;
    font-weight: 900;
  }
  .tCardDesc{
    margin: 0;
    color: #111;
    opacity: .90;
    font-size: 17px;
    line-height: 2.1;
  }

  /* CTA */
  .tCTA{
    background: #ffffff;
    padding: 88px 0;
  }
  .tCTACenter{
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
  }
  .tCTATitle{
    margin:0;
    font-size: 30px;
    font-weight: 900;
  }
  .tCTASub{
    margin:0;
    color: #111;
    opacity: .80;
    max-width: 720px;
    line-height: 1.9;
    font-size: 16px;
  }
  .tCTAButton{
    margin-top: 10px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height: 48px;
    padding: 0 26px;
    border-radius: 999px;
    border: 2px solid rgba(0,0,0,.18);
    background: #fff;
    color: #111;
    font-weight: 900;
    letter-spacing: .6px;
    text-decoration:none;
    box-shadow: 0 8px 18px rgba(0,0,0,.14);
  }
  .tCTAButton:hover{ transform: translateY(-1px); }


  .tSocialBtn{
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  /* Floating cart */
  .tFloatCart{
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
  .tFloatCart:hover{ transform: translateY(-1px); }
  .tFloatBadge{
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

  /* Back to top */
  .tBackTop{
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
  .tBackArrow{
    font-size: 26px;
    color: #111;
    font-weight: 900;
    transform: translateY(-1px);
  }
`;
