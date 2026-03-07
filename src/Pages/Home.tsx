import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartApi";
import { fetchProducts, type ProductListItem } from "../services/storeApi";

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

type QuickViewState = {
  open: boolean;
  product: ProductListItem | null;
  qty: number;
};

export default function Home() {
  const navigate = useNavigate();

  const heroBg =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-nishantaneja-12105083.jpg";

  const promo1 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-theshuttervision-8811529.jpg";
  const promo2 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-osman-sran-95404891-22798290.jpg";
  const promo3 =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-matreding-6835302.jpg";

  const specialEditionBg =
    "/image.png";

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
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.16-PM.jpeg", alt: "PHILIPS ACCESSORIES" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.20-PM.jpeg", alt: "PHILIPS BATTERIES" },
      { src: "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-5.39.23-PM.jpeg", alt: "PHILIPS FLASHLIGHT" },
    ],
    []
  );

  const offers: Offer[] = useMemo(
    () => [
      {
        id: "o1",
        title: "20% Off",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
        image: promo1,
        href: "/store",
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

  const brandsRef = useRef<HTMLDivElement | null>(null);

  const [featured, setFeatured] = useState<ProductListItem[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [quickView, setQuickView] = useState<QuickViewState>({
    open: false,
    product: null,
    qty: 1,
  });

  useEffect(() => {
    async function loadFeatured() {
      setFeaturedLoading(true);
      try {
        const data = await fetchProducts();
        const topSix = data.slice(0, 6);
        setFeatured(topSix);

        const nextQty: Record<number, number> = {};
        topSix.forEach((p) => {
          nextQty[p.id] = 1;
        });
        setQtyMap(nextQty);
      } catch {
        setFeatured([]);
      } finally {
        setFeaturedLoading(false);
      }
    }

    loadFeatured();
  }, []);

  useEffect(() => {
    if (!quickView.open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [quickView.open]);

  function setQty(productId: number, qty: number) {
    setQtyMap((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  }

  async function handleAddToCart(productId: number, qty: number) {
    try {
      setBusyId(productId);
      await addToCart(productId, qty);
      alert("Added to cart ✅");
    } catch {
      alert("Please login to add to cart.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

        :root{
          --blue:#2ea3f2;
          --blue2:#1b76c4;
        }

        *{box-sizing:border-box}
        body{
          margin:0;
          font-family:Lato, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          background:#f3f5f7;
        }
        a{text-decoration:none; color:inherit}
        .container{
        width:100%;
        max-width:1600px;
        margin:auto;
        padding-left:40px;
        padding-right:40px;
      }

        .hero{
          position:relative;
          height:100vh;
          min-height:720px;
          overflow:hidden;
          background:#061b27;
        }
        .heroBgImg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
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

        .heroContent{
        position:relative;
        z-index:2;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
      }
        .heroText{
          color:#fff;
          max-width:760px;
          margin:auto;
          text-align:center;
        }
        .heroH1{font-size:64px; margin:0 0 12px; font-weight:900; line-height:1.05}
        .heroH3{margin:0 0 28px; font-size:26px; font-weight:800; opacity:.95}
        .heroBtn{
          background:#fff; color:#111; border:none;
          padding:12px 22px; border-radius:999px;
          font-weight:900; cursor:pointer;
          box-shadow:0 10px 20px rgba(0,0,0,.18);
        }

        .section{padding:60px 0}
        .titleWrap{display:flex; flex-direction:column; gap:10px; margin-bottom:34px}
        .titleWrap.center{align-items:center}
        .titleWrap.left{align-items:flex-start}
        .title{margin:0; font-size:48px; font-weight:900; color:#0b0b0b}
        .underline{width:180px; height:3px; background:#8aa0ff}

        .brandsBox{
          width:100%;
          background:#fff;
          padding:60px 0;
        }
        .brandsRow{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
        }
        .brandsScroll{
          overflow-x:auto;
          overflow-y:hidden;
          display:flex;
          align-items:center;
          justify-content:flex-start;
          gap:80px;
          padding:20px 0;
          height:160px;
          flex:1;
          scroll-behavior:smooth;
        }
        .brandsScroll::-webkit-scrollbar{height:0}
        .brandLogo{
          min-width:240px;
          height:160px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .brandLogo img{
          max-height:150px;
          max-width:220px;
          object-fit:contain;
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
          color:#fff;
          flex:0 0 auto;
        }
        .brandArrow:hover{
          transform:translateY(-4px);
          box-shadow:0 18px 35px rgba(0,0,0,.25);
        }

        .promoGrid{display:grid; grid-template-columns:repeat(3,1fr); gap:28px}
        .promo{
          border-radius:22px; overflow:hidden; position:relative;
          min-height:420px; background-size:cover; background-position:center;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
        }
        .promo::before{
          content:"";
          position:absolute;
          inset:0;
          background:rgba(0,0,0,.55);
        }
        .promoBody{
          position:absolute;
          left:36px;
          right:36px;
          bottom:36px;
          color:#fff;
        }
        .promoH{margin:0 0 10px; font-weight:900; font-size:34px}
        .promoSub{margin:0 0 18px; opacity:.92; line-height:1.7; font-size:16px}
        .promoBtn{
          background:#fff; color:#111; border:none;
          padding:12px 22px; border-radius:999px;
          font-weight:900; cursor:pointer;
        }

        .fpSection{background:#f3f5f7; padding:70px 0}
        .fpGrid{display:grid; grid-template-columns:repeat(3,1fr); gap:28px}
        .fpCard{
          background:#fff;
          border-radius:24px;
          overflow:hidden;
          border:1px solid #e7e7e7;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
          position:relative;
        }
        .fpImgWrap{
          position:relative;
          background:#f7f7f7;
          height:320px;
          display:block;
          cursor:pointer;
        }
        .fpImg{
          width:100%;
          height:100%;
          object-fit:contain;
          padding:20px;
        }
        .fpSale{
          position:absolute;
          top:14px;
          left:14px;
          background:#e74b3c;
          color:#fff;
          font-weight:900;
          font-size:12px;
          padding:8px 14px;
          border-radius:8px;
        }
        .fpEye{
          position:absolute;
          top:14px;
          right:14px;
          width:58px;
          height:58px;
          border-radius:999px;
          background:#fff;
          display:grid;
          place-items:center;
          color:#444;
          box-shadow:0 8px 16px rgba(0,0,0,.12);
          border:none;
          cursor:pointer;
        }
        .fpBody{padding:18px 18px 20px}
        .fpCat{
          color:#9aa1aa;
          font-size:12px;
          font-weight:900;
          margin-bottom:10px;
          text-transform:uppercase;
        }
        .fpTitle{
          margin:0 0 14px;
          font-size:22px;
          font-weight:900;
          line-height:1.25;
          color:#1f2937;
          min-height:84px;
          cursor:pointer;
        }
        .fpPriceRow{
          display:flex;
          align-items:flex-end;
          gap:10px;
          margin-bottom:8px;
          flex-wrap:wrap;
        }
        .fpOld{
          color:#9aa1aa;
          text-decoration:line-through;
          font-weight:900;
          font-size:16px;
        }
        .fpNow{
          font-weight:900;
          font-size:22px;
          color:#111827;
        }
        .fpOff{
          font-size:12px;
          font-weight:900;
          background:#ffe9ea;
          color:#e74b3c;
          padding:4px 8px;
          border-radius:6px;
        }
        .fpGst{
          font-size:14px;
          font-weight:800;
          color:#4b5563;
          margin-bottom:16px;
        }
        .fpBtn{
          width:100%;
          background:linear-gradient(90deg,#4f86ff,#1d4ed8);
          color:#fff;
          border:none;
          padding:16px 12px;
          border-radius:14px;
          font-weight:900;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
        }
        .fpBtn:disabled{opacity:.7; cursor:not-allowed}

        .specialBannerWrap{
          width:100%;
          padding:70px 40px;
        }
        .specialBanner{
          border-radius:28px;
          overflow:hidden;
          min-height:430px;
          background-image:url(${specialEditionBg});
          background-size:cover;
          background-position:center;
          position:relative;
        }
        .specialBanner::before{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(90deg, rgba(0,0,0,.68) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.05) 100%);
        }
        .specialContent{
          position:absolute;
          left:60px;
          top:60px;
          max-width:520px;
          color:#fff;
          z-index:2;
        }
        .smallLabel{font-weight:900; opacity:.9; margin-bottom:12px; font-size:18px}
        .specialH{margin:0 0 14px; font-size:52px; font-weight:900}
        .specialP{margin:0 0 20px; line-height:1.8; opacity:.92; font-size:17px}
        .specialStrong{margin:0 0 24px; font-weight:900; font-size:20px}

        .features{background:#f3f5f7; padding:70px 0}
        .featGrid{display:grid; grid-template-columns:repeat(4,1fr); gap:24px; text-align:center}
        .featItem h4{margin:14px 0 10px; font-size:20px; font-weight:900}
        .featItem p{margin:0; color:#555; line-height:1.8; max-width:280px; margin-inline:auto}
        .featIcon{width:48px; height:48px; margin:0 auto; color:#111; opacity:.9}

        .reviews{padding:70px 0; background:#fff}
        .reviewGrid{display:grid; grid-template-columns:repeat(4,1fr); gap:28px; margin-top:30px; text-align:center}
        .avatar{width:90px; height:90px; border-radius:999px; object-fit:cover; margin-bottom:16px}
        .rName{font-weight:900; margin:0 0 8px; font-size:18px}
        .stars{display:flex; justify-content:center; gap:4px; margin-bottom:14px}
        .star{font-size:18px; color:#e8b04d; opacity:.35}
        .star.on{opacity:1}
        .rText{margin:0; color:#444; line-height:2; padding:0 14px}

        .floatTop{
          position:fixed; left:22px; bottom:22px;
          width:56px; height:56px; border-radius:999px;
          background:#9aa8ff; display:grid; place-items:center;
          box-shadow:0 12px 22px rgba(0,0,0,.18); cursor:pointer; z-index:999;
          border:none;
        }

        /* QUICK VIEW */
        .qvOverlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.55);
          z-index:9999;
          display:grid;
          place-items:center;
          padding:20px;
        }
        .qvCard{
          width:min(1380px, 96vw);
          background:#fff;
          position:relative;
          padding:28px;
          box-sizing:border-box;
        }
        .qvClose{
          position:absolute;
          top:18px;
          right:18px;
          border:none;
          background:transparent;
          cursor:pointer;
          font-size:34px;
          line-height:1;
          color:#1f2937;
        }
        .qvGrid{
          display:grid;
          grid-template-columns:0.9fr 1.1fr;
          gap:28px;
          align-items:start;
        }
        .qvMainImage{
          width:100%;
          height:560px;
          object-fit:contain;
          background:#fff;
        }
        .qvThumbRow{
          margin-top:18px;
          display:flex;
          justify-content:center;
        }
        .qvThumb{
          width:110px;
          height:90px;
          object-fit:contain;
          background:#fff;
        }
        .qvPriceRow{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
          margin-top:10px;
        }
        .qvOld{
          font-size:22px;
          color:#9ca3af;
          text-decoration:line-through;
          font-weight:900;
        }
        .qvNow{
          font-size:30px;
          font-weight:900;
          color:#1f2937;
        }
        .qvActionRow{
          display:flex;
          align-items:center;
          gap:16px;
          margin-top:18px;
          flex-wrap:wrap;
        }
        .qvQty{
          display:inline-flex;
          align-items:center;
          border:1px solid #d1d5db;
          height:42px;
        }
        .qvQtyBtn{
          width:46px;
          height:40px;
          border:none;
          background:#fff;
          cursor:pointer;
          font-size:24px;
        }
        .qvQtyValue{
          min-width:46px;
          text-align:center;
          font-size:18px;
        }
        .qvAdd{
          min-width:390px;
          height:54px;
          border:none;
          border-radius:999px;
          background:#0b86d7;
          color:#fff;
          font-weight:900;
          font-size:18px;
          cursor:pointer;
          padding:0 24px;
        }
        .qvDivider{
          height:1px;
          background:#e5e7eb;
          margin-top:18px;
          margin-bottom:16px;
        }
        .qvMeta{
          display:flex;
          gap:28px;
          flex-wrap:wrap;
          font-size:16px;
          color:#1f2937;
        }
        .qvShare{
          display:flex;
          align-items:center;
          gap:16px;
          margin-top:26px;
          font-size:16px;
          color:#374151;
        }
        .qvShareIcon{
          font-weight:800;
          font-size:18px;
        }

        /* ===== RESPONSIVE STYLES ADDED ===== */
        @media (max-width: 1280px) {
          .heroH1 { font-size: 56px; }
          .title { font-size: 42px; }
          .specialH { font-size: 44px; }
        }

        @media (max-width: 1080px) {
          .heroH1 { font-size: 48px; }
          .hero { min-height: 600px; }
          .heroText { max-width: 600px; }
          
          .title { font-size: 40px; }
          
          .promoGrid { grid-template-columns: repeat(2, 1fr); }
          .promo { min-height: 380px; }
          
          .fpGrid { grid-template-columns: repeat(2, 1fr); }
          
          .reviewGrid { grid-template-columns: repeat(2, 1fr); }
          
          .featGrid { grid-template-columns: repeat(2, 1fr); }
          
          .specialContent { left: 40px; top: 40px; max-width: 450px; }
          .specialH { font-size: 40px; }
          
          .qvGrid { grid-template-columns: 1fr; }
          .qvMainImage { height: 400px; }
          .qvAdd { min-width: 250px; }
          
          .brandsScroll { gap: 40px; }
          .brandLogo { min-width: 180px; }
        }

        @media (max-width: 768px) {
          .hero { min-height: 500px; }
          .heroText { padding-top: 30px; }
          .heroH1 { font-size: 38px; }
          .heroH3 { font-size: 20px; margin-bottom: 20px; }
          
          .title { font-size: 34px; }
          .section { padding: 40px 0; }
          
          .promoGrid { grid-template-columns: 1fr; }
          .promo { min-height: 320px; }
          .promoBody { left: 24px; right: 24px; bottom: 24px; }
          .promoH { font-size: 28px; }
          .promoSub { font-size: 15px; }
          
          .fpSection { padding: 40px 0; }
          .fpGrid { gap: 20px; }
          .fpImgWrap { height: 260px; }
          .fpTitle { font-size: 18px; min-height: auto; }
          .fpNow { font-size: 18px; }
          
          .brandsBox { padding: 30px 0; }
          .brandsRow { gap: 10px; }
          .brandsScroll { gap: 20px; height: 120px; }
          .brandLogo { min-width: 140px; height: 120px; }
          .brandLogo img { max-height: 100px; max-width: 140px; }
          .brandArrow { width: 44px; height: 44px; }
          
          .specialBannerWrap { padding: 40px 0 10px; }
          .specialBanner { min-height: 350px; }
          .specialContent { left: 24px; top: 24px; right: 24px; max-width: 100%; }
          .specialH { font-size: 32px; }
          .specialP { font-size: 15px; }
          .specialStrong { font-size: 16px; }
          
          .features { padding: 40px 0; }
          .featGrid { gap: 16px; }
          .featItem h4 { font-size: 18px; }
          .featItem p { font-size: 14px; }
          
          .reviews { padding: 40px 0; }
          .reviewGrid { gap: 20px; }
          .avatar { width: 70px; height: 70px; }
          .rName { font-size: 16px; }
          .rText { font-size: 14px; line-height: 1.6; }
          
          .floatTop { width: 48px; height: 48px; left: 16px; bottom: 16px; }
          
          .qvCard { padding: 20px; }
          .qvMainImage { height: 300px; }
          .qvClose { font-size: 28px; top: 12px; right: 12px; }
          .qvNow { font-size: 24px; }
          .qvOld { font-size: 18px; }
          .qvQtyBtn { width: 40px; height: 36px; font-size: 20px; }
          .qvAdd { min-width: 200px; height: 48px; font-size: 16px; }
          .qvMeta { gap: 16px; font-size: 14px; }
        }

        @media (max-width: 480px) {
          .hero { min-height: 450px; }
          .heroH1 { font-size: 30px; }
          .heroH3 { font-size: 18px; }
          .heroBtn { padding: 10px 18px; font-size: 14px; }
          
          .title { font-size: 28px; }
          .underline { width: 120px; }
          
          .promo { min-height: 280px; }
          .promoBody { left: 18px; right: 18px; bottom: 18px; }
          .promoH { font-size: 24px; }
          .promoSub { font-size: 14px; margin-bottom: 12px; }
          .promoBtn { padding: 10px 18px; font-size: 13px; }
          
          .fpGrid { grid-template-columns: 1fr; }
          .fpImgWrap { height: 240px; }
          .fpEye { width: 48px; height: 48px; }
          .fpSale { font-size: 11px; padding: 6px 12px; }
          .fpCat { font-size: 11px; }
          .fpTitle { font-size: 16px; }
          .fpPriceRow { gap: 6px; }
          .fpOld { font-size: 14px; }
          .fpNow { font-size: 16px; }
          .fpOff { font-size: 11px; padding: 3px 6px; }
          .fpGst { font-size: 12px; }
          .fpBtn { padding: 14px 10px; font-size: 14px; }
          
          .brandsBox { padding: 20px 0; }
          .brandsScroll { gap: 15px; height: 100px; }
          .brandLogo { min-width: 120px; height: 100px; }
          .brandLogo img { max-height: 80px; max-width: 120px; }
          .brandArrow { width: 38px; height: 38px; }
          
          .specialBanner { min-height: 300px; }
          .specialContent { left: 18px; top: 18px; }
          .smallLabel { font-size: 14px; }
          .specialH { font-size: 26px; margin-bottom: 8px; }
          .specialP { font-size: 13px; line-height: 1.5; margin-bottom: 12px; }
          .specialStrong { font-size: 14px; margin-bottom: 16px; }
          
          .featGrid { grid-template-columns: 1fr; gap: 20px; }
          .featIcon { width: 40px; height: 40px; }
          .featItem h4 { font-size: 16px; margin: 8px 0 4px; }
          .featItem p { font-size: 13px; max-width: 100%; }
          
          .reviewGrid { grid-template-columns: 1fr; }
          .avatar { width: 60px; height: 60px; }
          .star { font-size: 16px; }
          .rText { font-size: 13px; }
          
          .qvCard { padding: 16px; }
          .qvMainImage { height: 220px; }
          .qvPriceRow { gap: 6px; }
          .qvNow { font-size: 22px; }
          .qvOld { font-size: 16px; }
          .qvActionRow { gap: 10px; }
          .qvQty { height: 38px; }
          .qvQtyBtn { width: 36px; height: 36px; font-size: 18px; }
          .qvQtyValue { min-width: 36px; font-size: 16px; }
          .qvAdd { min-width: 100%; height: 44px; font-size: 15px; padding: 0 16px; }
          .qvMeta { gap: 10px; font-size: 12px; }
          .qvShare { gap: 10px; font-size: 14px; margin-top: 16px; }
          .qvShareIcon { font-size: 16px; }
          
          .floatTop { width: 42px; height: 42px; left: 12px; bottom: 12px; }
        }

        /* Fix for very small devices */
        @media (max-width: 360px) {
          .heroH1 { font-size: 26px; }
          .heroH3 { font-size: 16px; }
          
          .title { font-size: 24px; }
          
          .brandLogo { min-width: 100px; }
          .brandLogo img { max-width: 90px; }
          
          .promoH { font-size: 22px; }
        }

        @media (max-width:768px){

        .hero{
          height:420px;
          min-height:420px;
        }

        }

        @media (max-width:480px){

        .hero{
          height:360px;
          min-height:360px;
        }


        }

        @media (max-width:768px){

      .heroH1{
        font-size:36px;
      }

      .heroH3{
        font-size:18px;
      }

      .heroBtn{
        margin-top:10px;
      }

      }

        /* Landscape mode fixes */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero { min-height: 400px; }
          .heroText { padding-top: 20px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <img className="heroBgImg" src={heroBg} alt="Hero Background" />
        <div className="heroOverlay" />
        <div className="heroOverlay2" />

        <div className="container heroContent">
          <div className="heroText">
            <h1 className="heroH1">Tunturu Tools India</h1>
            <h3 className="heroH3">25% Off On All Products</h3>
            <button className="heroBtn" type="button" onClick={() => navigate("/store")}>
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

      {/* SPECIAL OFFERS */}
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
                  <button className="promoBtn" onClick={() => navigate(o.href)}>
                    {o.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="fpSection">
        <div className="container">
          <div className="titleWrap center">
            <h2 className="title">Featured Products</h2>
            <div className="underline" />
          </div>

          {featuredLoading ? (
            <div style={{ textAlign: "center", padding: "30px 0", fontWeight: 900 }}>
              Loading products...
            </div>
          ) : (
            <div className="fpGrid">
              {featured.map((p) => {
                const qty = qtyMap[p.id] || 1;

                return (
                  <article className="fpCard" key={p.id}>
                    <a
                      className="fpImgWrap"
                      href={`/product/${p.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      <img
                        className="fpImg"
                        src={
                          p.image ||
                          "https://dummyimage.com/500x420/f3f4f6/111827&text=No+Image"
                        }
                        alt={p.title}
                        loading="lazy"
                      />
                      <span className="fpSale">{p.is_sale ? "SALE" : "NEW"}</span>
                    </a>

                    <button
                      className="fpEye"
                      aria-label="Quick view"
                      title="Quick view"
                      onClick={() =>
                        setQuickView({
                          open: true,
                          product: p,
                          qty: qtyMap[p.id] || 1,
                        })
                      }
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    </button>

                    <div className="fpBody">
                      <div className="fpCat">
                        {p.short_category_label || p.category_name || "UNCATEGORIZED"}
                      </div>

                      <h3
                        className="fpTitle"
                        title={p.title}
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        {p.title.toUpperCase()}
                      </h3>

                      <div className="fpPriceRow">
                        {Number(p.mrp) > Number(p.sale_price) ? (
                          <span className="fpOld">{inr(Number(p.mrp))}</span>
                        ) : null}
                        <span className="fpNow">{inr(Number(p.sale_price))}</span>
                        {p.discount_percent ? (
                          <span className="fpOff">-{p.discount_percent}%</span>
                        ) : null}
                      </div>

                      <div className="fpGst">
                        GST ({p.gst_percent}%) {inr(Number(p.gst_amount || 0))}
                      </div>

                      <button
                        className="fpBtn"
                        type="button"
                        disabled={busyId === p.id}
                        onClick={() => handleAddToCart(p.id, qty)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 10V8a6 6 0 0112 0v2" />
                          <rect x="5" y="10" width="14" height="12" rx="2" strokeWidth="2" />
                        </svg>
                        {busyId === p.id ? "ADDING..." : "ADD TO CART"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="specialBannerWrap">
            <div className="specialBanner">
              <div className="specialContent">
                <div className="smallLabel">Limited Time Offer</div>
                <h3 className="specialH">Special Edition</h3>
                <p className="specialP">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                  pulvinar dapibus leo.
                </p>
                <p className="specialStrong">
                  Buy This Toolkit At 20% Discount, Use Code OFF20
                </p>
                <button className="promoBtn" onClick={() => navigate("/store")}>
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
                <p className="rText">
                  The product was nice, offering quality tools and good value for money.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickView.open && quickView.product && (
        <div
          className="qvOverlay"
          onClick={() => setQuickView({ open: false, product: null, qty: 1 })}
        >
          <div className="qvCard" onClick={(e) => e.stopPropagation()}>
            <button
              className="qvClose"
              onClick={() => setQuickView({ open: false, product: null, qty: 1 })}
            >
              ✕
            </button>

            <div className="qvGrid">
              <div>
                <img
                  className="qvMainImage"
                  src={
                    quickView.product.image ||
                    "https://dummyimage.com/700x520/f3f4f6/111827&text=No+Image"
                  }
                  alt={quickView.product.title}
                />

                <div className="qvThumbRow">
                  <img
                    className="qvThumb"
                    src={
                      quickView.product.image ||
                      "https://dummyimage.com/120x90/f3f4f6/111827&text=No+Image"
                    }
                    alt="thumb"
                  />
                </div>
              </div>

              <div>
                <div className="qvPriceRow">
                  {Number(quickView.product.mrp) > Number(quickView.product.sale_price) ? (
                    <span className="qvOld">{inr(Number(quickView.product.mrp))}</span>
                  ) : null}
                  <span className="qvNow">{inr(Number(quickView.product.sale_price))}</span>
                </div>

                <div className="qvActionRow">
                  <div className="qvQty">
                    <button
                      className="qvQtyBtn"
                      onClick={() =>
                        setQuickView((prev) => ({
                          ...prev,
                          qty: Math.max(1, prev.qty - 1),
                        }))
                      }
                    >
                      -
                    </button>

                    <div className="qvQtyValue">{quickView.qty}</div>

                    <button
                      className="qvQtyBtn"
                      onClick={() =>
                        setQuickView((prev) => ({
                          ...prev,
                          qty: prev.qty + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="qvAdd"
                    onClick={() => handleAddToCart(quickView.product!.id, quickView.qty)}
                  >
                    Add To Cart
                  </button>
                </div>

                <div className="qvDivider" />

                <div className="qvMeta">
                  <span>SKU: {quickView.product.sku || "-"}</span>
                  <span>Category: {quickView.product.category_name || "-"}</span>
                  <span>Brand: {quickView.product.brand || "-"}</span>
                </div>

                <div className="qvShare">
                  <span>Share:</span>
                  <span className="qvShareIcon">f</span>
                  <span className="qvShareIcon">𝕏</span>
                  <span className="qvShareIcon">p</span>
                  <span className="qvShareIcon">in</span>
                  <span className="qvShareIcon">✈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOAT TOP */}
      
    </div>
  );
}