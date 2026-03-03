import React from "react";

const ShippingPolicy: React.FC = () => {
  const styles = {
    container: {
      margin: 0,
      padding: 0,
      fontFamily: '"Segoe UI", sans-serif',
      overflowX: "hidden" as const,
      backgroundColor: "#f4f4f4",
    },

    /* ================= HERO ================= */

    heroWrapper: {
      position: "relative" as const,
      height: "520px",
      width: "100%",
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-artempodrez-5025669.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    nav: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 80px",
      boxSizing: "border-box" as const,
      zIndex: 1000,
      background: "transparent",
    },

    navGroup: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
    },

    link: {
      color: "#fff",
      fontSize: "13px",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      textDecoration: "none",
      letterSpacing: "0.5px",
    },

    activeLink: {
      color: "#00AEEF",
    },

    logo: {
      fontSize: "28px",
      fontWeight: 900,
      color: "#00AEEF",
      textDecoration: "none",
    },

    heroTitle: {
      color: "#fff",
      fontSize: "70px",
      fontWeight: 700,
      letterSpacing: "2px",
      margin: 0,
    },

    /* ================= CONTENT ================= */

    contentWrapper: {
      backgroundColor: "#f4f4f4",
      padding: "80px 12%",
      lineHeight: "1.8",
      color: "#222",
    },

    heading: {
      fontSize: "32px",
      marginBottom: "20px",
      fontWeight: 700,
    },

    paragraph: {
      fontSize: "16px",
      marginBottom: "25px",
      color: "#444",
    },

    list: {
      paddingLeft: "25px",
      marginBottom: "25px",
      color: "#444",
    },

    listItem: {
      marginBottom: "10px",
    },

    /* ================= FOOTER ================= */

    footer: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "80px 8% 40px",
      marginTop: "80px",
    },

    footerGrid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr 1fr",
      gap: "100px",
    },

    footerHeading: {
      fontSize: "22px",
      marginBottom: "15px",
      borderBottom: "2px solid #00AEEF",
      display: "inline-block",
      paddingBottom: "6px",
    },

    footerText: {
      marginBottom: "12px",
      color: "#ccc",
      fontSize: "14px",
    },

    bottomBar: {
      borderTop: "1px solid #111",
      marginTop: "60px",
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#aaa",
    },

    floatingCart: {
      position: "fixed" as const,
      right: "30px",
      bottom: "40px",
      width: "65px",
      height: "65px",
      backgroundColor: "#1EA7FD",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "26px",
      color: "#fff",
      cursor: "pointer",
    },

    scrollTop: {
      position: "fixed" as const,
      left: "30px",
      bottom: "40px",
      width: "60px",
      height: "60px",
      backgroundColor: "#6C7BFF",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
      color: "#000",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.heroWrapper}>
        <nav style={styles.nav}>
          <a href="/" style={styles.logo}>TUNTURU®</a>

          <div style={styles.navGroup}>
            <a href="/" style={styles.link}>Home</a>
            <a href="/store" style={styles.link}>Store</a>
            <a href="/categories" style={styles.link}>Categories</a>
            <a href="/franchise" style={styles.link}>Franchise</a>
            <a href="/services" style={styles.link}>Services</a>
            <a href="/blog" style={styles.link}>Blog</a>
          </div>

          <div style={styles.navGroup}>
            <a href="/about" style={styles.link}>About</a>
            <a href="/contact" style={styles.link}>Contact</a>
            <span style={styles.link}>₹0.00</span>
            <span style={{ color: "#fff" }}>🛒</span>
            <span style={{ color: "#fff" }}>👤</span>
          </div>
        </nav>

        <h1 style={styles.heroTitle}>SHIPPING POLICY</h1>
      </div>

      {/* CONTENT */}
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading}>Processing Time</h2>
        <p style={styles.paragraph}>
          Orders are processed within 1–3 business days after payment confirmation.
        </p>

        <h2 style={styles.heading}>Delivery Time</h2>
        <p style={styles.paragraph}>Estimated delivery:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Metro Cities: 3–5 business days</li>
          <li style={styles.listItem}>Other Locations: 5–10 business days</li>
        </ul>
        <p style={styles.paragraph}>
          Delivery times may vary due to external factors.
        </p>

        <h2 style={styles.heading}>Shipping Charges</h2>
        <p style={styles.paragraph}>
          Shipping charges are calculated at checkout based on location and order size.
        </p>

        <h2 style={styles.heading}>Order Tracking</h2>
        <p style={styles.paragraph}>
          Tracking details will be shared via email/SMS once the order is dispatched.
        </p>

        <h2 style={styles.heading}>Delays</h2>
        <p style={styles.paragraph}>
          We are not responsible for delays caused by courier companies or unforeseen circumstances.
        </p>
      </div>
{/* ================= FOOTER ================= */}

