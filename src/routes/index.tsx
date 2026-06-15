import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import slideUnescoBook from "@/assets/slideshow/unesco-book.jpg.asset.json";
import slideClimateWeek from "@/assets/slideshow/climate-week.jpg.asset.json";
import slideUnEcosoc from "@/assets/slideshow/un-ecosoc.jpg.asset.json";
import slideUnescoStage from "@/assets/slideshow/unesco-stage.jpg.asset.json";

// Easy to edit: add/remove/replace entries to update the homepage slideshow.
const slideshowImages: { src: string; alt: string; title: string; description: string }[] = [
  {
    src: slideUnescoStage.url,
    alt: "Speaker addressing the UNESCO general assembly stage",
    title: "At UNESCO",
    description:
      "Major Money connected with global education conversations at UNESCO, exploring how youth-centered learning can make financial literacy more accessible, practical, and relevant across communities.",
  },
  {
    src: slideUnEcosoc.url,
    alt: "Major Money at the United Nations ECOSOC chamber",
    title: "Inside ECOSOC",
    description:
      "Our team observed international policy discussions in an ECOSOC setting, gaining insight into how global leaders approach development, education, economic opportunity, and long-term social impact.",
  },
  {
    src: slideUnescoBook.url,
    alt: "Major Money founder presenting the Major Miser Adventure book at UNESCO",
    title: "Presenting Major Miser Adventure at UNESCO",
    description:
      "Major Money introduced Major Miser Adventure as a creative way to teach financial literacy through storytelling, visuals, and accessible lessons for younger students.",
  },
  {
    src: slideClimateWeek.url,
    alt: "Major Money team at Deloitte Horizons, Climate Week 2025 NYC",
    title: "At Climate Week NYC",
    description:
      "Major Money attended Climate Week NYC, connecting financial literacy with broader conversations about sustainability, leadership, innovation, and responsible decision-making.",
  },
];
import {
  ArrowRight, Target, TrendingUp, Users, Shield, Sparkles, Megaphone,
  Gamepad2, Heart, BookOpen, Globe, Banknote, LineChart,
  AlertTriangle, Play, Mail, Rocket, Lightbulb,
  Coins, Flame, Lock, Check, Trophy,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import bookCover from "@/assets/major-miser-book.png";
import { Counter } from "@/components/Counter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ChapterNav } from "@/components/ChapterNav";
import {
  GrainLayer, GridBackdrop, GlowOrbs, ScanlineOverlay, HeadlineSpotlight,
  FloatingSymbols, TickerSymbols, ParallaxLayer,
  PriceTagsBg, NodesNetworkBg, BlueprintBg, DashboardBg, CollageShapesBg,
  VideoGridBg, SkyCloudsBg, GlobeNetworkBg, WaveGradientBg,
} from "@/components/BackgroundFX";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Major Money — Mastering the Future of Money" },
      { name: "description", content: "A youth-led financial literacy movement. Master debt, inflation, and freedom with Major Money." },
    ],
  }),
  component: Home,
});

/* ---------- Data ---------- */

const framework = [
  { word: "Prepare", desc: "Prepare for Financial Market Stability", icon: Shield },
  { word: "Reach", desc: "Reach for Increased Investment", icon: TrendingUp },
  { word: "Organize", desc: "Organize More Employment Opportunities", icon: Users },
  { word: "Strategise", desc: "Strategise in Case of Decreased Consumer Spending", icon: Target },
  { word: "Prevent", desc: "Prevent Bankruptcies & Foreclosures", icon: Shield },
  { word: "Enhance", desc: "Enhance Social Services Provision", icon: Sparkles },
  { word: "Reassure", desc: "Reassure Social Peace and Political Stability", icon: Heart },
  { word: "Insulate", desc: "Insulate in Anticipation of Credit Crunch", icon: Shield },
  { word: "Thrive", desc: "Thrive Against Rising Cost of Living", icon: TrendingUp },
  { word: "Yield", desc: "Yield from Government Austerity Measures", icon: Banknote },
];

