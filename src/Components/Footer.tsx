import { Link, useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaArrowUp,
  FaShoppingCart,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();

  /* ✅ AUTO SCROLL TO TOP ON ROUTE CHANGE */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  /* ✅ SHOW SCROLL BUTTON */
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#000",
        color: "#fff",
        paddingTop: "70px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px 50px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <img
            src="https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png"
            alt="Tunturu Logo"
            style={{ width: "190px", marginBottom: "20px" }}
          />

          <p>Email: Support@tunturu.co.in</p>
          <p>Email: Sales@tunturu.co.in</p>
          <p>Phone: +91 89616 12353</p>

          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  background: "#fff",
                  color: "#000",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>
            Quick links
          </h3>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "#1da1f2",
              marginBottom: "15px",
            }}
          ></div>

          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/store">Store</FooterLink>
        </div>

        {/* RIGHT */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>
            Our Policies
          </h3>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "#1da1f2",
              marginBottom: "15px",
            }}
          ></div>

          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms & Conditions</FooterLink>
          <FooterLink to="/shipping-policy">Shipping Policy</FooterLink>
          <FooterLink to="/refund-returns">Refund & Returns</FooterLink>
          <FooterLink to="/faqs">FAQs</FooterLink>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          borderTop: "1px solid #111",
          padding: "25px 20px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        <p>Copyright © 2026 Tunturu</p>
        <p>Powered by Tunturu</p>
      </div>

      {/* SCROLL BUTTON */}
      {showScroll && (
        <button
          onClick={scrollTop}
          style={{
            position: "fixed",
            bottom: "90px",
            left: "25px",
            background: "#6c79ff",
            color: "#000",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <FaArrowUp />
        </button>
      )}

      {/* FLOATING CART */}
      <div
        style={{
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
        }}
      >
        <FaShoppingCart />
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "#00c853",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          0
        </span>
      </div>
    </footer>
  );
};

/* ✅ Reusable Footer Link */
const FooterLink = ({ to, children }: any) => (
  <Link
    to={to}
    style={{
      color: "#fff",
      textDecoration: "none",
      transition: "0.3s",
    }}
  >
    {children}
  </Link>
);

export default Footer;