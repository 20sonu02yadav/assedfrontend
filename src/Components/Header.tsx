// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { fetchCategoryTree } from "../services/storeApi";
// // import type { CategoryNode } from "../services/storeApi";

// // const LOGO_URL =
// //   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// // const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

// // export default function Header() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [categories, setCategories] = useState<CategoryNode[]>([]);
// //   const [showCategories, setShowCategories] = useState(false);
// //   const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [mobileCatOpen, setMobileCatOpen] = useState(false);
// //   const [mobileTotalToolsOpen, setMobileTotalToolsOpen] = useState(false);

// //   const dropdownRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     fetchCategoryTree()
// //       .then(setCategories)
// //       .catch(() => setCategories([]));
// //   }, []);

// //   // ✅ close menu on route change
// //   useEffect(() => {
// //     setMobileOpen(false);
// //     setShowCategories(false);
// //     setOpenSubmenuSlug(null);
// //     setMobileCatOpen(false);
// //     setMobileTotalToolsOpen(false);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [location.pathname]);

// //   // ✅ body scroll lock when menu open
// //   useEffect(() => {
// //     if (!mobileOpen) return;
// //     const prev = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";
// //     return () => {
// //       document.body.style.overflow = prev;
// //     };
// //   }, [mobileOpen]);

// //   // ✅ ESC close
// //   useEffect(() => {
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") setMobileOpen(false);
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, []);

// //   // ✅ click outside desktop dropdown
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (!dropdownRef.current) return;
// //       if (!dropdownRef.current.contains(event.target as Node)) {
// //         setShowCategories(false);
// //         setOpenSubmenuSlug(null);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const totalToolsParent = useMemo(() => {
// //     const findInTree = (nodes: CategoryNode[]): CategoryNode | null => {
// //       for (const n of nodes) {
// //         if ((n.name || "").trim().toUpperCase() === TOTAL_TOOLS_PARENT_NAME) return n;
// //         const sub = findInTree(n.children || []);
// //         if (sub) return sub;
// //       }
// //       return null;
// //     };
// //     return findInTree(categories);
// //   }, [categories]);

// //   const topLevelCategories = useMemo(() => {
// //     return categories.filter(
// //       (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
// //     );
// //   }, [categories]);

// //   function goCategory(slug: string) {
// //     setShowCategories(false);
// //     setOpenSubmenuSlug(null);
// //     setMobileOpen(false);
// //     setMobileCatOpen(false);
// //     setMobileTotalToolsOpen(false);
// //     navigate(`/category/${slug}`);
// //   }

// //   return (
// //     <>
// //       {/* ✅ Scoped CSS */}
// //       <style>{`
// //         @media (max-width: 900px){
// //           .desktopNav { display: none !important; }
// //           .desktopRightLinks { display: none !important; }
// //           .mobileHamburger { display: inline-flex !important; }
// //           .headerInner { padding: 0 16px !important; }
// //         }

// //         /* ✅ RIGHT Drawer animation (flush) */
// //         .drawerRight {
// //           transform: translateX(100%);
// //           transition: transform 240ms ease;
// //           will-change: transform;
// //         }
// //         .drawerRightOpen {
// //           transform: translateX(0);
// //         }

// //         .overlay {
// //           opacity: 0;
// //           transition: opacity 240ms ease;
// //           pointer-events: none;
// //         }
// //         .overlayOpen {
// //           opacity: 1;
// //           pointer-events: auto;
// //         }
// //       `}</style>

// //       {/* HEADER */}
// //       <header style={styles.header}>
// //         <div className="headerInner" style={styles.inner}>
// //           {/* LEFT */}
// //           <div style={styles.left}>
// //             {/* MOBILE HAMBURGER */}
// //             <button
// //               type="button"
// //               aria-label="Open menu"
// //               className="mobileHamburger"
// //               style={styles.hamburgerBtn}
// //               onClick={() => setMobileOpen(true)}
// //             >
// //               ☰
// //             </button>

// //             <Link to="/" onClick={() => setMobileOpen(false)}>
// //               <img src={LOGO_URL} alt="Logo" style={styles.logo} />
// //             </Link>

// //             {/* DESKTOP NAV */}
// //             <nav className="desktopNav" style={styles.nav}>
// //               <NavLink to="/">HOME</NavLink>
// //               <NavLink to="/store">STORE</NavLink>

// //               {/* DESKTOP CATEGORY DROPDOWN */}
// //               <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
// //                 <span
// //                   style={styles.navLink}
// //                   onClick={() => setShowCategories((p) => !p)}
// //                 >
// //                   CATEGORIES ⌄
// //                 </span>

