import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = ["Destinations", "Packages", "About Us", "Blog", "Contact"];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 backdrop-blur-sm transition-colors duration-500 ${
        darkMode
          ? "bg-indigo-900/90 text-white"
          : "bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 text-white"
      } ${scrolled ? "shadow-lg border-b border-white/20" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1
          className={`text-3xl font-extrabold tracking-wide cursor-pointer select-none ${
            darkMode
              ? "text-yellow-300 hover:text-yellow-400"
              : "text-white hover:text-yellow-200"
          } transition-transform duration-300 hover:scale-105`}
        >
          TravelX
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              onClick={closeMenu}
              className={`relative group text-lg font-semibold transition-colors duration-300 ${
                darkMode
                  ? "text-yellow-200 hover:text-yellow-400"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-1 w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={`ml-6 transition-colors duration-300 ${
              darkMode ? "text-yellow-300 hover:text-yellow-400" : "text-white hover:text-yellow-300"
            }`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            darkMode ? "text-yellow-300" : "text-white"
          }`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          className={`md:hidden px-6 pb-6 flex flex-col space-y-6 backdrop-blur-sm transition-colors duration-300 ${
            darkMode
              ? "bg-indigo-900/95 text-yellow-200"
              : "bg-gradient-to-b from-blue-400 via-cyan-400 to-green-400 text-white"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              onClick={closeMenu}
              className={`relative group text-xl font-semibold transition-colors duration-300 ${
                darkMode
                  ? "hover:text-yellow-400"
                  : "hover:text-yellow-200"
              }`}
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-1 w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="self-start hover:text-yellow-400 transition-colors duration-300"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      )}
    </motion.nav>
  );
}
