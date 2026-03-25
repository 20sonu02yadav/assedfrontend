// // // import { useEffect, useMemo, useRef, useState } from "react";
// // // import { Link, useLocation, useNavigate } from "react-router-dom";
// // // import { fetchCategoryTree, fetchProducts } from "../services/storeApi";
// // // import { getCart as getServerCart } from "../services/cartApi";
// // // import { getCartCount as getLocalCartCount } from "../services/cart";
// // // import { getStoredAccessToken } from "../services/api";
// // // import type { CategoryNode, ProductListItem } from "../services/storeApi";

// // // const LOGO_URL =
// // //   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// // // const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

// // // type FlatCategoryNode = CategoryNode & {
// // //   level?: number;
// // // };

// // // export default function Header() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [categories, setCategories] = useState<CategoryNode[]>([]);
// // //   const [showCategories, setShowCategories] = useState(false);
// // //   const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

// // //   const [mobileOpen, setMobileOpen] = useState(false);
// // //   const [mobileCatOpen, setMobileCatOpen] = useState(false);
// // //   const [mobileExpandedSlugs, setMobileExpandedSlugs] = useState<string[]>([]);

// // //   const [cartCount, setCartCount] = useState(0);

// // //   const [search, setSearch] = useState("");
// // //   const [searchBusy, setSearchBusy] = useState(false);
// // //   const [searchResults, setSearchResults] = useState<ProductListItem[]>([]);
// // //   const [showSearchResults, setShowSearchResults] = useState(false);

// // //   const dropdownRef = useRef<HTMLDivElement | null>(null);
// // //   const searchRef = useRef<HTMLDivElement | null>(null);

// // //   useEffect(() => {
// // //     fetchCategoryTree()
// // //       .then((data) => setCategories(Array.isArray(data) ? data : []))
// // //       .catch(() => setCategories([]));
// // //   }, []);

// // //   async function loadCartCount() {
// // //     const token = getStoredAccessToken();

// // //     if (token) {
// // //       try {
// // //         const cart = await getServerCart();
// // //         const totalQty =
// // //           cart?.items?.reduce(
// // //             (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
// // //             0
// // //           ) || 0;

// // //         setCartCount(totalQty);
// // //         return;
// // //       } catch {
// // //         setCartCount(0);
// // //         return;
// // //       }
// // //     }

// // //     setCartCount(getLocalCartCount());
// // //   }

// // //   useEffect(() => {
// // //     loadCartCount();
// // //   }, [location.pathname]);

// // //   useEffect(() => {
// // //     const syncCartCount = () => {
// // //       loadCartCount();
// // //     };

// // //     window.addEventListener("focus", syncCartCount);
// // //     window.addEventListener("storage", syncCartCount);
// // //     window.addEventListener("cart:changed", syncCartCount);

// // //     return () => {
// // //       window.removeEventListener("focus", syncCartCount);
// // //       window.removeEventListener("storage", syncCartCount);
// // //       window.removeEventListener("cart:changed", syncCartCount);
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     setMobileOpen(false);
// // //     setShowCategories(false);
// // //     setOpenSubmenuSlug(null);
// // //     setMobileCatOpen(false);
// // //     setMobileExpandedSlugs([]);
// // //     setShowSearchResults(false);
// // //   }, [location.pathname]);

// // //   useEffect(() => {
// // //     if (!mobileOpen) return;
// // //     const prev = document.body.style.overflow;
// // //     document.body.style.overflow = "hidden";
// // //     return () => {
// // //       document.body.style.overflow = prev;
// // //     };
// // //   }, [mobileOpen]);

// // //   useEffect(() => {
// // //     const onKey = (e: KeyboardEvent) => {
// // //       if (e.key === "Escape") {
// // //         setMobileOpen(false);
// // //         setShowCategories(false);
// // //         setShowSearchResults(false);
// // //       }
// // //     };
// // //     window.addEventListener("keydown", onKey);
// // //     return () => window.removeEventListener("keydown", onKey);
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setShowCategories(false);
// // //         setOpenSubmenuSlug(null);
// // //       }

// // //       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
// // //         setShowSearchResults(false);
// // //       }
// // //     };

// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const flatCategories = useMemo(() => {
// // //     const out: FlatCategoryNode[] = [];

// // //     const walk = (nodes: CategoryNode[], level = 0) => {
// // //       nodes.forEach((node) => {
// // //         out.push({ ...node, level });
// // //         if (node.children?.length) {
// // //           walk(node.children, level + 1);
// // //         }
// // //       });
// // //     };

// // //     walk(categories, 0);
// // //     return out;
// // //   }, [categories]);

// // //   const categoryMap = useMemo(() => {
// // //     const map = new Map<number, FlatCategoryNode>();
// // //     flatCategories.forEach((cat) => map.set(cat.id, cat));
// // //     return map;
// // //   }, [flatCategories]);

// // //   const totalToolsParent = useMemo(() => {
// // //     const findInTree = (nodes: CategoryNode[]): CategoryNode | null => {
// // //       for (const n of nodes) {
// // //         if ((n.name || "").trim().toUpperCase() === TOTAL_TOOLS_PARENT_NAME) return n;
// // //         const sub = findInTree(n.children || []);
// // //         if (sub) return sub;
// // //       }
// // //       return null;
// // //     };
// // //     return findInTree(categories);
// // //   }, [categories]);

// // //   const topLevelCategories = useMemo(() => {
// // //     return categories.filter(
// // //       (c) => (c.name || "").trim().toUpperCase() !== TOTAL_TOOLS_PARENT_NAME
// // //     );
// // //   }, [categories]);

// // //   const categorySuggestions = useMemo(() => {
// // //     const q = search.trim().toLowerCase();
// // //     if (!q) return [];
// // //     return flatCategories
// // //       .filter((cat) => (cat.name || "").toLowerCase().includes(q))
// // //       .slice(0, 6);
// // //   }, [search, flatCategories]);

// // //   useEffect(() => {
// // //     const q = search.trim();

// // //     if (!q) {
// // //       setSearchResults([]);
// // //       return;
// // //     }

// // //     const timer = setTimeout(async () => {
// // //       try {
// // //         setSearchBusy(true);
// // //         const data = await fetchProducts();
// // //         const filtered = (Array.isArray(data) ? data : [])
// // //           .filter((p) => {
// // //             const title = (p.title || "").toLowerCase();
// // //             const brand = (p.brand || "").toLowerCase();
// // //             const cat = (p.category_name || "").toLowerCase();
// // //             const sub = (p.short_category_label || "").toLowerCase();
// // //             const query = q.toLowerCase();

// // //             return (
// // //               title.includes(query) ||
// // //               brand.includes(query) ||
// // //               cat.includes(query) ||
// // //               sub.includes(query)
// // //             );
// // //           })
// // //           .slice(0, 8);

// // //         setSearchResults(filtered);
// // //       } catch {
// // //         setSearchResults([]);
// // //       } finally {
// // //         setSearchBusy(false);
// // //       }
// // //     }, 350);

// // //     return () => clearTimeout(timer);
// // //   }, [search]);

// // //   const toggleMobileSubmenu = (slug: string) => {
// // //     setMobileExpandedSlugs((prev) =>
// // //       prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
// // //     );
// // //   };

// // //   function goCategory(node: CategoryNode) {
// // //     setShowCategories(false);
// // //     setOpenSubmenuSlug(null);
// // //     setMobileOpen(false);
// // //     setMobileCatOpen(false);
// // //     setMobileExpandedSlugs([]);
// // //     setShowSearchResults(false);

// // //     if (node.parent) {
// // //       const parentNode = categoryMap.get(node.parent);
// // //       navigate(
// // //         `/store?subcategory=${encodeURIComponent(node.slug)}${
// // //           parentNode ? `&parent=${encodeURIComponent(parentNode.slug)}` : ""
// // //         }`
// // //       );
// // //       return;
// // //     }

// // //     navigate(`/store?category=${encodeURIComponent(node.slug)}`);
// // //   }

// // //   function onSearchSubmit(e?: React.FormEvent) {
// // //     e?.preventDefault();

// // //     const q = search.trim();
// // //     if (!q) return;

// // //     setShowSearchResults(false);
// // //     navigate(`/store?search=${encodeURIComponent(q)}`);
// // //   }

// // //   function goProduct(slug: string) {
// // //     setShowSearchResults(false);
// // //     setSearch("");
// // //     navigate(`/product/${slug}`);
// // //   }

// // //   const renderMobileCategory = (node: CategoryNode, level = 0) => {
// // //     const hasChildren = !!(node.children && node.children.length > 0);
// // //     const isExpanded = mobileExpandedSlugs.includes(node.slug);

// // //     return (
// // //       <div key={node.slug} style={{ marginLeft: level > 0 ? 12 : 0, marginBottom: 6 }}>
// // //         <button
// // //           type="button"
// // //           style={{
// // //             ...styles.mobileCatRow,
// // //             background: level === 0 ? "rgba(255,255,255,0.08)" : "transparent",
// // //             borderBottom: level === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
// // //           }}
// // //           onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node))}
// // //         >
// // //           <span
// // //             style={{
// // //               fontWeight: level === 0 ? 900 : 700,
// // //               fontSize: level === 0 ? 14 : 13,
// // //               textAlign: "left",
// // //               flex: 1,
// // //             }}
// // //           >
// // //             {(node.name || "").toUpperCase()}
// // //           </span>
// // //           {hasChildren && <span style={{ opacity: 0.9 }}>{isExpanded ? "−" : "+"}</span>}
// // //         </button>

// // //         {hasChildren && isExpanded && (
// // //           <div
// // //             style={{
// // //               borderLeft: "1px solid rgba(255,255,255,0.10)",
// // //               marginLeft: 8,
// // //               paddingLeft: 6,
// // //               marginTop: 6,
// // //             }}
// // //           >
// // //             <button
// // //               type="button"
// // //               style={{
// // //                 ...styles.mobileCatRow,
// // //                 background: "rgba(255,255,255,0.04)",
// // //                 fontWeight: 800,
// // //               }}
// // //               onClick={() => goCategory(node)}
// // //             >
// // //               VIEW ALL {(node.name || "").toUpperCase()}
// // //             </button>

// // //             {node.children?.map((child) => renderMobileCategory(child, level + 1))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @media (max-width: 1100px){
// // //           .desktopNav { display: none !important; }
// // //           .desktopRightLinks { display: none !important; }
// // //           .desktopSearch { display: none !important; }
// // //           .mobileHamburger { display: inline-flex !important; }
// // //           .headerInner { padding: 0 16px !important; }
// // //         }

// // //         .drawerRight {
// // //           transform: translateX(100%);
// // //           transition: transform 240ms ease;
// // //           will-change: transform;
// // //         }
// // //         .drawerRightOpen { transform: translateX(0); }

// // //         .overlay {
// // //           opacity: 0;
// // //           transition: opacity 240ms ease;
// // //           pointer-events: none;
// // //         }
// // //         .overlayOpen {
// // //           opacity: 1;
// // //           pointer-events: auto;
// // //         }
// // //       `}</style>

// // //       <header style={styles.header}>
// // //         <div className="headerInner" style={styles.inner}>
// // //           <div style={styles.left}>
// // //             <button
// // //               type="button"
// // //               aria-label="Open menu"
// // //               className="mobileHamburger"
// // //               style={styles.hamburgerBtn}
// // //               onClick={() => setMobileOpen(true)}
// // //             >
// // //               ☰
// // //             </button>

// // //             <Link to="/" onClick={() => setMobileOpen(false)}>
// // //               <img src={LOGO_URL} alt="Logo" style={styles.logo} />
// // //             </Link>

// // //             <nav className="desktopNav" style={styles.nav}>
// // //               <NavLink to="/">HOME</NavLink>
// // //               <NavLink to="/store">STORE</NavLink>

// // //               <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
// // //                 <span style={styles.navLink} onClick={() => setShowCategories((p) => !p)}>
// // //                   CATEGORIES ⌄
// // //                 </span>