// //                 {showCategories && (
// //                   <div style={styles.dropdown}>
// //                     {totalToolsParent && (
// //                       <div style={{ position: "relative" }}>
// //                         <div
// //                           style={styles.dropdownItem}
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             setOpenSubmenuSlug((s) =>
// //                               s === totalToolsParent.slug ? null : totalToolsParent.slug
// //                             );
// //                           }}
// //                         >
// //                           {TOTAL_TOOLS_PARENT_NAME} ›
// //                         </div>

// //                         {openSubmenuSlug === totalToolsParent.slug && (
// //                           <div style={styles.subMenu}>
// //                             {(totalToolsParent.children || []).map((child) => (
// //                               <button
// //                                 key={child.slug}
// //                                 style={styles.subItem}
// //                                 onClick={() => goCategory(child.slug)}
// //                               >
// //                                 {(child.name || "").toUpperCase()}
// //                               </button>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}

// //                     {topLevelCategories.map((c) => (
// //                       <button
// //                         key={c.slug}
// //                         style={styles.dropdownItemBtn}
// //                         onClick={() => goCategory(c.slug)}
// //                       >
// //                         {(c.name || "").toUpperCase()}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               <NavLink to="/franchise">FRANCHISE</NavLink>
// //               <NavLink to="/services">SERVICES</NavLink>
// //               <NavLink to="/blog">BLOG</NavLink>
// //             </nav>
// //           </div>

// //           {/* RIGHT */}
// //           <div style={styles.right}>
// //             <div
// //               className="desktopRightLinks"
// //               style={{ display: "flex", gap: 20, alignItems: "center" }}
// //             >
// //               <NavLink to="/about">ABOUT</NavLink>
// //               <NavLink to="/contact">CONTACT US</NavLink>
// //               <span style={styles.price}>₹0.00</span>
// //             </div>

// //             <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
// //               🛒
// //               <span style={styles.badge}>0</span>
// //             </div>

// //             <div
// //               onClick={() => navigate("/my-account")}
// //               style={{ cursor: "pointer", color: "#fff" }}
// //             >
// //               👤
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* MOBILE OVERLAY + RIGHT DRAWER */}
// //       {mobileOpen && (
// //         <>
// //           <div
// //             className={`overlay ${mobileOpen ? "overlayOpen" : ""}`}
// //             style={styles.mobileOverlay}
// //             onClick={() => setMobileOpen(false)}
// //           />

// //           <div
// //             className={`drawerRight ${mobileOpen ? "drawerRightOpen" : ""}`}
// //             style={styles.mobileMenu}
// //             role="dialog"
// //             aria-modal="true"
// //             aria-label="Mobile navigation"
// //           >
// //             <div style={styles.mobileTop}>
// //               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                 <img src={LOGO_URL} alt="Logo" style={{ height: 26 }} />
// //                 <span style={{ fontWeight: 900 }}>Menu</span>
// //               </div>

// //               <button
// //                 type="button"
// //                 style={styles.closeBtn}
// //                 onClick={() => setMobileOpen(false)}
// //                 aria-label="Close menu"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             {/* ✅ IMPORTANT: This part is now scrollable */}
// //             <div style={styles.mobileLinks}>
// //               <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
// //               <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
// //               <MobileLink to="/cart" close={() => setMobileOpen(false)}>CART</MobileLink>
// //               <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

// //               {/* ✅ Categories accordion */}
// //               <div style={styles.mobileCategoryBox}>
// //                 <button
// //                   type="button"
// //                   style={styles.mobileCategoryHeader}
// //                   onClick={() => {
// //                     setMobileCatOpen((p) => !p);
// //                     if (!mobileCatOpen) setMobileTotalToolsOpen(false);
// //                   }}
// //                 >
// //                   <span style={{ fontWeight: 900 }}>CATEGORIES</span>
// //                   <span style={{ opacity: 0.9 }}>{mobileCatOpen ? "−" : "+"}</span>
// //                 </button>

// //                 {mobileCatOpen && (
// //                   <div style={styles.mobileCategoryBody}>
// //                     {/* TOTAL TOOLS expandable */}
// //                     {totalToolsParent && (
// //                       <div style={{ marginBottom: 10 }}>
// //                         <button
// //                           type="button"
// //                           style={styles.mobileCatRow}
// //                           onClick={() => setMobileTotalToolsOpen((p) => !p)}
// //                         >
// //                           <span style={{ fontWeight: 900 }}>{TOTAL_TOOLS_PARENT_NAME}</span>
// //                           <span style={{ opacity: 0.9 }}>
// //                             {mobileTotalToolsOpen ? "⌃" : "⌄"}
// //                           </span>
// //                         </button>

// //                         {mobileTotalToolsOpen && (
// //                           <div style={styles.mobileSubList}>
// //                             {(totalToolsParent.children || []).map((child) => (
// //                               <button
// //                                 key={child.slug}
// //                                 style={styles.mobileSubBtn}
// //                                 onClick={() => goCategory(child.slug)}
// //                               >
// //                                 {(child.name || "").toUpperCase()}
// //                               </button>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}

// //                     {/* other top-level direct */}
// //                     {topLevelCategories.map((c) => (
// //                       <button
// //                         key={c.slug}
// //                         style={styles.mobileCatDirectBtn}
// //                         onClick={() => goCategory(c.slug)}
// //                       >
// //                         {(c.name || "").toUpperCase()}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
// //               <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
// //               <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
// //               <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
// //               <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
// //               <MobileLink to="/dealer" close={() => setMobileOpen(false)}>DEALER</MobileLink>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // }

