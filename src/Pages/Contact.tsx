import React from 'react';

const ContactPage: React.FC = () => {
  // --- Inline Styles ---
  const styles = {
    container: {
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#fff',
      overflowX: 'hidden' as const,
    },
    // 👉 Header overlay logic
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 60px',
      position: 'absolute' as const, // Float over image
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      boxSizing: 'border-box' as const,
      background: 'transparent', // No background strip
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#00AEEF',
      textDecoration: 'none',
      fontFamily: 'Arial Black, sans-serif',
    },
    navLinksGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
    },
    link: {
      fontSize: '13px',
      fontWeight: '700',
      textTransform: 'uppercase' as const,
      color: '#FFFFFF', // Pure white text
      textDecoration: 'none',
      cursor: 'pointer',
    },
    activeLink: {
      color: '#00AEEF', // Blue for active link
    },
    // 👉 Hero starts from absolute top
    hero: {
      height: '500px',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 0,
    },
    heroTitle: {
      fontSize: '70px',
      color: 'white',
      fontWeight: 'bold',
      margin: 0,
      paddingTop: '40px',
    },
    // Help Section (Sales, Support, etc.)
    helpSection: {
      padding: '80px 10%',
      textAlign: 'center' as const,
      backgroundColor: '#F9FAFB',
    },
    helpGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginTop: '40px',
    },
    helpCard: {
      backgroundColor: '#fff',
      padding: '40px 20px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      textAlign: 'center' as const,
    },
    // Contact Form Section
    formSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: '100px 10%',
      gap: '50px',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      backgroundColor: '#f8f8f8',
      fontSize: '14px',
      boxSizing: 'border-box' as const,
    },
    submitBtn: {
      backgroundColor: '#00AEEF',
      color: 'white',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '25px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
    },
    footer: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '80px 10% 40px',
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER - Floating Overlay */}
      

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Contact Us</h1>
      </div>

      {/* HELP SECTION (Cards) */}
      <section style={styles.helpSection}>
        <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '5px' }}>Have any queries?</p>
        <h2 style={{ fontSize: '42px', margin: 0 }}>We're <span style={{ borderBottom: '3px solid #00AEEF' }}>here to help.</span></h2>
        
        <div style={styles.helpGrid}>
          {['Sales', 'Support', 'Returns', 'Phone'].map((item, idx) => (
            <div key={idx} style={styles.helpCard}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>{item}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Vestibulum ante ipsum primis in faucibus orci luctus.</p>
              <p style={{ color: '#00AEEF', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer' }}>
                {item === 'Phone' ? '+91 89616 12353' : `${item.toLowerCase()}@tunturu.co.in`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section style={styles.formSection}>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Don't be a stranger!</p>
          <h2 style={{ fontSize: '48px', margin: '0 0 30px 0', lineHeight: '1.1' }}>You tell us. We listen.</h2>
          <p style={{ color: '#555', lineHeight: '1.8', maxWidth: '450px' }}>
            Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et.
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <input type="text" placeholder="NAME" style={styles.input} />
          <input type="text" placeholder="SUBJECT" style={styles.input} />
          <input type="email" placeholder="EMAIL" style={styles.input} />
          <textarea placeholder="MESSAGE" style={{ ...styles.input, height: '150px' }}></textarea>
          <button style={styles.submitBtn}>Send Message</button>
        </div>
      </section>

     {/* ================= FOOTER ================= */}

    </div>
  );
};

export default ContactPage;