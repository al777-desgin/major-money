import { useEffect, useState } from "react";

const chapters = [
  { id: "hero", label: "Intro" },
  { id: "problem", label: "Problem" },
  { id: "mission", label: "Mission" },
  { id: "framework", label: "Framework" },
  { id: "impact", label: "Impact" },
  { id: "action", label: "Action" },
  { id: "activities", label: "Activities" },
  { id: "game", label: "Game" },
  { id: "lessons", label: "Lessons" },
  { id: "book", label: "Book" },
  { id: "partners", label: "Partners" },
  { id: "future", label: "Future" },
  { id: "join", label: "Join" },
];

export function ChapterNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="group flex items-center gap-3 justify-end"
        >
          <span
            className={`text-[10px] font-stencil tracking-widest transition-all ${
              active === c.id ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-70"
            }`}
          >
            {c.label}
          </span>
          <span
            className={`block h-px transition-all ${
              active === c.id ? "w-10 bg-primary" : "w-5 bg-foreground/40 group-hover:bg-foreground"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
