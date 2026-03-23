// import React from 'react';

// const ContactPage: React.FC = () => {
//   // --- Inline Styles ---
//   const styles = {
//     container: {
//       fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
//       margin: 0,
//       padding: 0,
//       backgroundColor: '#fff',
//       overflowX: 'hidden' as const,
//     },
//     // 👉 Header overlay logic
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '20px 60px',
//       position: 'absolute' as const, // Float over image
//       top: 0,
//       left: 0,
//       width: '100%',
//       zIndex: 1000,
//       boxSizing: 'border-box' as const,
//       background: 'transparent', // No background strip
//     },
//     logo: {
//       fontSize: '28px',
//       fontWeight: '900',
//       color: '#00AEEF',
//       textDecoration: 'none',
//       fontFamily: 'Arial Black, sans-serif',
//     },
//     navLinksGroup: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '25px',
//     },
//     link: {
//       fontSize: '13px',
//       fontWeight: '700',
//       textTransform: 'uppercase' as const,
//       color: '#FFFFFF', // Pure white text
//       textDecoration: 'none',
//       cursor: 'pointer',
//     },
//     activeLink: {
//       color: '#00AEEF', // Blue for active link
//     },
//     // 👉 Hero starts from absolute top
//     hero: {
//       height: '500px',
//       backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000')`, 
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '100%',
//       marginTop: 0,
//     },
//     heroTitle: {
//       fontSize: '70px',
//       color: 'white',
//       fontWeight: 'bold',
//       margin: 0,
//       paddingTop: '40px',
//     },
//     // Help Section (Sales, Support, etc.)
//     helpSection: {
//       padding: '80px 10%',
//       textAlign: 'center' as const,
//       backgroundColor: '#F9FAFB',
//     },
//     helpGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(4, 1fr)',
//       gap: '20px',
//       marginTop: '40px',
//     },
//     helpCard: {
//       backgroundColor: '#fff',
//       padding: '40px 20px',
//       borderRadius: '10px',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//       textAlign: 'center' as const,
//     },
//     // Contact Form Section
//     formSection: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       padding: '100px 10%',
//       gap: '50px',
//       alignItems: 'center',
//     },
//     input: {
//       width: '100%',
//       padding: '15px',
//       marginBottom: '20px',
//       borderRadius: '8px',
//       border: '1px solid #ddd',
//       backgroundColor: '#f8f8f8',
//       fontSize: '14px',
//       boxSizing: 'border-box' as const,
//     },
//     submitBtn: {
//       backgroundColor: '#00AEEF',
//       color: 'white',
//       padding: '12px 30px',
//       border: 'none',
//       borderRadius: '25px',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       textTransform: 'uppercase' as const,
//     },
//     footer: {
//       backgroundColor: '#000',
//       color: '#fff',
//       padding: '80px 10% 40px',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* HEADER - Floating Overlay */}
      

//       {/* HERO SECTION */}
//       <div style={styles.hero}>
//         <h1 style={styles.heroTitle}>Contact Us</h1>
//       </div>

//       {/* HELP SECTION (Cards) */}
//       <section style={styles.helpSection}>
//         <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '5px' }}>Have any queries?</p>
//         <h2 style={{ fontSize: '42px', margin: 0 }}>We're <span style={{ borderBottom: '3px solid #00AEEF' }}>here to help.</span></h2>
        
//         <div style={styles.helpGrid}>
//           {['Sales', 'Support', 'Returns', 'Phone'].map((item, idx) => (
//             <div key={idx} style={styles.helpCard}>
//               <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>{item}</h3>
//               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Vestibulum ante ipsum primis in faucibus orci luctus.</p>
//               <p style={{ color: '#00AEEF', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer' }}>
//                 {item === 'Phone' ? '+91 89616 12353' : `${item.toLowerCase()}@tunturu.co.in`}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FORM SECTION */}
//       <section style={styles.formSection}>
//         <div>
//           <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Don't be a stranger!</p>
//           <h2 style={{ fontSize: '48px', margin: '0 0 30px 0', lineHeight: '1.1' }}>You tell us. We listen.</h2>
//           <p style={{ color: '#555', lineHeight: '1.8', maxWidth: '450px' }}>
//             Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et.
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
//           <input type="text" placeholder="NAME" style={styles.input} />
//           <input type="text" placeholder="SUBJECT" style={styles.input} />
//           <input type="email" placeholder="EMAIL" style={styles.input} />
//           <textarea placeholder="MESSAGE" style={{ ...styles.input, height: '150px' }}></textarea>
//           <button style={styles.submitBtn}>Send Message</button>
//         </div>
//       </section>