const stats = [
  { value: 15, suffix: "+", label: "Countries", icon: Globe },
  { value: 10, suffix: "+", label: "Resources", icon: BookOpen },
  { value: 25, suffix: "", label: "Schools", icon: Users },
  { value: 11000, suffix: "+", label: "Views", icon: LineChart },
  { value: 300, suffix: "+", label: "Students", icon: Sparkles },
  { value: 10, suffix: "+", label: "Partners", icon: Heart },
];

const activities = [
  { title: "Advocacy & Awareness", icon: Megaphone, desc: "A multimedia advocacy campaign — a YouTube series and curated videos across social platforms — raising awareness about financial literacy." },
  { title: "Community & Development", icon: Users, desc: "Engaging youth in schools, conferences, and forums to gather feedback and design a more interactive game plan." },
  { title: "Education & Gamification", icon: Gamepad2, desc: "A learning-outcomes-based online game that grows financial literacy from a young age and boosts retention." },
];

// Pulled from the official Major Money YouTube channel (@MajorMoneyOrg).
const lessons: { id: string; title: string; tag: string }[] = [
  { id: "xrx9An1VUag", title: "Major Money @ ECOSOC", tag: "Feature" },
  { id: "awusXK9rNHE", title: "Strategies for Decreased Consumer Spending", tag: "Episode 04" },
  { id: "EPrBA1F9ylU", title: "Organize More Employment Opportunities", tag: "Episode 03" },
  { id: "TVjz-s9MLWs", title: "Reach For Increased Investment", tag: "Episode 02" },
  { id: "N79ohwUiHhw", title: "Prepare For Financial Market Stability", tag: "Episode 01" },
  { id: "8-mmKQx4rHE", title: "Major Money Intro Video", tag: "Intro" },
];

const AMAZON_BOOK_URL =
  "https://www.amazon.com/Major-Miser-Adventure-Albert-Luo/dp/B0GWGD8YSY";

const partners = [
  "Aspire 2030",
  "Future of Economics",
  "UNESCO",
  "Youth Network",
  "LearningPlanet Alliance",
  "Certified Federal Credit Union",
  "Wescom Financial",
  "Prospectors Credit Union",
  "Reedley International School",
  "Credit Union of Southern California",
];

/* ---------- Page ---------- */

