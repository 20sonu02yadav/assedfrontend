// import { useEffect, useState } from "react";

// /**
//  * Terms.tsx (single file)
//  * Pure React / No WP / No WooCommerce
//  * Matches screenshot:
//  * - Transparent nav over hero
//  * - Big "TERMS & CONDITIONS" title
//  * - Light gray section content
//  * - Sections: General, Products & Pricing, Orders, Limitation of Liability, Payments, Intellectual Property, Governing Law
//  * - Same black footer + bottom bar
//  * - Floating cart + back-to-top
//  */

// export default function Terms() {
//   const [_showTop, setShowTop] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setShowTop(window.scrollY > 650);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <style>{css}</style>

//       <div className="tPage">
//         {/* HEADER */}

//         {/* HERO */}
//         <section className="tHero">
//           <div className="tHeroOverlay" />
//           <div className="tHeroInner">
//             <h1 className="tHeroTitle">TERMS &amp; CONDITIONS</h1>
//           </div>
//         </section>

//         {/* CONTENT */}
//         <section className="tContentWrap">
//           <div className="tContainer tContent">
//             {/* General */}
//             <h2 className="tH2">General</h2>
//             <p className="tPara">
//               By accessing this website, you agree to comply with these Terms and Conditions.
//             </p>

//             <div className="tSpacer2" />

//             {/* Products & Pricing + Orders */}
//             <div className="tTwoCols">
//               <div className="tCol">
//                 <h2 className="tH2 small">Products &amp; Pricing</h2>
//                 <ul className="tList">
//                   <li>All prices are listed in INR (or applicable currency).</li>
//                   <li>We reserve the right to change prices without notice.</li>
//                   <li>Product availability may change at any time.</li>
//                 </ul>
//               </div>

//               <div className="tCol">
//                 <h2 className="tH2 small">Orders</h2>
//                 <ul className="tList">
//                   <li>Orders are confirmed only after payment verification.</li>
//                   <li>We reserve the right to cancel any suspicious or fraudulent order.</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="tSpacer2" />

//             {/* Limitation of Liability */}
//             <h2 className="tH2">Limitation of Liability</h2>
//             <p className="tPara">We are not liable for:</p>
//             <ul className="tList">
//               <li>Indirect damages</li>
//               <li>Delays caused by courier partners</li>
//               <li>Misuse of products</li>
//             </ul>

//             <div className="tSpacer2" />

//             {/* Payments */}
//             <h2 className="tH2">Payments</h2>
//             <p className="tPara">
//               We accept payments through secure third-party payment gateways. We do not store payment details.
//             </p>

//             <div className="tSpacer2" />

//             {/* Intellectual Property */}
//             <h2 className="tH2">Intellectual Property</h2>
//             <p className="tPara">
//               All content, logos, images, and product information are the property of Tunturu Tools and may not be copied without permission.
//             </p>

//             <div className="tSpacer2" />

//             {/* Governing Law */}
//             <h2 className="tH2">Governing Law</h2>
//             <p className="tPara">These terms are governed by the laws of India.</p>
//           </div>
//         </section>

//         {/* FOOTER */}
//       </div>
//     </>
//   );
// }

// /* ========================= CSS ========================= */
// const css = `
//   :root{
//     --gray:#f3f5f7;
//     --text:#101010;
//   }

//   *{ box-sizing:border-box; }
//   html, body{ height:100%; width:100%; }
//   body{
//     margin:0;
//     font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
//     color: var(--text);
//     background:#fff;
//   }

//   .tContainer{
//     width: min(1320px, calc(100% - 90px));
//     margin: 0 auto;
//   }
//   @media (max-width: 900px){
//     .tContainer{ width: calc(100% - 24px); }
//   }

