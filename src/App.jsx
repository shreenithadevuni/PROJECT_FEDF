import { useState, useEffect, useRef } from "react";

// ─── COLOR PALETTE (from uploaded template) ───────────────────────────────
const C = {
  forest: "#1a3a2a",
  moss: "#2d5a3d",
  leaf: "#4a9b6f",
  lime: "#8fcb5e",
  cream: "#f5f0e8",
  sand: "#e8dfc8",
  terra: "#c4623a",
  gold: "#d4a843",
  white: "#fdfcf8",
  dark: "#111a15",
};

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────
const PRODUCTS_DATA = [
  // Personal Care
  { id: 1, name: "Bamboo Toothbrush", category: "Personal Care", brand: "EcoLife", price: 149, material: 96, carbon: 94, recyclability: 97, brandPractice: 93, icon: "🪥", img: "🌿" },
  { id: 2, name: "Organic Shampoo", category: "Personal Care", brand: "EarthPure", price: 299, material: 93, carbon: 91, recyclability: 92, brandPractice: 92, icon: "🧴", img: "🌸" },
  { id: 3, name: "Natural Soap", category: "Personal Care", brand: "NatureWay", price: 89, material: 90, carbon: 86, recyclability: 88, brandPractice: 88, icon: "🧼", img: "🌺" },
  { id: 4, name: "Refillable Deodorant", category: "Personal Care", brand: "GreenNest", price: 349, material: 84, carbon: 83, recyclability: 86, brandPractice: 83, icon: "🌿", img: "♻️" },
  { id: 5, name: "Bamboo Comb", category: "Personal Care", brand: "EcoLife", price: 199, material: 92, carbon: 89, recyclability: 91, brandPractice: 88, icon: "🪮", img: "🎋" },
  // Kitchen
  { id: 6, name: "Steel Water Bottle", category: "Kitchen", brand: "GreenNest", price: 599, material: 97, carbon: 95, recyclability: 97, brandPractice: 95, icon: "🍶", img: "⚙️" },
  { id: 7, name: "Bamboo Cutlery Set", category: "Kitchen", brand: "EcoLife", price: 449, material: 93, carbon: 90, recyclability: 92, brandPractice: 89, icon: "🍴", img: "🎋" },
  { id: 8, name: "Reusable Straw Set", category: "Kitchen", brand: "EarthPure", price: 249, material: 90, carbon: 88, recyclability: 90, brandPractice: 88, icon: "🥤", img: "🌱" },
  { id: 9, name: "Glass Storage Jar", category: "Kitchen", brand: "NatureWay", price: 199, material: 83, carbon: 81, recyclability: 84, brandPractice: 80, icon: "🫙", img: "✨" },
  { id: 10, name: "Compost Bin", category: "Kitchen", brand: "GreenNest", price: 799, material: 86, carbon: 84, recyclability: 87, brandPractice: 83, icon: "🗑️", img: "🌍" },
  // Food & Beverage
  { id: 11, name: "Organic Coffee", category: "Food & Beverage", brand: "EarthPure", price: 399, material: 79, carbon: 77, recyclability: 79, brandPractice: 77, icon: "☕", img: "🌿" },
  { id: 12, name: "Fair Trade Tea", category: "Food & Beverage", brand: "NatureWay", price: 249, material: 82, carbon: 80, recyclability: 82, brandPractice: 80, icon: "🍵", img: "🌱" },
  { id: 13, name: "Organic Honey", category: "Food & Beverage", brand: "EcoLife", price: 349, material: 85, carbon: 83, recyclability: 85, brandPractice: 83, icon: "🍯", img: "🐝" },
  { id: 14, name: "Plant-Based Milk", category: "Food & Beverage", brand: "GreenNest", price: 159, material: 88, carbon: 86, recyclability: 88, brandPractice: 86, icon: "🥛", img: "🌾" },
  { id: 15, name: "Organic Rice", category: "Food & Beverage", brand: "EarthPure", price: 199, material: 80, carbon: 78, recyclability: 80, brandPractice: 78, icon: "🍚", img: "🌾" },
  // Clothing
  { id: 16, name: "Organic Cotton T-Shirt", category: "Clothing", brand: "EcoWear", price: 699, material: 93, carbon: 91, recyclability: 93, brandPractice: 91, icon: "👕", img: "🌱" },
  { id: 17, name: "Recycled Denim Jeans", category: "Clothing", brand: "EcoWear", price: 1299, material: 89, carbon: 87, recyclability: 89, brandPractice: 87, icon: "👖", img: "♻️" },
  { id: 18, name: "Hemp Hoodie", category: "Clothing", brand: "NatureWay", price: 999, material: 86, carbon: 84, recyclability: 86, brandPractice: 84, icon: "🧥", img: "🌿" },
  { id: 19, name: "Bamboo Socks", category: "Clothing", brand: "EcoLife", price: 299, material: 84, carbon: 82, recyclability: 84, brandPractice: 82, icon: "🧦", img: "🎋" },
  { id: 20, name: "Recycled Jacket", category: "Clothing", brand: "EcoWear", price: 1999, material: 91, carbon: 89, recyclability: 91, brandPractice: 89, icon: "🧣", img: "♻️" },
  // Footwear
  { id: 21, name: "Recycled Sneakers", category: "Footwear", brand: "EcoWear", price: 1499, material: 89, carbon: 87, recyclability: 89, brandPractice: 87, icon: "👟", img: "♻️" },
  { id: 22, name: "Vegan Sandals", category: "Footwear", brand: "NatureWay", price: 799, material: 83, carbon: 81, recyclability: 83, brandPractice: 81, icon: "👡", img: "🌱" },
  { id: 23, name: "Cork Slippers", category: "Footwear", brand: "EcoLife", price: 599, material: 81, carbon: 79, recyclability: 81, brandPractice: 79, icon: "🥿", img: "🍂" },
  { id: 24, name: "Eco Running Shoes", category: "Footwear", brand: "EcoWear", price: 1799, material: 92, carbon: 90, recyclability: 92, brandPractice: 90, icon: "👟", img: "🌿" },
  { id: 25, name: "Hemp Shoes", category: "Footwear", brand: "NatureWay", price: 899, material: 85, carbon: 83, recyclability: 85, brandPractice: 83, icon: "🥾", img: "🌿" },
  // Home Essentials
  { id: 26, name: "Solar Lamp", category: "Home Essentials", brand: "GreenNest", price: 1299, material: 98, carbon: 98, recyclability: 98, brandPractice: 98, icon: "💡", img: "☀️" },
  { id: 27, name: "LED Bulb Pack", category: "Home Essentials", brand: "GreenNest", price: 399, material: 95, carbon: 93, recyclability: 95, brandPractice: 93, icon: "💡", img: "⚡" },
  { id: 28, name: "Eco Paint", category: "Home Essentials", brand: "EarthPure", price: 899, material: 84, carbon: 82, recyclability: 84, brandPractice: 82, icon: "🎨", img: "🌿" },
  { id: 29, name: "Recycled Carpet", category: "Home Essentials", brand: "NatureWay", price: 1999, material: 80, carbon: 78, recyclability: 80, brandPractice: 78, icon: "🛋️", img: "♻️" },
  { id: 30, name: "Organic Bedsheet", category: "Home Essentials", brand: "EcoLife", price: 1299, material: 88, carbon: 86, recyclability: 88, brandPractice: 86, icon: "🛏️", img: "🌸" },
  // Electronics
  { id: 31, name: "Solar Power Bank", category: "Electronics", brand: "GreenNest", price: 1999, material: 90, carbon: 88, recyclability: 90, brandPractice: 88, icon: "🔋", img: "☀️" },
  { id: 32, name: "Energy Efficient Fan", category: "Electronics", brand: "GreenNest", price: 2499, material: 87, carbon: 85, recyclability: 87, brandPractice: 85, icon: "🌀", img: "⚡" },
  { id: 33, name: "Smart LED Lamp", category: "Electronics", brand: "EarthPure", price: 799, material: 83, carbon: 81, recyclability: 83, brandPractice: 81, icon: "🔦", img: "💡" },
  { id: 34, name: "Solar Charger", category: "Electronics", brand: "GreenNest", price: 1499, material: 96, carbon: 94, recyclability: 96, brandPractice: 94, icon: "⚡", img: "☀️" },
  { id: 35, name: "Eco Laptop Sleeve", category: "Electronics", brand: "EcoWear", price: 599, material: 81, carbon: 79, recyclability: 81, brandPractice: 79, icon: "💻", img: "🌿" },
  // Stationery
  { id: 36, name: "Recycled Notebook", category: "Stationery", brand: "EarthPure", price: 199, material: 93, carbon: 91, recyclability: 93, brandPractice: 91, icon: "📓", img: "♻️" },
  { id: 37, name: "Seed Pencil", category: "Stationery", brand: "NatureWay", price: 49, material: 89, carbon: 87, recyclability: 89, brandPractice: 87, icon: "✏️", img: "🌱" },
  { id: 38, name: "Eco Pen", category: "Stationery", brand: "EcoLife", price: 79, material: 85, carbon: 83, recyclability: 85, brandPractice: 83, icon: "🖊️", img: "🌿" },
  { id: 39, name: "Bamboo Ruler", category: "Stationery", brand: "EcoLife", price: 99, material: 87, carbon: 85, recyclability: 87, brandPractice: 85, icon: "📏", img: "🎋" },
  { id: 40, name: "Recycled Paper Pack", category: "Stationery", brand: "EarthPure", price: 149, material: 91, carbon: 89, recyclability: 91, brandPractice: 89, icon: "📄", img: "♻️" },
];

