import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { translations } from "@/hooks/useTranslation";

const state = vi.hoisted(() => ({ language: "es" }));
vi.mock("@/hooks/useTranslation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/hooks/useTranslation")>();
  return { ...actual, useTranslation: () => state };
});

vi.mock("@/components/layout/Header", () => ({ default: () => null }));
vi.mock("@/components/sections/Footer", () => ({ default: () => null }));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/privacy"]}>
      <PrivacyPolicy />
    </MemoryRouter>,
  );

describe("public privacy policy page", () => {
  it("sets the required document title and heading", () => {
    renderPage();
    expect(document.title).toBe("Política de privacidad de QubeSight");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Política de privacidad de QubeSight",
    );
  });

  it("shows the required contact information", () => {
    renderPage();
    expect(screen.getByText("QubeSight")).toBeTruthy();
    expect(screen.getByText("Costa Rica")).toBeTruthy();
    expect(screen.getByRole("link", { name: "privacy@qubesight.lat" }).getAttribute("href")).toBe(
      "mailto:privacy@qubesight.lat",
    );
    expect(screen.getByRole("link", { name: "qubesight.lat" }).getAttribute("href")).toBe(
      "https://qubesight.lat",
    );
  });

  it("stays public: no sign-in form and no data-collection inputs", () => {
    renderPage();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(document.querySelector('input[type="password"]')).toBeNull();
    expect(document.querySelector("form")).toBeNull();
    expect(screen.getByRole("main")).toBeTruthy();
  });

  it("labels the footer link as Política de privacidad in both languages", () => {
    expect(translations["footer.privacy"].es).toBe("Política de privacidad");
    expect(translations["footer.privacy"].en).toBe("Privacy Policy");
  });
});
