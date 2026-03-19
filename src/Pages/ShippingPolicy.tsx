// import React from "react";

// const ShippingPolicy: React.FC = () => {
//   const styles = {
//     container: {
//       margin: 0,
//       padding: 0,
//       fontFamily: '"Segoe UI", sans-serif',
//       overflowX: "hidden" as const,
//       backgroundColor: "#f4f4f4",
//     },

//     /* ================= HERO ================= */

//     heroWrapper: {
//       position: "relative" as const,
//       height: "520px",
//       width: "100%",
//       backgroundImage:
//         "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-artempodrez-5025669.jpg')",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },

//     nav: {
//       position: "absolute" as const,
//       top: 0,
//       left: 0,
//       width: "100%",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "20px 80px",
//       boxSizing: "border-box" as const,
//       zIndex: 1000,
//       background: "transparent",
//     },

//     navGroup: {
//       display: "flex",
//       gap: "30px",
//       alignItems: "center",
//     },

//     link: {
//       color: "#fff",
//       fontSize: "13px",
//       fontWeight: 600,
//       textTransform: "uppercase" as const,
//       textDecoration: "none",
//       letterSpacing: "0.5px",
//     },

//     activeLink: {
//       color: "#00AEEF",
//     },

//     logo: {
//       fontSize: "28px",
//       fontWeight: 900,
//       color: "#00AEEF",
//       textDecoration: "none",
//     },

//     heroTitle: {
//       color: "#fff",
//       fontSize: "70px",
//       fontWeight: 700,
//       letterSpacing: "2px",
//       margin: 0,
//     },

//     /* ================= CONTENT ================= */

//     contentWrapper: {
//       backgroundColor: "#f4f4f4",
//       padding: "80px 12%",
//       lineHeight: "1.8",
//       color: "#222",
//     },

//     heading: {
//       fontSize: "32px",
//       marginBottom: "20px",
//       fontWeight: 700,
//     },

//     paragraph: {
//       fontSize: "16px",
//       marginBottom: "25px",
//       color: "#444",
//     },

//     list: {
//       paddingLeft: "25px",
//       marginBottom: "25px",
//       color: "#444",
//     },

//     listItem: {
//       marginBottom: "10px",
//     },

//     /* ================= FOOTER ================= */

//     bottomBar: {
//       borderTop: "1px solid #111",
//       marginTop: "60px",
//       paddingTop: "30px",
//       display: "flex",
//       justifyContent: "space-between",
//       fontSize: "14px",
//       color: "#aaa",
//     },

//     floatingCart: {
//       position: "fixed" as const,
//       right: "30px",
//       bottom: "40px",
//       width: "65px",
//       height: "65px",
//       backgroundColor: "#1EA7FD",
//       borderRadius: "50%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "26px",
//       color: "#fff",
//       cursor: "pointer",
//     },

//     scrollTop: {
//       position: "fixed" as const,
//       left: "30px",
//       bottom: "40px",
//       width: "60px",
//       height: "60px",
//       backgroundColor: "#6C7BFF",
//       borderRadius: "50%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "28px",
//       color: "#000",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {/* HERO */}
//       <div style={styles.heroWrapper}>
        

//         <h1 style={styles.heroTitle}>SHIPPING POLICY</h1>
//       </div>

//       {/* CONTENT */}
//       <div style={styles.contentWrapper}>
//         <h2 style={styles.heading}>Processing Time</h2>
//         <p style={styles.paragraph}>
//           Orders are processed within 1–3 business days after payment confirmation.
//         </p>

//         <h2 style={styles.heading}>Delivery Time</h2>
//         <p style={styles.paragraph}>Estimated delivery:</p>
//         <ul style={styles.list}>
//           <li style={styles.listItem}>Metro Cities: 3–5 business days</li>
//           <li style={styles.listItem}>Other Locations: 5–10 business days</li>
//         </ul>
//         <p style={styles.paragraph}>
//           Delivery times may vary due to external factors.
//         </p>

