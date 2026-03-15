import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaArrowUp,
  FaShoppingCart,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCart as getServerCart } from "../services/cartApi";
import { getCartCount as getLocalCartCount } from "../services/cart";
import { getStoredAccessToken } from "../services/api";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function loadCartCount() {
    const token = getStoredAccessToken();

    if (token) {
      try {
        const cart = await getServerCart();
        const totalQty =
          cart?.items?.reduce(
            (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
            0
          ) || 0;

        setCartCount(totalQty);
        return;
      } catch {
        setCartCount(0);
        return;
      }
    }

    setCartCount(getLocalCartCount());
  }

  useEffect(() => {
    loadCartCount();
  }, [location.pathname]);

  useEffect(() => {
    const syncCartCount = () => {
      loadCartCount();
    };

    window.addEventListener("focus", syncCartCount);
    window.addEventListener("storage", syncCartCount);
    window.addEventListener("cart:changed", syncCartCount);

    return () => {
      window.removeEventListener("focus", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener("cart:changed", syncCartCount);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={styles.footer}>
      <style>{`
      @keyframes companyGradient {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
      }
        @media (max-width: 900px) {
          .footerMain {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .footerBottom {
            flex-direction: column !important;
            gap: 10px !important;
            text-align: center;
          }

          .floatingCartBtn {
            width: 58px !important;
            height: 58px !important;
            right: 18px !important;
            bottom: 18px !important;
          }

          .scrollTopBtn {
            width: 50px !important;
            height: 50px !important;
            left: 18px !important;
            bottom: 86px !important;
          }
        }
      `}</style>

      <div className="footerMain" style={styles.footerMain}>
        <div style={styles.footerCol}>
          <img
            src="https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png"
            alt="Tunturu Logo"
            style={styles.logo}
          />
          <p
  style={{
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "10px",
    letterSpacing: "1px",
    background: "linear-gradient(90deg,#00c6ff,#0072ff,#00c6ff)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "companyGradient 4s linear infinite",
  }}
>
  TUNTURU ENGINEERING AID PRIVATE LIMITED
</p>

          <p style={styles.text}>Email: Support@tunturu.co.in</p>
          <p style={styles.text}>Email: Sales@tunturu.co.in</p>
          <p style={styles.text}>Phone: +91 89616 12353</p>

          <div style={styles.socialRow}>
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                style={styles.socialIcon}
                onClick={(e) => e.preventDefault()}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div style={styles.footerCol}>
          <h3 style={styles.heading}>Quick links</h3>
          <div style={styles.underline} />

          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/store">Store</FooterLink>
        </div>

        <div style={styles.footerCol}>
          <h3 style={styles.heading}>Our Policies</h3>
          <div style={styles.underline} />

          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms & Conditions</FooterLink>
          <FooterLink to="/shipping-policy">Shipping Policy</FooterLink>
          <FooterLink to="/refund-returns">Refund & Returns</FooterLink>
          <FooterLink to="/faqs">FAQs</FooterLink>
        </div>
      </div>

      <div className="footerBottom" style={styles.footerBottom}>
        <p style={styles.bottomText}>Copyright © 2026 Tunturu</p>
        <p style={styles.bottomText}>Powered by Tunturu</p>
      </div>

      {showScroll && (
        <button
          className="scrollTopBtn"
          onClick={scrollTop}
          style={styles.scrollBtn}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}

      <button
        className="floatingCartBtn"
        style={styles.floatingCart}
        onClick={() => navigate("/cart")}
        aria-label="Go to cart"
        title="Go to cart"
      >
        <FaShoppingCart />
        <span style={styles.cartBadge}>{cartCount}</span>
      </button>
    </footer>
  );
};

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link to={to} style={styles.footerLink}>
    {children}
  </Link>
);

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: "#000",
    color: "#fff",
    paddingTop: "70px",
    position: "relative",
    marginTop: "auto",
  },

  footerMain: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: "40px",
    padding: "0 20px 50px",
    boxSizing: "border-box",
  },

  footerCol: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
  },

  logo: {
    width: "190px",
    marginBottom: "20px",
  },

  text: {
    margin: 0,
    color: "#fff",
    lineHeight: 1.7,
  },

  socialRow: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  
  socialIcon: {
    background: "#fff",
    color: "#000",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "14px",
  },

  heading: {
    fontSize: "20px",
    marginBottom: "5px",
    marginTop: 0,
  },

  underline: {
    width: "40px",
    height: "3px",
    background: "#1da1f2",
    marginBottom: "15px",
  },

  footerLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s",
    lineHeight: 1.8,
  },

  footerBottom: {
    borderTop: "1px solid #111",
    padding: "25px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  bottomText: {
    margin: 0,
    fontSize: "14px",
    color: "#fff",
  },

  scrollBtn: {
    position: "fixed",
    bottom: "95px",
    left: "25px",
    background: "#6c79ff",
    color: "#000",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
  },

  floatingCart: {
    position: "fixed",
    bottom: "20px",
    right: "25px",
    background: "#0ea5e9",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    border: "none",
    zIndex: 999,
    boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
  },

  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#00c853",
    minWidth: "22px",
    height: "22px",
    padding: "0 5px",
    borderRadius: "50%",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default Footer;