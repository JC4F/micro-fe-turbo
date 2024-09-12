import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./globals.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/shared/layout.tsx";

const ReactPage = lazy(() => import("@/components/react/index"));
const VuePage = lazy(() => import("@/components/vue/index"));

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
