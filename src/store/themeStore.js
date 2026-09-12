import { create } from "zustand";

const getInitialTheme = () => {
  const saved = localStorage.getItem("crm_theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

// Apply theme immediately on script load
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useThemeStore = create((set, get) => ({
  theme: initialTheme,
  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("crm_theme", nextTheme);
    applyTheme(nextTheme);
    set({ theme: nextTheme });
  },
  setTheme: (newTheme) => {
    localStorage.setItem("crm_theme", newTheme);
    applyTheme(newTheme);
    set({ theme: newTheme });
  }
}));