function Home() {
  return (
    <div className="relative isolate overflow-hidden home-bg">
      {/* Unified atmospheric background — same skin across every section */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,oklch(0.22_0.06_25/0.55),transparent_55%),radial-gradient(ellipse_at_85%_30%,oklch(0.20_0.04_25/0.45),transparent_60%),radial-gradient(ellipse_at_50%_100%,oklch(0.24_0.08_25/0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0506_0%,#0d0708_40%,#0a0506_100%)] -z-10" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.7 0.18 60 / 0.6) 1px,transparent 1px),linear-gradient(90deg,oklch(0.7 0.18 60 / 0.6) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <ScrollProgress />
      <ChapterNav />
      <Hero />
      <Problem />
      <Mission />
      <Framework />
      <Impact />
      <ActionSlideshow />
      <Activities />
      <GamePreview />
      <Lessons />
      <BookChapter />
      <Partners />
      <Future />
      <Join />
    </div>
  );
}

/* ---------- Reusable bits ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 text-primary text-[10px] md:text-xs font-stencil tracking-[0.35em] bg-primary/5">
      <span className="size-1.5 bg-primary rounded-full pulse-glow" />
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LineReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- 0. HERO ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[88vh] flex items-start overflow-hidden -mt-16 md:-mt-20 pt-24 md:pt-28"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.1} />
        <GridBackdrop />
        <GlowOrbs
          positions={[
            { top: "-10%", left: "20%", size: 720, delay: 0 },
            { bottom: "-10%", right: "-5%", size: 540, delay: 4 },
            { top: "40%", left: "-8%", size: 380, delay: 2 },
          ]}
        />
        <HeadlineSpotlight className="left-1/2 -translate-x-1/2 top-1/3 w-[700px] h-[400px]" />
        <ParallaxLayer speed={0.35}>
          <FloatingSymbols count={14} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.6}>
          <TickerSymbols />
        </ParallaxLayer>
        <ScanlineOverlay />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[12%] w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 bottom-0 right-[12%] w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <motion.div
        style={{ opacity: opacityContent, y: yContent }}
        className="mx-auto max-w-7xl px-5 lg:px-8 pt-4 pb-16 w-full text-center"
      >
        <motion.img
          src={logo}
          alt="Major Money emblem"
          initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-20 md:h-28 w-auto drop-shadow-[0_0_30px_oklch(0.58_0.22_25/0.5)] mb-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Eyebrow>Youth Financial Literacy</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-stencil text-[clamp(3rem,11vw,9rem)] leading-[0.85]"
        >
          MAJOR <span className="text-primary text-glow-red">MONEY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-6 font-stencil text-base md:text-xl tracking-[0.3em] text-foreground/75"
        >
          MASTERING THE FUTURE OF MONEY
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-10 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed"
        >
          A youth-led movement helping the next generation understand debt, inflation, financial responsibility, and sustainable financial freedom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <a
            href="#problem"
            className="group inline-flex items-center gap-3 text-xs font-stencil tracking-[0.4em] text-foreground/70 hover:text-primary transition"
          >
            BEGIN THE MISSION
          </a>
          <div className="relative w-px h-16 bg-gradient-to-b from-primary/70 to-transparent">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-4 bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- 1. PROBLEM ---------- */

function Problem() {
  const lines = ["Inflation.", "Debt.", "Rising costs.", "Financial uncertainty."];

  return (
    <section id="problem" className="relative min-h-[78vh] flex items-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <PriceTagsBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[640px] rounded-full bg-primary/15 blur-[140px] glow-breathe" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <Reveal>
          <Eyebrow><AlertTriangle className="size-3" /> Chapter 01 — The Problem</Eyebrow>
        </Reveal>

        <div className="mt-12 space-y-5 font-stencil text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">
          {lines.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={i === 3 ? "text-primary text-glow-red" : ""}
            >
              {l}
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-16 text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            <LineReveal text="For many young people, money decisions arrive before financial confidence does." />
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-10 font-stencil text-sm md:text-base tracking-[0.3em] text-primary uppercase">
            Major Money was created to close that gap.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 2. MISSION ---------- */

function Mission() {
  const pillars = [
    { icon: Lightbulb, label: "Educate" },
    { icon: Sparkles, label: "Empower" },
    { icon: Rocket, label: "Liberate" },
  ];
  return (
    <section id="mission" className="relative min-h-[78vh] flex items-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <NodesNetworkBg />
        <HeadlineSpotlight className="left-[10%] top-[20%] w-[520px] h-[380px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <Reveal><Eyebrow>Chapter 02 — Our Mission</Eyebrow></Reveal>
        <h2 className="mt-8 font-stencil text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
          <LineReveal text="EDUCATE." className="block" />
          <LineReveal text="EMPOWER." className="block text-primary text-glow-red" />
          <LineReveal text="LIBERATE." className="block" />
        </h2>

        <Reveal delay={0.3}>
          <p className="mt-12 text-foreground/85 text-lg leading-relaxed max-w-2xl mx-auto">
            Major Money creates interactive and intergenerational financial literacy experiences that help youth understand the chain effects of debt, inflation, poverty, and financial instability.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-6 border border-primary/30 bg-background/60 backdrop-blur-sm hover:border-primary transition"
            >
              <div className="absolute -inset-px bg-primary/0 group-hover:bg-primary/5 transition" />
              <p.icon className="relative size-7 text-primary mx-auto mb-3" />
              <div className="relative font-stencil tracking-[0.25em] text-sm text-primary uppercase">{p.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. FRAMEWORK ---------- */

function Framework() {
  return (
    <section id="framework" className="relative min-h-[78vh] overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <BlueprintBg />
        <HeadlineSpotlight className="left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 03 — The Blueprint</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            OUR <span className="text-primary text-glow-red">PROSPERITY</span> FRAMEWORK
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground text-lg">
              Our 10-Step Plan to Realize Financial Empowerment.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {framework.map((f, i) => (
            <motion.div
              key={f.word}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-6 bg-surface/40 border border-border hover:border-primary transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-2xl transition-all duration-500" />
              <div className="relative">
                <div className="text-[10px] font-stencil text-primary/70 tracking-[0.3em] mb-3">
                  STEP / {String(i + 1).padStart(2, "0")}
                </div>
                <f.icon className="size-7 text-primary mb-4 group-hover:scale-110 transition" />
                <h3 className="font-stencil text-2xl text-primary mb-2 uppercase group-hover:text-glow-red">
                  {f.word}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. IMPACT ---------- */

function Impact() {
  return (
    <section id="impact" className="relative min-h-[78vh] flex items-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <DashboardBg />
        <div className="absolute bottom-0 right-0 size-[600px] rounded-full bg-primary/15 blur-[140px] glow-breathe" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 04 — By the Numbers</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">
            OUR <span className="text-primary text-glow-red">IMPACT</span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Measuring reach across schools, countries, and the next generation of financially confident young people.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative group p-8 border border-border hover:border-primary transition bg-background/80 backdrop-blur-sm text-center overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />
              <s.icon className="size-6 text-primary mx-auto mb-3 group-hover:scale-110 transition" />
              <div className="font-stencil text-4xl md:text-5xl text-primary text-glow-red">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[10px] font-stencil tracking-[0.25em] text-muted-foreground uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 ACTION SLIDESHOW ---------- */

function ActionSlideshow() {
  const [index, setIndex] = useState(0);
  const count = slideshowImages.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <section id="action" className="relative overflow-hidden py-20 md:py-24 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-primary/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 05 — In the Field</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
            MAJOR MONEY <span className="text-primary text-glow-red">IN ACTION</span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              A visual look at the people, moments, and mission behind our movement.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="relative mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            {/* Left: Image gallery */}
            <div className="relative lg:col-span-3 group">
              <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-primary/30 via-amber-500/10 to-primary/20 blur-2xl opacity-60 pointer-events-none" />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-[28px] border border-primary/30 bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)]">
                {slideshowImages.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out"
                    style={{ opacity: i === index ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-[24px]" />

                {/* Dots */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  {slideshowImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-8 bg-primary shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                          : "w-3 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Title + description panel */}
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase text-primary/80 font-semibold">
                  <span className="h-px w-6 bg-primary/60" />
                  In Action
                </div>
                <div className="relative mt-4 min-h-[220px] md:min-h-[260px]">
                  {slideshowImages.map((img, i) => (
                    <div
                      key={img.src}
                      aria-hidden={i !== index}
                      className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
                      style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
                    >
                      <h3 className="font-stencil text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.05] text-white">
                        {img.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                        {img.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs text-white/50 tabular-nums">
                  <span className="text-primary font-semibold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span>{String(count).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 5. ACTIVITIES ---------- */


function Activities() {
  return (
    <section id="activities" className="relative overflow-hidden pt-20 pb-10 md:pb-14 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <CollageShapesBg />
        <HeadlineSpotlight className="right-[10%] top-[20%] w-[480px] h-[360px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 06 — How We Move</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            OUR <span className="text-primary text-glow-red">ACTIVITIES</span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground text-lg">
              A three-pronged approach to realize and grow impact.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3, scale: 1.02 }}
              style={{ transformPerspective: 1000 }}
              className="group relative p-8 bg-surface/40 border border-border hover:border-primary transition overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-700" />
              <div className="absolute -top-20 -right-20 size-48 bg-primary/0 group-hover:bg-primary/25 blur-3xl transition-all duration-500" />
              <div className="relative">
                <div className="size-14 grid place-items-center border-2 border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition mb-6">
                  <a.icon className="size-6" />
                </div>
                <div className="text-[10px] font-stencil tracking-[0.3em] text-primary/70 mb-2">
                  / 0{i + 1}
                </div>
                <h3 className="font-stencil text-2xl text-primary mb-3 uppercase">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. LESSONS ---------- */

function HomeVideoCard({ v, i }: { v: { id: string; title: string; tag: string }; i: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[16/10] border border-border hover:border-primary bg-background overflow-hidden transition"
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full text-left"
          aria-label={`Play ${v.title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
            alt={v.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="size-16 grid place-items-center rounded-full border-2 border-primary bg-background/80 backdrop-blur-sm group-hover:bg-primary group-hover:scale-110 transition">
              <Play className="size-6 text-primary group-hover:text-primary-foreground transition" />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-5">
            <div className="text-[10px] font-stencil text-primary tracking-[0.3em] mb-1">
              {v.tag}
            </div>
            <div className="font-stencil text-xl text-foreground group-hover:text-primary transition uppercase tracking-wider">
              {v.title}
            </div>
          </div>
        </button>
      )}
    </motion.div>
  );
}

function Lessons() {
  return (
    <section id="lessons" className="relative z-10 flex items-center overflow-visible pt-20 pb-20 md:pb-24 bg-transparent">
      <div
        className="absolute inset-x-0 top-0 -bottom-32 md:-bottom-40 -z-10 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 74%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 74%, transparent 100%)",
        }}
      >
        <GrainLayer opacity={0.08} />
        <VideoGridBg />
        <div className="absolute bottom-[-8%] left-0 size-[560px] rounded-full bg-primary/18 blur-[150px] glow-breathe" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-5 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 07 — Watch & Learn</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            VIDEOCAST <span className="text-primary text-glow-red">LESSONS</span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground text-lg">
              Short, accessible lessons on the financial decisions shaping young people's futures.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((l, i) => (
            <HomeVideoCard key={l.id} v={l} i={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="relative z-40 mt-16 md:mt-20 mb-20 md:mb-28 text-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] max-w-[80vw] h-40 rounded-full bg-primary/25 blur-3xl -z-10" />
            <Link
              to="/videocast"
              className="relative z-40 inline-flex items-center gap-3 px-7 py-3.5 border-2 border-primary text-primary font-stencil tracking-[0.25em] text-xs hover:bg-primary hover:text-primary-foreground transition bg-background/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,50,50,0.35)]"
            >
              EXPLORE ALL LESSONS <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

      </div>

      {/* Mirrored wave fading into book section */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] w-full h-12 md:h-16 z-30 text-[rgb(200,217,238)]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
      {/* Thin cinematic divider line sitting just above the wave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-12 md:bottom-16 h-px z-40 bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.35)]"
      />
    </section>

  );
}



/* ---------- 7. CHILDREN'S BOOK — continuous chapter ---------- */

function Cloud({ className = "", size = 200, delay = 0 }: { className?: string; size?: number; delay?: number }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size * 0.45,
        animation: `cloud-drift ${60 + delay}s linear ${-delay}s infinite`,
      }}
    >
      <div className="w-full h-full bg-white/85 rounded-full blur-2xl" />
    </div>
  );
}

function BookChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const redOverlay = useTransform(scrollYProgress, [0, 0.42, 0.8], [0.22, 0.08, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0.18, 0.62], [0, 0.65]);

  // Title intro (drifts in & out as the scene brightens) — slow, subtle, atmospheric
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.85, 1], [0, 0.98, 0.96, 0.88]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const titleBlur = useTransform(scrollYProgress, [0.2, 0.6], [10, 0]);
  const titleFilter = useTransform(titleBlur, (b) => `blur(${b}px)`);

  // Cloud parallax (slower than scroll)
  const cloudsY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="book"
      ref={ref}
      className="relative overflow-visible -mt-2 pt-20 md:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(200,217,238,1) 0%, rgba(219,234,254,1) 18%, rgba(238,246,255,1) 40%, rgba(248,251,255,1) 70%, rgba(255,247,230,1) 100%)",
        }}
      />


      {/* Dying red glow carrying the Major Money palette into the chapter */}
      <motion.div
        style={{ opacity: redOverlay }}
        className="pointer-events-none absolute left-1/2 -top-10 md:-top-12 -translate-x-1/2 w-[108vw] h-[24vh] rounded-full blur-3xl bg-primary/18"
      />
      {/* Soft white mist that builds in */}
      <motion.div
        style={{ opacity: mistOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.5),transparent_65%)]"
      />

      {/* Drifting clouds (full-section parallax) */}
      <motion.div style={{ y: cloudsY }} className="pointer-events-none absolute inset-0">
        <Cloud className="top-[18%] left-[4%]" size={220} delay={0} />
        <Cloud className="top-[28%] right-[6%]" size={180} delay={6} />
        <Cloud className="top-[55%] left-[12%]" size={260} delay={12} />
        <Cloud className="top-[70%] right-[18%]" size={200} delay={18} />
        <Cloud className="top-[85%] left-[30%]" size={160} delay={4} />
      </motion.div>

      {/* Coin / star sparkles spread across the chapter */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1.5 rounded-full bg-yellow-300"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              boxShadow: "0 0 10px 2px rgba(250,204,21,0.85)",
              animation: `sparkle ${3 + (i % 4)}s ease-in-out ${(i * 0.3) % 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ----- Chapter title intro (lives inside same section) ----- */}
      <div className="relative h-[36vh] md:h-[38vh] flex flex-col items-center justify-center text-center px-5 pt-10 md:pt-12">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, filter: titleFilter }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="relative z-0 hidden md:block select-none"
          aria-hidden
        >
          <div className="font-stencil tracking-[0.5em] text-xs md:text-sm text-slate-800/75 mb-4">
            CHAPTER 08
          </div>
          <h2 className="font-stencil font-black text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9] text-slate-900 drop-shadow-[0_6px_28px_rgba(15,23,42,0.35)]">
            MAJOR MISER
            <br />
            <span className="text-blue-700 drop-shadow-[0_6px_28px_rgba(29,78,216,0.35)]">ADVENTURE</span>
          </h2>
          <div className="mt-6 mx-auto h-px w-32 bg-slate-900/35" />
          <div className="mt-4 text-slate-700/80 text-sm tracking-[0.3em] font-stencil">
            A NEW CHAPTER BEGINS
          </div>
        </motion.div>
      </div>

      {/* ----- Book content (same background, no reset) ----- */}
      <div className="relative pb-40 md:pb-56 pt-6 md:pt-10">

        <div className="relative z-20 mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="relative book-float lg:max-w-[520px] mx-auto">
              <div className="absolute -inset-12 bg-white/50 blur-3xl rounded-full" />
              <div className="relative border-[6px] md:border-[8px] border-white shadow-2xl rounded-lg overflow-hidden bg-white">
                <img src={bookCover} alt="Major Miser Adventure book cover" className="w-full h-auto block" />
              </div>
              <Sparkles className="absolute -top-4 -right-4 size-8 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
              <Sparkles className="absolute -bottom-6 -left-2 size-6 text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
            </div>
          </Reveal>

          <div className="text-slate-900">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-600/40 text-blue-700 text-[10px] md:text-xs font-stencil tracking-[0.35em] bg-white/60 backdrop-blur-sm rounded-sm">
                <span className="size-1.5 bg-blue-600 rounded-full" />
                For The Next Generation
              </div>
            </Reveal>
            <h3 className="mt-8 font-stencil text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-slate-900">
              MAJOR MISER <br />
              <span className="text-blue-700">ADVENTURE</span>
            </h3>
            <Reveal delay={0.2}>
              <p className="mt-10 text-slate-800 text-lg md:text-xl leading-relaxed">
                Introducing financial literacy at a young age through storytelling, visuals, and accessible lessons.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-5 text-slate-700 leading-relaxed">
                Major Miser Adventure brings money lessons into a storybook world, helping younger students begin learning about choices, saving, and financial responsibility in a way that feels imaginative and approachable.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <div className="relative z-30 mt-12 flex flex-wrap gap-4">
                <Link
                  to="/childrens-book"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-blue-700 text-white font-stencil tracking-[0.25em] text-xs hover:bg-blue-800 hover:scale-105 transition shadow-lg rounded-md"
                >
                  <BookOpen className="size-4" /> EXPLORE THE BOOK
                </Link>
                <a
                  href={AMAZON_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-amber-500 text-slate-900 font-stencil tracking-[0.25em] text-xs hover:bg-amber-400 hover:scale-105 transition shadow-lg rounded-md"
                >
                  <BookOpen className="size-4" /> BUY ON AMAZON
                </a>
              </div>

            </Reveal>
          </div>
        </div>

        {/* Soft waves bridging into next section */}
        <svg
          className="absolute -bottom-1 left-0 w-full h-20 text-blue-200/50 z-0"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,120 C300,40 600,200 900,100 C1050,50 1150,120 1200,90 L1200,200 L0,200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Subtle bottom fade into the dark Partners section (soft, short) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background/85 z-0" />

    </section>
  );
}


/* ---------- 8. PARTNERS ---------- */

function Partners() {
  return (
    <section id="partners" className="relative min-h-[78vh] flex items-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <GlobeNetworkBg />
        <HeadlineSpotlight className="left-1/2 -translate-x-1/2 top-1/3 w-[600px] h-[400px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><Eyebrow>Chapter 09 — The Allies</Eyebrow></Reveal>
          <h2 className="mt-6 font-stencil text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            OUR <span className="text-primary text-glow-red">GLOBAL</span> PARTNERS
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground text-lg">
              We collaborate with youth, educators, and global-facing organizations to expand access to financial literacy.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden py-10 bg-background/60 backdrop-blur-sm">
          <div className="flex marquee gap-16 whitespace-nowrap">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <span key={i} className="font-stencil text-2xl md:text-3xl tracking-[0.2em] text-foreground/70 hover:text-primary transition">
                {p} <span className="text-primary/40 mx-8">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative aspect-[3/2] grid place-items-center border border-border bg-background/70 backdrop-blur-sm hover:border-primary transition group overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 blur-xl transition" />
              <span className="relative font-stencil text-center text-sm tracking-[0.2em] text-muted-foreground group-hover:text-primary group-hover:text-glow-red transition px-4">
                {p}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. FUTURE ---------- */

function Future() {
  return (
    <section id="future" className="relative min-h-[80vh] flex items-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <GridBackdrop />
        <HeadlineSpotlight className="left-1/2 -translate-x-1/2 top-1/3 w-[700px] h-[400px]" />
        <ParallaxLayer speed={0.3}><FloatingSymbols count={8} /></ParallaxLayer>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <Reveal><Eyebrow>Chapter 10 — The Future</Eyebrow></Reveal>
        <h2 className="mt-6 font-stencil text-[clamp(2.5rem,8vw,7rem)] leading-[0.9]">
          <LineReveal text="THE NEXT" className="block" />
          <LineReveal text="GENERATION" className="block text-primary text-glow-red" />
          <LineReveal text="OF MONEY." className="block" />
        </h2>
        <Reveal delay={0.4}>
          <p className="mt-12 text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            We're scaling financial literacy across schools, languages, and platforms — building a world where every young person inherits confidence, not confusion.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 10. JOIN ---------- */

function Join() {
  return (
    <section id="join" className="relative overflow-hidden py-28 md:py-32 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none section-bg-blend">
        <GrainLayer opacity={0.08} />
        <WaveGradientBg />
        <ParallaxLayer speed={0.3}><TickerSymbols /></ParallaxLayer>
      </div>
      <div className="absolute -top-1 inset-x-0 h-6 bg-primary/70 torn-edge-bottom" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <Reveal><Rocket className="size-10 text-primary mx-auto mb-6" /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-stencil text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9]">
            JOIN THE <span className="text-primary text-glow-red">MOVEMENT</span>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 text-foreground/80 text-lg max-w-2xl mx-auto">
            Help Major Money expand financial literacy resources, youth education, and interactive learning experiences.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              f.reset();
              toast.success("Thanks for submitting!");
            }}
            className="mt-12 mx-auto max-w-xl flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full h-14 pl-11 pr-4 bg-background/70 backdrop-blur-sm border border-border focus:border-primary outline-none text-base placeholder:text-muted-foreground/60 transition"
              />
            </div>
            <button
              type="submit"
              className="h-14 px-8 bg-primary text-primary-foreground font-stencil tracking-[0.25em] text-xs hover:scale-105 transition red-glow-sm whitespace-nowrap"
            >
              SIGN UP
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:AlbertLuo777@gmail.com"
              className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/70 text-primary font-stencil tracking-[0.25em] text-xs hover:bg-primary hover:text-primary-foreground transition"
            >
              <Mail className="size-4" /> AlbertLuo777@gmail.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Game preview section ---------- */

function GamePreview() {
  return (
    <section id="game" className="relative overflow-hidden py-20 md:py-28 bg-transparent">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <Eyebrow>Interactive Learning</Eyebrow>
          <h2 className="mt-4 font-stencil text-4xl md:text-6xl tracking-wider text-glow-red">
            PLAY THE MONEY GAME
          </h2>
          <p className="mt-5 text-base md:text-lg text-foreground/85 max-w-xl leading-relaxed">
            Practice budgeting, credit, investing, taxes, scams, inflation, and real-world money decisions through fast missions built for students.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/game"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-stencil tracking-widest red-glow-sm hover:bg-primary/90 transition"
            >
              <Gamepad2 className="size-4" /> Start Playing <ArrowRight className="size-4" />
            </Link>
            <span className="inline-flex items-center gap-2 px-4 py-3 border border-border text-xs font-stencil tracking-widest text-muted-foreground">
              10 WORLDS · 50 MISSIONS
            </span>
          </div>
        </div>

        {/* Preview card */}
        <div className="relative">
          <div className="bg-surface/70 backdrop-blur-sm border border-border rounded-2xl p-5 md:p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-stencil tracking-[0.3em] text-muted-foreground">PLAYER STATS</div>
              <div className="text-[10px] font-stencil tracking-widest text-primary">PREVIEW</div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <PreviewStat icon={Sparkles} label="XP" value="320" />
              <PreviewStat icon={Flame} label="Streak" value="4d" />
              <PreviewStat icon={Heart} label="Hearts" value="5/5" />
            </div>

            <div className="mt-5 text-[10px] font-stencil tracking-[0.3em] text-muted-foreground mb-2">YOUR PATH</div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { state: "done" }, { state: "done" }, { state: "current" },
                { state: "locked" }, { state: "locked" },
              ].map((n, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl border flex items-center justify-center ${
                    n.state === "done"
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : n.state === "current"
                        ? "border-primary bg-primary/15 text-primary red-glow-sm animate-pulse"
                        : "border-border bg-surface/40 text-muted-foreground/60"
                  }`}
                >
                  {n.state === "done" ? <Check className="size-4" /> : n.state === "locked" ? <Lock className="size-4" /> : <Sparkles className="size-4" />}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Trophy className="size-4 text-primary" /> Earn badges as you finish each world.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({ icon: Icon, label, value }: { icon: typeof Coins; label: string; value: string }) {
  return (
    <div className="border border-border bg-surface/50 rounded-xl px-3 py-3">
      <div className="flex items-center gap-2 text-primary"><Icon className="size-4" /></div>
      <div className="mt-1 font-stencil text-lg tabular-nums">{value}</div>
      <div className="text-[10px] font-stencil tracking-widest text-muted-foreground">{label.toUpperCase()}</div>
    </div>
  );
}

