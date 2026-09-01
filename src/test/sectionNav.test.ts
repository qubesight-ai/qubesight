import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  DEFAULT_HEADER_OFFSET,
  getActiveSectionId,
  getHeaderOffset,
  getScrollBehavior,
  getSectionScrollTop,
  NAV_SECTION_IDS,
  parseHashSection,
  prefersReducedMotion,
  scrollToSection,
} from "@/lib/sectionNav";

function mockRect(top: number, height = 100) {
  return {
    top,
    bottom: top + height,
    height,
    width: 320,
    left: 0,
    right: 320,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

describe("sectionNav — hash / anchors", () => {
  it("parses valid section hashes", () => {
    expect(parseHashSection("#pricing")).toBe("pricing");
    expect(parseHashSection("faq")).toBe("faq");
    expect(parseHashSection("#products")).toBe("products");
  });

  it("rejects empty or unknown hashes", () => {
    expect(parseHashSection("")).toBeNull();
    expect(parseHashSection("#")).toBeNull();
    expect(parseHashSection("#unknown")).toBeNull();
    expect(parseHashSection("#hero")).toBeNull();
  });

  it("exposes the landing nav section ids", () => {
    expect(NAV_SECTION_IDS).toEqual([
      "problem",
      "solution",
      "products",
      "voicebot",
      "industries",
      "pricing",
      "faq",
    ]);
  });
});

describe("sectionNav — scroll behavior", () => {
  it("defaults to smooth", () => {
    expect(getScrollBehavior({ matchMedia: { matches: false } })).toBe("smooth");
  });

  it("uses instant when prefers-reduced-motion is set", () => {
    expect(getScrollBehavior({ matchMedia: { matches: true } })).toBe("auto");
    expect(prefersReducedMotion({ matches: true })).toBe(true);
  });

  it("uses instant when the user requests it", () => {
    expect(getScrollBehavior({ instant: true, matchMedia: { matches: false } })).toBe("auto");
  });
});

describe("sectionNav — header offset & scroll target", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true, writable: true });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("falls back to DEFAULT_HEADER_OFFSET when header is missing", () => {
    expect(getHeaderOffset()).toBe(DEFAULT_HEADER_OFFSET);
  });

  it("measures the real header height (mobile drawer safe)", () => {
    const header = document.createElement("header");
    header.setAttribute("data-site-header", "");
    document.body.appendChild(header);
    header.getBoundingClientRect = () => mockRect(0, 196);

    expect(getHeaderOffset()).toBe(196);
  });

  it("computes scroll top with header offset", () => {
    const header = document.createElement("header");
    header.setAttribute("data-site-header", "");
    header.getBoundingClientRect = () => mockRect(0, 80);
    document.body.appendChild(header);

    const section = document.createElement("section");
    section.id = "pricing";
    section.getBoundingClientRect = () => mockRect(1200, 400);
    document.body.appendChild(section);

    Object.defineProperty(window, "scrollY", { value: 200, configurable: true });

    // 1200 + 200 - 80 = 1320
    expect(getSectionScrollTop("pricing")).toBe(1320);
  });

  it("scrollToSection scrolls with offset and updates the hash", () => {
    const header = document.createElement("header");
    header.setAttribute("data-site-header", "");
    header.getBoundingClientRect = () => mockRect(0, 80);
    document.body.appendChild(header);

    const section = document.createElement("section");
    section.id = "faq";
    section.getBoundingClientRect = () => mockRect(900, 300);
    document.body.appendChild(section);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });

    const scrollToFn = vi.fn();
    const historyReplace = vi.fn();

    const ok = scrollToSection("faq", {
      scrollToFn,
      historyReplace,
      matchMedia: { matches: false },
    });

    expect(ok).toBe(true);
    expect(scrollToFn).toHaveBeenCalledWith({ top: 820, behavior: "smooth" });
    expect(historyReplace).toHaveBeenCalledWith("#faq");
  });

  it("scrollToSection uses instant behavior when requested", () => {
    const section = document.createElement("section");
    section.id = "problem";
    section.getBoundingClientRect = () => mockRect(500, 200);
    document.body.appendChild(section);

    const scrollToFn = vi.fn();
    scrollToSection("problem", {
      instant: true,
      updateHash: false,
      scrollToFn,
      matchMedia: { matches: false },
    });

    expect(scrollToFn).toHaveBeenCalledWith(expect.objectContaining({ behavior: "auto" }));
  });

  it("returns false for missing anchors", () => {
    expect(scrollToSection("missing")).toBe(false);
  });
});

describe("sectionNav — active section highlighting", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("marks the last section whose top crossed the header probe", () => {
    const ids = ["problem", "solution", "products"] as const;
    const offset = 80;

    const problem = document.createElement("section");
    problem.id = "problem";
    problem.getBoundingClientRect = () => mockRect(-40);
    document.body.appendChild(problem);

    const solution = document.createElement("section");
    solution.id = "solution";
    solution.getBoundingClientRect = () => mockRect(50);
    document.body.appendChild(solution);

    const products = document.createElement("section");
    products.id = "products";
    products.getBoundingClientRect = () => mockRect(400);
    document.body.appendChild(products);

    // probe = 88 → problem (-40) and solution (50) are active candidates → solution
    expect(getActiveSectionId(ids, offset)).toBe("solution");
  });

  it("returns empty string when no section has reached the probe", () => {
    const section = document.createElement("section");
    section.id = "pricing";
    section.getBoundingClientRect = () => mockRect(400);
    document.body.appendChild(section);

    expect(getActiveSectionId(["pricing"], 80)).toBe("");
  });

  it("uses a tighter probe so small-screen header height does not skip sections", () => {
    const tallHeaderOffset = 180;
    const section = document.createElement("section");
    section.id = "industries";
    // Just under the probe line (180 + 8 = 188)
    section.getBoundingClientRect = () => mockRect(180);
    document.body.appendChild(section);

    expect(getActiveSectionId(["industries"], tallHeaderOffset)).toBe("industries");
  });
});
