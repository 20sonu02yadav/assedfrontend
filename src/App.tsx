import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import OrderDetailPage from "./Pages/OrderDetail";
import Home from "./Pages/Home";
import BlogPage from "./Pages/Blog";
import Services from "./Pages/Services";
import ContactPage from "./Pages/Contact";
import Privacy from "./Pages/Privacy";
import About from "./Pages/About";
import ShippingPolicy from "./Pages/ShippingPolicy";
import Terms from "./Pages/Terms";
import FAQ from "./Pages/FAQ";
import RefundReturns from "./Pages/Refund";
import Franchise from "./Pages/Franchise";
import FranchiseApplication from "./Pages/FranchiseApplication";
import MyAccount from "./Pages/MyAccount";
import Store from "./Pages/Store";
import Cart from "./Pages/Cart";
import Dealer from "./Pages/Dealer";
import CategoryProducts from "./Pages/CategoryProducts";
import ProductDetailPage from "./Pages/ProductDetailPage";

import AccountDashboard from "./Pages/AccountDashboard";
import Orders from "./Pages/Orders";
import Checkout from "./Pages/Checkout";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          {/* HEADER */}
          <Header />

          {/* MAIN ROUTES */}
          <div style={{ flex: 1, width: "100%" }}>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/my-account" element={<MyAccount />} />

              {/* CATEGORY & PRODUCT */}
              <Route path="/category/:slug" element={<CategoryProducts />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              }
            />

              <Route
                path="/account-dashboard"
                element={
                  <ProtectedRoute>
                    <AccountDashboard />
                  </ProtectedRoute>
                }
              />

              {/* STATIC PAGES */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* POLICIES */}
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/refund-returns" element={<RefundReturns />} />
              <Route path="/faqs" element={<FAQ />} />

              {/* FRANCHISE */}
              <Route path="/franchise" element={<Franchise />} />
              <Route
                path="/franchise-application"
                element={<FranchiseApplication />}
              />

              {/* DEALER */}
              <Route path="/dealer" element={<Dealer />} />

              {/* 404 PAGE */}
              <Route
                path="*"
                element={
                  <h1 style={{ textAlign: "center", marginTop: "100px" }}>
                    404 - Page Not Found
                  </h1>
                }
              />
            </Routes>
          </div>

          {/* FOOTER */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;