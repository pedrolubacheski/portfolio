import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const THEME_KEY = "pedro-portfolio-theme";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "professional",
  );

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "professional" ? "cyberpunk" : "professional",
    );
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="site-shell">
      <Navbar theme={theme} onThemeChange={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
