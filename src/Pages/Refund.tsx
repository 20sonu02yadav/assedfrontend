import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";

export default function RefundReturns() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/refund/`);
        setData(response.data);
      } catch (error) {
        console.error("Error loading refund page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const prevTitle = document.title;
    const prevBodyClass = document.body.className;
    document.title = "Refund & Returns";
    document.body.className = `${prevBodyClass} tunturu-page`.trim();

    return () => {
      document.title = prevTitle;
      document.body.className = prevBodyClass;
    };
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}>Loading...</div>;

  const heroStyle = {
    backgroundImage: `url(${data?.final_hero_image || "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-pavel-danilyuk-6407384.jpg"})`,
  };

  return (
    <div className="rr-page">
      <style>{css}</style>

      {/* HERO */}
      <section className="rr-hero" style={heroStyle}>
        <div className="rr-hero-overlay" />
        <div className="rr-hero-content">
          <h1>{data?.hero_title || "Refund and Returns"}</h1>
        </div>
      </section>

      {/* CONTENT */}
      <main className="rr-main">
        <div className="rr-container">
          <div className="rr-grid">
            {data?.blocks?.map((block: any, index: number) => (
              <div className="rr-block" key={index}>
                <h2>{block.title}</h2>
                {block.subtitle && <p className="rr-sub">{block.subtitle}</p>}
                <ul>
                  {block.content_list?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
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