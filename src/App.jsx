import { useState, useEffect } from "react";
import {
  Phone, Mail, MapPin, Menu, X, Star, CheckCircle,
  Clock, Facebook, Instagram, Youtube, Twitter, Camera,
} from "lucide-react";

/* ── Design tokens ──────────────────────────────────────────── */
const C = {
  red: "#E8322A",
  yellow: "#F5C518",
  navy: "#1B2B5E",
  navyDk: "#0F1729",
  white: "#FFFFFF",
  bg: "#F7F8FC",
  mid: "#4A5568",
  border: "#E2E8F0",
};

/* ── School info ────────────────────────────────────────────── */
const S = {
  name: "Spectrum English Medium School",
  short: "SEMS",
  affil: "CBSE Affil. No: 1130XXX",
  phone: "+91 98765 43210",
  email: "info@spectrumschool.edu.in",
  address: "Near Bharat Petrol Pump, Solapur Highway, Hadapsar, Pune – 412308",
  wa: "919876543210",
  hours: "Mon – Sat: 8:00 AM – 3:30 PM",
};

/* ── Unsplash helper ────────────────────────────────────────── */
const UNS = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/*
  ── ALL IMAGES: Kids / School Children Only ──────────────────
  Every image across every section shows real school children
  in educational, play, or activity settings.

  ID Reference:
  photo-1503676260728-1c00da094a0b  → kids hands raised in class  (HERO main)
  photo-1587654780291-39c9404d746b  → child learning with device   (HERO small-1 / Nursery)
  photo-1529156069898-49953e39b3ac  → school kids from behind       (HERO small-2 / About)
  photo-1577896851231-70ef18881754  → kids working together         (Jr KG / Gallery hero)
  photo-1509062522246-3755977927d7  → children in class             (Sr KG / Technology)
  photo-1588072432836-e10032774350  → students with tablets         (Grade 1-8 / Digital)
  photo-1522202176988-66273c2fd55f  → group study students          (Multidisciplinary)
  photo-1488521787991-ed7bbaae773c  → kids community activity       (Community)
  photo-1427504494785-3a9ca7044f45  → kids on field trip            (Field / Gallery)
  photo-1580582932707-520aed937b7b  → school kids assembly hall     (English / Assembly)
  photo-1516627145497-ae6968895b74  → happy children at school      (Gallery / bottom row)
  photo-1485637701894-09ad422f6de6  → children outdoor play         (Gallery bottom row)
*/

/* ── Data ───────────────────────────────────────────────────── */
const grades = [
  {
    label: "Nursery", age: "3–4 yrs", color: C.yellow,
    // ✅ Young child learning with device — toddler-appropriate
    img: UNS("photo-1587654780291-39c9404d746b", 500, 440),
    desc: "A warm, nurturing space where your youngest explores, builds friendships, and develops confidence through play-based learning.",
    features: ["Play-based curriculum", "Socialisation & sharing", "Creative arts & music", "Sensory exploration"],
  },
  {
    label: "Jr. KG", age: "4–5 yrs", color: C.red,
    // ✅ CHANGED: kids working together in classroom (was adult portrait)
    img: UNS("photo-1577896851231-70ef18881754", 500, 440),
    desc: "Developing early social, problem-solving, and pre-academic foundations that prepare children for structured schooling.",
    features: ["Pre-reading & pre-writing", "Number sense activities", "Group collaboration", "Fine motor skills"],
  },
  {
    label: "Sr. KG", age: "5–6 yrs", color: C.navy,
    // ✅ Children seated in classroom setting
    img: UNS("photo-1509062522246-3755977927d7", 500, 440),
    desc: "Strengthening cognitive skills, creativity, and a lifelong love of learning through guided discovery and exploration.",
    features: ["CBSE prep readiness", "Phonics & literacy", "Basic mathematics", "Environmental awareness"],
  },
  {
    label: "Grade 1–8", age: "6–14 yrs", color: "#2D7DD2",
    // ✅ Students using tablets in modern digital classroom
    img: UNS("photo-1588072432836-e10032774350", 500, 440),
    desc: "Full CBSE curriculum integrated with project-based learning, e-learning tools, and co-curricular development.",
    features: ["CBSE curriculum", "Digital classrooms", "Project-based learning", "Sports & co-curricular"],
  },
];

