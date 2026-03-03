// FAQ.tsx
import React, { useEffect, useMemo, useState } from "react";

type FaqItem = { q: string; a: string };

// const HEADER_LOGO_URL =
//   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// Hero image (similar “support/call center” look)
const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-mart-production-7709297.jpg";

const FAQS: FaqItem[] = [
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, COD is available for selected locations.",
  },
  {
    q: "How can I track my order?",
    a: "Tracking details are sent via email/SMS after dispatch.",
  },
  {
    q: "Do you provide warranty on tools?",
    a: "Warranty depends on the manufacturer and product type.",
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be canceled before dispatch.",
  },
  {
    q: "Do you offer bulk discounts?",
    a: "Yes, please contact us for bulk or franchise inquiries.",
  },
  {
    q: "How do I apply for a franchise?",
    a: "Visit our Franchise page and fill out the application form.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="tt-page">
      {/* ===================== HEADER ===================== */}
      {/* <header className="tt-header">
        <div className="tt-header__inner">
          <a className="tt-brand" href="/" aria-label="Tunturu Home">
            <img className="tt-brand__logo" src={HEADER_LOGO_URL} alt="Tunturu" />
          </a>

          <nav className="tt-nav" aria-label="Primary navigation">
            <a href="/">HOME</a>
            <a href="/store">STORE</a>
            <div className="tt-nav__dropdown">
              <a href="/categories">
                CATEGORIES <span className="tt-caret">▾</span>
              </a>
            </div>
            <a href="/franchise">FRANCHISE</a>
            <a href="/services">SERVICES</a>
            <a href="/blog">BLOG</a>
          </nav>

          <div className="tt-header__right">
            <a className="tt-link" href="/about">
              ABOUT
            </a>
            <a className="tt-link" href="/contact">
              CONTACT US
            </a>

            <div className="tt-mini">
              <span className="tt-price">₹0.00</span>

              <button className="tt-iconbtn" aria-label="Cart">
                <CartIcon />
                <span className="tt-badge">0</span>
              </button>

              <button className="tt-iconbtn" aria-label="Account">
                <UserIcon />
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* ===================== HERO ===================== */}
      <section
        className="tt-hero"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-label="FAQs hero"
      >
        <div className="tt-hero__overlay" />
        <h1 className="tt-hero__title">FAQs</h1>
      </section>

      {/* ===================== CONTENT ===================== */}
      <main className="tt-main">
        <div className="tt-faqwrap">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="tt-faqitem">
                <button
                  className={`tt-faqbtn ${isOpen ? "is-open" : ""}`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className={`tt-chevron ${isOpen ? "rot" : ""}`}>
                    <ChevronIcon />
                  </span>
                  <span className="tt-q">{item.q}</span>
                </button>

                <div className={`tt-faqpanel ${isOpen ? "open" : ""}`}>
                  <div className="tt-faqpanel__inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ===================== FOOTER ===================== */}
      {/* ===================== STYLES ===================== */}
      <style>{`
        :root{
          --tt-blue: #1f6fb2;
          --tt-ink: #0f172a;
          --tt-muted: rgba(255,255,255,0.85);
          --tt-bg: #f2f4f7;
          --tt-panel: #e9eaed;
          --tt-border: rgba(0,0,0,0.12);
          --tt-shadow: 0 10px 25px rgba(0,0,0,0.18);
        }

        .tt-page{
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
          color: var(--tt-ink);
          background: #fff;
          min-height: 100vh;
        }

        /* HEADER */
        .tt-header{
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 50;
        }
        .tt-header__inner{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 36px;
          gap: 18px;
        }
        .tt-brand{
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .tt-brand__logo{
          height: 34px;
          width: auto;
          filter: drop-shadow(0 2px 10px rgba(0,0,0,0.35));
        }
        .tt-nav{
          display: flex;
          align-items: center;
          gap: 26px;
          flex: 1;
          justify-content: center;
        }
        .tt-nav a{
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 14px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.35);
        }
        .tt-caret{ opacity: 0.9; font-weight: 900; margin-left: 4px; }
        .tt-header__right{
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .tt-link{
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.5px;
          font-size: 14px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.35);
          white-space: nowrap;
        }
        .tt-mini{
          display: flex;
          align-items: center;
          gap: 14px;
          color: #fff;
        }
        .tt-price{
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0,0,0,0.35);
        }
        .tt-iconbtn{
          position: relative;
          width: 38px;
          height: 38px;
          border: 0;
          background: transparent;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.35);
        }
        .tt-badge{
          position: absolute;
          top: 2px;
          right: 1px;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          font-size: 11px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* HERO */
        .tt-hero{
          position: relative;
          height: 520px;
          background-size: cover;
          background-position: center;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .tt-hero__overlay{
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .tt-hero__title{
          position: relative;
          z-index: 2;
          margin: 0;
          color: #fff;
          font-size: 72px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.45);
        }

        /* MAIN */
        .tt-main{
          background: var(--tt-bg);
          padding: 70px 18px 90px;
        }
        .tt-faqwrap{
          max-width: 980px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .tt-faqitem{ width: 100%; }

        .tt-faqbtn{
          width: 100%;
          border: 1px solid rgba(0,0,0,0.10);
          background: #e6e6e6;
          color: #111;
          border-radius: 14px;
          padding: 18px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
        }
        .tt-faqbtn:hover{
          border-color: rgba(0,0,0,0.18);
          box-shadow: 0 8px 22px rgba(0,0,0,0.08);
        }
        .tt-faqbtn.is-open{
          border-color: rgba(0,0,0,0.25);
          background: #e3e3e3;
        }

        .tt-chevron{
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform .18s ease;
          color: #1a1a1a;
          flex: 0 0 auto;
        }
        .tt-chevron.rot{ transform: rotate(180deg); }
        .tt-q{
          font-size: 18px;
          font-weight: 700;
          text-align: left;
        }

        .tt-faqpanel{
          max-height: 0;
          overflow: hidden;
          transition: max-height .22s ease;
        }
        .tt-faqpanel.open{
          max-height: 240px;
        }
        .tt-faqpanel__inner{
          margin-top: 10px;
          background: #f8f8f8;
          border: 1px solid rgba(0,0,0,0.10);
          border-radius: 14px;
          padding: 18px 18px;
          font-size: 16px;
          line-height: 1.6;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .tt-foottext{
          line-height: 1.9;
          opacity: 0.95;
          font-weight: 500;
        }

        .tt-foothead{
          font-size: 24px;
          font-weight: 800;
          margin-top: 6px;
        }
        .tt-footline{
          width: 70px;
          height: 3px;
          background: var(--tt-blue);
          margin: 10px 0 18px;
          border-radius: 999px;
        }
        .tt-footlink{
          display: block;
          color: #fff;
          text-decoration: none;
          padding: 8px 0;
          opacity: 0.95;
        }
        .tt-footlink:hover{ opacity: 1; text-decoration: underline; }
        .tt-footlink--active{ color: #2f7ad1; }

        .tt-social{
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }
        .tt-socialbtn{
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: #fff;
          color: #000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .tt-footer__bottom{
          margin-top: 54px;
          border-top: 1px solid rgba(255,255,255,0.10);
          padding: 22px 0;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.95;
        }

        /* FLOATING BUTTONS */
        .tt-floatcart{
          position: fixed;
          right: 22px;
          bottom: 90px;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          background: #1f7fd6;
          color: #fff;
          box-shadow: var(--tt-shadow);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 80;
        }
        .tt-badge--float{
          top: 8px;
          right: 8px;
          background: #18c964;
          color: #fff;
          width: 20px;
          height: 20px;
          font-size: 11px;
        }

        .tt-top{
          position: fixed;
          left: 22px;
          bottom: 90px;
          width: 60px;
          height: 60px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          background: #7b8cff;
          color: #0b1020;
          box-shadow: var(--tt-shadow);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 80;
          transform: translateY(10px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .18s ease, transform .18s ease;
        }
        .tt-top.show{
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        /* RESPONSIVE */
        @media (max-width: 1100px){
          .tt-header__inner{ padding: 16px 18px; }
          .tt-nav{ gap: 16px; }
          .tt-hero{ height: 440px; }
          .tt-hero__title{ font-size: 56px; }
        }
        @media (max-width: 860px){
          .tt-nav{ display: none; }
          .tt-footer__inner{
            grid-template-columns: 1fr;
          }
          .tt-footer__bottom{
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 520px){
          .tt-hero__title{ font-size: 44px; }
          .tt-faqbtn{ padding: 16px 14px; }
          .tt-q{ font-size: 16px; }
        }
      `}</style>
    </div>
  );
};

