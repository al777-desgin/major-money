import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NodesNetworkBg, GrainLayer, HeadlineSpotlight } from "@/components/BackgroundFX";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Major Money" },
      { name: "description", content: "How Major Money started and why we fight for youth financial literacy." },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <>
      <PageHeader title="Our Story" subtitle="A movement born from the urgency of a financial crisis the next generation can't afford to inherit." />

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <GrainLayer opacity={0.08} />
          <NodesNetworkBg />
          <HeadlineSpotlight className="left-[10%] top-[10%] w-[480px] h-[360px]" />
        </div>
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 text-primary text-xs font-stencil tracking-[0.35em] mb-6">
              <Sparkles className="size-3" /> Origin
            </div>
            <h2 className="font-stencil text-3xl md:text-5xl text-glow-red">
              <span className="text-primary">Born</span> from Crisis
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed text-lg">
              In the current economic state, where the rise of inflation has put a squeeze on the financial situation of the middle class as well as the upcoming youth generation, society's economic stability is reaching a breaking point.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To create an interactive and intergenerational platform to tackle this issue, Major Money was founded. With a focus on analyzing the chain effects of debt crisis to poverty, the organization aims to educate and empower youth to develop stronger fiscal responsibility — paving the way toward more sustainable financial freedom.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-surface/30 border-y border-border overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <GrainLayer opacity={0.08} />
          <HeadlineSpotlight className="right-[10%] top-[20%] w-[420px] h-[300px]" />
        </div>
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 text-primary text-xs font-stencil tracking-[0.35em] mb-6">
              <Target className="size-3" /> Mission
            </div>
            <h2 className="font-stencil text-3xl md:text-5xl text-glow-red">
              The <span className="text-primary">Mission</span>
            </h2>
            <p className="mt-6 text-foreground/90 leading-relaxed border-l-2 border-primary pl-5 italic text-lg md:text-xl">
              "Major Money creates interactive and intergenerational financial literacy experiences that help youth understand the chain effects of debt, inflation, poverty, and financial instability."
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 text-primary font-stencil tracking-widest text-sm hover:gap-3 transition-all">
              Join the Movement <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
