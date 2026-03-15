import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  loginWithOtp,
  registerUser,
  sendOtp,
  verifyOtp,
  updateProfile,
  type Role,
} from "../services/api";
import { useAuth } from "../auth/AuthContext";

function normalizeInputMobile(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export default function MyAccount() {
  const navigate = useNavigate();
  const { user, loginWithTokens, logout, refreshMe } = useAuth();

  const HERO_BG =
    "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/pexels-yankrukov-8867241.jpg";

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  const [otpLoginMobile, setOtpLoginMobile] = useState("+91");
  const [otpLoginCode, setOtpLoginCode] = useState("");
  const [otpLoginSent, setOtpLoginSent] = useState(false);
  const [otpLoginLoading, setOtpLoginLoading] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("+91");
  const [regRole, setRegRole] = useState<Role | "">("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regOtpCode, setRegOtpCode] = useState("");
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regMobileVerified, setRegMobileVerified] = useState(false);

  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileMobile, setProfileMobile] = useState("");

  useEffect(() => {
    if (user) {
      setProfileFirstName(user.first_name || "");
      setProfileLastName(user.last_name || "");
      setProfileEmail(user.email || "");
      setProfileMobile(user.mobile_no || "");
    }
  }, [user]);

  const regPasswordMismatch = useMemo(() => {
    if (!regPassword || !regConfirmPassword) return false;
    return regPassword !== regConfirmPassword;
  }, [regPassword, regConfirmPassword]);

  async function onLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setRegisterError("");
    setSuccessMsg("");

    try {
      const data = await loginUser({
        username_or_email_or_mobile: loginUsername,
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
      const rawMsg =
        err?.response?.data?.password ||
        err?.response?.data?.username_or_email_or_mobile ||
        err?.response?.data?.detail ||
        "Login failed. Please try again.";

      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setLoginError(typeof msg === "string" ? msg : "Login failed.");
    }
  }

  async function sendLoginOtpNow() {
    setLoginError("");
    setSuccessMsg("");

    const mobile = otpLoginMobile.trim();
    if (!mobile || mobile === "+" || mobile === "+91") {
      setLoginError("Enter valid mobile number.");
      return;
    }

    try {
      setOtpLoginLoading(true);
      await sendOtp({
        mobile_no: mobile,
        purpose: "login",
      });
      setOtpLoginSent(true);
      setSuccessMsg("OTP sent successfully ✅");
    } catch (err: any) {
      const rawMsg = err?.response?.data?.detail || "Failed to send OTP.";
      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setLoginError(typeof msg === "string" ? msg : "Failed to send OTP.");
    } finally {
      setOtpLoginLoading(false);
    }
  }

  async function verifyLoginOtpNow(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setSuccessMsg("");

    if (!otpLoginMobile.trim() || otpLoginMobile.trim() === "+91") {
      setLoginError("Enter valid mobile number.");
      return;
    }

    if (!otpLoginCode.trim()) {
      setLoginError("Enter OTP.");
      return;
    }

    try {
      setOtpLoginLoading(true);

      const data = await loginWithOtp({
        mobile_no: otpLoginMobile.trim(),
        otp_code: otpLoginCode.trim(),
      });

      const access = data?.tokens?.access as string | undefined;
      const refresh = data?.tokens?.refresh as string | undefined;

      if (!access) {
        setLoginError("OTP login failed: Access token missing.");
        return;
      }

      await loginWithTokens(access, refresh, true);
      setSuccessMsg("OTP login successful ✅");
      navigate("/account-dashboard", { replace: true });
    } catch (err: any) {
      const rawMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.otp_code ||
        "OTP verification failed.";
      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setLoginError(typeof msg === "string" ? msg : "OTP verification failed.");
    } finally {
      setOtpLoginLoading(false);
    }
  }

  async function sendRegisterOtpNow() {
    setRegisterError("");
    setSuccessMsg("");

    if (!regMobile.trim() || regMobile.trim() === "+91") {
      setRegisterError("Enter valid mobile number.");
      return;
    }

    try {
      await sendOtp({
        mobile_no: regMobile.trim(),
        purpose: "register",
      });
      setRegOtpSent(true);
      setSuccessMsg("Registration OTP sent ✅");
    } catch (err: any) {
      const rawMsg = err?.response?.data?.detail || "Failed to send registration OTP.";
      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setRegisterError(typeof msg === "string" ? msg : "Failed to send registration OTP.");
    }
  }

  async function verifyRegisterOtpNow() {
    setRegisterError("");
    setSuccessMsg("");

    if (!regMobile.trim() || regMobile.trim() === "+91") {
      setRegisterError("Enter valid mobile number.");
      return;
    }

    if (!regOtpCode.trim()) {
      setRegisterError("Enter OTP.");
      return;
    }

    try {
      await verifyOtp({
        mobile_no: regMobile.trim(),
        otp_code: regOtpCode.trim(),
        purpose: "register",
      });
      setRegMobileVerified(true);
      setSuccessMsg("Mobile verified successfully ✅");
    } catch (err: any) {
      const rawMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.otp_code ||
        "OTP verification failed.";
      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setRegisterError(typeof msg === "string" ? msg : "OTP verification failed.");
    }
  }

  async function onRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setRegisterError("");
    setSuccessMsg("");

    if (!regRole) {
      setRegisterError("Please select User Type.");
      return;
    }

    if (!regMobile.trim() || regMobile.trim() === "+91") {
      setRegisterError("Enter valid mobile number.");
      return;
    }

    if (!regMobileVerified) {
      setRegisterError("Please verify mobile number first.");
      return;
    }

    if (regPasswordMismatch) {
      setRegisterError("Passwords do not match.");
      return;
    }

    try {
      const data = await registerUser({
        email: regEmail.trim(),
        mobile_no: regMobile.trim(),
        role: regRole,
        password: regPassword,
        confirm_password: regConfirmPassword,
      });

      if (data?.message && !data?.tokens?.access) {
        setSuccessMsg(data.message);
        return;
      }

      const access = data?.tokens?.access as string | undefined;
      const refresh = data?.tokens?.refresh as string | undefined;

      if (!access) {
        setRegisterError("Registration failed: Access token missing.");
        return;
      }

      await loginWithTokens(access, refresh, true);
      setSuccessMsg("Registered successfully ✅");
      navigate("/account-dashboard", { replace: true });
    } catch (err: any) {
      const d = err?.response?.data;
      const rawMsg =
        d?.email ||
        d?.mobile_no ||
        d?.role ||
        d?.password ||
        d?.confirm_password ||
        d?.detail ||
        "Registration failed. Please try again.";

      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setRegisterError(typeof msg === "string" ? msg : "Registration failed.");
    }
  }

  async function saveProfile() {
    try {
      setProfileLoading(true);
      await updateProfile({
        first_name: profileFirstName,
        last_name: profileLastName,
        email: profileEmail,
        mobile_no: profileMobile,
      });
      await refreshMe();
      setSuccessMsg("Profile updated successfully ✅");
      setEditingProfile(false);
    } catch (err: any) {
      const rawMsg =
        err?.response?.data?.email ||
        err?.response?.data?.mobile_no ||
        err?.response?.data?.detail ||
        "Profile update failed.";
      const msg = Array.isArray(rawMsg) ? rawMsg[0] : rawMsg;
      setLoginError(typeof msg === "string" ? msg : "Profile update failed.");
    } finally {
      setProfileLoading(false);
    }
  }

  return (
    <div className="page">
      <section className="hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">My Account</h1>
          <p className="heroSub">Login to access your dashboard, profile, orders and cart.</p>
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

            {!editingProfile ? (
              <>
                <p className="loggedSub">
                  Name: <b>{`${user.first_name || ""} ${user.last_name || ""}`.trim() || "-"}</b>
                  <br />
                  Username: <b>{user.username || "-"}</b>
                  <br />
                  Role: <b>{user.role || "-"}</b>
                  <br />
                  Email: <b>{user.email || "No email"}</b>
                  <br />
                  Mobile: <b>{user.mobile_no || "-"}</b>
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
                    className="secondaryBtnWide"
                    onClick={() => {
                      setProfileFirstName(user.first_name || "");
                      setProfileLastName(user.last_name || "");
                      setProfileEmail(user.email || "");
                      setProfileMobile(user.mobile_no || "");
                      setEditingProfile(true);
                    }}
                  >
                    EDIT PROFILE
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
              </>
            ) : (
              <div className="form">
                <label className="label">First Name</label>
                <input className="input" value={profileFirstName} onChange={(e) => setProfileFirstName(e.target.value)} />

                <label className="label" style={{ marginTop: 16 }}>Last Name</label>
                <input className="input" value={profileLastName} onChange={(e) => setProfileLastName(e.target.value)} />

                <label className="label" style={{ marginTop: 16 }}>Email</label>
                <input className="input" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />

                <label className="label" style={{ marginTop: 16 }}>Mobile Number</label>
                <input
                  className="input"
                  value={profileMobile}
                  onChange={(e) => setProfileMobile(normalizeInputMobile(e.target.value))}
                />

                <div className="loggedActions" style={{ marginTop: 18 }}>
                  <button className="primaryBtnWide" onClick={saveProfile} disabled={profileLoading}>
                    {profileLoading ? "SAVING..." : "SAVE PROFILE"}
                  </button>
                  <button className="secondaryBtnWide" onClick={() => setEditingProfile(false)}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="formsGrid">
            <section className="card">
              <h2 className="cardTitle">Login</h2>

              <form onSubmit={onLoginSubmit} className="form">
                <label className="label">Username / Email / Mobile</label>
                <input className="input" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />

                <label className="label" style={{ marginTop: 16 }}>Password</label>
                <div className="inputWrap">
                  <input
                    className="input"
                    type={showLoginPass ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="button" className="eyeBtn" onClick={() => setShowLoginPass((s) => !s)}>👁</button>
                </div>

                <div className="row">
                  <label className="check">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span>Remember me</span>
                  </label>
                </div>

                <button className="primaryBtn" type="submit">LOG IN</button>
                <a className="link" href="/forgot-password">Lost your password?</a>
              </form>

              <div className="dividerText">OR LOGIN WITH OTP</div>

              <form onSubmit={verifyLoginOtpNow} className="form">
                <label className="label">Mobile Number</label>
                <input
                  className="input"
                  value={otpLoginMobile}
                  onChange={(e) => setOtpLoginMobile(normalizeInputMobile(e.target.value))}
                  placeholder="+91 or your country code"
                />

                {!otpLoginSent ? (
                  <button type="button" className="secondaryBtn" style={{ marginTop: 14 }} onClick={sendLoginOtpNow} disabled={otpLoginLoading}>
                    {otpLoginLoading ? "SENDING..." : "SEND OTP"}
                  </button>
                ) : (
                  <>
                    <label className="label" style={{ marginTop: 16 }}>Enter OTP</label>
                    <input
                      className="input"
                      value={otpLoginCode}
                      onChange={(e) => setOtpLoginCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter OTP"
                    />

                    <button className="primaryBtn" type="submit" style={{ marginTop: 14 }} disabled={otpLoginLoading}>
                      {otpLoginLoading ? "VERIFYING..." : "VERIFY OTP & LOGIN"}
                    </button>
                  </>
                )}
              </form>
            </section>

            <section className="card">
              <h2 className="cardTitle">Register</h2>

              <form onSubmit={onRegisterSubmit} className="form">
                <label className="label">Email address (optional)</label>
                <input
                  className="input"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="You can leave this blank"
                />

                <label className="label" style={{ marginTop: 16 }}>
                  Mobile Number <span className="req">*</span>
                </label>
                <input
                  className="input"
                  value={regMobile}
                  onChange={(e) => {
                    setRegMobile(normalizeInputMobile(e.target.value));
                    setRegMobileVerified(false);
                  }}
                  placeholder="+91 by default, or enter your country code"
                />

                <div className="otpRow">
                  <button type="button" className="secondaryBtn" onClick={sendRegisterOtpNow}>
                    {regOtpSent ? "RESEND OTP" : "SEND OTP"}
                  </button>
                </div>

                {regOtpSent && (
                  <>
                    <label className="label" style={{ marginTop: 16 }}>Enter OTP</label>
                    <div className="otpVerifyRow">
                      <input
                        className="input"
                        value={regOtpCode}
                        onChange={(e) => setRegOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter OTP"
                      />
                      <button type="button" className="secondaryBtn" onClick={verifyRegisterOtpNow}>
                        VERIFY
                      </button>
                    </div>
                    {regMobileVerified && <div className="verifyOk">Mobile verified ✅</div>}
                  </>
                )}

                <label className="label" style={{ marginTop: 16 }}>
                  User Type <span className="req">*</span>
                </label>
                <select className="select" value={regRole} onChange={(e) => setRegRole(e.target.value as Role)}>
                  <option value="">- - - Select User Role - - -</option>
                  <option value="Individual Customer">Individual Customer</option>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
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
                  <button type="button" className="eyeBtn" onClick={() => setShowRegPass((s) => !s)}>👁</button>
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
                  <button type="button" className="eyeBtn" onClick={() => setShowRegConfirmPass((s) => !s)}>👁</button>
                </div>

                {regPasswordMismatch && <div className="errorText">Passwords do not match.</div>}

                <button className="primaryBtn" type="submit" disabled={regPasswordMismatch}>
                  REGISTER
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
        .heroOverlay{ position:absolute; inset:0; background:rgba(0,0,0,0.35); }
        .heroContent{ position:relative; text-align:center; color:#fff; padding:0 18px; }
        .heroTitle{ font-size:66px; font-weight:800; margin:0; text-shadow:0 4px 18px rgba(0,0,0,0.35); }
        .heroSub{ margin-top:10px; font-size:18px; opacity:0.95; }

        .contentWrap{ max-width:1320px; margin:0 auto; padding:70px 22px 90px; }
        .topMsgWrap{ margin-bottom:18px; display:flex; flex-direction:column; gap:10px; }
        .msgSuccess{ background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; padding:12px 14px; border-radius:10px; font-weight:700; }
        .msgError{ background:#fef2f2; color:#991b1b; border:1px solid #fecaca; padding:12px 14px; border-radius:10px; font-weight:700; }

        .formsGrid{ display:grid; grid-template-columns: 1fr 1fr; gap:42px; align-items:start; }

        .card, .loggedCard{
          border:1px solid var(--cardBorder);
          border-radius:12px;
          padding:28px;
          background:#fff;
        }

        .cardTitle{ font-size:46px; font-weight:900; margin:0 0 18px; color:#0b0b0b; }
        .loggedTitle{ margin:0; font-size:32px; font-weight:900; color:#0b0b0b; }

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
          box-sizing:border-box;
        }

        .select{ border-radius:10px; height:52px; }

        .inputWrap{ position:relative; width:100%; }
        .eyeBtn{
          position:absolute; right:14px; top:50%;
          transform:translateY(-50%);
          background:transparent; border:none; cursor:pointer;
          font-size:18px; opacity:0.85;
        }

        .otpRow{ margin-top:14px; }
        .otpVerifyRow{ display:flex; gap:10px; align-items:flex-end; }
        .verifyOk{ margin-top:10px; color:#16a34a; font-weight:800; }

        .row{ display:flex; align-items:center; justify-content:space-between; margin:14px 0 8px; }
        .check{ display:flex; align-items:center; gap:10px; font-size:16px; user-select:none; }
        .check input{ width:16px; height:16px; }

        .primaryBtn, .secondaryBtn{
          margin-top:10px;
          height:46px;
          border:none;
          border-radius:999px;
          color:#fff;
          font-weight:900;
          letter-spacing:0.8px;
          cursor:pointer;
          padding:0 18px;
        }

        .primaryBtn{ background:var(--blue); }
        .secondaryBtn{ background:#111827; }

        .link{ margin-top:16px; color:#111827; text-decoration:none; font-size:16px; }
        .inputError{ border-color:#ef4444 !important; }
        .errorText{ margin-top:10px; color:#ef4444; font-weight:700; }

        .dividerText{
          margin:24px 0 12px;
          text-align:center;
          font-size:13px;
          font-weight:900;
          color:#6b7280;
          letter-spacing:1px;
        }

        .loggedSub{ margin:10px 0 18px; color:#374151; line-height:1.9; }
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

        @media (max-width: 1024px){
          .cardTitle{ font-size:36px; }
          .heroTitle{ font-size:52px; }
          .formsGrid{ grid-template-columns:1fr; }
          .loggedActions{ grid-template-columns:1fr; }
          .otpVerifyRow{ flex-direction:column; align-items:stretch; }
        }
      `}</style>
    </div>
  );
}