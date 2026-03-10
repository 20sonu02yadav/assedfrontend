import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  type Role,
} from "../services/api";
import { useAuth } from "../auth/AuthContext";

export default function MyAccount() {
  const navigate = useNavigate();
  const { user, loginWithTokens, logout } = useAuth();

  const HERO_BG =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

  // LOGIN
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // REGISTER
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regOtp, setRegOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [regRole, setRegRole] = useState<Role | "">("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  // UI
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const regPasswordMismatch = useMemo(() => {
    if (!regPassword || !regConfirmPassword) return false;
    return regPassword !== regConfirmPassword;
  }, [regPassword, regConfirmPassword]);

  async function handleSendOtp() {
    setRegisterError("");
    setSuccessMsg("");

    if (!regMobile.trim()) {
      setRegisterError("Please enter mobile number first.");
      return;
    }

    try {
      setOtpLoading(true);
      await sendOtp({
        mobile_no: regMobile.trim(),
        purpose: "register",
      });
      setOtpSent(true);
      setSuccessMsg("OTP sent successfully ✅");
    } catch (err: any) {
      const d = err?.response?.data;
      setRegisterError(
        d?.mobile_no || d?.detail || "Failed to send OTP. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setRegisterError("");
    setSuccessMsg("");

    if (!regMobile.trim() || !regOtp.trim()) {
      setRegisterError("Please enter mobile number and OTP.");
      return;
    }

    try {
      setOtpVerifyLoading(true);
      await verifyOtp({
        mobile_no: regMobile.trim(),
        otp_code: regOtp.trim(),
        purpose: "register",
      });
      setOtpVerified(true);
      setSuccessMsg("Mobile number verified successfully ✅");
    } catch (err: any) {
      const d = err?.response?.data;
      setRegisterError(
        d?.otp_code || d?.mobile_no || d?.detail || "Invalid OTP."
      );
    } finally {
      setOtpVerifyLoading(false);
    }
  }

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setRegisterError("");
    setSuccessMsg("");

    try {
      setLoginLoading(true);

      const data = await loginUser({
        username_or_email_or_mobile: loginIdentifier,
        password: loginPassword,
      });

      const access = data?.tokens?.access as string | undefined;
      const refresh = data?.tokens?.refresh as string | undefined;

      if (!access) {
        setLoginError("Login failed: Access token missing.");
        return;
      }

      await loginWithTokens(access, refresh, rememberMe);

      setSuccessMsg("Login successful ✅");
      navigate("/account-dashboard", { replace: true });
    } catch (err: any) {
      const d = err?.response?.data;
      const msg =
        d?.password ||
        d?.username_or_email_or_mobile ||
        d?.detail ||
        "Login failed. Please try again.";
      setLoginError(typeof msg === "string" ? msg : "Login failed.");
    } finally {
      setLoginLoading(false);
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

    if (!regMobile.trim()) {
      setRegisterError("Please enter mobile number.");
      return;
    }

    if (!otpVerified) {
      setRegisterError("Please verify mobile number with OTP first.");
      return;
    }

    try {
      setRegisterLoading(true);

      const data = await registerUser({
        email: regEmail,
        mobile_no: regMobile,
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

      await loginWithTokens(access, refresh, true);

      setSuccessMsg("Registered successfully ✅");

      setRegEmail("");
      setRegMobile("");
      setRegOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setRegRole("");
      setRegPassword("");
      setRegConfirmPassword("");

      navigate("/account-dashboard", { replace: true });
    } catch (err: any) {
      const d = err?.response?.data;
      const msg =
        d?.email ||
        d?.mobile_no ||
        d?.role ||
        d?.password ||
        d?.confirm_password ||
        d?.detail ||
        "Registration failed. Please try again.";
      setRegisterError(typeof msg === "string" ? msg : "Registration failed.");
    } finally {
      setRegisterLoading(false);
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

        {user ? (
          <section className="loggedCard">
            <h2 className="loggedTitle">Welcome, {user.username} 👋</h2>
            <p className="loggedSub">
              You are logged in as <b>{user.role}</b> ({user.email})
            </p>

            <div className="loggedActions">
              <button
                className="primaryBtnWide"
                onClick={() => navigate("/account-dashboard")}
              >
                GO TO DASHBOARD
              </button>

              <button
                className="secondaryBtnWide"
                onClick={() => navigate("/orders")}
              >
                VIEW ORDERS
              </button>

              <button
                className="secondaryBtnWide"
                onClick={() => navigate("/cart")}
              >
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
            {/* LOGIN */}
            <section className="card">
              <h2 className="cardTitle">Login</h2>

              <form onSubmit={onLoginSubmit} className="form">
                <label className="label">
                  Username / Email / Mobile with Country Code <span className="req">*</span>
                </label>
                <input
                  className="input"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter username, email or mobile number with  country code"
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
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="eyeBtn"
                    onClick={() => setShowLoginPass((s) => !s)}
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

                <button className="primaryBtn" type="submit" disabled={loginLoading}>
                  {loginLoading ? "LOGGING IN..." : "LOG IN"}
                </button>

                <a className="link" href="/forgot-password">
                  Lost your password?
                </a>
              </form>
            </section>

            {/* REGISTER */}
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
                  placeholder="Enter email address"
                />

                <label className="label" style={{ marginTop: 16 }}>
                  Mobile Number <span className="req">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  value={regMobile}
                  onChange={(e) => {
                    setRegMobile(e.target.value);
                    setOtpVerified(false);
                  }}
                  placeholder="Enter mobile number with country code"
                />

                <div className="otpRow">
                  <button
                    type="button"
                    className="otpBtn"
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                  >
                    {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                </div>

                {otpSent && (
                  <>
                    <label className="label" style={{ marginTop: 16 }}>
                      Enter OTP <span className="req">*</span>
                    </label>
                    <div className="otpVerifyRow">
                      <input
                        className="input otpInput"
                        type="text"
                        value={regOtp}
                        onChange={(e) => setRegOtp(e.target.value)}
                        placeholder="Enter OTP"
                      />
                      <button
                        type="button"
                        className={`otpBtn ${otpVerified ? "otpVerifiedBtn" : ""}`}
                        onClick={handleVerifyOtp}
                        disabled={otpVerifyLoading || otpVerified}
                      >
                        {otpVerified
                          ? "Verified ✅"
                          : otpVerifyLoading
                          ? "Verifying..."
                          : "Verify OTP"}
                      </button>
                    </div>
                  </>
                )}

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
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="eyeBtn"
                    onClick={() => setShowRegPass((s) => !s)}
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
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="eyeBtn"
                    onClick={() => setShowRegConfirmPass((s) => !s)}
                  >
                    👁
                  </button>
                </div>

                {regPasswordMismatch && (
                  <div className="errorText">Passwords do not match.</div>
                )}

                <p className="muted" style={{ marginTop: 16 }}>
                  Your personal data will be used to support your experience throughout
                  this website, to manage access to your account, and for other
                  purposes described in our privacy policy.
                </p>

                <button
                  className="primaryBtn"
                  type="submit"
                  disabled={regPasswordMismatch || registerLoading || !otpVerified}
                >
                  {registerLoading ? "REGISTERING..." : "REGISTER"}
                </button>
              </form>
            </section>
          </div>
        )}
      </main>

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
        .heroOverlay{
          position:absolute;
          inset:0;
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
          text-shadow:0 4px 18px rgba(0,0,0,0.35);
        }
        .heroSub{
          margin-top:10px;
          font-size:18px;
          opacity:0.95;
        }

        .contentWrap{
          max-width:1320px;
          margin:0 auto;
          padding:70px 22px 90px;
        }

        .topMsgWrap{
          margin-bottom:18px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .msgSuccess{
          background:#ecfdf5;
          color:#065f46;
          border:1px solid #a7f3d0;
          padding:12px 14px;
          border-radius:10px;
          font-weight:700;
        }
        .msgError{
          background:#fef2f2;
          color:#991b1b;
          border:1px solid #fecaca;
          padding:12px 14px;
          border-radius:10px;
          font-weight:700;
        }

        .formsGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:42px;
          align-items:start;
        }

        .card{
          border:1px solid var(--cardBorder);
          border-radius:14px;
          padding:28px 28px 26px;
          background:#fff;
        }
        .cardTitle{
          font-size:56px;
          font-weight:900;
          margin:0 0 18px;
          color:#0b0b0b;
        }
        .form{
          display:flex;
          flex-direction:column;
        }
        .label{
          font-size:16px;
          font-weight:700;
          color:#111827;
        }
        .req{
          color:#ef4444;
          font-weight:900;
        }

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

        .select{
          border-radius:10px;
          height:52px;
        }

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
          user-select:none;
        }
        .check input{
          width:16px;
          height:16px;
        }

        .otpRow{
          margin-top:10px;
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        .otpVerifyRow{
          margin-top:10px;
          display:flex;
          gap:10px;
          align-items:center;
        }

        .otpInput{
          flex:1;
          margin-top:0;
        }

        .otpBtn{
          height:46px;
          padding:0 18px;
          border:none;
          border-radius:999px;
          background:#111827;
          color:#fff;
          font-weight:900;
          cursor:pointer;
          white-space:nowrap;
        }

        .otpVerifiedBtn{
          background:#16a34a;
        }

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

        .primaryBtn:disabled,
        .otpBtn:disabled{
          opacity:0.55;
          cursor:not-allowed;
        }

        .link{
          margin-top:16px;
          color:#111827;
          text-decoration:none;
          font-size:16px;
        }
        .link:hover{
          text-decoration:underline;
        }

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

        .loggedCard{
          border:1px solid var(--cardBorder);
          border-radius:14px;
          padding:22px;
          background:#fff;
        }

        .loggedTitle{
          margin:0;
          font-size:32px;
          font-weight:900;
          color:#0b0b0b;
        }

        .loggedSub{
          margin:10px 0 18px;
          color:#374151;
        }

        .loggedActions{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:12px;
        }

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

        @media (max-width: 1024px){
          .cardTitle{ font-size:44px; }
          .heroTitle{ font-size:52px; }
          .formsGrid{ grid-template-columns:1fr; }
          .loggedActions{ grid-template-columns:1fr; }
        }

        @media (max-width: 640px){
          .otpVerifyRow{
            flex-direction:column;
            align-items:stretch;
          }

          .otpInput{
            width:100%;
          }

          .otpBtn{
            width:100%;
          }
        }

        @media (max-width: 520px){
          .hero{ height:360px; }
          .heroTitle{ font-size:44px; }
          .card{ padding:22px 18px; }
          .cardTitle{ font-size:36px; }
          .primaryBtn{ width:100%; }
        }
      `}</style>
    </div>
  );
}