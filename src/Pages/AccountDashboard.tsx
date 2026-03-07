
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";

// // export default function AccountDashboard() {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   return (
// //     <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
// //       <h1>Dashboard</h1>
// //       <p>
// //         Logged in as <b>{user?.username}</b> ({user?.email}) — <b>{user?.role}</b>
// //       </p>

// //       <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
// //         <button onClick={() => navigate("/orders")}>Order History</button>
// //         <button onClick={() => navigate("/cart")}>Cart</button>
// //         <button onClick={() => navigate("/store")}>Store</button>
// //         <button
// //           onClick={() => {
// //             logout();
// //             navigate("/my-account");
// //           }}
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// const HERO_BG =
//   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

// export default function AccountDashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     navigate("/my-account");
//   }

//   return (
//     <div style={styles.page}>
//       {/* HERO */}
//       <section style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
//         <div style={styles.heroOverlay} />
//         <div style={styles.heroContent}>
//           <h1 style={styles.heroTitle}>My Account</h1>
//           <p style={styles.heroSub}>
//             Nam nec tellus a odio tincidunt auctor a ornare odio.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <main style={styles.main}>
//         <div style={styles.grid}>
//           {/* LEFT MENU */}
//           <aside style={styles.sidebar}>
//             <button style={{ ...styles.sideItem, ...styles.activeItem }}>
//               Dashboard
//             </button>

//             <button
//               style={styles.sideItem}
//               onClick={() => navigate("/orders")}
//             >
//               Orders
//             </button>

//             <button style={styles.sideItem}>Downloads</button>

//             <button
//               style={styles.sideItem}
//               onClick={() => navigate("/checkout")}
//             >
//               Addresses
//             </button>

//             <button style={styles.sideItem}>Account details</button>

//             <button
//               style={styles.sideItem}
//               onClick={handleLogout}
//             >
//               Log out
//             </button>
//           </aside>

//           {/* RIGHT CONTENT */}
//           <section style={styles.contentCard}>
//             <p style={styles.helloText}>
//               Hello <strong>{user?.username || "User"}</strong>
//               {user?.username ? (
//                 <>
//                   {" "}
//                   (not {user.username}?{" "}
//                   <span style={styles.inlineLogout} onClick={handleLogout}>
//                     Log out
//                   </span>
//                   )
//                 </>
//               ) : null}
//             </p>

//             <p style={styles.desc}>
//               From your account dashboard you can view your recent orders,
//               manage your shipping and billing addresses, and edit your password
//               and account details.
//             </p>

//             <div style={styles.buttonRow}>
//               <button
//                 style={styles.primaryBtn}
//                 onClick={() => navigate("/orders")}
//               >
//                 View Orders
//               </button>

//               <button
//                 style={styles.secondaryBtn}
//                 onClick={() => navigate("/cart")}
//               >
//                 Go to Cart
//               </button>

//               <button
//                 style={styles.secondaryBtn}
//                 onClick={() => navigate("/store")}
//               >
//                 Continue Shopping
//               </button>
//             </div>

//             <div style={styles.infoBox}>
//               <div style={styles.infoTitle}>Account Information</div>

//               <div style={styles.infoRow}>
//                 <span style={styles.infoLabel}>Username:</span>
//                 <span>{user?.username || "-"}</span>
//               </div>

//               <div style={styles.infoRow}>
//                 <span style={styles.infoLabel}>Email:</span>
//                 <span>{user?.email || "-"}</span>
//               </div>

//               <div style={styles.infoRow}>
//                 <span style={styles.infoLabel}>Role:</span>
//                 <span>{user?.role || "-"}</span>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     background: "#fff",
//     color: "#111827",
//     fontFamily:
//       "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
//   },

//   hero: {
//     height: 430,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 72,
//   },
//   heroOverlay: {
//     position: "absolute",
//     inset: 0,
//     background: "rgba(0,0,0,0.35)",
//   },
//   heroContent: {
//     position: "relative",
//     textAlign: "center",
//     color: "#fff",
//     padding: "0 18px",
//   },
//   heroTitle: {
//     fontSize: 66,
//     fontWeight: 800,
//     margin: 0,
//     letterSpacing: 0.2,
//     textShadow: "0 4px 18px rgba(0,0,0,0.35)",
//   },
//   heroSub: {
//     marginTop: 10,
//     fontSize: 18,
//     opacity: 0.95,
//     textShadow: "0 4px 14px rgba(0,0,0,0.35)",
//   },

//   main: {
//     maxWidth: 1220,
//     margin: "0 auto",
//     padding: "70px 22px 90px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "320px 1fr",
//     gap: 24,
//     alignItems: "start",
//   },

//   sidebar: {
//     border: "1px solid #e5e7eb",
//     background: "#fff",
//   },

//   sideItem: {
//     width: "100%",
//     textAlign: "left",
//     padding: "18px 18px",
//     border: "none",
//     borderBottom: "1px solid #e5e7eb",
//     background: "#fff",
//     fontSize: 16,
//     cursor: "pointer",
//     color: "#111827",
//   },

//   activeItem: {
//     color: "#0b76c5",
//     fontWeight: 700,
//   },

//   contentCard: {
//     background: "#fff",
//     padding: "6px 0",
//   },

//   helloText: {
//     fontSize: 18,
//     lineHeight: 1.7,
//     margin: 0,
//     color: "#111827",
//   },

//   inlineLogout: {
//     color: "#0b76c5",
//     cursor: "pointer",
//     fontWeight: 700,
//   },

//   desc: {
//     marginTop: 24,
//     fontSize: 17,
//     lineHeight: 1.9,
//     color: "#1f2937",
//     maxWidth: 760,
//   },

