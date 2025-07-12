import React from "react";
import { RouterProvider } from "react-router";
import router from "./config/route";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: React.FC = () => (
  <>
    <RouterProvider router={router} />
    {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
  </>
);

export default App;
