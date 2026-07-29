"use client";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-cream/10 cursor-pointer transition"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <IoSunnyOutline className="w-5 lg:w-6 h-5 lg:h-6 text-cream hover:text-primary transition" />
      ) : (
        <IoMoonOutline className="w-5 lg:w-6 h-5 lg:h-6 text-secondary hover:text-primary transition" />
      )}
    </button>
  );
}