//      {/* ================= FOOTER ================= */}

//     </div>
//   );
// };

// export default ContactPage;

// import React from 'react';

// const ContactPage: React.FC = () => {
//   // --- Inline Styles ---
//   const styles = {
//     container: {
//       fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
//       margin: 0,
//       padding: 0,
//       backgroundColor: '#fff',
//       overflowX: 'hidden' as const,
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '20px 5%',
//       position: 'absolute' as const,
//       top: 0,
//       left: 0,
//       width: '100%',
//       zIndex: 1000,
//       boxSizing: 'border-box' as const,
//       background: 'transparent',
//     },
//     logo: {
//       fontSize: '24px',
//       fontWeight: '900',
//       color: '#00AEEF',
//       textDecoration: 'none',
//       fontFamily: 'Arial Black, sans-serif',
//     },
//     navLinksGroup: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '15px',
//     },
//     link: {
//       fontSize: '11px',
//       fontWeight: '700',
//       textTransform: 'uppercase' as const,
//       color: '#FFFFFF',
//       textDecoration: 'none',
//       cursor: 'pointer',
//     },
//     hero: {
//       height: '400px',
//       backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000')`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '100%',
//       marginTop: 0,
//     },
//     heroTitle: {
//       fontSize: 'clamp(40px, 8vw, 70px)', // Responsive font size
//       color: 'white',
//       fontWeight: 'bold',
//       margin: 0,
//       textAlign: 'center' as const,
//       padding: '0 20px',
//     },
//     helpSection: {
//       padding: '60px 5%',
//       textAlign: 'center' as const,
//       backgroundColor: '#F9FAFB',
//     },
//     helpGrid: {
//       display: 'grid',
//       gap: '20px',
//       marginTop: '40px',
//     },
//     helpCard: {
//       backgroundColor: '#fff',
//       padding: '40px 20px',
//       borderRadius: '10px',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//       textAlign: 'center' as const,
//     },
//     formSection: {
//       display: 'grid',
//       padding: '60px 5%',
//       gap: '40px',
//       alignItems: 'center',
//     },
//     input: {
//       width: '100%',
//       padding: '15px',
//       marginBottom: '20px',
//       borderRadius: '8px',
//       border: '1px solid #ddd',
//       backgroundColor: '#f8f8f8',
//       fontSize: '14px',
//       boxSizing: 'border-box' as const,
//     },
//     submitBtn: {
//       backgroundColor: '#00AEEF',
//       color: 'white',
//       padding: '12px 30px',
//       border: 'none',
//       borderRadius: '25px',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       width: '100%',
//       maxWidth: '200px',
//       textTransform: 'uppercase' as const,
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {/* Responsive Media Queries */}
//       <style>{`
//         /* Desktop Default for Grid */
//         .help-grid-responsive {
//           grid-template-columns: repeat(4, 1fr);
//         }
//         .form-section-responsive {
//           grid-template-columns: 1fr 1fr;
//         }

//         /* Tablet View */
//         @media (max-width: 992px) {
//           .help-grid-responsive {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         /* Mobile View */
//         @media (max-width: 600px) {
//           .help-grid-responsive {
//             grid-template-columns: 1fr;
//           }
//           .form-section-responsive {
//             grid-template-columns: 1fr;
//             text-align: center;
//           }
//           .nav-links-mobile {
//             display: none !important; /* Hiding nav links on tiny screens for UX */
//           }
//         }
//       `}</style>

