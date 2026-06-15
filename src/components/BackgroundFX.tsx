import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DollarSign, TrendingUp, ArrowUpRight, Hash, Percent, LineChart } from "lucide-react";

/* ---------- Animated grain layer ---------- */
export function GrainLayer({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 grit grain-anim pointer-events-none mix-blend-overlay"
      style={{ opacity }}
    />
  );
}

/* ---------- Animated grid backdrop ---------- */
export function GridBackdrop({ variant = "red" }: { variant?: "red" | "fine" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${variant === "red" ? "grid-bg" : "grid-bg-fine"}`}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    />
  );
}

/* ---------- Animated red glow blobs ---------- */
export function GlowOrbs({
  positions,
}: {
  positions?: Array<{ top?: string; left?: string; right?: string; bottom?: string; size?: number; delay?: number }>;
}) {
  const defaults = positions ?? [
    { top: "10%", left: "8%", size: 520, delay: 0 },
    { bottom: "12%", right: "6%", size: 420, delay: 3 },
  ];
  return (
    <>
      {defaults.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 blur-[140px] glow-breathe pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            width: p.size ?? 500,
            height: p.size ?? 500,
            animationDelay: `${p.delay ?? 0}s`,
          }}
        />
      ))}
    </>
  );
}

/* ---------- Red scanning line (mission-brief overlay) ---------- */
export function ScanlineOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent scan-line shadow-[0_0_24px_4px_oklch(0.58_0.22_25/0.6)]" />
    </div>
  );
}

/* ---------- Soft spotlight behind headings ---------- */
export function HeadlineSpotlight({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none rounded-full bg-primary/25 blur-[120px] spotlight-sweep ${className}`}
    />
  );
}

/* ---------- Floating financial symbols ---------- */
const ICONS = [DollarSign, TrendingUp, ArrowUpRight, Hash, Percent, LineChart];
export function FloatingSymbols({
  count = 10,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const items = Array.from({ length: count }).map((_, i) => {
    const Icon = ICONS[i % ICONS.length];
    const top = (i * 53) % 90 + 5;
    const left = (i * 37) % 92 + 4;
    const size = 18 + ((i * 13) % 28);
    const delay = (i * 0.9) % 8;
    const duration = 12 + ((i * 3) % 9);
    return { Icon, top, left, size, delay, duration, i };
  });
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {items.map(({ Icon, top, left, size, delay, duration, i }) => (
        <Icon
          key={i}
          className="absolute text-primary/25"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            animation: `float-soft ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Stock-ticker rising numbers ---------- */
export function TickerSymbols() {
  const items = [
    "+12.4%", "$1.2K", "▲ 3.8", "+0.42", "$890", "▲ 7.1%", "−1.2%", "$2.4K", "+14%",
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((t, i) => (
        <span
          key={i}
          className={`absolute font-stencil text-xs tracking-widest ${
            t.startsWith("−") ? "text-foreground/40" : "text-primary/50"
          } ticker-up`}
          style={{
            left: `${(i * 11 + 6) % 95}%`,
            bottom: "-10%",
            animationDelay: `${(i * 1.4) % 12}s`,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ---------- Animated chart lines ---------- */
export function ChartLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-50 ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="cl1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="oklch(0.58 0.22 25 / 0)" />
          <stop offset="0.5" stopColor="oklch(0.58 0.22 25 / 0.6)" />
          <stop offset="1" stopColor="oklch(0.58 0.22 25 / 0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,420 C150,380 250,460 380,400 C520,330 640,440 780,360 C920,290 1050,380 1200,320"
        fill="none"
        stroke="url(#cl1)"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        className="dash-flow"
      />
      <path
        d="M0,500 C160,470 280,520 420,470 C560,420 700,500 840,440 C980,380 1100,460 1200,420"
        fill="none"
        stroke="oklch(0.98 0 0 / 0.18)"
        strokeWidth="1"
        strokeDasharray="2 10"
        className="dash-flow"
        style={{ animationDuration: "9s" }}
      />
    </svg>
  );
}

/* ---------- Connecting lines (for framework cards) ---------- */
export function ConnectingWeb() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
    >
      <g
        stroke="oklch(0.58 0.22 25 / 0.35)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 8"
        className="dash-flow"
      >
        <path d="M120,150 L380,150 L640,150 L900,150 L1080,150" />
        <path d="M120,450 L380,450 L640,450 L900,450 L1080,450" />
        <path d="M120,150 L380,450 M380,150 L640,450 M640,150 L900,450 M900,150 L1080,450" />
        <path d="M380,150 L120,450 M640,150 L380,450 M900,150 L640,450 M1080,150 L900,450" />
      </g>
    </svg>
  );
}

/* ---------- Torn-paper red divider ---------- */
export function TornDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`relative h-10 w-full bg-primary/80 torn-edge-bottom ${flip ? "rotate-180" : ""}`}
      style={{
        boxShadow: "0 0 30px oklch(0.58 0.22 25 / 0.5)",
      }}
    />
  );
}

/* ---------- Parallax wrapper for backgrounds ---------- */
export function ParallaxLayer({
  children,
  speed = 0.3,
}: {
  children: ReactNode;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}%`, `${speed * 50}%`]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y }} className="absolute inset-[-15%]">
        {children}
      </motion.div>
    </div>
  );
}

