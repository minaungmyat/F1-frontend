import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [isDark, setIsDark] = useState(false);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => generateStars();
    window.addEventListener("resize", handleResize);

    // Detect theme (both prefers-color-scheme and <html class="dark">)
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");

      const updateTheme = (prefersMatch) => {
        const htmlHasDark = document.documentElement.classList.contains("dark");
        const isDarkMode =
          htmlHasDark || (typeof prefersMatch === "boolean" ? prefersMatch : mq.matches);
        setIsDark(isDarkMode);
      };

      updateTheme();

      const mqListener = (e) => updateTheme(e.matches);
      if (mq.addEventListener) mq.addEventListener("change", mqListener);
      else if (mq.addListener) mq.addListener(mqListener);

      const mo = new MutationObserver(() => updateTheme());
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => {
        window.removeEventListener("resize", handleResize);
        if (mq.removeEventListener) mq.removeEventListener("change", mqListener);
        else if (mq.removeListener) mq.removeListener(mqListener);
        mo.disconnect();
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }
    setMeteors(newMeteors);
  };

  const lightImage = new URL("@/assets/bg-light.jpg", import.meta.url).href;
  const darkImage = new URL("@/assets/bg-dark.jpg", import.meta.url).href;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        key={isDark ? "dark" : "light"}
        className="absolute inset-0 bg-center bg-cover opacity-30 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${isDark ? darkImage : lightImage})`,
        }}
      />
    </div>
  );
};
