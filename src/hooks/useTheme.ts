import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("default");
  const [mounted, setMounted] = useState(false);

  // Only run once on mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage
    const savedTheme = localStorage?.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Only run after component is mounted and on client-side
    if (mounted) {
      // Apply the theme by setting data-theme on <html>
      document.documentElement.setAttribute("data-theme", theme);
      // Store the selected theme in localStorage
      localStorage?.setItem("theme", theme);
    }
  }, [theme, mounted]);

  // Function to switch to squid game theme
  const switchToSquidGame = () => {
    setTheme("squid-game");
  };

  // Function to toggle between themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "default" ? "squid-game" : "default"));
  };

  return { theme, toggleTheme, switchToSquidGame };
};