/* ---------- Rising price tags (Problem section) ---------- */
export function PriceTagsBg() {
  const tags = ["$4.99", "$12.40", "$89", "$1,250", "$24.99", "$3.20", "$540", "$78"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {tags.map((t, i) => (
        <span
          key={i}
          className="absolute font-stencil text-xs md:text-sm text-primary/40 border border-primary/30 px-2 py-1 bg-background/40 backdrop-blur-sm"
          style={{
            left: `${(i * 13 + 5) % 92}%`,
            bottom: "-15%",
            animation: `ticker-up ${18 + (i % 6)}s linear ${(i * 1.7) % 10}s infinite`,
          }}
        >
          ▲ {t}
        </span>
      ))}
      {/* Warning lines */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <path d="M0,500 L200,420 L400,460 L600,360 L800,400 L1000,260 L1200,300"
          fill="none" stroke="oklch(0.58 0.22 25 / 0.5)" strokeWidth="1.5" strokeDasharray="6 6" className="dash-flow" />
      </svg>
    </div>
  );
}

/* ---------- Connected nodes (Mission section) ---------- */
export function NodesNetworkBg() {
  const nodes = Array.from({ length: 14 }).map((_, i) => ({
    cx: ((i * 87) % 1180) + 20,
    cy: ((i * 53) % 560) + 20,
    r: 3 + (i % 3),
    delay: (i * 0.3) % 4,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 1200 600" preserveAspectRatio="none">
      <g stroke="oklch(0.58 0.22 25 / 0.3)" strokeWidth="0.8" fill="none" strokeDasharray="3 6" className="dash-flow">
        {nodes.map((a, i) => nodes.slice(i + 1, i + 3).map((b, j) => (
          <line key={`${i}-${j}`} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} />
        )))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="oklch(0.58 0.22 25 / 0.6)" style={{ animation: `glow-breathe 6s ease-in-out ${n.delay}s infinite` }} />
      ))}
    </svg>
  );
}