//   /* Header */
//   .tHeader{
//     position:absolute;
//     top:0; left:0; right:0;
//     z-index:50;
//     background: rgba(0,0,0,.22);
//     backdrop-filter: blur(2px);
//   }
//   .tHeaderRow{
//     height: 86px;
//     display:flex;
//     align-items:center;
//     gap: 18px;
//   }
//   .tBrand{
//     display:flex;
//     align-items:flex-start;
//     gap: 6px;
//     min-width: 160px;
//   }
//   /* ✅ Logo Styling (fix for you) */
//   .tLogo{
//     height: 36px;
//     width: auto;
//     display:block;
//     object-fit: contain;
//     filter: drop-shadow(0 8px 16px rgba(0,0,0,.25));
//   }
//   .tBrandSup{
//     color:#2ea0ff;
//     font-weight:900;
//     font-size: 16px;
//     margin-top: -2px;
//     opacity: .9;
//   }

//   .tNav{
//     display:flex; align-items:center; gap: 22px;
//     width: 100%;
//     color:#fff;
//   }
//   .tNavLink{
//     color:#fff; text-decoration:none;
//     font-weight: 700;
//     letter-spacing: .2px;
//     font-size: 14px;
//     text-transform: uppercase;
//     opacity: .95;
//   }
//   .tNavLink:hover{ opacity:.85; }
//   .tCaret{ color:#fff; opacity:.9; margin-left:-12px; margin-right: 2px; }
//   .tNavSpacer{ flex:1; }

//   .tHeaderIcons{ display:flex; align-items:center; gap:16px; white-space:nowrap; }
//   .tPrice{ font-weight:800; color:#fff; }
//   .tCartMini{ position:relative; display:flex; align-items:center; cursor:pointer; }
//   .tCartCount{
//     position:absolute; top:-10px; right:-10px;
//     background:#fff; color:#111;
//     width:20px; height:20px; border-radius:999px;
//     display:flex; align-items:center; justify-content:center;
//     font-size:12px; font-weight:900;
//   }
//   .tUser{ display:flex; align-items:center; justify-content:center; cursor:pointer; }

//   @media (max-width: 980px){
//     .tNavLink, .tCaret, .tNavSpacer{ display:none; }
//     .tHeader{ background: rgba(0,0,0,.35); }
//   }

//   /* Hero */
//   .tHero{
//     height: 520px;
//     position: relative;
//     background: url("https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-rdne-7821937.jpg") center/cover no-repeat;
//     background-color:#1b1b1b;
//   }
//   .tHeroOverlay{ position:absolute; inset:0; background: rgba(0,0,0,.35); }
//   .tHeroInner{
//     position:relative; z-index:1;
//     height:100%;
//     display:flex; align-items:center; justify-content:center;
//     padding-top: 86px;
//   }
//   .tHeroTitle{
//     margin:0;
//     font-size: 72px;
//     color:#fff;
//     font-weight: 900;
//     letter-spacing: 1px;
//     text-shadow: 0 12px 30px rgba(0,0,0,.35);
//   }
//   @media (max-width: 700px){
//     .tHero{ height: 420px; }
//     .tHeroTitle{ font-size: 48px; text-align:center; padding: 0 12px; }
//   }

//   /* Content */
//   .tContentWrap{
//     background: var(--gray);
//     padding: 90px 0 110px;
//   }
//   .tH2{
//     margin:0;
//     font-size: 44px;
//     font-weight: 900;
//     letter-spacing: .2px;
//   }
//   .tH2.small{ font-size: 34px; }
//   .tPara{
//     margin: 16px 0 0;
//     font-size: 17px;
//     line-height: 1.9;
//     color:#111;
//     opacity: .9;
//   }
//   .tSpacer2{ height: 70px; }

//   .tTwoCols{
//     margin-top: 28px;
//     display:grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 90px;
//     align-items:start;
//   }
//   @media (max-width: 980px){
//     .tTwoCols{ grid-template-columns: 1fr; gap: 40px; }
//   }

//   .tList{
//     margin: 0;
//     padding-left: 22px;
//     margin-top: 18px;
//     line-height: 2.0;
//     font-size: 17px;
//     color:#111;
//     opacity: .9;
//   }
//   .tList li{ margin: 10px 0; }


