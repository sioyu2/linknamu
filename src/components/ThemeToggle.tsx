"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg shadow-sm transition hover:scale-105 dark:border-neutral-700 dark:bg-neutral-800"
    >
      {/* 첫 렌더에서는 테마를 모르므로 비워 둠 (깜빡임 방지) */}
      {dark === null ? null : dark ? "☀️" : "🌙"}
    </button>
  );
}