// // //                 {showCategories && (
// // //                   <div style={styles.dropdown}>
// // //                     {totalToolsParent && (
// // //                       <div style={{ position: "relative" }}>
// // //                         <div
// // //                           style={styles.dropdownItem}
// // //                           onClick={(e) => {
// // //                             e.stopPropagation();
// // //                             setOpenSubmenuSlug((s) =>
// // //                               s === totalToolsParent.slug ? null : totalToolsParent.slug
// // //                             );
// // //                           }}
// // //                         >
// // //                           {TOTAL_TOOLS_PARENT_NAME} ›
// // //                         </div>

// // //                         {openSubmenuSlug === totalToolsParent.slug && (
// // //                           <div style={styles.subMenu}>
// // //                             <button
// // //                               style={{ ...styles.subItem, fontWeight: 900 }}
// // //                               onClick={() => goCategory(totalToolsParent)}
// // //                             >
// // //                               VIEW ALL {TOTAL_TOOLS_PARENT_NAME}
// // //                             </button>

// // //                             {(totalToolsParent.children || []).map((child) => (
// // //                               <button
// // //                                 key={child.slug}
// // //                                 style={styles.subItem}
// // //                                 onClick={() => goCategory(child)}
// // //                               >
// // //                                 {(child.name || "").toUpperCase()}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     )}

// // //                     {topLevelCategories.map((c) => (
// // //                       <div key={c.slug} style={{ position: "relative" }}>
// // //                         <button
// // //                           style={styles.dropdownItemBtn}
// // //                           onClick={() => {
// // //                             if (c.children?.length) {
// // //                               setOpenSubmenuSlug((s) => (s === c.slug ? null : c.slug));
// // //                             } else {
// // //                               goCategory(c);
// // //                             }
// // //                           }}
// // //                         >
// // //                           {(c.name || "").toUpperCase()} {c.children?.length ? "›" : ""}
// // //                         </button>

// // //                         {openSubmenuSlug === c.slug && c.children?.length ? (
// // //                           <div style={styles.subMenu}>
// // //                             <button
// // //                               style={{ ...styles.subItem, fontWeight: 900 }}
// // //                               onClick={() => goCategory(c)}
// // //                             >
// // //                               VIEW ALL {(c.name || "").toUpperCase()}
// // //                             </button>

// // //                             {c.children.map((child) => (
// // //                               <button
// // //                                 key={child.slug}
// // //                                 style={styles.subItem}
// // //                                 onClick={() => goCategory(child)}
// // //                               >
// // //                                 {(child.name || "").toUpperCase()}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         ) : null}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <NavLink to="/franchise">FRANCHISE</NavLink>
// // //               <NavLink to="/services">SERVICES</NavLink>
// // //               <NavLink to="/blog">BLOG</NavLink>
// // //             </nav>
// // //           </div>

// // //           <div style={styles.right}>
// // //             <div ref={searchRef} className="desktopSearch" style={styles.searchWrap}>
// // //               <form onSubmit={onSearchSubmit} style={styles.searchForm}>
// // //                 <input
// // //                   value={search}
// // //                   onChange={(e) => {
// // //                     setSearch(e.target.value);
// // //                     setShowSearchResults(true);
// // //                   }}
// // //                   onFocus={() => {
// // //                     if (search.trim()) setShowSearchResults(true);
// // //                   }}
// // //                   placeholder="Search products / category..."
// // //                   style={styles.searchInput}
// // //                 />
// // //                 <button type="submit" style={styles.searchBtn}>
// // //                   🔍
// // //                 </button>
// // //               </form>

// // //               {showSearchResults && search.trim() && (
// // //                 <div style={styles.searchDropdown}>
// // //                   {categorySuggestions.length > 0 && (
// // //                     <>
// // //                       <div style={styles.searchSectionTitle}>Categories</div>
// // //                       {categorySuggestions.map((cat) => (
// // //                         <button
// // //                           key={`cat-${cat.id}`}
// // //                           style={styles.searchItem}
// // //                           onClick={() => {
// // //                             setSearch(cat.name);
// // //                             goCategory(cat);
// // //                           }}
// // //                         >
// // //                           📁 {cat.name}
// // //                         </button>
// // //                       ))}
// // //                     </>
// // //                   )}

// // //                   <div style={styles.searchSectionTitle}>Products</div>

// // //                   {searchBusy ? (
// // //                     <div style={styles.searchEmpty}>Searching...</div>
// // //                   ) : searchResults.length > 0 ? (
// // //                     searchResults.map((item) => (
// // //                       <button
// // //                         key={`prod-${item.id}`}
// // //                         style={styles.searchItem}
// // //                         onClick={() => goProduct(item.slug)}
// // //                       >
// // //                         <img
// // //                           src={
// // //                             item.image ||
// // //                             "https://dummyimage.com/60x60/f3f4f6/111827&text=No+Image"
// // //                           }
// // //                           alt={item.title}
// // //                           style={styles.searchThumb}
// // //                         />
// // //                         <div style={{ flex: 1, textAlign: "left" }}>
// // //                           <div style={styles.searchItemTitle}>{item.title}</div>
// // //                           <div style={styles.searchItemMeta}>
// // //                             {item.short_category_label || item.category_name}
// // //                           </div>
// // //                         </div>
// // //                       </button>
// // //                     ))
// // //                   ) : (
// // //                     <div style={styles.searchEmpty}>No results found</div>
// // //                   )}

// // //                   <button
// // //                     style={{ ...styles.searchItem, justifyContent: "center", fontWeight: 900 }}
// // //                     onClick={onSearchSubmit}
// // //                   >
// // //                     VIEW ALL RESULTS
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div
// // //               className="desktopRightLinks"
// // //               style={{ display: "flex", gap: 20, alignItems: "center" }}
// // //             >
// // //               <NavLink to="/about">ABOUT</NavLink>
// // //               <NavLink to="/contact">CONTACT US</NavLink>
// // //               <NavLink to="https://attenbackend.clickconnectmedia.cloud/admin/">
// // //   Admin Login
// // // </NavLink>
// // //               <span style={styles.price}>₹0.00</span>
// // //             </div>

// // //             <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
// // //               🛒
// // //               <span style={styles.badge}>{cartCount}</span>
// // //             </div>