//         <h2 style={styles.heading}>Shipping Charges</h2>
//         <p style={styles.paragraph}>
//           Shipping charges are calculated at checkout based on location and order size.
//         </p>

//         <h2 style={styles.heading}>Order Tracking</h2>
//         <p style={styles.paragraph}>
//           Tracking details will be shared via email/SMS once the order is dispatched.
//         </p>

//         <h2 style={styles.heading}>Delays</h2>
//         <p style={styles.paragraph}>
//           We are not responsible for delays caused by courier companies or unforeseen circumstances.
//         </p>
//       </div>
// {/* ================= FOOTER ================= */}
//     </div>
//   );
// };

// export default ShippingPolicy;

import React, { useEffect, useState } from "react";

type ShippingSection = {
  heading: string;
  paragraph: string;
  list_items: string[];
};

type ShippingPolicyApiResponse = {
  hero_title: string;
  hero_background_image: string;
  sections: ShippingSection[];
};

const API_BASE = "https://attenbackend.clickconnectmedia.cloud";
const SHIPPING_POLICY_API = `${API_BASE}/api/shippingpolicy/`;

const defaultData: ShippingPolicyApiResponse = {
  hero_title: "SHIPPING POLICY",
  hero_background_image:
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-artempodrez-5025669.jpg",
  sections: [
    {
      heading: "Processing Time",
      paragraph: "Orders are processed within 1–3 business days after payment confirmation.",
      list_items: [],
    },
    {
      heading: "Delivery Time",
      paragraph: "Estimated delivery:",
      list_items: [
        "Metro Cities: 3–5 business days",
        "Other Locations: 5–10 business days",
      ],
    },
    {
      heading: "Delivery Note",
      paragraph: "Delivery times may vary due to external factors.",
      list_items: [],
    },
    {
      heading: "Shipping Charges",
      paragraph: "Shipping charges are calculated at checkout based on location and order size.",
      list_items: [],
    },
    {
      heading: "Order Tracking",
      paragraph: "Tracking details will be shared via email/SMS once the order is dispatched.",
      list_items: [],
    },
    {
      heading: "Delays",
      paragraph: "We are not responsible for delays caused by courier companies or unforeseen circumstances.",
      list_items: [],
    },
  ],
};

const ShippingPolicy: React.FC = () => {
  const [pageData, setPageData] = useState<ShippingPolicyApiResponse>(defaultData);

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      try {
        const res = await fetch(SHIPPING_POLICY_API);
        if (!res.ok) {
          throw new Error(`Failed to fetch shipping policy: ${res.status}`);
        }

        const data = await res.json();

        setPageData({
          ...defaultData,
          ...data,
          sections: data?.sections?.length ? data.sections : defaultData.sections,
        });
      } catch (error) {
        console.error("Shipping Policy API fallback used:", error);
        setPageData(defaultData);
      }
    };

    fetchShippingPolicy();
  }, []);

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      fontFamily: '"Segoe UI", sans-serif',
      overflowX: "hidden" as const,
      backgroundColor: "#f4f4f4",
    },

    heroWrapper: {
      position: "relative" as const,
      height: "520px",
      width: "100%",
      backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${pageData.hero_background_image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    heroTitle: {
      color: "#fff",
      fontSize: "70px",
      fontWeight: 700,
      letterSpacing: "2px",
      margin: 0,
      textAlign: "center" as const,
      padding: "0 16px",
    },

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
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroWrapper}>
        <h1 style={styles.heroTitle}>{pageData.hero_title}</h1>
      </div>

      <div style={styles.contentWrapper}>
        {pageData.sections.map((section, index) => (
          <div key={index}>
            <h2 style={styles.heading}>{section.heading}</h2>

            {section.paragraph ? (
              <p style={styles.paragraph}>{section.paragraph}</p>
            ) : null}

            {section.list_items?.length ? (
              <ul style={styles.list}>
                {section.list_items.map((item, itemIndex) => (
                  <li key={itemIndex} style={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingPolicy;