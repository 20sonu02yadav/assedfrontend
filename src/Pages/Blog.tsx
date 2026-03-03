import React from "react";

const BlogPage: React.FC = () => {
  const styles = {
    container: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: "#fff",
      overflowX: "hidden" as const,
    },

    /* ================= HERO WRAPPER ================= */
    heroWrapper: {
      position: "relative" as const,
      height: "650px",
      width: "100%",
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    /* ================= HEADER ================= */
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 80px",
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box" as const,
      background: "transparent", // IMPORTANT (no extra strip)
    },

    logo: {
      fontSize: "28px",
      fontWeight: "900",
      color: "#00AEEF",
      letterSpacing: "-1.5px",
      textDecoration: "none",
      cursor: "pointer",
      fontFamily: "Arial Black, sans-serif",
    },

    navLinksGroup: {
      display: "flex",
      alignItems: "center",
      gap: "30px",
    },

    link: {
      fontSize: "13px",
      fontWeight: "700",
      textTransform: "uppercase" as const,
      color: "#FFFFFF",
      textDecoration: "none",
      cursor: "pointer",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
    },

    activeLink: {
      color: "#00AEEF",
    },

    heroTitle: {
      fontSize: "85px",
      color: "white",
      fontWeight: "bold",
      margin: 0,
    },

    /* ================= BLOG SECTION ================= */

    contentSection: {
      padding: "80px 10%",
      textAlign: "center" as const,
    },

    sectionTitle: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#111",
    },

    underline: {
      width: "60px",
      height: "2px",
      backgroundColor: "#00AEEF",
      margin: "0 auto 60px",
    },

    blogGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "60px 40px",
      textAlign: "left" as const,
    },

    blogCard: {
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer",
    },

    blogImage: {
      width: "100%",
      height: "320px",
      objectFit: "cover" as const,
      borderRadius: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },

    blogTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      lineHeight: "1.2",
      color: "#222",
    },

    blogText: {
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.6",
    },

    /* ================= FOOTER ================= */

    footer: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "80px 10% 40px",
    },

    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "80px",
    },

    footerHeading: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "25px",
      borderBottom: "2px solid #00AEEF",
      display: "inline-block",
      paddingBottom: "5px",
    },

    footerLink: {
      display: "block",
      color: "#ccc",
      textDecoration: "none",
      fontSize: "14px",
      marginBottom: "12px",
    },
  };

  return (
    <div style={styles.container}>
      
      {/* HERO + HEADER */}
      <div style={styles.heroWrapper}>
        
        {/* HEADER */}
        <nav style={styles.nav}>
          <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
            <a href="/" style={styles.logo}>TUNTURU®</a>

            <div style={styles.navLinksGroup}>
              <a href="/" style={styles.link}>Home</a>
              <a href="/store" style={styles.link}>Store</a>
              <a href="/categories" style={styles.link}>Categories ⌵</a>
              <a href="/franchise" style={styles.link}>Franchise</a>
              <a href="/services" style={styles.link}>Services</a>
              <a href="/blog" style={{ ...styles.link, ...styles.activeLink }}>
                Blog
              </a>
            </div>
          </div>

          <div style={styles.navLinksGroup}>
            <a href="/about" style={styles.link}>About</a>
            <a href="/contact" style={styles.link}>Contact Us</a>
            <span style={styles.link}>₹0.00</span>

            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: "20px", color: "#fff" }}>🛒</span>
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                0
              </div>
            </div>

            <span style={{ fontSize: "20px", cursor: "pointer", color: "#fff" }}>
              👤
            </span>
          </div>
        </nav>

        {/* HERO TITLE */}
        <h1 style={styles.heroTitle}>Blog</h1>

      </div>

      {/* BLOG SECTION */}
      <section style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>Our Latest Blog</h2>
        <div style={styles.underline}></div>

        <div style={styles.blogGrid}>
          {[1, 2, 3, 4].map((item) => (
            <a key={item} href="#" style={styles.blogCard}>
              <img
                style={styles.blogImage}
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80"
                alt="blog"
              />
              <h3 style={styles.blogTitle}>Sample Blog Title Goes Here</h3>
              <p style={styles.blogText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
            </a>
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default BlogPage;