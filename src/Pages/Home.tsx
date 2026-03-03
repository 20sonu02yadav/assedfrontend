import{ useMemo, useRef} from "react";

type Product = {
  id: string;
  name: string;
  category?: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  href?: string;
  badge?: string; // "SALE"
};

type Offer = {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
};

function inr(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₹${Math.round(n)}`;
  }
}

function Stars({ count = 5 }: { count?: number }) {
  const c = Math.max(0, Math.min(5, count));
  return (
    <div className="stars" aria-label={`${c} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < c ? "on" : ""}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function FeaturedCard({ p }: { p: Product }) {
  return (
    <article className="fpCard">
      <a className="fpImgWrap" href={p.href ?? "#"} onClick={(e) => !p.href && e.preventDefault()}>
        <img className="fpImg" src={p.image} alt={p.name} loading="lazy" />
        <span className="fpSale">{p.badge ?? "SALE"}</span>
        <span className="fpEye" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"
            />
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
          </svg>
        </span>
      </a>

      <div className="fpBody">
        <div className="fpCat">{p.category ?? "UNCATEGORIZED"}</div>

        <h3 className="fpTitle" title={p.name}>
          <a href={p.href ?? "#"} onClick={(e) => !p.href && e.preventDefault()}>
            {p.name.toUpperCase()}
          </a>
        </h3>

        <div className="fpPriceRow">
          {p.oldPrice ? <span className="fpOld">{inr(p.oldPrice)}</span> : null}
          <span className="fpNow">{inr(p.price)}</span>
          {p.discountPercent ? <span className="fpOff">{`-${p.discountPercent}%`}</span> : null}
        </div>

        <button className="fpBtn" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 10V8a6 6 0 0112 0v2" />
            <rect x="5" y="10" width="14" height="12" rx="2" strokeWidth="2" />
          </svg>
          ADD TO CART
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  // Hero BG (FULL show)
  const heroBg =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-nishantaneja-12105083.jpg";

  

  const promo1 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-theshuttervision-8811529.jpg";
  const promo2 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-osman-sran-95404891-22798290.jpg";
  const promo3 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-matreding-6835302.jpg";

  const specialEditionBg =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cta-bg.jpg";

  const brandLogos = useMemo(
    () => [
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.40.26-PM.jpeg", alt: "TOTAL" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.23-PM.jpeg", alt: "FOCUS" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.29-PM.jpeg", alt: "DuCaR" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.32-PM.jpeg", alt: "Mr Light" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.35-PM.jpeg", alt: "Gravis" },





      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.30-PM.jpeg", alt: "PHILIPS" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.38-PM.jpeg", alt: "AMEROCOOK" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.49.26-PM.jpeg", alt: "SMART LIGHT" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.40-PM.jpeg", alt: "ZIG GAK" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.35-PM.jpeg", alt: "ENGLISH ROYAL" },


      
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.16-PM.jpeg", alt: "PHILIPS ACCOSSIRALSE" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.20-PM.jpeg", alt: "PHILIPS BATTERIES" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.23-PM.jpeg", alt: "PHILIPS FLASHLIGHT" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.40-PM.jpeg", alt: "ZIG GAK" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.35-PM.jpeg", alt: "ENGLISH ROYAL" },

    ],
    []
  );

  const brandsRef = useRef<HTMLDivElement | null>(null);

  // Dummy cart values (connect later)
  //const [cartCount] = useState(0);
  //const [cartTotal] = useState(0);
  //const [floatingCartCount] = useState(0);

  // ✅ LOGO fallback
  //const [logoOkHeader, setLogoOkHeader] = useState(true);
  //const [logoOkFooter, setLogoOkFooter] = useState(true);

  // ✅ Dummy Offers (no API)
  const offers: Offer[] = useMemo(
    () => [
      {
        id: "o1",
        title: "20% Off",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
        image: promo1,
        href: "/discounted-products",
        cta: "SHOP NOW",
      },
      {
        id: "o2",
        title: "Latest Tools For You",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
        image: promo2,
        href: "/store",
        cta: "SHOP NOW",
      },
      {
        id: "o3",
        title: "New Arrival",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
        image: promo3,
        href: "/store",
        cta: "CHECK OUT",
      },
    ],
    [promo1, promo2, promo3]
  );

  // ✅ Dummy Featured Products (no API)
  const featured: Product[] = useMemo(
    () => [
      {
        id: "p1",
        name: "TOTAL TOOLS SOFT BRISTLE BRUSH TACS1401",
        category: "UNCATEGORIZED",
        image:
          "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/premium_photo-1683140705462-11ed388653cf-1.jpg",
        price: 340,
        oldPrice: 425,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/tacs1401",
      },
      {
        id: "p2",
        name: "TOTAL TOOLS 4 STEP HOUSEHOLD LADDER THLAD06041",
        category: "LADDER",
        image: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/ladder.png",
        price: 4232,
        oldPrice: 5290,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/thlad06041",
      },
      {
        id: "p3",
        name: "TOTAL TOOLS IMPACT SCREWDRIVER BITS TACIM71SL625",
        category: "POWER TOOLS ACCESSORIES",
        image: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/bits.png",
        price: 60,
        oldPrice: 75,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/tacim71sl625",
      },
      {
        id: "p4",
        name: "TOTAL TOOLS HAMMER THTH0166",
        category: "HAND TOOLS",
        image: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/hammer.png",
        price: 380,
        oldPrice: 475,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/thth0166",
      },
      {
        id: "p5",
        name: "TOTAL TOOLS MEASURING TAPE TMT12603",
        category: "MEASURING",
        image: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/tape.png",
        price: 120,
        oldPrice: 150,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/tmt12603",
      },
      {
        id: "p6",
        name: "TOTAL TOOLS SCREWDRIVER SET THT250614",
        category: "HAND TOOLS",
        image: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/screwdriver.png",
        price: 299,
        oldPrice: 375,
        discountPercent: 20,
        badge: "SALE",
        href: "/product/tht250614",
      },
    ],
    []
  );

  //const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  
  return (
    <div className="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

        :root{
        --blue:#2ea3f2;
        --blue2:#1b76c4;
        --navbg: linear-gradient(90deg,#07293b 0%, #08344c 60%, #0b3d57 100%);
        --border: rgba(255,255,255,.08);
        }

        *{box-sizing:border-box}
        body{margin:0; font-family:Lato, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;}
        a{text-decoration:none; color:inherit}
        .container{width:min(1320px, 94%); margin:0 auto}

        /* ✅ HERO */
        .hero{
          position:relative;
          height: 100vh;
          min-height: 720px;
          overflow:hidden;
          background:#061b27;
        }
        .heroBgImg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit: cover; /* FULL IMAGE visible */
          object-position:center;
        }
        .heroOverlay{
          position:absolute;
          inset:0;
          background: linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.10) 100%);
        }
        .heroOverlay2{
          position:absolute;
          inset:0;
          background: rgba(10, 90, 140, .22);
          mix-blend-mode: multiply;
          pointer-events:none;
        }

        /* ✅ HERO TEXT */
        .heroContent{
          position:relative;
          z-index:2;
          height:100%;
          display:flex;
          align-items:center;
          padding-top:76px; /* prevent header overlap */
        }
        .heroText{
          color:#fff;
          max-width: 760px;
          padding-top: 60px;
        }
        .heroH1{font-size:64px; margin:0 0 12px; font-weight:900; line-height:1.05}
        .heroH3{margin:0 0 28px; font-size:26px; font-weight:800; opacity:.95}
        .heroBtn{
          background:#fff; color:#111; border:none;
          padding:12px 22px; border-radius:999px;
          font-weight:900; cursor:pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,.18);
        }

        /* TITLES */
        .section{padding:60px 0}
        .titleWrap{display:flex; flex-direction:column; gap:10px; margin-bottom:34px}
        .titleWrap.center{align-items:center}
        .titleWrap.left{align-items:flex-start}
        .title{margin:0; font-size:48px; font-weight:900; color:#0b0b0b}
        .underline{width:180px; height:3px; background:#8aa0ff}

        /* BRANDS */
.brandsBox{
  background:#fff;
  padding:60px 0;   /* more vertical space */
}

.brandsRow{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.brandsScroll{
  overflow-x:auto;
  overflow-y:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:80px;          /* more gap */
  padding:20px 0;
  height:160px;      /* 🔥 increased height */
}

.brandsScroll::-webkit-scrollbar{
  height:0;
}

.brandLogo{
  min-width:240px;   /* bigger width */
  height:160px;      /* bigger logo box */
  display:flex;
  align-items:center;
  justify-content:center;
}
.brandArrow{
  width:60px;
  height:60px;
  border-radius:50%;
  border:none;
  background:linear-gradient(135deg,#3b82f6,#2563eb);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:all .3s ease;
  box-shadow:0 10px 25px rgba(0,0,0,.15);
}

.brandArrow svg{
  width:22px;
  height:22px;
  stroke:#fff;
}

.brandArrow:hover{
  transform:translateY(-4px);
  box-shadow:0 18px 35px rgba(0,0,0,.25);
}

.brandLogo img{
  max-height:150px;   /* proportional */
  max-width:220px;
  object-fit:contain;
}

        /* PROMOS */
        .promoGrid{display:grid; grid-template-columns:repeat(3,1fr); gap:28px}
        .promo{
          border-radius:22px; overflow:hidden; position:relative;
          min-height:420px; background-size:cover; background-position:center;
          box-shadow: var(--shadow);
        }
        .promo::before{content:""; position:absolute; inset:0; background:rgba(0,0,0,.55)}
        .promoBody{position:absolute; left:36px; right:36px; bottom:36px; color:#fff}
        .promoH{margin:0 0 10px; font-weight:900; font-size:34px}
        .promoSub{margin:0 0 18px; opacity:.92; line-height:1.7; font-size:16px}
        .promoBtn{
          background:#fff; color:#111; border:none;
          padding:12px 22px; border-radius:999px;
          font-weight:900; cursor:pointer;
        }

        /* FEATURED PRODUCTS */
        .fpSection{background:#f3f5f7; padding:70px 0}
        .fpGrid{display:grid; grid-template-columns:repeat(3,1fr); gap:28px}
        .fpCard{
          background:#fff; border-radius:18px; overflow:hidden;
          border:1px solid #e7e7e7; box-shadow: 0 10px 25px rgba(0,0,0,.08);
        }
        .fpImgWrap{position:relative; background:#f1f1f1; height:290px; display:block}
        .fpImg{width:100%; height:100%; object-fit:contain; padding:26px}
        .fpSale{position:absolute; top:14px; left:14px; background:#e74b3c; color:#fff; font-weight:900; font-size:12px; padding:6px 12px; border-radius:6px}
        .fpEye{position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:999px; background:#fff; display:grid; place-items:center; color:#444; box-shadow: 0 8px 16px rgba(0,0,0,.12)}
        .fpBody{padding:18px 18px 20px}
        .fpCat{color:#9aa1aa; font-size:12px; font-weight:900; margin-bottom:8px}
        .fpTitle{margin:0 0 14px; font-size:22px; font-weight:900; line-height:1.2; color:#1f2937; min-height:86px}
        .fpPriceRow{display:flex; align-items:flex-end; gap:10px; margin-bottom:16px}
        .fpOld{color:#9aa1aa; text-decoration:line-through; font-weight:900}
        .fpNow{font-weight:900; font-size:22px; color:#111827}
        .fpOff{font-size:12px; font-weight:900; background:#ffe9ea; color:#e74b3c; padding:4px 8px; border-radius:6px}
        .fpBtn{
          width:100%; background:var(--blue2); color:#fff; border:none;
          padding:14px 12px; border-radius:10px;
          font-weight:900; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:10px;
        }

        /* SPECIAL EDITION */
        .specialBannerWrap{background:#fff; padding:70px 0 20px}
        .specialBanner{
          border-radius:22px; overflow:hidden; min-height:430px;
          background-image:url(${specialEditionBg});
          background-size:cover; background-position:center; position:relative;
        }
        .specialBanner::before{content:""; position:absolute; inset:0; background:linear-gradient(90deg, rgba(0,0,0,.68) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.05) 100%)}
        .specialContent{position:absolute; left:60px; top:60px; max-width:520px; color:#fff}
        .smallLabel{font-weight:900; opacity:.9; margin-bottom:12px}
        .specialH{margin:0 0 14px; font-size:52px; font-weight:900}
        .specialP{margin:0 0 20px; line-height:1.7; opacity:.92}
        .specialStrong{margin:0 0 24px; font-weight:900; font-size:20px}

        /* FEATURES */
        .features{background:#f3f5f7; padding:70px 0}
        .featGrid{display:grid; grid-template-columns:repeat(4,1fr); gap:24px; text-align:center}
        .featItem h4{margin:14px 0 10px; font-size:20px; font-weight:900}
        .featItem p{margin:0; color:#555; line-height:1.8; max-width:280px; margin-inline:auto}
        .featIcon{width:48px; height:48px; margin:0 auto; color:#111; opacity:.9}

        /* REVIEWS */
        .reviews{padding:70px 0; background:#fff}
        .reviewGrid{display:grid; grid-template-columns:repeat(4,1fr); gap:28px; margin-top:30px; text-align:center}
        .avatar{width:90px; height:90px; border-radius:999px; object-fit:cover; margin-bottom:16px}
        .rName{font-weight:900; margin:0 0 8px; font-size:18px}
        .stars{display:flex; justify-content:center; gap:4px; margin-bottom:14px}
        .star{font-size:18px; color:#e8b04d; opacity:.35}
        .star.on{opacity:1}
        .rText{margin:0; color:#444; line-height:2; padding:0 14px}

        

        /* FLOATING */
        .floatTop{
          position:fixed; left:22px; bottom:22px;
          width:56px; height:56px; border-radius:999px;
          background:#9aa8ff; display:grid; place-items:center;
          box-shadow:0 12px 22px rgba(0,0,0,.18); cursor:pointer; z-index:999;
        }
        .floatCart{
          position:fixed; right:22px; bottom:22px;
          width:66px; height:66px; border-radius:999px;
          background:#0ea5e9; display:grid; place-items:center;
          box-shadow:0 16px 26px rgba(0,0,0,.18); cursor:pointer; z-index:999;
        }
        .floatCart .cBadge{
          position:absolute; top:-6px; left:-6px;
          width:26px; height:26px; border-radius:999px;
          background:#14b8a6; color:#fff; font-weight:900;
          display:grid; place-items:center; border:3px solid #fff; font-size:12px;
        }

        @media (max-width:1080px){
          .heroH1{font-size:48px}
          .title{font-size:40px}
          .promoGrid{grid-template-columns:1fr}
          .fpGrid{grid-template-columns:repeat(2,1fr)}
          .reviewGrid{grid-template-columns:repeat(2,1fr)}
          .featGrid{grid-template-columns:repeat(2,1fr)}
          .specialContent{left:26px; right:26px; top:26px}
        }
        @media (max-width:720px){
          .menu{display:none}
          .heroText{padding-top: 40px}
          .heroH1{font-size:38px}
          .heroH3{font-size:20px}
          .fpGrid{grid-template-columns:1fr}
          .reviewGrid{grid-template-columns:1fr}
          .footerGrid{grid-template-columns:1fr}
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <img className="heroBgImg" src={heroBg} alt="Hero Background" />
        <div className="heroOverlay" />
        <div className="heroOverlay2" />

        {/* ✅ FIXED HEADER */}
       

        {/* HERO TEXT */}
        <div className="container heroContent">
          <div className="heroText">
            <h1 className="heroH1">Tunturu Tools India</h1>
            <h3 className="heroH3">25% Off On All Products</h3>
            <button className="heroBtn" type="button" onClick={() => (window.location.href = "/store")}>
              SHOP TOOL
            </button>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brandsBox">
        <div className="container">
          <div className="brandsRow">
            <button
              className="brandArrow"
              onClick={() => brandsRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="brandsScroll" ref={brandsRef}>
              {brandLogos.map((b) => (
                <div className="brandLogo" key={b.alt}>
                  <img src={b.src} alt={b.alt} />
                </div>
              ))}
            </div>

            <button
              className="brandArrow"
              onClick={() => brandsRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS (dummy) */}
      <section className="section">
        <div className="container">
          <div className="titleWrap left">
            <h2 className="title">Special offers</h2>
            <div className="underline" />
          </div>

          <div className="promoGrid">
            {offers.map((o) => (
              <div key={o.id} className="promo" style={{ backgroundImage: `url(${o.image})` }}>
                <div className="promoBody">
                  <h3 className="promoH">{o.title}</h3>
                  <p className="promoSub">{o.desc}</p>
                  <button className="promoBtn" onClick={() => (window.location.href = o.href)}>
                    {o.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS (dummy) */}
      <section className="fpSection">
        <div className="container">
          <div className="titleWrap center">
            <h2 className="title">Featured Products</h2>
            <div className="underline" />
          </div>

          <div className="fpGrid">
            {featured.map((p) => (
              <FeaturedCard key={p.id} p={p} />
            ))}
          </div>

          <div className="specialBannerWrap">
            <div className="specialBanner">
              <div className="specialContent">
                <div className="smallLabel">Limited Time Offer</div>
                <h3 className="specialH">Special Edition</h3>
                <p className="specialP">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                  pulvinar dapibus leo.
                </p>
                <p className="specialStrong">Buy This Toolkit At 20% Discount, Use Code OFF20</p>
                <button className="promoBtn" onClick={() => (window.location.href = "/store")}>
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container">
          <div className="featGrid">
            {["Fast Shipping", "Best Quality", "Best Offers", "Secure Payments"].map((t) => (
              <div className="featItem" key={t}>
                <div className="featIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 7v10" />
                  </svg>
                </div>
                <h4>{t}</h4>
                <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews">
        <div className="container">
          <div className="titleWrap center">
            <h2 className="title">Reviews of Our Valued Customers</h2>
            <div className="underline" />
          </div>

          <div className="reviewGrid">
            {[
              { name: "Andrew", img: "https://randomuser.me/api/portraits/men/32.jpg", stars: 5 },
              { name: "Paul", img: "https://randomuser.me/api/portraits/men/44.jpg", stars: 5 },
              { name: "Michale", img: "https://randomuser.me/api/portraits/women/65.jpg", stars: 5 },
              { name: "Lucy", img: "https://randomuser.me/api/portraits/women/68.jpg", stars: 5 },
            ].map((r) => (
              <div key={r.name}>
                <img className="avatar" src={r.img} alt={r.name} />
                <p className="rName">{r.name}</p>
                <Stars count={r.stars} />
                <p className="rText">The product was nice, offering quality tools and good value for money.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FLOATING */}
      
    </div>
  );
}