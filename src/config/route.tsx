import { Layout } from "@/layouts";
import { HomePage, AboutPage, NotFoundPage } from "@/pages";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    ErrorBoundary: NotFoundPage,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          crumb: () => "Home",
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        handle: {
          crumb: () => "About",
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