const programs = [
  {
    icon: "📚",
    title: "Multidisciplinary Learning",
    // ✅ CHANGED: students studying together in group
    img: UNS("photo-1522202176988-66273c2fd55f", 600, 300),
    accent: "#2D7DD2",
    desc: "Rich learning materials that blend science, arts, literature, and social studies — inspiring students to see meaningful connections across subjects and think beyond silos.",
  },
  {
    icon: "🌍",
    title: "Community Projects",
    // ✅ Kids engaged in community/group activity
    img: UNS("photo-1488521787991-ed7bbaae773c", 600, 300),
    accent: C.red,
    desc: "Activities built around real-world issues that cultivate empathy, leadership, and a sense of global citizenship from an early age, through collaboration and reflection.",
  },
  {
    icon: "🏕️",
    title: "Field Experiences",
    // ✅ School children on outdoor field trip
    img: UNS("photo-1427504494785-3a9ca7044f45", 600, 300),
    accent: "#2ECC71",
    desc: "Curated field visits and cultural immersion that bring curriculum concepts to life outside the classroom, deepening understanding and building lasting memories.",
  },
];

/* Gallery — all cells show school children */
const gallery = [
  // ✅ Kids raising hands/learning — large hero cell
  { id: "photo-1503676260728-1c00da094a0b", label: "Learning Together", hero: true },
  // ✅ School kids from behind — sports/outdoor
  { id: "photo-1529156069898-49953e39b3ac", label: "Sports Day", hero: false },
  // ✅ Children seated in class — science/lab session
  { id: "photo-1509062522246-3755977927d7", label: "Science Lab", hero: false },
  // ✅ Kids community group activity
  { id: "photo-1488521787991-ed7bbaae773c", label: "Community Service", hero: false },
  // ✅ Children on outdoor field trip
  { id: "photo-1427504494785-3a9ca7044f45", label: "Field Trips", hero: false },
  // ✅ Students studying together in group
  { id: "photo-1522202176988-66273c2fd55f", label: "Group Study", hero: false },
];

const englishFeatures = [
  "Daily English sessions",
  "Reading, Writing & Speaking skills",
  "Structured vocabulary & grammar",
  "Project-based language activities",
  "Cultural exchange sessions",
  "Qualified, experienced educators",
];

const testimonials = [
  {
    name: "Priya Kulkarni", role: "Parent, Grade 4 student",
    text: "My daughter looks forward to school every single day. The teachers here genuinely know each child as an individual. The balance of academics, creativity, and values is exactly what we were looking for.",
  },
  {
    name: "Rahul Deshmukh", role: "Parent, Jr. KG student",
    text: "We visited several schools before choosing Spectrum. The warmth of the staff and the clarity of their teaching philosophy convinced us immediately. Communication from teachers is consistent and reassuring.",
  },
  {
    name: "Sneha Patil", role: "Parent, Grade 6 student",
    text: "The e-learning integration is excellent. My son voluntarily practices at home without being prompted. The English programme has visibly improved his fluency and confidence in just one year.",
  },
];

const navLinks = ["Home", "About", "Academics", "Programs", "Gallery", "Contact"];

/* ── Reusable components ────────────────────────────────────── */
const Tag = ({ children }) => (
  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: C.red, marginBottom: 10 }}>
    {children}
  </span>
);

const SectionTitle = ({ children, light }) => (
  <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, lineHeight: 1.2, color: light ? "white" : C.navy, margin: "0 0 12px" }}>
    {children}
  </h2>
);

const PrimaryBtn = ({ children, onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#c92821" : C.red, color: "white", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", ...style }}>
      {children}
    </button>
  );
};

