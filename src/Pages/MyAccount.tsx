// src/Pages/MyAccount.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, type Role } from "../services/api";
import { useAuth } from "../auth/AuthContext";

export default function MyAccount() {
  const navigate = useNavigate();
  const { user, loginWithTokens, logout } = useAuth();

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
      const refresh = data?.tokens?.refresh as string | undefined;

      if (!access) {
        setLoginError("Login failed: Access token missing.");
        return;
      }

      // ✅ store token properly + set header + fetch /me
      await loginWithTokens(access, refresh, rememberMe);

      setSuccessMsg("Login successful ✅");

      // ✅ redirect to dashboard (your protected route)
      navigate("/account-dashboard", { replace: true });
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
      const refresh = data?.tokens?.refresh as string | undefined;

      if (!access) {
        setRegisterError("Registration failed: Access token missing.");
        return;
      }

      // ✅ After register, usually user wants remember = true
      await loginWithTokens(access, refresh, true);

      setSuccessMsg("Registered successfully ✅");

      // clear form
      setRegEmail("");
      setRegRole("");
      setRegPassword("");
      setRegConfirmPassword("");

      navigate("/account-dashboard", { replace: true });
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

  return (
    <div className="page">
      <section className="hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">My Account</h1>
          <p className="heroSub">Login to access your dashboard, orders and cart.</p>
        </div>
      </section>

      <main className="contentWrap">
        {(successMsg || loginError || registerError) && (
          <div className="topMsgWrap">
            {successMsg && <div className="msgSuccess">{successMsg}</div>}
            {loginError && <div className="msgError">{loginError}</div>}
            {registerError && <div className="msgError">{registerError}</div>}
          </div>
        )}

        {/* ✅ If already logged in, show quick actions */}
        {user ? (
          <section className="loggedCard">
            <h2 className="loggedTitle">Welcome, {user.username} 👋</h2>
            <p className="loggedSub">
              You are logged in as <b>{user.role}</b> ({user.email})
            </p>

            <div className="loggedActions">
              <button className="primaryBtnWide" onClick={() => navigate("/account-dashboard")}>
                GO TO DASHBOARD
              </button>
              <button className="secondaryBtnWide" onClick={() => navigate("/orders")}>
                VIEW ORDERS
              </button>
              <button className="secondaryBtnWide" onClick={() => navigate("/cart")}>
                OPEN CART
              </button>
              <button
                className="dangerBtnWide"
                onClick={() => {
                  logout();
                  setSuccessMsg("Logged out ✅");
                }}
              >
                LOGOUT
              </button>
            </div>
          </section>
        ) : (
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

                {regPasswordMismatch && <div className="errorText">Passwords do not match.</div>}

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
        )}
      </main>

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

        .hero{
          height:430px;
          background-size:cover;
          background-position:center;
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
          padding-top:72px;
        }
        .heroOverlay{ position:absolute; inset:0; background:rgba(0,0,0,0.35); }
        .heroContent{ position:relative; text-align:center; color:#fff; padding:0 18px; }
        .heroTitle{
          font-size:66px; font-weight:800; margin:0;
          text-shadow:0 4px 18px rgba(0,0,0,0.35);
        }
        .heroSub{ margin-top:10px; font-size:18px; opacity:0.95; }

        .contentWrap{ max-width:1320px; margin:0 auto; padding:70px 22px 90px; }

        .topMsgWrap{ margin-bottom:18px; display:flex; flex-direction:column; gap:10px; }
        .msgSuccess{ background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; padding:12px 14px; border-radius:10px; font-weight:700; }
        .msgError{ background:#fef2f2; color:#991b1b; border:1px solid #fecaca; padding:12px 14px; border-radius:10px; font-weight:700; }

        .formsGrid{ display:grid; grid-template-columns: 1fr 1fr; gap:42px; align-items:start; }

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
          color:#0b0b0b;
        }
        .form{ display:flex; flex-direction:column; }
        .label{ font-size:16px; font-weight:700; color:#111827; }
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
        .select{ border-radius:10px; height:52px; }

        .input:focus, .select:focus{
          border-color:#9ca3af;
          box-shadow:0 0 0 3px rgba(11,118,197,0.10);
        }
        .inputWrap{ position:relative; width:100%; }
        .eyeBtn{
          position:absolute; right:14px; top:50%;
          transform:translateY(-50%);
          background:transparent; border:none; cursor:pointer;
          font-size:18px; opacity:0.85;
        }

        .row{ display:flex; align-items:center; justify-content:space-between; margin:14px 0 8px; }
        .check{ display:flex; align-items:center; gap:10px; font-size:16px; user-select:none; }
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
        .primaryBtn:disabled{ opacity:0.55; cursor:not-allowed; }

        .link{ margin-top:16px; color:#111827; text-decoration:none; font-size:16px; }
        .link:hover{ text-decoration:underline; }

        .muted{ color:#374151; font-size:16px; line-height:1.6; }

        .inputError{ border-color:#ef4444 !important; }
        .errorText{ margin-top:10px; color:#ef4444; font-weight:700; }

        /* ✅ Logged-in card */
        .loggedCard{
          border:1px solid var(--cardBorder);
          border-radius:14px;
          padding:22px;
          background:#fff;
        }
        .loggedTitle{ margin:0; font-size:32px; font-weight:900; color:#0b0b0b; }
        .loggedSub{ margin:10px 0 18px; color:#374151; }
        .loggedActions{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
        .primaryBtnWide, .secondaryBtnWide, .dangerBtnWide{
          height:46px;
          border-radius:12px;
          border:none;
          cursor:pointer;
          font-weight:900;
          letter-spacing:0.4px;
        }
        .primaryBtnWide{ background:var(--blue); color:#fff; }
        .secondaryBtnWide{ background:#111827; color:#fff; opacity:0.92; }
        .dangerBtnWide{ background:#ef4444; color:#fff; }

        /* RESPONSIVE */
        @media (max-width: 1024px){
          .cardTitle{ font-size:44px; }
          .heroTitle{ font-size:52px; }
          .formsGrid{ grid-template-columns:1fr; }
          .loggedActions{ grid-template-columns:1fr; }
        }
        @media (max-width: 520px){
          .hero{ height:360px; }
          .heroTitle{ font-size:44px; }
        }
      `}</style>
    </div>
  );
}