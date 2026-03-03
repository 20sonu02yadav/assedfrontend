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
  };

  return (
    <div style={styles.container}>
      {/* HERO (Header removed - global header in App.tsx) */}
      <div style={styles.heroWrapper}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer removed - global footer in App.tsx */}
    </div>
  );
};

export default BlogPage;