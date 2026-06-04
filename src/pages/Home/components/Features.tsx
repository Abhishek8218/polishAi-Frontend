import { useState, useRef } from "react";
import { Layers, Zap, Sliders, History, CreditCard } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { EASE_OUT_EXPO, EASE_OUT_QUART } from "../../../shared/utils/shared.const";

/* ─── shared easing curves ─── */


/* ─── spring configs ─── */
const SPRING_TILT   = { stiffness: 120, damping: 22, mass: 0.6 };
const SPRING_ORB    = { stiffness: 80,  damping: 20, mass: 0.8 };
const SPRING_LINE   = { stiffness: 60,  damping: 18, mass: 0.5 };
const SPRING_ICON   = { stiffness: 200, damping: 18, mass: 0.4 };

/* ─── SVG tile patterns ─── */
const PATTERNS = {
  dots: (id, color) => (
    <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill={color} opacity="0.35" />
    </pattern>
  ),
  grid: (id, color) => (
    <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
    </pattern>
  ),
  cross: (id, color) => (
    <pattern id={id} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <line x1="14" y1="8" x2="14" y2="20" stroke={color} strokeWidth="0.7" opacity="0.3" />
      <line x1="8" y1="14" x2="20" y2="14" stroke={color} strokeWidth="0.7" opacity="0.3" />
    </pattern>
  ),
  diagonal: (id, color) => (
    <pattern id={id} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <line x1="0" y1="16" x2="16" y2="0" stroke={color} strokeWidth="0.6" opacity="0.22" />
    </pattern>
  ),
  hex: (id, color) => (
    <pattern id={id} x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
      <polygon points="15,1 28,7.5 28,18.5 15,25 2,18.5 2,7.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
    </pattern>
  ),
  wave: (id, color) => (
    <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
      <path d="M0,10 C10,0 20,20 40,10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </pattern>
  ),
};

const items = [
  {
    icon: Layers,
    title: "Custom Frameworks",
    desc: "Create unique templates for every writing task—from executive summaries to casual tweets. Hard-code your own rules.",
    tag: null,
    pattern: "dots",
    accent: "#5DCAA5",
    gradient: "from-[#0a1f1c] to-[#0d2d20]",
    size: "large",
    number: "01",
  },
  {
    icon: Zap,
    title: "One-Click Polish",
    desc: "Instant transformation. Select a framework and watch drafts refine in real time.",
    tag: null,
    pattern: "grid",
    accent: "#AFA9EC",
    gradient: "from-[#130f2a] to-[#1c1545]",
    size: "normal",
    number: "02",
  },
  {
    icon: Sliders,
    title: "Tone & Style Control",
    desc: "Fine-tune the output with professional, empathetic, or direct tone sliders.",
    tag: null,
    pattern: "cross",
    accent: "#F0997B",
    gradient: "from-[#1f0d08] to-[#2a1210]",
    size: "normal",
    number: "03",
  },
  {
    icon: History,
    title: "Polish History",
    desc: "Never lose a draft. Access and compare every previous version and iteration safely.",
    tag: null,
    pattern: "diagonal",
    accent: "#85B7EB",
    gradient: "from-[#060f1f] to-[#0c1a2e]",
    size: "normal",
    number: "04",
  },
  {
    icon: CreditCard,
    title: "Credit-Based Usage",
    desc: "Pay for exactly what you use. Non-expiring tokens, no hidden monthly traps.",
    tag: null,
    pattern: "wave",
    accent: "#97C459",
    gradient: "from-[#0d1a06] to-[#152204]",
    size: "normal",
    number: "05",
  },
];