// // /* Reusable */
// // function NavLink({ to, children }: any) {
// //   return (
// //     <Link to={to} style={styles.navLink}>
// //       {children}
// //     </Link>
// //   );
// // }

// // function MobileLink({ to, children, close }: any) {
// //   return (
// //     <Link to={to} style={styles.mobileLink} onClick={close}>
// //       {children}
// //     </Link>
// //   );
// // }

// // const styles: any = {
// //   header: {
// //     position: "absolute",
// //     top: 0,
// //     width: "100%",
// //     zIndex: 999,
// //     background: "rgba(0,0,0,0.35)",
// //     backdropFilter: "blur(4px)",
// //   },
// //   inner: {
// //     height: 76,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     padding: "0 40px",
// //     width: "100%",
// //   },
// //   left: { display: "flex", alignItems: "center", gap: 18 },
// //   logo: { height: 40 },
// //   nav: { display: "flex", gap: 24, alignItems: "center" },
// //   navLink: {
// //     color: "#fff",
// //     textDecoration: "none",
// //     fontWeight: 700,
// //     fontSize: 14,
// //     letterSpacing: 0.3,
// //   },
// //   right: { display: "flex", alignItems: "center", gap: 16, color: "#fff" },
// //   price: { color: "#fff", fontWeight: 800 },
// //   iconWrap: { position: "relative", cursor: "pointer", color: "#fff" },
// //   badge: {
// //     position: "absolute",
// //     top: -8,
// //     right: -10,
// //     width: 18,
// //     height: 18,
// //     borderRadius: 999,
// //     background: "#fff",
// //     color: "#000",
// //     display: "grid",
// //     placeItems: "center",
// //     fontSize: 11,
// //     fontWeight: 800,
// //   },

// //   dropdown: {
// //     position: "absolute",
// //     top: 40,
// //     left: 0,
// //     width: 260,
// //     background: "#fff",
// //     borderRadius: 16,
// //     padding: 10,
// //     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
// //     zIndex: 1000,
// //   },
// //   dropdownItem: { padding: 10, fontWeight: 800, cursor: "pointer" },
// //   dropdownItemBtn: {
// //     padding: 10,
// //     border: "none",
// //     background: "transparent",
// //     width: "100%",
// //     textAlign: "left",
// //     fontWeight: 800,
// //     cursor: "pointer",
// //   },
// //   subMenu: {
// //     position: "absolute",
// //     left: "100%",
// //     top: 0,
// //     background: "#f3f3f3",
// //     padding: 10,
// //     borderRadius: 12,
// //     minWidth: 220,
// //   },
// //   subItem: {
// //     padding: 8,
// //     border: "none",
// //     background: "transparent",
// //     cursor: "pointer",
// //     fontWeight: 800,
// //     width: "100%",
// //     textAlign: "left",
// //   },

// //   /* MOBILE */
// //   hamburgerBtn: {
// //     display: "none",
// //     width: 40,
// //     height: 40,
// //     borderRadius: 10,
// //     border: "1px solid rgba(255,255,255,0.25)",
// //     background: "rgba(0,0,0,0.25)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     fontSize: 20,
// //   },
// //   mobileOverlay: {
// //     position: "fixed",
// //     inset: 0,
// //     background: "rgba(0,0,0,0.55)",
// //     zIndex: 998,
// //   },

// //   // ✅ RIGHT menu flush + full height
// //   mobileMenu: {
// //     position: "fixed",
// //     top: 0,
// //     right: 0,
// //     left: "auto",
// //     width: 320,
// //     maxWidth: "88vw",
// //     height: "100vh",
// //     background: "#111",
// //     color: "#fff",
// //     padding: 18,
// //     zIndex: 999,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 14,
// //     boxShadow: "-20px 0 50px rgba(0,0,0,0.45)",
// //     overflow: "hidden", // ✅ important
// //   },

// //   mobileTop: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingBottom: 12,
// //     borderBottom: "1px solid rgba(255,255,255,0.12)",
// //     flex: "0 0 auto",
// //   },

// //   closeBtn: {
// //     background: "transparent",
// //     border: "none",
// //     color: "#fff",
// //     fontSize: 18,
// //     cursor: "pointer",
// //     width: 36,
// //     height: 36,
// //     borderRadius: 10,
// //   },

// //   // ✅ THIS makes drawer scroll work (very important)
// //   mobileLinks: {
// //     flex: 1,
// //     minHeight: 0,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 12,
// //     overflowY: "auto",
// //     paddingRight: 6,
// //     paddingBottom: 10,
// //   },

// //   mobileLink: {
// //     color: "#fff",
// //     textDecoration: "none",
// //     fontWeight: 900,
// //     letterSpacing: 0.3,
// //     padding: "10px 10px",
// //     borderRadius: 10,
// //     background: "rgba(255,255,255,0.06)",
// //   },

