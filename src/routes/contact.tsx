import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Youtube, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import contactPhoto from "@/assets/slideshow/two-people.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Major Money" },
      { name: "description", content: "Get in touch with the Major Money team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <>
      <PageHeader title="Contact" subtitle="Partnerships, press, schools, or just saying hi — we want to hear from you." />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks for submitting!", { description: "We'll be in touch soon." });
              setForm({ name: "", email: "", message: "" });
            }}
            className="p-8 md:p-10 bg-surface/60 border border-border space-y-5"
          >
            <div>
              <label className="block text-xs font-stencil tracking-widest text-primary mb-2">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-stencil tracking-widest text-primary mb-2">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-stencil tracking-widest text-primary mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-stencil tracking-widest text-sm red-glow hover:scale-105 transition"
            >
              <Send className="size-4" />
              Submit
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-amber-500/10 blur-xl opacity-50 pointer-events-none" />
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full">
                <img
                  src={contactPhoto.url}
                  alt="Major Money team members meeting at a UN event"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-stencil tracking-[0.25em] text-primary">ON THE GROUND</div>
                  <div className="text-sm text-white/90 mt-1">Building the movement, one conversation at a time.</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface/60 border border-border">
              <Mail className="size-8 text-primary mb-3" />
              <h3 className="font-stencil text-xl tracking-wider">Email</h3>
              <a
                href="mailto:AlbertLuo777@gmail.com"
                className="text-muted-foreground hover:text-primary transition mt-2 text-sm block"
              >
                AlbertLuo777@gmail.com
              </a>
            </div>
            <div className="p-8 bg-surface/60 border border-border">
              <h3 className="font-stencil text-xl tracking-wider mb-4">Follow the Movement</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.youtube.com/@MajorMoneyOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="size-11 grid place-items-center border border-border hover:border-primary hover:text-primary hover:red-glow-sm transition"
                >
                  <Youtube className="size-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/major-money"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="size-11 grid place-items-center border border-border hover:border-primary hover:text-primary hover:red-glow-sm transition"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
