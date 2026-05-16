"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GitBranch,
  Link as LinkIcon,
  Mail,
  Download,
  ChevronDown,
  ExternalLink,
  Trophy,
  Users,
  Code2,
  Layers,
  Database,
  Terminal,
  Smartphone,
  Globe,
  BarChart3,
  DollarSign,
  GraduationCap,
  Star,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  CalendarDays,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const techStack = [
  { name: "Flutter",  icon: <Smartphone size={20} />, color: "#54C5F8" },
  { name: "Laravel",  icon: <Globe       size={20} />, color: "#FF2D20" },
  { name: "PHP",      icon: <Code2       size={20} />, color: "#777BB4" },
  { name: "Java",     icon: <Terminal    size={20} />, color: "#007396" },
  { name: "Python",   icon: <Layers      size={20} />, color: "#3776AB" },
  { name: "MySQL",    icon: <Database    size={20} />, color: "#4479A1" },
  { name: "GitHub",   icon: <GitBranch   size={20} />, color: "#181717" },
  { name: "Figma",    icon: <Globe       size={20} />, color: "#F24E1E" },
  { name: "Postman",  icon: <Globe       size={20} />, color: "#FF6C37" },
];

const projects = [
  {
    title:       "SuperCashier",
    subtitle:    "Sistem Kasir",
    description: "Aplikasi kasir berbasis Flutter dan Laravel dengan sistem inventori real-time serta integrasi REST API untuk mendukung operasional toko.",
    highlights:  ["Flutter", "Laravel", "REST API"],
    icon:        <BarChart3    size={22} />,
    accent:      "#C8A2C8",
    mockupBg:    "from-violet-100 to-purple-50",
    tag:         "Preview",
    screenshot:  "/images/supercashier-preview.png",
    githubUrl:   "https://github.com/valinadz/SuperCashier",
  },
  {
    title:       "Administrasi TOEIC",
    subtitle:    "Sistem Manajemen Ujian",
    description: "Sistem administrasi ujian TOEIC berbasis web untuk pendaftaran, verifikasi peserta, dan manajemen kuota secara terpusat.",
    highlights:  ["Aplikasi Web", "Dasbor", "Basis Data"],
    icon:        <GraduationCap size={22} />,
    accent:      "#A8B4E8",
    mockupBg:    "from-blue-100 to-indigo-50",
    tag:         "Preview",
    screenshot:  "/images/toeic-preview.png",
    githubUrl:   "https://github.com/valinadz/TOEIC",
  },
  {
    title:       "SITATIB",
    subtitle:    "Sistem Monitoring Mahasiswa",
    description: "Sistem pemantauan kedisiplinan mahasiswa dengan dasbor analitik untuk pelacakan kehadiran secara real-time.",
    highlights:  ["Analitik", "Dasbor", "Real-time"],
    icon:        <Users         size={22} />,
    accent:      "#84C9B0",
    mockupBg:    "from-emerald-100 to-teal-50",
    tag:         "Preview",
    screenshot:  "/images/sitatib-preview.png",
    githubUrl:   "https://github.com/valinadz/SITATIB",
  },
  {
    title:       "Nakamse",
    subtitle:    "Sistem Penggajian",
    description: "Aplikasi penggajian berbasis Java untuk mengotomatisasi perhitungan gaji dan pembuatan laporan karyawan.",
    highlights:  ["Java", "Otomatisasi", "Pelaporan"],
    icon:        <DollarSign    size={22} />,
    accent:      "#E8C87A",
    mockupBg:    "from-amber-100 to-yellow-50",
    tag:         "Preview",
    screenshot:  "/images/nakamse-preview.png",
    githubUrl:   "https://github.com/valinadz/PENGGAJIAN-RESTORAN",
  },
];

