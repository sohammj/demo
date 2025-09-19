// src/components/HeaderEffects.tsx
"use client";
import { useEffect } from "react";

export default function HeaderEffects() {
  useEffect(() => {
    const el = document.querySelector(".header");
    const onScroll = () => {
      if (!el) return;
      if (window.scrollY > 20) {
        el.classList.add("shrink");
      } else {
        el.classList.remove("shrink");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