// //   mobileCategoryBox: {
// //     borderRadius: 12,
// //     background: "rgba(255,255,255,0.06)",
// //     overflow: "hidden",
// //   },
// //   mobileCategoryHeader: {
// //     width: "100%",
// //     padding: "12px 12px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     border: "none",
// //     background: "rgba(255,255,255,0.08)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontSize: 14,
// //   },
// //   mobileCategoryBody: { padding: 12 },
// //   mobileCatRow: {
// //     width: "100%",
// //     padding: "10px 10px",
// //     borderRadius: 10,
// //     border: "none",
// //     background: "rgba(0,0,0,0.25)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },

// //   // ✅ If too many subcategories, this section can scroll
// //   mobileSubList: {
// //     marginTop: 10,
// //     paddingLeft: 6,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 8,
// //     maxHeight: 260,
// //     overflowY: "auto",
// //   },

// //   mobileSubBtn: {
// //     width: "100%",
// //     textAlign: "left",
// //     padding: "10px 10px",
// //     borderRadius: 10,
// //     border: "none",
// //     background: "rgba(255,255,255,0.06)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontWeight: 800,
// //     letterSpacing: 0.3,
// //   },
// //   mobileCatDirectBtn: {
// //     width: "100%",
// //     textAlign: "left",
// //     padding: "10px 10px",
// //     borderRadius: 10,
// //     border: "none",
// //     background: "rgba(0,0,0,0.18)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontWeight: 800,
// //     letterSpacing: 0.3,
// //     marginTop: 8,
// //   },  
// // };


// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { fetchCategoryTree } from "../services/storeApi";
// import type { CategoryNode } from "../services/storeApi";

// const LOGO_URL =
//   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

// export default function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [categories, setCategories] = useState<CategoryNode[]>([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileCatOpen, setMobileCatOpen] = useState(false);

//   // ✅ multiple open nodes in mobile (recursive expand)
//   const [mobileExpandedSlugs, setMobileExpandedSlugs] = useState<string[]>([]);

//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     fetchCategoryTree()
//       .then(setCategories)
//       .catch(() => setCategories([]));
//   }, []);

//   // ✅ close menu on route change
//   useEffect(() => {
//     setMobileOpen(false);
//     setShowCategories(false);
//     setOpenSubmenuSlug(null);
//     setMobileCatOpen(false);
//     setMobileExpandedSlugs([]);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   // ✅ body scroll lock when menu open
//   useEffect(() => {
//     if (!mobileOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [mobileOpen]);

//   // ✅ ESC close
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setMobileOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // ✅ click outside desktop dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!dropdownRef.current) return;
//       if (!dropdownRef.current.contains(event.target as Node)) {
//         setShowCategories(false);
//         setOpenSubmenuSlug(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const totalToolsParent = useMemo(() => {
//     const findInTree = (nodes: CategoryNode[]): CategoryNode | null => {
//       for (const n of nodes) {
//         if ((n.name || "").trim().toUpperCase() === TOTAL_TOOLS_PARENT_NAME) return n;
//         const sub = findInTree(n.children || []);
//         if (sub) return sub;
//       }
//       return null;
//     };
//     return findInTree(categories);
//   }, [categories]);

//   const topLevelCategories = useMemo(() => {
//     return categories.filter(
//       (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
//     );
//   }, [categories]);

//   const toggleMobileSubmenu = (slug: string) => {
//     setMobileExpandedSlugs((prev) =>
//       prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
//     );
//   };

//   function goCategory(slug: string) {
//     setShowCategories(false);
//     setOpenSubmenuSlug(null);
//     setMobileOpen(false);
//     setMobileCatOpen(false);
//     setMobileExpandedSlugs([]);
//     navigate(`/category/${slug}`);
//   }

//   // ✅ Recursive render for ALL levels (mobile)
//   const renderMobileCategory = (node: CategoryNode, level = 0) => {
//     const hasChildren = !!(node.children && node.children.length > 0);
//     const isExpanded = mobileExpandedSlugs.includes(node.slug);

//     return (
//       <div key={node.slug} style={{ marginLeft: level > 0 ? 12 : 0, marginBottom: 6 }}>
//         <button
//           type="button"
//           style={{
//             ...styles.mobileCatRow,
//             background: level === 0 ? "rgba(255,255,255,0.08)" : "transparent",
//             borderBottom: level === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
//           }}
//           onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node.slug))}
//         >
//           <span
//             style={{
//               fontWeight: level === 0 ? 900 : 700,
//               fontSize: level === 0 ? 14 : 13,
//               textAlign: "left",
//               flex: 1,
//             }}
//           >
//             {(node.name || "").toUpperCase()}
//           </span>
//           {hasChildren && <span style={{ opacity: 0.9 }}>{isExpanded ? "−" : "+"}</span>}
//         </button>

//         {hasChildren && isExpanded && (
//           <div
//             style={{
//               borderLeft: "1px solid rgba(255,255,255,0.10)",
//               marginLeft: 8,
//               paddingLeft: 6,
//               marginTop: 6,
//             }}
//           >
//             {node.children?.map((child) => renderMobileCategory(child, level + 1))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* ✅ Scoped CSS */}
//       <style>{`
//         @media (max-width: 900px){
//           .desktopNav { display: none !important; }
//           .desktopRightLinks { display: none !important; }
//           .mobileHamburger { display: inline-flex !important; }
//           .headerInner { padding: 0 16px !important; }
//         }