//   /* Floating */
//   .tFloatCart{
//     position: fixed;
//     right: 28px;
//     bottom: 40px;
//     width: 74px;
//     height: 74px;
//     border: none;
//     border-radius: 999px;
//     background: #1976d2;
//     box-shadow: 0 14px 28px rgba(0,0,0,.28);
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     cursor:pointer;
//     z-index: 80;
//   }
//   .tFloatBadge{
//     position:absolute;
//     top: 10px;
//     left: 10px;
//     width: 22px;
//     height: 22px;
//     border-radius: 999px;
//     background: #2dd4bf;
//     color: #fff;
//     font-weight: 900;
//     font-size: 12px;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     box-shadow: 0 8px 16px rgba(0,0,0,.25);
//   }
//   .tBackTop{
//     position: fixed;
//     left: 24px;
//     bottom: 34px;
//     width: 62px;
//     height: 62px;
//     border-radius: 999px;
//     border: none;
//     background: #9aa7ff;
//     box-shadow: 0 14px 28px rgba(0,0,0,.22);
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     cursor:pointer;
//     z-index: 80;
//   }
//   .tBackArrow{
//     font-size: 26px;
//     color: #111;
//     font-weight: 900;
//     transform: translateY(-1px);
//   }
// `;


import { useEffect, useState } from "react";

type TermsSectionData = {
  heading: string;
  intro_text?: string;
  items: string[];
};

type TermsApiResponse = {
  hero_title: string;
  hero_background_image: string;
  general_heading: string;
  general_text: string;
  limitation_heading: string;
  limitation_intro: string;
  limitation_items: string[];
  payments_heading: string;
  payments_text: string;
  intellectual_property_heading: string;
  intellectual_property_text: string;
  governing_law_heading: string;
  governing_law_text: string;
  sections: {
    products_pricing: TermsSectionData;
    orders: TermsSectionData;
  };
};

const API_BASE = "https://attenbackend.clickconnectmedia.cloud";
const TERMS_API = `${API_BASE}/api/terms/`;

const defaultData: TermsApiResponse = {
  hero_title: "TERMS & CONDITIONS",
  hero_background_image:
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-rdne-7821937.jpg",
  general_heading: "General",
  general_text:
    "By accessing this website, you agree to comply with these Terms and Conditions.",
  limitation_heading: "Limitation of Liability",
  limitation_intro: "We are not liable for:",
  limitation_items: [
    "Indirect damages",
    "Delays caused by courier partners",
    "Misuse of products",
  ],
  payments_heading: "Payments",
  payments_text:
    "We accept payments through secure third-party payment gateways. We do not store payment details.",
  intellectual_property_heading: "Intellectual Property",
  intellectual_property_text:
    "All content, logos, images, and product information are the property of Tunturu Tools and may not be copied without permission.",
  governing_law_heading: "Governing Law",
  governing_law_text: "These terms are governed by the laws of India.",
  sections: {
    products_pricing: {
      heading: "Products & Pricing",
      items: [
        "All prices are listed in INR (or applicable currency).",
        "We reserve the right to change prices without notice.",
        "Product availability may change at any time.",
      ],
    },
    orders: {
      heading: "Orders",
      items: [
        "Orders are confirmed only after payment verification.",
        "We reserve the right to cancel any suspicious or fraudulent order.",
      ],
    },
  },
};

