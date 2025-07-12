import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it("renders the main title", () => {
    const title = screen.getByRole("heading", { name: /about this project/i });
    expect(title).toBeInTheDocument();
  });

  it("displays tech stack section", () => {
    const techStackHeading = screen.getByRole("heading", { name: /tech stack/i });
    expect(techStackHeading).toBeInTheDocument();
  });

  it("displays features section", () => {
    const featuresHeading = screen.getByRole("heading", { name: /features/i });
    expect(featuresHeading).toBeInTheDocument();
  });

  it("contains React 19 in tech stack", () => {
    const react19Text = screen.getByText(/react 19/i);
    expect(react19Text).toBeInTheDocument();
  });

  it("contains React Router v7 in tech stack", () => {
    const routerElement = screen.getByText("React Router v7");
    expect(routerElement).toBeInTheDocument();
  });

  it("contains TypeScript in tech stack", () => {
    const typescriptElement = screen.getByText("TypeScript");
    expect(typescriptElement).toBeInTheDocument();
  });

  it("contains auto-format feature", () => {
    const autoFormatText = screen.getByText(/auto-format on save with prettier/i);
    expect(autoFormatText).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    const mainContainer = screen.getByRole("heading", { name: /about this project/i }).closest("div");
    expect(mainContainer).toHaveClass("max-w-4xl");
  });

  it("displays all tech stack items", () => {
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("React Router v7")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS v4")).toBeInTheDocument();
    expect(screen.getByText("Radix UI")).toBeInTheDocument();
    expect(screen.getByText("ESLint + Prettier")).toBeInTheDocument();
  });

  it("displays all feature items", () => {
    const featureItems = [
      /auto-format on save with prettier/i,
      /eslint integration with conflict resolution/i,
      /typescript type checking/i,
      /modern react router v7 setup/i,
      /responsive design with tailwind css/i,
      /component library with radix ui/i,
    ];

    featureItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
