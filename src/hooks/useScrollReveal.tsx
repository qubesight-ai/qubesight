import { useEffect } from "react";

/**
 * Auto-observes any element with .reveal-up / .reveal-left / .reveal-right
 * and toggles `.is-visible` once it enters the viewport.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal-up, .reveal-left, .reveal-right");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};