<footer style={{
  backgroundColor: "#000",
  color: "#fff",
  padding: "80px 8% 40px",
  position: "relative"
}}>

  {/* TOP GRID */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: "100px"
  }}>

    {/* COLUMN 1 */}
    <div>
      <h2 style={{
        color: "#00AEEF",
        fontSize: "36px",
        fontWeight: 900,
        marginBottom: "30px"
      }}>
        TUNTURU®
      </h2>

      <p style={{ marginBottom: "10px", color: "#ccc" }}>
        Email: Support@tunturu.co.in
      </p>
      <p style={{ marginBottom: "10px", color: "#ccc" }}>
        Email: Sales@tunturu.co.in
      </p>
      <p style={{ marginBottom: "25px", color: "#ccc" }}>
        Phone: +91 89616 12353
      </p>

      {/* Social Icons */}
      <div style={{ display: "flex", gap: "15px" }}>
        {["f", "t", "▶"].map((icon, i) => (
          <div key={i} style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            {icon}
          </div>
        ))}
      </div>
    </div>

    {/* COLUMN 2 */}
    <div>
      <h3 style={{
        fontSize: "22px",
        marginBottom: "15px",
        borderBottom: "2px solid #00AEEF",
        display: "inline-block",
        paddingBottom: "6px"
      }}>
        Quick links
      </h3>

      <div style={{ marginTop: "20px" }}>
        {["Home", "About", "Blog", "Contact Us"].map((link, i) => (
          <p key={i} style={{
            marginBottom: "14px",
            color: link === "Blog" ? "#00AEEF" : "#ccc",
            cursor: "pointer"
          }}>
            {link}
          </p>
        ))}
      </div>
    </div>

    {/* COLUMN 3 */}
    <div>
      <h3 style={{
        fontSize: "22px",
        marginBottom: "15px",
        borderBottom: "2px solid #00AEEF",
        display: "inline-block",
        paddingBottom: "6px"
      }}>
        Our Polices
      </h3>

      <div style={{ marginTop: "20px" }}>
        {[
          "Privacy Policy",
          "Terms & Conditions",
          "Shipping Policy",
          "Refund & Returns",
          "FAQs"
        ].map((link, i) => (
          <p key={i} style={{
            marginBottom: "14px",
            color: "#ccc",
            cursor: "pointer"
          }}>
            {link}
          </p>
        ))}
      </div>
    </div>

  </div>

  {/* Divider Line */}
  <div style={{
    borderTop: "1px solid #111",
    marginTop: "70px",
    paddingTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    color: "#aaa",
    fontSize: "14px"
  }}>
    <span>Copyright © 2026 Tunturu</span>
    <span>Powered by Tunturu</span>
  </div>

  {/* Scroll To Top Button */}
  <div style={{
    position: "fixed",
    left: "30px",
    bottom: "40px",
    width: "60px",
    height: "60px",
    backgroundColor: "#6C7BFF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    color: "#000",
    cursor: "pointer"
  }}>
    ↑
  </div>

  {/* Floating Cart */}
  <div style={{
    position: "fixed",
    right: "30px",
    bottom: "40px",
    width: "70px",
    height: "70px",
    backgroundColor: "#1EA7FD",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    color: "#fff",
    cursor: "pointer"
  }}>
    🛒
    <div style={{
      position: "absolute",
      top: "5px",
      left: "5px",
      backgroundColor: "#2ECC71",
      color: "#fff",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      0
    </div>
  </div>

</footer>

      {/* Floating Buttons */}
      <div style={styles.scrollTop}>↑</div>
      <div style={styles.floatingCart}>🛒</div>
    </div>
  );
};

export default ShippingPolicy;