function FeatureCard({ item, index, isMobile }) {
  const ref = useRef(null);

  /* ── raw pointer values ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* ── spring-smoothed tilt (floats back lazily) ── */
  const springX = useSpring(rawX, SPRING_TILT);
  const springY = useSpring(rawY, SPRING_TILT);
  const rotateX = useTransform(springY, [-60, 60], [4, -4]);
  const rotateY = useTransform(springX, [-60, 60], [-4, 4]);

  /* ── hover progress as a spring (0 → 1) ── */
  const hoverProgress = useMotionValue(0);
  const hoverSpring = useSpring(hoverProgress, SPRING_ORB);

  /* ── derived animated values ── */
  const orbScale   = useTransform(hoverSpring, [0, 1], [0.7, 1.55]);
  const orbOpacity = useTransform(hoverSpring, [0, 1], [0,   1]);
  const lineW      = useSpring(useTransform(hoverSpring, [0, 1], ["30%", "100%"]), SPRING_LINE);
  const lineH      = useSpring(useTransform(hoverSpring, [0, 1], ["25%", "100%"]), SPRING_LINE);
  const barW       = useSpring(useTransform(hoverSpring, [0, 1], ["0%",  "62%"]),  SPRING_LINE);
  const patOpacity = useTransform(hoverSpring, [0, 1], [0.55, 1]);

  const iconScale  = useSpring(useTransform(hoverSpring, [0, 1], [1, 1.12]), SPRING_ICON);
  const iconRotate = useSpring(useTransform(hoverSpring, [0, 1], [0, 6]),    SPRING_ICON);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top  - rect.height / 2);
  };

  const handleMouseEnter = () => hoverProgress.set(1);
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    hoverProgress.set(0);
  };

  const Icon = item.icon;
  const patternId = `pat-${item.number}`;
  const isLarge   = item.size === "large";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: EASE_OUT_EXPO,
      }}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden rounded-2xl cursor-default
        ${isLarge ? "md:col-span-2" : ""}
        bg-gradient-to-br ${item.gradient}
        border border-white/[0.06]
      `}
    >
      {/* SVG pattern */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: patOpacity }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>{PATTERNS[item.pattern](patternId, item.accent)}</defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </motion.div>

      {/* Radial orb */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 240, height: 240,
          background: `radial-gradient(circle, ${item.accent}1e 0%, transparent 70%)`,
          top: "50%", left: "50%",
          x: "-50%", y: "-50%",
          scale: orbScale,
          opacity: orbOpacity,
        }}
      />

      {/* Top-edge line */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{
          width: lineW,
          background: `linear-gradient(to right, ${item.accent}90, transparent)`,
        }}
      />
      {/* Left-edge line */}
      <motion.div
        className="absolute top-0 left-0 w-px"
        style={{
          height: lineH,
          background: `linear-gradient(to bottom, ${item.accent}90, transparent)`,
        }}
      />

      <div
        className={`relative z-10 flex flex-col justify-between h-full
          ${isLarge ? "p-8 md:p-10 min-h-[240px]" : "p-7 min-h-[210px]"}`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <span
            className="font-mono text-[11px] tracking-[0.2em] font-medium"
            style={{ color: item.accent + "70" }}
          >
            {item.number}
          </span>

          <div className="flex items-center gap-2">
            {item.tag && (
              <span
                className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
                style={{
                  background: item.accent + "20",
                  color: item.accent,
                  border: `1px solid ${item.accent}30`,
                }}
              >
                {item.tag}
              </span>
            )}

            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: item.accent + "15",
                border: `1px solid ${item.accent}25`,
                scale: iconScale,
                rotate: iconRotate,
              }}
            >
              <Icon size={18} style={{ color: item.accent }} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div>
          <h3
            className={`font-display font-bold text-white mb-2.5 leading-tight
              ${isLarge ? "text-2xl md:text-3xl" : "text-lg"}`}
          >
            {item.title}
          </h3>
          <p
            className={`text-white/50 leading-relaxed font-sans
              ${isLarge ? "text-base max-w-md" : "text-sm"}`}
          >
            {item.desc}
          </p>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: barW,
            background: `linear-gradient(to right, ${item.accent}90, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection]     = useState(1);

  const navigate = (dir) => {
    setDirection(dir);
    setMobileIndex((prev) => (prev + dir + items.length) % items.length);
  };

  return (
    <section
      id="features"
      className="py-24 bg-section dot-pattern relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #5DCAA5, transparent)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7F77DD, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-[#1D9E75]" />
              <span className="uppercase tracking-[0.2em] text-[#1D9E75] font-bold text-[10px] font-sans">
                Features
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight"
            >
              Everything you need to write{" "}
              <span className="text-secondary-teal">with precision.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE_OUT_EXPO }}
            className="text-white/35 text-sm font-sans max-w-xs leading-relaxed hidden md:block text-right"
          >
            Six tools. One seamless writing experience that adapts to how you think.
          </motion.p>
        </div>

        {/* Desktop grid */}
        <div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => (
            <FeatureCard key={idx} item={item} index={idx} isMobile={false} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="block sm:hidden">
          <div className="relative" style={{ minHeight: 280 }}>
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={mobileIndex}
                custom={direction}
                initial={(d) => ({ opacity: 0, x: d * 56, scale: 0.97 })}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={(d)  => ({ opacity: 0, x: d * -56, scale: 0.97 })}
                transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
              >
                <FeatureCard item={items[mobileIndex]} index={0} isMobile={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex gap-1.5">
              {items.map((it, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > mobileIndex ? 1 : -1);
                    setMobileIndex(idx);
                  }}
                  className="h-1 rounded-full"
                  style={{
                    width: mobileIndex === idx ? 24 : 6,
                    background:
                      mobileIndex === idx
                        ? items[mobileIndex].accent
                        : "rgba(255,255,255,0.15)",
                    transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease",
                  }}
                  aria-label={`Go to feature ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs font-mono tabular-nums">
                {String(mobileIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              {[-1, 1].map((dir) => (
                <button
                  key={dir}
                  onClick={() => navigate(dir)}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d={dir === -1 ? "M9 2L4 7L9 12" : "M5 2L10 7L5 12"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}