/* ---------- Blueprint grid (Framework section) ---------- */
export function BlueprintBg() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40"
      style={{
        backgroundImage: `
          linear-gradient(oklch(0.98 0 0 / 0.05) 1px, transparent 1px),
          linear-gradient(90deg, oklch(0.98 0 0 / 0.05) 1px, transparent 1px),
          linear-gradient(oklch(0.58 0.22 25 / 0.08) 1px, transparent 1px),
          linear-gradient(90deg, oklch(0.58 0.22 25 / 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}

/* ---------- Dashboard chart grid (Impact section) ---------- */
export function DashboardBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 1200 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="oklch(0.58 0.22 25 / 0)" />
          <stop offset="1" stopColor="oklch(0.58 0.22 25 / 0.5)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 24 }).map((_, i) => {
        const h = 40 + ((i * 47) % 220);
        return <rect key={i} x={i * 50 + 10} y={600 - h} width="22" height={h} fill="url(#bar)" style={{ animation: `glow-breathe ${6 + (i % 4)}s ease-in-out ${(i * 0.2) % 3}s infinite` }} />;
      })}
      <path d="M0,400 L100,360 L200,380 L300,300 L400,340 L500,260 L600,290 L700,200 L800,240 L900,160 L1000,190 L1100,120 L1200,150"
        fill="none" stroke="oklch(0.58 0.22 25 / 0.7)" strokeWidth="2" strokeDasharray="4 6" className="dash-flow" />
    </svg>
  );
}

/* ---------- Collage shapes (Activities section) ---------- */
export function CollageShapesBg() {
  const shapes = Array.from({ length: 9 })
    .map((_, i) => ({
      top: (i * 23) % 80 + 5,
      left: (i * 41) % 85 + 5,
      size: 60 + ((i * 31) % 100),
      rot: (i * 37) % 90,
      delay: (i * 0.5) % 5,
      kind: i % 3,
    }))
    // Drop circle shapes — removes the large outlined circle decoration
    .filter((s) => s.kind !== 0);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <div key={i}
          className="absolute border border-primary/30"
          style={{
            top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size,
            transform: `rotate(${s.rot}deg)`,
            borderRadius: s.kind === 1 ? "0" : "8px",
            animation: `float-soft ${14 + (i % 5)}s ease-in-out ${s.delay}s infinite`,
            background: s.kind === 2 ? "oklch(0.58 0.22 25 / 0.05)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Video grid (Lessons section) ---------- */
export function VideoGridBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(oklch(0.98 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0 / 0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 45px",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100"
          fill="none" stroke="oklch(0.58 0.22 25 / 0.4)" strokeWidth="1.5" className="dash-flow" strokeDasharray="4 8" />
        <path d="M0,140 Q150,80 300,140 T600,140 T900,140 T1200,140"
          fill="none" stroke="oklch(0.98 0 0 / 0.15)" strokeWidth="1" strokeDasharray="2 10" className="dash-flow" />
      </svg>
    </div>
  );
}

/* ---------- Sky / clouds for book section ---------- */
export function SkyCloudsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.85 0.06 230) 0%, oklch(0.92 0.04 220) 50%, oklch(0.88 0.05 215) 100%)",
      }} />
      {/* Clouds */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}
          className="absolute rounded-full bg-white/70 blur-2xl"
          style={{
            top: `${(i * 17) % 70 + 5}%`,
            left: `-20%`,
            width: 200 + (i % 3) * 80,
            height: 80 + (i % 3) * 30,
            animation: `cloud-drift ${40 + (i * 6)}s linear ${i * 4}s infinite`,
          }}
        />
      ))}
      {/* Coin sparkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={`s-${i}`}
          className="absolute size-1.5 rounded-full bg-yellow-400"
          style={{
            top: `${(i * 29) % 90 + 5}%`,
            left: `${(i * 41) % 92 + 4}%`,
            boxShadow: "0 0 12px 2px rgba(250,204,21,0.8)",
            animation: `sparkle ${3 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
          }}
        />
      ))}
      {/* Wave at bottom */}
      <svg className="absolute -bottom-2 inset-x-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="oklch(0.72 0.1 220 / 0.6)" />
        <path d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z" fill="oklch(0.65 0.12 220 / 0.5)" />
      </svg>
    </div>
  );
}

/* ---------- Globe / network map (Partners section) ---------- */
export function GlobeNetworkBg() {
  const dots = Array.from({ length: 18 }).map((_, i) => ({
    cx: ((i * 71) % 1180) + 10,
    cy: ((i * 43) % 560) + 20,
    delay: (i * 0.3) % 4,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 1200 600" preserveAspectRatio="none">
      <ellipse cx="600" cy="300" rx="500" ry="220" fill="none" stroke="oklch(0.58 0.22 25 / 0.2)" strokeDasharray="3 8" className="dash-flow" />
      <ellipse cx="600" cy="300" rx="380" ry="160" fill="none" stroke="oklch(0.58 0.22 25 / 0.15)" strokeDasharray="2 10" className="dash-flow" />
      <g stroke="oklch(0.58 0.22 25 / 0.3)" strokeWidth="0.8" fill="none" strokeDasharray="2 6" className="dash-flow">
        {dots.map((a, i) => dots.slice(i + 1, i + 2).map((b, j) => (
          <line key={`l-${i}-${j}`} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} />
        )))}
      </g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="3" fill="oklch(0.58 0.22 25 / 0.8)" style={{ animation: `glow-breathe 5s ease-in-out ${d.delay}s infinite` }} />
      ))}
    </svg>
  );
}

/* ---------- Red gradient waves (Contact / Join) ---------- */
export function WaveGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[20%]"
        style={{
          background: "radial-gradient(ellipse at 30% 30%, oklch(0.58 0.22 25 / 0.3), transparent 50%), radial-gradient(ellipse at 70% 70%, oklch(0.58 0.22 25 / 0.25), transparent 50%)",
          animation: "wave-shift 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}
