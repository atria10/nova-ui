"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define available themes - bumblebee for light, sunset for dark
export const themes = {
  light: "myLight",
  dark: "myDark",
} as const;

export type ThemeMode = keyof typeof themes;
export type Theme = (typeof themes)[ThemeMode];

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  systemTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "app-theme-mode",
}: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedThemeMode = localStorage.getItem(storageKey) as ThemeMode;
      if (savedThemeMode && (savedThemeMode === "light" || savedThemeMode === "dark")) {
        setThemeModeState(savedThemeMode);
      } else {
        // If no saved theme, use system preference
        setThemeModeState(systemTheme);
      }
    } catch (error) {
      console.error("Error loading theme from localStorage:", error);
    }
    setMounted(true);
  }, [storageKey, systemTheme]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const actualTheme = themes[themeMode];
    
    // Set DaisyUI theme
    root.setAttribute("data-theme", actualTheme);

    // Also update the class for Tailwind's dark mode
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeMode, mounted]);

  const setThemeMode = (newMode: ThemeMode) => {
    setThemeModeState(newMode);
    try {
      localStorage.setItem(storageKey, newMode);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const theme = themes[themeMode];

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        themeMode, 
        setThemeMode, 
        toggleTheme, 
        systemTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}