//       {/* HEADER */}
      

//       {/* HERO SECTION */}
//       <div style={styles.hero}>
//         <h1 style={styles.heroTitle}>Contact Us</h1>
//       </div>

//       {/* HELP SECTION */}
//       <section style={styles.helpSection}>
//         <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '5px' }}>Have any queries?</p>
//         <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', margin: 0 }}>
//           We're <span style={{ borderBottom: '3px solid #00AEEF' }}>here to help.</span>
//         </h2>
        
//         <div style={styles.helpGrid} className="help-grid-responsive">
//           {['Sales', 'Support', 'Returns', 'Phone'].map((item, idx) => (
//             <div key={idx} style={styles.helpCard}>
//               <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>{item}</h3>
//               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
//                 Vestibulum ante ipsum primis in faucibus orci luctus.
//               </p>
//               <p style={{ color: '#00AEEF', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer', wordBreak: 'break-word' }}>
//                 {item === 'Phone' ? '+91 89616 12353' : `${item.toLowerCase()}@tunturu.co.in`}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FORM SECTION */}
//       <section style={styles.formSection} className="form-section-responsive">
//         <div>
//           <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Don't be a stranger!</p>
//           <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', margin: '0 0 30px 0', lineHeight: '1.1' }}>
//             You tell us. <br/> We listen.
//           </h2>
//           <p style={{ color: '#555', lineHeight: '1.8', maxWidth: '450px', margin: '0 auto' }}>
//             Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus.
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
//           <input type="text" placeholder="NAME" style={styles.input} />
//           <input type="text" placeholder="SUBJECT" style={styles.input} />
//           <input type="email" placeholder="EMAIL" style={styles.input} />
//           <textarea placeholder="MESSAGE" style={{ ...styles.input, height: '150px' }}></textarea>
//           <button style={styles.submitBtn}>Send Message</button>
//         </div>
//       </section>

//       {/* FOOTER */}
      
//     </div>
//   );
// };

// export default ContactPage;


import React, { useEffect, useState } from "react";

type HelpCard = {
  title: string;
  description: string;
  value: string;
};

type ContactApiResponse = {
  hero_title: string;
  hero_background_image: string;
  help_small_text: string;
  help_title: string;
  help_title_highlight: string;
  form_small_text: string;
  form_title_line_1: string;
  form_title_line_2: string;
  form_description: string;
  submit_button_text: string;
  help_cards: HelpCard[];
};

const API_BASE = "http://127.0.0.1:8000";
const CONTACT_API = `${API_BASE}/api/contactus/`;
const CONTACT_SUBMIT_API = `${API_BASE}/api/contactus/submit/`;

const defaultData: ContactApiResponse = {
  hero_title: "Contact Us",
  hero_background_image:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000",
  help_small_text: "Have any queries?",
  help_title: "We're here to help.",
  help_title_highlight: "here to help.",
  form_small_text: "Don't be a stranger!",
  form_title_line_1: "You tell us.",
  form_title_line_2: "We listen.",
  form_description:
    "Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus.",
  submit_button_text: "Send Message",
  help_cards: [
    {
      title: "Sales",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      value: "sales@tunturu.co.in",
    },
    {
      title: "Support",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      value: "support@tunturu.co.in",
    },
    {
      title: "Returns",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      value: "returns@tunturu.co.in",
    },
    {
      title: "Phone",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      value: "+91 89616 12353",
    },
  ],
};

