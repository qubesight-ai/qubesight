import { render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Solution from "@/components/sections/Solution";

const state = vi.hoisted(() => ({ language: "es" }));
vi.mock("@/hooks/useTranslation", () => ({ useTranslation: () => state }));

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe("public service information", () => {
  it("connects all eight customer problems with a solution and includes both metric groups", () => {
    state.language = "es";
    render(<Solution />);
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(9);
    expect(screen.getByText("Cotizar cuando las reglas del negocio lo permitan.")).toBeTruthy();
    expect(screen.getByText("Métricas de uso")).toBeTruthy();
    expect(screen.getByText("Métricas de desempeño")).toBeTruthy();
    expect(screen.getByText("F. Implementación y soporte")).toBeTruthy();
  });

  it("provides the service information in English when the language changes", () => {
    state.language = "en";
    render(<Solution />);
    expect(screen.getByText("Unanswered calls")).toBeTruthy();
    expect(screen.getByText("D. Business integration")).toBeTruthy();
    expect(screen.getByText("F. Implementation and support")).toBeTruthy();
  });
});
