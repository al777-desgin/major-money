import { Link } from "@tanstack/react-router";
import { Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const socials = [
  { Icon: Youtube, href: "https://www.youtube.com/@MajorMoneyOrg", label: "YouTube" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/major-money", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Major Money" className="h-14 w-auto" />
            <span className="font-stencil text-xl tracking-widest">
              MAJOR <span className="text-primary">MONEY</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground text-sm leading-relaxed">
            Mastering the future of money. We empower youth to build financial confidence, understand debt, and pursue sustainable financial freedom.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 grid place-items-center border border-border hover:border-primary hover:text-primary hover:red-glow-sm transition"
                aria-label={label}
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-stencil tracking-widest text-sm text-primary mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/our-story" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/our-team" className="hover:text-primary">Our Team</Link></li>
            <li><Link to="/videocast" className="hover:text-primary">Videocast</Link></li>
            <li><Link to="/childrens-book" className="hover:text-primary">Children's Book</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-stencil tracking-widest text-sm text-primary mb-4">Mission</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Financial literacy is freedom. We're equipping the next generation with the tools to thrive.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Major Money. All rights reserved.
      </div>
    </footer>
  );
}