export default function Terms() {
  const [_showTop, setShowTop] = useState(false);
  const [pageData, setPageData] = useState<TermsApiResponse>(defaultData);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const res = await fetch(TERMS_API);
        if (!res.ok) {
          throw new Error(`Failed to fetch terms data: ${res.status}`);
        }
        const data = await res.json();

        setPageData({
          ...defaultData,
          ...data,
          sections: {
            ...defaultData.sections,
            ...(data.sections || {}),
          },
        });
      } catch (error) {
        console.error("Terms API fallback used:", error);
        setPageData(defaultData);
      }
    };

    fetchTermsData();
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="tPage">
        <section
          className="tHero"
          style={{
            background: `url("${pageData.hero_background_image}") center/cover no-repeat`,
            backgroundColor: "#1b1b1b",
          }}
        >
          <div className="tHeroOverlay" />
          <div className="tHeroInner">
            <h1 className="tHeroTitle">{pageData.hero_title}</h1>
          </div>
        </section>

        <section className="tContentWrap">
          <div className="tContainer tContent">
            <h2 className="tH2">{pageData.general_heading}</h2>
            <p className="tPara">{pageData.general_text}</p>

            <div className="tSpacer2" />

            <div className="tTwoCols">
              <div className="tCol">
                <h2 className="tH2 small">{pageData.sections.products_pricing.heading}</h2>
                <ul className="tList">
                  {pageData.sections.products_pricing.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="tCol">
                <h2 className="tH2 small">{pageData.sections.orders.heading}</h2>
                <ul className="tList">
                  {pageData.sections.orders.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tSpacer2" />

            <h2 className="tH2">{pageData.limitation_heading}</h2>
            <p className="tPara">{pageData.limitation_intro}</p>
            <ul className="tList">
              {pageData.limitation_items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="tSpacer2" />

            <h2 className="tH2">{pageData.payments_heading}</h2>
            <p className="tPara">{pageData.payments_text}</p>

            <div className="tSpacer2" />

            <h2 className="tH2">{pageData.intellectual_property_heading}</h2>
            <p className="tPara">{pageData.intellectual_property_text}</p>

            <div className="tSpacer2" />

            <h2 className="tH2">{pageData.governing_law_heading}</h2>
            <p className="tPara">{pageData.governing_law_text}</p>
          </div>
        </section>
      </div>
    </>
  );
}

const css = `
  :root{
    --gray:#f3f5f7;
    --text:#101010;
  }

  *{ box-sizing:border-box; }
  html, body{ height:100%; width:100%; }
  body{
    margin:0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
    color: var(--text);
    background:#fff;
  }

  .tContainer{
    width: min(1320px, calc(100% - 90px));
    margin: 0 auto;
  }
  @media (max-width: 900px){
    .tContainer{ width: calc(100% - 24px); }
  }

  .tHero{
    height: 520px;
    position: relative;
    background-color:#1b1b1b;
  }
  .tHeroOverlay{ position:absolute; inset:0; background: rgba(0,0,0,.35); }
  .tHeroInner{
    position:relative; z-index:1;
    height:100%;
    display:flex; align-items:center; justify-content:center;
    padding-top: 86px;
  }
  .tHeroTitle{
    margin:0;
    font-size: 72px;
    color:#fff;
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 0 12px 30px rgba(0,0,0,.35);
  }
  @media (max-width: 700px){
    .tHero{ height: 420px; }
    .tHeroTitle{ font-size: 48px; text-align:center; padding: 0 12px; }
  }

  .tContentWrap{
    background: var(--gray);
    padding: 90px 0 110px;
  }
  .tH2{
    margin:0;
    font-size: 44px;
    font-weight: 900;
    letter-spacing: .2px;
  }
  .tH2.small{ font-size: 34px; }
  .tPara{
    margin: 16px 0 0;
    font-size: 17px;
    line-height: 1.9;
    color:#111;
    opacity: .9;
  }
  .tSpacer2{ height: 70px; }

  .tTwoCols{
    margin-top: 28px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 90px;
    align-items:start;
  }
  @media (max-width: 980px){
    .tTwoCols{ grid-template-columns: 1fr; gap: 40px; }
  }

  .tList{
    margin: 0;
    padding-left: 22px;
    margin-top: 18px;
    line-height: 2.0;
    font-size: 17px;
    color:#111;
    opacity: .9;
  }
  .tList li{ margin: 10px 0; }
`;