"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

type ThemePref = "dark" | "light" | "system";

const NavBar = () => {
  const [theme, setTheme] = useState<ThemePref>("dark");
  const systemListenerRef = useRef<((e: MediaQueryListEvent) => void) | null>(
    null,
  );

  const applyTheme = (pref: ThemePref) => {
    const html = document.documentElement;
    const mq =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const systemIsDark = mq ? mq.matches : false;

    if (pref === "dark") {
      html.dataset.theme = "dark";
      html.classList.add("dark");
    } else if (pref === "light") {
      html.dataset.theme = "light";
      html.classList.remove("dark");
    } else {
      html.dataset.theme = "system";
      if (systemIsDark) html.classList.add("dark");
      else html.classList.remove("dark");
    }
  };

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("theme-preference")
        : null;
    const initial: ThemePref = (saved as ThemePref) || "dark";
    setTheme(initial);
    applyTheme(initial);

    // If system, listen to changes
    const mq =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (mq) {
      const handler = (e: MediaQueryListEvent) => {
        const currentPref =
          (localStorage.getItem("theme-preference") as ThemePref) || "dark";
        if (currentPref === "system") {
          applyTheme("system");
        }
      };
      systemListenerRef.current = handler;
      mq.addEventListener
        ? mq.addEventListener("change", handler)
        : mq.addListener(handler as any);
      return () => {
        mq.removeEventListener
          ? mq.removeEventListener("change", handler)
          : mq.removeListener(handler as any);
      };
    }
  }, []);

  const onChangeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pref = e.target.value as ThemePref;
    setTheme(pref);
    try {
      localStorage.setItem("theme-preference", pref);
    } catch {}
    applyTheme(pref);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm">
      <div className="app-container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-semibold text-[var(--accent-foreground)]"
          >
            BitLife Experiments
          </Link>
          <Link
            href="/credits"
            className="text-sm text-[var(--accent-foreground)]/90 hover:text-[var(--accent-foreground)]"
          >
            Credits
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="theme-select" className="sr-only">
            Theme
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={onChangeTheme}
            className="px-3 py-1 rounded-md border border-[var(--accent-foreground)]/30 bg-[rgba(255,255,255,0.08)] text-[var(--accent-foreground)]"
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