const OutlineBtn = ({ children, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? C.navy : "transparent", color: hov ? "white" : C.navy, border: `2px solid ${C.navy}`, borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
      {children}
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SchoolWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGrade, setActiveGrade] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", grade: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", grade: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { overflow-x: hidden; }
    a { text-decoration: none; }
    button { font-family: inherit; }
    input, select { font-family: inherit; }

    .nav-desktop { display: flex !important; }
    .ham-btn     { display: none !important; }
    .two-col     { flex-direction: row; }
    .hero-grid   { flex-direction: row; }
    .grade-grid  { grid-template-columns: repeat(4,1fr) !important; }
    .prog-grid   { grid-template-columns: repeat(3,1fr) !important; }
    .test-grid   { grid-template-columns: repeat(3,1fr) !important; }
    .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
    .eng-grid    { flex-direction: row; }
    .form-grid   { flex-direction: row; }
    .contact-cards { grid-template-columns: 1fr 1fr !important; }
    .stat-row    { flex-wrap: nowrap; }

    /* Gallery mosaic */
    .gallery-mosaic {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 230px 230px;
      gap: 14px;
    }
    .gallery-hero-cell { grid-row: 1 / 3; }

    .lift { transition: transform 0.25s, box-shadow 0.25s; }
    .lift:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.16) !important; }

    .prog-card-img { transition: transform 0.45s; }
    .prog-card:hover .prog-card-img { transform: scale(1.06); }

    .gal-cell { position: relative; overflow: hidden; border-radius: 16px; cursor: pointer; }
    .gal-cell img { transition: transform 0.45s; width: 100%; height: 100%; object-fit: cover; display: block; }
    .gal-cell:hover img { transform: scale(1.07); }
    .gal-label {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.72));
      color: white; font-size: 13px; font-weight: 700;
      padding: 28px 14px 12px; opacity: 0; transition: opacity 0.3s;
    }
    .gal-cell:hover .gal-label { opacity: 1; }

    input:focus, select:focus, textarea:focus {
      outline: none; border-color: ${C.navy} !important;
      box-shadow: 0 0 0 3px rgba(27,43,94,0.12);
    }
    .nav-link { border-bottom: 2px solid transparent; transition: all 0.2s !important; }
    .nav-link:hover { color: ${C.navy} !important; border-bottom-color: ${C.yellow} !important; }
    .flink { transition: color 0.2s; color: #999; font-size: 13px; cursor: pointer; display: block; margin-bottom: 9px; }
    .flink:hover { color: white !important; }

    .hero-small-imgs { display: grid !important; }

    @media (max-width: 900px) {
      .nav-desktop    { display: none !important; }
      .ham-btn        { display: block !important; }
      .hero-grid      { flex-direction: column-reverse !important; text-align: center; }
      .hero-img-col   { max-width: 100% !important; }
      .hero-small-imgs{ display: none !important; }
      .stat-row       { justify-content: center !important; }
      .hero-btns      { justify-content: center !important; }
      .two-col        { flex-direction: column !important; }
      .eng-grid       { flex-direction: column-reverse !important; }
      .form-grid      { flex-direction: column !important; }
      .footer-grid    { grid-template-columns: 1fr 1fr !important; }
      .gallery-mosaic {
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: 180px 180px 180px !important;
      }
      .gallery-hero-cell { grid-row: auto !important; }
    }
    @media (max-width: 640px) {
      .grade-grid  { grid-template-columns: 1fr 1fr !important; }
      .prog-grid   { grid-template-columns: 1fr !important; }
      .test-grid   { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; }
      .contact-cards { grid-template-columns: 1fr !important; }
      .gallery-mosaic {
        grid-template-columns: 1fr !important;
        grid-template-rows: repeat(6, 200px) !important;
      }
    }
    @media (max-width: 400px) {
      .grade-grid { grid-template-columns: 1fr !important; }
    }
  `;

  const g = grades[activeGrade];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#222" }}>
      <style>{css}</style>

      {/* ════════ NAVBAR ════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
        background: "white",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => scrollTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: `linear-gradient(135deg, ${C.red}, ${C.yellow})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, fontWeight: 900, color: "white" }}>S</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.navy, lineHeight: 1.15 }}>Spectrum CBSE</div>
              <div style={{ fontSize: 11, color: C.red, fontWeight: 600, lineHeight: 1.15 }}>English Medium School</div>
            </div>
          </div>

          <div className="nav-desktop" style={{ display: "flex", gap: 26, alignItems: "center" }}>
            {navLinks.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l)}
                style={{ background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.mid, padding: "4px 0" }}>
                {l}
              </button>
            ))}
            <PrimaryBtn onClick={() => scrollTo("Contact")} style={{ padding: "10px 22px", fontSize: 13 }}>Enquire Now</PrimaryBtn>
          </div>

          <button className="ham-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>
            {menuOpen ? <X size={24} color={C.navy} /> : <Menu size={24} color={C.navy} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "white", borderTop: "1px solid #eee", padding: "14px 24px 20px" }}>
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #f0f0f0", cursor: "pointer", padding: "12px 0", fontSize: 15, fontWeight: 600, color: C.navy }}>
                {l}
              </button>
            ))}
            <PrimaryBtn onClick={() => scrollTo("Contact")} style={{ width: "100%", marginTop: 14, padding: 13 }}>Enquire Now</PrimaryBtn>
          </div>
        )}
      </nav>

      {/* ════════ HERO ════════ */}
      <section id="home" style={{ paddingTop: 68, minHeight: "92vh", background: "white", display: "flex", alignItems: "center", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "56%", height: "100%", background: C.yellow, clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, right: "11%", width: "18%", height: "72%", background: C.red, clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)", zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 24px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 48 }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "inline-block", background: C.navy, color: C.yellow, borderRadius: 5, padding: "5px 14px", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, marginBottom: 20, textTransform: "uppercase" }}>
                CBSE Affiliated · Est. 2013 · Hadapsar, Pune
              </div>
              <h1 style={{ fontSize: "clamp(30px, 4.8vw, 58px)", fontWeight: 900, color: C.navy, lineHeight: 1.08, marginBottom: 18 }}>
                Where Every Child<br />
                <span style={{ color: C.red }}>Learns to Shine</span>
              </h1>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.75, maxWidth: 460, marginBottom: 32 }}>
                A CBSE school in Hadapsar, Pune — from Nursery to Grade 8 — built on child-centred learning, modern e-technology, and a safe nurturing campus that develops the whole child.
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <PrimaryBtn onClick={() => scrollTo("Contact")}>Apply for Admission →</PrimaryBtn>
                <OutlineBtn onClick={() => scrollTo("About")}>Explore the School</OutlineBtn>
              </div>
              <div className="stat-row" style={{ display: "flex", gap: 36, marginTop: 44, flexWrap: "wrap" }}>
                {[["11+", "Years of Excellence"], ["500+", "Enrolled Students"], ["50+", "Qualified Staff"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 30, fontWeight: 900, color: C.red, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 12, color: "#888", fontWeight: 600, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Hero image column ── */}
            <div className="hero-img-col" style={{ flex: "1 1 320px", maxWidth: 480, position: "relative", paddingBottom: 22 }}>
              {/* ── 3-photo school collage ── */}
              <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 28px 64px rgba(0,0,0,0.22)", position: "relative" }}>

                {/* Top: children with hands raised — energetic classroom moment */}
                <div style={{ height: 300, position: "relative", overflow: "hidden" }}>
                  <img
                    src={UNS("photo-1503676260728-1c00da094a0b", 600, 380)}
                    alt="Students raising hands in class at Spectrum School"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, transparent 55%, rgba(0,0,0,0.18))" }} />

                  {/* 500+ pill */}
                  <div style={{
                    position: "absolute", top: 14, right: 14, zIndex: 3,
                    background: "white", borderRadius: 40, padding: "8px 14px 8px 10px",
                    display: "flex", alignItems: "center", gap: 9,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.16)",
                  }}>
                    <div style={{ display: "flex" }}>
                      {[C.red, "#16A085", C.navy].map((bg, i) => (
                        <div key={i} style={{
                          width: 26, height: 26, borderRadius: "50%", background: bg,
                          border: "2px solid white", marginLeft: i === 0 ? 0 : -7,
                          zIndex: 3 - i, position: "relative",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontWeight: 900, color: "white",
                        }}>
                          {["P", "R", "S"][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, lineHeight: 1.1 }}>500+ Students</div>
                      <div style={{ fontSize: 10, color: "#888", lineHeight: 1.2 }}>love learning here</div>
                    </div>
                  </div>
                </div>

                {/* Bottom two: young child learning + school kids activity */}
                <div
                  className="hero-small-imgs"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, paddingTop: 3, background: "#d0d0d0" }}
                >
                  {/* ✅ Young child learning with device — Nursery/Toddler age */}
                  <div style={{ height: 145, overflow: "hidden" }}>
                    <img
                      src={UNS("photo-1587654780291-39c9404d746b", 280, 180)}
                      alt="Young students learning at Spectrum"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  {/* ✅ School kids from behind — outdoor / activity mood */}
                  <div style={{ height: 145, overflow: "hidden" }}>
                    <img
                      src={UNS("photo-1529156069898-49953e39b3ac", 280, 180)}
                      alt="School children activities at Spectrum"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </div>
              </div>

              {/* CBSE badge below collage */}
              <div style={{
                position: "absolute", bottom: 0, left: 14, zIndex: 3,
                background: C.navy, color: "white",
                borderRadius: 14, padding: "12px 20px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
              }}>
                <div style={{ fontSize: 9, color: C.yellow, fontWeight: 800, letterSpacing: 1, marginBottom: 2 }}>CBSE AFFILIATION</div>
                <div style={{ fontSize: 15, fontWeight: 900 }}>No. 1130XXX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section id="about" style={{ background: C.bg, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "flex", gap: 64, alignItems: "center" }}>
            <div style={{ flex: "1 1 340px", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 14, width: "90%", height: "90%", background: C.yellow, borderRadius: 20, zIndex: 0 }} />
              {/* ✅ CHANGED: kids from behind walking to school — fresh, different from Hero */}
              <img
                src={UNS("photo-1529156069898-49953e39b3ac", 600, 500)}
                alt="Children at Spectrum School"
                style={{ width: "100%", borderRadius: 20, objectFit: "cover", position: "relative", zIndex: 1, boxShadow: "0 16px 48px rgba(0,0,0,0.14)" }}
              />
            </div>
            <div style={{ flex: "1 1 360px" }}>
              <Tag>About Spectrum</Tag>
              <SectionTitle>Know Our Learning System</SectionTitle>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.78, marginBottom: 28 }}>
                Spectrum English Medium School is a CBSE-affiliated institution in Hadapsar built on the belief that education should ignite curiosity, nurture character, and equip children for the world they will inherit. We serve families from Nursery through Grade 8 with a consistent, caring faculty.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
                {[
                  { icon: "🎯", title: "Core Purpose", text: "Creating lifelong learners grounded in modern education and deep-rooted values." },
                  { icon: "🔭", title: "Our Vision", text: "Unlocking each child's unique potential so they excel locally and contribute globally." },
                  { icon: "🛡️", title: "Our Mission", text: "A safe, stimulating environment where physical, cognitive, and social development all flourish." },
                  { icon: "⏰", title: "School Hours", text: "Mon – Sat: 8:00 AM – 3:30 PM. Office: 9:00 AM – 5:00 PM." },
                ].map(({ icon, title, text }) => (
                  <div key={title} style={{ background: "white", borderRadius: 14, padding: "16px 14px", boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 800, color: C.navy, fontSize: 13, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{text}</div>
                  </div>
                ))}
              </div>
              <PrimaryBtn onClick={() => scrollTo("Contact")}>Schedule a Campus Visit</PrimaryBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ACADEMICS ════════ */}
      <section id="academics" style={{ background: "white", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag>Academics</Tag>
            <SectionTitle>Accompanying every stage of your child's growth</SectionTitle>
            <p style={{ fontSize: 15, color: "#777", maxWidth: 560, margin: "0 auto" }}>
              From the very first day of school through the stepping stones of secondary education — we walk with your family every step of the way.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 44 }}>
            {grades.map((gr, i) => (
              <button key={gr.label} onClick={() => setActiveGrade(i)} style={{
                padding: "9px 22px", borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.2s",
                background: activeGrade === i ? gr.color : "#ECEFF5",
                color: activeGrade === i ? "white" : "#666",
                boxShadow: activeGrade === i ? `0 4px 18px ${gr.color}55` : "none",
              }}>{gr.label}</button>
            ))}
          </div>

          <div className="two-col" style={{ display: "flex", gap: 52, alignItems: "center", marginBottom: 60, padding: "0 0 40px", borderBottom: `2px solid ${C.border}` }}>
            <div style={{ flex: "1 1 300px", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: g.color, transform: "translate(12px,12px)", zIndex: 0 }} />
              <img src={g.img} alt={g.label}
                style={{ width: "100%", height: 280, borderRadius: 22, objectFit: "cover", position: "relative", zIndex: 1, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
              />
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "inline-block", background: g.color, color: "white", borderRadius: 6, padding: "4px 14px", fontSize: 12, fontWeight: 800, marginBottom: 14 }}>{g.age}</div>
              <h3 style={{ fontSize: 30, fontWeight: 900, color: C.navy, marginBottom: 12 }}>{g.label}</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, marginBottom: 22 }}>{g.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {g.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle size={16} color={g.color} strokeWidth={2.5} />
                    <span style={{ fontSize: 14, color: "#555", fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <PrimaryBtn onClick={() => scrollTo("Contact")} style={{ marginTop: 28 }}>Enquire About {g.label}</PrimaryBtn>
            </div>
          </div>

          {/* Grade cards grid — all show kids */}
          <div className="grade-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {grades.map((gr, i) => (
              <div key={gr.label} className="lift" onClick={() => setActiveGrade(i)}
                style={{
                  borderRadius: 18, overflow: "hidden", cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                  border: `3px solid ${activeGrade === i ? gr.color : "transparent"}`,
                  transition: "all 0.25s",
                }}>
                <div style={{ position: "relative", height: 150, overflow: "hidden" }}>
                  <img src={gr.img} alt={gr.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `${gr.color}55` }} />
                  <div style={{ position: "absolute", bottom: 10, left: 12, background: "white", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 800, color: gr.color }}>{gr.age}</div>
                </div>
                <div style={{ padding: "12px 14px", background: "white" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: C.navy }}>{gr.label}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4, lineHeight: 1.45 }}>{gr.desc.substring(0, 64)}…</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TECHNOLOGY ════════ */}
      <section style={{ background: C.bg, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "flex", gap: 64, alignItems: "center" }}>
            <div style={{ flex: "1 1 380px" }}>
              <Tag>EdTech Integration</Tag>
              <SectionTitle>The role of technology in the Spectrum Learning System</SectionTitle>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.78, marginBottom: 18 }}>
                At Spectrum, technology is a powerful amplifier — not a substitute for human connection. Our digital classrooms use interactive boards, curated e-learning platforms, and real-world project tools that enhance every lesson.
              </p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.78, marginBottom: 30 }}>
                Students learn to engage critically with technology, building 21st-century skills while staying rooted in collaborative, empathetic, human learning experiences.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Smart Classrooms", "E-Learning Platform", "Gamified Learning", "Student Progress Dashboards"].map(t => (
                  <span key={t} style={{ background: C.navy, color: "white", borderRadius: 20, padding: "7px 16px", fontSize: 12, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: "1 1 340px" }}>
              {/* ✅ CHANGED: students using tablets in modern classroom — kids with tech */}
              <img
                src={UNS("photo-1588072432836-e10032774350", 520, 340)}
                alt="Students using digital technology at Spectrum"
                style={{ width: "100%", borderRadius: 18, boxShadow: "0 14px 44px rgba(0,0,0,0.12)", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROGRAMMES (dark) ════════ */}
      <section id="programs" style={{ background: C.navy, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.yellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Our Programmes</div>
          <SectionTitle light>Projects that educate, inspire, and build well-rounded human beings.</SectionTitle>
          <p style={{ fontSize: 15, color: "#aac", maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.75 }}>
            Our programmes go beyond the syllabus to develop children academically, socially, and emotionally.
          </p>

          {/* Each program card image shows kids in that activity */}
          <div className="prog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 44 }}>
            {programs.map((p) => (
              <div key={p.title} className="lift prog-card"
                style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden", textAlign: "left", border: "1px solid rgba(255,255,255,0.1)", cursor: "default" }}>
                <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                  <img className="prog-card-img" src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: p.accent }} />
                  <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{p.icon}</div>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: C.yellow, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#bbc", lineHeight: 1.72 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {["Digital Resources", "Group Activities", "Gamification", "Field Trips", "Aula Online", "Science Projects"].map(f => (
              <span key={f} style={{ background: "rgba(255,255,255,0.1)", color: "white", borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 600 }}>{f}</span>
            ))}
          </div>

          <PrimaryBtn onClick={() => scrollTo("Contact")} style={{ fontSize: 15, padding: "14px 34px" }}>Enquire About Admissions</PrimaryBtn>
        </div>
      </section>

      {/* ════════ ENGLISH PROGRAMME ════════ */}
      <section style={{ background: "white", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="eng-grid" style={{ display: "flex", gap: 64, alignItems: "center" }}>
            <div style={{ flex: "1 1 360px" }}>
              <Tag>Language Excellence</Tag>
              <SectionTitle>Study & Grow in English Every Day at Spectrum</SectionTitle>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.78, marginBottom: 26 }}>
                At Spectrum, English is not just a subject — it is a life skill. Our structured English programme ensures children build genuine fluency, confidence, and a love of language from the very beginning of their schooling journey.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 30 }}>
                {englishFeatures.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", background: C.bg, borderRadius: 9 }}>
                    <CheckCircle size={14} color={C.red} strokeWidth={2.5} />
                    <span style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("Contact")} style={{ background: C.yellow, color: C.navy, border: "none", borderRadius: 10, padding: "13px 30px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                Learn More About Our English Programme
              </button>
            </div>
            <div style={{ flex: "1 1 320px", position: "relative" }}>
              <div style={{ position: "absolute", top: 16, right: 16, width: "88%", height: "88%", background: C.yellow, borderRadius: 22, zIndex: 0 }} />
              {/* ✅ CHANGED: school kids in assembly hall — children in large group setting */}
              <img
                src={UNS("photo-1580582932707-520aed937b7b", 520, 460)}
                alt="Children in English class at Spectrum"
                style={{ width: "100%", borderRadius: 22, objectFit: "cover", position: "relative", zIndex: 1, boxShadow: "0 18px 48px rgba(0,0,0,0.16)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section style={{ background: C.bg, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Tag>Testimonials</Tag>
          <SectionTitle>Parents & students who trust Spectrum</SectionTitle>
          <p style={{ fontSize: 15, color: "#777", maxWidth: 520, margin: "0 auto 52px", lineHeight: 1.7 }}>
            Real words from the families who are part of our growing school community.
          </p>
          <div className="test-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className="lift" style={{ background: "white", borderRadius: 18, padding: "28px 24px", textAlign: "left", boxShadow: "0 4px 18px rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={15} fill={C.yellow} color={C.yellow} />)}
                </div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.78, marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${C.red}, ${C.yellow})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 17 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: C.navy }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ LIFE AT SPECTRUM — Photo Gallery ════════ */}
      <section id="gallery" style={{ background: "white", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <Tag>Campus Life</Tag>
              <SectionTitle>Life at Spectrum — Every Day is an Adventure</SectionTitle>
              <p style={{ fontSize: 15, color: "#777", maxWidth: 520, lineHeight: 1.7, marginTop: 6 }}>
                A glimpse into the joyful, curious, and creative world our students experience every day at school.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 10, padding: "10px 18px" }}>
              <Camera size={16} color={C.red} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Campus Highlights</span>
            </div>
          </div>

          {/* Primary mosaic — all 6 gallery items show kids */}
          <div className="gallery-mosaic">
            {gallery.map((item) => (
              <div key={item.id} className={`gal-cell${item.hero ? " gallery-hero-cell" : ""}`} style={{ borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <img src={UNS(item.id, item.hero ? 700 : 500, item.hero ? 480 : 280)} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="gal-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom row of 3 — additional campus-life kids shots */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 14 }}>
            {[
              {
                // ✅ Kids working together in group — Morning Assembly energy
                id: "photo-1577896851231-70ef18881754",
                label: "Morning Assembly",
              },
              {
                // ✅ Children with hands raised — Classroom Moments
                id: "photo-1503676260728-1c00da094a0b",
                label: "Classroom Moments",
              },
              {
                // ✅ Students with tablets — Digital Learning
                id: "photo-1588072432836-e10032774350",
                label: "Digital Learning",
              },
            ].map(item => (
              <div key={item.id} className="gal-cell" style={{ height: 160, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <img src={UNS(item.id, 500, 200)} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="gal-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>Want to see more? Schedule a campus visit.</p>
            <PrimaryBtn onClick={() => scrollTo("Contact")}>Book a School Tour</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" style={{ background: C.bg, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="form-grid" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 360px" }}>
              <Tag>Admissions Open</Tag>
              <SectionTitle>Enrol Your Child Today</SectionTitle>
              <p style={{ fontSize: 14, color: "#777", lineHeight: 1.65, marginBottom: 30 }}>
                Fill in your details below and our admissions team will contact you within 24 hours.
              </p>

              {submitted ? (
                <div style={{ background: "#E8F5E9", border: `2px solid #4CAF50`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
                  <CheckCircle size={44} color="#4CAF50" style={{ display: "block", margin: "0 auto 12px" }} />
                  <div style={{ fontWeight: 800, color: "#2E7D32", fontSize: 17, marginBottom: 6 }}>Enquiry received!</div>
                  <div style={{ color: "#555", fontSize: 14 }}>Our admissions team will reach out within 24 hours. Thank you for choosing Spectrum!</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name", label: "Parent's Full Name", type: "text", ph: "e.g. Anjali Sharma" },
                    { key: "email", label: "Email Address", type: "email", ph: "e.g. anjali@email.com" },
                    { key: "phone", label: "WhatsApp / Phone Number", type: "tel", ph: "e.g. +91 98765 43210" },
                  ].map(({ key, label, type, ph }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6 }}>{label}</label>
                      <input
                        type={type} required placeholder={ph} value={formData[key]}
                        onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, background: "white", transition: "all 0.2s" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6 }}>Applying for Class</label>
                    <select required value={formData.grade} onChange={e => setFormData(p => ({ ...p, grade: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, background: "white", cursor: "pointer" }}>
                      <option value="">Select a class</option>
                      {["Nursery", "Jr. KG", "Sr. KG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].map(gr => (
                        <option key={gr} value={gr}>{gr}</option>
                      ))}
                    </select>
                  </div>
                  <PrimaryBtn style={{ width: "100%", padding: 14, fontSize: 15, marginTop: 4 }}>Submit Enquiry →</PrimaryBtn>
                </form>
              )}
            </div>

            <div style={{ flex: "1 1 320px" }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 24 }}>Get in Touch Directly</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {[
                  { icon: <Phone size={18} color={C.red} />, label: "Phone", val: S.phone, href: `tel:${S.phone}` },
                  { icon: <Mail size={18} color={C.red} />, label: "Email", val: S.email, href: `mailto:${S.email}` },
                  { icon: <MapPin size={18} color={C.red} />, label: "Address", val: S.address, href: "#" },
                  { icon: <Clock size={18} color={C.red} />, label: "Hours", val: S.hours, href: "#" },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 15, background: "white", borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{label}</div>
                      <a href={href} style={{ fontSize: 14, color: C.navy, fontWeight: 600 }}>{val}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: `linear-gradient(135deg, ${C.navy}, #2D4A9A)`, borderRadius: 18, padding: "22px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "white", marginBottom: 4 }}>Chat on WhatsApp</div>
                  <div style={{ fontSize: 13, color: "#aac", lineHeight: 1.5 }}>Quick replies Mon–Sat, 9 AM – 5 PM</div>
                </div>
                <a href={`https://wa.me/${S.wa}`} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#25D366", color: "white", borderRadius: 10, padding: "11px 18px", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", textDecoration: "none" }}>
                  💬 Chat Now
                </a>
              </div>

              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", border: `1px solid ${C.border}` }}>
                <iframe
                  title="School Location"
                  src="https://maps.google.com/maps?q=Hadapsar+Pune+Maharashtra&t=m&z=13&output=embed&iwloc=near"
                  width="100%" height="180" style={{ display: "block", border: "none" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHATSAPP CTA ════════ */}
      <section style={{ background: C.red, padding: "64px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "42%", height: "100%", opacity: 0.12, background: C.yellow, clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap", position: "relative" }}>
          <div>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900, color: "white", marginBottom: 8 }}>
              Schedule a Visit & Clear Your Doubts on WhatsApp
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>Our team answers every admissions question — Mon to Sat.</p>
          </div>
          <a href={`https://wa.me/${S.wa}`} target="_blank" rel="noopener noreferrer"
            style={{ background: "white", color: C.red, borderRadius: 12, padding: "16px 30px", fontSize: 15, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
            💬 Talk on WhatsApp
          </a>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ background: C.navyDk, padding: "64px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 44 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `linear-gradient(135deg, ${C.red}, ${C.yellow})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, fontWeight: 900, color: "white", flexShrink: 0 }}>S</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "white", lineHeight: 1.2 }}>Spectrum CBSE</div>
                  <div style={{ fontSize: 11, color: C.yellow, fontWeight: 600, lineHeight: 1.2 }}>English Medium School</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.72, marginBottom: 18 }}>{S.address}</p>
              <a href={`tel:${S.phone}`} style={{ display: "block", fontSize: 13, color: "#aaa", marginBottom: 6 }}>{S.phone}</a>
              <a href={`mailto:${S.email}`} style={{ display: "block", fontSize: 13, color: "#aaa", marginBottom: 20 }}>{S.email}</a>
              <div style={{ display: "flex", gap: 10 }}>
                {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Icon size={16} color="#aaa" />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Quick Links", links: ["Home", "About Us", "Academics", "Our Team", "Gallery", "Contact"] },
              { title: "Academics", links: ["Nursery & KG", "Grade 1–5", "Grade 6–8", "E-Learning Portal", "School Circulars"] },
              { title: "Information", links: ["CBSE Affiliation", "Mandatory Disclosure", "PTA / SMC", "Career at SEMS", "Privacy Policy"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontWeight: 800, fontSize: 14, color: C.yellow, marginBottom: 18 }}>{title}</div>
                {links.map(l => <span key={l} className="flink">{l}</span>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 12, color: "#555" }}>© {new Date().getFullYear()} Spectrum English Medium School. All Rights Reserved.</div>
            <div style={{ fontSize: 12, color: "#555" }}>{S.affil} · Hadapsar, Pune</div>
          </div>
        </div>
      </footer>
    </div>
  );
}