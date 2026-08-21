/** Section IDs linked from the main landing nav. */
export const NAV_SECTION_IDS = [
  "problem",
  "solution",
  "products",
  "voicebot",
  "industries",
  "pricing",
  "faq",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const HEADER_SELECTOR = "[data-site-header]";

/** Fallback when the header is not in the DOM yet. */
export const DEFAULT_HEADER_OFFSET = 80;

export function prefersReducedMotion(
  media: Pick<MediaQueryList, "matches"> | null = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null,
): boolean {
  return Boolean(media?.matches);
}

/**
 * Smooth scroll unless the user prefers reduced motion or requests instant.
 */
export function getScrollBehavior(options?: {
  instant?: boolean;
  matchMedia?: Pick<MediaQueryList, "matches"> | null;
}): ScrollBehavior {
  if (options?.instant) return "auto";
  if (prefersReducedMotion(options?.matchMedia ?? undefined)) return "auto";
  return "smooth";
}

/** Measure the real sticky header height (important on mobile when the menu opens). */
export function getHeaderOffset(
  headerSelector = HEADER_SELECTOR,
  doc: Document = document,
): number {
  const header = doc.querySelector(headerSelector);
  if (!header) return DEFAULT_HEADER_OFFSET;
  const height = header.getBoundingClientRect().height;
  return height > 0 ? Math.ceil(height) : DEFAULT_HEADER_OFFSET;
}

/** Resolve a URL hash to a known section id, or null. */
export function parseHashSection(
  hash: string,
  validIds: readonly string[] = NAV_SECTION_IDS,
): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, "")).trim();
  if (!id) return null;
  return validIds.includes(id) ? id : null;
}

/**
 * Which section is active given the scroll position and header offset.
 * Uses a probe line just below the header to avoid flicker on small screens.
 */
export function getActiveSectionId(
  sectionIds: readonly string[],
  offset: number,
  doc: Document = document,
): string {
  const probe = offset + 8;
  let current = "";
  for (const id of sectionIds) {
    const el = doc.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probe) current = id;
  }
  return current;
}

export type ScrollToSectionOptions = {
  instant?: boolean;
  updateHash?: boolean;
  headerSelector?: string;
  /** Injected for tests */
  scrollToFn?: typeof window.scrollTo;
  historyReplace?: (url: string) => void;
  matchMedia?: Pick<MediaQueryList, "matches"> | null;
};

/** Scroll to a section with header offset. Returns false if the element is missing. */
export function scrollToSection(
  id: string,
  options: ScrollToSectionOptions = {},
  doc: Document = document,
  win: Window = window,
): boolean {
  const el = doc.getElementById(id);
  if (!el) return false;

  const offset = getHeaderOffset(options.headerSelector ?? HEADER_SELECTOR, doc);
  const top = Math.max(0, el.getBoundingClientRect().top + win.scrollY - offset);
  const behavior = getScrollBehavior({
    instant: options.instant,
    matchMedia: options.matchMedia,
  });

  const scrollToFn = options.scrollToFn ?? win.scrollTo.bind(win);
  scrollToFn({ top, behavior });

  if (options.updateHash !== false) {
    const replace =
      options.historyReplace ??
      ((url: string) => win.history.replaceState(null, "", url));
    replace(`#${id}`);
  }

  return true;
}

/** Compute the Y target for a section (for assertions / callers). */
export function getSectionScrollTop(
  id: string,
  options: { headerSelector?: string } = {},
  doc: Document = document,
  win: Window = window,
): number | null {
  const el = doc.getElementById(id);
  if (!el) return null;
  const offset = getHeaderOffset(options.headerSelector ?? HEADER_SELECTOR, doc);
  return Math.max(0, el.getBoundingClientRect().top + win.scrollY - offset);
}
