import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { PageHeader } from "@/components/PageHeader";
import albertImg from "@/assets/team/albert.jpg.asset.json";
import elizabethImg from "@/assets/team/elizabeth.jpg.asset.json";
import sadiaImg from "@/assets/team/sadia.jpg.asset.json";
import jakeImg from "@/assets/team/jake.jpg.asset.json";
import adesinaImg from "@/assets/team/adesina.jpg.asset.json";
import nathanaelImg from "@/assets/team/nathanael.jpg.asset.json";
import sophiaImg from "@/assets/team/sophia.jpg.asset.json";

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Team — Major Money" },
      { name: "description", content: "Meet the executive team and global ambassadors of Major Money." },
    ],
  }),
  component: OurTeam,
});

type Person = { name: string; role: string; image?: string; objectPosition?: string };

const executives: Person[] = [
  { name: "Albert Luo", role: "Founder & Executive Director", image: albertImg.url, objectPosition: "right top" },
  { name: "Elizabeth Wang", role: "Director of Marketing", image: elizabethImg.url, objectPosition: "center top" },
];

const ambassadors: Person[] = [
  { name: "Sadia Omari", role: "Afghanistan", image: sadiaImg.url, objectPosition: "center top" },
  { name: "Jake Dong", role: "China (mainland)", image: jakeImg.url, objectPosition: "center top" },
  { name: "Adesina Abdulkabir", role: "Nigeria", image: adesinaImg.url, objectPosition: "center top" },
  { name: "Nathanael V. Navarro", role: "Philippines", image: nathanaelImg.url, objectPosition: "center top" },
  { name: "Sophia Chen", role: "Taiwan", image: sophiaImg.url, objectPosition: "center top" },
];

const locations: { name: string; coords: [number, number] }[] = [
  { name: "Afghanistan", coords: [66.0, 33.9] },
  { name: "China (mainland)", coords: [104.2, 35.9] },
  { name: "France", coords: [2.35, 46.6] },
  { name: "Lithuania", coords: [23.88, 55.17] },
  { name: "Nigeria", coords: [8.68, 9.08] },
  { name: "Philippines", coords: [121.77, 12.88] },
  { name: "Taiwan", coords: [120.96, 23.69] },
  { name: "United States", coords: [-98.58, 39.83] },
];

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function PortraitCard({ p, i }: { p: Person; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="group relative overflow-hidden bg-surface/40 border border-border hover:border-primary transition"
    >
      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-surface to-background overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            style={{ objectPosition: p.objectPosition ?? "center top" }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-stencil text-5xl text-primary/40 tracking-widest">
              {p.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
        <div className="absolute left-3 right-3 bottom-3 bg-black/85 backdrop-blur-sm px-4 py-3 border-l-2 border-primary">
          <div className="font-stencil text-base md:text-lg text-white uppercase tracking-wider leading-tight">
            {p.name}
          </div>
          <div className="text-xs text-white/70 mt-1">{p.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

function GlobalReach() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section className="py-20 md:py-28 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-stencil text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wide">
            GLOBAL <span className="text-primary text-glow-red">REACH.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Major Money ambassadors currently represent communities across the world.
          </p>
        </div>

        <div className="relative border border-border bg-background/60 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.22_25/0.10),transparent_70%)]" />
          <ComposableMap
            projectionConfig={{ scale: 155 }}
            width={980}
            height={500}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "oklch(0.22 0.01 240)",
                        stroke: "oklch(0.32 0.01 240)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "oklch(0.28 0.02 240)",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {locations.map((loc) => (
              <Marker
                key={loc.name}
                coordinates={loc.coords}
                onMouseEnter={() => setHover(loc.name)}
                onMouseLeave={() => setHover(null)}
                style={{ default: { cursor: "pointer" } }}
              >
                <g>
                  <circle
                    r={10}
                    fill="oklch(0.58 0.22 25 / 0.25)"
                    className="animate-ping"
                  />
                  <circle
                    r={5}
                    fill="oklch(0.58 0.22 25)"
                    stroke="#fff"
                    strokeWidth={1.2}
                  />
                  {hover === loc.name && (
                    <g>
                      <rect
                        x={8}
                        y={-22}
                        width={loc.name.length * 6.5 + 14}
                        height={20}
                        rx={2}
                        fill="#000"
                        stroke="oklch(0.58 0.22 25)"
                        strokeWidth={0.8}
                      />
                      <text
                        x={15}
                        y={-8}
                        fill="#fff"
                        fontSize={10}
                        fontFamily="sans-serif"
                        style={{ pointerEvents: "none" }}
                      >
                        {loc.name}
                      </text>
                    </g>
                  )}
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {locations.map((l) => (
            <span
              key={l.name}
              className={`px-3 py-1 text-[10px] font-stencil tracking-widest border transition ${
                hover === l.name
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurTeam() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="A youth-led collective of educators, creators, and changemakers."
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="font-stencil text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wide text-center mb-10">
            EXECUTIVE <span className="text-primary text-glow-red">TEAM.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {executives.map((p, i) => (
              <PortraitCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-stencil text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wide text-center mb-10">
            GLOBAL LEAD <span className="text-primary text-glow-red">AMBASSADORS.</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {ambassadors.map((p, i) => (
              <PortraitCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      <GlobalReach />
    </>
  );
}
