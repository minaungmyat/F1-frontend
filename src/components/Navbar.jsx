import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Results", href: "/results" },
  { name: "Drivers", href: "/drivers" },
  { name: "Teams", href: "/teams" },
  { name: "Simulator", href: "/simulator" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "py-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.4)] bg-black/10 dark:bg-white/10"
          : "py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.4)] bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-foreground flex items-center">
          <span className="relative z-10">
            <span className="text-primary">Project</span> F1
          </span>
        </Link>

        {/* Navigation links + theme toggle */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) =>
            item.href.startsWith("#") ? (
              <a
                key={key}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={key}
                to={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            )
          )}

          {/* Theme toggle button aligned with nav links */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