// Compute eco score & badge for every product
const getEcoScore = (p) => Math.round((p.material + p.carbon + p.recyclability + p.brandPractice) / 4);
const getBadge = (score) => {
  if (score >= 90) return { label: "Platinum", emoji: "🏆", color: "#3a8c55", bg: "rgba(143,203,94,0.18)" };
  if (score >= 80) return { label: "Sustainable", emoji: "🌿", color: "#2d5a3d", bg: "rgba(74,155,111,0.14)" };
  if (score >= 70) return { label: "Eco", emoji: "♻️", color: "#4a7c3f", bg: "rgba(143,203,94,0.12)" };
  if (score >= 50) return { label: "Green", emoji: "🟢", color: "#5a8a4f", bg: "rgba(74,155,111,0.1)" };
  return { label: "Not Certified", emoji: "❌", color: "#999", bg: "rgba(200,200,200,0.15)" };
};

const PRODUCTS = PRODUCTS_DATA.map((p) => {
  const ecoScore = getEcoScore(p);
  const badge = getBadge(ecoScore);
  return { ...p, ecoScore, badge };
});

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
const BRANDS = ["EcoLife", "GreenNest", "EarthPure", "NatureWay", "EcoWear"];

// ─── STYLES ───────────────────────────────────────────────────────────────
const styles = {
  app: {
    fontFamily: "'DM Sans', sans-serif",
    background: C.white,
    color: C.forest,
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 4%",
    background: "rgba(253,252,248,0.92)",
    backdropFilter: "blur(14px)",
    borderBottom: `1px solid rgba(74,155,111,0.15)`,
    boxShadow: "0 2px 20px rgba(26,58,42,0.06)",
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10,
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.4rem", fontWeight: 900,
    color: C.forest, cursor: "pointer",
  },
  leafIcon: {
    width: 32, height: 32,
    background: C.moss,
    borderRadius: "50% 50% 50% 0",
    transform: "rotate(-45deg)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14,
  },
  navBtn: {
    background: C.moss, color: C.white,
    border: "none", borderRadius: 30,
    padding: "9px 20px", fontWeight: 600, fontSize: "0.88rem",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
  page: { paddingTop: 70, minHeight: "100vh" },
  hero: {
    minHeight: "92vh",
    background: `linear-gradient(135deg, ${C.forest} 0%, ${C.moss} 60%, #3a7a50 100%)`,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    textAlign: "center", padding: "100px 5% 60px",
    position: "relative", overflow: "hidden",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.4rem,5vw,4rem)",
    fontWeight: 900, color: C.white,
    lineHeight: 1.1, marginBottom: 18,
  },
  heroSub: { color: "rgba(255,255,255,0.75)", fontSize: "1.08rem", maxWidth: 520, marginBottom: 36, lineHeight: 1.7 },
  btn: (variant = "primary", size = "md") => ({
    background: variant === "primary" ? C.lime : "transparent",
    color: variant === "primary" ? C.forest : C.white,
    border: variant === "outline" ? `2px solid rgba(255,255,255,0.5)` : "none",
    borderRadius: 40,
    padding: size === "lg" ? "14px 36px" : "10px 24px",
    fontWeight: 700, fontSize: size === "lg" ? "1rem" : "0.88rem",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 6,
  }),
  card: {
    background: C.white,
    border: `1px solid rgba(74,155,111,0.18)`,
    borderRadius: 20, padding: 22,
    boxShadow: "0 4px 24px rgba(26,58,42,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  input: {
    width: "100%", padding: "12px 16px",
    border: `1.5px solid rgba(74,155,111,0.25)`,
    borderRadius: 12, background: C.white,
    color: C.forest, fontSize: "0.92rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  label: { fontSize: "0.82rem", fontWeight: 600, color: C.moss, marginBottom: 6, display: "block" },
  section: { padding: "72px 5%" },
  sectionTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.68rem", letterSpacing: "0.14em",
    textTransform: "uppercase", color: C.leaf, marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.8rem,3vw,2.8rem)",
    fontWeight: 900, color: C.forest, lineHeight: 1.15, marginBottom: 14,
  },
};

