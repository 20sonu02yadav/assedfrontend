import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import Footer from "./Components/Footer"; // ✅ IMPORT FOOTER

import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* ✅ ALL ROUTES */}
        <div style={{ flex: 1 }}>
          <Routes>

            {/* ✅ MAIN ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-account" element={<MyAccount />} />

            {/* ✅ CATEGORY & PRODUCT */}
            <Route path="/category/:slug" element={<CategoryProducts />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />

            {/* ✅ STATIC PAGES */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ✅ POLICIES */}
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-returns" element={<RefundReturns />} />
            <Route path="/faqs" element={<FAQ />} />

            {/* ✅ FRANCHISE */}
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/franchise-application" element={<FranchiseApplication />} />

            {/* ✅ DEALER */}
            <Route path="/dealer" element={<Dealer />} />

            {/* ✅ 404 PAGE */}
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

        {/* ✅ GLOBAL FOOTER (Will show on every page automatically) */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;