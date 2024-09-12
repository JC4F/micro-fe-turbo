import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/shared/layout.tsx";
import { ReactPage } from "@/components/react/index.tsx";
import { VuePage } from "@/components/vue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ReactPage />,
      },
      {
        path: "vue",
        element: <VuePage />,
      },
      // {
      //   path: "angular",
      //   element: <Contact />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
