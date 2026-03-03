// src/pages/Franchise.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link} from "react-router-dom";
import {
  Building2,
  TrendingUp,
  Headset,
  BadgeDollarSign,
  
} from "lucide-react";

type InfoCard = {
  title: string;
  desc: string;
  Icon: React.ElementType;
};

const Franchise: React.FC = () => {
  // ✅ Header logo URL (as you provided)
  // const LOGO_URL =
  //   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

  // ✅ Replace this with your exact franchise hero image URL (WP / CDN)
  const HERO_IMAGE =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-sora-shimazaki-5668859.jpg";

  // ✅ Replace this with your exact dealer section image URL (WP / CDN)
  const DEALER_IMAGE =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-hoang-nc-483165236-16057288.jpg";

  //const [cartCount] = useState<number>(0);
  const [_showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cards: InfoCard[] = useMemo(
    () => [
      {
        title: "Establish Brand\nPresence",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        Icon: Building2,
      },
      {
        title: "Growing Demand in\nTool Industry",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        Icon: TrendingUp,
      },
      {
        title: "Marketing &\nOperational Support",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        Icon: Headset,
      },
      {
        title: "Attractive Profit\nMargins",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        Icon: BadgeDollarSign,
      },
    ],
    []
  );
  return (
    <div className="fr-page">
      {/* ================= HEADER (Overlay like screenshot) ================= */}
      {/* <header className="fr-header">
        <div className="fr-header__inner">
          <Link to="/" className="fr-logo">
            <img src={LOGO_URL} alt="Tunturu" />
          </Link>

          <nav className="fr-nav">
            <div className="fr-nav__left">
              {navItems
                .filter((x) => !x.right)
                .map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      "fr-nav__link" + (isActive ? " active" : "")
                    }
                  >
                    {item.label}
                    {item.dropdown ? (
                      <ChevronDown size={16} style={{ marginLeft: 6 }} />
                    ) : null}
                  </NavLink>
                ))}
            </div>

            <div className="fr-nav__right">
              {navItems
                .filter((x) => x.right)
                .map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      "fr-nav__link" + (isActive ? " active" : "")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

              <div className="fr-top-icons">
                <div className="fr-price">₹0.00</div>
                <button className="fr-iconBtn" type="button" aria-label="Cart">
                  <ShoppingCart size={18} />
                  <span className="fr-badge">{cartCount}</span>
                </button>
                <button
                  className="fr-iconBtn"
                  type="button"
                  aria-label="Account"
                >
                  <span className="fr-userDot" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header> */}

      {/* ================= HERO ================= */}
      <section
        className="fr-hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="fr-hero__overlay" />
        <div className="fr-hero__content">
          <h1>Franchise</h1>
        </div>
      </section>

      {/* ================= SECTION: Why Partner With Us ================= */}
      <section className="fr-section fr-section--light">
        <div className="fr-container">
          <div className="fr-titleCenter">
            <h2>Why Partener With Us?</h2>
            <div className="fr-underline" />
          </div>

          <div className="fr-cards">
            {cards.map(({ title, desc, Icon }, idx) => (
              <div key={idx} className="fr-card">
                <div className="fr-card__icon">
                  <Icon size={72} strokeWidth={1.6} />
                </div>
                <h3 className="fr-card__title">
                  {title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p className="fr-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: Investment & Requirements / What you Get ================= */}
      <section className="fr-section fr-section--lighter">
        <div className="fr-container">
          <div className="fr-twoCol">
            <div className="fr-col">
              <h3 className="fr-subtitle">Investment &amp; Requirements</h3>

              <div className="fr-req">
                <div className="fr-req__label">Initial Investment</div>
                <div className="fr-req__value">60k to 100k</div>
              </div>

              <div className="fr-req">
                <div className="fr-req__label">Space Requirements</div>
                <div className="fr-req__value">800 – 1500 sq ft</div>
              </div>

              <div className="fr-req">
                <div className="fr-req__label">Location Preference</div>
                <div className="fr-req__value">PAN India</div>
              </div>
            </div>

            <div className="fr-col">
              <h3 className="fr-subtitle">What you Get?</h3>
              <ul className="fr-bullets">
                <li>Product Supply Chain Access</li>
                <li>Branding and Marketing Support</li>
                <li>Training &amp; Onboarding</li>
                <li>Inventory Guaidnce</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: Eligible Dealer Channel Partner ================= */}
      <section className="fr-section fr-section--white">
        <div className="fr-container">
          <div className="fr-eligible">
            <div className="fr-eligible__left">
              <h2 className="fr-eligible__title">
                Who is Eligible to become a Dealer
                <br />
                Channel Partner?
              </h2>

              <ul className="fr-bullets fr-bullets--big">
                <li>Merchants who deals with</li>
                <li>Hand Tools and Machine tools</li>
                <li>Agri Equipment Machineries</li>
                <li>Hardware Items</li>
                <li>Paints</li>
                <li>Automobile spare parts</li>
                <li>Plywood / Glass Super Markets etc</li>
              </ul>

              <div className="fr-eligible__btns">
                <Link to="/franchise-application" className="fr-pillBtn">
                  BECOME FRANCHISE OWNER
                </Link>
                <Link to="/dealer" className="fr-pillBtn">
                  BECOME DEALER CHANNEL PARTNER
                </Link>
              </div>
            </div>

            <div className="fr-eligible__right">
              <div className="fr-imageCard">
                <img src={DEALER_IMAGE} alt="Dealer / Partner" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER (same layout) ================= */}

      {/* ================= FLOATING BUTTONS (like screenshot) ================= */}
      {/* ================= STYLES ================= */}
      <style>{`
        .fr-page{
          min-height: 100vh;
          background: #fff;
          color: #111;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        /* Header */
        .fr-header{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 14px 0;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(1px);
        }
        .fr-header__inner{
          width: min(1280px, calc(100% - 56px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .fr-logo img{
          height: 34px;
          width: auto;
          display: block;
        }

        .fr-nav{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .fr-nav__left, .fr-nav__right{
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }
        .fr-nav__link{
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.4px;
          font-size: 14px;
          opacity: 0.95;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .fr-nav__link:hover{ opacity: 1; }
        .fr-nav__link.active{
          text-decoration: none;
          color: #b9c7ff;
        }

        .fr-top-icons{
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 6px;
        }
        .fr-price{
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.2px;
          margin-right: 6px;
        }
        .fr-iconBtn{
          position: relative;
          border: 0;
          background: transparent;
          color: #fff;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
        }
        .fr-iconBtn:hover{
          background: rgba(255,255,255,0.10);
        }
        .fr-badge{
          position: absolute;
          top: 0px;
          right: 0px;
          transform: translate(30%, -30%);
          background: #fff;
          color: #111;
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
        }
        .fr-userDot{
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.95);
          display: inline-block;
        }

        /* Hero */
        .fr-hero{
          min-height: 540px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: grid;
          place-items: center;
        }
        .fr-hero__overlay{
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.28);
        }
        .fr-hero__content{
          position: relative;
          text-align: center;
          padding: 140px 16px 80px;
        }
        .fr-hero__content h1{
          margin: 0;
          color: #fff;
          font-size: clamp(44px, 5vw, 76px);
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        /* Sections */
        .fr-section{ padding: 90px 0; }
        .fr-section--light{ background: #f5f7fb; }
        .fr-section--lighter{ background: #f7f8fb; }
        .fr-section--white{ background: #fff; }

        .fr-container{
          width: min(1200px, calc(100% - 56px));
          margin: 0 auto;
        }

        .fr-titleCenter{
          text-align: center;
          margin-bottom: 40px;
        }
        .fr-titleCenter h2{
          margin: 0;
          font-size: clamp(34px, 3vw, 56px);
          font-weight: 800;
          color: #111;
        }
        .fr-underline{
          width: 190px;
          height: 3px;
          background: #7f97ff;
          border-radius: 999px;
          margin: 12px auto 0;
        }

        /* Cards */
        .fr-cards{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          margin-top: 22px;
        }
        .fr-card{
          background: #fff;
          border-radius: 16px;
          padding: 26px 22px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 22px rgba(0,0,0,0.18);
          text-align: center;
        }
        .fr-card__icon{
          color: #7a8fe0;
          display: grid;
          place-items: center;
          margin: 6px 0 10px;
        }
        .fr-card__title{
          margin: 0 0 12px;
          font-weight: 800;
          font-size: 28px;
          line-height: 1.12;
        }
        .fr-card__desc{
          margin: 0;
          color: #333;
          font-size: 16px;
          line-height: 1.9;
        }

        /* Two column requirements */
        .fr-twoCol{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
          align-items: start;
        }
        .fr-subtitle{
          margin: 0 0 18px;
          font-size: 26px;
          font-weight: 800;
        }
        .fr-req{ margin: 18px 0; }
        .fr-req__label{
          font-weight: 800;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .fr-req__value{
          font-size: 18px;
          color: #111;
          margin-bottom: 18px;
        }

        .fr-bullets{
          margin: 12px 0 0;
          padding-left: 22px;
          color: #111;
          line-height: 2;
          font-size: 18px;
        }
        .fr-bullets li{ margin: 6px 0; }

        /* Eligible section */
        .fr-eligible{
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 46px;
          align-items: center;
        }
        .fr-eligible__title{
          margin: 0 0 18px;
          font-size: clamp(32px, 3vw, 48px);
          font-weight: 900;
          line-height: 1.15;
        }
        .fr-bullets--big{
          font-size: 18px;
          line-height: 2.05;
        }

        .fr-eligible__btns{
          margin-top: 24px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .fr-pillBtn{
          text-decoration: none;
          color: #111;
          background: #fff;
          border: 2px solid rgba(0,0,0,0.25);
          padding: 14px 26px;
          border-radius: 999px;
          font-weight: 900;
          letter-spacing: 0.6px;
          box-shadow: 0 10px 18px rgba(0,0,0,0.18);
        }
        .fr-pillBtn:hover{
          transform: translateY(-1px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.22);
        }

        .fr-imageCard{
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 16px 30px rgba(0,0,0,0.20);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .fr-imageCard img{
          width: 100%;
          height: 360px;
          object-fit: cover;
          display: block;
        }

        /* Footer */
        .fr-footer{
          background: #0b0b0b;
          color: #fff;
        }
        .fr-footer__top{
          padding: 70px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .fr-footer__grid{
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 1fr;
          gap: 70px;
          align-items: start;
        }
        .fr-footer__logo{
          height: 46px;
          width: auto;
          display: block;
          margin-bottom: 16px;
        }
        .fr-footer__text{
          color: rgba(255,255,255,0.9);
          line-height: 2;
          font-size: 16px;
          margin-bottom: 18px;
        }
        .fr-social{
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }
        .fr-social__dot{
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          display: grid;
          place-items: center;
          text-decoration: none;
          font-weight: 900;
        }
        .fr-footer__heading{
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .fr-footer__underline{
          width: 62px;
          height: 2px;
          background: #7f97ff;
          border-radius: 999px;
          margin-bottom: 14px;
        }
        .fr-footer__links{
          display: grid;
          gap: 12px;
        }
        .fr-footer__links a{
          color: rgba(255,255,255,0.92);
          text-decoration: none;
          font-size: 18px;
        }
        .fr-footer__links a:hover{ color: #b9c7ff; }

        .fr-footer__bottom{
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 26px 0;
        }
        .fr-footer__bottomInner{
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255,255,255,0.9);
          font-size: 18px;
        }

        /* Floating buttons */
        .fr-floatCart{
          position: fixed;
          right: 24px;
          bottom: 28px;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          background: #0a84c1;
          color: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 14px 30px rgba(0,0,0,0.28);
          z-index: 60;
        }
        .fr-floatBadge{
          position: absolute;
          top: 10px;
          left: 10px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #2bd36b;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          display: grid;
          place-items: center;
        }

        .fr-floatTop{
          position: fixed;
          left: 22px;
          bottom: 30px;
          width: 56px;
          height: 56px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          background: #7f97ff;
          color: #0b0b0b;
          display: grid;
          place-items: center;
          box-shadow: 0 14px 26px rgba(0,0,0,0.26);
          z-index: 60;
        }

        /* Responsive */
        @media (max-width: 1100px){
          .fr-cards{ grid-template-columns: repeat(2, 1fr); }
          .fr-twoCol{ grid-template-columns: 1fr; gap: 36px; }
          .fr-eligible{ grid-template-columns: 1fr; }
          .fr-imageCard img{ height: 320px; }
          .fr-footer__grid{ grid-template-columns: 1fr; gap: 34px; }
          .fr-footer__bottomInner{ flex-direction: column; gap: 12px; align-items: flex-start; }
        }
        @media (max-width: 680px){
          .fr-header__inner{ width: calc(100% - 24px); }
          .fr-container{ width: calc(100% - 24px); }
          .fr-nav{ display: none; } /* if you have a mobile menu component, replace this */
          .fr-hero{ min-height: 460px; }
          .fr-card__title{ font-size: 24px; }
        }
      `}</style>
    </div>
  );
};

export default Franchise;