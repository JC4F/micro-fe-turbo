import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./globals.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/shared/layout.tsx";
import { QueryClientWrapper } from "@/components/wrapper/query-client";

const ReactPage = lazy(() => import("@/components/react/index"));
const VuePage = lazy(() =>
  import("vue/VuePage").then(() => import("@/components/vue/index"))
);
const AngularPage = lazy(() => import("@/components/angular/index"));
const NotFoundPage = lazy(() => import("@/components/not-found/index"));
const ErrorPage = lazy(() => import("@/components/error/index"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ReactPage />,
      },
      {
        path: "vue",
        element: <VuePage />,
      },
      {
        path: "angular",
        element: <AngularPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientWrapper>
      <RouterProvider router={router} />
    </QueryClientWrapper>
  </StrictMode>
);
