import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import Layout from "./Layout";

const MockedLayout = ({ initialEntries = ["/"] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Layout />
  </MemoryRouter>
);

describe("Layout", () => {
  beforeEach(() => {
    render(<MockedLayout />);
  });

  it("displays the app title", () => {
    const title = screen.getByRole("heading", { name: /react app/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-xl", "font-bold");
  });

  it("renders navigation links", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it("has correct link destinations", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("renders outlet for child routes", () => {
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("has proper semantic HTML structure", () => {
    const nav = screen.getByRole("navigation");
    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", { level: 1 });

    expect(nav).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    const container = screen.getByRole("navigation").closest("div");
    const nav = screen.getByRole("navigation");
    const main = screen.getByRole("main");

    expect(container).toHaveClass("min-h-svh");
    expect(nav).toHaveClass("border-b", "p-4");
    expect(main).toHaveClass("container", "mx-auto", "p-4");
  });

  it("navigation links have hover effects", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });

    expect(homeLink).toHaveClass("hover:underline");
    expect(aboutLink).toHaveClass("hover:underline");
  });

  it("has responsive container layout", () => {
    const navContainer = screen.getByRole("navigation").querySelector(".container");
    expect(navContainer).toHaveClass("container", "mx-auto");
    expect(navContainer).toHaveClass("flex", "items-center", "justify-between");
  });
});

describe("Layout - Navigation behavior", () => {
  it("maintains navigation state across route changes", () => {
    const { rerender } = render(<MockedLayout initialEntries={["/about"]} />);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /react app/i })).toBeInTheDocument();

    rerender(<MockedLayout initialEntries={["/"]} />);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /react app/i })).toBeInTheDocument();
  });

  it("displays correct navigation regardless of initial route", () => {
    const testRoute = (route: string) => {
      const { unmount } = render(<MockedLayout initialEntries={[route]} />);

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /react app/i })).toBeInTheDocument();

      unmount(); // Clean up after each test
    };

    testRoute("/");
    testRoute("/about");
    testRoute("/nonexistent");
  });
});