// // //             <div
// // //               onClick={() => navigate("/my-account")}
// // //               style={{ cursor: "pointer", color: "#fff" }}
// // //             >
// // //               👤
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {mobileOpen && (
// // //         <>
// // //           <div
// // //             className={`overlay ${mobileOpen ? "overlayOpen" : ""}`}
// // //             style={styles.mobileOverlay}
// // //             onClick={() => setMobileOpen(false)}
// // //           />

// // //           <div
// // //             className={`drawerRight ${mobileOpen ? "drawerRightOpen" : ""}`}
// // //             style={styles.mobileMenu}
// // //             role="dialog"
// // //             aria-modal="true"
// // //             aria-label="Mobile navigation"
// // //           >
// // //             <div style={styles.mobileTop}>
// // //               <span style={{ fontWeight: 900 }}>MENU</span>
// // //               <button style={styles.closeBtn} onClick={() => setMobileOpen(false)}>
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div style={styles.mobileScrollArea}>
// // //               <form
// // //                 onSubmit={(e) => {
// // //                   e.preventDefault();
// // //                   setMobileOpen(false);
// // //                   onSearchSubmit();
// // //                 }}
// // //                 style={styles.mobileSearchForm}
// // //               >
// // //                 <input
// // //                   value={search}
// // //                   onChange={(e) => setSearch(e.target.value)}
// // //                   placeholder="Search products..."
// // //                   style={styles.mobileSearchInput}
// // //                 />
// // //                 <button type="submit" style={styles.mobileSearchBtn}>
// // //                   🔍
// // //                 </button>
// // //               </form>

// // //               <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
// // //               <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
// // //               <MobileLink to="/cart" close={() => setMobileOpen(false)}>
// // //                 CART {cartCount > 0 ? `(${cartCount})` : ""}
// // //               </MobileLink>
// // //               <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

// // //               <div style={{ marginTop: 14 }}>
// // //                 <button
// // //                   type="button"
// // //                   style={styles.mobileCategoryHeader}
// // //                   onClick={() => setMobileCatOpen((p) => !p)}
// // //                 >
// // //                   <span style={{ fontWeight: 900 }}>SHOP BY CATEGORY</span>
// // //                   <span style={{ opacity: 0.9 }}>{mobileCatOpen ? "−" : "+"}</span>
// // //                 </button>

// // //                 {mobileCatOpen && (
// // //                   <div style={{ marginTop: 10 }}>
// // //                     {totalToolsParent && renderMobileCategory(totalToolsParent, 0)}

// // //                     {topLevelCategories.length > 0 ? (
// // //                       topLevelCategories.map((cat) => renderMobileCategory(cat, 0))
// // //                     ) : (
// // //                       <div
// // //                         style={{
// // //                           padding: 10,
// // //                           fontSize: 12,
// // //                           color: "rgba(255,255,255,0.6)",
// // //                         }}
// // //                       >
// // //                         Loading categories...
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div style={styles.hr} />

// // //               <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
// // //               <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
// // //               <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
// // //               <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
// // //               <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
// // //               <MobileLink to="/dealer" close={() => setMobileOpen(false)}>DEALER</MobileLink>
// // //               <MobileLink to="https://attenbackend.clickconnectmedia.cloud/admin/" close={() => setMobileOpen(false)}>ADMIN LOGIN</MobileLink>
              
// // //             </div>
// // //           </div>
// // //         </>
// // //       )}
// // //     </>
// // //   );
// // // }

// // // function NavLink({ to, children }: any) {
// // //   return (
// // //     <Link to={to} style={styles.navLink}>
// // //       {children}
// // //     </Link>
// // //   );
// // // }

// // // function MobileLink({ to, children, close }: any) {
// // //   return (
// // //     <Link to={to} style={styles.mobileLink} onClick={close}>
// // //       {children}
// // //     </Link>
// // //   );
// // // }

// // // const styles: any = {
// // //   header: {
// // //     position: "absolute",
// // //     top: 0,
// // //     width: "100%",
// // //     zIndex: 999,
// // //     background: "rgba(0,0,0,0.35)",
// // //     backdropFilter: "blur(4px)",
// // //   },
// // //   inner: {
// // //     height: 76,
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     padding: "0 40px",
// // //     width: "100%",
// // //     boxSizing: "border-box",
// // //     gap: 16,
// // //   },
// // //   left: { display: "flex", alignItems: "center", gap: 18, minWidth: 0 },
// // //   logo: { height: 40 },
// // //   nav: { display: "flex", gap: 24, alignItems: "center" },
// // //   navLink: {
// // //     color: "#fff",
// // //     textDecoration: "none",
// // //     fontWeight: 700,
// // //     fontSize: 14,
// // //     letterSpacing: 0.3,
// // //     whiteSpace: "nowrap",
// // //   },
// // //   right: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 16,
// // //     color: "#fff",
// // //     minWidth: 0,
// // //   },
// // //   price: { color: "#fff", fontWeight: 800 },
// // //   iconWrap: {
// // //     position: "relative",
// // //     cursor: "pointer",
// // //     color: "#fff",
// // //     fontSize: 20,
// // //     lineHeight: 1,
// // //   },
// // //   badge: {
// // //     position: "absolute",
// // //     top: -10,
// // //     right: -12,
// // //     minWidth: 20,
// // //     height: 20,
// // //     padding: "0 5px",
// // //     borderRadius: 999,
// // //     background: "#fff",
// // //     color: "#000",
// // //     display: "grid",
// // //     placeItems: "center",
// // //     fontSize: 11,
// // //     fontWeight: 800,
// // //   },

// // //   searchWrap: {
// // //     position: "relative",
// // //     width: 320,
// // //   },
// // //   searchForm: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     background: "rgba(255,255,255,0.14)",
// // //     border: "1px solid rgba(255,255,255,0.25)",
// // //     borderRadius: 999,
// // //     overflow: "hidden",
// // //   },
// // //   searchInput: {
// // //     flex: 1,
// // //     height: 40,
// // //     border: "none",
// // //     outline: "none",
// // //     background: "transparent",
// // //     color: "#fff",
// // //     padding: "0 14px",
// // //     fontSize: 14,
// // //   },
// // //   searchBtn: {
// // //     width: 42,
// // //     height: 40,
// // //     border: "none",
// // //     background: "transparent",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //     fontSize: 16,
// // //   },
// // //   searchDropdown: {
// // //     position: "absolute",
// // //     top: 48,
// // //     left: 0,
// // //     width: "100%",
// // //     background: "#fff",
// // //     borderRadius: 16,
// // //     padding: 10,
// // //     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
// // //     zIndex: 1200,
// // //     maxHeight: 430,
// // //     overflowY: "auto",
// // //   },
// // //   searchSectionTitle: {
// // //     fontSize: 12,
// // //     fontWeight: 900,
// // //     color: "#64748b",
// // //     textTransform: "uppercase",
// // //     padding: "8px 10px 6px",
// // //   },
// // //   searchItem: {
// // //     width: "100%",
// // //     border: "none",
// // //     background: "transparent",
// // //     padding: 10,
// // //     borderRadius: 12,
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 10,
// // //     cursor: "pointer",
// // //     textAlign: "left",
// // //   },
// // //   searchThumb: {
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 8,
// // //     objectFit: "contain",
// // //     background: "#f8fafc",
// // //     border: "1px solid #e5e7eb",
// // //     flexShrink: 0,
// // //   },
// // //   searchItemTitle: {
// // //     fontSize: 13,
// // //     fontWeight: 800,
// // //     color: "#111827",
// // //     lineHeight: 1.35,
// // //   },
// // //   searchItemMeta: {
// // //     fontSize: 12,
// // //     color: "#6b7280",
// // //     marginTop: 2,
// // //   },
// // //   searchEmpty: {
// // //     padding: 12,
// // //     fontSize: 13,
// // //     color: "#6b7280",
// // //   },

// // //   dropdown: {
// // //     position: "absolute",
// // //     top: 40,
// // //     left: 0,
// // //     width: 260,
// // //     background: "#fff",
// // //     borderRadius: 16,
// // //     padding: 10,
// // //     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
// // //     zIndex: 1000,
// // //   },
// // //   dropdownItem: {
// // //     padding: 10,
// // //     fontWeight: 800,
// // //     cursor: "pointer",
// // //     color: "#111827",
// // //   },
// // //   dropdownItemBtn: {
// // //     padding: 10,
// // //     border: "none",
// // //     background: "transparent",
// // //     width: "100%",
// // //     textAlign: "left",
// // //     fontWeight: 800,
// // //     cursor: "pointer",
// // //     color: "#111827",
// // //   },
// // //   subMenu: {
// // //     position: "absolute",
// // //     left: "100%",
// // //     top: 0,
// // //     background: "#f3f3f3",
// // //     padding: 10,
// // //     borderRadius: 12,
// // //     minWidth: 240,
// // //     boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
// // //   },
// // //   subItem: {
// // //     padding: 8,
// // //     border: "none",
// // //     background: "transparent",
// // //     cursor: "pointer",
// // //     fontWeight: 800,
// // //     width: "100%",
// // //     textAlign: "left",
// // //     color: "#111827",
// // //   },

// // //   hamburgerBtn: {
// // //     display: "none",
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 10,
// // //     border: "1px solid rgba(255,255,255,0.25)",
// // //     background: "rgba(0,0,0,0.25)",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //     fontSize: 20,
// // //   },

// // //   mobileOverlay: {
// // //     position: "fixed",
// // //     inset: 0,
// // //     background: "rgba(0,0,0,0.6)",
// // //     zIndex: 998,
// // //   },

// // //   mobileMenu: {
// // //     position: "fixed",
// // //     top: 0,
// // //     right: 0,
// // //     width: 320,
// // //     maxWidth: "88vw",
// // //     height: "100dvh",
// // //     background: "#111",
// // //     color: "#fff",
// // //     zIndex: 999,
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     boxShadow: "-20px 0 50px rgba(0,0,0,0.45)",
// // //     overflow: "hidden",
// // //     padding: 0,
// // //   },

// // //   mobileTop: {
// // //     height: 64,
// // //     padding: "0 16px",
// // //     borderBottom: "1px solid rgba(255,255,255,0.12)",
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     flex: "0 0 auto",
// // //   },

// // //   closeBtn: {
// // //     background: "transparent",
// // //     border: "none",
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     cursor: "pointer",
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 10,
// // //   },

// // //   mobileScrollArea: {
// // //     flex: 1,
// // //     minHeight: 0,
// // //     overflowY: "auto",
// // //     WebkitOverflowScrolling: "touch",
// // //     overscrollBehavior: "contain",
// // //     touchAction: "pan-y",
// // //     padding: 16,
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: 10,
// // //   },

// // //   mobileSearchForm: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     background: "rgba(255,255,255,0.08)",
// // //     border: "1px solid rgba(255,255,255,0.12)",
// // //     borderRadius: 12,
// // //     overflow: "hidden",
// // //     marginBottom: 6,
// // //   },
// // //   mobileSearchInput: {
// // //     flex: 1,
// // //     height: 42,
// // //     border: "none",
// // //     outline: "none",
// // //     background: "transparent",
// // //     color: "#fff",
// // //     padding: "0 12px",
// // //     fontSize: 14,
// // //   },
// // //   mobileSearchBtn: {
// // //     width: 46,
// // //     height: 42,
// // //     border: "none",
// // //     background: "transparent",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //   },

// // //   mobileLink: {
// // //     display: "block",
// // //     color: "#fff",
// // //     textDecoration: "none",
// // //     fontWeight: 900,
// // //     letterSpacing: 0.3,
// // //     padding: "12px 12px",
// // //     borderRadius: 10,
// // //     background: "rgba(255,255,255,0.06)",
// // //   },

// // //   mobileCategoryHeader: {
// // //     width: "100%",
// // //     padding: "14px 12px",
// // //     borderRadius: 10,
// // //     border: "none",
// // //     background: "rgba(255,255,255,0.10)",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //   },

// // //   mobileCatRow: {
// // //     width: "100%",
// // //     border: "none",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //     padding: "10px 10px",
// // //     borderRadius: 10,
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     textAlign: "left",
// // //   },

// // //   hr: {
// // //     height: 1,
// // //     background: "rgba(255,255,255,0.08)",
// // //     width: "100%",
// // //     margin: "10px 0",
// // //   },
// // // };

// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { fetchCategoryTree, fetchProducts } from "../services/storeApi";
// // import { getCart as getServerCart } from "../services/cartApi";
// // import { getCartCount as getLocalCartCount } from "../services/cart";
// // import { getStoredAccessToken } from "../services/api";
// // import type { CategoryNode, ProductListItem } from "../services/storeApi";

// // const LOGO_URL =
// //   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// // const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

// // type FlatCategoryNode = CategoryNode & {
// //   level?: number;
// // };

// // export default function Header() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [categories, setCategories] = useState<CategoryNode[]>([]);
// //   const [showCategories, setShowCategories] = useState(false);
// //   const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [mobileCatOpen, setMobileCatOpen] = useState(false);
// //   const [mobileExpandedSlugs, setMobileExpandedSlugs] = useState<string[]>([]);

// //   const [cartCount, setCartCount] = useState(0);

// //   const [search, setSearch] = useState("");
// //   const [searchBusy, setSearchBusy] = useState(false);
// //   const [searchResults, setSearchResults] = useState<ProductListItem[]>([]);
// //   const [showSearchResults, setShowSearchResults] = useState(false);
// //   const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);

// //   const dropdownRef = useRef<HTMLDivElement | null>(null);
// //   const searchRef = useRef<HTMLDivElement | null>(null);
// //   const mobileSearchRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     fetchCategoryTree()
// //       .then((data) => setCategories(Array.isArray(data) ? data : []))
// //       .catch(() => setCategories([]));
// //   }, []);

// //   async function loadCartCount() {
// //     const token = getStoredAccessToken();

// //     if (token) {
// //       try {
// //         const cart = await getServerCart();
// //         const totalQty =
// //           cart?.items?.reduce(
// //             (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
// //             0
// //           ) || 0;

// //         setCartCount(totalQty);
// //         return;
// //       } catch {
// //         setCartCount(0);
// //         return;
// //       }
// //     }

// //     setCartCount(getLocalCartCount());
// //   }

// //   useEffect(() => {
// //     loadCartCount();
// //   }, [location.pathname]);

// //   useEffect(() => {
// //     const syncCartCount = () => {
// //       loadCartCount();
// //     };

// //     window.addEventListener("focus", syncCartCount);
// //     window.addEventListener("storage", syncCartCount);
// //     window.addEventListener("cart:changed", syncCartCount);

// //     return () => {
// //       window.removeEventListener("focus", syncCartCount);
// //       window.removeEventListener("storage", syncCartCount);
// //       window.removeEventListener("cart:changed", syncCartCount);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     setMobileOpen(false);
// //     setShowCategories(false);
// //     setOpenSubmenuSlug(null);
// //     setMobileCatOpen(false);
// //     setMobileExpandedSlugs([]);
// //     setShowSearchResults(false);
// //     setShowMobileSearchResults(false);
// //   }, [location.pathname]);

// //   useEffect(() => {
// //     if (!mobileOpen) return;
// //     const prev = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";
// //     return () => {
// //       document.body.style.overflow = prev;
// //     };
// //   }, [mobileOpen]);

// //   useEffect(() => {
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") {
// //         setMobileOpen(false);
// //         setShowCategories(false);
// //         setShowSearchResults(false);
// //         setShowMobileSearchResults(false);
// //       }
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         setShowCategories(false);
// //         setOpenSubmenuSlug(null);
// //       }

// //       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
// //         setShowSearchResults(false);
// //       }

// //       if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
// //         setShowMobileSearchResults(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const flatCategories = useMemo(() => {
// //     const out: FlatCategoryNode[] = [];

// //     const walk = (nodes: CategoryNode[], level = 0) => {
// //       nodes.forEach((node) => {
// //         out.push({ ...node, level });
// //         if (node.children?.length) {
// //           walk(node.children, level + 1);
// //         }
// //       });
// //     };

// //     walk(categories, 0);
// //     return out;
// //   }, [categories]);

// //   const categoryMap = useMemo(() => {
// //     const map = new Map<number, FlatCategoryNode>();
// //     flatCategories.forEach((cat) => map.set(cat.id, cat));
// //     return map;
// //   }, [flatCategories]);

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

// //   const categorySuggestions = useMemo(() => {
// //     const q = search.trim().toLowerCase();
// //     if (!q) return [];
// //     return flatCategories
// //       .filter((cat) => (cat.name || "").toLowerCase().includes(q))
// //       .slice(0, 6);
// //   }, [search, flatCategories]);

// //   useEffect(() => {
// //     const q = search.trim();

// //     if (!q) {
// //       setSearchResults([]);
// //       return;
// //     }

// //     const timer = setTimeout(async () => {
// //       try {
// //         setSearchBusy(true);
// //         const data = await fetchProducts();
// //         const filtered = (Array.isArray(data) ? data : [])
// //           .filter((p) => {
// //             const title = (p.title || "").toLowerCase();
// //             const brand = (p.brand || "").toLowerCase();
// //             const cat = (p.category_name || "").toLowerCase();
// //             const sub = (p.short_category_label || "").toLowerCase();
// //             const query = q.toLowerCase();

// //             return (
// //               title.includes(query) ||
// //               brand.includes(query) ||
// //               cat.includes(query) ||
// //               sub.includes(query)
// //             );
// //           })
// //           .slice(0, 8);

// //         setSearchResults(filtered);
// //       } catch {
// //         setSearchResults([]);
// //       } finally {
// //         setSearchBusy(false);
// //       }
// //     }, 350);

// //     return () => clearTimeout(timer);
// //   }, [search]);

// //   const toggleMobileSubmenu = (slug: string) => {
// //     setMobileExpandedSlugs((prev) =>
// //       prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
// //     );
// //   };

// //   function goCategory(node: CategoryNode) {
// //     setShowCategories(false);
// //     setOpenSubmenuSlug(null);
// //     setMobileOpen(false);
// //     setMobileCatOpen(false);
// //     setMobileExpandedSlugs([]);
// //     setShowSearchResults(false);
// //     setShowMobileSearchResults(false);

// //     if (node.parent) {
// //       const parentNode = categoryMap.get(node.parent);
// //       navigate(
// //         `/store?subcategory=${encodeURIComponent(node.slug)}${
// //           parentNode ? `&parent=${encodeURIComponent(parentNode.slug)}` : ""
// //         }`
// //       );
// //       return;
// //     }

// //     navigate(`/store?category=${encodeURIComponent(node.slug)}`);
// //   }

// //   function onSearchSubmit(e?: React.FormEvent) {
// //     e?.preventDefault();

// //     const q = search.trim();
// //     if (!q) return;

// //     setShowSearchResults(false);
// //     setShowMobileSearchResults(false);
// //     navigate(`/store?search=${encodeURIComponent(q)}`);
// //   }

// //   function goProduct(slug: string) {
// //     setShowSearchResults(false);
// //     setShowMobileSearchResults(false);
// //     setSearch("");
// //     navigate(`/product/${slug}`);
// //   }

// //   const renderMobileCategory = (node: CategoryNode, level = 0) => {
// //     const hasChildren = !!(node.children && node.children.length > 0);
// //     const isExpanded = mobileExpandedSlugs.includes(node.slug);

// //     return (
// //       <div key={node.slug} style={{ marginLeft: level > 0 ? 12 : 0, marginBottom: 6 }}>
// //         <button
// //           type="button"
// //           style={{
// //             ...styles.mobileCatRow,
// //             background: level === 0 ? "rgba(255,255,255,0.08)" : "transparent",
// //             borderBottom: level === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
// //           }}
// //           onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node))}
// //         >
// //           <span
// //             style={{
// //               fontWeight: level === 0 ? 900 : 700,
// //               fontSize: level === 0 ? 14 : 13,
// //               textAlign: "left",
// //               flex: 1,
// //             }}
// //           >
// //             {(node.name || "").toUpperCase()}
// //           </span>
// //           {hasChildren && <span style={{ opacity: 0.9 }}>{isExpanded ? "−" : "+"}</span>}
// //         </button>

// //         {hasChildren && isExpanded && (
// //           <div
// //             style={{
// //               borderLeft: "1px solid rgba(255,255,255,0.10)",
// //               marginLeft: 8,
// //               paddingLeft: 6,
// //               marginTop: 6,
// //             }}
// //           >
// //             <button
// //               type="button"
// //               style={{
// //                 ...styles.mobileCatRow,
// //                 background: "rgba(255,255,255,0.04)",
// //                 fontWeight: 800,
// //               }}
// //               onClick={() => goCategory(node)}
// //             >
// //               VIEW ALL {(node.name || "").toUpperCase()}
// //             </button>

// //             {node.children?.map((child) => renderMobileCategory(child, level + 1))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   // Shared search results dropdown component
// //   const SearchResultsDropdown = ({ onClose }: { onClose?: () => void }) => (
// //     <div style={styles.searchDropdown}>
// //       {categorySuggestions.length > 0 && (
// //         <>
// //           <div style={styles.searchSectionTitle}>Categories</div>
// //           {categorySuggestions.map((cat) => (
// //             <button
// //               key={`cat-${cat.id}`}
// //               style={styles.searchItem}
// //               onClick={() => {
// //                 setSearch(cat.name);
// //                 goCategory(cat);
// //                 if (onClose) onClose();
// //               }}
// //             >
// //               📁 {cat.name}
// //             </button>
// //           ))}
// //         </>
// //       )}

// //       <div style={styles.searchSectionTitle}>Products</div>

// //       {searchBusy ? (
// //         <div style={styles.searchEmpty}>Searching...</div>
// //       ) : searchResults.length > 0 ? (
// //         searchResults.map((item) => (
// //           <button
// //             key={`prod-${item.id}`}
// //             style={styles.searchItem}
// //             onClick={() => {
// //               goProduct(item.slug);
// //               if (onClose) onClose();
// //             }}
// //           >
// //             <img
// //               src={
// //                 item.image ||
// //                 "https://dummyimage.com/60x60/f3f4f6/111827&text=No+Image"
// //               }
// //               alt={item.title}
// //               style={styles.searchThumb}
// //             />
// //             <div style={{ flex: 1, textAlign: "left" }}>
// //               <div style={styles.searchItemTitle}>{item.title}</div>
// //               <div style={styles.searchItemMeta}>
// //                 {item.short_category_label || item.category_name}
// //               </div>
// //             </div>
// //           </button>
// //         ))
// //       ) : (
// //         <div style={styles.searchEmpty}>No results found</div>
// //       )}

// //       <button
// //         style={{ ...styles.searchItem, justifyContent: "center", fontWeight: 900 }}
// //         onClick={() => {
// //           onSearchSubmit();
// //           if (onClose) onClose();
// //         }}
// //       >
// //         VIEW ALL RESULTS
// //       </button>
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @media (max-width: 1100px){
// //           .desktopNav { display: none !important; }
// //           .desktopRightLinks { display: none !important; }
// //           .desktopSearch { display: none !important; }
// //           .mobileHamburger { display: inline-flex !important; }
// //           .mobileSearchRow { display: block !important; }
// //           .headerInner { padding: 0 16px !important; }
// //         }
// //         @media (min-width: 1101px) {
// //           .mobileSearchRow { display: none !important; }
// //         }

// //         .drawerRight {
// //           transform: translateX(100%);
// //           transition: transform 240ms ease;
// //           will-change: transform;
// //         }
// //         .drawerRightOpen { transform: translateX(0); }

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

// //       <header style={styles.header}>
// //         <div className="headerInner" style={styles.inner}>
// //           <div style={styles.left}>
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

// //             <nav className="desktopNav" style={styles.nav}>
// //               <NavLink to="/">HOME</NavLink>
// //               <NavLink to="/store">STORE</NavLink>

// //               <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
// //                 <span style={styles.navLink} onClick={() => setShowCategories((p) => !p)}>
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
// //                             <button
// //                               style={{ ...styles.subItem, fontWeight: 900 }}
// //                               onClick={() => goCategory(totalToolsParent)}
// //                             >
// //                               VIEW ALL {TOTAL_TOOLS_PARENT_NAME}
// //                             </button>

// //                             {(totalToolsParent.children || []).map((child) => (
// //                               <button
// //                                 key={child.slug}
// //                                 style={styles.subItem}
// //                                 onClick={() => goCategory(child)}
// //                               >
// //                                 {(child.name || "").toUpperCase()}
// //                               </button>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}

// //                     {topLevelCategories.map((c) => (
// //                       <div key={c.slug} style={{ position: "relative" }}>
// //                         <button
// //                           style={styles.dropdownItemBtn}
// //                           onClick={() => {
// //                             if (c.children?.length) {
// //                               setOpenSubmenuSlug((s) => (s === c.slug ? null : c.slug));
// //                             } else {
// //                               goCategory(c);
// //                             }
// //                           }}
// //                         >
// //                           {(c.name || "").toUpperCase()} {c.children?.length ? "›" : ""}
// //                         </button>

// //                         {openSubmenuSlug === c.slug && c.children?.length ? (
// //                           <div style={styles.subMenu}>
// //                             <button
// //                               style={{ ...styles.subItem, fontWeight: 900 }}
// //                               onClick={() => goCategory(c)}
// //                             >
// //                               VIEW ALL {(c.name || "").toUpperCase()}
// //                             </button>

// //                             {c.children.map((child) => (
// //                               <button
// //                                 key={child.slug}
// //                                 style={styles.subItem}
// //                                 onClick={() => goCategory(child)}
// //                               >
// //                                 {(child.name || "").toUpperCase()}
// //                               </button>
// //                             ))}
// //                           </div>
// //                         ) : null}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               <NavLink to="/franchise">FRANCHISE</NavLink>
// //               <NavLink to="/services">SERVICES</NavLink>
// //               <NavLink to="/blog">BLOG</NavLink>
// //             </nav>
// //           </div>

// //           <div style={styles.right}>
// //             <div ref={searchRef} className="desktopSearch" style={styles.searchWrap}>
// //               <form onSubmit={onSearchSubmit} style={styles.searchForm}>
// //                 <input
// //                   value={search}
// //                   onChange={(e) => {
// //                     setSearch(e.target.value);
// //                     setShowSearchResults(true);
// //                   }}
// //                   onFocus={() => {
// //                     if (search.trim()) setShowSearchResults(true);
// //                   }}
// //                   placeholder="Search products / category..."
// //                   style={styles.searchInput}
// //                 />
// //                 <button type="submit" style={styles.searchBtn}>
// //                   🔍
// //                 </button>
// //               </form>

// //               {showSearchResults && search.trim() && (
// //                 <SearchResultsDropdown onClose={() => setShowSearchResults(false)} />
// //               )}
// //             </div>

// //             <div
// //               className="desktopRightLinks"
// //               style={{ display: "flex", gap: 20, alignItems: "center" }}
// //             >
// //               <NavLink to="/about">ABOUT</NavLink>
// //               <NavLink to="/contact">CONTACT US</NavLink>
// //               <NavLink to="https://attenbackend.clickconnectmedia.cloud/admin/">Admin Login</NavLink>
// //               <span style={styles.price}>₹0.00</span>
// //             </div>

// //             <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
// //               🛒
// //               <span style={styles.badge}>{cartCount}</span>
// //             </div>

// //             <div
// //               onClick={() => navigate("/my-account")}
// //               style={{ cursor: "pointer", color: "#fff" }}
// //             >
// //               👤
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mobile search row - appears only on mobile */}
// //         <div className="mobileSearchRow" style={styles.mobileSearchRow}>
// //           <div ref={mobileSearchRef} style={styles.mobileSearchWrap}>
// //             <form onSubmit={onSearchSubmit} style={styles.mobileSearchForm}>
// //               <input
// //                 value={search}
// //                 onChange={(e) => {
// //                   setSearch(e.target.value);
// //                   setShowMobileSearchResults(true);
// //                 }}
// //                 onFocus={() => {
// //                   if (search.trim()) setShowMobileSearchResults(true);
// //                 }}
// //                 placeholder="Search products / category..."
// //                 style={styles.mobileSearchInput}
// //               />
// //               <button type="submit" style={styles.mobileSearchBtn}>
// //                 🔍
// //               </button>
// //             </form>

// //             {showMobileSearchResults && search.trim() && (
// //               <div style={styles.mobileSearchDropdown}>
// //                 <SearchResultsDropdown onClose={() => setShowMobileSearchResults(false)} />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </header>

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
// //               <span style={{ fontWeight: 900 }}>MENU</span>
// //               <button style={styles.closeBtn} onClick={() => setMobileOpen(false)}>
// //                 ✕
// //               </button>
// //             </div>

// //             <div style={styles.mobileScrollArea}>
// //               {/* Keep the drawer search as an alternative */}
// //               <form
// //                 onSubmit={(e) => {
// //                   e.preventDefault();
// //                   setMobileOpen(false);
// //                   onSearchSubmit();
// //                 }}
// //                 style={styles.mobileDrawerSearchForm}
// //               >
// //                 <input
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                   placeholder="Search products..."
// //                   style={styles.mobileDrawerSearchInput}
// //                 />
// //                 <button type="submit" style={styles.mobileDrawerSearchBtn}>
// //                   🔍
// //                 </button>
// //               </form>

// //               <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
// //               <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
// //               <MobileLink to="/cart" close={() => setMobileOpen(false)}>
// //                 CART {cartCount > 0 ? `(${cartCount})` : ""}
// //               </MobileLink>
// //               <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

// //               <div style={{ marginTop: 14 }}>
// //                 <button
// //                   type="button"
// //                   style={styles.mobileCategoryHeader}
// //                   onClick={() => setMobileCatOpen((p) => !p)}
// //                 >
// //                   <span style={{ fontWeight: 900 }}>SHOP BY CATEGORY</span>
// //                   <span style={{ opacity: 0.9 }}>{mobileCatOpen ? "−" : "+"}</span>
// //                 </button>

// //                 {mobileCatOpen && (
// //                   <div style={{ marginTop: 10 }}>
// //                     {totalToolsParent && renderMobileCategory(totalToolsParent, 0)}

// //                     {topLevelCategories.length > 0 ? (
// //                       topLevelCategories.map((cat) => renderMobileCategory(cat, 0))
// //                     ) : (
// //                       <div
// //                         style={{
// //                           padding: 10,
// //                           fontSize: 12,
// //                           color: "rgba(255,255,255,0.6)",
// //                         }}
// //                       >
// //                         Loading categories...
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               <div style={styles.hr} />

// //               <MobileLink to="/franchise" close={() => setMobileOpen(false)}>FRANCHISE</MobileLink>
// //               <MobileLink to="/services" close={() => setMobileOpen(false)}>SERVICES</MobileLink>
// //               <MobileLink to="/blog" close={() => setMobileOpen(false)}>BLOG</MobileLink>
// //               <MobileLink to="/about" close={() => setMobileOpen(false)}>ABOUT</MobileLink>
// //               <MobileLink to="/contact" close={() => setMobileOpen(false)}>CONTACT</MobileLink>
// //               <MobileLink to="/dealer" close={() => setMobileOpen(false)}>DEALER</MobileLink>
// //               <MobileLink to="https://attenbackend.clickconnectmedia.cloud/admin/" close={() => setMobileOpen(false)}>ADMIN LOGIN</MobileLink>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // }

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
// //     boxSizing: "border-box",
// //     gap: 16,
// //   },
// //   left: { display: "flex", alignItems: "center", gap: 18, minWidth: 0 },
// //   logo: { height: 40 },
// //   nav: { display: "flex", gap: 24, alignItems: "center" },
// //   navLink: {
// //     color: "#fff",
// //     textDecoration: "none",
// //     fontWeight: 700,
// //     fontSize: 14,
// //     letterSpacing: 0.3,
// //     whiteSpace: "nowrap",
// //   },
// //   right: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 16,
// //     color: "#fff",
// //     minWidth: 0,
// //   },
// //   price: { color: "#fff", fontWeight: 800 },
// //   iconWrap: {
// //     position: "relative",
// //     cursor: "pointer",
// //     color: "#fff",
// //     fontSize: 20,
// //     lineHeight: 1,
// //   },
// //   badge: {
// //     position: "absolute",
// //     top: -10,
// //     right: -12,
// //     minWidth: 20,
// //     height: 20,
// //     padding: "0 5px",
// //     borderRadius: 999,
// //     background: "#fff",
// //     color: "#000",
// //     display: "grid",
// //     placeItems: "center",
// //     fontSize: 11,
// //     fontWeight: 800,
// //   },

// //   // Desktop search
// //   searchWrap: {
// //     position: "relative",
// //     width: 320,
// //   },
// //   searchForm: {
// //     display: "flex",
// //     alignItems: "center",
// //     background: "rgba(255,255,255,0.14)",
// //     border: "1px solid rgba(255,255,255,0.25)",
// //     borderRadius: 999,
// //     overflow: "hidden",
// //   },
// //   searchInput: {
// //     flex: 1,
// //     height: 40,
// //     border: "none",
// //     outline: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     padding: "0 14px",
// //     fontSize: 14,
// //   },
// //   searchBtn: {
// //     width: 42,
// //     height: 40,
// //     border: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontSize: 16,
// //   },
// //   searchDropdown: {
// //     position: "absolute",
// //     top: 48,
// //     left: 0,
// //     width: "100%",
// //     background: "#fff",
// //     borderRadius: 16,
// //     padding: 10,
// //     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
// //     zIndex: 1200,
// //     maxHeight: 430,
// //     overflowY: "auto",
// //   },
// //   searchSectionTitle: {
// //     fontSize: 12,
// //     fontWeight: 900,
// //     color: "#64748b",
// //     textTransform: "uppercase",
// //     padding: "8px 10px 6px",
// //   },
// //   searchItem: {
// //     width: "100%",
// //     border: "none",
// //     background: "transparent",
// //     padding: 10,
// //     borderRadius: 12,
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 10,
// //     cursor: "pointer",
// //     textAlign: "left",
// //   },
// //   searchThumb: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 8,
// //     objectFit: "contain",
// //     background: "#f8fafc",
// //     border: "1px solid #e5e7eb",
// //     flexShrink: 0,
// //   },
// //   searchItemTitle: {
// //     fontSize: 13,
// //     fontWeight: 800,
// //     color: "#111827",
// //     lineHeight: 1.35,
// //   },
// //   searchItemMeta: {
// //     fontSize: 12,
// //     color: "#6b7280",
// //     marginTop: 2,
// //   },
// //   searchEmpty: {
// //     padding: 12,
// //     fontSize: 13,
// //     color: "#6b7280",
// //   },

// //   // Mobile search row (below header)
// //   mobileSearchRow: {
// //     padding: "8px 16px 12px",
// //     backgroundColor: "rgba(0,0,0,0.35)",
// //     backdropFilter: "blur(4px)",
// //   },
// //   mobileSearchWrap: {
// //     position: "relative",
// //     width: "100%",
// //   },
// //   mobileSearchForm: {
// //     display: "flex",
// //     alignItems: "center",
// //     background: "rgba(255,255,255,0.14)",
// //     border: "1px solid rgba(255,255,255,0.25)",
// //     borderRadius: 999,
// //     overflow: "hidden",
// //   },
// //   mobileSearchInput: {
// //     flex: 1,
// //     height: 42,
// //     border: "none",
// //     outline: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     padding: "0 14px",
// //     fontSize: 14,
// //   },
// //   mobileSearchBtn: {
// //     width: 46,
// //     height: 42,
// //     border: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontSize: 16,
// //   },
// //   mobileSearchDropdown: {
// //     position: "absolute",
// //     top: 48,
// //     left: 0,
// //     width: "100%",
// //     background: "#fff",
// //     borderRadius: 16,
// //     padding: 10,
// //     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
// //     zIndex: 1200,
// //     maxHeight: 430,
// //     overflowY: "auto",
// //   },

// //   // Desktop categories dropdown
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
// //   dropdownItem: {
// //     padding: 10,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     color: "#111827",
// //   },
// //   dropdownItemBtn: {
// //     padding: 10,
// //     border: "none",
// //     background: "transparent",
// //     width: "100%",
// //     textAlign: "left",
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     color: "#111827",
// //   },
// //   subMenu: {
// //     position: "absolute",
// //     left: "100%",
// //     top: 0,
// //     background: "#f3f3f3",
// //     padding: 10,
// //     borderRadius: 12,
// //     minWidth: 240,
// //     boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
// //   },
// //   subItem: {
// //     padding: 8,
// //     border: "none",
// //     background: "transparent",
// //     cursor: "pointer",
// //     fontWeight: 800,
// //     width: "100%",
// //     textAlign: "left",
// //     color: "#111827",
// //   },

// //   hamburgerBtn: {
// //     display: "none",
// //     width: 40,
// //     height: 40,
// //     borderRadius: 10,
// //     border: "1px solid rgba(255,255,255,0.25)",
// //     background: "rgba(0,0,0,0.25)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontSize: 20,
// //   },

// //   mobileOverlay: {
// //     position: "fixed",
// //     inset: 0,
// //     background: "rgba(0,0,0,0.6)",
// //     zIndex: 998,
// //   },

// //   mobileMenu: {
// //     position: "fixed",
// //     top: 0,
// //     right: 0,
// //     width: 320,
// //     maxWidth: "88vw",
// //     height: "100dvh",
// //     background: "#111",
// //     color: "#fff",
// //     zIndex: 999,
// //     display: "flex",
// //     flexDirection: "column",
// //     boxShadow: "-20px 0 50px rgba(0,0,0,0.45)",
// //     overflow: "hidden",
// //     padding: 0,
// //   },

// //   mobileTop: {
// //     height: 64,
// //     padding: "0 16px",
// //     borderBottom: "1px solid rgba(255,255,255,0.12)",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
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

// //   mobileScrollArea: {
// //     flex: 1,
// //     minHeight: 0,
// //     overflowY: "auto",
// //     WebkitOverflowScrolling: "touch",
// //     overscrollBehavior: "contain",
// //     touchAction: "pan-y",
// //     padding: 16,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 10,
// //   },

// //   mobileDrawerSearchForm: {
// //     display: "flex",
// //     alignItems: "center",
// //     background: "rgba(255,255,255,0.08)",
// //     border: "1px solid rgba(255,255,255,0.12)",
// //     borderRadius: 12,
// //     overflow: "hidden",
// //     marginBottom: 6,
// //   },
// //   mobileDrawerSearchInput: {
// //     flex: 1,
// //     height: 42,
// //     border: "none",
// //     outline: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     padding: "0 12px",
// //     fontSize: 14,
// //   },
// //   mobileDrawerSearchBtn: {
// //     width: 46,
// //     height: 42,
// //     border: "none",
// //     background: "transparent",
// //     color: "#fff",
// //     cursor: "pointer",
// //   },

// //   mobileLink: {
// //     display: "block",
// //     color: "#fff",
// //     textDecoration: "none",
// //     fontWeight: 900,
// //     letterSpacing: 0.3,
// //     padding: "12px 12px",
// //     borderRadius: 10,
// //     background: "rgba(255,255,255,0.06)",
// //   },

// //   mobileCategoryHeader: {
// //     width: "100%",
// //     padding: "14px 12px",
// //     borderRadius: 10,
// //     border: "none",
// //     background: "rgba(255,255,255,0.10)",
// //     color: "#fff",
// //     cursor: "pointer",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },

// //   mobileCatRow: {
// //     width: "100%",
// //     border: "none",
// //     color: "#fff",
// //     cursor: "pointer",
// //     padding: "10px 10px",
// //     borderRadius: 10,
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     textAlign: "left",
// //   },

// //   hr: {
// //     height: 1,
// //     background: "rgba(255,255,255,0.08)",
// //     width: "100%",
// //     margin: "10px 0",
// //   },
// // };


// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { fetchCategoryTree, fetchProducts } from "../services/storeApi";
// import { getCart as getServerCart } from "../services/cartApi";
// import { getCartCount as getLocalCartCount } from "../services/cart";
// import { getStoredAccessToken } from "../services/api";
// import type { CategoryNode, ProductListItem } from "../services/storeApi";

// const LOGO_URL =
//   "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

// const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

// type FlatCategoryNode = CategoryNode & {
//   level?: number;
// };

// export default function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [categories, setCategories] = useState<CategoryNode[]>([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [openSubmenuSlug, setOpenSubmenuSlug] = useState<string | null>(null);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileCatOpen, setMobileCatOpen] = useState(false);
//   const [mobileExpandedSlugs, setMobileExpandedSlugs] = useState<string[]>([]);

//   const [cartCount, setCartCount] = useState(0);

//   const [search, setSearch] = useState("");
//   const [searchBusy, setSearchBusy] = useState(false);
//   const [searchResults, setSearchResults] = useState<ProductListItem[]>([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const searchRef = useRef<HTMLDivElement | null>(null);
//   const mobileSearchRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     fetchCategoryTree()
//       .then((data) => setCategories(Array.isArray(data) ? data : []))
//       .catch(() => setCategories([]));
//   }, []);

//   async function loadCartCount() {
//     const token = getStoredAccessToken();

//     if (token) {
//       try {
//         const cart = await getServerCart();
//         const totalQty =
//           cart?.items?.reduce(
//             (sum: number, item: { quantity?: number }) => sum + Number(item.quantity || 0),
//             0
//           ) || 0;

//         setCartCount(totalQty);
//         return;
//       } catch {
//         setCartCount(0);
//         return;
//       }
//     }

//     setCartCount(getLocalCartCount());
//   }

//   useEffect(() => {
//     loadCartCount();
//   }, [location.pathname]);

//   useEffect(() => {
//     const syncCartCount = () => {
//       loadCartCount();
//     };

//     window.addEventListener("focus", syncCartCount);
//     window.addEventListener("storage", syncCartCount);
//     window.addEventListener("cart:changed", syncCartCount);

//     return () => {
//       window.removeEventListener("focus", syncCartCount);
//       window.removeEventListener("storage", syncCartCount);
//       window.removeEventListener("cart:changed", syncCartCount);
//     };
//   }, []);

//   useEffect(() => {
//     setMobileOpen(false);
//     setShowCategories(false);
//     setOpenSubmenuSlug(null);
//     setMobileCatOpen(false);
//     setMobileExpandedSlugs([]);
//     setShowSearchResults(false);
//     setShowMobileSearchResults(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     if (!mobileOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [mobileOpen]);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setMobileOpen(false);
//         setShowCategories(false);
//         setShowSearchResults(false);
//         setShowMobileSearchResults(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowCategories(false);
//         setOpenSubmenuSlug(null);
//       }

//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowSearchResults(false);
//       }

//       if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
//         setShowMobileSearchResults(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const flatCategories = useMemo(() => {
//     const out: FlatCategoryNode[] = [];

//     const walk = (nodes: CategoryNode[], level = 0) => {
//       nodes.forEach((node) => {
//         out.push({ ...node, level });
//         if (node.children?.length) {
//           walk(node.children, level + 1);
//         }
//       });
//     };

//     walk(categories, 0);
//     return out;
//   }, [categories]);

//   const categoryMap = useMemo(() => {
//     const map = new Map<number, FlatCategoryNode>();
//     flatCategories.forEach((cat) => map.set(cat.id, cat));
//     return map;
//   }, [flatCategories]);

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

//   const categorySuggestions = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return [];
//     return flatCategories
//       .filter((cat) => (cat.name || "").toLowerCase().includes(q))
//       .slice(0, 6);
//   }, [search, flatCategories]);

//   useEffect(() => {
//     const q = search.trim();

//     if (!q) {
//       setSearchResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setSearchBusy(true);
//         const data = await fetchProducts();
//         const filtered = (Array.isArray(data) ? data : [])
//           .filter((p) => {
//             const title = (p.title || "").toLowerCase();
//             const brand = (p.brand || "").toLowerCase();
//             const cat = (p.category_name || "").toLowerCase();
//             const sub = (p.short_category_label || "").toLowerCase();
//             const query = q.toLowerCase();

//             return (
//               title.includes(query) ||
//               brand.includes(query) ||
//               cat.includes(query) ||
//               sub.includes(query)
//             );
//           })
//           .slice(0, 8);

//         setSearchResults(filtered);
//       } catch {
//         setSearchResults([]);
//       } finally {
//         setSearchBusy(false);
//       }
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [search]);

//   const toggleMobileSubmenu = (slug: string) => {
//     setMobileExpandedSlugs((prev) =>
//       prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
//     );
//   };

//   function goCategory(node: CategoryNode) {
//     setShowCategories(false);
//     setOpenSubmenuSlug(null);
//     setMobileOpen(false);
//     setMobileCatOpen(false);
//     setMobileExpandedSlugs([]);
//     setShowSearchResults(false);
//     setShowMobileSearchResults(false);

//     if (node.parent) {
//       const parentNode = categoryMap.get(node.parent);
//       navigate(
//         `/store?subcategory=${encodeURIComponent(node.slug)}${
//           parentNode ? `&parent=${encodeURIComponent(parentNode.slug)}` : ""
//         }`
//       );
//       return;
//     }

//     navigate(`/store?category=${encodeURIComponent(node.slug)}`);
//   }

//   function onSearchSubmit(e?: React.FormEvent) {
//     e?.preventDefault();

//     const q = search.trim();
//     if (!q) return;

//     setShowSearchResults(false);
//     setShowMobileSearchResults(false);
//     navigate(`/store?search=${encodeURIComponent(q)}`);
//   }

//   function goProduct(slug: string) {
//     setShowSearchResults(false);
//     setShowMobileSearchResults(false);
//     setSearch("");
//     navigate(`/product/${slug}`);
//   }

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
//           onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node))}
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
//             <button
//               type="button"
//               style={{
//                 ...styles.mobileCatRow,
//                 background: "rgba(255,255,255,0.04)",
//                 fontWeight: 800,
//               }}
//               onClick={() => goCategory(node)}
//             >
//               VIEW ALL {(node.name || "").toUpperCase()}
//             </button>

//             {node.children?.map((child) => renderMobileCategory(child, level + 1))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Shared search results dropdown component
//   const SearchResultsDropdown = ({ onClose }: { onClose?: () => void }) => (
//     <div style={styles.searchDropdown}>
//       {categorySuggestions.length > 0 && (
//         <>
//           <div style={styles.searchSectionTitle}>Categories</div>
//           {categorySuggestions.map((cat) => (
//             <button
//               key={`cat-${cat.id}`}
//               style={styles.searchItem}
//               onClick={() => {
//                 setSearch(cat.name);
//                 goCategory(cat);
//                 if (onClose) onClose();
//               }}
//             >
//               📁 {cat.name}
//             </button>
//           ))}
//         </>
//       )}

//       <div style={styles.searchSectionTitle}>Products</div>

//       {searchBusy ? (
//         <div style={styles.searchEmpty}>Searching...</div>
//       ) : searchResults.length > 0 ? (
//         searchResults.map((item) => (
//           <button
//             key={`prod-${item.id}`}
//             style={styles.searchItem}
//             onClick={() => {
//               goProduct(item.slug);
//               if (onClose) onClose();
//             }}
//           >
//             <img
//               src={
//                 item.image ||
//                 "https://dummyimage.com/60x60/f3f4f6/111827&text=No+Image"
//               }
//               alt={item.title}
//               style={styles.searchThumb}
//             />
//             <div style={{ flex: 1, textAlign: "left" }}>
//               <div style={styles.searchItemTitle}>{item.title}</div>
//               <div style={styles.searchItemMeta}>
//                 {item.short_category_label || item.category_name}
//               </div>
//             </div>
//           </button>
//         ))
//       ) : (
//         <div style={styles.searchEmpty}>No results found</div>
//       )}

//       <button
//         style={{ ...styles.searchItem, justifyContent: "center", fontWeight: 900 }}
//         onClick={() => {
//           onSearchSubmit();
//           if (onClose) onClose();
//         }}
//       >
//         VIEW ALL RESULTS
//       </button>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         /* ---------- GLOBAL FIXES TO PREVENT TEXT CLIPPING ---------- */
//         * {
//           /* Ensure no text gets clipped anywhere */
//           white-space: normal !important;
//           word-wrap: break-word !important;
//           overflow-wrap: break-word !important;
//           text-overflow: clip !important;
//         }

//         /* Remove any overflow hidden that might cut off text */
//         body, #root, main, .hero-section, .hero, .container, .wrapper {
//           overflow-x: visible !important;
//           overflow-y: auto !important;
//         }

//         /* Make sure headings and paragraphs can wrap */
//         h1, h2, h3, h4, h5, h6, p, span, div {
//           white-space: normal !important;
//           word-break: break-word !important;
//         }

//         /* Force the hero title to display fully */
//         .hero-title, .hero_text, [class*="hero"] h1, [class*="hero"] h2 {
//           white-space: normal !important;
//           overflow: visible !important;
//           max-width: 100% !important;
//           display: block !important;
//         }

//         /* Responsive header adjustments */
//         @media (max-width: 1100px){
//           .desktopNav { display: none !important; }
//           .desktopRightLinks { display: none !important; }
//           .desktopSearch { display: none !important; }
//           .mobileHamburger { display: inline-flex !important; }
//           .mobileSearchRow { display: block !important; }
//           .headerInner { padding: 0 16px !important; }
//         }
//         @media (min-width: 1101px) {
//           .mobileSearchRow { display: none !important; }
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

//         /* Push main content down so header doesn't cover it */
//         .header-placeholder {
//           height: 76px;
//           width: 100%;
//         }
//         @media (max-width: 1100px) {
//           .header-placeholder {
//             height: 76px; /* same as header height */
//           }
//         }
//       `}</style>

//       {/* Placeholder to prevent content from hiding under absolute header */}
//       <div className="header-placeholder" />

//       <header style={styles.header}>
//         <div className="headerInner" style={styles.inner}>
//           <div style={styles.left}>
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

//             <nav className="desktopNav" style={styles.nav}>
//               <NavLink to="/">HOME</NavLink>
//               <NavLink to="/store">STORE</NavLink>

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
//                             <button
//                               style={{ ...styles.subItem, fontWeight: 900 }}
//                               onClick={() => goCategory(totalToolsParent)}
//                             >
//                               VIEW ALL {TOTAL_TOOLS_PARENT_NAME}
//                             </button>

//                             {(totalToolsParent.children || []).map((child) => (
//                               <button
//                                 key={child.slug}
//                                 style={styles.subItem}
//                                 onClick={() => goCategory(child)}
//                               >
//                                 {(child.name || "").toUpperCase()}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {topLevelCategories.map((c) => (
//                       <div key={c.slug} style={{ position: "relative" }}>
//                         <button
//                           style={styles.dropdownItemBtn}
//                           onClick={() => {
//                             if (c.children?.length) {
//                               setOpenSubmenuSlug((s) => (s === c.slug ? null : c.slug));
//                             } else {
//                               goCategory(c);
//                             }
//                           }}
//                         >
//                           {(c.name || "").toUpperCase()} {c.children?.length ? "›" : ""}
//                         </button>

//                         {openSubmenuSlug === c.slug && c.children?.length ? (
//                           <div style={styles.subMenu}>
//                             <button
//                               style={{ ...styles.subItem, fontWeight: 900 }}
//                               onClick={() => goCategory(c)}
//                             >
//                               VIEW ALL {(c.name || "").toUpperCase()}
//                             </button>

//                             {c.children.map((child) => (
//                               <button
//                                 key={child.slug}
//                                 style={styles.subItem}
//                                 onClick={() => goCategory(child)}
//                               >
//                                 {(child.name || "").toUpperCase()}
//                               </button>
//                             ))}
//                           </div>
//                         ) : null}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <NavLink to="/franchise">FRANCHISE</NavLink>
//               <NavLink to="/services">SERVICES</NavLink>
//               <NavLink to="/blog">BLOG</NavLink>
//             </nav>
//           </div>

//           <div style={styles.right}>
//             <div ref={searchRef} className="desktopSearch" style={styles.searchWrap}>
//               <form onSubmit={onSearchSubmit} style={styles.searchForm}>
//                 <input
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setShowSearchResults(true);
//                   }}
//                   onFocus={() => {
//                     if (search.trim()) setShowSearchResults(true);
//                   }}
//                   placeholder="Search products / category..."
//                   style={styles.searchInput}
//                 />
//                 <button type="submit" style={styles.searchBtn}>
//                   🔍
//                 </button>
//               </form>

//               {showSearchResults && search.trim() && (
//                 <SearchResultsDropdown onClose={() => setShowSearchResults(false)} />
//               )}
//             </div>

//             <div
//               className="desktopRightLinks"
//               style={{ display: "flex", gap: 20, alignItems: "center" }}
//             >
//               <NavLink to="/about">ABOUT</NavLink>
//               <NavLink to="/contact">CONTACT US</NavLink>
//               <NavLink to="https://attenbackend.clickconnectmedia.cloud/admin/">Admin Login</NavLink>
//               <span style={styles.price}>₹0.00</span>
//             </div>

//             <div style={styles.iconWrap} onClick={() => navigate("/cart")}>
//               🛒
//               <span style={styles.badge}>{cartCount}</span>
//             </div>

//             <div
//               onClick={() => navigate("/my-account")}
//               style={{ cursor: "pointer", color: "#fff" }}
//             >
//               👤
//             </div>
//           </div>
//         </div>

//         {/* Mobile search row - appears only on mobile */}
//         <div className="mobileSearchRow" style={styles.mobileSearchRow}>
//           <div ref={mobileSearchRef} style={styles.mobileSearchWrap}>
//             <form onSubmit={onSearchSubmit} style={styles.mobileSearchForm}>
//               <input
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setShowMobileSearchResults(true);
//                 }}
//                 onFocus={() => {
//                   if (search.trim()) setShowMobileSearchResults(true);
//                 }}
//                 placeholder="Search products / category..."
//                 style={styles.mobileSearchInput}
//               />
//               <button type="submit" style={styles.mobileSearchBtn}>
//                 🔍
//               </button>
//             </form>

//             {showMobileSearchResults && search.trim() && (
//               <div style={styles.mobileSearchDropdown}>
//                 <SearchResultsDropdown onClose={() => setShowMobileSearchResults(false)} />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

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

//             <div style={styles.mobileScrollArea}>
//               {/* Keep the drawer search as an alternative */}
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   setMobileOpen(false);
//                   onSearchSubmit();
//                 }}
//                 style={styles.mobileDrawerSearchForm}
//               >
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search products..."
//                   style={styles.mobileDrawerSearchInput}
//                 />
//                 <button type="submit" style={styles.mobileDrawerSearchBtn}>
//                   🔍
//                 </button>
//               </form>

//               <MobileLink to="/" close={() => setMobileOpen(false)}>HOME</MobileLink>
//               <MobileLink to="/store" close={() => setMobileOpen(false)}>STORE</MobileLink>
//               <MobileLink to="/cart" close={() => setMobileOpen(false)}>
//                 CART {cartCount > 0 ? `(${cartCount})` : ""}
//               </MobileLink>
//               <MobileLink to="/my-account" close={() => setMobileOpen(false)}>MY ACCOUNT</MobileLink>

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
//                     {totalToolsParent && renderMobileCategory(totalToolsParent, 0)}

//                     {topLevelCategories.length > 0 ? (
//                       topLevelCategories.map((cat) => renderMobileCategory(cat, 0))
//                     ) : (
//                       <div
//                         style={{
//                           padding: 10,
//                           fontSize: 12,
//                           color: "rgba(255,255,255,0.6)",
//                         }}
//                       >
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
//               <MobileLink to="https://attenbackend.clickconnectmedia.cloud/admin/" close={() => setMobileOpen(false)}>ADMIN LOGIN</MobileLink>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

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
//     background: "rgba(0, 0, 0, 0.65)",
//     backdropFilter: "blur(8px)",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//   },
//   inner: {
//     height: 76,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 40px",
//     width: "100%",
//     boxSizing: "border-box",
//     gap: 16,
//   },
//   left: { display: "flex", alignItems: "center", gap: 18, minWidth: 0 },
//   logo: { height: 40, filter: "brightness(1.05)", objectFit: "contain" },
//   nav: { display: "flex", gap: 24, alignItems: "center" },
//   navLink: {
//     color: "#fff",
//     textDecoration: "none",
//     fontWeight: 700,
//     fontSize: 14,
//     letterSpacing: 0.3,
//     whiteSpace: "nowrap",
//     textShadow: "0 1px 2px rgba(0,0,0,0.4)",
//   },
//   right: {
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     color: "#fff",
//     minWidth: 0,
//   },
//   price: { color: "#fff", fontWeight: 800, textShadow: "0 1px 2px rgba(0,0,0,0.3)" },
//   iconWrap: {
//     position: "relative",
//     cursor: "pointer",
//     color: "#fff",
//     fontSize: 20,
//     lineHeight: 1,
//     textShadow: "0 1px 2px rgba(0,0,0,0.3)",
//   },
//   badge: {
//     position: "absolute",
//     top: -10,
//     right: -12,
//     minWidth: 20,
//     height: 20,
//     padding: "0 5px",
//     borderRadius: 999,
//     background: "#fff",
//     color: "#000",
//     display: "grid",
//     placeItems: "center",
//     fontSize: 11,
//     fontWeight: 800,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//   },

//   // Desktop search
//   searchWrap: {
//     position: "relative",
//     width: 320,
//   },
//   searchForm: {
//     display: "flex",
//     alignItems: "center",
//     background: "rgba(0, 0, 0, 0.5)",
//     border: "1px solid rgba(255,255,255,0.4)",
//     borderRadius: 999,
//     overflow: "hidden",
//     backdropFilter: "blur(2px)",
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     color: "#fff",
//     padding: "0 14px",
//     fontSize: 14,
//     "::placeholder": {
//       color: "rgba(255,255,255,0.7)",
//     },
//   },
//   searchBtn: {
//     width: 42,
//     height: 40,
//     border: "none",
//     background: "transparent",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: 16,
//   },
//   searchDropdown: {
//     position: "absolute",
//     top: 48,
//     left: 0,
//     width: "100%",
//     background: "#fff",
//     borderRadius: 16,
//     padding: 10,
//     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
//     zIndex: 1200,
//     maxHeight: 430,
//     overflowY: "auto",
//   },
//   searchSectionTitle: {
//     fontSize: 12,
//     fontWeight: 900,
//     color: "#64748b",
//     textTransform: "uppercase",
//     padding: "8px 10px 6px",
//   },
//   searchItem: {
//     width: "100%",
//     border: "none",
//     background: "transparent",
//     padding: 10,
//     borderRadius: 12,
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     cursor: "pointer",
//     textAlign: "left",
//   },
//   searchThumb: {
//     width: 42,
//     height: 42,
//     borderRadius: 8,
//     objectFit: "contain",
//     background: "#f8fafc",
//     border: "1px solid #e5e7eb",
//     flexShrink: 0,
//   },
//   searchItemTitle: {
//     fontSize: 13,
//     fontWeight: 800,
//     color: "#111827",
//     lineHeight: 1.35,
//   },
//   searchItemMeta: {
//     fontSize: 12,
//     color: "#6b7280",
//     marginTop: 2,
//   },
//   searchEmpty: {
//     padding: 12,
//     fontSize: 13,
//     color: "#6b7280",
//   },

//   // Mobile search row (below header)
//   mobileSearchRow: {
//     padding: "8px 16px 12px",
//     background: "rgba(0, 0, 0, 0.65)",
//     backdropFilter: "blur(8px)",
//   },
//   mobileSearchWrap: {
//     position: "relative",
//     width: "100%",
//   },
//   mobileSearchForm: {
//     display: "flex",
//     alignItems: "center",
//     background: "rgba(0, 0, 0, 0.5)",
//     border: "1px solid rgba(255,255,255,0.4)",
//     borderRadius: 999,
//     overflow: "hidden",
//   },
//   mobileSearchInput: {
//     flex: 1,
//     height: 42,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     color: "#fff",
//     padding: "0 14px",
//     fontSize: 14,
//     "::placeholder": {
//       color: "rgba(255,255,255,0.7)",
//     },
//   },
//   mobileSearchBtn: {
//     width: 46,
//     height: 42,
//     border: "none",
//     background: "transparent",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: 16,
//   },
//   mobileSearchDropdown: {
//     position: "absolute",
//     top: 48,
//     left: 0,
//     width: "100%",
//     background: "#fff",
//     borderRadius: 16,
//     padding: 10,
//     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
//     zIndex: 1200,
//     maxHeight: 430,
//     overflowY: "auto",
//   },

//   // Desktop categories dropdown
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
//   dropdownItem: {
//     padding: 10,
//     fontWeight: 800,
//     cursor: "pointer",
//     color: "#111827",
//   },
//   dropdownItemBtn: {
//     padding: 10,
//     border: "none",
//     background: "transparent",
//     width: "100%",
//     textAlign: "left",
//     fontWeight: 800,
//     cursor: "pointer",
//     color: "#111827",
//   },
//   subMenu: {
//     position: "absolute",
//     left: "100%",
//     top: 0,
//     background: "#f3f3f3",
//     padding: 10,
//     borderRadius: 12,
//     minWidth: 240,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//   },
//   subItem: {
//     padding: 8,
//     border: "none",
//     background: "transparent",
//     cursor: "pointer",
//     fontWeight: 800,
//     width: "100%",
//     textAlign: "left",
//     color: "#111827",
//   },

//   hamburgerBtn: {
//     display: "none",
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     border: "1px solid rgba(255,255,255,0.35)",
//     background: "rgba(0,0,0,0.4)",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: 20,
//   },

//   mobileOverlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.6)",
//     zIndex: 998,
//   },

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

//   mobileDrawerSearchForm: {
//     display: "flex",
//     alignItems: "center",
//     background: "rgba(255,255,255,0.08)",
//     border: "1px solid rgba(255,255,255,0.12)",
//     borderRadius: 12,
//     overflow: "hidden",
//     marginBottom: 6,
//   },
//   mobileDrawerSearchInput: {
//     flex: 1,
//     height: 42,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     color: "#fff",
//     padding: "0 12px",
//     fontSize: 14,
//   },
//   mobileDrawerSearchBtn: {
//     width: 46,
//     height: 42,
//     border: "none",
//     background: "transparent",
//     color: "#fff",
//     cursor: "pointer",
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
import { fetchCategoryTree, fetchProducts } from "../services/storeApi";
import { getCart as getServerCart } from "../services/cartApi";
import { getCartCount as getLocalCartCount } from "../services/cart";
import { getStoredAccessToken } from "../services/api";
import type { CategoryNode, ProductListItem } from "../services/storeApi";

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const TOTAL_TOOLS_PARENT_NAME = "TOTAL TOOLS";

type FlatCategoryNode = CategoryNode & {
  level?: number;
};

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

  const [search, setSearch] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductListItem[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategoryTree()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
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

  useEffect(() => {
    setMobileOpen(false);
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    setMobileCatOpen(false);
    setMobileExpandedSlugs([]);
    setShowSearchResults(false);
    setShowMobileSearchResults(false);
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
      if (e.key === "Escape") {
        setMobileOpen(false);
        setShowCategories(false);
        setShowSearchResults(false);
        setShowMobileSearchResults(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategories(false);
        setOpenSubmenuSlug(null);
      }

      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }

      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const flatCategories = useMemo(() => {
    const out: FlatCategoryNode[] = [];

    const walk = (nodes: CategoryNode[], level = 0) => {
      nodes.forEach((node) => {
        out.push({ ...node, level });
        if (node.children?.length) {
          walk(node.children, level + 1);
        }
      });
    };

    walk(categories, 0);
    return out;
  }, [categories]);

  const categoryMap = useMemo(() => {
    const map = new Map<number, FlatCategoryNode>();
    flatCategories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [flatCategories]);

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

  const categorySuggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return flatCategories
      .filter((cat) => (cat.name || "").toLowerCase().includes(q))
      .slice(0, 6);
  }, [search, flatCategories]);

  useEffect(() => {
    const q = search.trim();

    if (!q) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchBusy(true);
        const data = await fetchProducts();
        const filtered = (Array.isArray(data) ? data : [])
          .filter((p) => {
            const title = (p.title || "").toLowerCase();
            const brand = (p.brand || "").toLowerCase();
            const cat = (p.category_name || "").toLowerCase();
            const sub = (p.short_category_label || "").toLowerCase();
            const query = q.toLowerCase();

            return (
              title.includes(query) ||
              brand.includes(query) ||
              cat.includes(query) ||
              sub.includes(query)
            );
          })
          .slice(0, 8);

        setSearchResults(filtered);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchBusy(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const toggleMobileSubmenu = (slug: string) => {
    setMobileExpandedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  function goCategory(node: CategoryNode) {
    setShowCategories(false);
    setOpenSubmenuSlug(null);
    setMobileOpen(false);
    setMobileCatOpen(false);
    setMobileExpandedSlugs([]);
    setShowSearchResults(false);
    setShowMobileSearchResults(false);

    if (node.parent) {
      const parentNode = categoryMap.get(node.parent);
      navigate(
        `/store?subcategory=${encodeURIComponent(node.slug)}${
          parentNode ? `&parent=${encodeURIComponent(parentNode.slug)}` : ""
        }`
      );
      return;
    }

    navigate(`/store?category=${encodeURIComponent(node.slug)}`);
  }

  function onSearchSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    const q = search.trim();
    if (!q) return;

    setShowSearchResults(false);
    setShowMobileSearchResults(false);
    navigate(`/store?search=${encodeURIComponent(q)}`);
  }

  function goProduct(slug: string) {
    setShowSearchResults(false);
    setShowMobileSearchResults(false);
    setSearch("");
    navigate(`/product/${slug}`);
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
          onClick={() => (hasChildren ? toggleMobileSubmenu(node.slug) : goCategory(node))}
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
            <button
              type="button"
              style={{
                ...styles.mobileCatRow,
                background: "rgba(255,255,255,0.04)",
                fontWeight: 800,
              }}
              onClick={() => goCategory(node)}
            >
              VIEW ALL {(node.name || "").toUpperCase()}
            </button>

            {node.children?.map((child) => renderMobileCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const SearchResultsDropdown = ({ onClose }: { onClose?: () => void }) => (
    <div style={styles.searchDropdown}>
      {categorySuggestions.length > 0 && (
        <>
          <div style={styles.searchSectionTitle}>Categories</div>
          {categorySuggestions.map((cat) => (
            <button
              key={`cat-${cat.id}`}
              style={styles.searchItem}
              onClick={() => {
                setSearch(cat.name);
                goCategory(cat);
                if (onClose) onClose();
              }}
            >
              📁 {cat.name}
            </button>
          ))}
        </>
      )}

      <div style={styles.searchSectionTitle}>Products</div>

      {searchBusy ? (
        <div style={styles.searchEmpty}>Searching...</div>
      ) : searchResults.length > 0 ? (
        searchResults.map((item) => (
          <button
            key={`prod-${item.id}`}
            style={styles.searchItem}
            onClick={() => {
              goProduct(item.slug);
              if (onClose) onClose();
            }}
          >
            <img
              src={item.image || "https://dummyimage.com/60x60/f3f4f6/111827&text=No+Image"}
              alt={item.title}
              style={styles.searchThumb}
            />
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.searchItemTitle}>{item.title}</div>
              <div style={styles.searchItemMeta}>
                {item.short_category_label || item.category_name}
              </div>
            </div>
          </button>
        ))
      ) : (
        <div style={styles.searchEmpty}>No results found</div>
      )}

      <button
        style={{ ...styles.searchItem, justifyContent: "center", fontWeight: 900 }}
        onClick={() => {
          onSearchSubmit();
          if (onClose) onClose();
        }}
      >
        VIEW ALL RESULTS
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body, #root, main, .hero-section, .hero, .container, .wrapper {
          overflow-x: visible !important;
        }

        .hero-title,
        .hero_text,
        [class*="hero"] h1,
        [class*="hero"] h2,
        [class*="hero"] h3,
        [class*="hero"] p {
          white-space: normal !important;
          word-break: break-word !important;
          overflow: visible !important;
          text-overflow: clip !important;
          max-width: 100% !important;
        }

        .hero-content {
          padding-top: 140px !important;
        }

        @media (max-width: 1100px) {
          .desktopNav { display: none !important; }
          .desktopRightLinks { display: none !important; }
          .desktopSearch { display: none !important; }
          .mobileHamburger { display: inline-flex !important; }
          .mobileSearchRow { display: block !important; }
          .headerInner { padding: 0 16px !important; }

          /* Hero image ke upar search bar rahega */
          .hero-section,
          .hero,
          [class*="hero-section"],
          [class*="hero-banner"],
          [class*="banner-hero"] {
            position: relative !important;
          }

          /* Hero ke andar content block ko forcefully neeche lao */
          .hero-content,
          .hero-section .hero-content,
          .hero .hero-content,
          [class*="hero-content"],
          [class*="banner-content"],
          [class*="hero-text"],
          [class*="heroText"] {
            padding-top: 0 !important;
            margin-top: 155px !important;
            position: relative !important;
            z-index: 2 !important;
          }

          /* Agar text direct hero me placed hai to bhi neeche aaye */
          .hero-section h1,
          .hero-section h2,
          .hero-section h3,
          .hero-section p,
          .hero h1,
          .hero h2,
          .hero h3,
          .hero p,
          [class*="hero"] h1,
          [class*="hero"] h2,
          [class*="hero"] h3,
          [class*="hero"] p {
            position: relative !important;
            top: 82px !important;
            z-index: 2 !important;
          }

          /* CTA bhi neeche aaye */
          .hero-section a,
          .hero-section button,
          .hero a,
          .hero button,
          [class*="hero"] a,
          [class*="hero"] button {
            position: relative !important;
            top: 82px !important;
            z-index: 2 !important;
          }
        }

        @media (min-width: 1101px) {
          .mobileSearchRow { display: none !important; }
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
                            <button
                              style={{ ...styles.subItem, fontWeight: 900 }}
                              onClick={() => goCategory(totalToolsParent)}
                            >
                              VIEW ALL {TOTAL_TOOLS_PARENT_NAME}
                            </button>

                            {(totalToolsParent.children || []).map((child) => (
                              <button
                                key={child.slug}
                                style={styles.subItem}
                                onClick={() => goCategory(child)}
                              >
                                {(child.name || "").toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {topLevelCategories.map((c) => (
                      <div key={c.slug} style={{ position: "relative" }}>
                        <button
                          style={styles.dropdownItemBtn}
                          onClick={() => {
                            if (c.children?.length) {
                              setOpenSubmenuSlug((s) => (s === c.slug ? null : c.slug));
                            } else {
                              goCategory(c);
                            }
                          }}
                        >
                          {(c.name || "").toUpperCase()} {c.children?.length ? "›" : ""}
                        </button>

                        {openSubmenuSlug === c.slug && c.children?.length ? (
                          <div style={styles.subMenu}>
                            <button
                              style={{ ...styles.subItem, fontWeight: 900 }}
                              onClick={() => goCategory(c)}
                            >
                              VIEW ALL {(c.name || "").toUpperCase()}
                            </button>

                            {c.children.map((child) => (
                              <button
                                key={child.slug}
                                style={styles.subItem}
                                onClick={() => goCategory(child)}
                              >
                                {(child.name || "").toUpperCase()}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
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
            <div ref={searchRef} className="desktopSearch" style={styles.searchWrap}>
              <form onSubmit={onSearchSubmit} style={styles.searchForm}>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => {
                    if (search.trim()) setShowSearchResults(true);
                  }}
                  placeholder="Search products / category..."
                  style={styles.searchInput}
                />
                <button type="submit" style={styles.searchBtn}>
                  🔍
                </button>
              </form>

              {showSearchResults && search.trim() && (
                <SearchResultsDropdown onClose={() => setShowSearchResults(false)} />
              )}
            </div>

            <div
              className="desktopRightLinks"
              style={{ display: "flex", gap: 20, alignItems: "center" }}
            >
              <NavLink to="/about">ABOUT</NavLink>
              <NavLink to="/contact">CONTACT US</NavLink>
              <NavLink to="https://attenbackend.clickconnectmedia.cloud/admin/">
                Admin Login
              </NavLink>
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

        <div className="mobileSearchRow" style={styles.mobileSearchRow}>
          <div ref={mobileSearchRef} style={styles.mobileSearchWrap}>
            <form onSubmit={onSearchSubmit} style={styles.mobileSearchForm}>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowMobileSearchResults(true);
                }}
                onFocus={() => {
                  if (search.trim()) setShowMobileSearchResults(true);
                }}
                placeholder="Search products / category..."
                style={styles.mobileSearchInput}
              />
              <button type="submit" style={styles.mobileSearchBtn}>
                🔍
              </button>
            </form>

            {showMobileSearchResults && search.trim() && (
              <div style={styles.mobileSearchDropdown}>
                <SearchResultsDropdown onClose={() => setShowMobileSearchResults(false)} />
              </div>
            )}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  onSearchSubmit();
                }}
                style={styles.mobileDrawerSearchForm}
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  style={styles.mobileDrawerSearchInput}
                />
                <button type="submit" style={styles.mobileDrawerSearchBtn}>
                  🔍
                </button>
              </form>

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
              <MobileLink to="https://attenbackend.clickconnectmedia.cloud/admin/" close={() => setMobileOpen(false)}>
                ADMIN LOGIN
              </MobileLink>
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
    background: "transparent",
    backdropFilter: "none",
    boxShadow: "none",
  },
  inner: {
    minHeight: 76,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    width: "100%",
    boxSizing: "border-box",
    gap: 16,
  },
  left: { display: "flex", alignItems: "center", gap: 18, minWidth: 0 },
  logo: { height: 40, filter: "brightness(1.05)", objectFit: "contain" },
  nav: { display: "flex", gap: 24, alignItems: "center" },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.3,
    whiteSpace: "nowrap",
    textShadow: "0 1px 2px rgba(0,0,0,0.4)",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    color: "#fff",
    minWidth: 0,
  },
  price: {
    color: "#fff",
    fontWeight: 800,
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },
  iconWrap: {
    position: "relative",
    cursor: "pointer",
    color: "#fff",
    fontSize: 20,
    lineHeight: 1,
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
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
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },

  searchWrap: {
    position: "relative",
    width: 320,
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: 999,
    overflow: "hidden",
    backdropFilter: "blur(2px)",
  },
  searchInput: {
    flex: 1,
    height: 40,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    padding: "0 14px",
    fontSize: 14,
  },
  searchBtn: {
    width: 42,
    height: 40,
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
  searchDropdown: {
    position: "absolute",
    top: 48,
    left: 0,
    width: "100%",
    background: "#fff",
    borderRadius: 16,
    padding: 10,
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    zIndex: 1200,
    maxHeight: 430,
    overflowY: "auto",
  },
  searchSectionTitle: {
    fontSize: 12,
    fontWeight: 900,
    color: "#64748b",
    textTransform: "uppercase",
    padding: "8px 10px 6px",
  },
  searchItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: 10,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    textAlign: "left",
  },
  searchThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
    objectFit: "contain",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    flexShrink: 0,
  },
  searchItemTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#111827",
    lineHeight: 1.35,
  },
  searchItemMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  searchEmpty: {
    padding: 12,
    fontSize: 13,
    color: "#6b7280",
  },

  mobileSearchRow: {
    position: "absolute",
    top: 110,
    left: 0,
    width: "100%",
    padding: "8px 14px 0",
    background: "transparent",
    zIndex: 1000,
  },
  mobileSearchWrap: {
    position: "relative",
    width: "100%",
  },
  mobileSearchForm: {
    display: "flex",
    alignItems: "center",
    background: "rgba(128,128,128,0.72)",
    border: "1px solid rgba(255,255,255,0.24)",
    borderRadius: 999,
    overflow: "hidden",
    backdropFilter: "blur(6px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  },
  mobileSearchInput: {
    flex: 1,
    height: 42,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    padding: "0 14px",
    fontSize: 14,
  },
  mobileSearchBtn: {
    width: 46,
    height: 42,
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
  mobileSearchDropdown: {
    position: "absolute",
    top: 48,
    left: 0,
    width: "100%",
    background: "#fff",
    borderRadius: 16,
    padding: 10,
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    zIndex: 1200,
    maxHeight: 430,
    overflowY: "auto",
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
  dropdownItem: {
    padding: 10,
    fontWeight: 800,
    cursor: "pointer",
    color: "#111827",
  },
  dropdownItemBtn: {
    padding: 10,
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
    fontWeight: 800,
    cursor: "pointer",
    color: "#111827",
  },
  subMenu: {
    position: "absolute",
    left: "100%",
    top: 0,
    background: "#f3f3f3",
    padding: 10,
    borderRadius: 12,
    minWidth: 240,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  subItem: {
    padding: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 800,
    width: "100%",
    textAlign: "left",
    color: "#111827",
  },

  hamburgerBtn: {
    display: "none",
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(0,0,0,0.4)",
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

  mobileDrawerSearchForm: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 6,
  },
  mobileDrawerSearchInput: {
    flex: 1,
    height: 42,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    padding: "0 12px",
    fontSize: 14,
  },
  mobileDrawerSearchBtn: {
    width: 46,
    height: 42,
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
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