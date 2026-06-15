import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/our-story", label: "Our Story" },
  { to: "/our-team", label: "Our Team" },
  { to: "/game", label: "Game" },
  { to: "/videocast", label: "Videocast" },
  { to: "/childrens-book", label: "Children's Book" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6 h-16 md:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt="Major Money" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110" />
          <span className="hidden sm:block font-stencil text-base xl:text-lg tracking-[0.2em] xl:tracking-widest whitespace-nowrap">
            MAJOR <span className="text-primary">MONEY</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="relative px-2 xl:px-3 py-2 text-[11px] xl:text-xs font-stencil uppercase tracking-[0.15em] xl:tracking-[0.2em] text-foreground/80 hover:text-foreground transition group whitespace-nowrap"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
              <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-3 xl:px-5 py-2 xl:py-2.5 text-[11px] xl:text-sm font-stencil tracking-[0.15em] xl:tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition red-glow-sm whitespace-nowrap shrink-0"
        >
          <span className="xl:hidden">Join</span>
          <span className="hidden xl:inline">Join Movement</span>
        </Link>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base font-stencil tracking-wider hover:text-primary hover:bg-surface transition"
                  activeProps={{ className: "text-primary" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
