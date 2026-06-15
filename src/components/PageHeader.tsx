import { motion } from "framer-motion";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 grit opacity-30" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/20 blur-[120px] -z-10" />
      <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-stencil text-5xl md:text-7xl text-glow-red"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