//         .drawerRight {
//           transform: translateX(100%);
//           transition: transform 240ms ease;
//           will-change: transform;
//         }
//         .drawerRightOpen { transform: translateX(0); }

//         .overlay {
//           opacity: 0;
//           transition: opacity 240ms ease;
//           pointer-events: none;
//         }
//         .overlayOpen {
//           opacity: 1;
//           pointer-events: auto;
//         }
//       `}</style>

//       {/* HEADER */}
//       <header style={styles.header}>
//         <div className="headerInner" style={styles.inner}>
//           {/* LEFT */}
//           <div style={styles.left}>
//             {/* MOBILE HAMBURGER */}
//             <button
//               type="button"
//               aria-label="Open menu"
//               className="mobileHamburger"
//               style={styles.hamburgerBtn}
//               onClick={() => setMobileOpen(true)}
//             >
//               ☰
//             </button>

//             <Link to="/" onClick={() => setMobileOpen(false)}>
//               <img src={LOGO_URL} alt="Logo" style={styles.logo} />
//             </Link>

//             {/* DESKTOP NAV */}
//             <nav className="desktopNav" style={styles.nav}>
//               <NavLink to="/">HOME</NavLink>
//               <NavLink to="/store">STORE</NavLink>

//               {/* DESKTOP CATEGORY DROPDOWN */}
//               <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
//                 <span style={styles.navLink} onClick={() => setShowCategories((p) => !p)}>
//                   CATEGORIES ⌄
//                 </span>

//                 {showCategories && (
//                   <div style={styles.dropdown}>
//                     {totalToolsParent && (
//                       <div style={{ position: "relative" }}>
//                         <div
//                           style={styles.dropdownItem}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setOpenSubmenuSlug((s) =>
//                               s === totalToolsParent.slug ? null : totalToolsParent.slug
//                             );
//                           }}
//                         >
//                           {TOTAL_TOOLS_PARENT_NAME} ›
//                         </div>

//                         {openSubmenuSlug === totalToolsParent.slug && (
//                           <div style={styles.subMenu}>
//                             {(totalToolsParent.children || []).map((child) => (
//                               <button
//                                 key={child.slug}
//                                 style={styles.subItem}
//                                 onClick={() => goCategory(child.slug)}
//                               >
//                                 {(child.name || "").toUpperCase()}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {topLevelCategories.map((c) => (
//                       <button
//                         key={c.slug}
//                         style={styles.dropdownItemBtn}
//                         onClick={() => goCategory(c.slug)}
//                       >
//                         {(c.name || "").toUpperCase()}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <NavLink to="/franchise">FRANCHISE</NavLink>
//               <NavLink to="/services">SERVICES</NavLink>
//               <NavLink to="/blog">BLOG</NavLink>
//             </nav>
//           </div>

//           {/* RIGHT */}
//           <div style={styles.right}>
//             <div className="desktopRightLinks" style={{ display: "flex", gap: 20, alignItems: "center" }}>
//               <NavLink to="/about">ABOUT</NavLink>
//               <NavLink to="/contact">CONTACT US</NavLink>
//               <span style={styles.price}>₹0.00</span>
//             </div>

//             <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
//               🛒
//               <span style={styles.badge}>0</span>
//             </div>

//             <div onClick={() => navigate("/my-account")} style={{ cursor: "pointer", color: "#fff" }}>
//               👤
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE OVERLAY + RIGHT DRAWER */}
//       {mobileOpen && (
//         <>
//           <div
//             className={`overlay ${mobileOpen ? "overlayOpen" : ""}`}
//             style={styles.mobileOverlay}
//             onClick={() => setMobileOpen(false)}
//           />

//           <div
//             className={`drawerRight ${mobileOpen ? "drawerRightOpen" : ""}`}
//             style={styles.mobileMenu}
//             role="dialog"
//             aria-modal="true"
//             aria-label="Mobile navigation"
//           >
//             <div style={styles.mobileTop}>
//               <span style={{ fontWeight: 900 }}>MENU</span>
//               <button style={styles.closeBtn} onClick={() => setMobileOpen(false)}>
//                 ✕
//               </button>
//             </div>

//             {/* ✅ Scroll Area (always works) */}
//             <div style={styles.mobileScrollArea}>
//               <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
//               <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
//               <MobileLink to="/cart" close={() => setMobileOpen(false)}>CART</MobileLink>
//               <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

//               {/* ✅ Category Accordion */}
//               <div style={{ marginTop: 14 }}>
//                 <button
//                   type="button"
//                   style={styles.mobileCategoryHeader}
//                   onClick={() => setMobileCatOpen((p) => !p)}
//                 >
//                   <span style={{ fontWeight: 900 }}>SHOP BY CATEGORY</span>
//                   <span style={{ opacity: 0.9 }}>{mobileCatOpen ? "−" : "+"}</span>
//                 </button>