const experiences = [
  {
    role:   "Sekretaris Umum UKM Usaha Mahasiswa 2025/2026",
    org:    "Politeknik Negeri Malang",
    period: "2025 – 2026",
    desc:   "Mengelola administrasi organisasi dan koordinasi kegiatan mahasiswa tingkat politeknik.",
    icon:   <Users          size={18} />,
    type:   "experience",
    // ✏️ Ganti path foto sesuai file kamu
    images: ["/images/usma-1.jpeg", "/images/usma-2.jpeg", "/images/usma-3.jpeg"],
  },
  {
    role:   "Panitia Dies Natalis Polinema ke-43",
    org:    "Politeknik Negeri Malang",
    period: "2025",
    desc:   "Terlibat sebagai panitia dalam penyelenggaraan acara kampus — mengelola koordinasi, perlengkapan, dan kelancaran kegiatan.",
    icon:   <CalendarDays  size={18} />,
    type:   "event",
    images: ["/images/panitia-3.jpeg", "/images/panitia-2.jpeg", "/images/panitia-1.jpeg"],
  },
  {
    role:   "Juara 2 National Business Plan Competition 2024",
    org:    "Creative Entrepreneur Summit",
    period: "2024",
    desc:   "Meraih Juara 2 dalam kompetisi rencana bisnis tingkat nasional dengan ide berbasis teknologi digital.",
    icon:   <Trophy         size={18} />,
    type:   "achievement",
    images: ["/images/lomba-2.jpeg", "/images/lomba-1.jpeg", "/images/sertifikat.jpeg"],
  },
  {
    role:   "Ketua Pelaksana Dies Natalis UKM Usaha Mahasiswa",
    org:    "UKM Usaha Mahasiswa Polinema",
    period: "2024",
    desc:   "Mendukung administrasi kampus, pengarsipan dokumen, serta operasional layanan akademik.",
    icon:   <GraduationCap size={18} />,
    type:   "experience",
    images: ["/images/dies-1.jpeg", "/images/dies-2.jpeg", "/images/dies-3.jpeg"],
  },
  
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ORBS
// ─────────────────────────────────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute rounded-full opacity-25"
        style={{ width:520, height:520,
          background:"radial-gradient(circle, #E6E6FA 0%, #C8A2C8 60%, transparent 100%)",
          top:"-120px", right:"-100px", animation:"blob 12s ease-in-out infinite" }} />
      <div className="absolute rounded-full opacity-15"
        style={{ width:380, height:380,
          background:"radial-gradient(circle, #C8A2C8 0%, #A8B4E8 60%, transparent 100%)",
          bottom:"10%", left:"-80px", animation:"blob 16s ease-in-out infinite 4s" }} />
      <div className="absolute rounded-full opacity-10"
        style={{ width:260, height:260,
          background:"radial-gradient(circle, #E6E6FA 0%, transparent 100%)",
          top:"40%", left:"50%", animation:"blob 20s ease-in-out infinite 8s" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links: { label: string; href: string }[] = [
    { label: "Tentang",      href: "#about"      },
    { label: "Keahlian",     href: "#skills"      },
    { label: "Proyek",       href: "#projects"    },
    { label: "Pengalaman",   href: "#experience"  },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-purple-100" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.35rem", fontWeight:700, color:"#1e293b" }}>
          Nervalina Adzra<span style={{ color:"#C8A2C8" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 tracking-wide"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)", fontFamily:"'DM Sans',sans-serif" }}>
              Hubungi Saya
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-purple-100 px-6 py-4 flex flex-col gap-3">
          {links.map(({ label, href }) => (
            <a key={label} href={href}
              className="text-slate-700 font-medium py-1"
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily:"'DM Sans',sans-serif" }}>
              {label}
            </a>
          ))}
          <a href="#contact"
            className="mt-2 text-center px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
            style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)", fontFamily:"'DM Sans',sans-serif" }}>
            Hubungi Saya
          </a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center z-10">

        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border animate-fadeIn"
          style={{ background:"rgba(200,162,200,0.1)", borderColor:"rgba(200,162,200,0.4)",
            color:"#9B72A0", fontFamily:"'DM Sans',sans-serif", animationDelay:"0.1s" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#C8A2C8" }} />
          Available for Freelance &amp; Collaboration
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 animate-fadeIn leading-tight"
          style={{ fontFamily:"'Cormorant Garamond',serif", animationDelay:"0.2s" }}>
          Nervalina{" "}
          <span style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Adzra
          </span>
          <br />Nora Aqilla
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeIn"
          style={{ fontFamily:"'DM Sans',sans-serif", animationDelay:"0.35s" }}>
          Mahasiswa <strong className="text-slate-700">Sistem Informasi Bisnis</strong> di Polinema —
          membangun aplikasi berbasis <strong className="text-slate-700">Flutter & Laravel</strong>,
          dengan minat pada UI engineering dan <strong className="text-slate-700">Quality Assurance</strong>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn"
          style={{ animationDelay:"0.5s" }}>
          <a href="/CV-Nervalina.pdf" download
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-200 transition-all duration-300"
            style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)", fontFamily:"'DM Sans',sans-serif" }}>
            <Download size={17} />
            Download CV
          </a>
          <a href="#projects"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-slate-700 border-2 hover:border-purple-300 hover:text-purple-700 hover:scale-105 transition-all duration-300"
            style={{ borderColor:"rgba(200,162,200,0.5)", fontFamily:"'DM Sans',sans-serif" }}>
            Lihat Proyek →
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-xs text-slate-400 tracking-widest uppercase" style={{ fontFamily:"'DM Sans',sans-serif" }}>scroll</span>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto" ref={ref}>

        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-3 block"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>Tentang Saya</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900"
            style={{ fontFamily:"'Cormorant Garamond',serif" }}>Membangun Pengalaman Digital</h2>
        </div>

        <div className={`bg-white border border-slate-100 rounded-3xl shadow-sm p-8 md:p-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl blur-xl opacity-25"
                  style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)" }} />
                {/* ✏️ Ganti src dengan path foto profil kamu */}
                <img src="/images/foto-diri.jpg" alt="Nervalina Adzra"
                  className="relative w-64 h-64 md:w-72 md:h-72 object-cover object-[50%_20%] rounded-3xl border border-slate-100 shadow-lg" />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-md"
                  style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)", fontFamily:"'DM Sans',sans-serif" }}>
                  Open to Work ✨
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                Saya mahasiswa Sistem Informasi Bisnis di Polinema dengan ketertarikan
                pada pengembangan aplikasi mobile dan web.
                <br /><br />
                Terbiasa membangun sistem menggunakan <strong>Flutter, Laravel</strong>, dan <strong>Java</strong>,
                serta berpengalaman dalam pengembangan berbasis kebutuhan bisnis dan operasional.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Flutter", "Laravel", "QA", "UI/UX", "Web Dev"].map((item) => (
                  <span key={item}
                    className="px-3 py-1 rounded-full text-xs border text-slate-600 bg-slate-50"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STACK
// ─────────────────────────────────────────────────────────────────────────────

function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-3 block"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>Keahlian &amp; Alat</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900"
            style={{ fontFamily:"'Cormorant Garamond',serif" }}>Teknologi yang Digunakan</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, i) => (
            <div key={tech.name}
              className={`group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm
                hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default
                ${inView ? "animate-fadeIn" : "opacity-0"}`}
              style={{ animationDelay:`${i * 0.07}s` }}>
              <span style={{ color:tech.color }}>{tech.icon}</span>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD  — screenshot + github link
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref           = useRef<HTMLDivElement>(null);
  const inView        = useInView(ref);
  const [imgOk, setImgOk] = useState(true);          // fallback ke mockup jika foto error

  return (
    <div ref={ref}
      className={`group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden
        hover:shadow-xl hover:-translate-y-2 transition-all duration-500
        ${inView ? "animate-fadeIn" : "opacity-0"}`}
      style={{ animationDelay:`${index * 0.15}s` }}>

      {/* ── Screenshot / Visual area ── */}
      <div className={`relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br ${project.mockupBg}`}>

        {/* Jika ada foto & tidak error → tampilkan */}
        {project.screenshot && imgOk ? (
          <>
            <img
              src={project.screenshot}
              alt={`${project.title} preview`}
              onError={() => setImgOk(false)}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient overlay agar tag tetap terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          /* Fallback: mockup skeleton yang sudah ada */
          <>
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-30"
              style={{ background: project.accent }} />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-20"
              style={{ background: project.accent }} />

            {/* Centered mock browser */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-36 bg-white rounded-2xl shadow-lg overflow-hidden border border-white/80 flex flex-col">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-red-300" />
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />
                  <div className="w-2 h-2 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 p-3 flex flex-col gap-2">
                  <div className="h-2 rounded-full opacity-30" style={{ background: project.accent }} />
                  <div className="h-2 w-3/4 rounded-full opacity-20" style={{ background: project.accent }} />
                  <div className="flex-1 rounded-xl opacity-15 mt-1" style={{ background: project.accent }} />
                </div>
              </div>
            </div>

            {/* Placeholder note */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5
              px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-xs text-slate-400"
              style={{ fontFamily:"'DM Sans',sans-serif" }}>
              <ImageIcon size={11} />
              Tambahkan tangkapan layar di /images/
            </div>
          </>
        )}

        {/* Tag badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background:project.accent, fontFamily:"'DM Sans',sans-serif" }}>
          {project.tag}
        </div>

        {/* Icon bubble */}
        <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 backdrop-blur-sm"
          style={{ color:project.accent }}>
          {project.icon}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-wider"
          style={{ color:project.accent, fontFamily:"'DM Sans',sans-serif" }}>
          {project.subtitle}
        </span>

        <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3"
          style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem" }}>
          {project.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed mb-5"
          style={{ fontFamily:"'DM Sans',sans-serif" }}>
          {project.description}
        </p>

        {/* Highlight chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.highlights.map((h) => (
            <span key={h}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor:`${project.accent}50`,
                color: project.accent,
                background:`${project.accent}12`,
                fontFamily:"'DM Sans',sans-serif",
              }}>
              {h}
            </span>
          ))}
        </div>

        {/* GitHub link — interaktif */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold
            hover:gap-2.5 transition-all duration-200 group/link"
          style={{ color:project.accent, fontFamily:"'DM Sans',sans-serif" }}>
          <GitBranch size={13} />
          Lihat Repositori
          <ExternalLink size={12}
            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-3 block"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>Portofolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily:"'Cormorant Garamond',serif" }}>Proyek Pilihan</h2>
          <p className="text-slate-500 max-w-xl mx-auto"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>
            Beberapa proyek pilihan yang mencerminkan perpaduan desain dan rekayasa perangkat lunak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO FILMSTRIP  — horizontal scroll dengan prev/next
// ─────────────────────────────────────────────────────────────────────────────

function PhotoFilmstrip({ images, accent }: { images: string[]; accent: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const SCROLL_STEP = 200;

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -SCROLL_STEP : SCROLL_STEP, behavior:"smooth" });
  };

  return (
    <div className="relative mt-5 group/film">
      {/* Arrow left */}
      <button
        onClick={() => scroll("left")}
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10
          w-8 h-8 rounded-full bg-white shadow-md border border-slate-100
          flex items-center justify-center transition-all duration-200
          ${canLeft ? "opacity-100 hover:shadow-lg hover:scale-110" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll left">
        <ChevronLeft size={15} className="text-slate-600" />
      </button>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-1"
        style={{ scrollbarWidth:"none" }}>
        {images.map((src, idx) => (
          <div key={idx}
            className="flex-shrink-0 w-52 h-36 md:w-64 md:h-44 rounded-2xl overflow-hidden
              border-2 hover:border-opacity-80 transition-all duration-300 cursor-pointer"
            style={{ borderColor:`${accent}40` }}>
            <img src={src} alt={`foto-${idx + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </div>

      {/* Arrow right */}
      <button
        onClick={() => scroll("right")}
        disabled={!canRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10
          w-8 h-8 rounded-full bg-white shadow-md border border-slate-100
          flex items-center justify-center transition-all duration-200
          ${canRight ? "opacity-100 hover:shadow-lg hover:scale-110" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll right">
        <ChevronRight size={15} className="text-slate-600" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

function Experience() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-3 block"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>Perjalanan</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900"
            style={{ fontFamily:"'Cormorant Garamond',serif" }}>Pengalaman &amp; Prestasi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <ExpCard key={exp.role} exp={exp} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpCard({
  exp, i, inView,
}: {
  exp: typeof experiences[0];
  i: number;
  inView: boolean;
}) {
  const isAchievement = exp.type === "achievement";
  const isEvent       = exp.type === "event";

  const accent    = isAchievement ? "#E8C87A" : isEvent ? "#93C5BE" : "#C8A2C8";
  const iconBg    = isAchievement
    ? "linear-gradient(135deg,#FEF3C7,#FDE68A)"
    : isEvent
    ? "linear-gradient(135deg,#CCFBF1,#99F6E4)"
    : "linear-gradient(135deg,#EDE9FE,#DDD6FE)";
  const iconColor = isAchievement ? "#D97706" : isEvent ? "#0F766E" : "#7C3AED";
  const typeLabel = isAchievement ? "🏆 Prestasi" : isEvent ? "🎉 Kepanitiaan" : "💼 Organisasi";

  return (
    <div
      className={`relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm
        hover:shadow-lg hover:-translate-y-1 transition-all duration-400 overflow-hidden
        ${inView ? "animate-fadeIn" : "opacity-0"}`}
      style={{ animationDelay:`${i * 0.18}s` }}>

      {/* Decorative orb */}
      <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-10 -translate-y-8 translate-x-8"
        style={{ background: accent }} />

      <div className="relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-4"
          style={{ background:iconBg, color:iconColor }}>
          {exp.icon}
        </div>

        {/* Type label */}
        <span className="text-xs font-bold uppercase tracking-wider mb-2 block"
          style={{ color: isAchievement ? "#D97706" : isEvent ? "#0F766E" : "#9B72A0", fontFamily:"'DM Sans',sans-serif" }}>
          {typeLabel}
        </span>

        {/* Role */}
        <h3 className="text-xl font-bold text-slate-900 mb-1"
          style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem" }}>
          {exp.role}
        </h3>

        {/* Org + period */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-slate-600"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>{exp.org}</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-400"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>{exp.period}</span>
        </div>

        {/* Desc */}
        <p className="text-sm text-slate-500 leading-relaxed"
          style={{ fontFamily:"'DM Sans',sans-serif" }}>
          {exp.desc}
        </p>

        {/* Photo filmstrip */}
        {exp.images && exp.images.length > 0 && (
          <PhotoFilmstrip images={exp.images} accent={accent} />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT / FOOTER
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-2xl mx-auto text-center">

        {/* CTA card */}
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background:"linear-gradient(135deg,#F5F0FF 0%,#EDE8FA 50%,#F0EAF8 100%)" }}>

          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-25"
            style={{ background:"radial-gradient(circle,#C8A2C8,transparent)" }} />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-15"
            style={{ background:"radial-gradient(circle,#A8B4E8,transparent)" }} />

          <div className="relative z-10">
            <Star size={24} className="mx-auto mb-4" style={{ color:"#C8A2C8" }} />

            <h2 className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"#2d1f3d" }}>
              Mari Berkolaborasi
            </h2>

            <p className="text-sm leading-relaxed mb-8"
              style={{ color:"#7d6490", fontFamily:"'DM Sans',sans-serif" }}>
              Terbuka untuk peluang magang, freelance, atau kolaborasi proyek menarik.
              Jangan ragu untuk menghubungi!
            </p>

            {/* Email CTA */}
            <a href="mailto:valinaadzraa@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white
                hover:shadow-xl hover:shadow-purple-200 hover:scale-105 transition-all duration-300 mb-8"
              style={{ background:"linear-gradient(135deg,#C8A2C8,#A8B4E8)", fontFamily:"'DM Sans',sans-serif" }}>
              <Mail size={18} />
              valinaadzraa@gmail.com
            </a>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4">
              <a href="https://www.linkedin.com/in/valina-adzra/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm
                  border border-white text-slate-700 text-sm font-semibold
                  hover:bg-white hover:shadow-md transition-all duration-200"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                <LinkIcon size={16} style={{ color:"#0A66C2" }} />
                LinkedIn
              </a>
              <a href="https://github.com/valinadz"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm
                  border border-white text-slate-700 text-sm font-semibold
                  hover:bg-white hover:shadow-md transition-all duration-200"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                <GitBranch size={16} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-400" style={{ fontFamily:"'DM Sans',sans-serif" }}>
          © 2025 Nervalina Adzra Nora Aqilla
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(20px,-20px) scale(1.05); }
          66%      { transform: translate(-10px,15px) scale(0.95); }
        }
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.65s ease forwards; }
        html            { scroll-behavior: smooth; }
        *               { box-sizing: border-box; }

        /* hide scrollbar on filmstrip */
        .hide-scrollbar::-webkit-scrollbar { display:none; }
        .hide-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      <div className="relative min-h-screen bg-white">
        <FloatingOrbs />
        <Nav />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Footer />
        </main>
      </div>
    </>
  );
}