//   buttonRow: {
//     display: "flex",
//     gap: 12,
//     flexWrap: "wrap",
//     marginTop: 28,
//   },

//   primaryBtn: {
//     height: 46,
//     padding: "0 20px",
//     border: "none",
//     borderRadius: 999,
//     background: "#0b76c5",
//     color: "#fff",
//     fontWeight: 900,
//     cursor: "pointer",
//     fontSize: 14,
//     letterSpacing: 0.4,
//   },

//   secondaryBtn: {
//     height: 46,
//     padding: "0 20px",
//     border: "1px solid #d1d5db",
//     borderRadius: 999,
//     background: "#fff",
//     color: "#111827",
//     fontWeight: 800,
//     cursor: "pointer",
//     fontSize: 14,
//   },

//   infoBox: {
//     marginTop: 34,
//     border: "1px solid #e5e7eb",
//     borderRadius: 12,
//     padding: 22,
//     maxWidth: 700,
//     background: "#fafafa",
//   },

//   infoTitle: {
//     fontSize: 20,
//     fontWeight: 800,
//     marginBottom: 16,
//   },

//   infoRow: {
//     display: "flex",
//     gap: 10,
//     padding: "10px 0",
//     borderBottom: "1px solid #e5e7eb",
//     flexWrap: "wrap",
//   },

//   infoLabel: {
//     minWidth: 100,
//     fontWeight: 700,
//     color: "#374151",
//   },
// };



import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import React, { useState, useEffect } from "react";

const HERO_BG =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

export default function AccountDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State to handle responsiveness via JS for inline-styles
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogout() {
    logout();
    navigate("/my-account");
  }

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={{ 
        ...styles.hero, 
        backgroundImage: `url(${HERO_BG})`,
        height: isMobile ? 300 : 430 
      }}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={{ 
            ...styles.heroTitle, 
            fontSize: isMobile ? 36 : 66 
          }}>My Account</h1>
          <p style={styles.heroSub}>
            Nam nec tellus a odio tincidunt auctor a ornare odio.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main style={styles.main}>
        <div style={{ 
          ...styles.grid, 
          gridTemplateColumns: isMobile ? "1fr" : "320px 1fr" 
        }}>
          {/* LEFT MENU */}
          <aside style={styles.sidebar}>
            <button style={{ ...styles.sideItem, ...styles.activeItem }}>
              Dashboard
            </button>

            <button
              style={styles.sideItem}
              onClick={() => navigate("/orders")}
            >
              Orders
            </button>

            <button style={styles.sideItem}>Downloads</button>

            <button
              style={styles.sideItem}
              onClick={() => navigate("/checkout")}
            >
              Addresses
            </button>

            <button style={styles.sideItem}>Account details</button>

            <button
              style={styles.sideItem}
              onClick={handleLogout}
            >
              Log out
            </button>
          </aside>

          {/* RIGHT CONTENT */}
          <section style={styles.contentCard}>
            <p style={styles.helloText}>
              Hello <strong>{user?.username || "User"}</strong>
              {user?.username ? (
                <>
                  {" "}
                  (not {user.username}?{" "}
                  <span style={styles.inlineLogout} onClick={handleLogout}>
                    Log out
                  </span>
                  )
                </>
              ) : null}
            </p>

            <p style={styles.desc}>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>

            <div style={styles.buttonRow}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/orders")}
              >
                View Orders
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/store")}
              >
                Continue Shopping
              </button>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoTitle}>Account Information</div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Username:</span>
                <span>{user?.username || "-"}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email:</span>
                <span>{user?.email || "-"}</span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Role:</span>
                <span>{user?.role || "-"}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    color: "#111827",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  hero: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
    transition: "height 0.3s ease",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    position: "relative",
    textAlign: "center",
    color: "#fff",
    padding: "0 18px",
    width: "100%",
  },
  heroTitle: {
    fontWeight: 800,
    margin: 0,
    letterSpacing: 0.2,
    textShadow: "0 4px 18px rgba(0,0,0,0.35)",
    transition: "font-size 0.3s ease",
  },
  heroSub: {
    marginTop: 10,
    fontSize: 16,
    opacity: 0.95,
    textShadow: "0 4px 14px rgba(0,0,0,0.35)",
  },
  main: {
    maxWidth: 1220,
    margin: "0 auto",
    padding: "40px 16px 60px", // Reduced padding for mobile
  },
  grid: {
    display: "grid",
    gap: 32,
    alignItems: "start",
  },
  sidebar: {
    border: "1px solid #e5e7eb",
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  sideItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 20px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 15,
    cursor: "pointer",
    color: "#111827",
    transition: "background 0.2s",
  },
  activeItem: {
    color: "#0b76c5",
    fontWeight: 700,
    background: "#f0f7ff",
  },
  contentCard: {
    background: "#fff",
    padding: "0",
  },
  helloText: {
    fontSize: 18,
    lineHeight: 1.7,
    margin: 0,
    color: "#111827",
  },
  inlineLogout: {
    color: "#0b76c5",
    cursor: "pointer",
    fontWeight: 700,
  },
  desc: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4b5563",
    maxWidth: 760,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  primaryBtn: {
    height: 46,
    padding: "0 24px",
    border: "none",
    borderRadius: 999,
    background: "#0b76c5",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  secondaryBtn: {
    height: 46,
    padding: "0 24px",
    border: "1px solid #d1d5db",
    borderRadius: 999,
    background: "#fff",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  },
  infoBox: {
    marginTop: 34,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 20,
    background: "#fafafa",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 16,
  },
  infoRow: {
    display: "flex",
    gap: 10,
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },
  infoLabel: {
    minWidth: 100,
    fontWeight: 700,
    color: "#374151",
  },
};


