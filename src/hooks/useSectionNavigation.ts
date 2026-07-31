import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getActiveSectionId,
  getHeaderOffset,
  NAV_SECTION_IDS,
  parseHashSection,
  scrollToSection,
} from "@/lib/sectionNav";

type NavigateOptions = {
  instant?: boolean;
};

/**
 * Hash deep-links, active-section tracking, and offset-aware scroll for the landing page.
 */
export function useSectionNavigation(
  sectionIds: readonly string[] = NAV_SECTION_IDS,
  enabled = true,
) {
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const refreshActive = useCallback(() => {
    if (!enabled) return;
    const offset = getHeaderOffset();
    setActiveSection(getActiveSectionId(sectionIds, offset));
  }, [enabled, sectionIds]);

  const navigateToSection = useCallback(
    (id: string, options: NavigateOptions = {}) => {
      if (!enabled) return false;
      const ok = scrollToSection(id, {
        instant: options.instant,
        updateHash: true,
      });
      if (ok) setActiveSection(id);
      return ok;
    },
    [enabled],
  );

  // Track active section from scroll / resize (real header height on mobile).
  useEffect(() => {
    if (!enabled) return;

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        refreshActive();
        ticking = false;
      });
    };

    refreshActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [enabled, refreshActive]);

  // Open URL hash → scroll to section + mark active (home only).
  useEffect(() => {
    if (!enabled) return;

    const applyHash = (instant = false) => {
      const id = parseHashSection(window.location.hash, sectionIds);
      if (!id) return;
      // Defer until layout paints so offsets are accurate.
      requestAnimationFrame(() => {
        scrollToSection(id, { instant, updateHash: false });
        setActiveSection(id);
      });
    };

    const timer = window.setTimeout(() => applyHash(false), 60);
    const onHashChange = () => applyHash(false);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enabled, sectionIds, location.pathname, location.hash]);

  return { activeSection, navigateToSection, refreshActive };
}
