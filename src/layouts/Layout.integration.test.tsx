import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import Layout from "./Layout";

const HomePage = () => (
  <div data-testid="home-page">
    <h2>Welcome to Home</h2>
    <p>Home Page Content</p>
  </div>
);

const AboutPage = () => (
  <div data-testid="about-page">
    <h2>About Us</h2>
    <p>About Page Content</p>
  </div>
);

const NotFoundPage = () => (
  <div data-testid="not-found">
    <h2>404 - Page Not Found</h2>
  </div>
);

const createTestRouter = (initialPath = "/") => {
  return createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
    {
      initialEntries: [initialPath],
    },
  );
};

describe("Layout Integration Tests", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Route rendering", () => {
    it("renders home page at root route", () => {
      const router = createTestRouter("/");
      render(<RouterProvider router={router} />);

      expect(screen.getByTestId("home-page")).toBeInTheDocument();
      expect(screen.getByText("Welcome to Home")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /react app/i })).toBeInTheDocument();
    });

    it("renders about page at about route", () => {
      const router = createTestRouter("/about");
      render(<RouterProvider router={router} />);

      expect(screen.getByTestId("about-page")).toBeInTheDocument();
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /react app/i })).toBeInTheDocument();
    });

    it("renders 404 page for unknown routes", () => {
      const router = createTestRouter("/unknown-route");
      render(<RouterProvider router={router} />);

      expect(screen.getByTestId("not-found")).toBeInTheDocument();
      expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    });
  });
});
