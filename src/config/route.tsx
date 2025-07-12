import { Layout } from "@/layouts";
import { HomePage, AboutPage, NotFoundPage, LoginPage } from "@/pages";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    ErrorBoundary: NotFoundPage,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        handle: {
          crumb: () => "Home",
        },
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
        handle: {
          crumb: () => "About",
        },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