const ContactPage: React.FC = () => {
  const [pageData, setPageData] = useState<ContactApiResponse>(defaultData);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");

  const styles = {
    container: {
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: "#fff",
      overflowX: "hidden" as const,
    },
    hero: {
      height: "400px",
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${pageData.hero_background_image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 0,
    },
    heroTitle: {
      fontSize: "clamp(40px, 8vw, 70px)",
      color: "white",
      fontWeight: "bold",
      margin: 0,
      textAlign: "center" as const,
      padding: "0 20px",
    },
    helpSection: {
      padding: "60px 5%",
      textAlign: "center" as const,
      backgroundColor: "#F9FAFB",
    },
    helpGrid: {
      display: "grid",
      gap: "20px",
      marginTop: "40px",
    },
    helpCard: {
      backgroundColor: "#fff",
      padding: "40px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      textAlign: "center" as const,
    },
    formSection: {
      display: "grid",
      padding: "60px 5%",
      gap: "40px",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      backgroundColor: "#f8f8f8",
      fontSize: "14px",
      boxSizing: "border-box" as const,
    },
    submitBtn: {
      backgroundColor: "#00AEEF",
      color: "white",
      padding: "12px 30px",
      border: "none",
      borderRadius: "25px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
      maxWidth: "200px",
      textTransform: "uppercase" as const,
      opacity: loading ? 0.7 : 1,
    },
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await fetch(CONTACT_API);
        if (!res.ok) throw new Error(`Failed to fetch contact data: ${res.status}`);
        const data = await res.json();

        setPageData({
          ...defaultData,
          ...data,
          help_cards: data?.help_cards?.length ? data.help_cards : defaultData.help_cards,
        });
      } catch (error) {
        console.error("Contact API fallback used:", error);
        setPageData(defaultData);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessageText("");

    try {
      const res = await fetch(CONTACT_SUBMIT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Failed to submit form");
      }

      setMessageText("Message sent successfully.");
      setFormData({
        name: "",
        subject: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      setMessageText(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderHelpValue = (title: string, value: string) => {
    if (title.toLowerCase() === "phone") {
      return <a href={`tel:${value}`} style={{ color: "#00AEEF", fontWeight: "bold", textDecoration: "none" }}>{value}</a>;
    }
    if (value.includes("@")) {
      return <a href={`mailto:${value}`} style={{ color: "#00AEEF", fontWeight: "bold", textDecoration: "none", wordBreak: "break-word" }}>{value}</a>;
    }
    return value;
  };

  return (
    <div style={styles.container}>
      <style>{`
        .help-grid-responsive {
          grid-template-columns: repeat(4, 1fr);
        }
        .form-section-responsive {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 992px) {
          .help-grid-responsive {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .help-grid-responsive {
            grid-template-columns: 1fr;
          }
          .form-section-responsive {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      `}</style>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>{pageData.hero_title}</h1>
      </div>

      <section style={styles.helpSection}>
        <p style={{ color: "#000", fontWeight: "bold", marginBottom: "5px" }}>
          {pageData.help_small_text}
        </p>

        <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", margin: 0 }}>
          {pageData.help_title.replace(pageData.help_title_highlight, "").trim()}{" "}
          <span style={{ borderBottom: "3px solid #00AEEF" }}>
            {pageData.help_title_highlight}
          </span>
        </h2>

        <div style={styles.helpGrid} className="help-grid-responsive">
          {pageData.help_cards.map((item, idx) => (
            <div key={idx} style={styles.helpCard}>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>{item.title}</h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
                {item.description}
              </p>
              <p style={{ color: "#00AEEF", fontWeight: "bold", marginTop: "15px", wordBreak: "break-word" }}>
                {renderHelpValue(item.title, item.value)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.formSection} className="form-section-responsive">
        <div>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            {pageData.form_small_text}
          </p>
          <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", margin: "0 0 30px 0", lineHeight: "1.1" }}>
            {pageData.form_title_line_1}
            <br />
            {pageData.form_title_line_2}
          </h2>
          <p style={{ color: "#555", lineHeight: "1.8", maxWidth: "450px", margin: "0 auto" }}>
            {pageData.form_description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#fff",
            padding: "clamp(20px, 5vw, 40px)",
            borderRadius: "15px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="NAME"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="SUBJECT"
            style={styles.input}
            value={formData.subject}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="MESSAGE"
            style={{ ...styles.input, height: "150px" }}
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Sending..." : pageData.submit_button_text}
          </button>

          {messageText && (
            <p style={{ marginTop: "15px", color: "#111", fontWeight: 600 }}>
              {messageText}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default ContactPage;