//                 {mobileCatOpen && (
//                   <div style={{ marginTop: 10 }}>
//                     {/* OPTIONAL: TOTAL TOOLS first (like desktop) */}
//                     {totalToolsParent && renderMobileCategory(totalToolsParent, 0)}

//                     {/* Then other top-level categories */}
//                     {topLevelCategories.length > 0 ? (
//                       topLevelCategories.map((cat) => renderMobileCategory(cat, 0))
//                     ) : (
//                       <div style={{ padding: 10, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
//                         Loading categories...
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div style={styles.hr} />

//               <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
//               <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
//               <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
//               <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
//               <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
//               <MobileLink to="/dealer" close={() => setMobileOpen(false)}>DEALER</MobileLink>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// /* Reusable */
// function NavLink({ to, children }: any) {
//   return (
//     <Link to={to} style={styles.navLink}>
//       {children}
//     </Link>
//   );
// }

// function MobileLink({ to, children, close }: any) {
//   return (
//     <Link to={to} style={styles.mobileLink} onClick={close}>
//       {children}
//     </Link>
//   );
// }

// const styles: any = {
//   header: {
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     zIndex: 999,
//     background: "rgba(0,0,0,0.35)",
//     backdropFilter: "blur(4px)",
//   },
//   inner: {
//     height: 76,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 40px",
//     width: "100%",
//   },
//   left: { display: "flex", alignItems: "center", gap: 18 },
//   logo: { height: 40 },
//   nav: { display: "flex", gap: 24, alignItems: "center" },
//   navLink: { color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14, letterSpacing: 0.3 },
//   right: { display: "flex", alignItems: "center", gap: 16, color: "#fff" },
//   price: { color: "#fff", fontWeight: 800 },
//   iconWrap: { position: "relative", cursor: "pointer", color: "#fff" },
//   badge: {
//     position: "absolute",
//     top: -8,
//     right: -10,
//     width: 18,
//     height: 18,
//     borderRadius: 999,
//     background: "#fff",
//     color: "#000",
//     display: "grid",
//     placeItems: "center",
//     fontSize: 11,
//     fontWeight: 800,
//   },

//   dropdown: {
//     position: "absolute",
//     top: 40,
//     left: 0,
//     width: 260,
//     background: "#fff",
//     borderRadius: 16,
//     padding: 10,
//     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
//     zIndex: 1000,
//   },
//   dropdownItem: { padding: 10, fontWeight: 800, cursor: "pointer" },
//   dropdownItemBtn: { padding: 10, border: "none", background: "transparent", width: "100%", textAlign: "left", fontWeight: 800, cursor: "pointer" },
//   subMenu: { position: "absolute", left: "100%", top: 0, background: "#f3f3f3", padding: 10, borderRadius: 12, minWidth: 220 },
//   subItem: { padding: 8, border: "none", background: "transparent", cursor: "pointer", fontWeight: 800, width: "100%", textAlign: "left" },

//   hamburgerBtn: {
//     display: "none",
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     border: "1px solid rgba(255,255,255,0.25)",
//     background: "rgba(0,0,0,0.25)",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: 20,
//   },

//   mobileOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 998 },

//   mobileMenu: {
//     position: "fixed",
//     top: 0,
//     right: 0,
//     width: 320,
//     maxWidth: "88vw",
//     height: "100dvh",
//     background: "#111",
//     color: "#fff",
//     zIndex: 999,
//     display: "flex",
//     flexDirection: "column",
//     boxShadow: "-20px 0 50px rgba(0,0,0,0.45)",
//     overflow: "hidden",
//     padding: 0,
//   },

//   mobileTop: {
//     height: 64,
//     padding: "0 16px",
//     borderBottom: "1px solid rgba(255,255,255,0.12)",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flex: "0 0 auto",
//   },

//   closeBtn: {
//     background: "transparent",
//     border: "none",
//     color: "#fff",
//     fontSize: 18,
//     cursor: "pointer",
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//   },

//   // ✅ real scroll area
//   mobileScrollArea: {
//     flex: 1,
//     minHeight: 0,
//     overflowY: "auto",
//     WebkitOverflowScrolling: "touch",
//     overscrollBehavior: "contain",
//     touchAction: "pan-y",
//     padding: 16,
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//   },

//   mobileLink: {
//     display: "block",
//     color: "#fff",
//     textDecoration: "none",
//     fontWeight: 900,
//     letterSpacing: 0.3,
//     padding: "12px 12px",
//     borderRadius: 10,
//     background: "rgba(255,255,255,0.06)",
//   },

//   mobileCategoryHeader: {
//     width: "100%",
//     padding: "14px 12px",
//     borderRadius: 10,
//     border: "none",
//     background: "rgba(255,255,255,0.10)",
//     color: "#fff",
//     cursor: "pointer",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   mobileCatRow: {
//     width: "100%",
//     border: "none",
//     color: "#fff",
//     cursor: "pointer",
//     padding: "10px 10px",
//     borderRadius: 10,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     textAlign: "left",
//   },

//   hr: {
//     height: 1,
//     background: "rgba(255,255,255,0.08)",
//     width: "100%",
//     margin: "10px 0",
//   },
// };