// ─── BADGE PILL ────────────────────────────────────────────────────────────
function BadgePill({ badge, small }) {
  return (
    <span style={{
      background: badge.bg, color: badge.color,
      borderRadius: 20, padding: small ? "3px 10px" : "5px 13px",
      fontSize: small ? "0.68rem" : "0.74rem", fontWeight: 700,
      letterSpacing: "0.04em", textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {badge.emoji} {badge.label}
    </span>
  );
}

// ─── ECO SCORE BAR ─────────────────────────────────────────────────────────
function EcoBar({ score }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "rgba(74,155,111,0.12)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${C.leaf}, ${C.lime})` }} />
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", fontWeight: 700, color: C.leaf }}>{score}</span>
    </div>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, onView }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...styles.card, transform: hover ? "translateY(-5px)" : "none", boxShadow: hover ? "0 12px 36px rgba(26,58,42,0.13)" : styles.card.boxShadow, cursor: "pointer" }}
    >
      <div style={{ fontSize: "2.4rem", marginBottom: 12, background: "rgba(143,203,94,0.12)", borderRadius: 12, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {product.icon}
      </div>
      <div style={{ fontSize: "0.72rem", color: C.leaf, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{product.category}</div>
      <div style={{ fontWeight: 700, fontSize: "0.96rem", color: C.forest, marginBottom: 3 }}>{product.name}</div>
      <div style={{ fontSize: "0.78rem", color: C.moss, marginBottom: 10 }}>{product.brand}</div>
      <EcoBar score={product.ecoScore} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <BadgePill badge={product.badge} small />
        <span style={{ fontWeight: 700, color: C.forest, fontSize: "0.92rem" }}>₹{product.price}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => onView(product)} style={{ ...styles.btn("outline"), flex: 1, background: "rgba(74,155,111,0.07)", color: C.moss, border: `1px solid rgba(74,155,111,0.25)`, fontSize: "0.8rem", justifyContent: "center" }}>Details</button>
        <button onClick={() => onAddToCart(product)} style={{ ...styles.btn("primary"), flex: 1, background: C.moss, color: C.white, fontSize: "0.8rem", justifyContent: "center" }}>🛒 Add</button>
      </div>
    </div>
  );
}

// ─── NOTIFICATION TOAST ────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 24, background: C.moss, color: C.white, borderRadius: 14, padding: "14px 22px", fontWeight: 600, fontSize: "0.88rem", zIndex: 9999, boxShadow: "0 8px 28px rgba(26,58,42,0.25)", display: "flex", alignItems: "center", gap: 10, maxWidth: 340 }}>
      🌿 {msg}
      <span onClick={onClose} style={{ marginLeft: "auto", cursor: "pointer", opacity: 0.7 }}>✕</span>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────

// ── CREATE ACCOUNT ──
function CreateAccountPage({ onComplete }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.password) return alert("Please fill all fields.");
    localStorage.setItem("ecomark_user", JSON.stringify({ ...form, greenPoints: 0, orders: [], cart: [] }));
    onComplete("home");
  };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: 40, width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🌿</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: C.forest }}>Join EcoMark</div>
          <div style={{ color: C.leaf, fontSize: "0.85rem", marginTop: 4 }}>Create your sustainable shopping account</div>
        </div>
        {[["Full Name", "name", "text", "👤"], ["Email Address", "email", "email", "📧"], ["Phone Number", "phone", "tel", "📱"], ["Password", "password", "password", "🔒"]].map(([label, key, type, icon]) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <label style={styles.label}>{icon} {label}</label>
            <input type={type} value={form[key]} onChange={set(key)} placeholder={`Enter ${label.toLowerCase()}`} style={styles.input} />
          </div>
        ))}
        <button onClick={submit} style={{ ...styles.btn("primary", "lg"), width: "100%", justifyContent: "center", background: C.moss, color: C.white, marginTop: 8 }}>
          🌱 Create Account
        </button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: "0.85rem", color: C.moss }}>
          Already have an account?{" "}
          <span onClick={() => onComplete("login")} style={{ color: C.leaf, fontWeight: 700, cursor: "pointer" }}>Login →</span>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ──
