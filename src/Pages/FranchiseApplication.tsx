
import React, { useMemo, useState } from "react";

const LOGO_URL =
  "https://dev-tunturu.pantheonsite.io/wp-content/uploads/2026/02/cropped-TUNTURU-LOGO-scaled-1-2048x681.png";

const HERO_BG =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2400&q=80";

type TypeOfBusiness = "Proprietorship" | "Partnership" | "Pvt Ltd" | "Ltd Co" | "Other";
type NatureOfBusiness = "Retail" | "Wholesale" | "Distribution" | "Online" | "Other";
type YesNo = "Yes" | "No";

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://127.0.0.1:8000";
const ENDPOINT = `${API_BASE}/api/franchise-applications/`;

export default function FranchiseApplication() {
  const yearsOptions = useMemo(
    () => ["Less than 1", "1-2", "3-5", "6-10", "10+"] as const,
    []
  );

  // radio states
  const [typeOfBusiness, setTypeOfBusiness] = useState<TypeOfBusiness>("Proprietorship");
  const [natureOfBusiness, setNatureOfBusiness] = useState<NatureOfBusiness>("Retail");
  const [warehouse, setWarehouse] = useState<YesNo>("No");
  const [yearsInOperation, setYearsInOperation] = useState<(typeof yearsOptions)[number]>("Less than 1");

  // field states
  const [registeredBusinessName, setRegisteredBusinessName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [gstin, setGstin] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [primaryContactPerson, setPrimaryContactPerson] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [alternateContactPerson, setAlternateContactPerson] = useState("");
  const [mainProductCategories, setMainProductCategories] = useState("");
  const [geographicalCoverage, setGeographicalCoverage] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [warehouseDetails, setWarehouseDetails] = useState("");
  const [existingDealerships, setExistingDealerships] = useState("");

  const [confirm, setConfirm] = useState(false);

  // ui states
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!confirm) {
      setErrorMsg("Please confirm that the information provided is accurate.");
      return;
    }

    const payload = {
      registered_business_name: registeredBusinessName,
      trading_name: tradingName,
      type_of_business: typeOfBusiness,
      gstin,
      city,
      state: stateName,
      postal_code: postalCode,
      primary_contact_person: primaryContactPerson,
      designation,
      email,
      alternate_contact_person: alternateContactPerson,
      years_in_operation: yearsInOperation,
      nature_of_business: natureOfBusiness,
      main_product_categories: mainProductCategories,
      geographical_coverage: geographicalCoverage,
      number_of_employees: numberOfEmployees,
      annual_turnover: annualTurnover,
      warehouse_facility: warehouse,
      warehouse_details: warehouseDetails,
      existing_dealerships: existingDealerships,
      confirm: true,
    };

    try {
      setSubmitting(true);

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // DRF validation object -> show best message
        const firstKey = data && typeof data === "object" ? Object.keys(data)[0] : null;
        const firstVal =
          firstKey && Array.isArray(data[firstKey]) ? data[firstKey][0] : data?.detail || "Submission failed";
        setErrorMsg(String(firstVal));
        return;
      }

      setSuccessMsg("Application submitted successfully!");
      // reset form
      setRegisteredBusinessName("");
      setTradingName("");
      setGstin("");
      setCity("");
      setStateName("");
      setPostalCode("");
      setPrimaryContactPerson("");
      setDesignation("");
      setEmail("");
      setAlternateContactPerson("");
      setMainProductCategories("");
      setGeographicalCoverage("");
      setNumberOfEmployees("");
      setAnnualTurnover("");
      setWarehouseDetails("");
      setExistingDealerships("");
      setConfirm(false);
      setTypeOfBusiness("Proprietorship");
      setNatureOfBusiness("Retail");
      setWarehouse("No");
      setYearsInOperation("Less than 1");
    } catch (err: any) {
      setErrorMsg(err?.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
     

      <section style={{ ...styles.hero, backgroundImage: `url(${HERO_BG})` }}>
        <div style={styles.heroDim} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Franchise Application</h1>
        </div>
      </section>

      <section style={styles.bodyWrap}>
        <form onSubmit={onSubmit} style={styles.formOuter}>
          <div style={styles.formInner}>

            {errorMsg ? <div style={styles.alertError}>{errorMsg}</div> : null}
            {successMsg ? <div style={styles.alertSuccess}>{successMsg}</div> : null}

            <div style={styles.field}>
              <label style={styles.label}>
                Registered Business Name <span style={styles.req}>*</span>
              </label>
              <input
                required
                style={styles.input}
                value={registeredBusinessName}
                onChange={(e) => setRegisteredBusinessName(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Trading Name</label>
              <input
                style={styles.input}
                value={tradingName}
                onChange={(e) => setTradingName(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Type of Business <span style={styles.req}>*</span>
              </label>
              <div style={styles.radioCol}>
                {(["Proprietorship", "Partnership", "Pvt Ltd", "Ltd Co", "Other"] as TypeOfBusiness[]).map((v) => (
                  <label key={v} style={styles.radioRow}>
                    <input
                      type="radio"
                      name="typeOfBusiness"
                      checked={typeOfBusiness === v}
                      onChange={() => setTypeOfBusiness(v)}
                    />
                    <span style={styles.radioText}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>GSTIN (Tax Identification Number)</label>
              <input style={styles.input} value={gstin} onChange={(e) => setGstin(e.target.value)} />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                City <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                State <span style={styles.req}>*</span>
              </label>
              <input required style={styles.input} value={stateName} onChange={(e) => setStateName(e.target.value)} />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Postal Code <span style={styles.req}>*</span>
              </label>
              <input
                required
                style={styles.input}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Primary Contact Person <span style={styles.req}>*</span>
              </label>
              <input
                required
                style={styles.input}
                value={primaryContactPerson}
                onChange={(e) => setPrimaryContactPerson(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Designation <span style={styles.req}>*</span>
              </label>
              <input
                required
                style={styles.input}
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Email Address <span style={styles.req}>*</span>
              </label>
              <input
                required
                type="email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Alternate Contact Person</label>
              <input
                style={styles.input}
                value={alternateContactPerson}
                onChange={(e) => setAlternateContactPerson(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Years in Operation <span style={styles.req}>*</span>
              </label>
              <select
                required
                value={yearsInOperation}
                onChange={(e) => setYearsInOperation(e.target.value as any)}
                style={styles.select}
              >
                {yearsOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Nature of Business <span style={styles.req}>*</span>
              </label>
              <div style={styles.radioCol}>
                {(["Retail", "Wholesale", "Distribution", "Online", "Other"] as NatureOfBusiness[]).map((v) => (
                  <label key={v} style={styles.radioRow}>
                    <input
                      type="radio"
                      name="natureOfBusiness"
                      checked={natureOfBusiness === v}
                      onChange={() => setNatureOfBusiness(v)}
                    />
                    <span style={styles.radioText}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Main Product Categories <span style={styles.req}>*</span>
              </label>
              <textarea
                required
                rows={5}
                style={styles.textarea}
                value={mainProductCategories}
                onChange={(e) => setMainProductCategories(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Geographical Coverage <span style={styles.req}>*</span>
              </label>
              <input
                required
                style={styles.input}
                value={geographicalCoverage}
                onChange={(e) => setGeographicalCoverage(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Number of Employees</label>
              <input
                style={styles.input}
                value={numberOfEmployees}
                onChange={(e) => setNumberOfEmployees(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Annual Turnover</label>
              <input
                style={styles.input}
                value={annualTurnover}
                onChange={(e) => setAnnualTurnover(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Storage/Warehouse Facility <span style={styles.req}>*</span>
              </label>
              <div style={styles.radioCol}>
                {(["Yes", "No"] as YesNo[]).map((v) => (
                  <label key={v} style={styles.radioRow}>
                    <input type="radio" name="warehouse" checked={warehouse === v} onChange={() => setWarehouse(v)} />
                    <span style={styles.radioText}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>If Yes specify size/details</label>
              <textarea
                rows={5}
                style={styles.textarea}
                value={warehouseDetails}
                onChange={(e) => setWarehouseDetails(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Existing Dealerships / Brands Represented</label>
              <textarea
                rows={4}
                style={styles.textarea}
                value={existingDealerships}
                onChange={(e) => setExistingDealerships(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                I confirm that the information provided is accurate. <span style={styles.req}>*</span>
              </label>

              <label style={{ ...styles.radioRow, marginTop: 10 }}>
                <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
                <span style={styles.radioText}>I confirm that the information provided is accurate.</span>
              </label>

              <button type="submit" style={styles.submitBtn} disabled={submitting}>
                {submitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

/* ============================ STYLES ============================ */
const styles: Record<string, React.CSSProperties> = {
  page: { background: "#f4f6f8", minHeight: "100vh" },

  /* Header */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: 92,
  },
  headerStrip: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.28)",
  },
  headerInner: {
    position: "relative",
    height: "100%",
    padding: "0 26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  logoWrap: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoImg: { height: 34, width: "auto", objectFit: "contain" },

  nav: { display: "flex", alignItems: "center", gap: 26 },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 800,
    letterSpacing: 0.6,
    fontSize: 14,
    opacity: 0.98,
  },
  navDrop: { display: "flex", alignItems: "center", gap: 8 },
  navDropIcon: { color: "#fff", opacity: 0.95, marginTop: -2 },

  headerRight: { display: "flex", alignItems: "center", gap: 18 },
  headerMeta: { color: "#fff", fontWeight: 800, fontSize: 14, opacity: 0.98 },
  headerIcon: { color: "#fff", fontSize: 18, opacity: 0.98 },

  /* Hero */
  hero: {
    height: 520,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  heroDim: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" },
  heroContent: {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 64,
    fontWeight: 900,
    margin: 0,
    letterSpacing: 0.2,
  },

  /* Form section */
  bodyWrap: { padding: "60px 18px 90px" },
  formOuter: {
    maxWidth: 1100,
    margin: "0 auto",
    background: "#efefef",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: 0,
  },
  formInner: { padding: "34px 34px", display: "grid", gridTemplateColumns: "1fr", gap: 22 },

  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: 18, fontWeight: 700, color: "#111" },
  req: { color: "red", fontWeight: 900 },

  input: {
    marginTop: 10,
    height: 56,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "0 18px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
  },
  select: {
    marginTop: 10,
    height: 52,
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "0 14px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
  },
  textarea: {
    marginTop: 10,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "14px 16px",
    outline: "none",
    fontSize: 16,
    background: "#fff",
    resize: "vertical",
  },
  radioCol: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 },
  radioRow: { display: "flex", alignItems: "center", gap: 10 },
  radioText: { fontSize: 16, color: "#111" },

  submitBtn: {
    marginTop: 18,
    background: "#0b82ff",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 22px",
    fontWeight: 900,
    width: "fit-content",
    cursor: "pointer",
    letterSpacing: 0.4,
  },

  /* Footer */
  footer: { background: "#000", color: "#fff", paddingTop: 60 },
  footerTop: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px 42px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: 44,
  },
  footerCol: { display: "flex", flexDirection: "column" },
  footerText: { color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 10 },
  footerTitle: { fontSize: 22, fontWeight: 800 },
  footerTitleLine: { width: 70, height: 2, background: "#77a7ff", marginTop: 10, marginBottom: 18 },
  footerLink: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: 18,
    marginBottom: 14,
    width: "fit-content",
  },
  socialRow: { display: "flex", gap: 12, marginTop: 14 },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: 999,
    background: "#fff",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.08)", padding: "26px 0" },
  footerBottomInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerBottomText: { color: "rgba(255,255,255,0.9)", fontSize: 18 },

  /* Floating buttons */
  cartFab: {
    position: "fixed",
    right: 22,
    bottom: 120,
    width: 70,
    height: 70,
    borderRadius: 999,
    border: "none",
    background: "#0b82ff",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  cartBadge: {
    position: "absolute",
    top: 10,
    left: 12,
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "#34c759",
    color: "#fff",
    fontSize: 12,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topFab: {
    position: "fixed",
    left: 22,
    bottom: 120,
    width: 60,
    height: 60,
    borderRadius: 999,
    border: "none",
    background: "#8aa2ff",
    color: "#000",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
};