export default FAQ;

/* ===================== ICONS ===================== */
function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6h15l-1.5 8.5H8.2L6.5 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6 5.7 3.8H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1.6" fill="currentColor" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5.5 20c1.6-4.1 11.4-4.1 13 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 6l-6 6M12 6l6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.5-3H13.5V9.2c0-.8.3-1.4 1.5-1.4h1.9V5.1c-.3 0-1.5-.1-2.9-.1-2.9 0-4.7 1.8-4.7 5v2.9H6.8v3h2.5v8h4.2Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 7.1c.01.16.01.32.01.48 0 4.86-3.7 10.46-10.46 10.46-2.08 0-4.01-.61-5.64-1.66.29.03.58.04.88.04 1.72 0 3.31-.59 4.57-1.58-1.61-.03-2.97-1.09-3.44-2.55.22.04.44.07.68.07.33 0 .66-.05.97-.13-1.68-.34-2.95-1.82-2.95-3.6v-.05c.5.28 1.07.45 1.67.47-1-.67-1.66-1.8-1.66-3.08 0-.68.18-1.32.51-1.87 1.82 2.24 4.55 3.71 7.63 3.87-.06-.27-.09-.56-.09-.84 0-2.02 1.64-3.66 3.66-3.66 1.05 0 2 .44 2.67 1.14.83-.16 1.61-.47 2.31-.9-.27.85-.85 1.56-1.6 2.01.74-.09 1.44-.29 2.09-.58-.5.74-1.12 1.38-1.84 1.9Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.7 31.7 0 0 0 2 12a31.7 31.7 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 22 12a31.7 31.7 0 0 0-.4-4.8ZM10.3 15.2V8.8L15.8 12l-5.5 3.2Z" />
    </svg>
  );
}