function LoginPage({ onComplete }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    const saved = JSON.parse(localStorage.getItem("ecomark_user") || "null");
    if (!saved) return alert("No account found. Please create an account first.");
    if (saved.email !== form.email || saved.password !== form.password) return alert("Invalid credentials.");
    onComplete("home");
  };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🌿</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: C.forest }}>Welcome Back</div>
          <div style={{ color: C.leaf, fontSize: "0.85rem", marginTop: 4 }}>Login to your EcoMark account</div>
        </div>
        {[["Email Address", "email", "email", "📧"], ["Password", "password", "password", "🔒"]].map(([label, key, type, icon]) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <label style={styles.label}>{icon} {label}</label>
            <input type={type} value={form[key]} onChange={set(key)} placeholder={`Enter ${label.toLowerCase()}`} style={styles.input} />
          </div>
        ))}
        <button onClick={submit} style={{ ...styles.btn("primary", "lg"), width: "100%", justifyContent: "center", background: C.moss, color: C.white, marginTop: 8 }}>
          🌿 Login
        </button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: "0.85rem", color: C.moss }}>
          New here?{" "}
          <span onClick={() => onComplete("register")} style={{ color: C.leaf, fontWeight: 700, cursor: "pointer" }}>Create Account →</span>
        </div>
      </div>
    </div>
  );
}

// ── HOME / CATALOG ──
function HomePage({ onNavigate, cart, onAddToCart, user }) {
  const [category, setCategory] = useState("All");
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("eco_desc");
  const [viewProduct, setViewProduct] = useState(null);
  const [notifications] = useState(["🏆 New Platinum Product: Solar Lamp Added!", "🌿 You earned 50 Green Points on last order!", "♻️ Recycled Denim Jeans – score updated to 88"]);
  const [showNotif, setShowNotif] = useState(false);

  const filtered = PRODUCTS
    .filter((p) => (category === "All" || p.category === category))
    .filter((p) => (badgeFilter === "All" || p.badge.label === badgeFilter))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "eco_desc") return b.ecoScore - a.ecoScore;
      if (sort === "eco_asc") return a.ecoScore - b.ecoScore;
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(143,203,94,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.lime, background: "rgba(143,203,94,0.12)", border: "1px solid rgba(143,203,94,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 20, display: "inline-block" }}>
          🌱 Eco-Friendly Shopping Platform
        </span>
        <h1 style={styles.heroTitle}>Shop <em style={{ color: C.lime, fontStyle: "italic" }}>Greener.</em><br />Live Better.</h1>
        <p style={styles.heroSub}>Every product rated with a transparent Eco Score. Make decisions that matter for the planet.</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ ...styles.btn("primary", "lg"), background: C.lime, color: C.forest }} onClick={() => document.getElementById("catalog").scrollIntoView({ behavior: "smooth" })}>
            🛒 Browse Products
          </button>
          <button style={{ ...styles.btn("outline", "lg"), border: "2px solid rgba(255,255,255,0.45)", color: C.white, background: "transparent" }} onClick={() => onNavigate("impact")}>
            📊 My Impact
          </button>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {[["40+", "Eco Products"], ["5", "Trusted Brands"], ["10K+", "Green Shoppers"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 700, color: C.white }}>{n}</div>
              <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div id="catalog" style={{ ...styles.section, background: C.cream }}>
        <div style={{ marginBottom: 36 }}>
          <p style={styles.sectionTag}>// Product Catalog</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>All 40 Eco Products</h2>
            {/* Notification bell */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotif(!showNotif)} style={{ background: C.white, border: `1px solid rgba(74,155,111,0.2)`, borderRadius: 12, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", color: C.forest, display: "flex", alignItems: "center", gap: 6 }}>
                🔔 Notifications <span style={{ background: C.terra, color: C.white, borderRadius: 10, padding: "1px 7px", fontSize: "0.7rem" }}>{notifications.length}</span>
              </button>
              {showNotif && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: C.white, border: `1px solid rgba(74,155,111,0.2)`, borderRadius: 16, padding: 16, width: 320, boxShadow: "0 12px 36px rgba(26,58,42,0.12)", zIndex: 500 }}>
                  {notifications.map((n, i) => (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: 10, fontSize: "0.82rem", color: C.forest, background: "rgba(74,155,111,0.05)", marginBottom: i < notifications.length - 1 ? 8 : 0, lineHeight: 1.5 }}>{n}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: C.white, borderRadius: 18, padding: "18px 22px", marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", border: `1px solid rgba(74,155,111,0.12)` }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search products or brands..." style={{ ...styles.input, maxWidth: 260 }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...styles.input, maxWidth: 180, cursor: "pointer" }}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={badgeFilter} onChange={(e) => setBadgeFilter(e.target.value)} style={{ ...styles.input, maxWidth: 160, cursor: "pointer" }}>
            {["All", "Platinum", "Sustainable", "Eco", "Green"].map((b) => <option key={b}>{b}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ ...styles.input, maxWidth: 180, cursor: "pointer" }}>
            <option value="eco_desc">Eco Score ↓</option>
            <option value="eco_asc">Eco Score ↑</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
          <span style={{ marginLeft: "auto", fontSize: "0.82rem", color: C.leaf, fontWeight: 600 }}>{filtered.length} products</span>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onView={setViewProduct} />)}
        </div>
      </div>

      {/* Product Detail Modal */}
      {viewProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,42,0.6)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setViewProduct(null)}>
          <div style={{ background: C.white, borderRadius: 24, padding: 36, maxWidth: 480, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ fontSize: "3rem" }}>{viewProduct.icon}</div>
              <button onClick={() => setViewProduct(null)} style={{ background: "rgba(74,155,111,0.1)", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, color: C.forest, marginBottom: 4 }}>{viewProduct.name}</div>
            <div style={{ color: C.leaf, fontSize: "0.82rem", marginBottom: 16 }}>{viewProduct.brand} · {viewProduct.category}</div>
            <BadgePill badge={viewProduct.badge} />
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              {[["🌿 Material Score", viewProduct.material], ["💨 Carbon Footprint", viewProduct.carbon], ["♻️ Recyclability", viewProduct.recyclability], ["🏭 Brand Practices", viewProduct.brandPractice]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: "0.82rem", color: C.moss, minWidth: 160 }}>{label}</span>
                  <div style={{ flex: 1, height: 8, background: "rgba(74,155,111,0.1)", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ width: `${val}%`, height: "100%", background: `linear-gradient(90deg, ${C.leaf}, ${C.lime})`, borderRadius: 8 }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "0.82rem", color: C.leaf, minWidth: 28 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.cream, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: C.forest }}>🌍 Eco Score</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.4rem", fontWeight: 700, color: C.leaf }}>{viewProduct.ecoScore}/100</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontWeight: 700, fontSize: "1.2rem", color: C.forest, alignSelf: "center" }}>₹{viewProduct.price}</span>
              <button onClick={() => { onAddToCart(viewProduct); setViewProduct(null); }} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white, flex: 1, justifyContent: "center" }}>🛒 Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CART ──
