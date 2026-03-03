// src/pages/MyAccount.tsx
import React, { useMemo, useState } from "react";
import { loginUser, registerUser, setAuthToken, type Role } from "../services/api";

export default function MyAccount() {
  // ✅ Header logo
  //const LOGO_URL =
    //"https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

  // ✅ Background image
  const HERO_BG =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

  // ----------------------------
  // LOGIN FORM STATE
  // ----------------------------
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // ----------------------------
  // REGISTER FORM STATE
  // ----------------------------
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<Role | "">("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  // UI errors / messages
  const [loginError, setLoginError] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const regPasswordMismatch = useMemo(() => {
    if (!regPassword || !regConfirmPassword) return false;
    return regPassword !== regConfirmPassword;
  }, [regPassword, regConfirmPassword]);

  //const cartCount = 0;

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setRegisterError("");
    setSuccessMsg("");

    try {
      const data = await loginUser({
        username_or_email: loginUsername,
        password: loginPassword,
      });

      const access = data?.tokens?.access as string | undefined;

      if (access) {
        setAuthToken(access);
        if (rememberMe) {
          localStorage.setItem("access_token", access);
          if (data?.tokens?.refresh) localStorage.setItem("refresh_token", data.tokens.refresh);
        } else {
          sessionStorage.setItem("access_token", access);
          if (data?.tokens?.refresh) sessionStorage.setItem("refresh_token", data.tokens.refresh);
        }
      }

      setSuccessMsg("Login successful ✅");
    } catch (err: any) {
      const msg =
        err?.response?.data?.password ||
        err?.response?.data?.username_or_email ||
        err?.response?.data?.detail ||
        "Login failed. Please try again.";
      setLoginError(typeof msg === "string" ? msg : "Login failed.");
    }
  };

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setRegisterError("");
    setSuccessMsg("");

    if (regPasswordMismatch) return;
    if (!regRole) {
      setRegisterError("Please select User Type.");
      return;
    }

    try {
      const data = await registerUser({
        email: regEmail,
        role: regRole,
        password: regPassword,
        confirm_password: regConfirmPassword,
      });

      const access = data?.tokens?.access as string | undefined;
      if (access) {
        setAuthToken(access);
        localStorage.setItem("access_token", access);
        if (data?.tokens?.refresh) localStorage.setItem("refresh_token", data.tokens.refresh);
      }

      setSuccessMsg("Registered successfully ✅");

      // Optional: clear form
      setRegEmail("");
      setRegRole("");
      setRegPassword("");
      setRegConfirmPassword("");
    } catch (err: any) {
      const d = err?.response?.data;
      const msg =
        d?.email ||
        d?.role ||
        d?.password ||
        d?.confirm_password ||
        d?.detail ||
        "Registration failed. Please try again.";
      setRegisterError(typeof msg === "string" ? msg : "Registration failed.");
    }
  };

  //const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="page">
      {/* =========================
          HEADER (same style)
      ========================== */}
      {/* <header className="siteHeader">
        <div className="headerInner">
          <a className="brand" href="/">
            <img className="brandLogo" src={LOGO_URL} alt="Tunturu" />
          </a>

          <nav className="nav">
            <a href="/" className="navLink">
              HOME
            </a>
            <a href="/store" className="navLink">
              STORE
            </a>
            <a href="/categories" className="navLink">
              CATEGORIES <span className="caret">⌄</span>
            </a>
            <a href="/franchise" className="navLink">
              FRANCHISE
            </a>
            <a href="/services" className="navLink">
              SERVICES
            </a>
            <a href="/blog" className="navLink">
              BLOG
            </a>
          </nav>

          <div className="navRight">
            <a href="/about" className="navLink rightLink">
              ABOUT
            </a>
            <a href="/contact" className="navLink rightLink">
              CONTACT US
            </a>

            <div className="price">₹0.00</div>

            <div className="icons">
              <button className="iconBtn" aria-label="Cart">
                🛒
                <span className="badge">{cartCount}</span>
              </button>
              <button className="iconBtn" aria-label="Account">
                👤
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* =========================
          HERO
      ========================== */}
      <section className="hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">My Account</h1>
          <p className="heroSub">Nam nec tellus a odio tincidunt auctor a ornare odio.</p>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}
      <main className="contentWrap">
        {(successMsg || loginError || registerError) && (
          <div className="topMsgWrap">
            {successMsg && <div className="msgSuccess">{successMsg}</div>}
            {loginError && <div className="msgError">{loginError}</div>}
            {registerError && <div className="msgError">{registerError}</div>}
          </div>
        )}

        <div className="formsGrid">
          {/* -------- LOGIN CARD -------- */}
          <section className="card">
            <h2 className="cardTitle">Login</h2>

            <form onSubmit={onLoginSubmit} className="form">
              <label className="label">
                Username or email address <span className="req">*</span>
              </label>
              <input
                className="input"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder=""
              />

              <label className="label" style={{ marginTop: 16 }}>
                Password <span className="req">*</span>
              </label>
              <div className="inputWrap">
                <input
                  className="input"
                  type={showLoginPass ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder=""
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setShowLoginPass((s) => !s)}
                  aria-label={showLoginPass ? "Hide password" : "Show password"}
                  title={showLoginPass ? "Hide password" : "Show password"}
                >
                  👁
                </button>
              </div>

              <div className="row">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button className="primaryBtn" type="submit">
                LOG IN
              </button>

              <a className="link" href="/forgot-password">
                Lost your password?
              </a>
            </form>
          </section>

          {/* -------- REGISTER CARD -------- */}
          <section className="card">
            <h2 className="cardTitle">Register</h2>

            <form onSubmit={onRegisterSubmit} className="form">
              <label className="label">
                Email address <span className="req">*</span>
              </label>
              <input
                className="input"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder=""
              />

              <p className="muted" style={{ marginTop: 12 }}>
                A link to set a new password will be sent to your email address.
              </p>

              <label className="label" style={{ marginTop: 16 }}>
                User Type <span className="req">*</span>
              </label>
              <select
                className="select"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value as Role)}
              >
                <option value="">- - - Select User Role - - -</option>

                {/* ✅ Roles replaced */}
                <option value="Individual Customer">Individual Customer</option>
                <option value="B2B">B2B</option>
              </select>

              <label className="label" style={{ marginTop: 16 }}>
                Password <span className="req">*</span>
              </label>
              <div className="inputWrap">
                <input
                  className="input"
                  type={showRegPass ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setShowRegPass((s) => !s)}
                  aria-label={showRegPass ? "Hide password" : "Show password"}
                  title={showRegPass ? "Hide password" : "Show password"}
                >
                  👁
                </button>
              </div>

              <label className="label" style={{ marginTop: 16 }}>
                Confirm Password <span className="req">*</span>
              </label>
              <div className="inputWrap">
                <input
                  className={`input ${regPasswordMismatch ? "inputError" : ""}`}
                  type={showRegConfirmPass ? "text" : "password"}
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setShowRegConfirmPass((s) => !s)}
                  aria-label={showRegConfirmPass ? "Hide password" : "Show password"}
                  title={showRegConfirmPass ? "Hide password" : "Show password"}
                >
                  👁
                </button>
              </div>

              {regPasswordMismatch && (
                <div className="errorText">Passwords do not match.</div>
              )}

              <p className="muted" style={{ marginTop: 16 }}>
                Your personal data will be used to support your experience throughout this website,
                to manage access to your account, and for other purposes described in our privacy
                policy.
              </p>

              <button className="primaryBtn" type="submit" disabled={regPasswordMismatch}>
                REGISTER
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* =========================
          FOOTER (same look)
      ========================== */}
      {/* Styles */}
      <style>{`
        :root{
          --blue:#0b76c5;
          --dark:#0b0b0b;
          --muted:#6b7280;
          --cardBorder:#e5e7eb;
        }

        .page{
          min-height:100vh;
          background:#fff;
          color:#111827;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        /* HEADER */
        .siteHeader{
          position:fixed;
          top:0; left:0; right:0;
          z-index:50;
          height:72px;
          background:rgba(0,0,0,0.35);
          backdrop-filter: blur(2px);
        }
        .headerInner{
          height:72px;
          max-width:1320px;
          margin:0 auto;
          padding:0 22px;
          display:flex;
          align-items:center;
          gap:22px;
        }
        .brand{ display:flex; align-items:center; text-decoration:none; }
        .brandLogo{
          height:34px;
          width:auto;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35));
        }

        .nav{
          display:flex;
          align-items:center;
          gap:22px;
          margin-left:10px;
          flex: 1;
        }
        .navLink{
          text-decoration:none;
          color:#fff;
          font-weight:700;
          letter-spacing:0.5px;
          font-size:14px;
          text-transform:uppercase;
          opacity:0.95;
        }
        .navLink:hover{ opacity:1; }
        .caret{ font-weight:900; margin-left:6px; }

        .navRight{
          display:flex;
          align-items:center;
          gap:18px;
        }
        .rightLink{ font-weight:700; }
        .price{
          color:#fff;
          font-weight:800;
          letter-spacing:0.3px;
        }
        .icons{ display:flex; align-items:center; gap:10px; }
        .iconBtn{
          position:relative;
          background:transparent;
          border:none;
          cursor:pointer;
          color:#fff;
          font-size:18px;
          padding:6px 6px;
          line-height:1;
        }
        .badge{
          position:absolute;
          top:-3px;
          right:-2px;
          background:#fff;
          color:#111;
          font-size:11px;
          font-weight:800;
          border-radius:999px;
          padding:2px 6px;
        }

        /* HERO */
        .hero{
          height:430px;
          background-size:cover;
          background-position:center;
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
          padding-top:72px; /* header offset */
        }
        .heroOverlay{
          position:absolute; inset:0;
          background:rgba(0,0,0,0.35);
        }
        .heroContent{
          position:relative;
          text-align:center;
          color:#fff;
          padding:0 18px;
        }
        .heroTitle{
          font-size:66px;
          font-weight:800;
          margin:0;
          letter-spacing:0.2px;
          text-shadow:0 4px 18px rgba(0,0,0,0.35);
        }
        .heroSub{
          margin-top:10px;
          font-size:18px;
          opacity:0.95;
          text-shadow:0 4px 14px rgba(0,0,0,0.35);
        }

        /* CONTENT */
        .contentWrap{
          max-width:1320px;
          margin:0 auto;
          padding:70px 22px 90px;
        }
        .formsGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:42px;
          align-items:start;
        }
        .card{
          border:1px solid var(--cardBorder);
          border-radius:4px;
          padding:28px 28px 26px;
          background:#fff;
        }
        .cardTitle{
          font-size:56px;
          font-weight:900;
          margin:0 0 18px;
          letter-spacing:0.2px;
          color:#0b0b0b;
        }
        .form{ display:flex; flex-direction:column; }
        .label{
          font-size:16px;
          font-weight:700;
          color:#111827;
        }
        .req{ color:#ef4444; font-weight:900; }
        .input, .select{
          width:100%;
          margin-top:10px;
          height:56px;
          padding:0 18px;
          border:1px solid #d1d5db;
          border-radius:18px;
          outline:none;
          font-size:16px;
          background:#fff;
        }
        .select{ border-radius:6px; height:48px; }

        .input:focus, .select:focus{
          border-color:#9ca3af;
          box-shadow:0 0 0 3px rgba(11,118,197,0.10);
        }
        .inputWrap{
          position:relative;
          width:100%;
        }
        .eyeBtn{
          position:absolute;
          right:14px;
          top:50%;
          transform:translateY(-50%);
          background:transparent;
          border:none;
          cursor:pointer;
          font-size:18px;
          opacity:0.85;
        }
        .eyeBtn:hover{ opacity:1; }

        .row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin:14px 0 8px;
        }
        .check{
          display:flex;
          align-items:center;
          gap:10px;
          font-size:16px;
          color:#111827;
          user-select:none;
        }
        .check input{ width:16px; height:16px; }
        .primaryBtn{
          margin-top:10px;
          width:160px;
          height:46px;
          border:none;
          border-radius:999px;
          background:var(--blue);
          color:#fff;
          font-weight:900;
          letter-spacing:0.8px;
          cursor:pointer;
        }
        .primaryBtn:disabled{
          opacity:0.55;
          cursor:not-allowed;
        }
        .link{
          margin-top:16px;
          color:#111827;
          text-decoration:none;
          font-size:16px;
        }
        .link:hover{ text-decoration:underline; }
        .muted{
          color:#374151;
          font-size:16px;
          line-height:1.6;
        }
        .inputError{
          border-color:#ef4444 !important;
        }
        .errorText{
          margin-top:10px;
          color:#ef4444;
          font-weight:700;
        }
        .social{
          display:flex;
          gap:12px;
          margin-top:18px;
        }
        .socialBtn{
          width:42px;
          height:42px;
          border-radius:999px;
          background:#fff;
          color:#0b0b0b;
          font-weight:900;
          display:flex;
          align-items:center;
          justify-content:center;
          text-decoration:none;
        }
        /* RESPONSIVE */
        @media (max-width: 1024px){
          .nav{ display:none; }
          .cardTitle{ font-size:44px; }
          .heroTitle{ font-size:52px; }
          .formsGrid{ grid-template-columns:1fr; }
        }
        @media (max-width: 520px){
          .hero{ height:360px; }
          .heroTitle{ font-size:44px; }
          .footerInner{ grid-template-columns:1fr; }
          .footerBottomInner{ flex-direction:column; gap:10px; }
        }
      `}</style>
    </div>
  );
}