import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchCategoryTree } from "../services/storeApi";
import { getCart } from "../services/cartApi";
import type { CategoryNode } from "../services/storeApi";

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileExpandedSlugs, setMobileExpandedSlugs] = useState<string[]>([]);

  const [cartCount, setCartCount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategoryTree()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    async function loadCartCount() {
      try {
        const cart = await getCart();
        const totalQty =
          cart?.items?.reduce(
            (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
            0
          ) || 0;
        setCartCount(totalQty);
      } catch {
        setCartCount(0);
      }
    }

    loadCartCount();
  }, [location.pathname]);

  useEffect(() => {
    const syncCartCount = async () => {
      try {
        const cart = await getCart();
        const totalQty =
          cart?.items?.reduce(
            (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
            0
          ) || 0;
        setCartCount(totalQty);
      } catch {
        setCartCount(0);
      }
    };

    window.addEventListener("focus", syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener("focus", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    setMobileCatOpen(false);
    setMobileExpandedSlugs([]);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setShowCategories(false);
        setOpenSubmenuSlug(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalToolsParent = useMemo(() => {
    const findInTree = (nodes: CategoryNode[]): CategoryNode | null => {
      for (const n of nodes) {
        if ((n.name || "").trim().toUpperCase() === TOTAL_TOOLS_PARENT_NAME) return n;
        const sub = findInTree(n.children || []);
        if (sub) return sub;
      }
      return null;
    };
    return findInTree(categories);
  }, [categories]);

  const topLevelCategories = useMemo(() => {
    return categories.filter(
      (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
    );
  }, [categories]);

  const toggleMobileSubmenu = (slug: string) => {
    setMobileExpandedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  function goCategory(slug: string) {
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    setMobileOpen(false);
    setMobileCatOpen(false);
    setMobileExpandedSlugs([]);
    navigate(`/category/${slug}`);
  }

  const renderMobileCategory = (node: CategoryNode, level = 0) => {
    const hasChildren = !!(node.children && node.children.length > 0);
    const isExpanded = mobileExpandedSlugs.includes(node.slug);

    return (
      <div key={node.slug} style={{ marginLeft: level > 0 ? 12 : 0, marginBottom: 6 }}>
        <button
          type="button"
          style={{
            ...styles.mobileCatRow,
            background: level === 0 ? "rgba(255,255,255,0.08)" : "transparent",
            borderBottom: level === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
          onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node.slug))}
        >
          <span
            style={{
              fontWeight: level === 0 ? 900 : 700,
              fontSize: level === 0 ? 14 : 13,
              textAlign: "left",
              flex: 1,
            }}
          >
            {(node.name || "").toUpperCase()}
          </span>
          {hasChildren && <span style={{ opacity: 0.9 }}>{isExpanded ? "−" : "+"}</span>}
        </button>

        {hasChildren && isExpanded && (
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.10)",
              marginLeft: 8,
              paddingLeft: 6,
              marginTop: 6,
            }}
          >
            {node.children?.map((child) => renderMobileCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        @media (max-width: 900px){
          .desktopNav { display: none !important; }
          .desktopRightLinks { display: none !important; }
          .mobileHamburger { display: inline-flex !important; }
          .headerInner { padding: 0 16px !important; }
        }

        .drawerRight {
          transform: translateX(100%);
          transition: transform 240ms ease;
          will-change: transform;
        }
        .drawerRightOpen { transform: translateX(0); }

        .overlay {
          opacity: 0;
          transition: opacity 240ms ease;
          pointer-events: none;
        }
        .overlayOpen {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>

      <header style={styles.header}>
        <div className="headerInner" style={styles.inner}>
          <div style={styles.left}>
            <button
              type="button"
              aria-label="Open menu"
              className="mobileHamburger"
              style={styles.hamburgerBtn}
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>

            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img src={LOGO_URL} alt="Logo" style={styles.logo} />
            </Link>

            <nav className="desktopNav" style={styles.nav}>
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/store">STORE</NavLink>

              <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
                <span style={styles.navLink} onClick={() => setShowCategories((p) => !p)}>
                  CATEGORIES ⌄
                </span>

                {showCategories && (
                  <div style={styles.dropdown}>
                    {totalToolsParent && (
                      <div style={{ position: "relative" }}>
                        <div
                          style={styles.dropdownItem}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSubmenuSlug((s) =>
                              s === totalToolsParent.slug ? null : totalToolsParent.slug
                            );
                          }}
                        >
                          {TOTAL_TOOLS_PARENT_NAME} ›
                        </div>

                        {openSubmenuSlug === totalToolsParent.slug && (
                          <div style={styles.subMenu}>
                            {(totalToolsParent.children || []).map((child) => (
                              <button
                                key={child.slug}
                                style={styles.subItem}
                                onClick={() => goCategory(child.slug)}
                              >
                                {(child.name || "").toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {topLevelCategories.map((c) => (
                      <button
                        key={c.slug}
                        style={styles.dropdownItemBtn}
                        onClick={() => goCategory(c.slug)}
                      >
                        {(c.name || "").toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/franchise">FRANCHISE</NavLink>
              <NavLink to="/services">SERVICES</NavLink>
              <NavLink to="/blog">BLOG</NavLink>
            </nav>
          </div>

          <div style={styles.right}>
            <div
              className="desktopRightLinks"
              style={{ display: "flex", gap: 20, alignItems: "center" }}
            >
              <NavLink to="/about">ABOUT</NavLink>
              <NavLink to="/contact">CONTACT US</NavLink>
              <span style={styles.price}>₹0.00</span>
            </div>

            <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
              🛒
              <span style={styles.badge}>{cartCount}</span>
            </div>

            <div
              onClick={() => navigate("/my-account")}
              style={{ cursor: "pointer", color: "#fff" }}
            >
              👤
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className={`overlay ${mobileOpen ? "overlayOpen" : ""}`}
            style={styles.mobileOverlay}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={`drawerRight ${mobileOpen ? "drawerRightOpen" : ""}`}
            style={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div style={styles.mobileTop}>
              <span style={{ fontWeight: 900 }}>MENU</span>
              <button style={styles.closeBtn} onClick={() => setMobileOpen(false)}>
                ✕
              </button>
            </div>

            <div style={styles.mobileScrollArea}>
              <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
              <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
              <MobileLink to="/cart" close={() => setMobileOpen(false)}>
                CART {cartCount > 0 ? `(${cartCount})` : ""}
              </MobileLink>
              <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

              <div style={{ marginTop: 14 }}>
                <button
                  type="button"
                  style={styles.mobileCategoryHeader}
                  onClick={() => setMobileCatOpen((p) => !p)}
                >
                  <span style={{ fontWeight: 900 }}>SHOP BY CATEGORY</span>
                  <span style={{ opacity: 0.9 }}>{mobileCatOpen ? "−" : "+"}</span>
                </button>

                {mobileCatOpen && (
                  <div style={{ marginTop: 10 }}>
                    {totalToolsParent && renderMobileCategory(totalToolsParent, 0)}

                    {topLevelCategories.length > 0 ? (
                      topLevelCategories.map((cat) => renderMobileCategory(cat, 0))
                    ) : (
                      <div
                        style={{
                          padding: 10,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Loading categories...
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={styles.hr} />

              <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
              <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
              <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
              <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
              <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
              <MobileLink to="/dealer" close={() => setMobileOpen(false)}>DEALER</MobileLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function NavLink({ to, children }: any) {
  return (
    <Link to={to} style={styles.navLink}>
      {children}
    </Link>
  );
}

function MobileLink({ to, children, close }: any) {
  return (
    <Link to={to} style={styles.mobileLink} onClick={close}>
      {children}
    </Link>
  );
}

const styles: any = {
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 999,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
  },
  inner: {
    height: 76,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    width: "100%",
    boxSizing: "border-box",
  },
  left: { display: "flex", alignItems: "center", gap: 18 },
  logo: { height: 40 },
  nav: { display: "flex", gap: 24, alignItems: "center" },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.3,
  },
  right: { display: "flex", alignItems: "center", gap: 16, color: "#fff" },
  price: { color: "#fff", fontWeight: 800 },
  iconWrap: {
    position: "relative",
    cursor: "pointer",
    color: "#fff",
    fontSize: 20,
    lineHeight: 1,
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -12,
    minWidth: 20,
    height: 20,
    padding: "0 5px",
    borderRadius: 999,
    background: "#fff",
    color: "#000",
    display: "grid",
    placeItems: "center",
    fontSize: 11,
    fontWeight: 800,
  },

  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 260,
    background: "#fff",
    borderRadius: 16,
    padding: 10,
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    zIndex: 1000,
  },
  dropdownItem: { padding: 10, fontWeight: 800, cursor: "pointer" },
  dropdownItemBtn: {
    padding: 10,
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
    fontWeight: 800,
    cursor: "pointer",
  },
  subMenu: {
    position: "absolute",
    left: "100%",
    top: 0,
    background: "#f3f3f3",
    padding: 10,
    borderRadius: 12,
    minWidth: 220,
  },
  subItem: {
    padding: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 800,
    width: "100%",
    textAlign: "left",
  },

  hamburgerBtn: {
    display: "none",
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 20,
  },

  mobileOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 998,
  },

  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 320,
    maxWidth: "88vw",
    height: "100dvh",
    background: "#111",
    color: "#fff",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    boxShadow: "-20px 0 50px rgba(0,0,0,0.45)",
    overflow: "hidden",
    padding: 0,
  },

  mobileTop: {
    height: 64,
    padding: "0 16px",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: "0 0 auto",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    width: 36,
    height: 36,
    borderRadius: 10,
  },

  mobileScrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    touchAction: "pan-y",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  mobileLink: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
    letterSpacing: 0.3,
    padding: "12px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.06)",
  },

  mobileCategoryHeader: {
    width: "100%",
    padding: "14px 12px",
    borderRadius: 10,
    border: "none",
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mobileCatRow: {
    width: "100%",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "10px 10px",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
  },

  hr: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    width: "100%",
    margin: "10px 0",
  },
};