function CartPage({ cart, setCart, onNavigate, user, setUser }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const change = (id, delta) => setCart(cart.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id) => setCart(cart.filter((i) => i.id !== id));
  return (
    <div style={{ ...styles.page, background: C.cream, minHeight: "100vh" }}>
      <div style={{ ...styles.section, maxWidth: 800, margin: "0 auto" }}>
        <p style={styles.sectionTag}>// Shopping Cart</p>
        <h2 style={styles.sectionTitle}>Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.moss }}>
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🛒</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Your cart is empty</div>
            <button onClick={() => onNavigate("home")} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white }}>Browse Products</button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{ ...styles.card, display: "flex", gap: 18, alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: "2rem", background: "rgba(143,203,94,0.1)", borderRadius: 12, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: C.forest }}>{item.name}</div>
                  <div style={{ fontSize: "0.78rem", color: C.leaf }}>{item.brand} · <BadgePill badge={item.badge} small /></div>
                  <EcoBar score={item.ecoScore} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                  <div style={{ fontWeight: 700, color: C.forest }}>₹{item.price * item.qty}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => change(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid rgba(74,155,111,0.3)`, background: "transparent", cursor: "pointer", fontWeight: 700 }}>−</button>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => change(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid rgba(74,155,111,0.3)`, background: "transparent", cursor: "pointer", fontWeight: 700 }}>+</button>
                  </div>
                  <button onClick={() => remove(item.id)} style={{ fontSize: "0.75rem", color: C.terra, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))}
            <div style={{ background: C.white, borderRadius: 18, padding: 24, border: `1px solid rgba(74,155,111,0.15)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 600, color: C.moss }}>Total ({cart.length} items)</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: C.forest }}>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ background: "rgba(143,203,94,0.1)", borderRadius: 10, padding: "8px 14px", marginBottom: 16, fontSize: "0.82rem", color: C.moss }}>
                🌿 Avg Eco Score: {Math.round(cart.reduce((s, i) => s + i.ecoScore, 0) / cart.length)}/100 · Earn ~{cart.length * 10} Green Points
              </div>
              <button onClick={() => onNavigate("checkout")} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white, width: "100%", justifyContent: "center" }}>
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── CHECKOUT ──
function CheckoutPage({ cart, onOrderPlaced, user }) {
  const [step, setStep] = useState(1); // 1=address, 2=payment, 3=success
  const [addr, setAddr] = useState({ fullName: "", phone: "", houseNo: "", area: "" });
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const avgEco = cart.length ? Math.round(cart.reduce((s, i) => s + i.ecoScore, 0) / cart.length) : 0;
  const envSaved = Math.round(((avgEco - 50) / 100) * 85); // % env saved vs conventional

  const setA = (k) => (e) => setAddr({ ...addr, [k]: e.target.value });

  const handlePayment = () => {
    if (!upi.match(/\d{10}|[\w.-]+@[\w]+/)) return alert("Please enter a valid UPI ID or 10-digit number.");
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep(3); onOrderPlaced(cart, total, avgEco); }, 2200);
  };

  if (step === 3) return (
    <div style={{ ...styles.page, background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.white, borderRadius: 28, padding: 44, textAlign: "center", maxWidth: 440, width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.22)" }}>
        <div style={{ fontSize: "4rem", marginBottom: 12 }}>✅</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: C.forest, marginBottom: 8 }}>Order Placed!</div>
        <div style={{ color: C.moss, marginBottom: 22, lineHeight: 1.6 }}>
          Payment of ₹{total.toLocaleString()} received successfully via UPI.<br />
          Estimated delivery: <strong>3–5 business days</strong>
        </div>
        {/* Environmental impact */}
        <div style={{ background: `linear-gradient(135deg, ${C.moss}, ${C.forest})`, borderRadius: 16, padding: 22, marginBottom: 22, color: C.white }}>
          <div style={{ fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.lime, marginBottom: 10 }}>🌍 Your Environmental Impact</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 900, color: C.lime }}>{envSaved}%</div>
          <div style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: 16 }}>Less environmental damage vs conventional products</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["♻️ CO₂ Saved", `~${Math.round(cart.length * 1.4)} kg`], ["💧 Water Saved", `~${Math.round(cart.length * 12)} L`], ["🌳 Trees Eq.", `${Math.max(1, Math.round(cart.length * 0.4))}`], ["🟢 Eco Points", `+${cart.length * 10}`]].map(([l, v]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: C.lime }}>{v}</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.75 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "0.82rem", color: C.moss, marginBottom: 24 }}>📦 Tracking ID: ECO{Date.now().toString().slice(-7)}</div>
        <button onClick={() => window.location.reload()} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white, width: "100%", justifyContent: "center" }}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ ...styles.page, background: C.cream, minHeight: "100vh" }}>
      <div style={{ ...styles.section, maxWidth: 700, margin: "0 auto" }}>
        {/* Steps */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
          {["Delivery Address", "Payment"].map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= i + 1 ? C.moss : "rgba(74,155,111,0.15)", color: step >= i + 1 ? C.white : C.leaf, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: step >= i + 1 ? C.forest : C.leaf }}>{s}</span>
              {i < 1 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? C.moss : "rgba(74,155,111,0.15)", margin: "0 10px" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={styles.card}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: C.forest, marginBottom: 24 }}>📍 Delivery Address</h3>
            {[["Full Name", "fullName", "text", "👤"], ["Phone Number", "phone", "tel", "📱"], ["House No / Flat No", "houseNo", "text", "🏠"], ["Area / Street / Locality", "area", "text", "📍"]].map(([label, key, type, icon]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={styles.label}>{icon} {label}</label>
                <input type={type} value={addr[key]} onChange={setA(key)} placeholder={`Enter ${label.toLowerCase()}`} style={styles.input} />
              </div>
            ))}
            <button onClick={() => { if (!addr.fullName || !addr.phone || !addr.houseNo || !addr.area) return alert("Please fill all address fields."); setStep(2); }}
              style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white, width: "100%", justifyContent: "center", marginTop: 8 }}>
              Continue to Payment →
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={styles.card}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: C.forest, marginBottom: 6 }}>💳 Payment via UPI</h3>
            <div style={{ fontSize: "0.82rem", color: C.moss, marginBottom: 24 }}>Total: <strong>₹{total.toLocaleString()}</strong></div>
            <label style={styles.label}>📲 Enter UPI ID or Phone Number</label>
            <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@upi or 9XXXXXXXXX" style={{ ...styles.input, marginBottom: 20, fontSize: "1rem" }} />
            <div style={{ background: "rgba(143,203,94,0.1)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: "0.82rem", color: C.moss }}>
              🔒 Secure UPI Payment · Your transaction is protected
            </div>
            {processing ? (
              <div style={{ textAlign: "center", padding: "20px 0", color: C.moss, fontWeight: 600 }}>
                <div style={{ fontSize: "2rem", marginBottom: 10, animation: "spin 1s linear infinite" }}>⏳</div>
                Processing Payment...
              </div>
            ) : (
              <button onClick={handlePayment} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white, width: "100%", justifyContent: "center" }}>
                ✅ Pay ₹{total.toLocaleString()} Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── IMPACT DASHBOARD ──
function ImpactPage({ user }) {
  const orders = user?.orders || [];
  const totalEco = orders.length > 0 ? Math.round(orders.reduce((s, o) => s + o.avgEco, 0) / orders.length) : 0;
  const co2 = Math.round(orders.length * 2.1);
  const water = Math.round(orders.length * 14);
  const trees = Math.max(0, Math.round(orders.length * 0.4));
  const plastic = Math.round(orders.length * 0.8);

  return (
    <div style={{ ...styles.page, background: C.cream, minHeight: "100vh" }}>
      <div style={styles.section}>
        <p style={styles.sectionTag}>// My Impact Dashboard</p>
        <h2 style={styles.sectionTitle}>Your Green Footprint 🌍</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18, marginBottom: 40 }}>
          {[["♻️ CO₂ Saved", `${co2} kg`, "Every order reduces emissions"], ["💧 Water Saved", `${water} L`, "Organic products save water"], ["🌳 Trees Equivalent", `${trees}`, "Carbon offset in tree terms"], ["🚫 Plastic Avoided", `${plastic} kg`, "Switching to sustainable packaging"]].map(([icon, val, desc]) => (
            <div key={icon} style={{ ...styles.card, textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{icon.split(" ")[0]}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: C.leaf }}>{val}</div>
              <div style={{ fontWeight: 700, color: C.forest, fontSize: "0.9rem", marginBottom: 6 }}>{icon.substring(3)}</div>
              <div style={{ fontSize: "0.77rem", color: C.moss, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Green Points */}
        <div style={{ ...styles.card, background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`, color: C.white, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.lime, marginBottom: 8 }}>🌿 Green Rewards Balance</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 900, color: C.lime }}>{user?.greenPoints || 0}</div>
              <div style={{ opacity: 0.7, fontSize: "0.85rem" }}>Points · 100 pts = ₹50 coupon</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {(user?.greenPoints || 0) >= 100 ? (
                <div style={{ background: C.lime, color: C.forest, borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: "0.88rem" }}>🎟️ Redeem ₹{Math.floor((user?.greenPoints || 0) / 100) * 50} Coupon</div>
              ) : (
                <div style={{ opacity: 0.65, fontSize: "0.82rem" }}>Earn {100 - (user?.greenPoints || 0)} more points for a ₹50 coupon</div>
              )}
            </div>
          </div>
        </div>

        {/* Order History */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: C.forest, marginBottom: 16 }}>🕒 Purchase History</h3>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.moss }}>
            <div style={{ fontSize: "3rem", marginBottom: 10 }}>📦</div>
            <div>No orders yet. Start shopping eco-friendly products!</div>
          </div>
        ) : (
          orders.map((o, i) => (
            <div key={i} style={{ ...styles.card, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: C.forest }}>Order #{o.id}</div>
                <div style={{ fontSize: "0.78rem", color: C.moss }}>{o.date} · {o.items} items</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: C.forest }}>₹{o.total.toLocaleString()}</div>
                <div style={{ fontSize: "0.78rem", color: C.leaf }}>Eco Score: {o.avgEco}/100 · +{o.items * 10} pts</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──
function AdminPage({ products, setProducts, toast }) {
  const [form, setForm] = useState({ name: "", category: "Personal Care", brand: "EcoLife", price: "", material: "", carbon: "", recyclability: "", brandPractice: "", icon: "🌿" });
  const [editId, setEditId] = useState(null);
  const [adminProducts, setAdminProducts] = useState([...products]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = () => {
    const scores = { material: +form.material, carbon: +form.carbon, recyclability: +form.recyclability, brandPractice: +form.brandPractice };
    if (!form.name || Object.values(scores).some((v) => !v)) return alert("Fill all fields.");
    const ecoScore = getEcoScore(scores);
    const badge = getBadge(ecoScore);
    if (editId) {
      setAdminProducts(adminProducts.map((p) => p.id === editId ? { ...p, ...form, ...scores, ecoScore, badge, price: +form.price } : p));
      toast("Product updated successfully!");
      setEditId(null);
    } else {
      const newP = { ...form, ...scores, id: Date.now(), ecoScore, badge, price: +form.price };
      setAdminProducts([...adminProducts, newP]);
      toast("New product added!");
    }
    setForm({ name: "", category: "Personal Care", brand: "EcoLife", price: "", material: "", carbon: "", recyclability: "", brandPractice: "", icon: "🌿" });
  };

  const del = (id) => { setAdminProducts(adminProducts.filter((p) => p.id !== id)); toast("Product deleted."); };
  const startEdit = (p) => { setEditId(p.id); setForm({ name: p.name, category: p.category, brand: p.brand, price: p.price, material: p.material, carbon: p.carbon, recyclability: p.recyclability, brandPractice: p.brandPractice, icon: p.icon || "🌿" }); };

  // Brand avg scores
  const brandStats = BRANDS.map((b) => {
    const ps = adminProducts.filter((p) => p.brand === b);
    return { brand: b, avg: ps.length ? Math.round(ps.reduce((s, p) => s + p.ecoScore, 0) / ps.length) : 0, count: ps.length };
  });

  return (
    <div style={{ ...styles.page, background: C.cream, minHeight: "100vh" }}>
      <div style={styles.section}>
        <p style={styles.sectionTag}>// Admin Panel</p>
        <h2 style={styles.sectionTitle}>🛡️ Manage Products</h2>

        {/* Brand Sustainability */}
        <div style={{ ...styles.card, marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: C.forest, marginBottom: 16 }}>🏭 Brand Sustainability Tracking</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {brandStats.map(({ brand, avg, count }) => (
              <div key={brand} style={{ background: C.cream, borderRadius: 12, padding: "12px 18px", flex: 1, minWidth: 120 }}>
                <div style={{ fontWeight: 700, color: C.forest, fontSize: "0.9rem" }}>{brand}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.4rem", fontWeight: 700, color: C.leaf }}>{avg}</div>
                <EcoBar score={avg} />
                <div style={{ fontSize: "0.72rem", color: C.moss, marginTop: 4 }}>{count} products</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add / Edit Form */}
        <div style={{ ...styles.card, marginBottom: 28 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: C.forest, marginBottom: 20 }}>{editId ? "✏️ Edit Product" : "➕ Add New Product"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Product Name", "name", "text"], ["Price (₹)", "price", "number"], ["Icon Emoji", "icon", "text"]].map(([l, k, t]) => (
              <div key={k}>
                <label style={styles.label}>{l}</label>
                <input type={t} value={form[k]} onChange={set(k)} placeholder={l} style={styles.input} />
              </div>
            ))}
            <div>
              <label style={styles.label}>Category</label>
              <select value={form.category} onChange={set("category")} style={{ ...styles.input, cursor: "pointer" }}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Brand</label>
              <select value={form.brand} onChange={set("brand")} style={{ ...styles.input, cursor: "pointer" }}>
                {BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
            {[["Material Score", "material"], ["Carbon Footprint", "carbon"], ["Recyclability", "recyclability"], ["Brand Practice", "brandPractice"]].map(([l, k]) => (
              <div key={k}>
                <label style={styles.label}>{l} (0–100)</label>
                <input type="number" min={0} max={100} value={form[k]} onChange={set(k)} placeholder="0–100" style={styles.input} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button onClick={save} style={{ ...styles.btn("primary", "lg"), background: C.moss, color: C.white }}>{editId ? "✅ Save Changes" : "➕ Add Product"}</button>
            {editId && <button onClick={() => { setEditId(null); setForm({ name: "", category: "Personal Care", brand: "EcoLife", price: "", material: "", carbon: "", recyclability: "", brandPractice: "", icon: "🌿" }); }} style={{ ...styles.btn(), background: "rgba(196,98,58,0.1)", color: C.terra, border: "none" }}>✕ Cancel</button>}
          </div>
        </div>

        {/* Product Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(26,58,42,0.06)" }}>
            <thead>
              <tr style={{ background: C.forest, color: C.white }}>
                {["Product", "Category", "Brand", "Eco Score", "Badge", "Price", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminProducts.slice(0, 20).map((p, i) => (
                <tr key={p.id} style={{ borderBottom: `1px solid rgba(74,155,111,0.08)`, background: i % 2 === 0 ? C.white : "rgba(245,240,232,0.5)" }}>
                  <td style={{ padding: "10px 16px", fontWeight: 600, fontSize: "0.88rem", color: C.forest }}>{p.icon} {p.name}</td>
                  <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: C.moss }}>{p.category}</td>
                  <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: C.moss }}>{p.brand}</td>
                  <td style={{ padding: "10px 16px" }}><span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: C.leaf }}>{p.ecoScore}</span></td>
                  <td style={{ padding: "10px 16px" }}><BadgePill badge={p.badge} small /></td>
                  <td style={{ padding: "10px 16px", fontSize: "0.88rem", fontWeight: 700 }}>₹{p.price}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => startEdit(p)} style={{ background: "rgba(74,155,111,0.1)", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: C.moss }}>Edit</button>
                      <button onClick={() => del(p.id)} style={{ background: "rgba(196,98,58,0.1)", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: C.terra }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("ecomark_user") || "null"));
  const [toastMsg, setToastMsg] = useState(null);
  const [products] = useState(PRODUCTS);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const toast = (msg) => setToastMsg(msg);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    toast(`✅ ${product.name} added to cart!`);
  };

  const handleOrderPlaced = (cartItems, total, avgEco) => {
    const order = {
      id: `ECO${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-IN"),
      items: cartItems.length,
      total,
      avgEco,
    };
    const updated = {
      ...user,
      greenPoints: (user?.greenPoints || 0) + cartItems.length * 10,
      orders: [...(user?.orders || []), order],
    };
    localStorage.setItem("ecomark_user", JSON.stringify(updated));
    setUser(updated);
    setCart([]);
  };

  const handleAuthComplete = (target) => {
    setUser(JSON.parse(localStorage.getItem("ecomark_user") || "null"));
    setPage(target);
  };

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (page === "register") return <CreateAccountPage onComplete={handleAuthComplete} />;
  if (page === "login") return <LoginPage onComplete={handleAuthComplete} />;

  return (
    <div style={styles.app}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => navigate("home")}>
          <div style={styles.leafIcon}><span style={{ transform: "rotate(45deg)", display: "block" }}>🌿</span></div>
          EcoMark
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {[["🏠 Home", "home"], ["📊 Impact", "impact"], ["🛡️ Admin", "admin"]].map(([label, p]) => (
            <button key={p} onClick={() => navigate(p)} style={{ background: page === p ? "rgba(74,155,111,0.12)" : "transparent", color: page === p ? C.leaf : C.moss, border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontWeight: 600, fontSize: "0.84rem", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>{label}</button>
          ))}
          <button onClick={() => navigate("cart")} style={{ ...styles.navBtn, position: "relative", display: "flex", alignItems: "center", gap: 6 }}>
            🛒 Cart
            {cart.length > 0 && <span style={{ background: C.terra, color: C.white, borderRadius: 10, padding: "1px 7px", fontSize: "0.68rem", fontWeight: 700 }}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.82rem", color: C.leaf, fontWeight: 600 }}>🌿 {user.greenPoints || 0} pts</span>
              <span style={{ fontSize: "0.82rem", color: C.moss }}>Hi, {user.name.split(" ")[0]}!</span>
            </div>
          ) : (
            <button onClick={() => navigate("register")} style={{ ...styles.navBtn, background: "transparent", color: C.moss, border: `1.5px solid ${C.moss}` }}>Sign Up</button>
          )}
        </div>
      </nav>

      {/* PAGES */}
      {page === "home" && <HomePage onNavigate={navigate} cart={cart} onAddToCart={addToCart} user={user} />}
      {page === "cart" && <CartPage cart={cart} setCart={setCart} onNavigate={navigate} user={user} setUser={setUser} />}
      {page === "checkout" && <CheckoutPage cart={cart} onOrderPlaced={handleOrderPlaced} user={user} />}
      {page === "impact" && <ImpactPage user={user} />}
      {page === "admin" && <AdminPage products={products} setProducts={() => {}} toast={toast} />}

      {/* TOAST */}
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
    </div>
  );
}
